<template>
    <Transition name="panel">
        <div v-if="isPanelOpen"
            class="absolute z-50 mt-3 max-h-[70vh] w-full origin-top overflow-y-auto rounded-3xl border border-stone-200 bg-white shadow-2xl lg:mt-4 lg:max-h-[80vh]">
            <!-- Panel Dónde -->
            <div v-if="activeTab === 'donde'" class="p-5 lg:p-8">
                <h3 class="mb-5 text-lg font-bold text-stone-900 lg:mb-6 lg:text-xl">¿A dónde quieres ir?</h3>
                <div class="relative mb-6">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <svg class="h-5 w-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input :value="locationQuery"
                        @input="$emit('update:locationQuery', $event.target.value); $emit('searchLocations')"
                        type="text" placeholder="Buscar destinos..."
                        class="w-full rounded-xl border border-stone-200 bg-stone-50 py-3.5 pl-11 pr-4 text-base text-stone-900 placeholder-stone-400 transition-all duration-200 focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-400/40">
                </div>
                <div>
                    <h4 class="mb-4 text-xs font-semibold uppercase tracking-wide text-stone-500">Destinos populares</h4>
                    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <button v-for="destination in popularDestinations" :key="destination.name"
                            @click="$emit('selectLocation', destination.name)"
                            class="group flex items-center gap-4 rounded-2xl border border-stone-200 p-4 text-left transition-all duration-200 hover:border-rose-400 hover:bg-rose-50/40 hover:shadow-sm">
                            <span
                                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 text-2xl transition-transform duration-200 group-hover:scale-105">{{
                                    destination.emoji }}</span>
                            <span class="min-w-0 flex-1">
                                <span
                                    class="block truncate font-semibold text-stone-900 transition-colors group-hover:text-rose-600">{{
                                        destination.name }}</span>
                                <span class="block truncate text-sm text-stone-500">{{ destination.description }}</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Panel Origen y Destino -->
            <div v-if="activeTab === 'origin'" class="p-5 lg:p-8">
                <h3 class="mb-6 text-lg font-bold text-stone-900 lg:text-xl">¿Dónde te recogemos y dónde te llevamos?</h3>
                <div class="space-y-6">
                    <!-- Origen -->
                    <div>
                        <div class="mb-3 flex items-center gap-2">
                            <i class="fa-solid fa-circle-dot text-rose-500"></i>
                            <p class="font-semibold text-stone-900">Punto de origen</p>
                        </div>
                        <div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
                            <button v-for="origen in origenes" :key="origen" @click="selectOrigen(origen)" :class="[
                                'rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all duration-200',
                                searchStore.origen.value === origen
                                    ? 'border-rose-500 bg-rose-500 text-white shadow-sm'
                                    : 'border-stone-200 bg-white text-stone-700 hover:border-rose-400 hover:bg-rose-50/40'
                            ]">
                                {{ origen }}
                            </button>
                        </div>
                    </div>

                    <!-- Destino -->
                    <div v-if="searchStore.origen.value">
                        <div class="mb-3 flex items-center gap-2">
                            <i class="fa-solid fa-location-dot text-sky-500"></i>
                            <p class="font-semibold text-stone-900">Punto de destino</p>
                        </div>
                        <div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
                            <button v-for="destino in destinosFinales" :key="destino" @click="selectDestino(destino)"
                                :class="[
                                    'rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all duration-200',
                                    searchStore.destino.value === destino
                                        ? 'border-sky-500 bg-sky-500 text-white shadow-sm'
                                        : 'border-stone-200 bg-white text-stone-700 hover:border-sky-400 hover:bg-sky-50/40'
                                ]">
                                {{ destino }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Panel Fechas -->
            <div v-if="activeTab === 'checkin'" class="p-1">
                <h3 class="p-6 pb-4 text-lg font-bold text-stone-900 lg:text-xl">{{ mensajePrincipal }}</h3>
                <div class="rounded-2xl">
                    <CalendarSelector class="w-full" :value="dates" :min-date="new Date().toISOString().split('T')[0]"
                        :placeholder="'Selecciona rango de fechas'" @update:value="val => valueDateChange(val)"
                        @update:checkin="val => searchStore.checkin.value = val"
                        @update:checkout="val => searchStore.checkout.value = val"
                        :range="type == 'Hospedaje' ? true : false" />
                </div>
            </div>

            <!-- Panel Check-out -->
            <div v-if="activeTab === 'checkout'" class="p-5 lg:p-8">
                <h3 class="mb-6 text-lg font-bold text-stone-900 lg:text-xl">¿Cuándo termina tu viaje?</h3>
                <button @click="$emit('openDatePicker', 'checkout')"
                    class="group w-full rounded-2xl border border-stone-200 p-6 text-center transition-all duration-200 hover:border-rose-400 hover:bg-rose-50/40">
                    <div v-if="selectedCheckout" class="text-lg font-semibold text-stone-900 group-hover:text-rose-600">
                        {{ formatDate(selectedCheckout) }}</div>
                    <div v-else class="text-stone-500 group-hover:text-rose-600">Selecciona fecha de salida</div>
                </button>
            </div>

            <!-- Panel Quién -->
            <div v-if="activeTab === 'quien'" class="p-5 lg:p-8">
                <h3 class="mb-6 text-lg font-bold text-stone-900 lg:text-xl">¿Quién viene?</h3>
                <div class="rounded-2xl bg-stone-50 p-5">
                    <GuestSelector :guests="guests" @increment="$emit('incrementGuests', $event)"
                        @decrement="$emit('decrementGuests', $event)" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import GuestSelector from './GuestSelector.vue';
import CalendarSelector from './CalendarSelector.vue';
import searchStore from '@/store/searchStore';
import { computed, ref } from 'vue';

const props = defineProps([
    'isPanelOpen',
    'activeTab',
    'locationQuery',
    'selectedCheckin',
    'selectedCheckout',
    'guests',
    'hasSearchCriteria',
    'popularDestinations',
    'quickDateOptions',
    'durationOptions',
    'formatDate',
    'type',
    'selectedLocation',
    'origenes',
]);
defineEmits([
    'selectLocation',
    'openDatePicker',
    'setQuickDate',
    'setDuration',
    'incrementGuests',
    'decrementGuests',
    'searchLocations',
    'generateWithAi',
    'update:locationQuery'
]);

const mensajePrincipal = computed(() => {
    const checkin = searchStore.checkin?.value;
    const checkout = searchStore.checkout?.value;
    if (props.type === 'Hospedaje') {
        if (checkin) {
            const fecha1 = new Date(checkin).toLocaleDateString();
            const fecha2 = checkout ? new Date(checkout).toLocaleDateString() : null;
            if (fecha2) return `¡Bien! Llegarías el ${fecha1}, hasta el día ${fecha2}`;
            return `¡Bien! Llegarías el ${fecha1}, hasta que dia?`
        } else {
            return '¿Cuándo llegarías?';
        }
    }

    if (props.type === 'Embarcaciones') return '¿Qué día quieres la embarcación?';
    if (props.type === 'Tours') return '¿Qué día quieres el tour?';
    return '¿Qué día necesitas tu transporte?';
});


const dates = ref([])

function valueDateChange(val) {
    if (Array.isArray(val) && val.length === 2) {
        searchStore.checkin.value = val[0];
        searchStore.checkout.value = val[1];
    } else {
        searchStore.checkin.value = val;
        searchStore.checkout.value = val;
    }
}

const selectOrigen = (origen) => {
    searchStore.origen.value = origen;
    searchStore.destino.value = null;
    getDestinos(origen);
};

const selectDestino = (destino) => {
    searchStore.destino.value = destino;
};

const destinosFinales = ref([]);


const getDestinos = async () => {
    const response = await axios.get(`/getAllDestinations?origen=${searchStore.origen.value}`);
    destinosFinales.value = response.data.filter(destino => destino !== searchStore.origen.value);
};

getDestinos();

</script>

<style scoped>
.panel-enter-active,
.panel-leave-active {
    transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.panel-enter-from,
.panel-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
}
</style>

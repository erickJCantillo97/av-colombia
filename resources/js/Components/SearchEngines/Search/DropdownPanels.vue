<template>
    <Transition name="panel">
        <div v-if="isPanelOpen"
            class="absolute z-50 mt-3 lg:mt-4 w-full origin-top rounded-2xl lg:rounded-3xl border border-gray-100 bg-white shadow-2xl max-h-[70vh] lg:max-h-[80vh] overflow-y-auto">
            <!-- Panel Dónde -->
            <div v-if="activeTab === 'donde'" class="p-5 lg:p-8 panel-content">
                <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-5 lg:mb-6">¿A dónde quieres ir?</h3>
                <div class="relative mb-6">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input :value="locationQuery"
                        @input="$emit('update:locationQuery', $event.target.value); $emit('searchLocations')"
                        type="text" placeholder="Buscar destinos..."
                        class="w-full pl-11 pr-4 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 placeholder-gray-400">
                </div>
                <div>
                    <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Destinos populares</h4>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div v-for="(destination, index) in popularDestinations" :key="destination.name"
                            @click="$emit('selectLocation', destination.name)"
                            class="group flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-rose-500 hover:shadow-md cursor-pointer transition-all duration-200">
                            <div
                                class="w-14 h-14 bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                <span class="text-2xl">{{ destination.emoji }}</span>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="font-semibold text-gray-900 truncate group-hover:text-rose-600 transition-colors">{{ destination.name }}</p>
                                <p class="text-sm text-gray-500 truncate">{{ destination.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!----- Panel de origen y destino ----->
            <div v-if="activeTab === 'origin'" class="p-5 lg:p-8 panel-content">
                <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-6">¿Dónde te recogemos y dónde te llevamos?</h3>
                <div class="space-y-6">
                    <!-- Origen -->
                    <div>
                        <div class="flex items-center gap-2 mb-3">
                            <i class="fa-solid fa-circle-dot text-rose-500"></i>
                            <p class="font-semibold text-gray-900">Punto de origen</p>
                        </div>
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
                            <button v-for="origen in origenes" :key="origen" 
                                @click="selectOrigen(origen)"
                                :class="[
                                    'px-4 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-200 text-center',
                                    searchStore.origen.value === origen 
                                        ? 'bg-rose-500 border-rose-500 text-white shadow-md' 
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-rose-500 hover:bg-rose-50'
                                ]">
                                {{ origen }}
                            </button>
                        </div>
                    </div>

                    <!-- Destino -->
                    <div v-if="searchStore.origen.value">
                        <div class="flex items-center gap-2 mb-3">
                            <i class="fa-solid fa-location-dot text-blue-500"></i>
                            <p class="font-semibold text-gray-900">Punto de destino</p>
                        </div>
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
                            <button v-for="destino in destinosFinales" :key="destino" 
                                @click="selectDestino(destino)"
                                :class="[
                                    'px-4 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-200 text-center',
                                    searchStore.destino.value === destino 
                                        ? 'bg-blue-500 border-blue-500 text-white shadow-md' 
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                                ]">
                                {{ destino }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Panel Check-in -->
            <div v-if="activeTab === 'checkin'" class="p-5 lg:p-8 panel-content">
                <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-6">{{ mensajePrincipal }}</h3>
                <div class="bg-gray-50 rounded-2xl p-4 lg:p-6">
                    <CalendarSelector class="w-full" :value="dates" :min-date="new Date().toISOString().split('T')[0]"
                        :placeholder="'Selecciona rango de fechas'" @update:value="val => valueDateChange(val)"
                        @update:checkin="val => searchStore.checkin.value = val"
                        @update:checkout="val => searchStore.checkout.value = val"
                        :range="type == 'Hospedaje' ? true : false" />
                </div>
            </div>
            <!-- Panel Check-out -->
            <div v-if="activeTab === 'checkout'" class="p-5 lg:p-8 panel-content">
                <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-6">¿Cuándo termina tu viaje?</h3>
                <button @click="$emit('openDatePicker', 'checkout')"
                    class="w-full border-2 border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all duration-200 text-center group">
                    <div v-if="selectedCheckout" class="text-gray-900 font-semibold text-lg group-hover:text-rose-600">{{
                        formatDate(selectedCheckout) }}</div>
                    <div v-else class="text-gray-500 group-hover:text-rose-600">Selecciona fecha de salida</div>
                </button>
            </div>

            <!-- Panel Quién -->
            <div v-if="activeTab === 'quien'" class="p-5 lg:p-8 panel-content">
                <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-6">¿Quién viene?</h3>
                <div class="bg-gray-50 rounded-2xl p-5">
                    <GuestSelector :guests="guests" @increment="$emit('incrementGuests', $event)"
                        @decrement="$emit('decrementGuests', $event)" />
                </div>
            </div>
            <!-- Panel IA -->

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
    console.log(dates.value)
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

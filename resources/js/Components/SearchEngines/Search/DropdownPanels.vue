<template>
    <Transition name="panel">
        <div v-if="isPanelOpen"
            class="absolute z-50 mt-2 sm:mt-4 w-full origin-top rounded-2xl sm:rounded-3xl border border-gray-200 bg-white shadow-2xl dropdown-shadow">
            <!-- Panel Dónde -->
            <div v-if="activeTab === 'donde'" class="p-4 sm:p-8 panel-content">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">¿A dónde quieres ir?</h3>
                <div class="relative mb-4 sm:mb-6">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input :value="locationQuery"
                        @input="$emit('update:locationQuery', $event.target.value); $emit('searchLocations')"
                        type="text" placeholder="Buscar destinos"
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 modern-focus">
                </div>
                <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-3">Destinos populares</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div v-for="(destination, index) in popularDestinations" :key="destination.name"
                            @click="$emit('selectLocation', destination.name)"
                            class="destination-card flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 scale-hover">
                            <div
                                class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span class="text-xl sm:text-2xl">{{ destination.emoji }}</span>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="font-medium text-gray-900 truncate">{{ destination.name }}</p>
                                <p class="text-sm text-gray-500 truncate">{{ destination.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!----- Panel de origen y destino ----->
            <div v-if="activeTab === 'origin'" class="p-4 sm:p-8 panel-content">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Dónde te recogemos y dónde te llevamos?
                </h3>
                <div class="flex justify-between gap-4">
                    <div class="w-full shadow-lg px-4 py-2 rounded-md">
                        <p class="font-bold">Origen</p>
                        <div class="grid  grid-cols-3 gap-2 mt-2">
                            <div v-for="destino in destinos">
                                <div class="p-2 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-200 text-center scale-hover modern-focuss">
                                    {{ destino }}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="w-full shadow-sm">
                        <p>Destino</p>
                    </div>
                </div>
            </div>
            <!-- Panel Check-in -->
            <div v-if="activeTab === 'checkin'" class="p-4 sm:p-8 panel-content">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                    {{
                        mensajePrincipal
                    }}</h3>

                <div>
                    <CalendarSelector class="w-full" :value="[searchStore.checkin.value, searchStore.checkout.value]"
                        :min-date="new Date().toISOString().split('T')[0]" :placeholder="'Selecciona rango de fechas'"
                        @change="val => { if (Array.isArray(val) && val.length === 2) { searchStore.checkin.value = val[0]; searchStore.checkout.value = val[1]; } }"
                        @update:checkin="val => searchStore.checkin.value = val"
                        @update:checkout="val => searchStore.checkout.value = val"
                        :range="type == 'Hospedaje' ? true : false" />
                </div>
            </div>
            <!-- Panel Check-out -->
            <div v-if="activeTab === 'checkout'" class="p-4 sm:p-8 panel-content">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">¿Cuándo termina tu viaje?</h3>
                <div class="border border-gray-200 rounded-lg p-4 sm:p-6 cursor-pointer hover:border-gray-300 transition-all duration-200 text-center scale-hover modern-focus"
                    @click="$emit('openDatePicker', 'checkout')">
                    <div v-if="selectedCheckout" class="text-gray-900 font-medium text-base sm:text-lg">{{
                        formatDate(selectedCheckout) }}</div>
                    <div v-else class="text-gray-500">Selecciona fecha de salida</div>
                </div>

            </div>
            <!-- Panel Quién -->
            <div v-if="activeTab === 'quien'" class="p-4 sm:p-8 panel-content">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">¿Quién viene?</h3>
                <GuestSelector :guests="guests" @increment="$emit('incrementGuests', $event)"
                    @decrement="$emit('decrementGuests', $event)" />
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
    'destinos'
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



</script>

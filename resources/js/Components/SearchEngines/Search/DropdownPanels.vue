<template>
  <Transition name="panel">
    <div v-if="isPanelOpen"
      class="absolute z-50 mt-4 w-full origin-top rounded-3xl border border-gray-200 bg-white shadow-2xl  dropdown-shadow">
      <!-- Panel Dónde -->
      <div v-if="activeTab === 'donde'" class="p-8 panel-content">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">¿A dónde quieres ir?</h3>
        <div class="relative mb-6">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            :value="locationQuery"
            @input="$emit('update:locationQuery', $event.target.value); $emit('searchLocations')"
            type="text" 
            placeholder="Buscar destinos"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 modern-focus"
          >
        </div>
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-3">Destinos populares</h4>
          <div class="grid grid-cols-2 gap-3">
            <div 
              v-for="(destination, index) in popularDestinations" 
              :key="destination.name"
              @click="$emit('selectLocation', destination.name)"
              class="destination-card flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 scale-hover"
            >
              <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <span class="text-2xl">{{ destination.emoji }}</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ destination.name }}</p>
                <p class="text-sm text-gray-500">{{ destination.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Panel Check-in -->
      <div v-if="activeTab === 'checkin'" class="p-8 panel-content">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">¿Cuándo es tu viaje?</h3>
        <div>
          <CalendarSelector
            :value="[selectedCheckin, selectedCheckout]"
            :min-date="new Date().toISOString().split('T')[0]"
            :placeholder="'Selecciona rango de fechas'"
            :flex-value="0"
            :flex-options="
              [
                { label: 'Fechas exactas', days: 0 },
                { label: '± 1 día', days: 1 },
                { label: '± 2 días', days: 2 },
                { label: '± 3 días', days: 3 },
                { label: '± 7 días', days: 7 },
                { label: '± 14 días', days: 14 }
              ]"
            @flex="$emit('setQuickDate', 'checkin', $event)"
            @update:checkin="$emit('update:selectedCheckin', $event)"
            @update:checkout="$emit('update:selectedCheckout', $event)"
            @update:modelValue="([checkin, checkout]) => { $emit('update:selectedCheckin', checkin); $emit('update:selectedCheckout', checkout); }"
          />
        </div>
      </div>
      <!-- Panel Check-out -->
      <div v-if="activeTab === 'checkout'" class="p-8 panel-content">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">¿Cuándo termina tu viaje?</h3>
        <div class="border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gray-300 transition-all duration-200 text-center scale-hover modern-focus"
             @click="$emit('openDatePicker', 'checkout')">
          <div v-if="selectedCheckout" class="text-gray-900 font-medium text-lg">{{ formatDate(selectedCheckout) }}</div>
          <div v-else class="text-gray-500">Selecciona fecha de salida</div>
        </div>
        <div v-if="selectedCheckin" class="mt-6">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Duración sugerida</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="duration in durationOptions" 
              :key="duration.label"
              @click="$emit('setDuration', duration.days)"
              class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 btn-ripple scale-hover"
            >
              {{ duration.label }}
            </button>
          </div>
        </div>
      </div>
      <!-- Panel Quién -->
      <div v-if="activeTab === 'quien'" class="p-8 panel-content">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">¿Quién viene?</h3>
        <GuestSelector :guests="guests" @increment="$emit('incrementGuests', $event)" @decrement="$emit('decrementGuests', $event)" />
      </div>
      <!-- Panel IA -->
      <div v-if="hasSearchCriteria" class="border-t border-gray-200 p-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 gradient-text">✨ Búsqueda Inteligente</h4>
              <p class="text-sm text-gray-600">Encuentra el servicio perfecto con IA</p>
            </div>
          </div>
          <button 
            @click="$emit('generateWithAi')"
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 btn-ripple scale-hover"
          >
            Buscar con IA
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import GuestSelector from './GuestSelector.vue';
import CalendarSelector from './CalendarSelector.vue';
defineProps([
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
  'formatDate'
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
</script>

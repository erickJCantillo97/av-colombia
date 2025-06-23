<template>
  <div :class="[
    'flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden transition-all duration-300',
    isPanelOpen ? 'shadow-xl border-gray-300' : 'hover:shadow-md'
  ]">
    <div class="flex-1 relative search-section" @click="setActiveTab('donde')"
      :class="['px-6 py-4 cursor-pointer transition-all duration-200 rounded-l-full modern-focus', activeTab === 'donde' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50']">
      <div class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Dónde</div>
      <div class="text-sm text-gray-500 mt-1">{{ selectedLocation || 'Explora destinos' }}</div>
    </div>
    <div class="w-px h-8 bg-gray-200 divider-animated"></div>
    <div class="flex-1 relative search-section" @click="setActiveTab('checkin')"
      :class="['px-6 py-4 cursor-pointer transition-all duration-200 modern-focus', activeTab === 'checkin' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50']">
      <div class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Check-in / Check-out</div>
      <div class="text-sm text-gray-500 mt-1">
        {{ (dateRange) || 'Selecciona fechas' }}
      </div>
    </div>
    <div class="w-px h-8 bg-gray-200 divider-animated"></div>
    <div class="flex-1 relative search-section" @click="setActiveTab('quien')"
      :class="['px-6 py-4 cursor-pointer transition-all duration-200 modern-focus', activeTab === 'quien' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50']">
      <div class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Quién</div>
      <div class="text-sm text-gray-500 mt-1">{{ guestSummary || '¿Cuántos?' }}</div>
    </div>
    <div class="px-2 py-2">
      <button @click="performSearch"
        class="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-full transition-all duration-200 shadow-lg search-button btn-ripple scale-hover">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup>

defineProps([
  'isPanelOpen',
  'activeTab',
  'selectedLocation',
  'selectedCheckin',
  'selectedCheckout',
  'guestSummary',
  'setActiveTab',
  'formatDate',
  'performSearch',
  'dateRange'
]);
</script>

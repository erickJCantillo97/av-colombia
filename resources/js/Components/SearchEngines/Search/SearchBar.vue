<template>
  <div :class="[
    'flex  sm:items-center bg-white rounded-2xl sm:rounded-full border border-gray-200 overflow-hidden transition-all duration-300',
    isPanelOpen ? 'shadow-xl border-gray-300' : 'hover:shadow-md'
  ]">
    <!-- Sección Dónde -->
    <div class="flex-1 relative search-section" @click="setActiveTab('donde')" :class="[
      'px-4 sm:px-6 py-3 sm:py-4 cursor-pointer transition-all duration-200 modern-focus',
      'sm:rounded-l-full first:rounded-t-2xl sm:first:rounded-t-none',
      activeTab === 'donde' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50'
    ]">
      <div v-if="showInputTitles" class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Dónde</div>
      <div class="text-sm text-gray-500 mt-1 truncate">{{ selectedLocation || 'Explora destinos' }}</div>
    </div>

    <!-- Divider - Hidden on mobile -->
    <div class="hidden sm:block w-px h-8 bg-gray-200 divider-animated"></div>

    <!-- Línea divisoria móvil -->
    <div class="block sm:hidden h-px bg-gray-200 mx-4"></div>

    <!-- Sección Check-in/Check-out -->
    <div class="flex-1 relative search-section" @click="setActiveTab('checkin')" :class="[
      'px-4 sm:px-6 py-3 sm:py-4 cursor-pointer transition-all duration-200 modern-focus',
      activeTab === 'checkin' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50'
    ]">
      <div v-if="showInputTitles" class="text-xs font-semibold text-gray-900 uppercase tracking-wide">
        <span class="hidden sm:inline">Check-in / Check-out</span>
        <span class="sm:hidden">Fechas</span>
      </div>
      <div class="text-sm text-gray-500 mt-1 truncate">
        {{ dateRange || 'Selecciona fechas' }}
      </div>
    </div>

    <!-- Divider - Hidden on mobile -->
    <div class="hidden sm:block w-px h-8 bg-gray-200 divider-animated"></div>

    <!-- Línea divisoria móvil -->
    <div class="block sm:hidden h-px bg-gray-200 mx-4"></div>

    <!-- Sección Huéspedes -->
    <div class="flex-1 relative search-section" @click="setActiveTab('quien')" :class="[
      'px-4 sm:px-6 py-3 sm:py-4 cursor-pointer transition-all duration-200 modern-focus',
      activeTab === 'quien' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50'
    ]">
      <div v-if="showInputTitles" class="text-xs font-semibold text-gray-900 uppercase tracking-wide">
        <span class="hidden sm:inline">Quién</span>
        <span class="sm:hidden">Huéspedes</span>
      </div>
      <div class="text-sm text-gray-500 mt-1 truncate">{{ guestSummary || '¿Cuántos?' }}</div>
    </div>

    <!-- Botón de búsqueda -->
    <div class="px-2 py-2 sm:px-2 sm:py-2 flex justify-center sm:justify-end">
      <Link :href="route('services.home')">
      <button @click=""
        class="bg-gray-500 hover:bg-gray-800 text-white p-3 sm:p-4 rounded-full transition-all duration-200 shadow-lg search-button btn-ripple scale-hover w-12 h-12 sm:w-auto sm:h-auto flex items-center justify-center">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
      </Link>
    </div>
  </div>
</template>
<script setup>
import { formatDate } from '@/composable/useCommonUtilities';
import searchStore from '@/store/searchStore';
import { Link } from '@inertiajs/vue3';
import { inject } from 'vue';

import { computed } from 'vue';

defineProps([
  'isPanelOpen',
  'activeTab',
  'selectedLocation',
  'guestSummary',
  'setActiveTab',
  'formatDate',
]);

const dateRange = computed(() => {
  const checkin = searchStore.checkin.value;
  const checkout = searchStore.checkout.value;
  if (checkin && checkout) {
    return `${searchStore.checkin.value ? formatDate(checkin) : ''} - ${searchStore.checkout.value ? formatDate(checkout) : ''}`;
  }
  if (checkin) return (checkin);
  return '';
});

const showInputTitles = inject('showInputTitles', true);
</script>

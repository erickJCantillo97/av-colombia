<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h4 class="font-medium text-gray-900">Adultos</h4>
        <p class="text-sm text-gray-500">13 años o más</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="$emit('decrement', 'adults')" :disabled="guests.adults <= 0"
          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 guest-counter btn-ripple hover:border-gray-400 transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <span class="w-8 text-center font-medium">{{ guests.adults }}</span>
        <button @click="$emit('increment', 'adults')"
          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center guest-counter btn-ripple hover:border-gray-400 transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <h4 class="font-medium text-gray-900">Niños</h4>
        <p class="text-sm text-gray-500">De 2 a 12 años</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="$emit('decrement', 'children')" :disabled="guests.children <= 0"
          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 guest-counter btn-ripple hover:border-gray-400 transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <span class="w-8 text-center font-medium">{{ guests.children }}</span>
        <button @click="$emit('increment', 'children')"
          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center guest-counter btn-ripple hover:border-gray-400 transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <h4 class="font-medium text-gray-900">Bebés</h4>
        <p class="text-sm text-gray-500">Menos de 2 años</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="$emit('decrement', 'infants')" :disabled="guests.infants <= 0"
          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 guest-counter btn-ripple hover:border-gray-400 transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <span class="w-8 text-center font-medium">{{ guests.infants }}</span>
        <button @click="$emit('increment', 'infants')"
          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center guest-counter btn-ripple hover:border-gray-400 transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({ guests: Object });
defineEmits(['increment', 'decrement']);
</script>

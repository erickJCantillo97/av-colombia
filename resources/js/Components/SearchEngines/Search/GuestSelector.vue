<template>
  <div class="divide-y divide-stone-200">
    <div v-for="row in rows" :key="row.key" class="flex items-center justify-between py-4 first:pt-0 last:pb-0">
      <div>
        <h4 class="font-semibold text-stone-900">{{ row.label }}</h4>
        <p class="text-sm text-stone-500">{{ row.hint }}</p>
      </div>
      <div class="flex items-center gap-3">
        <button type="button" @click="$emit('decrement', row.key)" :disabled="guests[row.key] <= 0"
          :aria-label="`Quitar ${row.label}`"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-all duration-150 hover:border-rose-400 hover:text-rose-500 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-300 disabled:hover:text-stone-600">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <span class="w-6 text-center font-semibold text-stone-900 tabular-nums">{{ guests[row.key] }}</span>
        <button type="button" @click="$emit('increment', row.key)" :aria-label="`Agregar ${row.label}`"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-all duration-150 hover:border-rose-400 hover:text-rose-500 active:scale-90">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const rows = [
  { key: 'adults', label: 'Adultos', hint: '13 años o más' },
  { key: 'children', label: 'Niños', hint: 'De 2 a 12 años' },
  { key: 'infants', label: 'Bebés', hint: 'Menos de 2 años' },
];
</script>

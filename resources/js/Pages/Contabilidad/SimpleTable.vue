<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  columns: {
    type: Array,
    required: true,
  },
});

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);

const formatValue = (value, type) => (type === 'currency' ? formatCurrency(value) : value);
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
    <div v-if="title" class="px-6 py-4 border-b border-gray-100">
      <h3 class="text-sm font-semibold text-gray-700">{{ title }}</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-100">
            <th
              v-for="column in columns"
              :key="column.field"
              class="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest"
            >
              {{ column.header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-100 last:border-0"
          >
            <td
              v-for="column in columns"
              :key="column.field"
              class="px-6 py-3.5 text-sm"
              :class="column.type === 'currency' ? 'font-semibold text-gray-800' : 'text-gray-600'"
            >
              {{ formatValue(row[column.field], column.type) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!data || data.length === 0" class="text-center py-10">
        <p class="text-sm text-gray-400">Sin datos disponibles</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  columns: {
    type: Array,
    required: true
  }
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
};

const formatValue = (value, type) => {
  if (type === 'currency') {
    return formatCurrency(value);
  }
  return value;
};
</script>

<template>
  <div class="w-full bg-white rounded-lg shadow-lg overflow-hidden">
    <div v-if="title" class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
      <h3 class="text-lg font-bold text-white">{{ title }}</h3>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.field"
              class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              {{ column.header }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr 
            v-for="(row, index) in data" 
            :key="index"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td 
              v-for="column in columns" 
              :key="column.field"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              :class="{
                'font-semibold': column.type === 'currency',
                'text-gray-600': !column.type
              }"
            >
              {{ formatValue(row[column.field], column.type) }}
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="!data || data.length === 0" class="text-center py-8">
        <p class="text-gray-500 text-sm">No hay datos disponibles</p>
      </div>
    </div>
  </div>
</template>

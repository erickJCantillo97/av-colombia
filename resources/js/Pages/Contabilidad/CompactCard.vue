<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, String],
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'amber', 'purple', 'red', 'indigo', 'emerald'].includes(value),
  },
  isCurrency: {
    type: Boolean,
    default: false,
  },
});

const accentColorMap = {
  blue: 'border-blue-500',
  green: 'border-green-500',
  amber: 'border-amber-500',
  purple: 'border-purple-500',
  red: 'border-red-500',
  indigo: 'border-indigo-500',
  emerald: 'border-emerald-500',
};

const valueColorMap = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  amber: 'text-amber-600',
  purple: 'text-purple-600',
  red: 'text-red-600',
  indigo: 'text-indigo-600',
  emerald: 'text-emerald-600',
};

const accentClass = computed(() => accentColorMap[props.color] ?? accentColorMap.blue);
const valueClass = computed(() => valueColorMap[props.color] ?? valueColorMap.blue);

const formattedValue = computed(() => {
  if (props.isCurrency && typeof props.value === 'number') {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(props.value);
  }
  return props.value;
});
</script>

<template>
  <div :class="['bg-white rounded-xl border border-gray-100 p-5 border-l-4 shadow-sm hover:shadow-md transition-shadow duration-200', accentClass]">
    <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{{ title }}</p>
    <p :class="['text-2xl font-bold', valueClass]">{{ formattedValue }}</p>
    <p v-if="subtitle" class="text-xs text-gray-400 mt-1">{{ subtitle }}</p>
  </div>
</template>

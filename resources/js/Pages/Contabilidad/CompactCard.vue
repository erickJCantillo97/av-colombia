<template>
  <div :class="[
    'rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl',
    bgColorClass
  ]">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p :class="['text-xs font-medium uppercase tracking-wider mb-1', textColorClass]">
          {{ title }}
        </p>
        <p class="text-xl font-bold" :class="valueColorClass">
          {{ formattedValue }}
        </p>
        <p v-if="subtitle" class="text-xs mt-1" :class="subtitleColorClass">
          {{ subtitle }}
        </p>
      </div>
      <div class="text-3xl ml-3">
        {{ icon }}
      </div>
    </div>
  </div>
</template>

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
    default: '💰',
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

const colorMap = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    text: 'text-blue-600',
    value: 'text-blue-900',
    subtitle: 'text-blue-500',
  },
  green: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    text: 'text-green-600',
    value: 'text-green-900',
    subtitle: 'text-green-500',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    text: 'text-amber-600',
    value: 'text-amber-900',
    subtitle: 'text-amber-500',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    text: 'text-purple-600',
    value: 'text-purple-900',
    subtitle: 'text-purple-500',
  },
  red: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100',
    text: 'text-red-600',
    value: 'text-red-900',
    subtitle: 'text-red-500',
  },
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    text: 'text-indigo-600',
    value: 'text-indigo-900',
    subtitle: 'text-indigo-500',
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    text: 'text-emerald-600',
    value: 'text-emerald-900',
    subtitle: 'text-emerald-500',
  },
};

const bgColorClass = computed(() => colorMap[props.color]?.bg || colorMap.blue.bg);
const textColorClass = computed(() => colorMap[props.color]?.text || colorMap.blue.text);
const valueColorClass = computed(() => colorMap[props.color]?.value || colorMap.blue.value);
const subtitleColorClass = computed(() => colorMap[props.color]?.subtitle || colorMap.blue.subtitle);

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

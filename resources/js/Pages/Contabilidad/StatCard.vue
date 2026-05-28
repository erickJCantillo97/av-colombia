<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  value: [String, Number],
  subtitle: String,
  icon: String,
  color: {
    type: String,
    default: 'blue',
  },
});

const dotColorMap = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  indigo: 'bg-indigo-500',
  emerald: 'bg-emerald-500',
};

const dotClass = computed(() => dotColorMap[props.color] ?? dotColorMap.blue);
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-2">
          <span :class="['inline-block w-2 h-2 rounded-full flex-shrink-0', dotClass]"></span>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 truncate">{{ title }}</p>
        </div>
        <p class="text-lg font-bold text-gray-800 truncate">{{ value }}</p>
        <p v-if="subtitle" class="text-xs text-gray-400 mt-1">{{ subtitle }}</p>
      </div>
      <div v-if="icon" class="text-2xl ml-3 opacity-50 flex-shrink-0">{{ icon }}</div>
    </div>
  </div>
</template>

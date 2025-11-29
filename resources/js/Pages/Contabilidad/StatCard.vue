<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  value: [String, Number],
  subtitle: String,
  icon: String,
  color: {
    type: String,
    default: 'blue'
  }
});

const colorClasses = computed(() => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    amber: 'bg-amber-100 text-amber-800 border-amber-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
    red: 'bg-red-100 text-red-800 border-red-300',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  };
  return colors[props.color] || colors.blue;
});
</script>

<template>
  <div :class="['p-4 rounded-lg shadow-lg border-2', colorClasses]">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-xs font-medium opacity-80">{{ title }}</p>
        <p class="text-xl font-bold mt-1">{{ value }}</p>
        <p v-if="subtitle" class="text-xs mt-1 opacity-70">{{ subtitle }}</p>
      </div>
      <div v-if="icon" class="text-3xl opacity-60 ml-3">
        {{ icon }}
      </div>
    </div>
  </div>
</template>

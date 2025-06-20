<template>
  <div class="flex items-center justify-center space-x-2 service-types-container">
    <div 
      v-for="(serviceType, index) in servicesType" 
      :key="serviceType.value"
      @click="$emit('update:modelValue', serviceType)"
      :class="[
        'service-type-tab flex  items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden min-w-[80px]',
        modelValue.value === serviceType.value 
          ? 'bg-gray-900 text-white shadow-md border-2 border-gray-900' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
      ]"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <div :class="[
        'w-6 h-6 flex items-center justify-center mb-1 transition-all duration-200 relative z-10',
        modelValue.value === serviceType.value 
          ? 'text-white' 
          : 'text-gray-600 group-hover:text-gray-800'
      ]">
        <div v-html="serviceType.icon" class="w-4 h-4"></div>
      </div>
      <span :class="[
        'text-xs font-medium text-center transition-all duration-200 relative z-10 leading-tight',
        modelValue.value === serviceType.value 
          ? 'text-white' 
          : 'text-gray-700 group-hover:text-gray-900'
      ]">
        {{ serviceType.label }}
      </span>
      <div v-if="modelValue.value === serviceType.value" 
           class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white rounded-full">
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  servicesType: Array,
  modelValue: Object
});
defineEmits(['update:modelValue']);
</script>

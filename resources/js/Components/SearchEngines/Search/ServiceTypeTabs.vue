<template>
  <div ref="containerRef" class="flex items-center justify-center space-x-2 service-types-container relative overflow-x-auto">
    <!-- Fondo animado -->
    <div
      v-if="sliderStyle.width"
      class="absolute transition-all duration-300 bg-gray-900 rounded-xl z-0 shadow-md border-2 border-gray-900"
      :style="sliderStyle"
    ></div>
    <div
      v-for="(serviceType, index) in servicesType"
      :key="serviceType.value"
      :ref="el => tabRefs[index] = el"
      @click="selectTab(serviceType, index)"
      :class="[
        'service-type-tab flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden min-w-fit z-10 flex-shrink-0',
        type.value === serviceType.value
          ? 'text-white'
          : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 bg-white'
      ]"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <div :class="[
        'w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center transition-all duration-200 relative z-10 flex-shrink-0',
        type.value === serviceType.value
          ? 'text-white'
          : 'text-gray-600 group-hover:text-gray-800'
      ]">
        <div v-html="serviceType.icon" class="w-5 h-5 sm:w-6 sm:h-6"></div>
      </div>
      <span :class="[
        'text-xs sm:text-sm font-medium transition-all duration-200 relative z-10 leading-tight whitespace-nowrap',
        type.value === serviceType.value
          ? 'text-white'
          : 'text-gray-700 group-hover:text-gray-900'
      ]">
        {{ serviceType.label }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import state  from '@/store/searchStore';

const props = defineProps({
  modelValue: Object
});
const emit = defineEmits(['update:modelValue']);

const tabRefs = ref([]);
const containerRef = ref(null);
const type = state.type;
const sliderStyle = ref({ left: '0px', top: '0px', width: '', height: '' });

const servicesType = [
  {
    label: 'Tours',
    value: 'TOUR',
    description: 'Experiencias guiadas',
    icon: `<img src="assets/svgs/beach.svg" alt="Beach Icon" />`
  },
  {
    label: 'Embarcaciones',
    value: 'EMBARCACION',
    description: 'Yates y lanchas',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z"></path>
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7v10"></path>
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11l8 0"></path>
           </svg>`
  },
  {
    label: 'Hospedaje',
    value: 'HOSPEDAJE',
    description: 'Hoteles y cabañas',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4a4 4 0 014-4h10a4 4 0 014 4v4M7 7a4 4 0 118 0v1a3 3 0 01-3 3h-2a3 3 0 01-3-3V7z"></path>
           </svg>`
  },
  {
    label: 'Transporte',
    value: 'TRANSPORTE',
    description: 'Traslados y vehículos',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7zM8 7h8M5 21h14"></path>
           </svg>`
  },
  
];

function updateSlider() {
  nextTick(() => {
    const idx = servicesType.findIndex(s =>  s.value == type.value.value);
    
    const el = tabRefs.value[idx];
    const container = containerRef.value;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      sliderStyle.value = {
        left: `${elRect.left - containerRect.left}px`,
        top: `${elRect.top - containerRect.top}px`,
        width: `${elRect.width}px`,
        height: `${elRect.height}px`,
      };
    }
  });
}

function selectTab(serviceType, index) {
  type.value = serviceType;
}

watch(() => type, updateSlider, {deep: true});
onMounted(updateSlider);
</script>
<style scoped>
.service-types-container {
  position: relative;
  min-height: 40px;
  padding: 0 8px;
  /* Para el scroll horizontal en móviles */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.service-types-container::-webkit-scrollbar {
  display: none;
}

.service-type-tab {
  position: relative;
  z-index: 10;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .service-types-container {
    padding: 0 4px;
    gap: 4px;
  }
  
  .service-type-tab {
    padding: 6px 10px;
    min-width: fit-content;
  }
}

@media (max-width: 480px) {
  .service-type-tab {
    padding: 6px 8px;
  }
}
</style>

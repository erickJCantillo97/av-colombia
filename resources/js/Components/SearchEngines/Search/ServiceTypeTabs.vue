<template>
  <div ref="containerRef"
    class="flex items-center justify-center service-types-container space-x-2 relative overflow-x-auto">
    <!-- Fondo animado -->
    <div v-if="sliderStyle.width"
      class="absolute transition-all duration-300 bg-gray-900 rounded-xl z-0 shadow-md border-2 border-gray-900"
      :style="sliderStyle"></div>
    <div v-for="(serviceType, index) in servicesType" :key="serviceType.value" :ref="el => tabRefs[index] = el"
      @click="selectTab(serviceType, index)" :class="[
        'service-type-tab flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden min-w-fit z-10 flex-shrink-0',
        type.value === serviceType.value
          ? 'text-white'
          : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 bg-white'
      ]" :style="{ animationDelay: `${index * 0.1}s` }">
      <div :class="[
        'w-5 h-5 sm:w-6 sm:h-6  items-center justify-center transition-all duration-200 relative z-10 flex-shrink-0 hidden sm:flex',
        type.value === serviceType.value
          ? 'text-white'
          : 'text-gray-600 group-hover:text-gray-800'
      ]">
        <div v-html="serviceType.icon" class="w-5 h-5 sm:w-6 sm:h-6 "></div>
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
import state from '@/store/searchStore';
import { router } from '@inertiajs/vue3';
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
    icon: `<img src="/images/beach.png" alt="Beach Icon" />`
  },
  {
    label: 'Embarcaciones',
    value: 'EMBARCACION',
    description: 'Yates y lanchas',
    icon: `<img src="/assets/svgs/motor-boat.svg" alt="Motor Boat Icon" />`
  },
  {
    label: 'Hospedaje',
    value: 'HOSPEDAJE',
    description: 'Hoteles y cabañas',
    icon: `<img src="/assets/svgs/house.svg" alt="House Icon" />`
  },
  {
    label: 'Transporte',
    value: 'TRANSFER',
    description: 'Traslados y vehículos',
    icon: `<img src="/images/car.png" alt="Automobile Icon" />`
  },
];

function updateSlider() {
  nextTick(() => {
    const idx = servicesType.findIndex(s => s.value == type.value.value);

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
  
  router.visit(route('services.home'));
}

watch(() => type, updateSlider, { deep: true });
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

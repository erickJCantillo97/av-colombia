<template>
  <div class="no-scrollbar w-full overflow-x-auto">
    <div
      role="tablist"
      class="mx-auto flex w-max items-center gap-1 rounded-2xl border border-stone-200/80 bg-stone-100/70 p-1 backdrop-blur-sm">
      <button
        v-for="serviceType in serviceTypes"
        :key="serviceType.value"
        type="button"
        role="tab"
        :aria-selected="type.value === serviceType.value"
        @click="selectTab(serviceType)"
        :class="[
          'flex flex-shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400',
          type.value === serviceType.value
            ? 'bg-stone-900 text-white shadow'
            : 'text-stone-600 hover:bg-white hover:text-stone-900'
        ]">
        <img :src="serviceType.icon" :alt="serviceType.label"
          class="h-5 w-5 flex-shrink-0 object-contain sm:h-[22px] sm:w-[22px]" />
        <span class="whitespace-nowrap">{{ serviceType.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import state from '@/store/searchStore';
import { router } from '@inertiajs/vue3';

defineProps({
  modelValue: Object,
});
defineEmits(['update:modelValue']);

const type = state.type;

const serviceTypes = [
  { label: 'Tours', value: 'TOUR', description: 'Experiencias guiadas', icon: '/images/beach.png' },
  { label: 'Embarcaciones', value: 'EMBARCACION', description: 'Yates y lanchas', icon: '/assets/svgs/motor-boat.svg' },
  { label: 'Hospedaje', value: 'HOSPEDAJE', description: 'Hoteles y cabañas', icon: '/assets/svgs/house.svg' },
  { label: 'Transporte', value: 'TRANSFER', description: 'Traslados y vehículos', icon: '/images/car.png' },
];

function selectTab(serviceType) {
  type.value = serviceType;
  router.visit(route('services.home'));
}
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

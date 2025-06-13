<template>
  <div class="flex flex-col gap-y-1">
    <h4 class="text-lg font-semibold text-gray-800">Lugares de recogida</h4>
    <span class="text-xs italic">
      Confirma el lugar de recogida para que podamos coordinar tu servicio
      <span class="text-gray-600 font-bold bg-amber-200 p-0.5 italic">¡Recuerda es gratis!</span>
    </span>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      <div v-for="point in points" class="flex gap-x-4 items-center text-md">
        <i class="fa-solid fa-map-pin text-red-600"></i>
        <h5 class="text-gray-800 capitalize font-semibold first-letter:text-lg">{{ point }}</h5>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const points = ref()
const props = defineProps({
  service: Array,
});

onMounted(() => {
  points.value = JSON.parse(props.service.recogidas);
});
</script>
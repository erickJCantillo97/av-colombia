<template>
    <p class="text-lg font-semibold text-gray-800">Podemos Recogerte en:</p>
    <div v-for="point in points" class="flex gap-x-2 items-center text-md">
        <i class="fa-solid fa-location-pin text-teal-600"></i>
        <p class="text-gray-800 capitalize">{{ point }}</p>
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
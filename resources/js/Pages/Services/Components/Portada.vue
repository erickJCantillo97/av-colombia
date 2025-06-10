<template>
  <div class="flex gap-2 w-full">
    <img
      :src="portada ?? '/images/productos/baru-1.webp'"
      class="w-[95vw] h-[30vh] shadow-lg rounded-xl object-cover"
      alt="asdasd"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  images: Array,
  portada: String,
});
</script>

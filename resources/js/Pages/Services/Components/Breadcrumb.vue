<template>
  <div class="flex justify-star w-full rounded-xl py-2 text-xs md:text-sm">
    <div v-for="(item, index) of items" class="flex gap-x-2 items-center">
      <div v-if="index === 0" class="">
        <Link href="/">
          <i :class="home.icon"></i>
        </Link>
        <i class="fa-solid fa-caret-right mx-2"></i>
      </div>
      <div class="">
        {{ item.label }}
      </div>
      <div v-if="index < items.length - 1" class="mx-2">
        <i class="fa-solid fa-caret-right"></i>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Link } from "@inertiajs/vue3";
import { Breadcrumb } from "primevue";
import { ref } from "vue";
defineProps({});

const home = ref({
  icon: "pi pi-home",
  route: "/introduction",
});
const items = ref([{ label: "Tours" }, { label: "Cartagena" }, { label: "Erick" }]);
</script>

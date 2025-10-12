<template>
  <GuestLayout>
    <div class="sticky top-16 z-20 bg-white  py-2 px-4">
      <div class="w-full flex justify-between items-center md:px-4">
        <span v-if="type === 'HOSPEDAJE'" class="font-bold text-xs md:text-lg">
          {{ accommodationsFilter.length }} alojamientos encontrados
        </span>
        <span v-else class="font-bold text-xs md:text-lg">
          {{ servicesFilter.length }} servicios encontrados
        </span>
        <input v-model="search" type="text" placeholder="Buscar..."
          class="w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

    </div>
    <div class="w-full flex flex-col items-center justify-center gap-y-4 mt-4">
      <ul v-if="type != 'HOSPEDAJE'" class="w-full gap-2 md:gap-4 py-1 grid grid-cols-1 md:grid-cols-6 px-4">
        <Product :service="service" v-for="service in servicesFilter" :key="service.id" />
      </ul>
      <AccomodationsList class="w-full" v-else :data="accommodationsFilter" />
      <div class="w-full flex items-center justify-center py-4" v-if="searching">
        <Loading v-if="searching" />
      </div>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import Product from "./Product.vue";
import Loading from "@/Components/Loading.vue";
import Service from "@/Models/Services/Service";
import AccomodationsList from "../Welcome/AccomodationsList.vue";

const available_accommodations = ref([]);
const type = ref("");
const serviceModel = new Service();
const search = ref("");
const services = ref([]);
const page = ref(1);
const hasMore = ref(true);
const searching = ref(false);

async function fetchServices(reset = false) {
  if (searching.value || (!hasMore.value && !reset)) return;
  searching.value = true;
  if (reset) {
    services.value = [];
    page.value = 1;
    hasMore.value = true;
  }
  try {

    const result = await serviceModel.getServicePagination(page.value, 10);
    if (result && Array.isArray(result.data)) {
      if (reset) services.value = result.data;
      else services.value.push(...result.data);
      hasMore.value = !!result.next_page_url;
    } else if (Array.isArray(result)) {
      // fallback si backend no responde con paginación
      if (reset) services.value = result;
      else services.value.push(...result);
      hasMore.value = false;
    } else if (result && result.available_accommodations && Array.isArray(result.available_accommodations)) {
      type.value = "HOSPEDAJE";
      console.log(result.available_accommodations);
      available_accommodations.value=result.available_accommodations;
    }
    page.value++;
  } finally {
    searching.value = false;
  }
}

function onScroll() {
  if (searching.value || !hasMore.value) return;
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.offsetHeight;
  if (scrollY + windowHeight + 800 >= docHeight) {
    fetchServices();
  }
}

const servicesFilter = computed(() => {
  if (!search.value) return services.value;
  const term = search.value.toLowerCase();
  return services.value.filter(s => s.title.toLowerCase().includes(term)
    || s.description.toLowerCase().includes(term)
  );
});

const accommodationsFilter = computed(() => {
  if (!search.value) return available_accommodations.value;
  const term = search.value.toLowerCase();
  return available_accommodations.value.filter(s => s.title.toLowerCase().includes(term)
    || s.description.toLowerCase().includes(term)
  );
});

onMounted(() => {
  fetchServices(true);
  window.addEventListener('scroll', onScroll);
});


</script>

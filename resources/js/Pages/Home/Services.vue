<template>
  <GuestLayout>
    <div class="sticky top-16 z-20 bg-white py-2 px-4">
      <div class="w-full flex justify-between items-center md:px-4">
        <span class="font-bold text-xs md:text-lg">
          {{ itemsFilter.length }} {{ isHotel ? 'alojamientos' : 'servicios' }} encontrados
        </span>
        <input
        v-model="search"
        type="text"
        placeholder="Buscar..."
        class="w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-y-4 mt-4">
      <ul class="w-full gap-2 md:gap-4 py-1 grid grid-cols-1 md:grid-cols-6 px-4">
        <template v-if="isHotel">
          <AccommodationCard :accommodation="item" v-for="item in itemsFilter" :key="item.id" />
        </template>
        <template v-else>
          <Product :service="item" v-for="item in itemsFilter" :key="item.id" />
        </template>
      </ul>
      <div class="w-full flex items-center justify-center py-4" v-if="searching">
        <Loading v-if="searching" />
      </div>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { computed, onMounted, ref } from "vue";
import Product from "./Product.vue";
import AccommodationCard from "./AccommodationCard.vue";
import Loading from "@/Components/Loading.vue";
import Service from "@/Models/Services/Service";
import Accommodation from "@/Models/Accommodation/Accommodation";
import state from "@/store/searchStore";

const search = ref("");
const items = ref([]);
const page = ref(1);
const hasMore = ref(true);
const searching = ref(false);

// Determinar si estamos buscando hoteles o servicios
const isHotel = computed(() => {
  return state.type.value.value === 'HOSPEDAJE';
});

async function fetchItems(reset = false) {
  if (searching.value || (!hasMore.value && !reset)) return;
  searching.value = true;
  
  if (reset) {
    items.value = [];
    page.value = 1;
    hasMore.value = true;
  }
  
  try {
    let result;
    
    if (isHotel.value) {
      // Buscar acomodaciones
      const accommodationModel = new Accommodation();
      result = await accommodationModel.getAccommodationPagination(page.value, 10);
    } else {
      // Buscar servicios
      const serviceModel = new Service();
      result = await serviceModel.getServicePagination(page.value, 10);
    }
    
    console.log(result);
    
    if (result && Array.isArray(result.data)) {
      if (reset) items.value = result.data;
      else items.value.push(...result.data);
      hasMore.value = !!result.next_page_url;
    } else if (Array.isArray(result)) {
      // fallback si backend no responde con paginación
      if (reset) items.value = result;
      else items.value.push(...result);
      hasMore.value = false;
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
    fetchItems();
  }
}

const itemsFilter = computed(() => {
  if (!search.value) return items.value;
  const term = search.value.toLowerCase();
  
  if (isHotel.value) {
    // Filtrar acomodaciones
    return items.value.filter(item => 
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.description && item.description.toLowerCase().includes(term)) ||
      (item.city && item.city.toLowerCase().includes(term)) ||
      (item.address_line_1 && item.address_line_1.toLowerCase().includes(term))
    );
  } else {
    // Filtrar servicios
    return items.value.filter(item => 
      (item.title && item.title.toLowerCase().includes(term)) ||
      (item.description && item.description.toLowerCase().includes(term))
    );
  }
});

onMounted(() => {
  fetchItems(true);
  window.addEventListener('scroll', onScroll);
});
</script>

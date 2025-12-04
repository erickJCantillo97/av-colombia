<template>
  <GuestLayout>
    <!-- Header moderno con gradiente -->
    <div class="sticky top-16 z-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 shadow-2xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <!-- Contador de resultados -->
          <div class="flex items-center gap-3">
            <div class="h-10 w-1 bg-gradient-to-b from-gray-800 to-black rounded-full"></div>
            <div>
              <p class="text-sm text-gray-400">Resultados</p>
              <p class="text-2xl font-bold text-white">
                {{ totalCount }}
                <span class="text-base font-normal text-gray-400">{{ isHotel ? 'alojamientos' : 'experiencias' }}</span>
              </p>
            </div>
          </div>

          <!-- Barra de búsqueda elegante -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="fas fa-search text-gray-500"></i>
              </div>
              <input
                v-model="search"
                @input="debouncedSearch"
                type="text"
                placeholder="Buscar experiencias..."
                class="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-black focus:ring-2 focus:ring-gray-800/40 transition-all duration-200 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Grid de productos -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <template v-if="isHotel">
            <AccommodationCard :accommodation="item" v-for="item in itemsFilter" :key="item.id" />
          </template>
          <template v-else>
            <Product :service="item" v-for="item in itemsFilter" :key="item.id" />
          </template>
        </div>

        <!-- Loading elegante -->
        <div class="flex items-center justify-center py-12" v-if="searching">
          <div class="flex flex-col items-center gap-4">
            <Loading v-if="searching" />
            <p class="text-gray-500 text-sm">Cargando más experiencias...</p>
          </div>
        </div>

        <!-- Estado vacío -->
        <div v-if="!searching && itemsFilter.length === 0" class="flex flex-col items-center justify-center py-20">
          <div class="text-center">
            <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">No se encontraron resultados</h3>
            <p class="text-gray-500">Intenta con otros términos de búsqueda</p>
          </div>
        </div>
      </div>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
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
const totalCount = ref(0);

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
    const searchTerm = search.value.trim();
    
    if (isHotel.value) {
      // Buscar acomodaciones
      const accommodationModel = new Accommodation();
      result = await accommodationModel.getAccommodationPagination(page.value, 10, searchTerm);
    } else {
      // Buscar servicios
      const serviceModel = new Service();
      result = await serviceModel.getServicePagination(page.value, 10, searchTerm);
    }
    
    console.log(result);
    
    if (result && Array.isArray(result.data)) {
      if (reset) items.value = result.data;
      else items.value.push(...result.data);
      hasMore.value = !!result.next_page_url;
      // Actualizar el total count si viene en la respuesta
      if (result.total !== undefined) {
        totalCount.value = result.total;
      }
    } else if (Array.isArray(result)) {
      // fallback si backend no responde con paginación
      if (reset) items.value = result;
      else items.value.push(...result);
      hasMore.value = false;
      totalCount.value = result.length;
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

// Watch para cuando cambie el valor de búsqueda
let searchTimeout = null;
const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchItems(true);
  }, 500);
};

// Simplemente retornamos los items ya que el filtro se hace en el backend
const itemsFilter = computed(() => {
  return items.value;
});

onMounted(() => {
  fetchItems(true);
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  if (searchTimeout) clearTimeout(searchTimeout);
});
</script>

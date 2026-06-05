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

          <!-- Barra de búsqueda destacada -->
          <div class="w-full md:flex-1 md:max-w-xl">
            <label for="services-search" class="sr-only">Buscar</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="fas fa-search text-lg text-gray-400 group-focus-within:text-black transition-colors duration-200"></i>
              </div>
              <input
                id="services-search"
                v-model="search"
                @input="debouncedSearch"
                @keydown.escape="clearSearch"
                type="text"
                :placeholder="isHotel ? 'Buscar alojamientos por nombre o ciudad...' : 'Buscar experiencias por nombre o destino...'"
                class="w-full pl-12 pr-12 py-4 bg-white border-2 border-white rounded-2xl text-gray-900 text-base font-medium placeholder-gray-400 shadow-xl focus:border-black focus:ring-4 focus:ring-white/30 focus:outline-none transition-all duration-200"
              />
              <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
                <i v-if="isSearchPending" class="fas fa-spinner fa-spin text-gray-400 text-lg"></i>
                <button
                  v-else-if="search"
                  type="button"
                  @click="clearSearch"
                  aria-label="Limpiar búsqueda"
                  class="text-gray-400 hover:text-black transition-colors duration-200"
                >
                  <i class="fas fa-times-circle text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Filtro por categoría -->
        <div v-if="!isHotel && categories.length" class="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            @click="selectCategory(null)"
            :class="[chipBase, selectedCategory === null ? 'bg-white text-gray-900 border-white shadow-md' : chipIdle]"
          >
            Todas
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            @click="selectCategory(cat.id)"
            :class="[chipBase, selectedCategory === cat.id ? chipActive : chipIdle]"
            :style="selectedCategory === cat.id ? { backgroundColor: cat.color || '#6b7280' } : null"
          >
            <span
              v-if="selectedCategory !== cat.id"
              class="w-2.5 h-2.5 rounded-full shrink-0"
              :style="{ backgroundColor: cat.color || '#9ca3af' }"
            ></span>
            <i v-if="cat.icon" :class="cat.icon" class="text-xs"></i>
            <span>{{ cat.title }}</span>
          </button>
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

defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

const search = ref("");
const isSearchPending = ref(false);
const selectedCategory = ref(null);
const items = ref([]);

const chipBase =
  "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200";
const chipActive = "text-white border-transparent shadow-md";
const chipIdle = "bg-white/5 text-gray-300 border-gray-700 hover:bg-white/10 hover:text-white";
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
      result = await serviceModel.getServicePagination(page.value, 10, searchTerm, selectedCategory.value);
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
  isSearchPending.value = true;
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    await fetchItems(true);
    isSearchPending.value = false;
  }, 500);
};

function clearSearch() {
  if (!search.value && !isSearchPending.value) return;
  search.value = "";
  if (searchTimeout) clearTimeout(searchTimeout);
  isSearchPending.value = false;
  fetchItems(true);
}

function selectCategory(id) {
  if (selectedCategory.value === id) return;
  selectedCategory.value = id;
  fetchItems(true);
}

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

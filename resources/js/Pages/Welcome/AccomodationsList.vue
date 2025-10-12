<template>
  <div class="p-4" v-if="store.getAccommodations.length > 0">
    <div class="mb-2 flex justify-between items-center">
      <h1 class="font-bold text-xl">¡Hospedajes Recomendados!</h1>
      <div class="flex items-center gap-2">
        <!-- Botones para controlar el scroll del contenedor horizontal -->
        <button @click="scrollLeft" aria-label="Scroll izquierda" class="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <button @click="scrollRight" aria-label="Scroll derecha" class="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    <div ref="scroller" class="flex gap-x-2 overflow-x-auto hide-scrollbar touch-scroll py-2 snap-x snap-mandatory justify-center" tabindex="0">
      <a :href="route('show.services', {id: accommodation.id, type: 'hospedaje'})" class="flex-shrink-0 px-1 snap-start w-1/2 md:w-1/6"
      v-for="accommodation in store.getAccommodations" :key="accommodation.id">
        <div class="bg-white overflow-hidden w-full flex flex-col">
          <div class="overflow-hidden rounded-xl bg-gray-200">
            <img v-if="accommodation.photos && accommodation.photos.length > 0" :src="'https://avcolombia.net/' + accommodation.photos[0].url"
                 class="w-full h-60 object-cover rounded-xl" />
            <div v-else class="h-60 w-full flex items-center justify-center rounded-xl">
              <Logo class="w-16 h-16" /> <!-- Asumiendo que tienes un componente Logo -->
            </div>
          </div>
          <div class="py-4 flex flex-col">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-md font-semibold text-gray-800 truncate">{{ accommodation.name }}</h3>
              <div class="text-sm text-yellow-500 w-16 border border-yellow-500 text-center rounded-md">⭐ {{ accommodation.star_rating }}</div>
            </div>
            <span v-if="getMinPrice(accommodation.rooms)" class="text-sm font-bold text-gray-600 whitespace-nowrap">
              Desde {{ currencyFormat(getMinPrice(accommodation.rooms)) }}
            </span>
            <p class="text-sm text-gray-500 truncate">{{ accommodation.description.substring(0, 50) }}...</p>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div v-else-if="store.loading">Cargando hospedajes...</div>
  <div v-else-if="store.error">{{ store.error }}</div>
  <div v-else>No hay hospedajes disponibles.</div>
</template>

<script setup>
import { useAccommodationsStore } from '@/stores/Accommodations'; // Ajusta el path si es necesario (nota: en tu snippet original usas 'Accommodations', pero el store es 'accommodations')
import { onMounted, ref } from 'vue';
import Logo from '@/Components/logo.vue'; // Asumiendo que existe este componente
import { currencyFormat } from '@/composable/useCommonUtilities'; // Importa la función de formato de moneda

const store = useAccommodationsStore();
const scroller = ref(null);


const props = defineProps({
  data: {
    type: Array,
    required: false,
    default: () => []
  }
});
// Fetch inicial de alojamientos

const accommodations = ref([]);

// Fetch inicial de alojamientos
onMounted(() => {
  store.fetchAccommodations();
  if (props.data && props.data.length > 0) {
    accommodations.value = props.data;
    return;
  }else{
    accommodations.value =store.getAccommodations();
  }
});

/**
 * Función para calcular el precio mínimo de las habitaciones de un alojamiento.
 * @param {Array} rooms - Array de habitaciones del alojamiento.
 * @returns {number|null} Precio mínimo o null si no hay habitaciones.
 */
const getMinPrice = (rooms) => {
  if (!rooms || rooms.length === 0) return null;
  return Math.min(...rooms.map(room => room.price_per_night));
};

/**
 * Función para desplazar el carrusel hacia la izquierda.
 */
function scrollLeft() {
  const el = scroller.value;
  if (!el) return;
  const amount = Math.min(el.clientWidth, 300);
  el.scrollBy({ left: -amount, behavior: 'smooth' });
}

/**
 * Función para desplazar el carrusel hacia la derecha.
 */
function scrollRight() {
  const el = scroller.value;
  if (!el) return;
  const amount = Math.min(el.clientWidth, 300);
  el.scrollBy({ left: amount, behavior: 'smooth' });
}
</script>

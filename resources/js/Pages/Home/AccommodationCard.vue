<template>
  <Link :href="route('accommodations.show', accommodation.id)"
    class="relative flex flex-col bg-white justify-between rounded-xl overflow-hidden transition-transform transform hover:scale-[1.02] w-full max-w-sm mx-auto shadow-md">
    <!-- Imagen superior con esquinas redondeadas -->
    <div class="w-full h-60 overflow-hidden rounded-xl p-2">
      <img v-if="accommodationModel.getMainPhoto() !== 'https://avcolombia.net/images/logo.webp'"
        :src="accommodationModel.getMainPhoto()" :alt="accommodation.name"
        class="w-full h-full object-cover rounded-xl" />
      <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl py-4">
        <Logo />
      </div>
    </div>

    <!-- Contenido -->
    <div class="p-5 flex flex-col gap-2">
      <!-- Título y ubicación -->
      <h3 class="text-lg font-bold leading-tight line-clamp-2" v-tooltip="`${accommodation.name}`">
        {{ accommodation.name }}
      </h3>

      <!-- Ubicación -->
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <i class="fa-solid fa-location-dot text-gray-400"></i>
        <span class="text-gray-700">{{ accommodation.city }}, {{ accommodation.country }}</span>
      </div>

      <!-- Rating y tipo -->
      <div class="flex items-center gap-4 mt-2">
        <div class="flex items-center gap-2 text-sm text-gray-600" v-if="accommodation.star_rating">
          <i class="fa-solid fa-star text-yellow-400"></i>
          <span class="text-gray-900 font-medium">{{ accommodation.star_rating }} estrellas</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-600" v-if="accommodationModel.getAverageRating() > 0">
          <i class="fa-solid fa-heart text-red-400"></i>
          <span class="text-gray-900 font-medium">{{ accommodationModel.getAverageRating() }}/5</span>
        </div>
      </div>

      <!-- Precio -->
      <div class="flex items-center gap-2 mt-3">
        <span class="text-sm text-gray-600">Desde</span>
        <span class="text-xl font-bold text-gray-900">
          {{ currencyFormat(accommodationModel.getMinPrice()) }}
        </span>
        <span class="text-sm text-gray-600">por noche</span>
      </div>

      <!-- Amenidades destacadas -->
      <div class="flex items-center gap-2 mt-2 flex-wrap" v-if="accommodation.amenities && accommodation.amenities.length">
        <span v-for="amenity in accommodation.amenities.slice(0, 3)" :key="amenity.id"
          class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
          {{ amenity.name }}
        </span>
        <span v-if="accommodation.amenities.length > 3" class="text-xs text-gray-500">
          +{{ accommodation.amenities.length - 3 }} más
        </span>
      </div>

      <!-- Acciones: botón principal y corazón -->
      <div class="mt-4 flex items-center gap-3">
        <button
          class="flex-1 bg-black text-white rounded-full py-3 px-5 text-center font-medium hover:opacity-95 transition">
          Ver disponibilidad
        </button>

        <button type="button"
          class="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center border border-gray-100 hover:bg-gray-50">
          <i class="fa-regular fa-heart text-red-400"></i>
        </button>
      </div>
    </div>
  </Link>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import Logo from "@/Components/logo.vue";
import Accommodation from "@/Models/Accommodation/Accommodation";
import { useCommonUtilities } from "@/composable/useCommonUtilities.js";

const { currencyFormat } = useCommonUtilities();

const props = defineProps({
  accommodation: Object,
});

const accommodationModel = new Accommodation(props.accommodation);
</script>

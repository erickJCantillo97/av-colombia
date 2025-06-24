<template>
  <div
    class="flex p-4 rounded-lg shadow-xl gap-x-4 items-center w-full justify-between"
    v-if="typeList.value == 'list'"
  >
    <div class="flex gap-x-5">
      <img
        :src="
          service.portada == '/laravel/public/'
            ? 'https://avcolombia.net/images/logo.webp'
            : service.portada
        "
        alt="portada"
        class="h-full w-48 md:w-96 rounded-md object-contain shadow-sm"
      />
      <div class="flex flex-col">
        <h3 class="text-2xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          {{ service.title }}
        </h3>
        <div
          v-html="truncateString(service.description, esMovil() ? 100 : 350)"
          class="mt-4 text-gray-500 text-justify"
        ></div>
        <div class="flex justify-start gap-x-4">
          <span
            v-for="include in includes"
            class="text-sm my-2 italic text-teal-900 capitalize"
          >
            <i class="fa-solid fa-check text-teal-500"></i>
            {{ truncateString(include.toLowerCase(), 20) }}
          </span>
        </div>
        <div
          v-if="form.date"
          class="mt-3 text-gray-900 flex w-full justify-between items-center"
        >
          <div>
            <span>Desde</span>
            <h3 class="font-bold text-lg">
              {{
                USDollar.format(
                  service.availabilities
                    .find((x) => formatDate(x.start_date) <= formatDate(form.date))
                    ?.precies.find((x) => x.value > 0).value ?? 0
                )
              }}
              por Persona
            </h3>
          </div>
        </div>
        <div v-else>Ver precios</div>
      </div>
    </div>

    <Link :href="route('show.services', service.slug)">
      <Button>Ver más</Button>
    </Link>
  </div>
  <a
    :href="route('show.services', service.slug)"
    v-else
    class="relative flex flex-col bg-white rounded-xl hover:scale-105 transition duration-500 ease-in-out hover:shadow-lg cursor-pointer overflow-hidden"
  >
    <!-- Imagen con badges superpuestos -->
    <div class="relative">
      <!-- Badge Popular -->
      <div class="absolute top-3 left-3 z-10">
        <span class="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Popular
        </span>
      </div>
      
      <!-- Ícono de favoritos -->
      <div class="absolute top-3 right-3 z-10">
        <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
          <i class="fa-solid fa-heart text-gray-400 hover:text-red-500 transition-colors"></i>
        </button>
      </div>

      <!-- Imagen -->
      <div class="h-48 w-full">
        <img
          v-if="service.portada != '/laravel/public/'"
          :src="service.portada"
          alt="portada"
          class="h-full w-full object-cover"
        />
        <div
          v-else
          class="h-full w-full bg-gray-100 flex flex-col items-center justify-center"
        >
          <Logo></Logo>
        </div>
      </div>
    </div>

    <!-- Contenido de la tarjeta -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Título -->
      <h3
        class="text-lg font-semibold text-gray-900 line-clamp-2 mb-2"
        v-tooltip="`${service.title}`"
      >
        {{ service.title }}
      </h3>

      <!-- Detalles del servicio -->
      <div class="text-sm text-gray-600 mb-3">
        <span>
          <i class="fa-solid fa-map-marker-alt text-red-500 mr-1"></i>
          {{ service.city }}
        </span>
        <span class="mx-2">•</span>
        <span>{{ service.duration }} {{ service.duration_unit }} Aprox.</span>
      </div>

      <!-- Precio -->
      <div class="mb-3">
        <span class="text-sm text-gray-600">Desde </span>
        <span class="font-semibold text-gray-900">{{ currencyFormat(serviceModel.getPrice()) }}</span>
        <span class="text-sm text-gray-600" v-if="service.type == 'TOUR'"> por viajero  </span>
        <span class="text-sm text-gray-600" v-else-if="service.type == 'EMBARCACION'"> por cada {{ service.capacidad_max }} pasajeros </span>

      </div>

      <!-- Rating y reseñas -->
      <div class="flex items-center gap-1 mt-auto">
        <div class="flex items-center">
          <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
          <span class="font-semibold text-sm text-gray-900 ml-1">4.96</span>
        </div>
        <span class="text-sm text-gray-500 ml-2">(1558 reseñas)</span>
      </div>
    </div>
  </a>
</template>

<script setup>
import { useCommonUtilities,  } from "@/composable/useCommonUtilities.js";
import { Link } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";
import { useHomeStore } from "@/stores/HomeStore";
import { storeToRefs } from "pinia";
import Logo from "@/Components/logo.vue";
import state from "@/store/searchStore";
import Service from "@/Models/Services/Service";
const store = useHomeStore();
const { form, typeList } = storeToRefs(store);

const { truncateString, esMovil, currencyFormat } = useCommonUtilities();


const includes = ref([]);

const props = defineProps({
  service: Object,
  type: {
    type: String,
    default: "list",
  },
});

const serviceModel = new Service(props.service);

</script>

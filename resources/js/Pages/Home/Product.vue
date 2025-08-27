<template>
  <div class="flex p-4 rounded-lg shadow-xl gap-x-4 items-center w-full justify-between"
    v-if="typeList.value == 'list'">
    <div class="flex gap-x-5">
      <img :src="service.portada == '/laravel/public/'
          ? 'https://avcolombia.net/images/logo.webp'
          : service.portada
        " alt="portada" class="h-full w-48 md:w-96 rounded-md object-contain shadow-sm" />
      <div class="flex flex-col">
        <h3 class="text-2xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          {{ service.title }}
        </h3>
        <div v-html="truncateString(service.description, esMovil() ? 100 : 350)"
          class="mt-4 text-gray-500 text-justify"></div>
        <div class="flex justify-start gap-x-4">
          <span v-for="include in includes" class="text-sm my-2 italic text-teal-900 capitalize">
            <i class="fa-solid fa-check text-teal-500"></i>
            {{ truncateString(include.toLowerCase(), 20) }}
          </span>
        </div>
        <div v-if="form.date" class="mt-3 text-gray-900 flex w-full justify-between items-center">
          <div>
            <span>Desde</span>
            <h3 class="font-bold text-lg">
              {{
                USDollar.format(
                  service.availabilities
                    .find((x) => formatDate(x.start_date) <= formatDate(form.date))?.precies.find((x) => x.value > 0).value ??
                  0
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
  <Link :href="route('show.services', service.slug)" v-else
    class="relative flex flex-col bg-white  justify-between rounded-2xl overflow-hidden transition-transform transform hover:scale-[1.02] w-full max-w-sm mx-auto shadow-md">
    <!-- Imagen superior con esquinas redondeadas -->
    <div class="w-full h-60 overflow-hidden rounded-xl p-2">
      <img v-if="service.portada != '/laravel/public/'" :src="`https://avcolombia.net/${service.portada}`" alt="portada"
        class="w-full h-full object-cover rounded-3xl" />
      <div v-else class="w-full h-full flex items-center justify-center bg-white rounded-xl py-4">
        <Logo />
      </div>
    </div>

    <!-- Contenido -->
    <div class="p-5 flex flex-col gap-2">
      <!-- Título y subtítulo -->
      <div>
        <h3 class="text-lg font-bold text-gray-900 leading-tight line-clamp-2" v-tooltip="`${service.title}`">{{ service.title }}</h3>
        <!-- <p class="text-sm text-gray-500 mt-1">{{ service.subtitle ?? (service.type ? service.type.toLowerCase().replace('_',' ') : '') }}</p> -->
      </div>

      <!-- Badges: precio y ciudad -->
      <div class="flex items-center gap-4 mt-3">
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <i class="fa-solid fa-tag text-gray-400"></i>
          <span class="text-gray-900 font-semibold">{{ currencyFormat(serviceModel.getPrice()) }}</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-600" v-if="service.type == 'TOUR'">
          <i class="fa-solid fa-clock"></i>
          <span class="text-gray-900 font-medium">{{ service.duration }} {{ service.duration_unit }} Aprox</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-600" v-if="service.type == 'EMBARCACION'">
          <i class="fa-solid fa-users"></i>
          <span class="text-gray-900 font-medium">{{ service.capacidad_max }} Personas</span>
        </div>

        <div class="flex-1"></div>
      </div>

      <!-- Acciones: botón principal y corazón -->
      <div class="mt-4 flex items-center gap-3">
        <button
          class="flex-1 bg-black text-white rounded-full py-3 px-5 text-center font-medium hover:opacity-95 transition">
          {{ service.cta_text ?? 'Ver más' }}
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
import { useCommonUtilities, } from "@/composable/useCommonUtilities.js";
import { Link } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";
import { useHomeStore } from "@/stores/HomeStore";
import { storeToRefs } from "pinia";
import Logo from "@/Components/logo.vue";
import state from "@/store/searchStore";
import Service from "@/Models/Services/Service";
import { duration } from "moment/moment";
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

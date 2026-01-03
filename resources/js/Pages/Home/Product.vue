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
  <Link :href="route('show.services', service.slug)" v-else-if="serviceModel.getPrice() > 0"
    class="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-black h-full hover:-translate-y-2">
    
    <!-- Imagen con hover effect -->
    <div class="relative w-full h-64 overflow-hidden">
      <img 
        v-if="service.portada != '/laravel/public/'" 
        :src="`https://avcolombia.net/${service.portada}`" 
        alt="portada"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <Logo />
      </div>
      
      <!-- Overlay gradiente mejorado -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <!-- Rating badge inferior -->
      <div class="absolute bottom-4 left-4 z-10 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div class="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <div class="flex items-center gap-1.5">
            <i class="fas fa-star text-yellow-400 text-sm"></i>
            <span class="font-bold text-gray-900 text-sm">4.9</span>
            <span class="text-gray-500 text-xs">(50+)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido de la card -->
    <div class="flex-1 flex flex-col p-5 gap-4 bg-gradient-to-b from-white to-gray-50/50">
      <!-- Título -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-black transition-colors duration-200" v-tooltip="`${service.title}`">
          {{ service.title }}
        </h3>
      </div>
      
      <!-- Iconos informativos -->
      <div class="flex flex-wrap items-center gap-4 text-sm">
        <div class="flex items-center gap-2 text-gray-600">
          <i class="fa-solid fa-clock text-black"></i>
          <span class="font-medium" v-if="service.type == 'TOUR'">{{ service.duration }} {{ service.duration_unit }}</span>
        </div>

        <div class="flex items-center gap-2 text-gray-600" v-if="service.type == 'EMBARCACION'">
          <i class="fa-solid fa-users text-black"></i>
          <span class="font-medium">{{ service.capacidad_max }} personas</span>
        </div>
      </div>

      <!-- Spacer para empujar el precio y botón hacia abajo -->
      <div class="flex-1"></div>

      <!-- Precio y CTA -->
      <div class="space-y-4 mt-auto">
        <div class="flex items-end justify-between pt-4 border-t border-gray-200">
          <div>
            <p class="text-xs text-gray-500 font-medium mb-1">Desde</p>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl font-bold text-black">
                {{ currencyFormat(serviceModel.getPrice()) }}
              </span>
              <span class="text-sm text-gray-500 font-medium">/ persona</span>
            </div>
          </div>
        </div>

        <!-- Botón CTA mejorado -->
        <button
          class="w-full py-3.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
        >
          <span>{{ service.cta_text ?? 'Ver detalles' }}</span>
          <i class="fas fa-arrow-right transform group-hover/btn:translate-x-1 transition-transform duration-200"></i>
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

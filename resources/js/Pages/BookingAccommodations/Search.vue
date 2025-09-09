<template>
  <AppLayout title="Buscar Alojamientos">
    <div class="h-[90vh] md:h-[99vh] overflow-y-auto">
      <div class="max-w-7xl mx-auto p-6">
        
        <!-- Formulario de Búsqueda -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 class="text-2xl font-bold mb-6">Buscar Alojamientos</h1>
          
          <form @submit.prevent="search" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Destino -->
              <Input
                label="Ciudad o País"
                v-model="searchForm.city"
                placeholder="¿A dónde quieres ir?"
                icon="fa-solid fa-map-marker-alt"
              />

              <!-- Fechas -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <VueDatePicker
                  v-model="searchForm.check_in_date"
                  :min-date="new Date()"
                  :teleport="true"
                  auto-apply
                  :enable-time-picker="false"
                  timezone="America/Bogota"
                  placeholder="Fecha de entrada"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <VueDatePicker
                  v-model="searchForm.check_out_date"
                  :min-date="searchForm.check_in_date || new Date()"
                  :teleport="true"
                  auto-apply
                  :enable-time-picker="false"
                  timezone="America/Bogota"
                  placeholder="Fecha de salida"
                />
              </div>

              <!-- Huéspedes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Huéspedes</label>
                <div class="grid grid-cols-2 gap-2">
                  <Input
                    label="Adultos"
                    v-model="searchForm.guests_adults"
                    type="number"
                    min="1"
                    size="small"
                  />
                  <Input
                    label="Niños"
                    v-model="searchForm.guests_children"
                    type="number"
                    min="0"
                    size="small"
                  />
                </div>
              </div>
            </div>

            <!-- Filtros Avanzados -->
            <div class="border-t pt-4">
              <Button
                @click="showAdvancedFilters = !showAdvancedFilters"
                icon="fa-solid fa-filter"
                :label="showAdvancedFilters ? 'Ocultar Filtros' : 'Filtros Avanzados'"
                severity="secondary"
                text
              />
              
              <div v-show="showAdvancedFilters" class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Tipo de Alojamiento -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <Dropdown
                    v-model="searchForm.type"
                    :options="accommodationTypes"
                    option-label="label"
                    option-value="value"
                    placeholder="Cualquier tipo"
                  />
                </div>

                <!-- Rating -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Rating Mínimo</label>
                  <Rating 
                    v-model="searchForm.star_rating" 
                    :stars="5" 
                    :cancel="true"
                  />
                </div>

                <!-- Precio -->
                <div>
                  <Input
                    label="Precio Mínimo"
                    v-model="searchForm.min_price"
                    type="number"
                    min="0"
                    currency="COP"
                  />
                </div>

                <div>
                  <Input
                    label="Precio Máximo"
                    v-model="searchForm.max_price"
                    type="number"
                    min="0"
                    currency="COP"
                  />
                </div>
              </div>

              <!-- Amenidades -->
              <div v-show="showAdvancedFilters" class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Amenidades</label>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <div 
                    v-for="amenity in amenities" 
                    :key="amenity.id"
                    class="flex items-center space-x-2"
                  >
                    <Checkbox
                      :inputId="'search-amenity-' + amenity.id"
                      v-model="searchForm.amenities"
                      :value="amenity.id"
                    />
                    <label 
                      :for="'search-amenity-' + amenity.id"
                      class="text-sm cursor-pointer"
                    >
                      {{ amenity.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón de Búsqueda -->
            <div class="flex justify-center pt-4 border-t">
              <Button
                type="submit"
                icon="fa-solid fa-search"
                label="Buscar Alojamientos"
                :loading="searching"
                size="large"
              />
            </div>
          </form>
        </div>

        <!-- Resultados de Búsqueda -->
        <div v-if="searchPerformed">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">
              {{ accommodations.length }} alojamientos encontrados
            </h2>
            <div class="text-sm text-gray-500">
              {{ formatSearchParams }}
            </div>
          </div>

          <div v-if="accommodations.length === 0" class="text-center py-12">
            <div class="text-gray-500 text-lg mb-4">
              <i class="fa-solid fa-search text-4xl mb-4 block"></i>
              No se encontraron alojamientos con estos criterios
            </div>
            <p class="text-gray-400">Intenta modificar tus filtros de búsqueda</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="accommodation in accommodations" 
              :key="accommodation.id"
              class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              @click="viewAccommodation(accommodation)"
            >
              <!-- Imagen -->
              <div class="h-48 bg-gray-200 relative">
                <img 
                  v-if="accommodation.photos?.[0]"
                  :src="accommodation.photos[0].url" 
                  :alt="accommodation.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
                  <i class="fa-solid fa-image text-gray-500 text-2xl"></i>
                </div>
                
                <Badge 
                  :value="accommodation.type" 
                  severity="info"
                  class="absolute top-2 left-2"
                />
                
                <Rating 
                  :model-value="accommodation.star_rating" 
                  readonly 
                  :cancel="false"
                  class="absolute top-2 right-2 bg-white bg-opacity-75 p-1 rounded"
                />
              </div>

              <!-- Contenido -->
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-2 line-clamp-1">{{ accommodation.name }}</h3>
                
                <div class="flex items-center text-gray-500 text-sm mb-2">
                  <i class="fa-solid fa-map-marker-alt mr-1"></i>
                  {{ accommodation.city }}, {{ accommodation.country }}
                </div>

                <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ accommodation.description }}</p>

                <!-- Amenidades -->
                <div v-if="accommodation.amenities?.length > 0" class="mb-3">
                  <div class="flex flex-wrap gap-1">
                    <Badge 
                      v-for="amenity in accommodation.amenities.slice(0, 3)" 
                      :key="amenity.id"
                      :value="amenity.name" 
                      severity="secondary"
                      size="small"
                    />
                    <Badge 
                      v-if="accommodation.amenities.length > 3"
                      :value="`+${accommodation.amenities.length - 3} más`" 
                      severity="secondary"
                      size="small"
                    />
                  </div>
                </div>

                <!-- Precio y Botón -->
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-xl font-bold text-green-600">
                      {{ formatPrice(accommodation.min_price) }}
                    </div>
                    <div class="text-xs text-gray-500">por noche</div>
                  </div>
                  
                  <Button
                    @click.stop="selectAccommodation(accommodation)"
                    icon="fa-solid fa-calendar-check"
                    label="Ver Habitaciones"
                    severity="success"
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Input from "@/Components/Customs/Input.vue";
import { useForm, router } from "@inertiajs/vue3";
import { computed, ref, onMounted } from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Rating from "primevue/rating";
import Checkbox from "primevue/checkbox";
import Badge from "primevue/badge";

const props = defineProps({
  accommodations: {
    type: Array,
    default: () => []
  },
  searchParams: {
    type: Object,
    default: () => ({})
  },
  amenities: Array,
});

const showAdvancedFilters = ref(false);
const searching = ref(false);
const searchPerformed = ref(false);

const accommodationTypes = [
  { label: 'Hotel', value: 'hotel' },
  { label: 'Apartamento', value: 'apartamento' },
  { label: 'Casa', value: 'casa' },
  { label: 'Hostal', value: 'hostal' },
  { label: 'Villa', value: 'villa' },
];

const searchForm = useForm({
  city: '',
  country: '',
  type: '',
  check_in_date: null,
  check_out_date: null,
  guests_adults: 2,
  guests_children: 0,
  min_price: null,
  max_price: null,
  star_rating: null,
  amenities: [],
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const formatPrice = (price) => {
  return COP.format(price);
};

const formatSearchParams = computed(() => {
  const params = [];
  if (searchForm.check_in_date && searchForm.check_out_date) {
    const checkIn = new Date(searchForm.check_in_date).toLocaleDateString('es-CO');
    const checkOut = new Date(searchForm.check_out_date).toLocaleDateString('es-CO');
    params.push(`${checkIn} - ${checkOut}`);
  }
  params.push(`${searchForm.guests_adults} adultos`);
  if (searchForm.guests_children > 0) {
    params.push(`${searchForm.guests_children} niños`);
  }
  return params.join(', ');
});

onMounted(() => {
  // Cargar parámetros de búsqueda si existen
  if (props.searchParams) {
    Object.keys(searchForm.data()).forEach(key => {
      if (props.searchParams[key] !== undefined) {
        searchForm[key] = props.searchParams[key];
      }
    });
    searchPerformed.value = true;
  }
});

const search = () => {
  if (!searchForm.check_in_date || !searchForm.check_out_date) {
    alert('Por favor selecciona las fechas de entrada y salida');
    return;
  }

  searching.value = true;
  searchPerformed.value = true;

  searchForm.get(route('booking-accommodations.search'), {
    onFinish: () => {
      searching.value = false;
    }
  });
};

const viewAccommodation = (accommodation) => {
  router.visit(route('accommodations.show', accommodation.id));
};

const selectAccommodation = (accommodation) => {
  if (!searchForm.check_in_date || !searchForm.check_out_date) {
    alert('Por favor selecciona primero las fechas de tu estadía');
    return;
  }

  // Redirigir a la vista del alojamiento con parámetros de búsqueda
  router.visit(route('accommodations.show', accommodation.id), {
    data: {
      check_in: searchForm.check_in_date,
      check_out: searchForm.check_out_date,
      adults: searchForm.guests_adults,
      children: searchForm.guests_children,
    }
  });
};
</script>

<style>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { computed, ref, watch, onMounted } from "vue";
import searchStore from '@/store/searchStore.js';
import OverlayPanel from 'primevue/overlaypanel';
import IncludesView from "./Components/IncludesView.vue";
import Header from "@/Components/Sections/Header.vue";
import Portada from "./Components/Portada.vue";
import Breadcrumb from "./Components/Breadcrumb.vue";
import Gallery from "./Components/Gallery.vue";
import LargeBooking from "./Components/LargeBooking.vue";
import Equipament from "./Components/Equipament.vue";
import CollectionPoints from "./Components/CollectionPoints.vue";
import MiniBooking from "./Components/miniBooking.vue";

const props = defineProps({
  service: Object,
  availabilities: Array,
});

const showFullDescription = ref(false);
// datepicker state (range)
const dateRange = ref(null); // [startDate, endDate] (Date objects)
const guests = ref(1);
const op = ref(null);

// normalize availabilities into a Set of YYYY-MM-DD strings when possible
const availabilitySet = computed(() => {
  if (!props.availabilities) return new Set();
  try {
    const s = new Set();
    props.availabilities.forEach((item) => {
      if (!item) return;
      if (typeof item === 'string') {
        s.add(item.split('T')[0]);
      } else if (item.date) {
        s.add(item.date.split('T')[0]);
      } else if (item.start_date) {
        s.add(item.start_date.split('T')[0]);
      } else if (item.start) {
        s.add(item.start.split('T')[0]);
      }
    });
    return s;
  } catch (e) {
    return new Set();
  }
});

function formatYMD(d) {
  if (!d) return null;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function handleCalendarChange(val) {
  console.log('Calendar change:', val); // Para debug
  try {
    if (!val) {
      dateRange.value = null;
      searchStore.checkin.value = '';
      searchStore.checkout.value = '';
      return;
    }
    
    // VueDatePicker retorna array de Date objects cuando es range
    if (Array.isArray(val)) {
      const [startDate, endDate] = val;
      
      // Actualizar dateRange con los objetos Date
      dateRange.value = val;
      
      // Convertir a strings para el store
      searchStore.checkin.value = startDate ? formatYMD(startDate) : '';
      searchStore.checkout.value = endDate ? formatYMD(endDate) : '';
      
      // Cerrar el overlay después de seleccionar ambas fechas
      if (startDate && endDate) {
        setTimeout(() => {
          try { op.value?.hide(); } catch (e) {}
        }, 500);
      }
    }
  } catch (e) {
    console.error('Error handling calendar change:', e);
  }
}

const datesAvailable = computed(() => {
  if (!dateRange.value || dateRange.value.length < 2) return false;
  const [start, end] = dateRange.value;
  if (!start || !end) return false;
  // build all dates between start and end inclusive
  const s = new Date(start);
  const e = new Date(end);
  if (s > e) return false;
  const set = availabilitySet.value;
  // if availabilitySet is empty, be permissive (unknown availability)
  if (set.size === 0) return true;
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    const key = formatYMD(d);
    if (!set.has(key)) return false;
  }
  return true;
});

// sync simple checkIn/checkOut refs for other UI uses (optional)
const checkIn = ref(null);
const checkOut = ref(null);
watch(dateRange, (val) => {
  if (!val) {
    checkIn.value = null;
    checkOut.value = null;
    return;
  }
  if (Array.isArray(val)) {
    checkIn.value = val[0] ? formatYMD(val[0]) : null;
    checkOut.value = val[1] ? formatYMD(val[1]) : null;
  }
});

// Parse URL search params to prefill dateRange and guests so the component
// reflects the same values used by the app-wide search engine.
// Prefill from searchStore so dates/viajeros sean los mismos que usa el motor de búsqueda
onMounted(() => {
  try {
    const ci = searchStore.checkin?.value;
    const co = searchStore.checkout?.value;
    if (ci && co) {
      const cIn = new Date(ci);
      const cOut = new Date(co);
      if (!isNaN(cIn) && !isNaN(cOut)) {
        dateRange.value = [cIn, cOut];
      }
    } else if (ci) {
      const cIn = new Date(ci);
      if (!isNaN(cIn)) {
        dateRange.value = [cIn, null];
      }
    }

    // guests in the store is an object {adults, children, infants}
    const gObj = searchStore.guests?.value;
    if (gObj) {
      const total = (Number(gObj.adults || 0) + Number(gObj.children || 0) + Number(gObj.infants || 0)) || 1;
      guests.value = total;
    }
  } catch (e) {
    console.error('Error mounting component:', e);
  }
});

// When store changes elsewhere, reflect into this component
watch([() => searchStore.checkin.value, () => searchStore.checkout.value], ([nci, nco]) => {
  try {
    if (nci && nco) {
      const a = new Date(nci);
      const b = new Date(nco);
      if (!isNaN(a) && !isNaN(b)) {
        // Solo actualizar si es diferente para evitar bucles
        const currentStart = dateRange.value?.[0];
        const currentEnd = dateRange.value?.[1];
        if (!currentStart || !currentEnd || 
            formatYMD(currentStart) !== nci || 
            formatYMD(currentEnd) !== nco) {
          dateRange.value = [a, b];
        }
      }
    } else if (nci && !nco) {
      const a = new Date(nci);
      if (!isNaN(a)) {
        dateRange.value = [a, null];
      }
    } else {
      dateRange.value = null;
    }
  } catch (e) {
    console.error('Error watching store changes:', e);
  }
});

watch(() => searchStore.guests.value, (ng) => {
  if (!ng) return;
  const total = (Number(ng.adults || 0) + Number(ng.children || 0) + Number(ng.infants || 0)) || 1;
  guests.value = total;
}, { deep: true });

// When local guests changes, update store.guests.adults conservatively
watch(guests, (n) => {
  const current = searchStore.guests.value || { adults: 1, children: 0, infants: 0 };
  // map the numeric control into adults (keep children/infants unchanged)
  const newAdults = Math.max(1, Number(n) - (Number(current.children || 0) + Number(current.infants || 0)));
  searchStore.guests.value = { ...current, adults: newAdults };
});

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const product = {
  name: props.service.title,
  price: USDollar.format(props.service.price),
  rating: 4,
  images: props.service.images.map((image) => image.filepath),
  features: props.service.features,
  description: props.service.description,
  details: [
    {
      name: "Incluidos",
      items: JSON.parse(props.service.includes),
    },
    {
      name: "No Incluidos",
      items: JSON.parse(props.service.notIncludes),
    },
    // More sections...
  ],
};
</script>

<template>
  <Header />
  <div class="px-4 py-8 md:py-16 md:px-16 max-w-7xl mx-auto">
    <!-- Breadcrumb -->
    <Breadcrumb :service="service" class="mb-4" />
    
    <!-- Título y rating arriba de las imágenes -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-semibold text-gray-900 capitalize mb-2">
        {{ product.name }}
      </h1>
      <div class="flex flex-wrap items-center gap-4 text-sm">
        <div class="flex items-center gap-1">
          <span class="text-yellow-500">⭐</span>
          <span class="font-medium">{{ product.rating }}</span>
          <span class="text-gray-500">({{ service.reviews_count || 0 }} reseñas)</span>
        </div>
        <span v-if="service.location" class="text-gray-700">{{ service.location }}</span>
        <!-- Botones de compartir y guardar -->
        <div class="flex items-center gap-3 ml-auto">
          <button class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
            </svg>
            Compartir
          </button>
          <button class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- Galería de imágenes -->
    <Gallery :images="product.images" class="mb-8" />

    <!-- Main grid: left content + right booking card -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: contenido principal (span 2) -->
      <main class="lg:col-span-2 space-y-6">
        <!-- Información del anfitrión -->
        <div class="border-b pb-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ service.type || 'Experiencia' }} ofrecida por {{ service.host_name || 'Anfitrión' }}</h2>
              <p class="text-gray-600">{{ guests }} huésped{{ guests > 1 ? 'es' : '' }} · Se traduce automáticamente</p>
            </div>
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span class="text-gray-600 font-medium">{{ (service.host_name || 'A')[0].toUpperCase() }}</span>
            </div>
          </div>
        </div>

        <!-- Descripción -->
        <section class="border-b pb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Acerca de esta experiencia</h3>
          <div class="prose max-w-none text-gray-700">
            <transition name="expand">
              <div
                v-if="showFullDescription || product.description.length <= 500"
                key="full"
                v-html="product.description"
              ></div>
              <div
                v-else
                key="short"
                v-html="product.description.slice(0, 500) + '...'"
              ></div>
            </transition>
            <button
              v-if="product.description.length > 500"
              @click="showFullDescription = !showFullDescription"
              class="text-gray-900 hover:underline mt-2 font-medium"
            >
              {{ showFullDescription ? 'Mostrar menos' : 'Mostrar más' }} ›
            </button>
          </div>
        </section>

        <!-- Equipamiento (solo para embarcaciones) -->
        <Equipament :service="service" v-if="service.type == 'EMBARCACION'" class="border-b pb-6" />
        
        <!-- Qué incluye -->
        <IncludesView :service="service" v-if="service.includes != '[]'" class="border-b pb-6" />
        
        <!-- Puntos de recogida -->
        <CollectionPoints :service="service" v-if="service.recogidas != '[]'" class="border-b pb-6" />
      </main>

      <!-- Right: tarjeta de reserva sticky -->
      <aside class="lg:col-span-1">
        <div class="sticky top-24">
          <div class="bg-white border rounded-2xl shadow-md p-6">
              <div class="flex items-baseline justify-between">
                <div class="text-2xl md:text-3xl font-bold text-gray-900">{{ USDollar.format(props.service.price) }}</div>
                <div class="text-sm text-gray-600">por persona</div>
              </div>

              <div class="mt-3 flex items-center justify-between text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <span class="text-yellow-500">⭐</span>
                  <span class="font-medium">{{ product.rating }}</span>
                  <span class="text-gray-400">·</span>
                  <span class="text-gray-500">{{ service.reviews_count || '—' }} reviews</span>
                </div>
                <div class="text-right text-sm text-gray-500">Disponible · <span class="font-medium text-gray-700">{{ availabilities ? availabilities.length : '—' }}</span></div>
              </div>

            <form class="mt-4 space-y-3">
              <!-- Selector de fechas con formato tipo Airbnb -->
              <div class="grid grid-cols-2 gap-2">
                <!-- Check-in -->
                <div>
                  <label class="text-xs font-medium text-gray-700 block mb-1">LLEGADA</label>
                  <button
                    type="button"
                    class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    @click="op?.toggle($event)"
                  >
                    <div class="text-sm text-gray-900 font-medium">
                      {{ checkIn ? new Date(checkIn).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : 'Agregar fecha' }}
                    </div>
                  </button>
                </div>
                
                <!-- Check-out -->
                <div>
                  <label class="text-xs font-medium text-gray-700 block mb-1">SALIDA</label>
                  <button
                    type="button"
                    class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    @click="op?.toggle($event)"
                  >
                    <div class="text-sm text-gray-900 font-medium">
                      {{ checkOut ? new Date(checkOut).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : 'Agregar fecha' }}
                    </div>
                  </button>
                </div>

                <OverlayPanel ref="op" appendTo="body" class="!w-auto">
                  <div class="p-4">
                    <VueDatePicker 
                      v-model="dateRange"
                      range
                      :min-date="new Date()"
                      inline
                      auto-apply
                      :teleport="false"
                      locale="es"
                      :format="'dd/MM/yyyy'"
                      :preview-format="'dd/MM/yyyy'"
                      placeholder="Selecciona fechas"
                      @update:model-value="handleCalendarChange"
                    />
                  </div>
                </OverlayPanel>
              </div>

              <!-- Selector de huéspedes -->
              <div>
                <label class="text-xs font-medium text-gray-700 block mb-1">HUÉSPEDES</label>
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button
                    type="button"
                    aria-label="Disminuir huéspedes"
                    class="px-3 py-3 hover:bg-gray-50 rounded-l-lg"
                    @click="guests = Math.max(1, Number(guests) - 1)"
                  >
                    <span class="text-lg font-medium text-gray-600">−</span>
                  </button>
                  <div class="flex-1 text-center py-3">
                    <span class="text-sm font-medium text-gray-900">{{ guests }} huésped{{ guests > 1 ? 'es' : '' }}</span>
                  </div>
                  <button
                    type="button"
                    aria-label="Aumentar huéspedes"
                    class="px-3 py-3 hover:bg-gray-50 rounded-r-lg"
                    @click="guests = Number(guests) + 1"
                  >
                    <span class="text-lg font-medium text-gray-600">+</span>
                  </button>
                </div>
              </div>

              <div class="pt-2">
                <button
                  v-if="!checkIn || !checkOut"
                  type="button"
                  class="w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg py-3 font-semibold transition duration-200"
                  @click="op?.toggle($event)"
                >
                  Revisa las fechas
                </button>
                <button
                  v-else
                  type="button"
                  :disabled="!datesAvailable"
                  class="w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg py-3 font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reservar
                </button>
              </div>
            </form>

            <!-- Mensaje de disponibilidad y totales -->
            <div v-if="checkIn && checkOut" class="mt-4">
              <div v-if="dateRange && dateRange.length === 2" class="mb-3 text-sm">
                <span v-if="datesAvailable" class="text-green-600 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Fechas disponibles
                </span>
                <span v-else class="text-red-600 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  Fechas no disponibles
                </span>
              </div>

              <div class="border-t pt-3">
                <div class="flex items-center justify-between text-sm text-gray-600">
                  <div>{{ USDollar.format(props.service.price) }} x {{ guests }} huésped{{ guests > 1 ? 'es' : '' }}</div>
                  <div class="font-medium text-gray-900">{{ USDollar.format(props.service.price) }}</div>
                </div>
                <div class="flex items-center justify-between text-sm text-gray-600 mt-1">
                  <div>Tarifa de servicio</div>
                  <div class="font-medium text-gray-900">{{ USDollar.format(props.service.price * guests) }}</div>
                </div>
                <div class="flex items-center justify-between text-base font-semibold text-gray-900 mt-3 pt-3 border-t">
                  <div>Total</div>
                  <div>{{ USDollar.format(props.service.price * guests) }}</div>
                </div>
              </div>
            </div>

            <div v-else class="mt-4 border-t pt-3">
              <div class="text-center text-gray-500 py-4">
                <p class="text-sm">Selecciona las fechas para ver el precio total</p>
              </div>
            </div>

            <p class="mt-3 text-xs text-gray-500">Política flexible · Cancelación gratuita hasta 24 horas antes</p>
          </div>
          
        </div>
        
      </aside>
    </div>
  </div>
</template>
<style scoped>
/* ...existing code... */

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>

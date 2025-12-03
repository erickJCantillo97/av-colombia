<script setup>
// #region Imports
import AppLayout from "@/Layouts/AppLayout.vue";
import axios from "axios";
import { computed, ref, watch } from "vue";
import ViewBooking from "@/Components/viewBooking.vue";
import Notas from "@/Components/Customs/Notas.vue";
import Completar from "@/Components/Customs/Completar.vue";
import { OverlayBadge } from "primevue";
// #endregion

// #region Variables
const notes = ref([]);
const note = ref("");
const todayActivity = ref(false);
const completar = ref(false);
const serviceSelected = ref({});
const visible = ref(false);
const selectDate = ref([new Date(), new Date()]);
const isLoading = ref(false);
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(100);
const statusFilter = ref(null);
const columnFilters = ref({});
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 100,
  total: 0,
  from: 0,
  to: 0,
});

// #endregion

// #region Methods
const dateActivities = ref([]);

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const getReservas = async () => {
  isLoading.value = true;
  try {
    // Filtrar solo los columnFilters que tienen valor
    const activeColumnFilters = Object.entries(columnFilters.value)
      .filter(([_, value]) => value && value.trim() !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const params = {
      dates: selectDate.value,
      search: searchQuery.value || undefined,
      per_page: perPage.value,
      page: currentPage.value,
      column_filters: Object.keys(activeColumnFilters).length > 0 ? activeColumnFilters : undefined,
      status: statusFilter.value || undefined,
    };

    const { data } = await axios.get(route("get.all.booking.services.dates", params));

    dateActivities.value = data.bookingServices.data || [];
    pagination.value = {
      current_page: data.bookingServices.current_page,
      last_page: data.bookingServices.last_page,
      per_page: data.bookingServices.per_page,
      total: data.bookingServices.total,
      from: data.bookingServices.from,
      to: data.bookingServices.to,
    };
  } finally {
    isLoading.value = false;
  }
};

const updateFilters = debounce(() => {
  getReservas();
}, 500);

watch(searchQuery, () => {
  currentPage.value = 1;
  updateFilters();
});

watch(perPage, () => {
  currentPage.value = 1;
  getReservas();
});

watch(selectDate, () => {
  currentPage.value = 1;
  getReservas();
});

watch(columnFilters, () => {
  currentPage.value = 1;
  updateFilters();
}, { deep: true });

watch(statusFilter, () => {
  currentPage.value = 1;
  getReservas();
});

const goToPage = (page) => {
  currentPage.value = page;
  getReservas();
};

const editBooking = (data) => {
  serviceSelected.value = data;
  visible.value = true;
};

const clearColumnFilter = (field) => {
  columnFilters.value[field] = '';
};

const clearAllFilters = () => {
  Object.keys(columnFilters.value).forEach(field => {
    columnFilters.value[field] = '';
  });
};

const filteringByStatus = (status) => {
  statusFilter.value = status;
};

getReservas();

const columns = [
  { field: "cliente_name", header: "Nombre del pasajero", class: "min-w-[200px]", filter: true },
  { field: "adults", header: "Adultos", class: "text-center", filter: true },
  { field: "boys", header: "Niños", class: "text-center", filter: true },
  { field: "service", header: "Actividad", class: "min-w-[150px]", filter: true },
  { field: "proveedors_names", header: "Proveedores", class: "text-center", filter: true },
  { field: "cliente_building", header: "Edificio", filter: true },
  { field: "cliente_phone", header: "Teléfono", filter: true },
  { field: "hour", header: "Hora", class: "text-center", filter: true },
  { field: "status", header: "Estado", type: "tag", class: "text-center", filter: true },
];

// Inicializar filtros
columns.forEach(col => {
  if (col.filter) {
    columnFilters.value[col.field] = '';
  }
});

const statues = [
  { text: "RESERVADO", color: "blue" },
  { text: "CAMBIO DE FECHA", color: "gray" },
  { text: "NO SHOW", color: "amber" },
  { text: "REUBICADO", color: "orange" },
  { text: "CANCELADA", color: "green" },
  { text: "SIN CONFIRMAR", color: "red" },
];

const getPageNumbers = () => {
  const pages = [];
  const maxPages = pagination.value.last_page;
  const current = currentPage.value;
  
  if (maxPages <= 7) {
    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(maxPages);
    } else if (current >= maxPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = maxPages - 4; i <= maxPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(maxPages);
    }
  }
  
  return pages;
};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
};

const formatDate = (date) => {
  if (!date) return 'Sin definir';
  return new Date(new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60000)
    .toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
};

const getRowClass = (booking) => {
  if (booking.problematic) return 'bg-red-100';
  
  const statusClasses = {
    'CAMBIO DE FECHA': 'bg-gray-50',
    'COMPLETADA': 'bg-green-50',
    'NO SHOW': 'bg-yellow-50',
    'REUBICADO': 'bg-orange-50',
    'PROBLEMATICA': 'bg-red-100',
    'SIN CONFIRMAR': 'bg-purple-50',
    'RESERVADO': 'bg-blue-50',
    'CANCELADA': 'bg-green-50',
  };
  
  return statusClasses[booking.status] || '';
};

const getStatusClass = (status) => {
  const statusClasses = {
    'RESERVADO': 'bg-blue-100 text-blue-800',
    'CAMBIO DE FECHA': 'bg-gray-100 text-gray-800',
    'COMPLETADA': 'bg-green-100 text-green-800',
    'NO SHOW': 'bg-yellow-100 text-yellow-800',
    'REUBICADO': 'bg-orange-100 text-orange-800',
    'CANCELADA': 'bg-green-100 text-green-800',
    'PROBLEMATICA': 'bg-red-200 text-red-900 animate-pulse',
    'SIN CONFIRMAR': 'bg-purple-100 text-purple-800'
  };
  
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const totalAdults = computed(() => {
  return dateActivities.value.reduce((acc, item) => acc + (item.adults || 0), 0);
});

const totalBoys = computed(() => {
  return dateActivities.value.reduce((acc, item) => acc + (item.boys || 0), 0);
});
// #endregion
</script>

<template>
  <AppLayout title="Dashboard">
    <div class="py-4 h-[92vh]">
      <div class="w-full mx-auto sm:px-1 lg:px-4 space-y-2">
        <!-- Header -->
        <div class="bg-white overflow-hidden sm:rounded-lg flex justify-between items-center px-4 py-3 shadow-sm border border-gray-200">
          <h1 class="text-lg">
            Hola
            <strong class="uppercase text-blue-600"> {{ $page.props.auth.user.name }} </strong>,
            Bienvenido a tu panel de control
          </h1>
          <a target="_blank" :href="`https://tourscolombia.online/${$page.props.auth.user.id}`">
            <Button label="Ver Portafolio" class="text-sm" />
          </a>
        </div>
        
        <!-- Table Container -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <!-- Header con búsqueda y fecha -->
          <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <!-- Botones de filtro de estado -->
            <div class="flex items-center gap-2 flex-wrap mb-3">
              <span class="text-xs font-medium text-gray-600">Filtrar por estado:</span>
              <button
                v-for="status in statues"
                :key="status.text"
                @click="filteringByStatus(status.text)"
                :class="[
                  statusFilter === status.text 
                    ? `bg-${status.color}-600 text-white ring-2 ring-${status.color}-400` 
                    : `bg-${status.color}-100 text-${status.color}-700 hover:bg-${status.color}-200`,
                  'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 shadow-sm'
                ]"
              >
                {{ status.text }}
              </button>
              <button
                v-if="statusFilter"
                @click="statusFilter = null"
                class="px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              >
                <i class="fa-solid fa-times mr-1"></i>
                Limpiar filtro
              </button>
            </div>
            <div class="flex flex-col md:flex-row gap-3 items-center justify-between">
              <div class="flex-1 w-full md:w-auto">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                  </div>
                  <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Buscar por nombre, teléfono, servicio, estado..." 
                    class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <!-- Indicador de filtros activos -->
                <div v-if="Object.values(columnFilters).some(v => v)" class="mt-2 flex items-center gap-2 flex-wrap">
                  <span class="text-xs text-gray-600 font-medium">Filtros activos:</span>
                  <span 
                    v-for="(value, field) in columnFilters" 
                    :key="field"
                    v-show="value"
                    class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs"
                  >
                    <span class="font-medium">{{ columns.find(c => c.field === field)?.header }}:</span>
                    <span>{{ value }}</span>
                    <button 
                      @click="clearColumnFilter(field)"
                      class="ml-1 hover:text-blue-900"
                    >
                      <i class="fa-solid fa-times text-xs"></i>
                    </button>
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <DatePicker 
                  v-model="selectDate" 
                  selectionMode="range" 
                  dateFormat="dd/mm/yy" 
                  :manualInput="false"
                  class="text-sm"
                />
                <select 
                  v-model="perPage" 
                  class="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
                >
                  <option :value="10">10</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                  <option :value="200">200</option>
                  <option :value="500">500</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Tabla personalizada -->
          <div class="overflow-x-auto" style="max-height: calc(92vh - 280px);">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th v-for="col in columns" :key="col.field" 
                    class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    :class="col.class">
                    <div class="flex flex-col gap-2">
                      <span>{{ col.header }}</span>
                      <div v-if="col.filter" class="relative">
                        <input 
                          v-model="columnFilters[col.field]"
                          type="text"
                          :placeholder="`Filtrar ${col.header.toLowerCase()}...`"
                          class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 normal-case font-normal"
                          @click.stop
                        />
                        <button
                          v-if="columnFilters[col.field]"
                          @click.stop="clearColumnFilter(col.field)"
                          class="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          title="Limpiar filtro"
                        >
                          <i class="fa-solid fa-times text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </th>
                  <th class="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div class="flex flex-col gap-2">
                      <span>Acciones</span>
                      <button
                        v-if="Object.values(columnFilters).some(v => v)"
                        @click="clearAllFilters"
                        class="px-2 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded font-normal normal-case transition-colors"
                      >
                        <i class="fa-solid fa-filter-circle-xmark mr-1"></i>
                        Limpiar filtros
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <!-- Skeleton Loader -->
                <template v-if="isLoading">
                  <tr v-for="i in perPage" :key="`skeleton-${i}`" class="animate-pulse">
                    <td v-for="col in columns" :key="`skeleton-col-${col.field}`" 
                      class="px-4 py-3"
                      :class="col.class">
                      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td class="px-4 py-3">
                      <div class="flex items-center justify-center gap-1">
                        <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
                      </div>
                    </td>
                  </tr>
                </template>

                <!-- Empty State -->
                <tr v-else-if="dateActivities.length === 0">
                  <td :colspan="columns.length + 1" class="px-4 py-8 text-center text-gray-500">
                    <i class="fa-solid fa-inbox text-4xl mb-2 text-gray-300 animate-bounce"></i>
                    <p class="font-medium">No se encontraron resultados</p>
                  </td>
                </tr>

                <!-- Data Rows -->
                <tr v-else v-for="(booking, index) in dateActivities" :key="booking.id"
                  :class="getRowClass(booking)"
                  class="hover:bg-gray-50 transition-all duration-200 animate-fade-in"
                  :style="{ animationDelay: `${index * 30}ms` }">
                  <td v-for="col in columns" :key="col.field" 
                    class="px-4 py-3 text-sm"
                    :class="col.class">
                    <!-- Status Tag -->
                    <span v-if="col.type === 'tag'" 
                      :class="getStatusClass(getNestedValue(booking, col.field))"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                      {{ getNestedValue(booking, col.field) }}
                    </span>
                    <!-- Phone with WhatsApp -->
                    <a v-else-if="col.field === 'cliente_phone'" 
                      target="_blank" 
                      :href="`https://wa.me/${booking.cliente_phone}?text=Hola mucho gusto yo soy Sandra la coordinadora de su actividad`"
                      class="text-blue-600 hover:text-blue-800 hover:underline">
                      {{ booking.cliente_phone }}
                    </a>
                    <!-- Default -->
                    <span v-else class="text-gray-900">
                      {{ getNestedValue(booking, col.field) || '-' }}
                    </span>
                  </td>
                  <!-- Actions -->
                  <td class="px-4 py-3">
                    <div class="flex items-center justify-center gap-1">
                      <OverlayBadge v-if="booking.extras && booking.extras.length > 0" severity="danger">
                        <button
                          @click="editBooking(booking)"
                          class="p-2 rounded-md transition-all duration-200 hover:scale-110 text-blue-600 hover:bg-blue-100"
                          title="Ver Detalles"
                        >
                          <i class="fa-solid fa-circle-info text-sm"></i>
                        </button>
                      </OverlayBadge>
                      <button
                        v-else
                        @click="editBooking(booking)"
                        class="p-2 rounded-md transition-all duration-200 hover:scale-110 text-blue-600 hover:bg-blue-100"
                        title="Ver Detalles"
                      >
                        <i class="fa-solid fa-circle-info text-sm"></i>
                      </button>
                      <button
                        @click="serviceSelected = booking; completar = true"
                        class="p-2 rounded-md transition-all duration-200 hover:scale-110 text-green-600 hover:bg-green-100"
                        title="Completar Servicio"
                      >
                        <i class="fa-solid fa-circle-check text-sm"></i>
                      </button>
                      <OverlayBadge v-if="booking.notes && booking.notes.length > 0" :value="booking.notes.length" severity="info">
                        <button
                          @click="serviceSelected = booking; todayActivity = true"
                          class="p-2 rounded-md transition-all duration-200 hover:scale-110 text-gray-600 hover:bg-gray-100"
                          title="Notas"
                        >
                          <i class="fa-solid fa-note-sticky text-sm"></i>
                        </button>
                      </OverlayBadge>
                      <button
                        v-else
                        @click="serviceSelected = booking; todayActivity = true"
                        class="p-2 rounded-md transition-all duration-200 hover:scale-110 text-gray-600 hover:bg-gray-100"
                        title="Notas"
                      >
                        <i class="fa-solid fa-note-sticky text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <!-- Footer con totales -->
              <tfoot v-if="dateActivities.length > 0" class="bg-gray-50 sticky bottom-0">
                <tr class="font-semibold">
                  <td class="px-4 py-3 text-sm text-gray-900">Totales:</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-900">{{ totalAdults }}</td>
                  <td class="px-4 py-3 text-sm text-center text-gray-900">{{ totalBoys }}</td>
                  <td :colspan="columns.length - 2" class="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Paginación personalizada -->
          <div v-if="pagination.total > 0" class="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="text-sm text-gray-700">
                Mostrando
                <span class="font-semibold text-gray-900">{{ pagination.from }}</span>
                a
                <span class="font-semibold text-gray-900">{{ pagination.to }}</span>
                de
                <span class="font-semibold text-gray-900">{{ pagination.total }}</span>
                resultados
              </div>
              <nav class="inline-flex rounded-md shadow-sm -space-x-px">
                <button 
                  @click="goToPage(1)" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <i class="fa-solid fa-angles-left"></i>
                </button>
                <button 
                  @click="goToPage(currentPage - 1)" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <i class="fa-solid fa-angle-left"></i>
                </button>
                
                <template v-for="page in getPageNumbers()" :key="page">
                  <button 
                    v-if="page !== '...'"
                    @click="goToPage(page)" 
                    :class="[
                      page === currentPage 
                        ? 'z-10 bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <span v-else class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                </template>
                
                <button 
                  @click="goToPage(currentPage + 1)" 
                  :disabled="currentPage === pagination.last_page"
                  class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <i class="fa-solid fa-angle-right"></i>
                </button>
                <button 
                  @click="goToPage(pagination.last_page)" 
                  :disabled="currentPage === pagination.last_page"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <i class="fa-solid fa-angles-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  <ViewBooking v-model="visible" :service="serviceSelected" v-if="serviceSelected"></ViewBooking>
  <Notas v-model="todayActivity" :notes="notes" v-if="todayActivity" :note="note" :service="serviceSelected"></Notas>
  <Completar v-if="completar" v-model="completar" :service="serviceSelected"> </Completar>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}
</style>

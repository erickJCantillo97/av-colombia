<template>
    <AppLayout :title="pageTitle">
       
        <div class="h-[92vh]">
            <div class="flex py-2 px-4 justify-between items-center">
                <div class="italic flex flex-col gap-2">
                    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
                    <div class="flex items-center gap-2 flex-wrap">
                        <Changes />
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
                </div>
                <div>
                    <VueDatePicker
                    hide-offset-dates
                    v-model="selectDate"
                    :teleport="true"
                    :format="format"
                    model-type="yyyy-MM-dd"
                    range
                    :enable-time-picker="false"
                    locale="es"
                    :multi-calendars="{ solo: true }"
                    timezone="America/Bogota"
                  >
                  </VueDatePicker>
                </div>

            </div>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <!-- Header con búsqueda -->
                <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
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
                                    <span class="font-medium">{{ visibleColumns.find(c => c.field === field)?.header }}:</span>
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
                            <button
                                v-if="add"
                                @click="add.action()"
                                class="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                            >
                                <i class="fa-solid fa-plus mr-2"></i>
                                Nueva Reserva
                            </button>
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
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th v-for="col in visibleColumns" :key="col.field" 
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
                                    <td v-for="col in visibleColumns" :key="`skeleton-col-${col.field}`" 
                                        class="px-4 py-3"
                                        :class="col.class">
                                        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center justify-center gap-1">
                                            <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
                                            <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
                                            <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
                                            <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
                                        </div>
                                    </td>
                                </tr>
                            </template>

                            <!-- Empty State -->
                            <tr v-else-if="filteredBookings.length === 0">
                                <td :colspan="visibleColumns.length + 1" class="px-4 py-8 text-center text-gray-500">
                                    <i class="fa-solid fa-inbox text-4xl mb-2 text-gray-300 animate-bounce"></i>
                                    <p class="font-medium">No se encontraron resultados</p>
                                </td>
                            </tr>

                            <!-- Data Rows -->
                            <tr v-else v-for="(booking, index) in filteredBookings" :key="booking.id"
                                :class="getRowClass(booking)"
                                class="hover:bg-gray-50 transition-all duration-200 animate-fade-in"
                                :style="{ animationDelay: `${index * 30}ms` }">
                                <td v-for="col in visibleColumns" :key="col.field" 
                                    class="px-4 py-3 text-sm"
                                    :class="col.class">
                                    <!-- Date -->
                                    <span v-if="col.type === 'date'">
                                        {{ formatDate(getNestedValue(booking, col.field)) }}
                                    </span>
                                    <!-- Tag/Status -->
                                    <span v-else-if="col.type === 'tag' || col.type === 'customtag'" 
                                        :class="getStatusClass(getNestedValue(booking, col.field))"
                                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                        {{ getNestedValue(booking, col.field) }}
                                    </span>
                                    <!-- Default -->
                                    <span v-else class="text-gray-900">
                                        {{ getNestedValue(booking, col.field) }}
                                    </span>
                                </td>
                                <!-- Actions -->
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-center gap-1">
                                        <button
                                            v-for="button in buttons"
                                            :key="button.label"
                                            v-show="typeof button.show === 'function' ? button.show(booking) : button.show !== false"
                                            @click="button.action(booking)"
                                            :class="getButtonClass(button.severity)"
                                            class="p-2 rounded-md transition-all duration-200 hover:scale-110"
                                            :title="button.label"
                                        >
                                            <i :class="button.icon"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
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
        <ViewBooking v-model="info" :service="service" v-if="service" :proveedors="proveedors"></ViewBooking>
    </AppLayout>
    <Notas v-model="todayActivity" :notes="notes" v-if="todayActivity" :note="note" :service="serviceSelected"></Notas>
</template>
<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import {  router,  usePage } from "@inertiajs/vue3";
import {  ref, watch, computed } from "vue";
import { alerts } from "@/composable/toasts";
import Swal from "sweetalert2";
import ViewBooking from "@/Components/viewBooking.vue";
import Changes from "@/Components/Customs/Changes.vue";
import Notas from "@/Components/Customs/Notas.vue";
import { storeToRefs } from "pinia";
import { useBookingServiceStore } from "@/stores/BookingService";
import { columns } from "./Columns";
import { usePermissions } from "@/composable/Auth";

const props = defineProps({
    bookingServices: Object,
    serviceType: String,
    filters: Object,
});

const { toast } = alerts();
const { hasRole } = usePermissions();
const proveedors = ref([]);
const notes = ref([]);
const note = ref("");
const serviceSelected = ref([]);
const info = ref(false);
const service = ref(null);
const todayActivity = ref(false);

// Filtrar columnas basándose en el rol del usuario
const visibleColumns = computed(() => {
    return columns.filter(col => {
        if (typeof col.visible === 'function') {
            return col.visible(hasRole);
        }
        return col.visible !== false;
    });
});

const bookings = computed(() => props.bookingServices.data || []);
const pagination = computed(() => ({
    current_page: props.bookingServices.current_page,
    last_page: props.bookingServices.last_page,
    per_page: props.bookingServices.per_page,
    total: props.bookingServices.total,
    from: props.bookingServices.from,
    to: props.bookingServices.to,
}));

const store = useBookingServiceStore();
const { selectDate, statusFilter } = storeToRefs(store);

// Inicializar statusFilter desde los props si existe
if (props.filters?.status) {
    statusFilter.value = props.filters.status;
}

// Recuperar valores de localStorage con clave específica por tipo de servicio
const getCacheKey = (key) => `booking_${props.serviceType || 'all'}_${key}`;

const getFromCache = (key, defaultValue) => {
    try {
        const cached = localStorage.getItem(getCacheKey(key));
        return cached ? JSON.parse(cached) : defaultValue;
    } catch {
        return defaultValue;
    }
};

const saveToCache = (key, value) => {
    try {
        localStorage.setItem(getCacheKey(key), JSON.stringify(value));
    } catch (error) {
        console.warn('Error guardando en cache:', error);
    }
};

// Filtros por columna
const columnFilters = ref({});

// Inicializar filtros desde los props o vacíos
visibleColumns.value.forEach(col => {
    if (col.filter) {
        columnFilters.value[col.field] = props.filters?.column_filters?.[col.field] || '';
    }
});

// Si hay filtros en cache pero no vienen en props, usarlos
const cachedSearch = getFromCache('search', '');
const cachedPage = getFromCache('page', 1);
const cachedPerPage = getFromCache('perPage', 10);

const searchQuery = ref(props.filters?.search || cachedSearch);
const currentPage = ref(props.bookingServices.current_page || cachedPage);
const perPage = ref(props.filters?.per_page || cachedPerPage);
const isLoading = ref(false);

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

// Si hay valores en cache pero no en props (primera carga), hacer la consulta
const shouldLoadFromCache = !props.filters?.search && !props.filters?.page && 
    (cachedSearch || cachedPage !== 1 || cachedPerPage !== 100);

if (shouldLoadFromCache) {
    const params = {
        type: props.serviceType,
        search: cachedSearch || undefined,
        dates: selectDate.value || undefined,
        per_page: cachedPerPage,
        page: cachedPage,
    };
    
    router.get(route('BookingServices.index'), params, {
        preserveState: true,
        preserveScroll: true,
        only: ['bookingServices'],
        replace: true,
    });
}

const pageTitle = computed(() => {
    const titles = {
        'TOUR': 'Reservas de Tours',
        'EMBARCACION': 'Reservas de Embarcaciones',
        'TRANSFER': 'Reservas de Transportes'
    };
    return titles[props.serviceType] || 'Reservas';
});

const statues = [
    { text: "RESERVADO", color: "blue" },
    { text: "CAMBIO DE FECHA", color: "gray" },
    { text: "NO SHOW", color: "amber" },
    { text: "REUBICADO", color: "orange" },
    { text: "CANCELADA", color: "green" },
    { text: "SIN CONFIRMAR", color: "red" },
];

const add = {
    action: () => {
        router.get(route("BookingServices.create"));
    },
};

const updateFilters = debounce(() => {
    // Guardar en cache
    saveToCache('search', searchQuery.value);
    saveToCache('page', currentPage.value);
    saveToCache('perPage', perPage.value);
    
    // Filtrar solo los columnFilters que tienen valor
    const activeColumnFilters = Object.entries(columnFilters.value)
        .filter(([_, value]) => value && value.trim() !== '')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    const params = {
        type: props.serviceType,
        search: searchQuery.value || undefined,
        dates: selectDate.value || undefined,
        per_page: perPage.value,
        page: currentPage.value,
        column_filters: Object.keys(activeColumnFilters).length > 0 ? activeColumnFilters : undefined,
        status: statusFilter.value || undefined,
    };
    
    console.log('Filtros enviados al backend:', params);
    
    isLoading.value = true;
    
    router.get(route('BookingServices.index'), params, {
        preserveState: true,
        preserveScroll: true,
        only: ['bookingServices'],
        onFinish: () => {
            isLoading.value = false;
        },
    });
}, 500);

watch([selectDate], () => {
    currentPage.value = 1;
    saveToCache('page', 1);
    updateFilters();
});

watch(searchQuery, () => {
    currentPage.value = 1;
    saveToCache('page', 1);
    updateFilters();
});

watch(perPage, () => {
    currentPage.value = 1;
    saveToCache('page', 1);
    updateFilters();
});

watch(columnFilters, () => {
    currentPage.value = 1;
    saveToCache('page', 1);
    updateFilters();
}, { deep: true });

watch(statusFilter, () => {
    currentPage.value = 1;
    saveToCache('page', 1);
    updateFilters();
});

const filteredBookings = computed(() => {
    // Todos los filtros ahora están en el backend
    return bookings.value;
});

const clearColumnFilter = (field) => {
    columnFilters.value[field] = '';
    // El watcher se encargará de actualizar
};

const clearAllFilters = () => {
    Object.keys(columnFilters.value).forEach(field => {
        columnFilters.value[field] = '';
    });
    // El watcher se encargará de actualizar
};

const goToPage = (page) => {
    currentPage.value = page;
    updateFilters();
};

const filteringByStatus = (status) => {
    statusFilter.value = status;
};

const buttons = [
    {
        label: "Detalles",
        action: async (data) => {
            service.value = data;
            info.value = true;
        },
        icon: "fa-solid fa-circle-info text-sm",
        severity: "info",
        // class: 'p-button-warning text-sm'
    },
    {
        label: "Editar",
        action: async (data) => {
            router.get(route("BookingServices.edit", data.id));
        },
        icon: "fa-solid fa-pencil text-sm",
        severity: "warn",
        // class: 'p-button-warning text-sm'
    },
    {
        label: "Notas",
        severity: "secondary",
        action: (data) => {
            serviceSelected.value = data;
            todayActivity.value = true;
        },
       
        icon: "fa-solid fa-note-sticky text-sm",
    },
    {
        label: "Eliminar",
        icon: "fa-solid fa-trash text-sm",
        severity: "danger",
        show:
            usePage().props.auth.user.rol == "admin" ||
            usePage().props.auth.user.rol == "superadmin",
        action: (data) => {
            Swal.fire({
                title: "Estas Seguro?",
                text: `Eliminar la reservación de ${data.cliente_name}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: `Si, Eliminar!`,
            }).then((result) => {
                if (result.isConfirmed) {
                    router.delete(route("BookingServices.destroy", data.id), {
                        onSuccess: () => {
                            toast("success", "Reserva Eliminada");
                        },
                    });
                }
            });
        },
    },
];

const dataFilter = ref([]);

const getDataFilter = (data) => {
    dataFilter.value = data;
};

const format = (date) => {
  const day = date[0].getDate();
  const month = date[0].getMonth() + 1;
  const year = date[0].getFullYear();

  const padZero = (num) => (num < 10 ? `0${num}` : num);
  return `${padZero(day)}/${padZero(month)}/${year} - ${padZero(date[1].getDate())}/${padZero(date[1].getMonth() + 1)}/${date[1].getFullYear()}`;
};

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
        'CANCELADA': 'bg-green-50',
        'NO SHOW': 'bg-yellow-50',
        'REUBICADO': 'bg-orange-50',
        'PROBLEMATICA': 'bg-red-100',
        'SIN CONFIRMAR': 'bg-purple-50',
        'RESERVADO': 'bg-blue-50'
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

const getButtonClass = (severity) => {
    const severityClasses = {
        'info': 'text-blue-600 hover:bg-blue-100',
        'warn': 'text-yellow-600 hover:bg-yellow-100',
        'secondary': 'text-gray-600 hover:bg-gray-100',
        'danger': 'text-red-600 hover:bg-red-100'
    };
    
    return severityClasses[severity] || 'text-gray-600 hover:bg-gray-100';
};
</script>

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

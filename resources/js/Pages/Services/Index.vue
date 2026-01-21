<template>
  <AppLayout title="Services">
    <div class="h-[92vh]">
      <div class="flex py-2 px-4 justify-between items-center">
        <div class="italic flex flex-col gap-2">
          <h1 class="text-2xl font-bold">Servicios</h1>
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
                  placeholder="Buscar por nombre, tipo, ciudad, descripción..." 
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
                v-if="hasPermissionTo('crear experiencas')"
                @click="add.action()"
                class="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
              >
                <i class="fa-solid fa-plus mr-2"></i>
                Nuevo Servicio
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
              <!-- Empty State -->
              <tr v-if="filteredServices.length === 0">
                <td :colspan="visibleColumns.length + 1" class="px-4 py-8 text-center text-gray-500">
                  <i class="fa-solid fa-inbox text-4xl mb-2 text-gray-300"></i>
                  <p class="font-medium">No se encontraron resultados</p>
                </td>
              </tr>

              <!-- Data Rows -->
              <tr v-else v-for="(svc, index) in paginatedServices" :key="svc.id"
                class="hover:bg-gray-50 transition-all duration-200"
                :style="{ animationDelay: `${index * 30}ms` }">
                <td v-for="col in visibleColumns" :key="col.field" 
                  class="px-4 py-3 text-sm"
                  :class="col.class">
                  <!-- Currency -->
                  <span v-if="col.type === 'currency'" class="font-semibold text-green-600">
                    {{ COP.format(getNestedValue(svc, col.field)) }}
                  </span>
                  <!-- HTML -->
                  <div v-else-if="col.type === 'html'" class="text-gray-700 max-w-md truncate" v-html="getNestedValue(svc, col.field)"></div>
                  <!-- Default -->
                  <span v-else class="text-gray-900">
                    {{ getNestedValue(svc, col.field) }}
                  </span>
                </td>
                <!-- Actions -->
                <td class="px-4 py-3">
                  <div class="flex items-center justify-center gap-1">
                    <button
                      v-for="button in buttons"
                      :key="button.label"
                      v-show="typeof button.show === 'function' ? button.show(svc) : button.show !== false"
                      @click="(event) => button.action(svc, event)"
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
  </AppLayout>

  <Modal v-model:visible="visible">
    <template #title>
      <span class="text-xl font-bold white-space-nowrap">
        <i class="fa-solid fa-tag mr-2"></i>
        Modificar Tarifas
      </span>
    </template>
    <template #icon>
      <i class="fa-solid fa-edit" />
    </template>

    <!-- Service Title -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-6 mx-4">
      <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
        {{ service.title }}
      </h3>
    </div>

    <!-- Current Rates Information -->
    <div class="grid grid-cols-2 gap-4 m-6">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <div class="flex items-center gap-2 mb-2">
          <i class="fa-solid fa-money-bill-wave text-green-600 dark:text-green-400"></i>
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Tarifa Neta AV</label>
        </div>
        <div class="text-2xl font-bold text-green-600 dark:text-green-400 text-center">
          {{ COP.format(service.adults_price) }}
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <div class="flex items-center gap-2 mb-2">
          <i class="fa-solid fa-chart-line text-orange-600 dark:text-orange-400"></i>
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Tarifa Máxima</label>
        </div>
        <div class="text-2xl font-bold text-orange-600 dark:text-orange-400 text-center">
          {{ service.problematic != 0 ? COP.format(service.problematic) : '-' }}
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-gray-200 dark:border-gray-700 my-6"></div>

    <!-- New Rates Form -->
    <div class="space-y-5 mx-4">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <i class="fa-solid fa-user text-blue-600 dark:text-blue-400"></i>
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Tarifa para Adultos</label>
        </div>
        <Input
          type="number"
          mode="currency"
          currency="COP"
          :minFractionDigits="0"
          :maxFractionDigits="0"
          :step="1000"
          :min="service.adults_price"
          :max="service.problematic > 0 ? service.problematic : null"
          v-model="form.adult_tarifa"
        />
        <div class="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <i class="fa-solid fa-info-circle"></i>
          <span>Tarifa base: {{ COP.format(service.adults_price) }}</span>
        </div>
      </div>

      <div>
        <div class="flex items-center gap-2 mb-2">
          <i class="fa-solid fa-child text-purple-600 dark:text-purple-400"></i>
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Tarifa para Niños</label>
        </div>
        <Input
          type="number"
          currency="COP"
          :minFractionDigits="0"
          :maxFractionDigits="0"
          v-model="form.boys_tarifa"
        />
        <div class="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <i class="fa-solid fa-info-circle"></i>
          <span>Tarifa base: {{ COP.format(service.boys_price) }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <Button
          @click="visible = false"
          title="Cancelar"
          severity="secondary"
          label="Cancelar"
          outlined
          icon="fa-solid fa-times"
          class="!h-10"
        />
        <Button
          @click="submit"
          title="Guardar Cambios"
          severity="success"
          label="Guardar"
          icon="fa-solid fa-save"
          class="!h-10"
        />
      </div>
    </template>
  </Modal>
  <Modal v-model:visible="lock">
    <template #title>
      <span class="text-xl font-bold white-space-nowrap"> Bloqueos</span>
    </template>
    <template #icon>
      <i class="fa-solid fa-lock" />
    </template>
    <h3 class="text-2xl text-center text-amber-600 font-bold my-4">
      Bloqueos del Servicio <strong>{{ service.title }}</strong>
    </h3>

    <div v-if="service.locks.length == 0" class="text-center text-gray-500">
      No hay bloqueos
    </div>
    <div v-else class="flex flex-col gap-y-2">
      <div class="flex justify-between font-bold">
        <p>Razón</p>
        <p>Fecha Inicio</p>
        <p>Fecha Fin</p>
        <p>Quitar</p>
      </div>
      <div class="flex justify-between border-b" v-for="lock in service.locks">
        <p>
          {{ lock.description }}
        </p>
        <p>
          {{ lock.start_date }}
        </p>
        <p>
          {{ lock.end_date }}
        </p>
        <p>
          <Button
            icon="fa-solid fa-xmark-circle"
            @click="unlock(lock.id)"
            v-tooltip="'Quitar Bloqueo'"
            text
            severity="danger"
          />
        </p>
      </div>
    </div>

    <div class="flex justify-between gap-x-2 my-2">
      <div class="w-full">
        <Input
          label="Razón del Bloqueo"
          v-model="formLock.description"
          :error-message="formLock.errors.description"
        />
      </div>
      <div class="w-full">
        <label for="" class="font-bold"
          >Seleccione el Rango de bloque o del servicio</label
        >
        <div class="flex items-center gap-x-2">
          <VueDatePicker
            v-model="formLock.start_date"
            hide-offset-dates
            :teleport="true"
            auto-apply
            :enable-time-picker="false"
            timezone="America/Bogota"
          ></VueDatePicker>
          <i class="fa-solid fa-minus"></i>
          <VueDatePicker
            v-model="formLock.end_date"
            :min-date="formLock.start_date"
            hide-offset-dates
            :teleport="true"
            auto-apply
            :enable-time-picker="false"
            timezone="America/Bogota"
          >
          </VueDatePicker>
        </div>
        <span class="text-xs text-red-500">{{ formLock.errors.start_date }}</span>
      </div>
    </div>

    <template #footer>
      <Button
        @click="locked"
        title="Save"
        severity="success"
        label="Save"
        outlined
        icon="fa-solid fa-save"
        class="!h-8"
      />
      <Button
        @click="lock = false"
        title="Cancel"
        severity="danger"
        label="Cancel"
        outlined
        icon="fa-solid fa-times"
        class="!h-8"
      />
    </template>
  </Modal>
  <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { router, useForm, usePage } from "@inertiajs/vue3";
import ConfirmPopup from "primevue/confirmpopup";
import Modal from "@/Components/Customs/Modal.vue";
import { ref, computed, watch } from "vue";
import Input from "@/Components/Customs/Input.vue";
import { useConfirm } from "primevue/useconfirm";
import { alerts } from "@/composable/toasts";
import { usePermissions } from "@/composable/Auth";
import Columns from "./Columns";

const { hasPermissionTo } = usePermissions();
const { toast } = alerts();

const props = defineProps({
  services: Array,
  type: String
});

const add = {
  action: () => {
    router.visit(route("services.create", { serviceType: props.type }));
  },
};

const formLock = useForm({
  start_date: "",
  end_date: "",
  description: "",
});

const lock = ref(false);

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const confirm = useConfirm();

const form = useForm({
  service_id: "",
  adult_tarifa: 0,
  boys_tarifa: 0,
});

const service = ref({});
const visible = ref(false);

// Nuevas variables para la tabla personalizada
const visibleColumns = computed(() => Columns.filter(col => {
  if (col.role) {
    return usePage().props.auth.user.rol === col.role;
  }
  return true;
}));
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const columnFilters = ref({});

// Inicializar filtros por columna
visibleColumns.value.forEach(col => {
  if (col.filter) {
    columnFilters.value[col.field] = '';
  }
});

// Función para obtener valores anidados
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || '';
};

// Filtrado de servicios
const filteredServices = computed(() => {
  let filtered = [...props.services];

  // Filtro de búsqueda general
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(service => {
      return Object.values(service).some(value => 
        String(value).toLowerCase().includes(query)
      );
    });
  }

  // Filtros por columna
  Object.entries(columnFilters.value).forEach(([field, value]) => {
    if (value) {
      const filterValue = value.toLowerCase();
      filtered = filtered.filter(service => {
        const fieldValue = String(getNestedValue(service, field)).toLowerCase();
        return fieldValue.includes(filterValue);
      });
    }
  });

  return filtered;
});

// Paginación
const pagination = computed(() => {
  const total = filteredServices.value.length;
  const lastPage = Math.ceil(total / perPage.value);
  const from = total === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1;
  const to = Math.min(currentPage.value * perPage.value, total);

  return {
    total,
    last_page: lastPage,
    from,
    to,
    current_page: currentPage.value,
  };
});

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredServices.value.slice(start, end);
});

const clearColumnFilter = (field) => {
  columnFilters.value[field] = '';
};

const clearAllFilters = () => {
  Object.keys(columnFilters.value).forEach(field => {
    columnFilters.value[field] = '';
  });
};

const goToPage = (page) => {
  currentPage.value = page;
};

const getPageNumbers = () => {
  const pages = [];
  const totalPages = pagination.value.last_page;
  const current = currentPage.value;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (current >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return pages;
};

const getButtonClass = (severity) => {
  const classes = {
    primary: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    info: 'bg-cyan-100 text-cyan-600 hover:bg-cyan-200',
    success: 'bg-green-100 text-green-600 hover:bg-green-200',
    warn: 'bg-amber-100 text-amber-600 hover:bg-amber-200',
    danger: 'bg-red-100 text-red-600 hover:bg-red-200',
  };
  return classes[severity] || classes.primary;
};

// Resetear paginación cuando cambian los filtros
watch([searchQuery, columnFilters, perPage], () => {
  currentPage.value = 1;
}, { deep: true });

const buttons = [
  {
    action: (data) => {
      router.visit(route("services.show", data.slug));
    },
    severity: "primary",
    icon: "fa-solid fa-eye text-sm",
    label: "Ver",
  },
  {
    action: (data) => {
      lock.value = true;
      formLock.reset();
      service.value = data;
    },
    show: usePage().props.auth.user.rol == "admin",
    severity: "warn",
    icon: "fa-solid fa-lock",
    label: "Bloqueos",
  },
  {
    action: (data) => {
      if (
        usePage().props.auth.user.rol == "admin" ||
        usePage().props.auth.user.rol == "superadmin"
      ) {
        router.visit(route("services.edit", data.slug));
      } else {
        visible.value = true;
        service.value = data;
        form.service_id = data.id;
        form.adult_tarifa = data.adult_tarifa;
        form.boys_tarifa = data.boy_tarifa;
      }
    },
    severity: "info",
    icon: "fa-solid fa-pencil text-sm",
    label: "Editar",
  },
  {
    action: (data, event) => {
      confirm.require({
        target: event.currentTarget,
        message: "Seguro de Eliminar el Servicio " + data.title + "?",
        icon: "fa-solid fa-exclamation-triangle",
        rejectClass: "p-button-secondary p-button-outlined p-button-sm",
        acceptClass: "p-button-sm p-button-danger",
        rejectLabel: "Cancelar",
        acceptLabel: "Eliminar",
        accept: () => {
          router.delete(route("services.destroy", data.id), {
            onSuccess: () => {
              toast("success", "Servicio eliminado con exito");
            },
          });
        },
      });
    },
    show: hasPermissionTo("eliminar experiencas"),
    severity: "danger",
    icon: "fa-regular fa-trash-can text-sm",
    label: "Eliminar",
  },
];

const submit = () => {
  form.post(route("custom.product"), {
    onSuccess: () => {
      toast("success", "Tarifa creada con exito");
      visible.value = false;
    },
  });
};

const locked = () => {
  if (formLock.description == "") {
    formLock.errors.description = "Ingrese una descripción";
    return;
  }
  if (formLock.start_date == "" || formLock.end_date == "") {
    formLock.errors.start_date = "Seleccione un rango de fechas";
    return;
  }

  router.post(
    route("services.lock", service.value.slug),
    {
      start_date: formLock.start_date,
      description: formLock.description,
      end_date: formLock.end_date,
    },
    {
      onSuccess: () => {
        toast("success", "Servicio Bloqueado con exito");
        lock.value = false;
        formLock.reset();
      },
    }
  );
};

const unlock = (id) => {
  router.post(
    route("services.unlock", id),
    {},
    {
      onSuccess: () => {
        toast("success", "Bloque Quitado Exitosamente");
      },
    }
  );
};
</script>

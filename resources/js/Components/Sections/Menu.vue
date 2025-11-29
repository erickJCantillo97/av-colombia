<template>
  <div
    class="flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 relative z-[1000] overflow-hidden"
    :class="isCollapsed ? 'w-16' : 'w-64'">
    <!-- Header with Logo and Toggle -->
    <div class="flex items-center p-4 border-b border-gray-200"
      :class="isCollapsed ? 'flex-col space-y-2' : 'justify-between'">
      <div v-if="!isCollapsed" class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded">
          <span class="text-white font-bold text-sm">AV</span>
        </div>
        <span class="font-bold text-xl text-gray-900">AV COLOMBIA</span>
      </div>
      <div v-else class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded">
        <span class="text-white font-bold text-sm">AV</span>
      </div>
      <button @click="toggleMenu" class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
        <i class="pi pi-bars text-gray-600"></i>
      </button>
    </div>

    <!-- Main Menu Section -->
    <div class="flex-1 overflow-y-auto px-3 py-4">
      <!-- <div v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        MAIN MENU
      </div> -->

      <nav class="space-y-1 overflow-hidden">
        <!-- Dashboard -->
        <MenuItemModern label="Home" :href="route('dashboard')" v-tooltip="`Dashboard`" icon="pi pi-home"
          :is-collapsed="isCollapsed" />

        <!-- Servicios -->
        <MenuItemModern label="Servicios" v-tooltip="`Servicios`" icon="fa-solid fa-tags"
          :submenu-items="serviciosItems" :is-collapsed="isCollapsed" @submenu-toggle="handleSubmenuToggle" />

        <!-- Reservas -->
        <MenuItemModern label="Reservas" v-tooltip="`Reservas`" icon="pi pi-calendar" :submenu-items="reservasItems"
          :is-collapsed="isCollapsed" @submenu-toggle="handleSubmenuToggle" />

       

        <!-- Contabilidad -->
        <MenuItemModern label="Contabilidad" v-tooltip="`Contabilidad`" icon="pi pi-dollar"
          :submenu-items="contabilidadItems" :is-collapsed="isCollapsed" @submenu-toggle="handleSubmenuToggle" />

        <!-- Generador de QR -->
        <MenuItemModern label="Generador de QR" v-tooltip="`Generador de QR`" :href="route('qr.generator')"
          icon="pi pi-qrcode" :is-collapsed="isCollapsed" />

        <!-- Proveedores -->
        <MenuItemModern label="Proveedores" v-tooltip="`Proveedores`" :href="route('proveedors.index')"
          icon="pi pi-truck" permission="ver proveedores" :is-collapsed="isCollapsed" />

        <!-- Ajustes -->
        <MenuItemModern label="Ajustes" v-tooltip="`Ajustes`" :href="route('settings')" icon="pi pi-cog"
          permission="ver usuarios" :is-collapsed="isCollapsed" />
      </nav>

    </div>
    <Tickets v-if="!isCollapsed"></Tickets>

    <MenuUserPanelModern :is-collapsed="isCollapsed" />
  </div>
</template>
<script setup>
import { Link } from "@inertiajs/vue3";
import { usePermissions } from "@/composable/Auth";
import { ref, watch, onMounted } from "vue";
import MenuItemModern from "@/Components/Menu/MenuItemModern.vue";
import MenuUserPanelModern from "@/Components/Menu/MenuUserPanelModern.vue";
import Tickets from "../Tickets.vue";

const { hasPermissionTo } = usePermissions();

// Emitir eventos al componente padre
const emit = defineEmits(['menu-toggle']);

// Estado del menú colapsado
const isCollapsed = ref(false);

// Función para obtener una cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Función para establecer una cookie
const setCookie = (name, value, days = 30) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

// Cargar estado inicial desde cookies
onMounted(() => {
  const savedState = getCookie('menu-collapsed');
  if (savedState !== null) {
    isCollapsed.value = savedState === 'true';
  }
});

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value;
  // Guardar en cookies
  setCookie('menu-collapsed', isCollapsed.value.toString());
  emit('menu-toggle', isCollapsed.value);
};

// Función para manejar cuando se abre un submenú
const handleSubmenuToggle = (isOpen) => {
  if (isOpen && isCollapsed.value) {
    // Expandir menú automáticamente cuando se abre un submenú y está colapsado
    isCollapsed.value = false;
    setCookie('menu-collapsed', 'false');
    emit('menu-toggle', isCollapsed.value);
  }
};

// Emitir el estado inicial
watch(isCollapsed, (newValue) => {
  emit('menu-toggle', newValue);
}, { immediate: true });

// Define submenu items as reactive data
const serviciosItems = [
  {
    label: "Tours",
    href: route('services.index'),
    icon: "fa-solid fa-person-hiking",
    permission: "ver servicios"
  },
  {
    label: "Embarcaciones",
    href: route('services.index', { type: 'EMBARCACION' }),
    icon: "fa-solid fa-ship",
    permission: "ver servicios"
  },
  {
    label: "Transportes",
    href: route('services.index', { type: 'TRANSFER' }),
    icon: "fa-solid fa-bus",
    permission: "ver servicios"
  },
  {
    label: "Alojamientos",
    href: route('accommodation.index'),
    icon: "fa-solid fa-building",
    permission: null
  }
];

const reservasItems = [
  {
    label: "Tours",
    href: route('BookingServices.index', { type: 'TOUR' }),
    icon: "fa-solid fa-person-hiking",
    permission: "ver experiencas"
  },
  {
    label: "Embarcaciones",
    href: route('BookingServices.index', { type: 'EMBARCACION' }),
    icon: "fa-solid fa-ship",
    permission: "ver experiencas"
  },
  {
    label: "Transportes",
    href: route('BookingServices.index', { type: 'TRANSFER' }),
    icon: "fa-solid fa-bus",
    permission: "ver experiencas"
  },
  {
    label: "Alojamientos",
    href: route('bookingAccommodations.index'),
    icon: "fa-solid fa-bed",
    permission: null
  }
];



const contabilidadItems = [

  {
    label: "Pagos",
    href: route('pagos'),
    icon: "fa-solid fa-money-bill-transfer text-green-500",
    permission: "ver pagos"
  },
  {
    label: 'Tiquetes',
    href: route('pagoEntradas.index'),
    icon: "fa-solid fa-calendar-check",
    permission: "ver pagos"
  },
  // {
  //   label: "Entradas",
  //   href: route('BookingServices.index'),
  //   icon: "fa-solid fa-person-hiking",
  //   permission: "ver entradas"
  // },
  {
    label: "Informe",
    href: route('contabilidad'),
    icon: "fa-solid fa-gauge",
    permission: "ver pagos"
  },
];
</script>

<template>
  <div
    class="menu-sidebar flex flex-col h-full transition-all duration-300 relative z-[1000] overflow-hidden"
    :class="isCollapsed ? 'w-20' : 'w-72'">
    
    <!-- Decorative gradient line at top -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"></div>
    
    <!-- Header with Logo and Toggle -->
    <div class="menu-header flex items-center p-5 border-b border-white/10"
      :class="isCollapsed ? 'flex-col space-y-3' : 'justify-between'">
      <div v-if="!isCollapsed" class="flex items-center gap-3">
        <div class="logo-box">
          <span class="text-white font-bold text-base">AV</span>
        </div>
        <div class="flex flex-col">
          <span class="font-black text-xl text-gray-900 tracking-tight">AV COLOMBIA</span>
          <span class="text-xs text-gray-500 font-medium">Travel Agency</span>
        </div>
      </div>
      <div v-else class="logo-box">
        <span class="text-white font-bold text-base">AV</span>
      </div>
      <button @click="toggleMenu" class="toggle-button">
        <i class="pi pi-bars text-white"></i>
      </button>
    </div>

    <!-- Main Menu Section -->
    <div class="flex-1 overflow-y-auto px-4 py-6 menu-scroll">
      <div v-if="!isCollapsed" class="menu-section-title">
        <i class="fa-solid fa-grip text-xs mr-2"></i>
        MENÚ PRINCIPAL
      </div>

      <nav class="space-y-2 overflow-hidden">
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

<style scoped>
/* ===== MENU SIDEBAR BASE ===== */
.menu-sidebar {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  box-shadow: 2px 0 30px rgba(0, 0, 0, 0.08);
  border-right: 1px solid #e2e8f0;
}

/* ===== HEADER ===== */
.menu-header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
}

/* ===== LOGO BOX ===== */
.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-box:hover {
  transform: translateY(-2px) rotate(5deg);
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.5);
  background: linear-gradient(135deg, #1e293b, #334155);
}

/* ===== TOGGLE BUTTON ===== */
.toggle-button {
  padding: 10px;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(15, 23, 42, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.toggle-button:hover {
  background: rgba(15, 23, 42, 0.1);
  border-color: rgba(15, 23, 42, 0.3);
  transform: scale(1.05);
}

.toggle-button i {
  transition: transform 0.3s ease;
  color: #1e293b;
}

.toggle-button:hover i {
  transform: rotate(90deg);
  color: #0f172a;
}

/* ===== MENU SECTION TITLE ===== */
.menu-section-title {
  display: flex;
  align-items: center;
  font-size: 0.65rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
}

/* ===== CUSTOM SCROLLBAR ===== */
.menu-scroll::-webkit-scrollbar {
  width: 6px;
}

.menu-scroll::-webkit-scrollbar-track {
  background: rgba(226, 232, 240, 0.3);
  border-radius: 10px;
}

.menu-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #64748b, #475569);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.menu-scroll::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #475569, #334155);
}

/* ===== ANIMATIONS ===== */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-sidebar nav {
  animation: slideIn 0.4s ease-out;
}
</style>

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

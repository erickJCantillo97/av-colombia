<template>
  <div class="flex flex-col h-full">
    <MenuLogo />
    
    <div class="overflow-y-auto">
      <ul class="list-none p-2 m-0">
        <MenuSection title="Favoritos">
          <!-- Dashboard -->
          <MenuItem 
            label="Dashboard"
            :href="route('dashboard')"
            icon="pi pi-home"
          />

          <!-- Servicios -->
          <MenuItem 
            label="Servicios"
            icon="fa-solid fa-tags"
            :submenu-items="serviciosItems"
          />

          <!-- Reservas -->
          <MenuItem 
            label="Reservas"
            icon="pi pi-calendar"
            :submenu-items="reservasItems"
          />

          <!-- Contabilidad -->
          <MenuItem 
            label="Contabilidad"
            icon="pi pi-dollar"
            :submenu-items="contabilidadItems"
          />

          <!-- Generador de QR -->
          <MenuItem 
            label="Generador de QR"
            :href="route('qr.generator')"
            icon="pi pi-qrcode"
          />

          <!-- Proveedores -->
          <MenuItem 
            label="Proveedores"
            :href="route('proveedors.index')"
            icon="pi pi-truck"
            permission="ver proveedores"
          />

          <!-- Ajustes -->
          <MenuItem 
            label="Ajustes"
            :href="route('settings')"
            icon="pi pi-cog"
            permission="ver usuarios"
          />
        </MenuSection>
      </ul>
    </div>

    <MenuUserPanel />
  </div>
</template>
<script setup>
import { Link } from "@inertiajs/vue3";
import { usePermissions } from "@/composable/Auth";
import MenuLogo from "@/Components/Menu/MenuLogo.vue";
import MenuSection from "@/Components/Menu/MenuSection.vue";
import MenuItem from "@/Components/Menu/MenuItem.vue";
import MenuUserPanel from "@/Components/Menu/MenuUserPanel.vue";

const { hasPermissionTo } = usePermissions();

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
  }
];

const reservasItems = [
  {
    label: "Experiencias",
    href: route('BookingServices.index'),
    icon: "fa-solid fa-person-hiking",
    permission: "ver experiencas"
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
    label: 'Pagos de Entradas',
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

<template>
  <AppLayout title="Configuración General">
    <div class="p-4 lg:p-8 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Configuración General</h1>
        <p class="text-gray-600">Administra los ajustes y configuraciones de tu sistema</p>
      </div>

      <!-- Card Principal -->
      <div
        data-aos="fade-up"
        data-aos-duration="600"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <!-- Tabs Navigation -->
        <div class="border-b border-gray-200 bg-gray-50">
          <div class="flex overflow-x-auto scrollbar-hide">
            <button
              v-for="op in options"
              :key="op.value"
              @click="value = op.value"
              :class="[
                'flex-1 min-w-fit px-6 py-4 text-sm font-semibold transition-all duration-200 relative whitespace-nowrap',
                value == op.value
                  ? 'text-rose-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              ]"
            >
              <div class="flex items-center justify-center gap-2">
                <i :class="op.icon" class="text-base"></i>
                <span>{{ op.name }}</span>
              </div>
              <div
                v-if="value == op.value"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600"
              ></div>
            </button>
          </div>
        </div>
        <!-- Content Area -->
        <div class="min-h-[60vh]">
          <!-- Métodos de Pago -->
          <div v-if="value == 1" class="p-6 lg:p-8">
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-900 mb-2">Métodos de Pago</h2>
              <p class="text-sm text-gray-600">Configura los métodos de pago disponibles en tu sistema</p>
            </div>
            <PaymentMethods />
          </div>

          <!-- Usuarios -->
          <div v-else-if="value == 2" class="p-6 lg:p-8">
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h2>
              <p class="text-sm text-gray-600">Administra usuarios, roles y permisos del sistema</p>
            </div>
            <Index :users :permisos />
          </div>

          <!-- Dólar -->
          <div v-else-if="value == 3" class="p-6 lg:p-8">
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-900 mb-2">Tasa de Cambio</h2>
              <p class="text-sm text-gray-600">Define el valor del dólar para conversiones</p>
            </div>
            <div class="max-w-md bg-gray-50 rounded-xl p-6 border border-gray-200">
              <Input type="number" label="Valor del Dólar (COP)" placeholder="Ej: 4500" />
              <div class="flex justify-end mt-6">
                <Button label="Guardar" severity="success" class="!h-10" icon="fa-solid fa-save" />
              </div>
            </div>
          </div>

          <!-- Canales -->
          <div v-else-if="value == 4" class="p-6 lg:p-8">
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-900 mb-2">Canales de Venta</h2>
              <p class="text-sm text-gray-600">Administra los canales de distribución y sus comisiones</p>
            </div>
            <Channels />
          </div>

          <!-- Tipos de Tiquetes -->
          <div v-else-if="value == 5" class="p-6 lg:p-8">
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-900 mb-2">Tipos de Tiquetes</h2>
              <p class="text-sm text-gray-600">Define los diferentes tipos de tickets y sus servicios asociados</p>
            </div>
            <IndexTiquetes :ticketTypes :services />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import Input from "@/Components/Customs/Input.vue";
import PaymentMethods from "@/Components/PaymentMethods.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { ref } from "vue";
import Index from "./Users/Index.vue";
import Channels from "./Channels.vue";
import IndexTiquetes from "./TiquetesType/Index.vue";
const value = ref(1);

const props = defineProps({
  users: {
    type: Array,
    default: [],
  },
  permisos: Array,
  ticketTypes: Array,
  services: Array,
});

const options = [
  { name: "Métodos de Pago", value: 1, icon: "fa-solid fa-credit-card" },
  { name: "Usuarios", value: 2, icon: "fa-solid fa-users" },
  { name: "Canales", value: 4, icon: "fa-solid fa-store" },
  { name: "Tipos de Tiquetes", value: 5, icon: "fa-solid fa-ticket" },
];
</script>

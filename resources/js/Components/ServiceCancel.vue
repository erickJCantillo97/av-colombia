<template>
  <Modal
    :title="`Cancelar Servicio ${service.service}`"
    v-model="showModal"
    width="75vw"
    @close="showModal = false"
    close-on-escape
  >
    <div class="px-8 py-6 space-y-6">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-xl p-6 border border-rose-100 dark:border-rose-800">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
          {{ service.cliente_name }}
        </h2>
        
        <div class="max-w-md mx-auto">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Fecha de Cancelación
          </label>
          <div class="relative">
            <input
              type="date"
              class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800 transition-all px-4 py-3 text-lg"
              v-model="form.date"
            />
          </div>
        </div>
      </div>

      <!-- Providers Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <tr>
                <th class="px-4 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Proveedor
                </th>
                <th class="px-4 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Concepto
                </th>
                <th class="px-4 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Pasajeros
                </th>
                <th class="px-4 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Costo
                </th>
                <th class="px-4 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Penalidad Total
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="(proveedor, index) in proveedorsCostos"
                :key="proveedor.proveedor_id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ proveedor.proveedor_name }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  <div class="max-w-xs truncate" :title="proveedor.concept">
                    {{ proveedor.concept }}
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-center text-gray-900 dark:text-gray-100">
                  <span class="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                    {{ proveedor.pasajeros }}
                  </span>
                </td>
                <td class="px-4 py-4 text-sm text-right font-semibold text-gray-900 dark:text-gray-100">
                  {{ COP.format(proveedor.cost) }}
                </td>
                <td class="px-4 py-4">
                  <input
                    class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800 transition-all text-right px-3 py-2 font-semibold"
                    v-model="proveedor.costo_penalidad"
                    type="number"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3 px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
      <Button 
        @click="showModal = false"
        class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        Cancelar
      </Button>
      <Button 
        severity="danger" 
        @click="submit"
        class="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        Confirmar Cancelación
      </Button>
    </div>
  </Modal>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Modal from "./Customs/Modal.vue";
import { useForm } from "@inertiajs/vue3";

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const showModal = defineModel();

const showview = defineModel("view", {
  default: false,
});

const props = defineProps({
  service: Object,
});

const form = useForm({
  date: "",
  proveedors: [],
});

const proveedorsCostos = ref([]);

onMounted(() => {
  proveedorsCostos.value = props.service.proveedors.map((proveedor) => {
    var p = proveedor.proveedor;
    return {
      proveedor_id: proveedor.id,
      concept: p.concept,
      proveedor: proveedor,
      pasajeros: props.service.adults,
      cost: proveedor.cost,
      proveedor_name: p.proveedor.nombre,
      costo_penalidad:
        p.proveedor.type_penalidad_cost == "Porcentaje"
          ? (p.proveedor.penalidad_cancelacion / 100) * proveedor.cost
          : p.proveedor.penalidad_cancelacion * props.service.adults,
    };
  });
});

const submit = () => {
  form.proveedors = proveedorsCostos.value;
  form.post(route("cancelar.servicio", props.service.id), {
    onSuccess: () => {
      showModal.value = false;
      showview.value = false;
    },
  });
};
</script>

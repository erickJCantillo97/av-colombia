<template>
  <Modal
    :title="`Marcar como No SHOW ${service.service}`"
    v-model="showModal"
    width="75vw"
    @close="showModal = false"
    close-on-escape
  >
    <div class="px-8 py-6 space-y-6">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
          {{ service.cliente_name }}
        </h1>
        
        <div class="max-w-md mx-auto">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ¿Cuántos pasajeros no se presentaron?
          </label>
          <div class="relative">
            <input
              type="number"
              :min="1"
              @input="noShowPaymente"
              :max="service.adults"
              class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 transition-all text-center text-2xl font-semibold py-3"
              v-model="form.cantidad"
            />
            <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              de {{ service.adults }}
            </div>
          </div>
        </div>
      </div>

      <!-- Notes Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <Input
          type="textarea"
          v-model="form.notes"
          label="¿Por qué no se presentaron?"
          class="text-gray-700 dark:text-gray-300"
        />
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
                  Costo Total
                </th>
                <th class="px-4 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Penalidad
                </th>
                <th class="px-4 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Total a Pagar
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
                    class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 transition-all text-right px-3 py-2"
                    v-model="proveedor.costo_penalidad"
                    @input="calculateTotalPayment(proveedor)"
                    type="number"
                  />
                </td>
                <td class="px-4 py-4 text-sm text-right font-bold text-red-600 dark:text-red-400">
                  {{ COP.format(proveedor.totalpayment) }}
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
        severity="warn" 
        @click="submit"
        class="px-6 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        Confirmar No Show
      </Button>
    </div>
  </Modal>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import Modal from "./Customs/Modal.vue";
import { useForm } from "@inertiajs/vue3";
import Input from "./Customs/Input.vue";

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const showModal = defineModel();

const props = defineProps({
  service: Object,
});

const form = useForm({
  cantidad: props.service.adults,
  notes: "",
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
      totalpayment: 0,
      costo_penalidad:
        p.proveedor.type_penalidad_cost == "Porcentaje"
          ? ((p.proveedor.penalidad_no_show / 100) * proveedor.cost) /
            props.service.adults
          : p.proveedor.penalidad_no_show ?? 0,
    };
  });
  noShowPaymente();
});

const submit = () => {
  form.proveedors = proveedorsCostos.value;
  form.post(route("noshow.servicio", props.service.id), {
    onSuccess: () => {
      showModal.value = false;
    },
  });
};

const noShowPaymente = () => {
  proveedorsCostos.value.forEach((proveedor) => {
    proveedor.total_no_show = proveedor.costo_penalidad * form.cantidad;
    calculateTotalPayment(proveedor);
  });
};

const calculateTotalPayment = (proveedor) => {
    const totalPresentes = proveedor.pasajeros  - form.cantidad;
    const valuePresentes = (proveedor.cost / proveedor.pasajeros) * totalPresentes;
    proveedor.totalpayment = valuePresentes + proveedor.costo_penalidad*form.cantidad;
};
</script>

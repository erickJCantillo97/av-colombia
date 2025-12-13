<template>
  <Modal v-model="show" title="" close-on-escape>
    <div ref="modalRoot" class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden" role="dialog" :aria-labelledby="headingId">
      <div class="flex items-center gap-4 p-6 border-b dark:border-gray-700">
        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xl shadow">
          <i class="fa-solid fa-check" aria-hidden="true"></i>
        </div>
        <div>
          <h3 :id="headingId" class="text-lg font-bold text-gray-900 dark:text-gray-100">Completar servicio</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ service.cliente_name }} · <span class="font-semibold uppercase">{{ service.service }}</span></p>
        </div>
        <div class="ml-auto text-sm text-gray-500 dark:text-gray-400">Sin novedad</div>
      </div>

      <div class="p-6 space-y-6">
        <div v-if="service.service_type == 'TRANSFER' || service.proveedors.find(p => p.proveedor_id === '9e602dc8-08e0-42f4-bbb2-1eed02652372')">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Conductor"
              v-model="form.conductor"
              type="text"
              placeholder="Nombre del conductor"
              class="w-full"
            />
            <Input
              label="Placa"
              v-model="form.placa"
              type="text"
              placeholder="Placa del Vehiculo"
              class="w-full"
            />
            <Input
              label="Valor del servicio"
              v-model="form.value"
              type="text"
              placeholder="Valor del Servicio"
              class="w-full"
            />
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
          <div class="flex items-center justify-between mb-3">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-300">Saldo restante</p>
              <p class="text-lg font-bold text-gray-800 dark:text-gray-100">{{ COP.format(service.saldo - totalPagos) }}</p>
            </div>
            <div class="text-sm text-gray-500">Distribuye el pago entre proveedores</div>
          </div>

          <div class="space-y-3">
            <div v-for="proveedor in saldos" :key="proveedor.id" class="flex items-center gap-4">
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ proveedor.name }}</div>
              </div>
              <div class="w-48">
                <Input class="w-full" type="number" mode="currency" v-model="proveedor.amount" aria-label="Monto para {{ proveedor.name }}"></Input>
              </div>
            </div>
          </div>

          <div v-if="!isValid" class="mt-3 p-3 rounded bg-red-50 text-sm text-red-700">
            La suma de los pagos excede el saldo. Ajusta los montos antes de continuar.
          </div>
        </div>

        <div v-if="service.extras && service.extras.length > 0" class="space-y-3">
          <h4 class="text-md font-semibold">Servicios extras</h4>
          <div class="grid grid-cols-12 gap-3 items-center font-semibold text-sm text-gray-600 dark:text-gray-300">
            <div class="col-span-2">Cantidad</div>
            <div class="col-span-6">Descripción</div>
            <div class="col-span-2 text-right">Costo Unitario</div>
            <div class="col-span-2 text-right">Total</div>
          </div>

          <div v-for="extra in form.extras" :key="extra.id" class="grid grid-cols-12 gap-3 items-center py-2 border-b border-dashed border-gray-200 dark:border-gray-700">
            <div class="col-span-2">{{ extra.cantidad }}</div>
            <div class="col-span-6">{{ extra.description }}</div>
            <div class="col-span-2">
              <Input type="number" v-model="extra.unit_cost" mode="currency" aria-label="Costo unitario {{ extra.description }}"></Input>
            </div>
            <div class="col-span-2 text-right">{{ COP.format(extra.cantidad * extra.unit_cost) }}</div>
          </div>
        </div>

        <!-- Resumen numérico -->
        <div class="p-4 rounded-lg bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
          <div class="flex justify-between gap-4 text-sm">
            <div class="text-gray-600">Total pagos</div>
            <div class="font-medium">{{ COP.format(totalPagos) }}</div>
          </div>
          <div class="flex justify-between gap-4 text-sm mt-1">
            <div class="text-gray-600">Total extras</div>
            <div class="font-medium">{{ COP.format(totalExtras) }}</div>
          </div>
          <div class="flex justify-between gap-4 text-sm mt-2 pt-2 border-t">
            <div class="text-gray-800 font-semibold">Total final</div>
            <div class="text-gray-800 font-semibold">{{ COP.format(totalFinal) }}</div>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900/40 border-t dark:border-gray-700 flex justify-end gap-3">
        <Button
          label="Cancelar"
          severity="danger"
          icon="fa-solid fa-xmark"
          class="bg-white/60 hover:bg-white/80 dark:bg-gray-800/50"
          @click="show = false"
          aria-label="Cancelar completar servicio"
        />
        <Button
          :disabled="!isValid || form.processing"
          label="Completar Servicio"
          severity="success"
          @click="submit"
          icon="fa-solid fa-save"
          class="px-5 py-3"
          :aria-disabled="!isValid || form.processing"
        />
      </div>
    </div>
  </Modal>
</template>
<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Modal from "./Modal.vue";
import Input from "./Input.vue";
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
  service: Object,
});
const show = defineModel(true);

// accesibilidad / refs
const modalRoot = ref(null);
const headingId = `completar-heading-${props.service?.id ?? Math.random().toString(36).slice(2)}`;

const status = ref("COMPLETADA");

const options = [{ label: "Sin novedad", value: "COMPLETADA", color: "blue" }];
const saldos = ref([]);

// Totales y validaciones
const totalPagos = computed(() => {
  return saldos.value.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
});

const totalExtras = computed(() => {
  return (form.extras || []).reduce((acc, e) => acc + ((Number(e.unit_cost) || 0) * (Number(e.cantidad) || 0)), 0);
});

const totalFinal = computed(() => totalPagos.value + totalExtras.value);

const isValid = computed(() => {
  // La suma de pagos no debe exceder el saldo disponible
  const saldo = Number(props.service?.saldo || 0);
  return totalPagos.value <= saldo;
});

// focus al abrir modal
watch(show, async (val) => {
  if (val) {
    await nextTick();
    try {
      const root = modalRoot.value;
      if (root) {
        const input = root.querySelector && root.querySelector('input[type="text"], input[type="number"], textarea');
        if (input && input.focus) input.focus();
      }
    } catch (e) {
      // noop
    }
  }
});

const form = useForm({
  saldoPagado: "AV COLOMBIA",
  status: "COMPLETADA",
  service_id: props.service.id,
  conductor: "",
  placa: "",
  value: "",
  saldos: [],
  extras: [],
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

function llenarExtras() {
  form.extras = props.service.extras.map((extra) => {
    return {
      id: extra.id,
      cantidad: extra.cantidad,
      description: extra.description,
      unit_cost: extra.unit_cost,
    };
  });
}

llenarExtras();

const submit = () => {
  // Validación: evitar submit si la suma excede el saldo
  if (!isValid.value) {
    // deja que el banner en la UI informe al usuario
    return;
  }

  form.saldos = saldos.value;
  form.status = status.value;
  form.post(route("completar.reserva"), {
    onSuccess: () => {
      form.reset();
      show.value = false;
    }
  });
};

function llenarSaldos() {
  saldos.value = props.service.proveedors.map((proveedor) => {
    return {
      id: proveedor.id,
      name: proveedor.proveedor.proveedor.nombre,
      amount: 0
    };
  });
}

llenarSaldos();

</script>

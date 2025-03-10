<template>
  <div
    class="hidden border-yellow-600 text-yellow-600 border-green-600 border-orange-600 text-orange-600 text-white bg-green-600 bg-orange-600"
  ></div>
  <Modal v-model="show" title="Completar Servicio" close-on-escape>
    <h2 class="text-lg">
      Completar servicio de
      <span class="font-bold uppercase">
        {{ service.cliente_name }}
      </span>
      para
      <span class="font-bold uppercase"> {{ service.service }} </span>.
    </h2>

    <div class="flex w-full justify-between items-center my-4">
      <div
        v-for="option in options"
        :key="option.value"
        @click="status = option.value"
        class="flex border items-center rounded-md shadow-md p-2 uppercase font-semibold cursor-pointer"
        :class="`border-${option.color}-600  ${
          status == option.value
            ? `bg-${option.color}-600 text-white`
            : `text-${option.color}-600`
        }`"
      >
        <p>
          {{ option.label }}
        </p>
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-y-4">
        <div class="flex justify-between my-4" v-if="service.saldo > 0">
          <label for="" class="w-full font-bold"
            >Saldo Pagado ({{ COP.format(service.saldo) }})</label
          >
          <div class="flex gap-4 justify-between text-md">
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="form.saldoPagado"
                inputId="AV COLOMBIA"
                name="AV COLOMBIA"
                value="AV COLOMBIA"
                size="small"
              />
              <label for="AV COLOMBIA" class="text-nowrap cursor-pointer"
                >AV COLOMBIA</label
              >
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="form.saldoPagado"
                inputId="proveedor"
                name="proveedor"
                value="proveedor"
                size="small"
              />
              <label for="proveedor" class="cursor-pointer uppercase">Proveedor</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="form.saldoPagado"
                inputId="NoPagado"
                class="cursor-pointer text-red-500"
                name="NoPagado"
                value="NoPagado"
                size="small"
              />
              <label
                for="NoPagado"
                class="cursor-pointer uppercase text-nowrap text-red-500"
                >No Pagado</label
              >
            </div>
          </div>
        </div>
      </div>

      <Input label="Cuantos no se presentaron?" v-if="status == 'NO SHOW'"></Input>
      <!-- <Input label="Pago por penalidad al proveedor por PAX"></Input> -->
      <div v-if="status == 'CANCELADO' || status == 'NO SHOW'">
        <p class="text-red-600 font-bold">
          {{
            status == "CANCELADO"
              ? "¿Por qué se canceló el servicio?"
              : "¿Por qué el cliente no se presentó?"
          }}
        </p>
        <textarea
          v-model="service.no_show_reason"
          class="w-full border p-2 rounded-md"
        ></textarea>
      </div>
      <div v-if="service.extras.length > 0" class="flex flex-col gap-y-2 my-4">
        <h1 class="text-lg font-bold text-center">Servicio Extras</h1>
        <div class="grid grid-cols-4 font-semibold gap-x-6 border-b-4">
          <p>Cantidad</p>
          <p>Nombre</p>
          <p v-tooltip.top="`Cuanto pagaste`">Costo Unitario</p>
          <p>Total</p>
        </div>
        <div
          v-for="extra in form.extras"
          :key="extra.id"
          class="grid grid-cols-4 border-b justify-center items-center gap-x-6"
        >
          <p>{{ extra.cantidad }}</p>
          <p>{{ extra.description }}</p>
          <Input type="number" v-model="extra.unit_cost" mode="currency"></Input>
          <span>{{ COP.format(extra.cantidad * extra.unit_cost) }}</span>
        </div>
      </div>
    </div>
    <!-- {{ service.extras }} -->
    <template #footer>
      <div class="flex justify-end gap-x-4">
        <Button
          label="Completar Servicio"
          severity="success"
          @click="submit"
          icon="fa-solid fa-save"
        />
        <Button label="Cancelar" severity="danger" icon="fa-solid fa-xmark" />
      </div>
    </template>
  </Modal>
</template>
<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";
import Input from "./Input.vue";
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
  service: Object,
});
const show = defineModel(true);

const status = ref("COMPLETADA");

const options = [
  { label: "Sin novedad", value: "COMPLETADA", color: "blue" },
  { label: "No SHOW", value: "NO SHOW", color: "yellow" },
  { label: "Cancelado", value: "CANCELADO", color: "green" },
  { label: "Reubicado", value: "REUBICADO", color: "orange" },
  { label: "Cambio de Fecha", value: "CAMBIO DE FECHA", color: "gray" },
];

const form = useForm({
  saldoPagado: "AV COLOMBIA",
  status: "COMPLETADA",
  service_id: props.service.id,
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
  form.status = status.value;
  form.post(route("completar.reserva"));
  console.log(form);
};
</script>

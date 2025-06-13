<template>
  <Modal
    :title="`Marcar como No SHOW ${service.service}`"
    v-model="showModal"
    width="70vw"
    @close="showModal = false"
    close-on-escape
  >
    <div class="p-2">
      <div class="mb-4 flex flex-col">
        <h1 class="font-extrabold text-2xl text-center" for="">
          {{ service.cliente_name }}
        </h1>
        <label for="" class="font-bold">Cuantos no se presentaron?</label>
        <input
          type="number"
          :min="1"
          @input="noShowPaymente"
          :max="service.adults"
          class="rounded-lg border-gray-300"
          v-model="form.cantidad"
        />
      </div>
      <Input
        type="textarea"
        v-model="form.notes"
        label="¿Porque no se presentaron?"
        class="text-red-500"
      />
      <div class="grid grid-cols-6 font-bold uppercase bg-gray-300 p-2 text-center">
        <div class="col-span-1">Proveedor</div>
        <div class="col-span-1">Concepto</div>
        <div class="col-span-1">Pasajeros</div>
        <div class="col-span-1">Costo total Servicio</div>
        <div class="col-span-1">Pago por No Show</div>
        <div class="col-span-1">Total a pagar</div>
      </div>
      <div
        class="grid grid-cols-6 border-y items-center border text-right gap-x-4 py-1"
        v-for="proveedor in proveedorsCostos"
      >
        <div class="col-span-1">{{ proveedor.proveedor_name }}</div>
        <div class="col-span-1 text-nowrap truncate">{{ proveedor.concept }}</div>
        <div class="col-span-1">{{ proveedor.pasajeros }}</div>

        <div class="col-span-1">{{ COP.format(proveedor.cost) }}</div>
        <input
          class="col-span-1 rounded-md border-gray-300 p-2"
          v-model="proveedor.costo_penalidad"
          @input="calculateTotalPayment(proveedor)"
          type="number"
          mode="currency"
        />
        <div class="col-span-1">{{ COP.format(proveedor.totalpayment) }}</div>

      </div>
    </div>
    <div class="flex justify-end p-6 space-x-4">
      <Button @click="showModal = false">No, Cerrar</Button>
      <Button severity="warn" @click="submit">Si, Servicio No show</Button>
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
          : p.proveedor.penalidad_no_show,
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

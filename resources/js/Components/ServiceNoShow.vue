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
        <Input
          type="number"
          min="1"
          :max="service.adults"
          class="rounded-lg border-gray-300"
          v-model="form.cantidad"
        />
      </div>
      <Input type="textarea" label="¿Porque no se presentaron?" class="text-red-500" />
      <div class="grid grid-cols-5 font-bold uppercase bg-gray-300 p-2 text-center">
        <div class="col-span-1">Proveedor</div>
        <div class="col-span-1">Concepto</div>
        <div class="col-span-1">Pasajeros</div>
        <div class="col-span-1">Costo</div>
        <div class="col-span-1">Pago Total</div>
      </div>
      <div
        class="grid grid-cols-5 border-y items-center border text-right gap-x-4"
        v-for="proveedor in proveedorsCostos"
      >
        <div class="col-span-1">{{ proveedor.proveedor_name }}</div>
        <div class="col-span-1 text-nowrap truncate">{{ proveedor.concept }}</div>
        <div class="col-span-1">{{ proveedor.pasajeros }}</div>
        <div class="col-span-1">{{ COP.format(proveedor.cost) }}</div>
        <Input
          class="col-span-1 rounded-md border-gray-300 p-2"
          v-model="proveedor.costo_penalidad"
          type="number"
          mode="currency"
        />
      </div>
    </div>
    <div class="flex justify-end p-6 space-x-4">
      <Button @click="showModal = false">No, Cerrar</Button>
      <Button severity="danger" @click="submit">Si, Cancelar Servicio</Button>
    </div>
  </Modal>
</template>
<script setup>
import { onMounted, ref } from "vue";
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
  cantidad: "",
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
          ? (p.proveedor.penalidad_noshow / 100) * proveedor.cost
          : p.proveedor.penalidad_noshow * props.service.adults,
    };
  });
});

const submit = () => {
  form.proveedors = proveedorsCostos.value;
  form.post(route("noshow.servicio", props.service.id), {
    onSuccess: () => {
      showModal.value = false;
      console.log("Cancelado");
    },
  });
};
</script>

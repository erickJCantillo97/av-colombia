<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import Modal from "@/Components/Customs/Modal.vue";
import Form from "./Form.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { router, useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { ref } from "vue";
import { alerts } from "@/composable/toasts";


const show = ref(false);

const { toast } = alerts();

const props = defineProps({
  payments: Array,
});


const payment = ref(null);
const add = {
  action: () => {
    show.value = true;
    // router.visit(route('services.create'))
  },
};

const actions = [
  {
    name: "Ver",
    icon: "fa-solid fa-pencil",
    severity: "info",
    action: (row) => {
      show.value = true;
      payment.value = row;
    },
  },
  {
    name: 'Eliminar',
    icon: "fa-solid fa-trash",
    severity: "danger",
    action: (row) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
      }).then((result) => {
        if (result.isConfirmed) {
          router.delete(route("paymentProveedors.destroy", row.id), {
            onSuccess: () => {
              toast("success", "Pago eliminado con éxito");
            },
          });
        }
      });
    },
  }
];

const columns = [
  {
    header: "Proveedor",
    field: "proveedor.nombre",
    filter: true,
  },
  {
    header: "Fecha de Pago",
    field: "date",
    type: "date",
    filter: true,
  },
  {
    header: "Valor",
    field: "amount",
    type: "currency",
  },
  {
    header: "Fecha Inicio",
    field: "startDate",
    type: "date",
    filter: true,
  },
  {
    header: "Fecha Fin",
    field: "endDate",
    type: "date",
    filter: true,
  },
  {
    header: "Comprobante",
    field: "comprobante",
    type: "html-custom",
    renderer: (row) => {
      return `<a href="${row.comprobante}" class="text-sky-600 underline" target="_blank">Ver Comprobante</a>`;
    },
  },
];





</script>

<template>
  <AppLayout title="Pagos">
    <div class="h-[99vh]">
      <Datatable :add :columnas="columns" :data="payments" :actions title="Pagos">
      </Datatable>
    </div>
    <Modal v-model="show" title="Añadir Pagos" width="80vw">
      <Form :payment="payment" ></Form>
    </Modal>
  </AppLayout>

</template>

<template>
  <AppLayout>
    <Datatable :data="proveedores" :actions="buttons" :columnas="columns" :add title="proveedores">
    </Datatable>
    <Form v-model="visible" :proveedor v-if="visible"></Form>
  </AppLayout>

</template>

<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { ref } from "vue";
import { alerts } from "@/composable/toasts";
import Swal from "sweetalert2";
import Form from "./Form.vue";
import { router } from "@inertiajs/vue3";
import { columns } from "./Columns";

const { toast } = alerts();

const proveedor = ref();

const visible = ref(false);
const add = {
  action: () => {
    visible.value = true;
  },
};

const buttons = [
  {
    action: (data) => {
      visible.value = true;
      proveedor.value = data;

    },
    severity: "info",
    icon: "fa-solid fa-pencil text-sm",
  },
  {
    action: (data) => {
      Swal.fire({
        title: "Eliminar Proveedor",
        text: "Estas seguro de eliminar este proveedor?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.isConfirmed) {
          router.delete(route("proveedors.destroy", data.id), {
            onSuccess: () => {
              toast("error", "Proveedor Eliminado");
            },
          });
        }
      });
    },
    severity: "danger",
    icon: "fa-solid fa-trash text-sm",
  },
];

const props = defineProps({
  proveedores: Array,
});


</script>

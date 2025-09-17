<template>
  <AppLayout title="Alojamientos">
    <div class="h-[90vh] md:h-[99vh] overflow-y-auto">

      <Datatable :add="canCreateAccommodation ? add : null" :columnas="Columns" :data="accommodationsFormatted"
        routecreate="accommodations.create" :actions="buttons" title="Alojamientos">
      </Datatable>
    </div>
  </AppLayout>

  <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Datatable from "@/Components/Customs/Datatable.vue";
import { router, usePage } from "@inertiajs/vue3";
import ConfirmPopup from "primevue/confirmpopup";
import { computed } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { alerts } from "@/composable/toasts";
import Columns from "./Columns";

const { toast } = alerts();
const confirm = useConfirm();

const props = defineProps({
  accommodations: Array,
  canCreateAccommodation: Boolean,
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

// Formatear datos para el datatable
const accommodationsFormatted = computed(() => {
  return props.accommodations.map(accommodation => ({
    ...accommodation,
    rooms_count: accommodation.rooms?.length || 0,
    min_price: accommodation.min_price ? COP.format(accommodation.min_price) : 'N/A',
    type: accommodation.type.charAt(0).toUpperCase() + accommodation.type.slice(1),
    status: accommodation.status.charAt(0).toUpperCase() + accommodation.status.slice(1),
  }));
});

const add = {
  action: () => {
    router.visit(route("accommodation.create"));
  },
};

const buttons = [
  {
    action: (data) => {
      router.visit(route("accommodation.show", data.id));
    },
    severity: "primary",
    icon: "fa-solid fa-eye text-sm",
    label: "Ver",
  },
  {
    action: (data) => {
      router.visit(route("accommodation.edit", data.id));
    },
    show: (data) => {
      const user = usePage().props.auth.user;
      return user.id === data.user_id ||
        user.rol === 'admin' ||
        user.rol === 'superadmin';
    },
    severity: "info",
    icon: "fa-solid fa-pencil text-sm",
    label: "Editar",
  },
  {
    action: (data, event) => {
      confirm.require({
        target: event.currentTarget,
        message: "¿Seguro de eliminar el alojamiento " + data.name + "?",
        icon: "fa-solid fa-exclamation-triangle",
        rejectClass: "p-button-secondary p-button-outlined p-button-sm",
        acceptClass: "p-button-sm p-button-danger",
        rejectLabel: "Cancelar",
        acceptLabel: "Eliminar",
        accept: () => {
          router.delete(route("accommodation.destroy", data.id), {
            onSuccess: () => {
              toast("success", "Alojamiento eliminado con éxito");
            },
          });
        },
      });
    },
    show: (data) => {
      const user = usePage().props.auth.user;
      return user.id === data.user_id ||
        user.rol === 'admin' ||
        user.rol === 'superadmin';
    },
    severity: "danger",
    icon: "fa-regular fa-trash-can text-sm",
    label: "Eliminar",
  },
];
</script>

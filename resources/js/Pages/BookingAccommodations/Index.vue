<template>
  <AppLayout title="Mis Reservas de Alojamientos">
    <div class="h-[95vh]">
      <Datatable :data="bookings" :add="add" :columnas="columns" responsiveLayout="scroll" title="Reservas de Alojamientos" class="p-datatable-sm"
        emptyMessage="No tienes reservas de alojamientos." />
    </div>
  </AppLayout>
  <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { router } from "@inertiajs/vue3";
import Button from "primevue/button";
import Badge from "primevue/badge";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";
import { alerts } from "@/composable/toasts";
import Datatable from "@/Components/Customs/Datatable.vue";
import { columns } from "./Columns";

const add = {
    action: () => {
        router.get(route("bookingAccommodations.create"));
    },
};


const { toast } = alerts();
const confirm = useConfirm();

const props = defineProps({
  bookings: Array,
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const formatPrice = (price) => {
  return COP.format(price);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-CO');
};

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'confirmada': return 'Confirmada';
    case 'cancelada': return 'Cancelada';
    case 'completada': return 'Completada';
    default: return status;
  }
};

const getStatusSeverity = (status) => {
  switch (status) {
    case 'confirmada': return 'success';
    case 'cancelada': return 'danger';
    case 'completada': return 'info';
    default: return 'warning';
  }
};

const canCancelBooking = (booking) => {
  const now = new Date();
  const checkIn = new Date(booking.check_in_date);
  return booking.status === 'confirmada' && checkIn > now;
};

const searchAccommodations = () => {
  router.visit(route('booking-accommodations.search'));
};

const viewBooking = (booking) => {
  router.visit(route('booking-accommodations.show', booking.id));
};

const cancelBooking = (booking, event) => {
  confirm.require({
    target: event.currentTarget,
    message: `¿Estás seguro de cancelar la reserva en ${booking.room?.accommodation?.name}?`,
    icon: 'fa-solid fa-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-sm p-button-danger',
    rejectLabel: 'No, mantener',
    acceptLabel: 'Sí, cancelar',
    accept: () => {
      router.delete(route('booking-accommodations.destroy', booking.id), {
        onSuccess: () => {
          toast('success', 'Reserva cancelada exitosamente');
        },
      });
    },
  });
};
</script>

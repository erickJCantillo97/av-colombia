<template>
  <AppLayout title="Mis Reservas de Alojamientos">
    <div class="h-[90vh] md:h-[99vh] overflow-y-auto p-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Mis Reservas de Alojamientos</h1>
          <Button
            @click="searchAccommodations"
            icon="fa-solid fa-search"
            label="Buscar Alojamientos"
            severity="success"
          />
        </div>

        <div v-if="bookings.length === 0" class="text-center py-12">
          <div class="text-gray-500 text-lg mb-4">
            <i class="fa-solid fa-calendar-times text-4xl mb-4 block"></i>
            No tienes reservas de alojamientos
          </div>
          <Button
            @click="searchAccommodations"
            icon="fa-solid fa-search"
            label="Buscar Alojamientos"
            severity="success"
          />
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="booking in bookings" 
            :key="booking.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="grid grid-cols-1 md:grid-cols-4 gap-0">
              <!-- Imagen del alojamiento -->
              <div class="md:col-span-1">
                <div class="h-48 md:h-full bg-gray-200 relative">
                  <img 
                    v-if="booking.room?.accommodation?.photos?.[0]"
                    :src="booking.room.accommodation.photos[0].url" 
                    :alt="booking.room.accommodation.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
                    <i class="fa-solid fa-image text-gray-500 text-2xl"></i>
                  </div>
                  
                  <Badge 
                    :value="getStatusLabel(booking.status)" 
                    :severity="getStatusSeverity(booking.status)"
                    class="absolute top-2 right-2"
                  />
                </div>
              </div>

              <!-- Información de la reserva -->
              <div class="md:col-span-3 p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                  
                  <!-- Detalles del alojamiento -->
                  <div class="md:col-span-2">
                    <h3 class="text-xl font-semibold mb-2">
                      {{ booking.room?.accommodation?.name }}
                    </h3>
                    <p class="text-gray-600 mb-2">{{ booking.room?.name }}</p>
                    
                    <div class="flex items-center text-gray-500 text-sm mb-2">
                      <i class="fa-solid fa-map-marker-alt mr-2"></i>
                      {{ booking.room?.accommodation?.city }}, {{ booking.room?.accommodation?.country }}
                    </div>

                    <div class="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                      <div class="flex items-center">
                        <i class="fa-solid fa-calendar-alt mr-2"></i>
                        {{ formatDate(booking.check_in_date) }} - {{ formatDate(booking.check_out_date) }}
                      </div>
                      <div class="flex items-center">
                        <i class="fa-solid fa-users mr-2"></i>
                        {{ booking.guests_adults }} adultos
                        <span v-if="booking.guests_children > 0">, {{ booking.guests_children }} niños</span>
                      </div>
                      <div class="flex items-center">
                        <i class="fa-solid fa-moon mr-2"></i>
                        {{ calculateNights(booking.check_in_date, booking.check_out_date) }} noches
                      </div>
                    </div>

                    <div class="text-sm text-gray-500">
                      Reserva realizada el {{ formatDate(booking.created_at) }}
                    </div>
                  </div>

                  <!-- Precio y acciones -->
                  <div class="flex flex-col justify-between">
                    <div class="text-right mb-4">
                      <div class="text-2xl font-bold text-green-600">
                        {{ formatPrice(booking.total_price) }}
                      </div>
                      <div class="text-sm text-gray-500">Total</div>
                    </div>

                    <div class="space-y-2">
                      <Button
                        @click="viewBooking(booking)"
                        icon="fa-solid fa-eye"
                        label="Ver Detalles"
                        severity="info"
                        outlined
                        class="w-full"
                      />
                      
                      <Button
                        v-if="canCancelBooking(booking)"
                        @click="cancelBooking(booking)"
                        icon="fa-solid fa-times"
                        label="Cancelar"
                        severity="danger"
                        outlined
                        class="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

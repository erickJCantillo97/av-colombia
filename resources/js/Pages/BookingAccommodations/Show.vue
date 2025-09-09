<template>
  <AppLayout title="Detalle de Reserva">
    <div class="h-[90vh] md:h-[99vh] overflow-y-auto">
      <div class="max-w-4xl mx-auto p-6">
        
        <!-- Encabezado -->
        <div class="flex justify-between items-start mb-6">
          <div>
            <h1 class="text-2xl font-bold mb-2">Detalle de Reserva</h1>
            <p class="text-gray-600">Reserva #{{ booking.id.toString().padStart(6, '0') }}</p>
          </div>
          
          <div class="flex items-center space-x-3">
            <Badge 
              :value="getStatusLabel(booking.status)" 
              :severity="getStatusSeverity(booking.status)"
              size="large"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Información Principal -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Información del Alojamiento -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa-solid fa-building mr-2"></i>
                Alojamiento
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="font-semibold text-lg mb-2">{{ booking.accommodation.name }}</h3>
                  <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex items-center">
                      <i class="fa-solid fa-map-marker-alt mr-2"></i>
                      {{ booking.accommodation.address }}
                    </div>
                    <div class="flex items-center">
                      <i class="fa-solid fa-globe mr-2"></i>
                      {{ booking.accommodation.city }}, {{ booking.accommodation.country }}
                    </div>
                    <div class="flex items-center">
                      <i class="fa-solid fa-tag mr-2"></i>
                      {{ booking.accommodation.type }}
                    </div>
                    <div class="flex items-center">
                      <Rating 
                        :model-value="booking.accommodation.star_rating" 
                        readonly 
                        :cancel="false"
                        class="text-xs"
                      />
                    </div>
                  </div>
                </div>
                
                <div class="h-32 bg-gray-200 rounded">
                  <img 
                    v-if="booking.accommodation.photos?.[0]"
                    :src="booking.accommodation.photos[0].url" 
                    :alt="booking.accommodation.name"
                    class="w-full h-full object-cover rounded"
                  />
                  <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center rounded">
                    <i class="fa-solid fa-image text-gray-500 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Información de la Habitación -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa-solid fa-bed mr-2"></i>
                Habitación
              </h2>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-medium">Nombre:</span>
                  <span>{{ booking.room.name }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-medium">Tipo:</span>
                  <span>{{ booking.room.type }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-medium">Capacidad:</span>
                  <span>{{ booking.room.capacity }} personas</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-medium">Precio por noche:</span>
                  <span class="font-semibold text-green-600">{{ formatPrice(booking.room.price) }}</span>
                </div>
              </div>
              
              <div v-if="booking.room.description" class="mt-4 p-3 bg-gray-50 rounded">
                <p class="text-sm text-gray-600">{{ booking.room.description }}</p>
              </div>
            </div>

            <!-- Información del Huésped -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa-solid fa-user mr-2"></i>
                Información del Huésped
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <div>
                    <span class="block text-sm font-medium text-gray-500">Nombre:</span>
                    <span class="text-gray-900">{{ booking.guest_name }}</span>
                  </div>
                  <div>
                    <span class="block text-sm font-medium text-gray-500">Email:</span>
                    <span class="text-gray-900">{{ booking.guest_email }}</span>
                  </div>
                </div>
                <div class="space-y-3">
                  <div>
                    <span class="block text-sm font-medium text-gray-500">Teléfono:</span>
                    <span class="text-gray-900">{{ booking.guest_phone }}</span>
                  </div>
                  <div>
                    <span class="block text-sm font-medium text-gray-500">Documento:</span>
                    <span class="text-gray-900">{{ booking.guest_document }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Solicitudes Especiales -->
            <div v-if="booking.special_requests" class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa-solid fa-comment mr-2"></i>
                Solicitudes Especiales
              </h2>
              
              <div class="p-4 bg-blue-50 rounded border-l-4 border-blue-400">
                <p class="text-gray-700">{{ booking.special_requests }}</p>
              </div>
            </div>
          </div>

          <!-- Panel Lateral -->
          <div class="space-y-6">
            
            <!-- Resumen de Fechas -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa-solid fa-calendar mr-2"></i>
                Fechas de Estadía
              </h3>
              
              <div class="space-y-4">
                <div class="text-center p-4 bg-green-50 rounded border">
                  <div class="text-sm text-gray-500">Check-in</div>
                  <div class="font-semibold text-lg">{{ formatDate(booking.check_in_date) }}</div>
                  <div class="text-xs text-gray-500">A partir de las 15:00</div>
                </div>
                
                <div class="text-center">
                  <i class="fa-solid fa-arrow-down text-gray-400"></i>
                  <div class="text-sm text-gray-500 mt-1">
                    {{ calculateNights(booking.check_in_date, booking.check_out_date) }} 
                    {{ calculateNights(booking.check_in_date, booking.check_out_date) === 1 ? 'noche' : 'noches' }}
                  </div>
                </div>
                
                <div class="text-center p-4 bg-red-50 rounded border">
                  <div class="text-sm text-gray-500">Check-out</div>
                  <div class="font-semibold text-lg">{{ formatDate(booking.check_out_date) }}</div>
                  <div class="text-xs text-gray-500">Hasta las 11:00</div>
                </div>
              </div>
            </div>

            <!-- Información de Huéspedes -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa-solid fa-users mr-2"></i>
                Huéspedes
              </h3>
              
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Adultos:</span>
                  <span class="font-semibold">{{ booking.guests_adults }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Niños:</span>
                  <span class="font-semibold">{{ booking.guests_children }}</span>
                </div>
                <hr>
                <div class="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{{ booking.guests_adults + booking.guests_children }} 
                    {{ (booking.guests_adults + booking.guests_children) === 1 ? 'huésped' : 'huéspedes' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Resumen de Precio -->
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <h3 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa-solid fa-calculator mr-2"></i>
                Resumen de Precios
              </h3>
              
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>{{ booking.room.name }}</span>
                  <span>{{ formatPrice(booking.room.price) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>{{ calculateNights(booking.check_in_date, booking.check_out_date) }} 
                    {{ calculateNights(booking.check_in_date, booking.check_out_date) === 1 ? 'noche' : 'noches' }}
                  </span>
                  <span>× {{ calculateNights(booking.check_in_date, booking.check_out_date) }}</span>
                </div>
                <hr>
                <div class="flex justify-between text-lg font-bold text-green-600">
                  <span>Total Pagado:</span>
                  <span>{{ formatPrice(booking.total_price) }}</span>
                </div>
              </div>
            </div>

            <!-- Información de la Reserva -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa-solid fa-info-circle mr-2"></i>
                Información de Reserva
              </h3>
              
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Fecha de Reserva:</span>
                  <span>{{ formatDateTime(booking.created_at) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Código de Referencia:</span>
                  <span class="font-mono">#{{ booking.id.toString().padStart(6, '0') }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Estado:</span>
                  <Badge 
                    :value="getStatusLabel(booking.status)" 
                    :severity="getStatusSeverity(booking.status)"
                  />
                </div>
              </div>
            </div>

            <!-- Acciones -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold mb-4">Acciones</h3>
              
              <div class="space-y-3">
                <Button
                  @click="$inertia.visit(route('booking-accommodations.index'))"
                  icon="fa-solid fa-arrow-left"
                  label="Volver a Reservas"
                  severity="secondary"
                  size="small"
                  class="w-full"
                />
                
                <Button
                  v-if="booking.status === 'confirmada'"
                  @click="confirmCancel"
                  icon="fa-solid fa-times"
                  label="Cancelar Reserva"
                  severity="danger"
                  size="small"
                  class="w-full"
                />
                
                <Button
                  @click="downloadVoucher"
                  icon="fa-solid fa-download"
                  label="Descargar Comprobante"
                  severity="success"
                  size="small"
                  class="w-full"
                />
                
                <Button
                  @click="contactSupport"
                  icon="fa-solid fa-headset"
                  label="Contactar Soporte"
                  severity="info"
                  size="small"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación de Cancelación -->
    <Dialog 
      v-model:visible="showCancelDialog" 
      modal 
      header="Confirmar Cancelación" 
      :style="{ width: '450px' }"
    >
      <div class="flex items-center space-x-3 mb-4">
        <i class="fa-solid fa-exclamation-triangle text-yellow-500 text-2xl"></i>
        <div>
          <p class="font-semibold">¿Estás seguro de que quieres cancelar esta reserva?</p>
          <p class="text-sm text-gray-600 mt-1">Esta acción no se puede deshacer.</p>
        </div>
      </div>
      
      <template #footer>
        <Button 
          label="No, mantener reserva" 
          severity="secondary" 
          @click="showCancelDialog = false" 
        />
        <Button 
          label="Sí, cancelar reserva" 
          severity="danger" 
          @click="cancelBooking"
          :loading="cancelling"
        />
      </template>
    </Dialog>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { ref } from "vue";
import { router } from "@inertiajs/vue3";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Rating from "primevue/rating";
import Dialog from "primevue/dialog";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  booking: Object,
});

const toast = useToast();
const showCancelDialog = ref(false);
const cancelling = ref(false);

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const formatPrice = (price) => {
  return COP.format(price);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const timeDiff = end.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const getStatusLabel = (status) => {
  const statusLabels = {
    'pendiente': 'Pendiente',
    'confirmada': 'Confirmada',
    'cancelada': 'Cancelada',
    'completada': 'Completada',
  };
  return statusLabels[status] || status;
};

const getStatusSeverity = (status) => {
  const statusSeverities = {
    'pendiente': 'warning',
    'confirmada': 'success',
    'cancelada': 'danger',
    'completada': 'info',
  };
  return statusSeverities[status] || 'secondary';
};

const confirmCancel = () => {
  showCancelDialog.value = true;
};

const cancelBooking = () => {
  cancelling.value = true;
  
  router.patch(route('booking-accommodations.cancel', props.booking.id), {}, {
    onSuccess: () => {
      toast.add({
        severity: 'success',
        summary: 'Reserva Cancelada',
        detail: 'La reserva ha sido cancelada exitosamente',
        life: 5000
      });
      showCancelDialog.value = false;
    },
    onError: () => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo cancelar la reserva. Inténtalo nuevamente.',
        life: 3000
      });
    },
    onFinish: () => {
      cancelling.value = false;
    }
  });
};

const downloadVoucher = () => {
  // Implementar descarga del comprobante
  window.open(route('booking-accommodations.voucher', props.booking.id), '_blank');
};

const contactSupport = () => {
  // Implementar contacto con soporte
  toast.add({
    severity: 'info',
    summary: 'Contactar Soporte',
    detail: 'Redirigiendo al sistema de soporte...',
    life: 3000
  });
  
  // Aquí podrías abrir un chat, modal de contacto, o redirigir a una página de soporte
  setTimeout(() => {
    window.open('mailto:soporte@av-colombia.com?subject=Consulta sobre Reserva #' + props.booking.id.toString().padStart(6, '0'), '_blank');
  }, 1000);
};
</script>

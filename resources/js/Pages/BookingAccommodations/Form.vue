<template>
  <AppLayout title="Nueva Reserva">
    <div class="h-[90vh] md:h-[99vh] overflow-y-auto">
      <div class="p-6">
        
        <!-- Título -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold mb-2">Nueva Reserva</h1>
          <p class="text-gray-600">Completa los datos para crear tu reserva</p>
        </div>

        <!-- Información del Alojamiento -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-lg font-semibold mb-4 flex items-center">
            <i class="fa-solid fa-building mr-2"></i>
            Seleccione el Alojamiento
          </h2>

          <div>
            <Input v-model="form.accommodation_id" type="dropdown" :options="rooms" option-label="name" option-value="id"/>
          </div>
          <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-lg mb-2">{{ accommodation.name }}</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center">
                  <i class="fa-solid fa-map-marker-alt mr-2"></i>
                  {{ accommodation.city }}, {{ accommodation.country }}
                </div>
                <div class="flex items-center">
                  <i class="fa-solid fa-tag mr-2"></i>
                  {{ accommodation.type }}
                </div>
                <div class="flex items-center">
                  <Rating 
                    :model-value="accommodation.star_rating" 
                    readonly 
                    :cancel="false"
                    class="text-xs"
                  />
                </div>
              </div>
            </div>
            
            <div class="h-32 bg-gray-200 rounded">
              <img 
                v-if="accommodation.photos?.[0]"
                :src="accommodation.photos[0].url" 
                :alt="accommodation.name"
                class="w-full h-full object-cover rounded"
              />
              <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center rounded">
                <i class="fa-solid fa-image text-gray-500 text-xl"></i>
              </div>
            </div>
          </div> -->
        </div>

        <form @submit.prevent="submit" class="space-y-6">
          
          <!-- Fechas de Reserva -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <i class="fa-solid fa-calendar mr-2"></i>
              Fechas de Estadía
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <VueDatePicker
                  v-model="form.check_in_date"
                  :min-date="new Date()"
                  :teleport="true"
                  auto-apply
                  :enable-time-picker="false"
                  timezone="America/Bogota"
                  placeholder="Fecha de entrada"
                  @update:model-value="updatePrices"
                />
                <InputError class="mt-2" :message="form.errors.check_in_date" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <VueDatePicker
                  v-model="form.check_out_date"
                  :min-date="form.check_in_date || new Date()"
                  :teleport="true"
                  auto-apply
                  :enable-time-picker="false"
                  timezone="America/Bogota"
                  placeholder="Fecha de salida"
                  @update:model-value="updatePrices"
                />
                <InputError class="mt-2" :message="form.errors.check_out_date" />
              </div>
            </div>

            <div v-if="nights > 0" class="mt-4 p-3 bg-blue-50 rounded">
              <div class="text-sm text-blue-700">
                <i class="fa-solid fa-info-circle mr-1"></i>
                Estadía de {{ nights }} {{ nights === 1 ? 'noche' : 'noches' }}
              </div>
            </div>
          </div>

          <!-- Huéspedes -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <i class="fa-solid fa-users mr-2"></i>
              Número de Huéspedes
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Adultos"
                v-model="form.guests_adults"
                type="number"
                min="1"
                required
                :error="form.errors.guests_adults"
                @input="updatePrices"
              />
              
              <Input
                label="Niños"
                v-model="form.guests_children"
                type="number"
                min="0"
                :error="form.errors.guests_children"
                @input="updatePrices"
              />
            </div>
          </div>

          <!-- Selección de Habitación -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <i class="fa-solid fa-bed mr-2"></i>
              Seleccionar Habitación
            </h3>
            
            <div v-if="rooms.find(room => room.id === form.accommodation_id)?.rooms.length === 0" class="text-center py-8">
              <div class="text-gray-500 mb-2">
                <i class="fa-solid fa-exclamation-triangle text-2xl"></i>
              </div>
              <p class="text-gray-600">No hay habitaciones disponibles para las fechas seleccionadas</p>
            </div>
            
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="room in rooms.find(room => room.id === form.accommodation_id)?.rooms " 
                :key="room.id"
                class="border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
                :class="form.room_id === room.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
                @click="selectRoom(room)"
              >
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-semibold">{{ room.name }}</h4>
                  <RadioButton
                    v-model="form.room_id"
                    :inputId="'room-' + room.id"
                    :value="room.id"
                  />
                </div>
                
                <p class="text-sm text-gray-600 mb-3">{{ room.description }}</p>
                
                <div class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <span>Capacidad:</span>
                    <span>{{ room.capacity }} personas</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Tipo:</span>
                    <span>{{ room.type }}</span>
                  </div>
                  <div class="flex justify-between font-semibold text-green-600">
                    <span>Precio por noche:</span>
                    <span>{{ formatPrice(room.price) }}</span>
                  </div>
                  
                  <div v-if="nights > 0 && form.room_id === room.id" class="border-t pt-2 mt-2">
                    <div class="flex justify-between font-bold">
                      <span>Total ({{ nights }} {{ nights === 1 ? 'noche' : 'noches' }}):</span>
                      <span class="text-green-600">{{ formatPrice(room.price * nights) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <InputError class="mt-2" :message="form.errors.room_id" />
          </div>

          <!-- Información del Huésped -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <i class="fa-solid fa-user mr-2"></i>
              Información del Huésped Principal
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre Completo"
                v-model="form.guest_name"
                required
                :error="form.errors.guest_name"
              />
              
              <Input
                label="Correo Electrónico"
                v-model="form.guest_email"
                type="email"
                required
                :error="form.errors.guest_email"
              />
              
              <Input
                label="Teléfono"
                v-model="form.guest_phone"
                type="tel"
                required
                :error="form.errors.guest_phone"
              />
              
              <Input
                label="Documento de Identificación"
                v-model="form.guest_document"
                required
                :error="form.errors.guest_document"
              />
            </div>
          </div>

          <!-- Solicitudes Especiales -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <i class="fa-solid fa-comment mr-2"></i>
              Solicitudes Especiales (Opcional)
            </h3>
            
            <Textarea
              v-model="form.special_requests"
              placeholder="Ej: Habitación en planta baja, cama extra, llegada tardía, etc."
              rows="3"
              class="w-full"
              :error="form.errors.special_requests"
            />
          </div>

          <!-- Resumen de Precio -->
          <div v-if="selectedRoom && nights > 0" class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <i class="fa-solid fa-calculator mr-2"></i>
              Resumen de la Reserva
            </h3>
            
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>{{ selectedRoom.name }}</span>
                <span>{{ formatPrice(selectedRoom.price) }} / noche</span>
              </div>
              <div class="flex justify-between">
                <span>{{ nights }} {{ nights === 1 ? 'noche' : 'noches' }}</span>
                <span>{{ formatPrice(selectedRoom.price * nights) }}</span>
              </div>
              <div class="flex justify-between">
                <span>{{ totalGuests }} {{ totalGuests === 1 ? 'huésped' : 'huéspedes' }}</span>
                <span>-</span>
              </div>
              <hr>
              <div class="flex justify-between text-lg font-bold text-green-600">
                <span>Total a Pagar:</span>
                <span>{{ formatPrice(totalPrice) }}</span>
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex justify-between space-x-4">
            <Button
              @click="$inertia.visit(route('booking-accommodations.search'))"
              icon="fa-solid fa-arrow-left"
              label="Volver a Búsqueda"
              severity="secondary"
              type="button"
            />
            
            <Button
              type="submit"
              icon="fa-solid fa-calendar-check"
              label="Confirmar Reserva"
              :loading="form.processing"
              :disabled="!canSubmit"
            />
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Input from "@/Components/Customs/Input.vue";
import InputError from "@/Components/InputError.vue";
import { useForm } from "@inertiajs/vue3";
import { computed, ref, watch, onMounted } from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import Button from "primevue/button";
import Rating from "primevue/rating";
import RadioButton from "primevue/radiobutton";
import { useToast } from "primevue/usetoast";
import { Textarea } from "primevue";

const props = defineProps({
  accommodation: Object,
  rooms: Array,
  searchParams: {
    type: Object,
    default: () => ({})
  }
});

const toast = useToast();
const availableRooms = ref([]);

const form = useForm({
  accommodation_id: null,
  room_id: null,
  check_in_date: null,
  check_out_date: null,
  guests_adults: 2,
  guests_children: 0,
  guest_name: '',
  guest_email: '',
  guest_phone: '',
  guest_document: '',
  special_requests: '',
  total_price: 0,
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const formatPrice = (price) => {
  return COP.format(price);
};

const nights = computed(() => {
  if (!form.check_in_date || !form.check_out_date) return 0;
  const checkIn = new Date(form.check_in_date);
  const checkOut = new Date(form.check_out_date);
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
});

const totalGuests = computed(() => {
  return parseInt(form.guests_adults) + parseInt(form.guests_children);
});

const selectedRoom = computed(() => {
  return availableRooms.value.find(room => room.id === form.room_id);
});

const totalPrice = computed(() => {
  if (!selectedRoom.value || nights.value <= 0) return 0;
  return selectedRoom.value.price * nights.value;
});

const canSubmit = computed(() => {
  return form.check_in_date && 
         form.check_out_date && 
         form.room_id && 
         form.guest_name && 
         form.guest_email && 
         form.guest_phone && 
         form.guest_document &&
         nights.value > 0;
});

onMounted(() => {
  // Cargar parámetros de búsqueda si existen
  if (props.searchParams.check_in) {
    form.check_in_date = new Date(props.searchParams.check_in);
  }
  if (props.searchParams.check_out) {
    form.check_out_date = new Date(props.searchParams.check_out);
  }
  if (props.searchParams.adults) {
    form.guests_adults = props.searchParams.adults;
  }
  if (props.searchParams.children) {
    form.guests_children = props.searchParams.children;
  }
  
  // Inicializar habitaciones disponibles
  availableRooms.value = props.rooms || [];
  
  // Verificar disponibilidad si hay fechas
  if (form.check_in_date && form.check_out_date) {
    checkAvailability();
  }
});

const checkAvailability = async () => {
  if (!form.check_in_date || !form.check_out_date) return;
  
  try {
    const response = await axios.get(route('api.accommodations.availability', props.accommodation.id), {
      params: {
        check_in: form.check_in_date.toISOString().split('T')[0],
        check_out: form.check_out_date.toISOString().split('T')[0],
        guests: totalGuests.value
      }
    });
    
    availableRooms.value = response.data.available_rooms || [];
    
    // Si la habitación seleccionada ya no está disponible, deseleccionarla
    if (form.room_id && !availableRooms.value.find(room => room.id === form.room_id)) {
      form.room_id = null;
    }
    
  } catch (error) {
    console.error('Error checking availability:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al verificar disponibilidad',
      life: 3000
    });
  }
};

const updatePrices = () => {
  setTimeout(() => {
    checkAvailability();
  }, 100);
};

const selectRoom = (room) => {
  form.room_id = room.id;
};

watch(() => totalPrice.value, (newPrice) => {
  form.total_price = newPrice;
});

const submit = () => {
  if (!canSubmit.value) {
    toast.add({
      severity: 'warn',
      summary: 'Datos Incompletos',
      detail: 'Por favor completa todos los campos requeridos',
      life: 3000
    });
    return;
  }

  form.post(route('booking-accommodations.store'), {
    onSuccess: () => {
      toast.add({
        severity: 'success',
        summary: 'Reserva Creada',
        detail: 'Tu reserva ha sido confirmada exitosamente',
        life: 5000
      });
    },
    onError: () => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al crear la reserva. Verifica los datos e intenta nuevamente.',
        life: 3000
      });
    }
  });
};
</script>

<template>
  <AppLayout :title="accommodation.name">
    <div class="h-[90vh] md:h-[99vh] overflow-y-auto">
      <div class="max-w-6xl mx-auto p-6 space-y-6">
        
        <!-- Header del Alojamiento -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ accommodation.name }}
                </h1>
                <div class="flex items-center space-x-4 text-gray-600">
                  <span class="flex items-center">
                    <i class="fa-solid fa-map-marker-alt mr-1"></i>
                    {{ accommodation.city }}, {{ accommodation.country }}
                  </span>
                  <span class="flex items-center">
                    <Rating 
                      :model-value="accommodation.star_rating" 
                      readonly 
                      :cancel="false"
                    />
                    <span class="ml-2">({{ accommodation.star_rating }} estrellas)</span>
                  </span>
                  <span v-if="accommodation.average_rating" class="flex items-center">
                    <i class="fa-solid fa-star text-yellow-500 mr-1"></i>
                    {{ accommodation.average_rating.toFixed(1) }}/5 
                    ({{ accommodation.reviews.length }} reseñas)
                  </span>
                </div>
              </div>
              
              <div class="text-right">
                <div class="text-2xl font-bold text-green-600">
                  Desde {{ formatPrice(accommodation.min_price) }}/noche
                </div>
                <Badge 
                  :value="accommodation.status" 
                  :severity="getStatusSeverity(accommodation.status)"
                />
              </div>
            </div>
            
            <div class="flex space-x-4">
              <Button
                @click="editAccommodation"
                v-if="canEdit"
                icon="fa-solid fa-edit"
                label="Editar"
                severity="info"
                outlined
              />
              <Button
                @click="searchRooms"
                icon="fa-solid fa-search"
                label="Buscar Disponibilidad"
                severity="success"
              />
            </div>
          </div>
        </div>

        <!-- Descripción -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Descripción</h2>
          <p class="text-gray-700 leading-relaxed">{{ accommodation.description }}</p>
        </div>

        <!-- Fotos -->
        <div v-if="accommodation.photos && accommodation.photos.length > 0" class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Fotos</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
              v-for="photo in accommodation.photos" 
              :key="photo.id"
              class="aspect-square bg-gray-200 rounded-lg overflow-hidden"
            >
              <img 
                :src="photo.url" 
                :alt="accommodation.name"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Amenidades -->
        <div v-if="accommodation.amenities && accommodation.amenities.length > 0" class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Servicios y Amenidades</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div 
              v-for="amenity in accommodation.amenities" 
              :key="amenity.id"
              class="flex items-center space-x-2 text-gray-700"
            >
              <i class="fa-solid fa-check text-green-500"></i>
              <span>{{ amenity.name }}</span>
            </div>
          </div>
        </div>

        <!-- Habitaciones -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Habitaciones Disponibles</h2>
          <div class="space-y-4">
            <div 
              v-for="room in accommodation.rooms" 
              :key="room.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div class="md:col-span-2">
                  <h3 class="font-semibold text-lg mb-2">{{ room.name }}</h3>
                  <p class="text-gray-600 text-sm mb-2">{{ room.description }}</p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>
                      <i class="fa-solid fa-users mr-1"></i>
                      {{ room.capacity_adults }} adultos, {{ room.capacity_children }} niños
                    </span>
                    <Badge 
                      :value="room.is_available ? 'Disponible' : 'No Disponible'" 
                      :severity="room.is_available ? 'success' : 'danger'"
                    />
                  </div>
                </div>
                
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">
                    {{ formatPrice(room.price_per_night) }}
                  </div>
                  <div class="text-sm text-gray-500">por noche</div>
                </div>
                
                <div class="text-center">
                  <Button
                    @click="bookRoom(room)"
                    :disabled="!room.is_available"
                    icon="fa-solid fa-calendar-check"
                    label="Reservar"
                    severity="success"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Información de Contacto -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Información de Contacto</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-envelope text-gray-500"></i>
              <span>{{ accommodation.contact_email }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-phone text-gray-500"></i>
              <span>{{ accommodation.contact_phone }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fa-solid fa-map-marker-alt text-gray-500"></i>
              <span>{{ accommodation.address_line_1 }}, {{ accommodation.city }}, {{ accommodation.state }}</span>
            </div>
          </div>
        </div>

        <!-- Reseñas -->
        <div v-if="accommodation.reviews && accommodation.reviews.length > 0" class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Reseñas de Huéspedes</h2>
          <div class="space-y-4">
            <div 
              v-for="review in accommodation.reviews" 
              :key="review.id"
              class="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h4 class="font-medium">{{ review.user.name }}</h4>
                  <Rating 
                    :model-value="review.rating" 
                    readonly 
                    :cancel="false"
                    class="text-sm"
                  />
                </div>
                <span class="text-sm text-gray-500">{{ formatDate(review.created_at) }}</span>
              </div>
              <p class="text-gray-700">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>

  <!-- Modal de Búsqueda -->
  <Modal v-model:visible="showSearchModal">
    <template #title>
      <span class="text-xl font-bold">Buscar Disponibilidad</span>
    </template>
    <template #icon>
      <i class="fa-solid fa-search" />
    </template>
    
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
          <VueDatePicker
            v-model="searchForm.check_in_date"
            :min-date="new Date()"
            :teleport="true"
            auto-apply
            :enable-time-picker="false"
            timezone="America/Bogota"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
          <VueDatePicker
            v-model="searchForm.check_out_date"
            :min-date="searchForm.check_in_date"
            :teleport="true"
            auto-apply
            :enable-time-picker="false"
            timezone="America/Bogota"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <Input
          label="Adultos"
          v-model="searchForm.guests_adults"
          type="number"
          min="1"
        />
        <Input
          label="Niños"
          v-model="searchForm.guests_children"
          type="number"
          min="0"
        />
      </div>
    </div>

    <template #footer>
      <Button
        @click="performSearch"
        label="Buscar"
        icon="fa-solid fa-search"
        severity="success"
      />
      <Button
        @click="showSearchModal = false"
        label="Cancelar"
        severity="secondary"
        outlined
      />
    </template>
  </Modal>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { router, usePage } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import Rating from "primevue/rating";
import Badge from "primevue/badge";
import Button from "primevue/button";
import Modal from "@/Components/Customs/Modal.vue";
import Input from "@/Components/Customs/Input.vue";
import VueDatePicker from '@vuepic/vue-datepicker';

const props = defineProps({
  accommodation: Object,
});

const showSearchModal = ref(false);
const searchForm = ref({
  check_in_date: null,
  check_out_date: null,
  guests_adults: 2,
  guests_children: 0,
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

const getStatusSeverity = (status) => {
  switch (status) {
    case 'publicado': return 'success';
    case 'borrador': return 'warning';
    case 'inactivo': return 'danger';
    default: return 'info';
  }
};

const canEdit = computed(() => {
  const user = usePage().props.auth.user;
  return user && (
    user.id === props.accommodation.user_id || 
    user.rol === 'admin' || 
    user.rol === 'superadmin'
  );
});

const editAccommodation = () => {
  router.visit(route('accommodations.edit', props.accommodation.id));
};

const searchRooms = () => {
  showSearchModal.value = true;
};

const performSearch = () => {
  if (!searchForm.value.check_in_date || !searchForm.value.check_out_date) {
    alert('Por favor selecciona las fechas de entrada y salida');
    return;
  }

  router.visit(route('booking-accommodations.search'), {
    method: 'get',
    data: {
      accommodation_id: props.accommodation.id,
      check_in_date: searchForm.value.check_in_date,
      check_out_date: searchForm.value.check_out_date,
      guests_adults: searchForm.value.guests_adults,
      guests_children: searchForm.value.guests_children,
    }
  });
};

const bookRoom = (room) => {
  if (!searchForm.value.check_in_date || !searchForm.value.check_out_date) {
    searchRooms();
    return;
  }

  router.visit(route('booking-accommodations.create'), {
    method: 'get',
    data: {
      room_id: room.id,
      check_in: searchForm.value.check_in_date,
      check_out: searchForm.value.check_out_date,
      adults: searchForm.value.guests_adults,
      children: searchForm.value.guests_children,
    }
  });
};
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="relative w-full max-w-4xl" ref="searchContainer">
      
      <!-- Service Types Section - Always Visible -->
      <div class="mb-4">
        <div class="flex items-center justify-center space-x-2 service-types-container">
          <div 
            v-for="(serviceType, index) in servicesType" 
            :key="serviceType.value"
            @click="type = serviceType"
            :class="[
              'service-type-tab flex flex-col items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden min-w-[80px]',
              type.value === serviceType.value 
                ? 'bg-gray-900 text-white shadow-md border-2 border-gray-900' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
            ]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Icon -->
            <div :class="[
              'w-6 h-6 flex items-center justify-center mb-1 transition-all duration-200 relative z-10',
              type.value === serviceType.value 
                ? 'text-white' 
                : 'text-gray-600 group-hover:text-gray-800'
            ]">
              <div v-html="serviceType.icon" class="w-4 h-4"></div>
            </div>
            
            <!-- Label -->
            <span :class="[
              'text-xs font-medium text-center transition-all duration-200 relative z-10 leading-tight',
              type.value === serviceType.value 
                ? 'text-white' 
                : 'text-gray-700 group-hover:text-gray-900'
            ]">
              {{ serviceType.label }}
            </span>
            
            <!-- Active indicator line -->
            <div v-if="type.value === serviceType.value" 
                 class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white rounded-full">
            </div>
          </div>
        </div>
      </div>

      <!-- Airbnb Style Search Bar -->
      <div class="relative">
        <div :class="[
          'flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden transition-all duration-300',
          isPanelOpen ? 'shadow-xl border-gray-300' : 'hover:shadow-md'
        ]">
          
          <!-- Dónde -->
          <div class="flex-1 relative search-section">
            <div @click="setActiveTab('donde')" 
                 :class="[
                   'px-6 py-4 cursor-pointer transition-all duration-200 rounded-l-full modern-focus',
                   activeTab === 'donde' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50'
                 ]">
              <div class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Dónde</div>
              <div class="text-sm text-gray-500 mt-1">{{ selectedLocation || 'Explora destinos' }}</div>
            </div>
          </div>

          <!-- Divider -->
          <div class="w-px h-8 bg-gray-200 divider-animated"></div>

          <!-- Check-in -->
          <div class="flex-1 relative search-section">
            <div @click="setActiveTab('checkin')" 
                 :class="[
                   'px-6 py-4 cursor-pointer transition-all duration-200 modern-focus',
                   activeTab === 'checkin' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50'
                 ]">
              <div class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Check-in</div>
              <div class="text-sm text-gray-500 mt-1">{{ selectedCheckin ? formatDate(selectedCheckin) : 'Agrega fecha' }}</div>
            </div>
          </div>

          <!-- Divider -->
          <div class="w-px h-8 bg-gray-200 divider-animated"></div>

          <!-- Check-out -->
          <div class="flex-1 relative search-section">
            <div @click="setActiveTab('checkout')" 
                 :class="[
                   'px-6 py-4 cursor-pointer transition-all duration-200 modern-focus',
                   activeTab === 'checkout' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50'
                 ]">
              <div class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Check-out</div>
              <div class="text-sm text-gray-500 mt-1">{{ selectedCheckout ? formatDate(selectedCheckout) : 'Agrega fecha' }}</div>
            </div>
          </div>

          <!-- Divider -->
          <div class="w-px h-8 bg-gray-200 divider-animated"></div>

          <!-- Quién -->
          <div class="flex-1 relative search-section">
            <div @click="setActiveTab('quien')" 
                 :class="[
                   'px-6 py-4 cursor-pointer transition-all duration-200 modern-focus',
                   activeTab === 'quien' ? 'bg-white shadow-md section-active' : 'hover:bg-gray-50'
                 ]">
              <div class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Quién</div>
              <div class="text-sm text-gray-500 mt-1">{{ guestSummary || '¿Cuántos?' }}</div>
            </div>
          </div>

          <!-- Search Button -->
          <div class="px-2 py-2">
            <button @click="performSearch"
                    class="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-full transition-all duration-200 shadow-lg search-button btn-ripple scale-hover">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Airbnb Style Dropdown Panels -->
      <Transition name="panel">
        <div v-if="isPanelOpen"
          class="absolute z-50 mt-4 w-full origin-top rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden dropdown-shadow">
          
          <!-- Dónde Panel -->
          <div v-if="activeTab === 'donde'" class="p-8 panel-content">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">¿A dónde quieres ir?</h3>
            
            <!-- Search input -->
            <div class="relative mb-6">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                v-model="locationQuery" 
                type="text" 
                placeholder="Buscar destinos"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 modern-focus"
                @input="searchLocations"
              >
            </div>

            <!-- Popular Destinations -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Destinos populares</h4>
              <div class="grid grid-cols-2 gap-3">
                <div 
                  v-for="(destination, index) in popularDestinations" 
                  :key="destination.name"
                  @click="selectLocation(destination.name)"
                  class="destination-card flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 scale-hover"
                >
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <span class="text-2xl">{{ destination.emoji }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ destination.name }}</p>
                    <p class="text-sm text-gray-500">{{ destination.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Check-in Panel -->
          <div v-if="activeTab === 'checkin'" class="p-8 panel-content">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">¿Cuándo es tu viaje?</h3>
            <div class="grid grid-cols-2 gap-8">
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-3">Check-in</h4>
                <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-all duration-200 scale-hover modern-focus"
                     @click="openDatePicker('checkin')">
                  <div class="text-center">
                    <div v-if="selectedCheckin" class="text-gray-900 font-medium">{{ formatDate(selectedCheckin) }}</div>
                    <div v-else class="text-gray-500">Selecciona fecha de entrada</div>
                  </div>
                </div>
                
                <!-- Quick date options -->
                <div class="mt-3 flex flex-wrap gap-2">
                  <button 
                    v-for="option in quickDateOptions" z
                    :key="option.label"
                    @click="setQuickDate('checkin', option.days)"
                    class="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-200 btn-ripple"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-3">Check-out</h4>
                <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-all duration-200 scale-hover modern-focus"
                     @click="openDatePicker('checkout')">
                  <div class="text-center">
                    <div v-if="selectedCheckout" class="text-gray-900 font-medium">{{ formatDate(selectedCheckout) }}</div>
                    <div v-else class="text-gray-500">Selecciona fecha de salida</div>
                  </div>
                </div>
                
                <!-- Duration suggestions -->
                <div class="mt-3 flex flex-wrap gap-2">
                  <button 
                    v-for="duration in durationOptions" 
                    :key="duration.label"
                    @click="setDuration(duration.days)"
                    class="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-200 btn-ripple disabled:opacity-50"
                    :disabled="!selectedCheckin"
                  >
                    {{ duration.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Check-out Panel -->
          <div v-if="activeTab === 'checkout'" class="p-8 panel-content">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">¿Cuándo termina tu viaje?</h3>
            <div class="border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gray-300 transition-all duration-200 text-center scale-hover modern-focus"
                 @click="openDatePicker('checkout')">
              <div v-if="selectedCheckout" class="text-gray-900 font-medium text-lg">{{ formatDate(selectedCheckout) }}</div>
              <div v-else class="text-gray-500">Selecciona fecha de salida</div>
            </div>
            
            <!-- Duration from check-in -->
            <div v-if="selectedCheckin" class="mt-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Duración sugerida</h4>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="duration in durationOptions" 
                  :key="duration.label"
                  @click="setDuration(duration.days)"
                  class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 btn-ripple scale-hover"
                >
                  {{ duration.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Quién Panel -->
          <div v-if="activeTab === 'quien'" class="p-8 panel-content">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">¿Quién viene?</h3>
            
            <div class="space-y-6">
              <!-- Adultos -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900">Adultos</h4>
                  <p class="text-sm text-gray-500">13 años o más</p>
                </div>
                <div class="flex items-center space-x-3">
                  <button 
                    @click="decrementGuests('adults')"
                    :disabled="guests.adults <= 0"
                    class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 guest-counter btn-ripple hover:border-gray-400 transition-all duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <span class="w-8 text-center font-medium">{{ guests.adults }}</span>
                  <button 
                    @click="incrementGuests('adults')"
                    class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center guest-counter btn-ripple hover:border-gray-400 transition-all duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Niños -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900">Niños</h4>
                  <p class="text-sm text-gray-500">De 2 a 12 años</p>
                </div>
                <div class="flex items-center space-x-3">
                  <button 
                    @click="decrementGuests('children')"
                    :disabled="guests.children <= 0"
                    class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 guest-counter btn-ripple hover:border-gray-400 transition-all duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <span class="w-8 text-center font-medium">{{ guests.children }}</span>
                  <button 
                    @click="incrementGuests('children')"
                    class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center guest-counter btn-ripple hover:border-gray-400 transition-all duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Bebés -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900">Bebés</h4>
                  <p class="text-sm text-gray-500">Menos de 2 años</p>
                </div>
                <div class="flex items-center space-x-3">
                  <button 
                    @click="decrementGuests('infants')"
                    :disabled="guests.infants <= 0"
                    class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 guest-counter btn-ripple hover:border-gray-400 transition-all duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <span class="w-8 text-center font-medium">{{ guests.infants }}</span>
                  <button 
                    @click="incrementGuests('infants')"
                    class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center guest-counter btn-ripple hover:border-gray-400 transition-all duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- AI Section (visible when there's a search) -->
          <div v-if="hasSearchCriteria" class="border-t border-gray-200 p-6 bg-gradient-to-r from-purple-50 to-pink-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 gradient-text">✨ Búsqueda Inteligente</h4>
                  <p class="text-sm text-gray-600">Encuentra el servicio perfecto con IA</p>
                </div>
              </div>
              <button 
                @click="generateWithAi"
                class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 btn-ripple scale-hover"
              >
                Buscar con IA
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Modal para mostrar el resultado de la IA -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalVisible" class="fixed inset-0 z-[99999999] flex items-center justify-center bg-black bg-opacity-50">
          <div class="modal-container w-full max-w-2xl rounded-xl bg-white shadow-2xl m-4">
            <div class="p-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-semibold text-gray-900">✨ Recomendación de Servicio</h2>
                <button @click="closeModal"
                  class="py-1 px-2 leading-none text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 text-xl">x</button>
              </div>
              <div v-if="isLoading" class="mt-4 text-center py-8">
                <div class="animate-pulse-fast text-gray-500">Buscando el mejor Servicio para ti...</div>
              </div>
              <div v-else
                class="ai-content mt-4 p-4 bg-gray-50 rounded-lg max-h-[60vh] overflow-y-auto text-gray-700 whitespace-pre-wrap"
                v-html="formattedContent"></div>
            </div>
            <div v-if="!isLoading"
              class="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-3 rounded-b-xl">

              <button @click="closeModal"
                class="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700">Buscaré yo mismo</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
  
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

// Estado del panel
const isPanelOpen = ref(false);
const activeTab = ref('donde');
const isModalVisible = ref(false);
const isLoading = ref(false);
const generatedContent = ref('');
const searchContainer = ref(null);

// Datos de búsqueda
const selectedLocation = ref('');
const selectedCheckin = ref('');
const selectedCheckout = ref('');
const locationQuery = ref('');

// Huéspedes
const guests = ref({
  adults: 2,
  children: 0,
  infants: 0
});

// Tipo de servicio
const type = ref({
  label: 'Todos',
  value: null
});

// Funciones principales
const setActiveTab = (tab) => {
  activeTab.value = tab;
  if (!isPanelOpen.value) {
    isPanelOpen.value = true;
  }
};

const openPanel = () => { 
  isPanelOpen.value = true; 
  if (!activeTab.value) activeTab.value = 'donde';
};

const closePanel = () => { 
  isPanelOpen.value = false; 
  activeTab.value = '';
};

const openModal = () => { isModalVisible.value = true; };
const closeModal = () => {
  isModalVisible.value = false;
  generatedContent.value = '';
};

// Funciones de selección
const selectLocation = (location) => {
  selectedLocation.value = location;
  setActiveTab('checkin');
};

const openDatePicker = (type) => {
  // Simular apertura de datepicker - aquí puedes integrar con tu componente de fechas preferido
  const today = new Date();
  if (type === 'checkin') {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    selectedCheckin.value = tomorrow.toISOString().split('T')[0];
  } else if (type === 'checkout') {
    const nextWeek = new Date(selectedCheckin.value || today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    selectedCheckout.value = nextWeek.toISOString().split('T')[0];
  }
};

const setQuickDate = (type, days) => {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + days);
  
  if (type === 'checkin') {
    selectedCheckin.value = targetDate.toISOString().split('T')[0];
  }
};

const setDuration = (days) => {
  if (selectedCheckin.value) {
    const checkinDate = new Date(selectedCheckin.value);
    const checkoutDate = new Date(checkinDate);
    checkoutDate.setDate(checkinDate.getDate() + days);
    selectedCheckout.value = checkoutDate.toISOString().split('T')[0];
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const incrementGuests = (type) => {
  guests.value[type]++;
};

const decrementGuests = (type) => {
  if (guests.value[type] > 0) {
    guests.value[type]--;
  }
};

const searchLocations = () => {
  // Implementar búsqueda de ubicaciones
  console.log('Buscando:', locationQuery.value);
};

// Computed properties
const guestSummary = computed(() => {
  const total = guests.value.adults + guests.value.children;
  if (total === 0) return '';
  
  let summary = `${total} huésped${total > 1 ? 'es' : ''}`;
  if (guests.value.infants > 0) {
    summary += `, ${guests.value.infants} bebé${guests.value.infants > 1 ? 's' : ''}`;
  }
  return summary;
});

const hasSearchCriteria = computed(() => {
  return selectedLocation.value || selectedCheckin.value || selectedCheckout.value || 
         guests.value.adults > 0 || guests.value.children > 0 || guests.value.infants > 0;
});

const formattedContent = computed(() => {
  if (!generatedContent.value) return '';

  const rawHtml = marked.parse(generatedContent.value);
  const finalHtml = rawHtml.replace(/<a href="([^"]+)">/g, (match, slug) => {
    const linkClasses = "text-green-600 hover:text-green-800 font-semibold underline";
    return `<a href="/showservice/${slug}" target="_blank" rel="noopener noreferrer" class="${linkClasses}">`;
  });

  return finalHtml;
});

// Funciones de búsqueda
const performSearch = () => {
  if (hasSearchCriteria.value) {
    console.log('Realizando búsqueda...', {
      location: selectedLocation.value,
      checkin: selectedCheckin.value,
      checkout: selectedCheckout.value,
      guests: guests.value,
      type: type.value
    });
    closePanel();
  }
};

const generateWithAi = async () => {
  if (!hasSearchCriteria.value) return;
  
  closePanel();
  openModal();
  isLoading.value = true;
  
  try {
    // Construir prompt basado en criterios de búsqueda
    let prompt = '';
    if (selectedLocation.value) prompt += `Destino: ${selectedLocation.value}. `;
    if (selectedCheckin.value) prompt += `Check-in: ${selectedCheckin.value}. `;
    if (selectedCheckout.value) prompt += `Check-out: ${selectedCheckout.value}. `;
    if (guestSummary.value) prompt += `Huéspedes: ${guestSummary.value}. `;
    if (type.value.value) prompt += `Tipo: ${type.value.label}. `;
    
    const response = await axios.post('/get-service', { 
      prompt: prompt || 'Búsqueda general', 
      type: type.value.value 
    });
    
    const result = response.data;
    generatedContent.value = result.recommendation || result.response || "No se recibió una recomendación válida.";
  } catch (error) {
    console.error("Error al contactar el backend:", error);
    generatedContent.value = `Ocurrió un error al buscar el servicio: ${error.message}`;
  } finally {
    isLoading.value = false;
  }
};

// Event handlers
const handleClickOutside = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    closePanel();
  }
};

// Data
const servicesType = [
  {
    label: 'Todos',
    value: null,
    description: 'Ver todo disponible',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
           </svg>`
  },
  {
    label: 'Tours',
    value: 'TOUR',
    description: 'Experiencias guiadas',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
           </svg>`
  },
  {
    label: 'Embarcaciones',
    value: 'EMBARCACION',
    description: 'Yates y lanchas',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z"></path>
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7v10"></path>
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11l8 0"></path>
           </svg>`
  },
  {
    label: 'Hospedaje',
    value: 'HOSPEDAJE',
    description: 'Hoteles y cabañas',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4a4 4 0 014-4h10a4 4 0 014 4v4M7 7a4 4 0 118 0v1a3 3 0 01-3 3h-2a3 3 0 01-3-3V7z"></path>
           </svg>`
  },
  {
    label: 'Transporte',
    value: 'TRANSPORTE',
    description: 'Traslados y vehículos',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7zM8 7h8M5 21h14"></path>
           </svg>`
  },
  {
    label: 'Aventura',
    value: 'AVENTURA',
    description: 'Deportes extremos',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
           </svg>`
  }
];

const popularDestinations = [
  {
    name: 'Cartagena',
    description: 'Ciudad amurallada',
    emoji: '🏰'
  },
  {
    name: 'San Andrés',
    description: 'Isla caribeña',
    emoji: '🏝️'
  },
  {
    name: 'Medellín',
    description: 'Ciudad de la eterna primavera',
    emoji: '🌸'
  },
  {
    name: 'Bogotá',
    description: 'Capital cultural',
    emoji: '🏙️'
  },
  {
    name: 'Eje Cafetero',
    description: 'Paisaje cafetero',
    emoji: '☕'
  },
  {
    name: 'Amazonas',
    description: 'Selva tropical',
    emoji: '🌳'
  }
];

const quickDateOptions = [
  { label: 'Hoy', days: 0 },
  { label: 'Mañana', days: 1 },
  { label: 'Fin de semana', days: 5 },
  { label: 'Próxima semana', days: 7 }
];

const durationOptions = [
  { label: '1 noche', days: 1 },
  { label: '2 noches', days: 2 },
  { label: '3 noches', days: 3 },
  { label: '1 semana', days: 7 },
  { label: '2 semanas', days: 14 }
];

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Airbnb-inspired animations inline */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-ripple:active::before {
  width: 300px;
  height: 300px;
}

.search-section {
  position: relative;
  overflow: hidden;
}

.search-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.search-section:hover::before {
  left: 100%;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
}

.search-button:hover {
  animation: float 2s ease-in-out infinite;
}

.destination-card {
  opacity: 0;
  transform: translateY(10px);
  animation: slideInUp 0.3s ease-out forwards;
}

.destination-card:nth-child(1) { animation-delay: 0.1s; }
.destination-card:nth-child(2) { animation-delay: 0.2s; }
.destination-card:nth-child(3) { animation-delay: 0.3s; }
.destination-card:nth-child(4) { animation-delay: 0.4s; }
.destination-card:nth-child(5) { animation-delay: 0.5s; }
.destination-card:nth-child(6) { animation-delay: 0.6s; }

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-active {
  animation: pulseGlow 1.5s ease-in-out infinite alternate;
}

@keyframes pulseGlow {
  from {
    box-shadow: 0 0 20px -10px rgba(239, 68, 68, 0.5);
  }
  to {
    box-shadow: 0 0 20px -5px rgba(239, 68, 68, 0.8);
  }
}

.panel-content {
  transform: translateY(10px);
  opacity: 0;
  animation: fadeInUp 0.3s ease-out 0.1s forwards;
}

@keyframes fadeInUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.guest-counter {
  transition: all 0.2s ease;
}

.guest-counter:hover {
  transform: scale(1.05);
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modern-focus:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
}

.scale-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.scale-hover:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.dropdown-shadow {
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

.divider-animated {
  position: relative;
  background: linear-gradient(to bottom, transparent 0%, #e5e7eb 45%, #e5e7eb 55%, transparent 100%);
  transition: background 0.3s ease;
}

.divider-animated:hover {
  background: linear-gradient(to bottom, transparent 0%, #ef4444 45%, #ef4444 55%, transparent 100%);
}

/* Airbnb-style transitions */
.panel-enter-active,
.panel-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.panel-enter-to,
.panel-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: scale(0.9);
}

.modal-container {
  transition: all 0.25s ease-out;
}

/* Custom animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse-fast {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* AI content styling */
.ai-content a {
  color: #059669;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid #a7f3d0;
  transition: all 0.2s;
}

.ai-content a:hover {
  color: #047857;
  border-bottom-color: #047857;
}

/* Hover effects for search sections */
.search-section {
  transition: all 0.2s ease;
}

.search-section:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Custom scrollbar for dropdown */
.max-h-96 {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.max-h-96::-webkit-scrollbar {
  width: 6px;
}

.max-h-96::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.max-h-96::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Focus styles */
.focus-within\:ring-2:focus-within {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
}

/* Search button animation */
.search-button {
  transition: all 0.2s ease;
}

.search-button:hover {
  transform: scale(1.05);
}

/* Card hover effects */
.destination-card {
  transition: all 0.2s ease;
}

.destination-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Service type card animations */
.service-type-card {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(10px);
  animation: slideInUp 0.3s ease-out forwards;
}

.service-type-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.1), transparent);
  transition: left 0.6s;
}

.service-type-card:hover::before {
  left: 100%;
}

.service-type-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(244, 63, 94, 0.15);
}

.service-type-card:active {
  transform: translateY(0);
}

/* Icon animation within service cards */
.service-type-card svg {
  transition: transform 0.2s ease;
}

.service-type-card:hover svg {
  transform: scale(1.1);
}

/* Service Types Container - Always visible at top */
.service-types-container {
  padding: 0 16px;
  margin-bottom: 4px;
}

.service-type-tab {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  animation: slideInUp 0.3s ease-out forwards;
}

.service-type-tab:nth-child(1) { animation-delay: 0.05s; }
.service-type-tab:nth-child(2) { animation-delay: 0.1s; }
.service-type-tab:nth-child(3) { animation-delay: 0.15s; }
.service-type-tab:nth-child(4) { animation-delay: 0.2s; }
.service-type-tab:nth-child(5) { animation-delay: 0.25s; }
.service-type-tab:nth-child(6) { animation-delay: 0.3s; }

.service-type-tab:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-type-tab:active {
  transform: translateY(0);
}

/* Icon animation within service tabs */
.service-type-tab svg {
  transition: all 0.2s ease;
}

.service-type-tab:hover svg {
  transform: scale(1.1);
}

/* Responsive design for service types */
@media (max-width: 768px) {
  .service-types-container {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    padding: 0 8px;
  }
  
  .service-type-tab {
    min-width: calc(33.333% - 8px);
    max-width: calc(33.333% - 8px);
  }
}

@media (max-width: 640px) {
  .service-types-container {
    gap: 6px;
  }
  
  .service-type-tab {
    min-width: calc(50% - 6px);
    max-width: calc(50% - 6px);
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .service-type-tab {
    min-width: calc(33.333% - 6px);
    max-width: calc(33.333% - 6px);
    padding: 8px 6px;
  }
}


/* Service type stagger animation */
.service-type-card:nth-child(1) { animation-delay: 0.1s; }
.service-type-card:nth-child(2) { animation-delay: 0.2s; }
.service-type-card:nth-child(3) { animation-delay: 0.3s; }
.service-type-card:nth-child(4) { animation-delay: 0.4s; }
.service-type-card:nth-child(5) { animation-delay: 0.5s; }
.service-type-card:nth-child(6) { animation-delay: 0.6s; }
</style>
<template>
    <!-- Desktop: Barra compacta tipo Airbnb -->
    <div class="hidden lg:flex items-center bg-white rounded-full shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <!-- Dónde -->
        <button @click="setActiveTab('donde')" :class="[
            'flex-1 px-7 py-4 text-left transition-all duration-200 relative group',
            activeTab === 'donde' ? 'bg-gray-50' : 'hover:bg-gray-50'
        ]">
            <div class="text-xs font-bold text-gray-700 mb-1">Destino</div>
            <div class="text-sm text-gray-900 truncate font-medium">{{ selectedLocation || 'A dónde vas?' }}</div>
            <div v-if="activeTab === 'donde'" class="absolute inset-0 bg-white rounded-full shadow-lg -z-10"></div>
        </button>

        <div class="w-px h-8 bg-gray-200"></div>

        <!-- Origen/Destino (solo Transporte) -->
        <template v-if="type === 'Transporte'">
            <button @click="setActiveTab('origin')" :class="[
                'flex-1 px-7 py-4 text-left transition-all duration-200 relative group min-w-0',
                activeTab === 'origin' ? 'bg-gray-50' : 'hover:bg-gray-50'
            ]">
                <div class="text-xs font-bold text-gray-700 mb-1">Ruta</div>
                <div class="text-sm text-gray-900 font-medium overflow-hidden">
                    <div class="flex items-center gap-1 min-w-0">
                        <span class="truncate max-w-[120px]" :title="searchStore.origen.value">{{ searchStore.origen.value || 'Origen' }}</span>
                        <span class="flex-shrink-0">→</span>
                        <span class="truncate max-w-[120px]" :title="searchStore.destino.value">{{ searchStore.destino.value || 'Destino' }}</span>
                    </div>
                </div>
                <div v-if="activeTab === 'origin'" class="absolute inset-0 bg-white rounded-full shadow-lg -z-10"></div>
            </button>
            <div class="w-px h-8 bg-gray-200"></div>
        </template>

        <!-- Fechas -->
        <button @click="setActiveTab('checkin')" :class="[
            'flex-1 px-7 py-4 text-left transition-all duration-200 relative group',
            activeTab === 'checkin' ? 'bg-gray-50' : 'hover:bg-gray-50'
        ]">
            <div class="text-xs font-bold text-gray-700 mb-1">
                {{ type == "Hospedaje" ? "Fechas" : "Cuándo" }}
            </div>
            <div class="text-sm text-gray-900 truncate font-medium">{{ dateRange || 'Agrega fechas' }}</div>
            <div v-if="activeTab === 'checkin'" class="absolute inset-0 bg-white rounded-full shadow-lg -z-10"></div>
        </button>

        <div class="w-px h-8 bg-gray-200"></div>

        <!-- Huéspedes -->
        <button @click="setActiveTab('quien')" :class="[
            'flex-1 px-7 py-4 text-left transition-all duration-200 relative group',
            activeTab === 'quien' ? 'bg-gray-50' : 'hover:bg-gray-50'
        ]">
            <div class="text-xs font-bold text-gray-700 mb-1">
                {{ type == "Hospedaje" ? 'Quién' : 'Pasajeros' }}
            </div>
            <div class="text-sm text-gray-900 truncate font-medium">{{ guestSummary || 'Agrega huéspedes' }}</div>
            <div v-if="activeTab === 'quien'" class="absolute inset-0 bg-white rounded-full shadow-lg -z-10"></div>
        </button>

        <!-- Botón Buscar -->
        <div class="pr-2 pl-4">
            <Link v-if="type == 'Transporte'" :href="route('services.home', { type: 'TRANSFER', origen: searchStore.origen.value, destino: searchStore.destino.value, date: searchStore.checkin.value })">
                <button class="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 font-semibold">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Buscar</span>
                </button>
            </Link>
            <Link v-else :href="route('services.home')">
                <button class="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 font-semibold">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Buscar</span>
                </button>
            </Link>
        </div>
    </div>

    <!-- Tablet: Versión compacta -->
    <div class="hidden md:flex lg:hidden items-center bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        <button @click="setActiveTab('donde')" :class="[
            'flex-1 px-5 py-3 text-left transition-all',
            activeTab === 'donde' ? 'bg-gray-50' : 'hover:bg-gray-50'
        ]">
            <div class="text-xs font-bold text-gray-700">Destino</div>
            <div class="text-sm text-gray-900 truncate">{{ selectedLocation || 'A dónde?' }}</div>
        </button>
        
        <div class="w-px h-8 bg-gray-200"></div>
        
        <button @click="setActiveTab('checkin')" :class="[
            'flex-1 px-5 py-3 text-left transition-all',
            activeTab === 'checkin' ? 'bg-gray-50' : 'hover:bg-gray-50'
        ]">
            <div class="text-xs font-bold text-gray-700">Cuándo</div>
            <div class="text-sm text-gray-900 truncate">{{ dateRange || 'Fechas' }}</div>
        </button>
        
        <div class="w-px h-8 bg-gray-200"></div>
        
        <button @click="setActiveTab('quien')" :class="[
            'flex-1 px-5 py-3 text-left transition-all',
            activeTab === 'quien' ? 'bg-gray-50' : 'hover:bg-gray-50'
        ]">
            <div class="text-xs font-bold text-gray-700">Quién</div>
            <div class="text-sm text-gray-900 truncate">{{ guestSummary || 'Huéspedes' }}</div>
        </button>
        
        <div class="pr-2 pl-2">
            <Link v-if="type == 'Transporte'" :href="route('services.home', { type: 'TRANSFER', origen: searchStore.origen.value, destino: searchStore.destino.value, date: searchStore.checkin.value })">
                <button class="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-4 rounded-full hover:shadow-lg transition-all">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </Link>
            <Link v-else :href="route('services.home')">
                <button class="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-4 rounded-full hover:shadow-lg transition-all">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </Link>
        </div>
    </div>

    <!-- Mobile: Barra compacta que abre modal -->
    <div class="md:hidden">
        <!-- Barra de búsqueda compacta -->
        <button @click="openMobileModal" class="w-full bg-white rounded-full shadow-lg border border-gray-200 p-4 flex items-center gap-3 hover:shadow-xl transition-all duration-300">
            <div class="flex-shrink-0 bg-gradient-to-r from-rose-500 to-pink-600 p-2.5 rounded-full">
                <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <div class="flex-1 text-left">
                <div class="text-sm font-semibold text-gray-900 truncate">
                    {{ selectedLocation || 'A dónde vas?' }}
                </div>
                <div class="text-xs text-gray-500 truncate">
                    {{ dateRange || 'Cualquier fecha' }} • {{ guestSummary || 'Agrega huéspedes' }}
                </div>
            </div>
            <div class="flex-shrink-0">
                <i class="fa-solid fa-sliders text-gray-400"></i>
            </div>
        </button>

        <!-- Modal de búsqueda completo -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="showMobileModal" class="fixed inset-0 z-[9999] flex items-end md:hidden">
                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeMobileModal"></div>
                    
                    <!-- Contenido del modal -->
                    <div class="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
                        <!-- Header del modal -->
                        <div class="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
                            <h3 class="text-lg font-bold text-gray-900">¿A dónde vas?</h3>
                            <button @click="closeMobileModal" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <i class="fa-solid fa-xmark text-xl text-gray-600"></i>
                            </button>
                        </div>

                        <!-- Tabs de tipos de servicio en el modal -->
                        <div class="sticky top-[57px] bg-white border-b border-gray-200 px-4 py-3 z-10">
                            <ServiceTypeTabs :servicesType="servicesType" v-model:modelValue="searchStore.type" />
                        </div>

                        <!-- Contenido scrolleable -->
                        <div class="pb-24">
                            <!-- Vista principal del modal -->
                            <div v-if="!activeModalTab" class="p-4 space-y-4">
                                <!-- Destino -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <i class="fa-solid fa-location-dot text-rose-500"></i>
                                        Destino
                                    </label>
                                    <button @click="handleModalTabClick('donde')" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-left hover:border-rose-300 transition-colors">
                                        <span class="text-gray-900 font-medium">{{ selectedLocation || 'Selecciona un destino' }}</span>
                                    </button>
                                </div>

                                <!-- Ruta (solo Transporte) -->
                                <div v-if="type === 'Transporte'" class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <i class="fa-solid fa-route text-rose-500"></i>
                                        Ruta
                                    </label>
                                    <button @click="handleModalTabClick('origin')" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-left hover:border-rose-300 transition-colors">
                                        <div class="flex items-center gap-2 text-gray-900 font-medium">
                                            <span class="truncate">{{ searchStore.origen.value || 'Origen' }}</span>
                                            <span>→</span>
                                            <span class="truncate">{{ searchStore.destino.value || 'Destino' }}</span>
                                        </div>
                                    </button>
                                </div>

                                <!-- Fechas -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <i class="fa-solid fa-calendar-days text-rose-500"></i>
                                        {{ type == "Hospedaje" ? "Fechas" : "Cuándo" }}
                                    </label>
                                    <button @click="handleModalTabClick('checkin')" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-left hover:border-rose-300 transition-colors">
                                        <span class="text-gray-900 font-medium">{{ dateRange || 'Agrega fechas' }}</span>
                                    </button>
                                </div>

                                <!-- Pasajeros -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <i class="fa-solid fa-user-group text-rose-500"></i>
                                        {{ type == "Hospedaje" ? 'Quién' : 'Pasajeros' }}
                                    </label>
                                    <button @click="handleModalTabClick('quien')" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-left hover:border-rose-300 transition-colors">
                                        <span class="text-gray-900 font-medium">{{ guestSummary || 'Agrega huéspedes' }}</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Panel Dónde -->
                            <div v-else-if="activeModalTab === 'donde'" class="p-4">
                                <button @click="backToMainModal" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="font-medium">Volver</span>
                                </button>
                                <h3 class="text-xl font-bold text-gray-900 mb-4">¿A dónde quieres ir?</h3>
                                <div class="relative mb-4">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input v-model="locationQuery" type="text" placeholder="Buscar destinos..." class="w-full pl-10 pr-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Destinos populares</h4>
                                    <div class="space-y-2">
                                        <div v-for="destination in popularDestinations" :key="destination.name" @click="selectLocation(destination.name)" class="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:border-rose-500 hover:shadow-md cursor-pointer transition-all">
                                            <div class="w-10 h-10 bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span class="text-xl">{{ destination.emoji }}</span>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="font-semibold text-gray-900 truncate">{{ destination.name }}</p>
                                                <p class="text-sm text-gray-500 truncate">{{ destination.description }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Panel Ruta (Origen y Destino) -->
                            <div v-else-if="activeModalTab === 'origin'" class="p-4">
                                <button @click="backToMainModal" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="font-medium">Volver</span>
                                </button>
                                <h3 class="text-xl font-bold text-gray-900 mb-4">¿Dónde te recogemos y te llevamos?</h3>
                                <div class="space-y-4">
                                    <!-- Origen -->
                                    <div>
                                        <div class="flex items-center gap-2 mb-2">
                                            <i class="fa-solid fa-circle-dot text-rose-500"></i>
                                            <p class="font-semibold text-gray-900">Punto de origen</p>
                                        </div>
                                        <div class="grid grid-cols-2 gap-2">
                                            <button v-for="origen in props.origenes" :key="origen" @click="selectOrigen(origen)" :class="['px-3 py-2.5 text-sm font-medium rounded-xl border-2 transition-all', searchStore.origen.value === origen ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-rose-500']">
                                                {{ origen }}
                                            </button>
                                        </div>
                                    </div>
                                    <!-- Destino -->
                                    <div v-if="searchStore.origen.value">
                                        <div class="flex items-center gap-2 mb-2">
                                            <i class="fa-solid fa-location-dot text-blue-500"></i>
                                            <p class="font-semibold text-gray-900">Punto de destino</p>
                                        </div>
                                        <div class="grid grid-cols-2 gap-2">
                                            <button v-for="destino in destinosFinales" :key="destino" @click="selectDestino(destino)" :class="['px-3 py-2.5 text-sm font-medium rounded-xl border-2 transition-all', searchStore.destino.value === destino ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-500']">
                                                {{ destino }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Panel Fechas -->
                            <div v-else-if="activeModalTab === 'checkin'" class="p-4">
                                <button @click="backToMainModal" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="font-medium">Volver</span>
                                </button>
                                <h3 class="text-xl font-bold text-gray-900 mb-4">{{ mensajePrincipal }}</h3>
                                <div class="bg-gray-50 rounded-xl p-4">
                                    <CalendarSelector class="w-full" :value="dates" :min-date="new Date().toISOString().split('T')[0]" :placeholder="'Selecciona rango de fechas'" @update:value="val => valueDateChange(val)" @update:checkin="val => searchStore.checkin.value = val" @update:checkout="val => searchStore.checkout.value = val" :range="type == 'Hospedaje' ? true : false" />
                                </div>
                            </div>

                            <!-- Panel Pasajeros -->
                            <div v-else-if="activeModalTab === 'quien'" class="p-4">
                                <button @click="backToMainModal" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="font-medium">Volver</span>
                                </button>
                                <h3 class="text-xl font-bold text-gray-900 mb-4">¿Quién viene?</h3>
                                <div class="bg-gray-50 rounded-xl p-4">
                                    <GuestSelector :guests="searchStore.guests.value" @increment="incrementGuests" @decrement="decrementGuests" />
                                </div>
                            </div>
                        </div>

                        <!-- Footer sticky con botón de búsqueda -->
                        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                            <Link v-if="type == 'Transporte'" :href="route('services.home', { type: 'TRANSFER', origen: searchStore.origen.value, destino: searchStore.destino.value, date: searchStore.checkin.value })">
                                <button class="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span>Buscar</span>
                                </button>
                            </Link>
                            <Link v-else :href="route('services.home')">
                                <button class="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span>Buscar</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
<script setup>
import { formatDate } from '@/composable/useCommonUtilities';
import searchStore from '@/store/searchStore';
import { Link } from '@inertiajs/vue3';
import { inject, ref, computed } from 'vue';
import ServiceTypeTabs from './ServiceTypeTabs.vue';
import GuestSelector from './GuestSelector.vue';
import CalendarSelector from './CalendarSelector.vue';

// Estado del modal móvil
const showMobileModal = ref(false);
const activeModalTab = ref('');

const openMobileModal = () => {
    showMobileModal.value = true;
    document.body.style.overflow = 'hidden';
};

const closeMobileModal = () => {
    showMobileModal.value = false;
    activeModalTab.value = '';
    document.body.style.overflow = '';
};

const handleModalTabClick = (tab) => {
    // Activar el tab en el modal (no cerrar)
    activeModalTab.value = tab;
};

const backToMainModal = () => {
    activeModalTab.value = '';
};

// Datos para los paneles
const locationQuery = ref('');
const dates = ref([]);
const destinosFinales = ref([]);

// Destinos populares
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
];

const selectLocation = (location) => {
    searchStore.location.value = location;
    backToMainModal();
};

const selectOrigen = async (origen) => {
    searchStore.origen.value = origen;
    searchStore.destino.value = null;
    // Cargar destinos
    const response = await axios.get(`/getAllDestinations?origen=${origen}`);
    destinosFinales.value = response.data.filter(destino => destino !== origen);
};

const selectDestino = (destino) => {
    searchStore.destino.value = destino;
    backToMainModal();
};

const valueDateChange = (val) => {
    if (Array.isArray(val) && val.length === 2) {
        searchStore.checkin.value = val[0];
        searchStore.checkout.value = val[1];
    } else {
        searchStore.checkin.value = val;
        searchStore.checkout.value = val;
    }
    backToMainModal();
};

const incrementGuests = (type) => {
    searchStore.guests.value[type]++;
};

const decrementGuests = (type) => {
    if (searchStore.guests.value[type] > 0) {
        searchStore.guests.value[type]--;
    }
};

const mensajePrincipal = computed(() => {
    const checkin = searchStore.checkin?.value;
    const checkout = searchStore.checkout?.value;
    if (props.type === 'Hospedaje') {
        if (checkin) {
            const fecha1 = new Date(checkin).toLocaleDateString();
            const fecha2 = checkout ? new Date(checkout).toLocaleDateString() : null;
            if (fecha2) return `¡Bien! Llegarías el ${fecha1}, hasta el día ${fecha2}`;
            return `¡Bien! Llegarías el ${fecha1}, hasta que dia?`
        } else {
            return '¿Cuándo llegarías?';
        }
    }
    if (props.type === 'Embarcaciones') return '¿Qué día quieres la embarcación?';
    if (props.type === 'Tours') return '¿Qué día quieres el tour?';
    return '¿Qué día necesitas tu transporte?';
});

const props = defineProps([
    'isPanelOpen',
    'activeTab',
    'selectedLocation',
    'guestSummary',
    'setActiveTab',
    'selectedOrigin',
    'formatDate',
    'type',
    'origenes'
]);

// Tipos de servicio para los tabs
const servicesType = [
  {
    label: 'Tours',
    value: 'TOUR',
    description: 'Experiencias guiadas',
    icon: `<img src="/images/beach.png" alt="Beach Icon" />`
  },
  {
    label: 'Embarcaciones',
    value: 'EMBARCACION',
    description: 'Yates y lanchas',
    icon: `<img src="/assets/svgs/motor-boat.svg" alt="Motor Boat Icon" />`
  },
  {
    label: 'Hospedaje',
    value: 'HOSPEDAJE',
    description: 'Hoteles y cabañas',
    icon: `<img src="/assets/svgs/house.svg" alt="House Icon" />`
  },
  {
    label: 'Transporte',
    value: 'TRANSFER',
    description: 'Traslados y vehículos',
    icon: `<img src="/images/car.png" alt="Automobile Icon" />`
  },
];

const dateRange = computed(() => {
    const checkin = searchStore.checkin.value;
    const checkout = searchStore.checkout.value;
    if (props.type != "Hospedaje" && checkin) {
        return formatDate(checkin);
    }
    if (checkin && checkout) {
        return `${checkin ? formatDate(checkin) : ''} - ${checkout ? formatDate(checkout) : ''}`;
    }
    if (checkin) return formatDate(checkin);
    return '';
});

const showInputTitles = inject('showInputTitles', true);
</script>

<style scoped>
/* Ocultar scrollbar en móvil */
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Animaciones del modal */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .animate-slide-up {
    animation: slideUp 0.3s ease-out;
}

.modal-leave-active .animate-slide-up {
    animation: slideDown 0.3s ease-in;
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes slideDown {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
}
</style>

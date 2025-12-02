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
                'flex-1 px-7 py-4 text-left transition-all duration-200 relative group',
                activeTab === 'origin' ? 'bg-gray-50' : 'hover:bg-gray-50'
            ]">
                <div class="text-xs font-bold text-gray-700 mb-1">Ruta</div>
                <div class="text-sm text-gray-900 truncate font-medium">
                    <span>{{ searchStore.origen.value || 'Origen' }}</span>
                    <span class="mx-1">→</span>
                    <span>{{ searchStore.destino.value || 'Destino' }}</span>
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

    <!-- Mobile: Tabs con resumen integrado -->
    <div class="md:hidden bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <!-- Tabs Navigation -->
        <div class="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
            <button @click="setActiveTab('donde')" :class="[
                'py-4 text-center transition-all duration-200 relative',
                activeTab === 'donde' ? 'text-rose-600 bg-white' : 'text-gray-500'
            ]">
                <i class="fa-solid fa-location-dot text-lg mb-1"></i>
                <div class="text-xs font-semibold">Dónde</div>
                <div v-if="activeTab === 'donde'" class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600"></div>
            </button>

            <button v-if="type === 'Transporte'" @click="setActiveTab('origin')" :class="[
                'py-4 text-center transition-all duration-200 relative',
                activeTab === 'origin' ? 'text-rose-600 bg-white' : 'text-gray-500'
            ]">
                <i class="fa-solid fa-route text-lg mb-1"></i>
                <div class="text-xs font-semibold">Ruta</div>
                <div v-if="activeTab === 'origin'" class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600"></div>
            </button>

            <button @click="setActiveTab('checkin')" :class="[
                'py-4 text-center transition-all duration-200 relative',
                activeTab === 'checkin' ? 'text-rose-600 bg-white' : 'text-gray-500'
            ]">
                <i class="fa-solid fa-calendar-days text-lg mb-1"></i>
                <div class="text-xs font-semibold">Cuándo</div>
                <div v-if="activeTab === 'checkin'" class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600"></div>
            </button>

            <button @click="setActiveTab('quien')" :class="[
                'py-4 text-center transition-all duration-200 relative',
                activeTab === 'quien' ? 'text-rose-600 bg-white' : 'text-gray-500'
            ]">
                <i class="fa-solid fa-user-group text-lg mb-1"></i>
                <div class="text-xs font-semibold">Quién</div>
                <div v-if="activeTab === 'quien'" class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600"></div>
            </button>
        </div>

        <!-- Resumen de búsqueda -->
        <div class="p-4 space-y-2">
            <div class="flex items-start justify-between gap-3">
                <div class="flex-1 space-y-2 text-sm">
                    <div v-if="selectedLocation" class="flex items-center gap-2 text-gray-900">
                        <i class="fa-solid fa-location-dot text-rose-500 w-4"></i>
                        <span class="font-medium">{{ selectedLocation }}</span>
                    </div>
                    <div v-else class="flex items-center gap-2 text-gray-400">
                        <i class="fa-solid fa-location-dot w-4"></i>
                        <span>Selecciona un destino</span>
                    </div>

                    <div v-if="type === 'Transporte'" class="flex items-center gap-2 text-gray-900">
                        <i class="fa-solid fa-route text-rose-500 w-4"></i>
                        <span class="font-medium">{{ searchStore.origen.value || 'Origen' }} → {{ searchStore.destino.value || 'Destino' }}</span>
                    </div>

                    <div v-if="dateRange" class="flex items-center gap-2 text-gray-900">
                        <i class="fa-solid fa-calendar-days text-rose-500 w-4"></i>
                        <span class="font-medium">{{ dateRange }}</span>
                    </div>
                    <div v-else class="flex items-center gap-2 text-gray-400">
                        <i class="fa-solid fa-calendar-days w-4"></i>
                        <span>Agrega fechas</span>
                    </div>

                    <div v-if="guestSummary" class="flex items-center gap-2 text-gray-900">
                        <i class="fa-solid fa-user-group text-rose-500 w-4"></i>
                        <span class="font-medium">{{ guestSummary }}</span>
                    </div>
                    <div v-else class="flex items-center gap-2 text-gray-400">
                        <i class="fa-solid fa-user-group w-4"></i>
                        <span>Agrega huéspedes</span>
                    </div>
                </div>

                <!-- Botón de búsqueda móvil -->
                <div class="flex-shrink-0">
                    <Link v-if="type == 'Transporte'" :href="route('services.home', { type: 'TRANSFER', origen: searchStore.origen.value, destino: searchStore.destino.value, date: searchStore.checkin.value })">
                        <button class="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-5 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>Buscar</span>
                        </button>
                    </Link>
                    <Link v-else :href="route('services.home')">
                        <button class="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-5 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>Buscar</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { formatDate } from '@/composable/useCommonUtilities';
import searchStore from '@/store/searchStore';
import { Link } from '@inertiajs/vue3';
import { inject } from 'vue';

import { computed } from 'vue';

const props = defineProps([
    'isPanelOpen',
    'activeTab',
    'selectedLocation',
    'guestSummary',
    'setActiveTab',
    'selectedOrigin',
    'formatDate',
    'type'
]);

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

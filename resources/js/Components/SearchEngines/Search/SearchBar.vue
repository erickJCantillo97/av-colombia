<template>
    <!-- Escritorio: barra de segmentos estilo Airbnb -->
    <div
        class="hidden items-center gap-1 rounded-full border border-stone-200 bg-stone-50 p-2 shadow-lg transition-shadow duration-200 hover:shadow-xl lg:flex">
        <!-- Destino -->
        <button @click="setActiveTab('donde')" :class="[
            'group flex-1 rounded-full px-6 py-2.5 text-left transition-all duration-200',
            activeTab === 'donde' ? 'bg-white shadow-sm ring-1 ring-stone-200/70' : 'hover:bg-white/60'
        ]">
            <div class="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Ciudad</div>
            <div class="truncate text-sm font-medium" :class="selectedLocation ? 'text-stone-900' : 'text-stone-400'">
                {{ selectedLocation || '¿A dónde vas?' }}
            </div>
        </button>

        <!-- Origen / Destino (solo Transporte) -->
        <template v-if="type === 'Transporte'">
            <div v-show="activeTab !== 'donde' && activeTab !== 'origin'" class="h-8 w-px shrink-0 bg-stone-200"></div>
            <button @click="setActiveTab('origin')" :class="[
                'group min-w-0 flex-[1.8] rounded-full px-6 py-2.5 text-left transition-all duration-200',
                activeTab === 'origin' ? 'bg-white shadow-sm ring-1 ring-stone-200/70' : 'hover:bg-white/60'
            ]">
                <div class="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Ruta</div>
                <div class="flex min-w-0 items-center gap-1.5 text-sm font-medium text-stone-900">
                    <span class="truncate" :class="!searchStore.origen.value && 'text-stone-400'"
                        :title="searchStore.origen.value">{{ searchStore.origen.value || 'Origen' }}</span>
                    <span class="shrink-0 text-stone-400">→</span>
                    <span class="truncate" :class="!searchStore.destino.value && 'text-stone-400'"
                        :title="searchStore.destino.value">{{ searchStore.destino.value || 'Destino' }}</span>
                </div>
            </button>
            <div v-show="activeTab !== 'origin' && activeTab !== 'checkin'" class="h-8 w-px shrink-0 bg-stone-200">
            </div>
        </template>
        <template v-else>
            <div v-show="activeTab !== 'donde' && activeTab !== 'checkin'" class="h-8 w-px shrink-0 bg-stone-200"></div>
        </template>

        <!-- Fechas -->
        <button @click="setActiveTab('checkin')" :class="[
            'group flex-1 rounded-full px-6 py-2.5 text-left transition-all duration-200',
            activeTab === 'checkin' ? 'bg-white shadow-sm ring-1 ring-stone-200/70' : 'hover:bg-white/60'
        ]">
            <div class="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                {{ type == "Hospedaje" ? "Fechas" : "Cuándo" }}
            </div>
            <div class="truncate text-sm font-medium" :class="dateRange ? 'text-stone-900' : 'text-stone-400'">
                {{ dateRange || 'Agrega fechas' }}
            </div>
        </button>

        <div v-show="activeTab !== 'checkin' && activeTab !== 'quien'" class="h-8 w-px shrink-0 bg-stone-200"></div>

        <!-- Huéspedes / Pasajeros -->
        <button @click="setActiveTab('quien')" :class="[
            'group flex-1 rounded-full px-6 py-2.5 text-left transition-all duration-200',
            activeTab === 'quien' ? 'bg-white shadow-sm ring-1 ring-stone-200/70' : 'hover:bg-white/60'
        ]">
            <div class="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                {{ type == "Hospedaje" ? 'Quién' : 'Pasajeros' }}
            </div>
            <div class="truncate text-sm font-medium" :class="guestSummary ? 'text-stone-900' : 'text-stone-400'">
                {{ guestSummary || (type == 'Hospedaje' ? 'Agrega huéspedes' : 'Agrega pasajeros') }}
            </div>
        </button>

        <!-- Botón Buscar -->
        <Link :href="searchLink" class="ml-1 shrink-0">
        <button
            class="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:from-rose-600 hover:to-pink-700 hover:shadow-lg active:scale-95">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Buscar</span>
        </button>
        </Link>
    </div>

    <!-- Tablet: versión compacta -->
    <div
        class="hidden items-center gap-1 rounded-full border border-stone-200 bg-stone-50 p-2 shadow-lg transition-shadow duration-200 hover:shadow-xl md:flex lg:hidden">
        <button @click="setActiveTab('donde')" :class="[
            'flex-1 rounded-full px-5 py-2.5 text-left transition-all duration-200',
            activeTab === 'donde' ? 'bg-white shadow-sm ring-1 ring-stone-200/70' : 'hover:bg-white/60'
        ]">
            <div class="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Ciudad</div>
            <div class="truncate text-sm font-medium" :class="selectedLocation ? 'text-stone-900' : 'text-stone-400'">
                {{ selectedLocation || '¿A dónde?' }}
            </div>
        </button>

        <div v-show="activeTab !== 'donde' && activeTab !== 'checkin'" class="h-8 w-px shrink-0 bg-stone-200"></div>

        <button @click="setActiveTab('checkin')" :class="[
            'flex-1 rounded-full px-5 py-2.5 text-left transition-all duration-200',
            activeTab === 'checkin' ? 'bg-white shadow-sm ring-1 ring-stone-200/70' : 'hover:bg-white/60'
        ]">
            <div class="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Cuándo</div>
            <div class="truncate text-sm font-medium" :class="dateRange ? 'text-stone-900' : 'text-stone-400'">
                {{ dateRange || 'Fechas' }}
            </div>
        </button>

        <div v-show="activeTab !== 'checkin' && activeTab !== 'quien'" class="h-8 w-px shrink-0 bg-stone-200"></div>

        <button @click="setActiveTab('quien')" :class="[
            'flex-1 rounded-full px-5 py-2.5 text-left transition-all duration-200',
            activeTab === 'quien' ? 'bg-white shadow-sm ring-1 ring-stone-200/70' : 'hover:bg-white/60'
        ]">
            <div class="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Quién</div>
            <div class="truncate text-sm font-medium" :class="guestSummary ? 'text-stone-900' : 'text-stone-400'">
                {{ guestSummary || 'Huéspedes' }}
            </div>
        </button>

        <Link :href="searchLink" class="shrink-0">
        <button
            class="rounded-full bg-gradient-to-r from-rose-500 to-pink-600 p-4 text-white shadow-md transition-all duration-200 hover:from-rose-600 hover:to-pink-700 hover:shadow-lg active:scale-95">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
        </Link>
    </div>

    <!-- Móvil: barra compacta que abre el modal -->
    <div class="md:hidden">
        <button @click="openMobileModal"
            class="flex w-full items-center gap-3 rounded-full border border-stone-200 bg-white p-2 pl-3 shadow-lg transition-shadow duration-200 hover:shadow-xl">
            <span
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
            <span class="min-w-0 flex-1 text-left">
                <span class="block truncate text-sm font-semibold text-stone-900">
                    {{ selectedLocation || '¿A dónde vas?' }}
                </span>
                <span class="block truncate text-xs text-stone-500">
                    {{ type }} · {{ dateRange || 'Cualquier fecha' }} · {{ guestSummary || 'Pasajeros' }}
                </span>
            </span>
        </button>

        <!-- Modal de búsqueda completo -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="showMobileModal" class="fixed inset-0 z-[9999] flex items-end md:hidden">
                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" @click="closeMobileModal"></div>

                    <!-- Contenido del modal -->
                    <div
                        class="animate-slide-up relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl">
                        <!-- Header del modal -->
                        <div
                            class="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white px-4 py-4">
                            <h3 class="text-lg font-bold text-stone-900">¿A dónde vas?</h3>
                            <button @click="closeMobileModal"
                                class="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900">
                                <i class="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>

                        <!-- Tabs de tipos de servicio en el modal -->
                        <div class="sticky top-[57px] z-10 border-b border-stone-100 bg-white px-4 py-3">
                            <ServiceTypeTabs v-model:modelValue="searchStore.type" />
                        </div>

                        <!-- Contenido scrolleable -->
                        <div class="pb-28">
                            <!-- Vista principal del modal -->
                            <div v-if="!activeModalTab" class="space-y-4 p-4">
                                <!-- Destino -->
                                <div class="space-y-2">
                                    <label class="flex items-center gap-2 text-sm font-semibold text-stone-700">
                                        <i class="fa-solid fa-location-dot text-rose-500"></i>
                                        Ciudad
                                    </label>
                                    <button @click="handleModalTabClick('donde')"
                                        class="w-full rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition-colors hover:border-rose-300 hover:bg-rose-50/40">
                                        <span class="font-medium"
                                            :class="selectedLocation ? 'text-stone-900' : 'text-stone-400'">{{
                                                selectedLocation || 'Selecciona un destino' }}</span>
                                    </button>
                                </div>

                                <!-- Ruta (solo Transporte) -->
                                <div v-if="type === 'Transporte'" class="space-y-2">
                                    <label class="flex items-center gap-2 text-sm font-semibold text-stone-700">
                                        <i class="fa-solid fa-route text-rose-500"></i>
                                        Ruta
                                    </label>
                                    <button @click="handleModalTabClick('origin')"
                                        class="w-full rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition-colors hover:border-rose-300 hover:bg-rose-50/40">
                                        <div class="flex items-center gap-2 font-medium text-stone-900">
                                            <span class="truncate"
                                                :class="!searchStore.origen.value && 'text-stone-400'">{{
                                                    searchStore.origen.value || 'Origen' }}</span>
                                            <span class="text-stone-400">→</span>
                                            <span class="truncate"
                                                :class="!searchStore.destino.value && 'text-stone-400'">{{
                                                    searchStore.destino.value || 'Destino' }}</span>
                                        </div>
                                    </button>
                                </div>

                                <!-- Fechas -->
                                <div class="space-y-2">
                                    <label class="flex items-center gap-2 text-sm font-semibold text-stone-700">
                                        <i class="fa-solid fa-calendar-days text-rose-500"></i>
                                        {{ type == "Hospedaje" ? "Fechas" : "Cuándo" }}
                                    </label>
                                    <button @click="handleModalTabClick('checkin')"
                                        class="w-full rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition-colors hover:border-rose-300 hover:bg-rose-50/40">
                                        <span class="font-medium" :class="dateRange ? 'text-stone-900' : 'text-stone-400'">{{
                                            dateRange || 'Agrega fechas' }}</span>
                                    </button>
                                </div>

                                <!-- Pasajeros -->
                                <div class="space-y-2">
                                    <label class="flex items-center gap-2 text-sm font-semibold text-stone-700">
                                        <i class="fa-solid fa-user-group text-rose-500"></i>
                                        {{ type == "Hospedaje" ? 'Quién' : 'Pasajeros' }}
                                    </label>
                                    <button @click="handleModalTabClick('quien')"
                                        class="w-full rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition-colors hover:border-rose-300 hover:bg-rose-50/40">
                                        <span class="font-medium" :class="guestSummary ? 'text-stone-900' : 'text-stone-400'">{{
                                            guestSummary || 'Agrega huéspedes' }}</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Panel Dónde -->
                            <div v-else-if="activeModalTab === 'donde'" class="p-4">
                                <button @click="backToMainModal"
                                    class="mb-4 flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-900">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="font-medium">Volver</span>
                                </button>
                                <h3 class="mb-4 text-xl font-bold text-stone-900">¿A dónde quieres ir?</h3>
                                <div class="relative mb-4">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg class="h-5 w-5 text-stone-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input v-model="locationQuery" type="text" placeholder="Buscar destinos..."
                                        class="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-base text-stone-900 placeholder-stone-400 transition-all focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-400/40">
                                </div>
                                <div>
                                    <h4 class="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
                                        Destinos populares</h4>
                                    <div class="space-y-2">
                                        <button v-for="destination in popularDestinations" :key="destination.name"
                                            @click="selectLocation(destination.name)"
                                            class="flex w-full items-center gap-3 rounded-2xl border border-stone-200 p-3 text-left transition-all hover:border-rose-400 hover:bg-rose-50/40">
                                            <span
                                                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 text-xl">{{
                                                    destination.emoji }}</span>
                                            <span class="min-w-0 flex-1">
                                                <span class="block truncate font-semibold text-stone-900">{{
                                                    destination.name }}</span>
                                                <span class="block truncate text-sm text-stone-500">{{
                                                    destination.description }}</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Panel Ruta (Origen y Destino) -->
                            <div v-else-if="activeModalTab === 'origin'" class="p-4">
                                <button @click="backToMainModal"
                                    class="mb-4 flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-900">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="font-medium">Volver</span>
                                </button>
                                <h3 class="mb-4 text-xl font-bold text-stone-900">¿Dónde te recogemos y te llevamos?</h3>
                                <div class="space-y-5">
                                    <!-- Origen -->
                                    <div>
                                        <div class="mb-2 flex items-center gap-2">
                                            <i class="fa-solid fa-circle-dot text-rose-500"></i>
                                            <p class="font-semibold text-stone-900">Punto de origen</p>
                                        </div>
                                        <div class="grid grid-cols-2 gap-2">
                                            <button v-for="origen in props.origenes" :key="origen"
                                                @click="selectOrigen(origen)" :class="[
                                                    'rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                                                    searchStore.origen.value === origen
                                                        ? 'border-rose-500 bg-rose-500 text-white shadow-sm'
                                                        : 'border-stone-200 bg-white text-stone-700 hover:border-rose-400 hover:bg-rose-50/40'
                                                ]">
                                                {{ origen }}
                                            </button>
                                        </div>
                                    </div>
                                    <!-- Destino -->
                                    <div v-if="searchStore.origen.value">
                                        <div class="mb-2 flex items-center gap-2">
                                            <i class="fa-solid fa-location-dot text-sky-500"></i>
                                            <p class="font-semibold text-stone-900">Punto de destino</p>
                                        </div>
                                        <div class="grid grid-cols-2 gap-2">
                                            <button v-for="destino in destinosFinales" :key="destino"
                                                @click="selectDestino(destino)" :class="[
                                                    'rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                                                    searchStore.destino.value === destino
                                                        ? 'border-sky-500 bg-sky-500 text-white shadow-sm'
                                                        : 'border-stone-200 bg-white text-stone-700 hover:border-sky-400 hover:bg-sky-50/40'
                                                ]">
                                                {{ destino }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Panel Fechas -->
                            <div v-else-if="activeModalTab === 'checkin'" class="p-4">
                                <button @click="backToMainModal"
                                    class="mb-4 flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-900">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="font-medium">Volver</span>
                                </button>
                                <h3 class="mb-4 text-xl font-bold text-stone-900">{{ mensajePrincipal }}</h3>
                                <div class="rounded-2xl bg-stone-50 p-3">
                                    <CalendarSelector class="w-full" :value="dates"
                                        :min-date="new Date().toISOString().split('T')[0]"
                                        :placeholder="'Selecciona rango de fechas'"
                                        @update:value="val => valueDateChange(val)"
                                        @update:checkin="val => searchStore.checkin.value = val"
                                        @update:checkout="val => searchStore.checkout.value = val"
                                        :range="type == 'Hospedaje' ? true : false" />
                                </div>
                            </div>

                            <!-- Panel Pasajeros -->
                            <div v-else-if="activeModalTab === 'quien'" class="p-4">
                                <button @click="backToMainModal"
                                    class="mb-4 flex items-center gap-2 text-stone-600 transition-colors hover:text-stone-900">
                                    <i class="fa-solid fa-arrow-left"></i>
                                    <span class="font-medium">Volver</span>
                                </button>
                                <h3 class="mb-4 text-xl font-bold text-stone-900">¿Quién viene?</h3>
                                <div class="rounded-2xl bg-stone-50 p-5">
                                    <GuestSelector :guests="searchStore.guests.value" @increment="incrementGuests"
                                        @decrement="decrementGuests" />
                                </div>
                            </div>
                        </div>

                        <!-- Footer sticky con botón de búsqueda -->
                        <div class="sticky bottom-0 border-t border-stone-100 bg-white p-4">
                            <Link :href="searchLink">
                            <button
                                class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:from-rose-600 hover:to-pink-700 hover:shadow-xl active:scale-[0.99]">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
import { ref, computed } from 'vue';
import ServiceTypeTabs from './ServiceTypeTabs.vue';
import GuestSelector from './GuestSelector.vue';
import CalendarSelector from './CalendarSelector.vue';

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
    activeModalTab.value = tab;
};

const backToMainModal = () => {
    activeModalTab.value = '';
};

// Datos para los paneles
const locationQuery = ref('');
const dates = ref([]);
const destinosFinales = ref([]);

const popularDestinations = [
    { name: 'Cartagena', description: 'Ciudad amurallada', emoji: '🏰' },
    { name: 'San Andrés', description: 'Isla caribeña', emoji: '🏝️' },
    { name: 'Medellín', description: 'Ciudad de la eterna primavera', emoji: '🌸' },
    { name: 'Bogotá', description: 'Capital cultural', emoji: '🏙️' },
];

const selectLocation = (location) => {
    searchStore.location.value = location;
    backToMainModal();
};

const selectOrigen = async (origen) => {
    searchStore.origen.value = origen;
    searchStore.destino.value = null;
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

const searchLink = computed(() => {
    if (props.type === 'Transporte') {
        return route('services.home', {
            type: 'TRANSFER',
            origen: searchStore.origen.value,
            destino: searchStore.destino.value,
            date: searchStore.checkin.value,
        });
    }
    return route('services.home');
});
</script>

<style scoped>
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
    animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.modal-leave-active .animate-slide-up {
    animation: slideDown 0.25s ease-in;
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

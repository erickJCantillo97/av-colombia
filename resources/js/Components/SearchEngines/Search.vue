<template>
    <div class="flex justify-center w-full px-4 sm:px-6 lg:px-8">
        <div class="relative w-full" ref="searchContainer">
            <!-- Service Types Section -->
            <transition name="fade-slide">
                <div v-if="showServiceTypeTabs" key="tabs" class="mb-3 sm:mb-4 w-full items-center flex justify-center">
                    <ServiceTypeTabs :servicesType="servicesType" v-model:modelValue="searchStore.type" />
                    <Link class=" sm:hidden fixed right-0 top-9 bg-white/90 rounded-full px-2 py-1"
                        :href="route('login')">
                    <i class="fa-solid fa-right-to-bracket"></i>
                    </Link>
                </div>
            </transition>
            <!-- Search Bar -->
            <div class="relative">
                <SearchBar :type="searchStore.type.value.label" :isPanelOpen="isPanelOpen" :activeTab="activeTab"
                    :selectedLocation="selectedLocation" :selectedCheckin="selectedCheckin"
                    :selectedCheckout="selectedCheckout" :guestSummary="guestSummary" :setActiveTab="setActiveTab"
                    :formatDate="formatDate" :dateRange="dateRangeDisplay" />
            </div>
            <!-- Dropdown Panels -->
            <DropdownPanels :isPanelOpen="isPanelOpen" :activeTab="activeTab" v-model:locationQuery="locationQuery"
                v-model:selectedCheckin="selectedCheckin" v-model:selectedCheckout="selectedCheckout" :guests="guests"
                :hasSearchCriteria="hasSearchCriteria" :popularDestinations="popularDestinations"
                :quickDateOptions="quickDateOptions" :durationOptions="durationOptions" :formatDate="formatDate"
                @selectLocation="selectLocation" @openDatePicker="openDatePicker" @setQuickDate="setQuickDate"
                @setDuration="setDuration" @incrementGuests="incrementGuests" @decrementGuests="decrementGuests"
                @searchLocations="searchLocations" @generateWithAi="generateWithAi" :type="searchStore.type.value.label" :destinos/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, provide } from 'vue';
import ServiceTypeTabs from './Search/ServiceTypeTabs.vue';
import SearchBar from './Search/SearchBar.vue';
import DropdownPanels from './Search/DropdownPanels.vue';
import AiModal from './Search/AiModal.vue';
import searchStore from '@/store/searchStore';
import { Link } from "@inertiajs/vue3";

// Estado del panel
const isPanelOpen = ref(false);
const activeTab = ref('donde');
const isModalVisible = ref(false);
const isLoading = ref(false);
const generatedContent = ref('');
const searchContainer = ref(null);

// Datos de búsqueda
const locationQuery = ref('');

// Reemplazar refs por el store
const selectedLocation = searchStore.location;
const selectedCheckin = searchStore.checkin;
const selectedCheckout = searchStore.checkout;
const guests = searchStore.guests;

// Tipo de servicio
const type = ref({
    label: 'Tours',
    value: 'TOUR',
});

// Funciones principales
const setActiveTab = (tab) => {
    activeTab.value = tab;
    if (!isPanelOpen.value) {
        isPanelOpen.value = true;
    }
};


const closePanel = () => {
    isPanelOpen.value = false;
    activeTab.value = '';
};

const destinos = ref([]);

const openModal = () => { isModalVisible.value = true; };
const closeModal = () => {
    isModalVisible.value = false;
    
    generatedContent.value = '';
};

// Funciones de selección
const selectLocation = async (location) => {
    selectedLocation.value = location;
    getAllDestinations(location);
    if(searchStore.type.value.label == 'Transporte'){
        setActiveTab('origin');
        return;
    }
    setActiveTab('checkin');
};

const getAllDestinations = async (location) => {
    const response = await axios.get(`/getAllDestinations?city=${location}`);
    destinos.value = response.data;
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
    const typePerson = searchStore.type.value.label == "Hospedaje" ? "huésped" : "persona"
    const total = guests.value.adults + guests.value.children;
    if (total === 0) return '';
    let summary = `${total} ${typePerson}${total > 1 ? typePerson == "huésped" ? 'es' : 's' : ''}`;
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

const dateRangeDisplay = computed(() => {
    if (selectedCheckin.value && selectedCheckout.value) {
        return `${formatDate(selectedCheckin.value)} - ${formatDate(selectedCheckout.value)}`;
    }
    if (selectedCheckin.value) {
        return formatDate(selectedCheckin.value);
    }
    return '';
});

// Funciones de búsqueda


const generateWithAi = async () => {
    if (!hasSearchCriteria.value) return;

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
    // Si el click es dentro del calendario de vue-datepicker-next, no cerrar el panel
    if (
        event.target.closest('.mx-datepicker-popup') || // popup principal
        event.target.closest('.mx-calendar') // calendario interno
    ) {
        return;
    }
    if (searchContainer.value && !searchContainer.value.contains(event.target)) {
        closePanel();
    }
};

// Mostrar/ocultar ServiceTypeTabs según scroll
const showServiceTypeTabs = ref(true);
let lastScrollY = window.scrollY;

// Mostrar/ocultar títulos de inputs según scroll
const showInputTitles = showServiceTypeTabs; // Usamos el mismo control para ambos

function handleScrollTabs() {
    const currentScroll = window.scrollY;
    // Solo mostrar si está en la parte más alta (menos de 20px en móvil, 10px en desktop)
    const threshold = window.innerWidth <= 768 ? 20 : 10;
    showServiceTypeTabs.value = currentScroll < threshold;
    lastScrollY = currentScroll;
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScrollTabs);
});
onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('scroll', handleScrollTabs);
});

provide('showInputTitles', showInputTitles);
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

    0%,
    100% {
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

.destination-card:nth-child(1) {
    animation-delay: 0.1s;
}

.destination-card:nth-child(2) {
    animation-delay: 0.2s;
}

.destination-card:nth-child(3) {
    animation-delay: 0.3s;
}

.destination-card:nth-child(4) {
    animation-delay: 0.4s;
}

.destination-card:nth-child(5) {
    animation-delay: 0.5s;
}

.destination-card:nth-child(6) {
    animation-delay: 0.6s;
}

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

    0%,
    100% {
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
    padding: 0 8px;
    margin-bottom: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.service-types-container::-webkit-scrollbar {
    display: none;
}

.service-type-tab {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    opacity: 0;
    transform: translateY(10px);
    animation: slideInUp 0.3s ease-out forwards;
    white-space: nowrap;
    flex-shrink: 0;
}

.service-type-tab:nth-child(1) {
    animation-delay: 0.05s;
}

.service-type-tab:nth-child(2) {
    animation-delay: 0.1s;
}

.service-type-tab:nth-child(3) {
    animation-delay: 0.15s;
}

.service-type-tab:nth-child(4) {
    animation-delay: 0.2s;
}

.service-type-tab:nth-child(5) {
    animation-delay: 0.25s;
}

.service-type-tab:nth-child(6) {
    animation-delay: 0.3s;
}

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
        padding: 0 4px;
        gap: 6px;
        justify-content: flex-start;
    }

    .service-type-tab {
        min-width: auto;
        padding: 8px 12px;
        font-size: 12px;
    }
}

@media (max-width: 640px) {
    .service-types-container {
        padding: 0 2px;
        gap: 4px;
    }

    .service-type-tab {
        padding: 6px 10px;
        font-size: 11px;
        min-width: auto;
    }
}

@media (max-width: 480px) {
    .service-type-tab {
        padding: 6px 8px;
        font-size: 10px;
    }

    .service-type-tab span {
        display: none;
    }

    .service-type-tab {
        min-width: 40px;
        justify-content: center;
    }
}


/* Service type stagger animation */
.service-type-card:nth-child(1) {
    animation-delay: 0.1s;
}

.service-type-card:nth-child(2) {
    animation-delay: 0.2s;
}

.service-type-card:nth-child(3) {
    animation-delay: 0.3s;
}

.service-type-card:nth-child(4) {
    animation-delay: 0.4s;
}

.service-type-card:nth-child(5) {
    animation-delay: 0.5s;
}

.service-type-card:nth-child(6) {
    animation-delay: 0.6s;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}

/* Additional responsive improvements */
@media (max-width: 768px) {
    .dropdown-shadow {
        box-shadow:
            0 2px 4px -1px rgba(0, 0, 0, 0.1),
            0 1px 2px -1px rgba(0, 0, 0, 0.06);
    }

    /* Improve touch targets on mobile */
    .search-section {
        min-height: 60px;
    }

    /* Better spacing for mobile panels */
    .panel-content {
        padding: 16px !important;
    }

    /* Improve button accessibility on mobile */
    .search-button {
        min-width: 48px;
        min-height: 48px;
    }
}

@media (max-width: 640px) {

    /* Stack search sections vertically on small screens */
    .search-section {
        min-height: 50px;
    }

    /* Reduce panel padding on small screens */
    .panel-content {
        padding: 12px !important;
    }

    /* Smaller text on mobile */
    .panel-content h3 {
        font-size: 1rem;
        margin-bottom: 1rem;
    }
}

@media (max-width: 480px) {

    /* Very small screens adjustments */
    .panel-content {
        padding: 10px !important;
    }

    .destination-card {
        padding: 8px !important;
    }

    .destination-card .w-10,
    .destination-card .w-12 {
        width: 32px !important;
        height: 32px !important;
    }
}

/* Improve scrolling on mobile */
@media (max-width: 768px) {
    .max-h-96 {
        max-height: 60vh;
    }
}

/* Better touch feedback */
@media (hover: none) {
    .scale-hover:hover {
        transform: none;
    }

    .scale-hover:active {
        transform: scale(0.98);
    }

    .search-section:hover {
        background-color: transparent;
    }

    .search-section:active {
        background-color: rgba(0, 0, 0, 0.05);
    }
}

/* Prevent horizontal scroll */
.service-types-container {
    -webkit-overflow-scrolling: touch;
}

/* Better focus styles for mobile */
@media (max-width: 768px) {
    .modern-focus:focus {
        outline: 2px solid #ef4444;
        outline-offset: 2px;
    }
}
</style>

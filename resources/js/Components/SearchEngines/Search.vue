<template>
    <div class="flex w-full justify-center px-4 md:px-6 lg:px-8">
        <div class="relative w-full" :class="isTransporte ? 'max-w-7xl' : 'max-w-5xl'" ref="searchContainer">
            <!-- Selector de tipo de servicio (siempre visible en tablet y escritorio) -->
            <div class="mb-4 hidden w-full justify-center md:flex lg:mb-6">
                <ServiceTypeTabs v-model:modelValue="searchStore.type" />
            </div>

            <!-- Barra de búsqueda -->
            <div class="relative">
                <SearchBar :type="searchStore.type.value.label" :isPanelOpen="isPanelOpen" :activeTab="activeTab"
                    :selectedLocation="selectedLocation" :selectedCheckin="selectedCheckin"
                    :selectedCheckout="selectedCheckout" :guestSummary="guestSummary" :setActiveTab="setActiveTab"
                    :formatDate="formatDate" :dateRange="dateRangeDisplay" :selectedOrigin="selectedOrigin"
                    :origenes="origenes" />
            </div>

            <!-- Paneles desplegables -->
            <DropdownPanels :isPanelOpen="isPanelOpen" :activeTab="activeTab" v-model:locationQuery="locationQuery"
                v-model:selectedCheckin="selectedCheckin" v-model:selectedCheckout="selectedCheckout" :guests="guests"
                :hasSearchCriteria="hasSearchCriteria" :popularDestinations="popularDestinations"
                :selectedLocation="selectedLocation" :formatDate="formatDate" @selectLocation="selectLocation"
                @openDatePicker="openDatePicker" @incrementGuests="incrementGuests" @decrementGuests="decrementGuests"
                @searchLocations="searchLocations" @generateWithAi="generateWithAi"
                :type="searchStore.type.value.label" :origenes="origenes" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import ServiceTypeTabs from './Search/ServiceTypeTabs.vue';
import SearchBar from './Search/SearchBar.vue';
import DropdownPanels from './Search/DropdownPanels.vue';
import searchStore from '@/store/searchStore';

const isPanelOpen = ref(false);
const activeTab = ref('donde');
const isModalVisible = ref(false);
const isLoading = ref(false);
const generatedContent = ref('');
const searchContainer = ref(null);

const locationQuery = ref('');

const selectedLocation = searchStore.location;
const selectedCheckin = searchStore.checkin;
const selectedCheckout = searchStore.checkout;
const guests = searchStore.guests;
const selectedOrigin = searchStore.origen;

const isTransporte = computed(() => searchStore.type.value.label === 'Transporte');

const type = ref({
    label: 'Tours',
    value: 'TOUR',
});

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

const origenes = ref([]);

const openModal = () => { isModalVisible.value = true; };

const selectLocation = async (location) => {
    selectedLocation.value = location;
    getAllOrigins(location);
    if (searchStore.type.value.label == 'Transporte') {
        setActiveTab('origin');
        return;
    }
    setActiveTab('checkin');
};

const getAllOrigins = async (location) => {
    const response = await axios.get(`/getAllOrigins?city=${location}`);
    origenes.value = response.data;
};

getAllOrigins(selectedLocation.value);

const openDatePicker = (type) => {
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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
};

const popularDestinations = [
    { name: 'Cartagena', description: 'Ciudad amurallada', emoji: '🏰' },
    { name: 'San Andrés', description: 'Isla caribeña', emoji: '🏝️' },
    { name: 'Medellín', description: 'Ciudad de la eterna primavera', emoji: '🌸' },
    { name: 'Bogotá', description: 'Capital cultural', emoji: '🏙️' },
    { name: 'Eje Cafetero', description: 'Paisaje cafetero', emoji: '☕' },
    { name: 'Amazonas', description: 'Selva tropical', emoji: '🌳' },
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
    console.log('Buscando:', locationQuery.value);
};

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

const generateWithAi = async () => {
    if (!hasSearchCriteria.value) return;

    openModal();
    isLoading.value = true;

    try {
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

const handleClickOutside = (event) => {
    if (
        event.target.closest('.mx-datepicker-popup') ||
        event.target.closest('.mx-calendar')
    ) {
        return;
    }
    if (searchContainer.value && !searchContainer.value.contains(event.target)) {
        closePanel();
    }
};

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

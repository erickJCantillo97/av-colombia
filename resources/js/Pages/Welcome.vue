<script setup>
import { Head, Link } from '@inertiajs/vue3';
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import Banner from './Welcome/Banner.vue';
import Features from './Welcome/Features.vue';
import PopularSection from './Welcome/PopularSection.vue';
import HotelSection from './Welcome/HotelSection.vue';
import ContactSection from './Welcome/ContactSection.vue';
import Recommendations from './Welcome/recommendations.vue';

const toggler = ref(false)
defineProps({
    canLogin: {
        type: Boolean,
    }
});

const value = ref({ name: 'Experiencias y Tours', value: 1 });

const options = ref([
    { name: 'Experiencias y Tours', value: 1 },
    // { name: 'Alojamiento', value: 2 },
    { name: 'Transporte', value: 3 },
    { name: 'Embarcaciones', value: 4 }
]);

const changeMotor = (motor) => {
    value.value = motor;
}


</script>

<template>

    <GuestLayout>
        <Recommendations/>
        <Features></Features>
        <Banner></Banner>
        <PopularSection></PopularSection>
        <HotelSection></HotelSection>
        <ContactSection></ContactSection>
    </GuestLayout>

</template>

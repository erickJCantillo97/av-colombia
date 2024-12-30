<script setup>
import { Head, Link } from '@inertiajs/vue3';
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
import FsLightbox from "fslightbox-vue/v3";
import Input from '@/Components/Customs/Input.vue';
import Header from '@/Components/Sections/Header.vue';
// import Banner from '@/Components/Sections/Banner.vue';
import Experiencias from '@/Components/SearchEngines/Experiencias.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import ProductCard from '@/Components/Sections/ProductCard.vue';
import ExperienceCard from '@/Components/Items/ExperienceCard.vue';
import ExperienceMiniCard from '@/Components/Items/ExperienceMiniCard.vue';
import Banner from './Welcome/Banner.vue';
import Features from './Welcome/Features.vue';

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
        <Features></Features>
        <Banner></Banner>

    </GuestLayout>

</template>

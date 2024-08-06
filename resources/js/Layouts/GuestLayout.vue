<template>
    <Head title="Servicios" />
    <Header />
    <Banner />

    <slot />
</template>
<script setup>
import Banner from '@/Components/Banner.vue';
import Header from '@/Components/Sections/Header.vue';
import { Head } from '@inertiajs/vue3';

</script>
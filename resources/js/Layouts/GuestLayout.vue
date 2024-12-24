<template>

    <Head title="Inicio" />
    <Header />
    <div class="h-[100vh] overflow-y-auto py-1 pb-20">
        <!-- <Banner class=""  /> -->
        <slot />
    </div>
</template>
<script setup>
import Banner from '@/Components/Sections/Banner.vue';
import Header from '@/Components/Sections/Header.vue';
import { Head } from '@inertiajs/vue3';

</script>
<template>

    <Head title="Inicio" />

    <div class="h-[100vh] overflow-y-auto pb-20">
        <!-- <Banner class=""  /> -->
        <slot />
    </div>
</template>
<script setup>
import Banner from '@/Components/Sections/Banner.vue';
import Header from '@/Components/Sections/Header.vue';
import { Head } from '@inertiajs/vue3';

</script>
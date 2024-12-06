<template>
    <GuestLayout>
        <div class="w-full flex flex-col items-center justify-center">
            <h1>Services</h1>
            <ul class="mx-auto max-w-7xl w-full flex flex-col gap-y-4">
                <Product :service v-for="service in services" />
            </ul>
        </div>
    </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { onMounted, ref } from 'vue';
import Product from './Product.vue';




const services = ref([]);

onMounted(() => {
    axios.get(route('get.services'))
        .then(response => {
            services.value = response.data.services;
        });
});


</script>
<template>
    <AppLayout title="Crear Reservas">
        <div class="py-4 px-6 space-y-8">
        <div class="flex justify-between">
            <div class="flex gap-x-6 ">
                <Link :href="route('BookingServices.index')" class="btn btn-primary">
                <i class="fa-solid fa-arrow-left text-xl "></i>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Crear Reserva</h1>
                    <p class="text-xs font-extralight">Reservas / Crear Reserva</p>
                </div>
            </div>
        </div>
        <Form class="mx-4"></Form>
    </div>
    </AppLayout>
</template>
<script setup>
import { Link } from '@inertiajs/vue3';
import Form from './Components/FormFirst.vue';
import AppLayout from '@/Layouts/AppLayout.vue';


</script>

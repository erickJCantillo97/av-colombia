<template>
    <AppLayout>
        <div class="p-1">
            <div class="flex items-center pb-1 border-b gap-x-4">
                <Link :href="route('services.index')" class="btn btn-primary">
                <i class="fa-solid fa-arrow-left text-xl "></i>
                </Link>
                <h1 class="text-xl font-bold ">Crear {{ serviceType }}</h1>
            </div>
            <div>
                <div v-if="serviceType == 'TOUR'">
                    <ToursForm :features="features" :included="included" />
                </div>
                <div v-if="serviceType == 'EMBARCACION'">
                    <EmbarcacionForm />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
<script setup>
import ToursForm from './ToursForm.vue';
import EmbarcacionForm from './EmbarcacionForm.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    serviceType: String,
    features: Array,
    included: Array
})
</script>

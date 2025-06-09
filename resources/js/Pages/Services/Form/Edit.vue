<template>
    <AppLayout>
        <div class="p-1">
            <div class="flex items-center pb-1 border-b gap-x-4">
                <Link :href="route('services.index')" class="btn btn-primary">
                <i class="fa-solid fa-arrow-left text-xl "></i>
                </Link>
                <h1 class="text-xl font-bold ">Editar {{ serviceType }} {{ service.title }}</h1>
            </div>
            <div class="rounded-md mt-2">
                <div class="rounded-md flex">
                    <div @click="value = op.value" v-for="op in options"
                        class="select-none text-center py-1 px-4 text-sm cursor-pointer border-b-2"
                        :class="value == op.value ? 'border-black font-bold' : 'hover:bg-white/30'">
                        {{ op.name }} <span v-if="op.label"
                            class="bg-blue-800 py-1 px-2 text-white text-xs ml-2 rounded-full">
                            {{ op.label }}
                        </span>
                    </div>
                </div>

                <div v-if="value == 1" class="p-4">
                    <ToursForm :service :included />
                </div>
                <div v-if="value == 2" class="p-4">
                    <SelectImages :service="service" />
                </div>
                <!--  
            <div v-if="value == 3" class="p-4">
                <IndexExtra class="mx-4" :bookingService></IndexExtra>
            </div>

            <div v-if="value == 4" class="p-4">
                <Changes class="mx-4" :bookingService></Changes>
            </div> -->

            </div>

        </div>
    </AppLayout>
</template>
<script setup>
import ToursForm from './ToursForm.vue';
import EmbarcacionForm from './EmbarcacionForm.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import SelectImages from './SelectImages.vue';

const props = defineProps({
    serviceType: String,
    features: Array,
    included: Array,
    service: Object
})

const value = ref(1);

const options = [
    { name: "Datos del Servicio", value: 1 },
    { name: "Fotos", value: 2 },
    { name: "Ecuentro/Recogida", value: 3 },
    { name: "Itinerario", value: 4 },
    { name: "Disponibilidad y precios", value: 5 },
];
</script>

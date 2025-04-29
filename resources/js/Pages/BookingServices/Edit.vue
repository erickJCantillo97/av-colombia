<template>
    <AppLayout title="Editar Reserva">
        <div class="mx-4 mt-4 flex justify-between">
            <div class="w-full flex gap-x-4">
                <Link :href="route('BookingServices.index')" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-left text-xl "></i>
                    </Link>
                <h1 class="text-lg font-bold">Editar Reserva {{ bookingService.service }} de {{bookingService.cliente_name}}</h1>
            </div>

            <div
                :class="`text-sm bg-${bookingServices.getColorStatus()}-200 flex px-4 py-3 justify-between items-center rounded-xl uppercase font-extrabold text-nowrap`">
                {{ bookingService.status }}
            </div>
        </div>
        <div class="border bg-gray-100 rounded-md mt-2">
            <div class=" rounded-md w-auto flex">
                <div @click="value = op.value" v-for="op in options"
                    class="w-auto select-none text-center py-2 px-6 text-sm md:text-md cursor-pointer "
                    :class="value == op.value ? 'border-blue-800 border-2 text-blue-800 font-bold' : 'hover:bg-white/30 shadow-md shadow-blue-400' ">
                    {{ op.name }} <span v-if="op.label" class="bg-blue-800 py-1 px-2 text-white text-xs ml-2 rounded-full">
                        {{ op.label }}
                    </span>
                </div>
            </div>

            <div v-if="value == 1" class="p-4">
                <Form class="mx-4" :bookingService></Form>
            </div>
            <div v-if="value == 2" class="p-4">
                <Index class="mx-4" :bookingService></Index>
            </div>
            <div v-if="value == 3" class="p-4">
                <IndexExtra class="mx-4" :bookingService></IndexExtra>
            </div>

        </div>
    </AppLayout>
</template>
<script setup>
import Form from './Components/FormFirst.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
import BookingServices from '@/Models/BookingServices/BookingServices'
import { Link } from '@inertiajs/vue3';
import Index from './Components/Proveedor/Index.vue';
import IndexExtra from './Components/Extra/Index.vue';

const value = ref(1);

const props = defineProps({
    bookingService: Object
})

const bookingServices = new BookingServices(props.bookingService);

const options = [
    { name: "Datos de la Reserva", value: 1 },
    { name: "Proveedores", value: 2, label: props.bookingService.proveedors.length },
    { name: "Extras", value: 3, label: props.bookingService.extras.length  },
    { name: "Historial de Cambios", value: 4 },
];
</script>

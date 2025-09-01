<template>
    <Head title="Tiquetes"></Head>


    <AppLayout>
        <div class=" p-4">
            <h2 class="text-lg font-semibold">Entradas al Aviario</h2>
            <div class="bg-white  p-4 flex gap-4">
                <div class="flex-col flex-grow rounded-lg shadow p-4 text-center bg-gray-800">
                    <p class="text-gray-100">Total Disponibles</p>
                    <p class="text-gray-100">20</p>
                </div>
                <div class="flex-col flex-grow rounded-lg shadow p-4 text-center bg-gray-200">
                    <p class="text-gray-600">Adultos Extranjeros</p>
                    <p>20</p>
                </div>
                <div class="flex-col flex-grow rounded-lg shadow p-4 text-center bg-gray-200">
                    <p class="text-gray-600">Adultos Nacionales</p>
                    <p>20</p>
                </div>
                <div class="flex-col flex-grow rounded-lg shadow p-4 text-center bg-gray-200">
                    <p class="text-gray-600">Niños Extranjeros</p>
                    <p>20</p>
                </div>
                <div class="flex-col flex-grow rounded-lg shadow p-4 text-center bg-gray-200">
                    <p class="text-gray-600">Niños Nacionales</p>
                    <p>20</p>
                </div>
            </div>
        </div>
        <div class="h-[40vh]">
            <Datatable :add :columnas="columns" :data="pagoEntradas" title="Tiquetes">
            </Datatable>
        </div>
        <Modal v-model="show" title="Añadir Pago de Entrada" width="50vw">
            <Form :payment="payment"></Form>
        </Modal>
    </AppLayout>
</template>
<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
import columns from './Columns.js';
import Datatable from '@/Components/Customs/Datatable.vue';
import Modal from "@/Components/Customs/Modal.vue";
import Form from './Form.vue';
import { Head } from '@inertiajs/vue3';

const show = ref(false);
const payment = ref(null);

const props = defineProps({
    pagoEntradas: Array
});

const add = {
    action: () => {
        show.value = true;
    },
};

</script>
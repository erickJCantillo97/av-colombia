<template>
    <Head title="Tiquetes"></Head>
    <AppLayout>
        <div class="h-[99vh]">
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
<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :add :columnas="columns" :data="bookingServices" routecreate="services.create" title="Reservas">
            </Datatable>
        </div>
        <Modal v-model="show" title="Añadir Reserva" width="40vw">
            <form @submit.prevent="reservar">

                <Input type="dropdown" v-model="form.service_id" label="Servicio" option-label="title" option-value="id"
                    :options="services"></Input>
                <Input label="Fecha" type="date" v-model="form.date"></Input>
                <Input label="Adultos" type="number" v-model="form.adults"></Input>
                <Input label="Niños" type="number" v-model="form.boys"></Input>
                <div>
                    <Input type="checkbox" inputId="payment" v-model="form.payment"
                        label="Este Servicio Fue pagado"></Input>
                </div>
                <div class="flex justify-end mt-4">
                    <Button type="submit" severity="success" label="Guardar" :loading />
                </div>
            </form>
        </Modal>
        <Toast></Toast>
    </AppLayout>
</template>
<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router, useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    bookingServices: Array
})


const toast = useToast();
const show = ref(false);
const add = {
    action: () => {
        form.reset();
        show.value = true;
    },
}

const form = useForm({
    service_id: '',
    user_id: '',
    date: '',
    payment: false,
    adults: '',
    boys: 0,
})

const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}

getServices()




const columns = [
    {
        field: 'service.title',
        header: 'Servicio',
        filter: true,
        sortable: true

    },
    {
        field: 'user.name',
        header: 'Usuario',
        filter: true,
        sortable: true
    },
    {
        field: 'date',
        header: 'Fecha',
        filter: true,
        sortable: true
    },
    {
        field: 'adults',
        header: 'Adultos',
        sortable: true
    },
    {
        field: 'boys',
        header: 'Niños',
        sortable: true
    },
    {
        field: 'total_price',
        header: 'Precio AV Colombia',
        type: 'currency',
        currency: 'COP',
        sortable: true
    },
    {
        field: 'total_price_sales',
        header: 'Precio de Venta',
        type: 'currency',
        currency: 'COP',
        filter: true,
        sortable: true
    },
    {
        field: 'status',
        header: 'Estado',
        filter: true, sortable: true, type: 'tag', filtertype: 'EQUALS',
        class: 'text-center uppercase',
        severitys: [
            { text: 'reservado', severity: 'info', class: '' },
            { text: 'CONSTRUCCIÓN', severity: 'success', class: '' },
            { text: 'DISEÑO', severity: 'info', class: '' },
            { text: 'GARANTIA', severity: 'warning', class: '' },
            { text: 'SERVICIO POSTVENTA', severity: 'success', class: '' },
            { text: 'SIN ESTADO', severity: 'danger', class: 'animate-pulse' }
        ]
    },
    {
        field: 'payment',
        header: 'Pago',
        sortable: true,
        filter: true,
        type: 'tag', filtertype: 'EQUALS',
        class: 'text-center uppercase',
        severitys: [
            { text: 'pendiente', severity: 'danger', class: '' },
        ]
    },

]



const loading = ref(false);

const reservar = (event) => {
    event.preventDefault();
    loading.value = true
    form.post(route('reservar'), {

        onSuccess: () => {
            toast.add({
                severity: 'success',
                summary: 'Reserva Realizada',
                detail: 'Tu reserva ha sido realizada con exito',
                life: 3000
            });
            loading.value = false;
            show.value = false;
        },
    })

}

</script>
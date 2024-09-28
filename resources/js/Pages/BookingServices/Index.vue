<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :add :columnas="columns"  :data="bookingServices" routecreate="services.create" 
                title="Reservas">
            </Datatable>
        </div>
    </AppLayout>
</template>
<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router, useForm, usePage } from '@inertiajs/vue3';
const add = {
    action: () => {
        router.visit(route('services.create'))
    },

}

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


const props = defineProps({
    bookingServices: Array
})

</script>
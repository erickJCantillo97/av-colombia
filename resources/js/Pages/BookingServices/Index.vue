<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :columnas="columns" :data="bookingServices" routecreate="services.create" 
                title="Servicios">
            </Datatable>
        </div>
    </AppLayout>
</template>
<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

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
        sortable: true,
        filter: true,
    },
    {
        field: 'payment',
        header: 'Pago',
        sortable: true,
        filter: true,
    },
    
]


const props = defineProps({
    bookingServices: Array
})

</script>
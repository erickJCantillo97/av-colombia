<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

const show = ref(false)

const form = useForm({
    payable_id: '',
    payable_type: 'App\\Models\\Service',
    method: '',
    amount: '',
    currency: 'COP',
})

const add = {
    action: () => {
        router.visit(route('services.create'))
    },
}


const columns = [
    {
        header: 'Servicio',
        field: 'user',
        filter: true,
    },
    {
        header: 'Metodo de Pago',
        field: 'method',
        filter: true,
    },
    {
        header: 'Monto',
        field: 'amount',
        type: 'currency',
        filter: true,
    },
    {
        header: 'Fecha',
        field: 'date',
        filter: true,
    },
   
    {
        header: 'Estado',
        field: 'status',
        filter: true,
    },

    
]

</script>

<template>
    <AppLayout title="Pagos">
        <div class="h-[99vh]">
            <Datatable :add :columnas="columns"
                title="Pagos">
            </Datatable>
        </div>
    </AppLayout>
</template>
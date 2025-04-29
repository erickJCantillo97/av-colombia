<template>
    <div class="h-[70vh] bg-gray-100">
        <Datatable title="Servicios Extras"  :columnas="columns" :actions="buttons"
            :data="bookingService.extras"></DataTable>
    </div>
    <ConfirmPopup></ConfirmPopup>
</template>
<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import { useConfirm } from 'primevue';
import { onMounted, ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { getSuccessMessage } from '@/composable/Toats';

const props = defineProps({
    bookingService: Object,
})

const columns = [
    {
        header: 'cantidad',
        field: 'cantidad',
        filter: true,
    },
    {
        header: 'Descripción',
        field: 'description',
        filter: true,
    },
    {
        header: 'Costo por unidad',
        field: 'unit_cost',
        filter: true,
        type: 'currency'
    },
    {
        header: 'Costo Total',
        field: 'total_cost',
        filter: true,
        type: 'currency'
    },
    {
        header: 'Precio por unidad',
        field: 'unit_price',
        filter: true,
        type: 'currency'
    },
    {
        header: 'Precio Total',
        field: 'total_price',
        filter: true,
        type: 'currency'
    },
]
const confirm = useConfirm();

const buttons = [
    {
        action: (data, event) => {

            confirm.require({
                target: event.currentTarget,
                message: "Seguro de Eliminar el Proveedor " + data.description + "?",
                icon: "fa-solid fa-exclamation-triangle",
                rejectClass: "p-button-secondary p-button-outlined p-button-sm",
                acceptClass: "p-button-sm p-button-danger",
                rejectLabel: "Cancelar",
                acceptLabel: "Eliminar",
                accept: async () => {
                    router.delete(route("BookingServiceExtras.destroy", data.id), {
                        onSuccess: () => {
                            getSuccessMessage("Proveedor Eliminado Correctamente");
                        },
                    });
                },
            });
        },
        severity: "danger",
        icon: "fa-regular fa-trash-can text-sm",
    },
    // { event: 'deleteClic', severity: 'danger', icon: 'fa-regular fa-trash-can', class: '!h-8', text: true, outlined: false, rounded: false, show: hasPermission('projects delete') },
];
</script>

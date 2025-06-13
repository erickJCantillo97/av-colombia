<template>
    <div class="h-[70vh] bg-gray-100">
        <Datatable title="Proveedores Asignados"  :columnas="columns" :actions="buttons"
            :data="bookingService.proveedors"></DataTable>
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
        header: 'Proveedor',
        field: 'proveedor.nombre',
        filter: true,
    },
    {
        header: 'Concepto',
        field: 'concept',
        filter: true,
    },
    {
        header: 'Costo',
        field: 'cost',
        filter: true,
        type: 'currency'
    }
]
const confirm = useConfirm();

const buttons = [
    {
        action: (data, event) => {
            confirm.require({
                target: event.currentTarget,
                message: "Seguro de Eliminar el Proveedor " + data.proveedor.nombre + "?",
                icon: "fa-solid fa-exclamation-triangle",
                rejectClass: "p-button-secondary p-button-outlined p-button-sm",
                acceptClass: "p-button-sm p-button-danger",
                rejectLabel: "Cancelar",
                acceptLabel: "Eliminar",
                accept: async () => {
                    router.delete(route("BookingServiceProveedors.destroy", data.id), {
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

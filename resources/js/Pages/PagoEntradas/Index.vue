<template>

    <Head title="Tiquetes"></Head>

    <AppLayout>
        <div class="p-4">
            <h2 class="text-lg font-semibold mb-2">Tickets Disponibles</h2>
            <div class="bg-white grid grid-cols-6 gap-4">
                <div v-for="(ticketType, index) in ticketTypes" :key="ticketType.id"
                    class="flex-col flex-grow rounded-lg shadow p-2 text-center" :class="getCardClass(index)">
                    <p :class="getTextClass(index)">{{ ticketType.name }}</p>
                    <p :class="getTextClass(index)">{{ ticketType.disponibles }}</p>
                </div>

                <!-- Card de fallback si no hay tipos de tickets -->
                <div v-if="ticketTypes.length === 0"
                    class="flex-col flex-grow rounded-lg shadow p-4 text-center bg-gray-100 border-2 border-dashed border-gray-300">
                    <p class="text-gray-500">No hay tipos de tickets</p>
                    <p class="text-gray-400 text-sm mt-1">Agrega tipos desde Configuración</p>
                </div>
            </div>
        </div>
        <div class="h-[40vh]">
            <Datatable :add :columnas="columns" :data="tickets" title="Movimientos de los tickets" :actions="buttons">
            </Datatable>
        </div>
        <Modal v-model="show" :title="isEditing ? 'Editar Ticket' : 'Comprar Tickets'" width="60vw">
            <TicketForm 
                :ticketTypes="ticketTypes" 
                :bookingServices="bookingServices"
                :editingTicket="editingTicket"
                :isEditing="isEditing"
                @ticket-created="handleTicketCreated" 
            />
        </Modal>
    </AppLayout>
    
    <ConfirmPopup></ConfirmPopup>
</template>
<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed } from 'vue';
import Datatable from '@/Components/Customs/Datatable.vue';
import Modal from "@/Components/Customs/Modal.vue";
import TicketForm from './TicketForm.vue';
import { Head, router } from '@inertiajs/vue3';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmPopup from "primevue/confirmpopup";

const show = ref(false);
const isEditing = ref(false);
const editingTicket = ref(null);

const confirm = useConfirm();
const toast = useToast();

const props = defineProps({
    pagoEntradas: Array,
    ticketTypes: {
        type: Array,
        default: () => []
    },
    tickets: {
        type: Array,
        default: () => []
    },
    bookingServices: {
        type: Array,
        default: () => []
    }
});

const add = {
    action: () => {
        isEditing.value = false;
        editingTicket.value = null;
        show.value = true;
    },
};

// Botones de acción para la tabla
const buttons = [
    {
        action: (data) => {
            isEditing.value = true;
            editingTicket.value = data;
            show.value = true;
        },
        severity: "secondary",
        icon: "fa-solid fa-pencil text-sm",
        tooltip: "Editar ticket"
    },
    {
        action: (data, event) => {
            confirm.require({
                target: event.currentTarget,
                message: `¿Seguro de eliminar este ticket de ${data.ticket_type?.name || 'tipo desconocido'}?`,
                icon: "fa-solid fa-exclamation-triangle",
                rejectClass: "p-button-secondary p-button-outlined p-button-sm",
                acceptClass: "p-button-sm p-button-danger",
                rejectLabel: "Cancelar",
                acceptLabel: "Eliminar",
                accept: () => {
                    router.delete(route("tickets.destroy", data.id), {
                        onSuccess: () => {
                            toast.add({
                                severity: "error",
                                icon: "fa-solid fa-trash-can",
                                summary: "¡Acción realizada!",
                                detail: "Ticket eliminado con éxito",
                                group: "customTooltipDataTable",
                                life: 5000,
                            });
                        },
                        onError: () => {
                            toast.add({
                                severity: "error",
                                icon: "fa-solid fa-exclamation-circle",
                                summary: "Error",
                                detail: "No se pudo eliminar el ticket",
                                group: "customTooltipDataTable",
                                life: 5000,
                            });
                        }
                    });
                },
            });
        },
        severity: "danger",
        icon: "fa-regular fa-trash-can text-sm",
        tooltip: "Eliminar ticket"
    },
];

// Columnas para la tabla de tickets
const columns = [
    {
        header: 'Tipo de Ticket',
        field: 'ticket_type.name',
        filter: true,
        type: 'text',
    },
    {
        header: 'Cantidad',
        field: 'cantidad',
        filter: true,
    },
    {
        header: 'Costo Total',
        field: 'costo_total',
        filter: true,
        type: 'currency',

    },
    {
        header: 'tipo de movimiento',
        field: 'tipo_movimiento',
        filter: true,
        type: 'text',
        type: "tag",
        class: "text-md uppercase",
        severitys: [
            { text: "entrada", severity: "success", class: "" },
        ],
        
    },
    {
        header: 'Fecha',
        field: 'created_at',
        filter: true,
        type: 'date',

    },
];

const handleTicketCreated = () => {
    show.value = false;
    isEditing.value = false;
    editingTicket.value = null;
    
    toast.add({
        severity: "success",
        icon: "fa-solid fa-check",
        summary: "¡Éxito!",
        detail: isEditing.value ? "Ticket actualizado con éxito" : "Ticket creado con éxito",
        group: "customTooltipDataTable",
        life: 3000,
    });
};

// Computed para el total de tickets (suma real de tickets)
const totalTickets = computed(() => {
    return props.tickets.reduce((total, ticket) => total + ticket.cantidad, 0);
});

// Función para obtener el conteo real de tickets por tipo
const getTicketCount = (ticketType) => {
    const ticketsForType = props.tickets.filter(ticket => ticket.ticket_type_id === ticketType.id);
    return ticketsForType.reduce((total, ticket) => total + (ticket.tipo_movimiento === 'entrada' ? ticket.cantidad : (ticket.cantidad*-1)), 0);
};

// Función para obtener las clases CSS de las cards (alternando colores)
const getCardClass = (index) => {
    const colors = [
        'bg-blue-100',
        'bg-green-100',
        'bg-yellow-100',
        'bg-purple-100',
        'bg-pink-100',
        'bg-indigo-100',
        'bg-red-100',
        'bg-gray-200'
    ];
    return colors[index % colors.length] || 'bg-gray-200';
};

// Función para obtener las clases de texto
const getTextClass = (index) => {
    const colors = [
        'text-blue-700',
        'text-green-700',
        'text-yellow-700',
        'text-purple-700',
        'text-pink-700',
        'text-indigo-700',
        'text-red-700',
        'text-gray-600'
    ];
    return colors[index % colors.length] || 'text-gray-600';
};

// Función para obtener las clases del badge
const getBadgeClass = (index) => {
    const colors = [
        'bg-blue-200 text-blue-800',
        'bg-green-200 text-green-800',
        'bg-yellow-200 text-yellow-800',
        'bg-purple-200 text-purple-800',
        'bg-pink-200 text-pink-800',
        'bg-indigo-200 text-indigo-800',
        'bg-red-200 text-red-800',
        'bg-gray-300 text-gray-700'
    ];
    return colors[index % colors.length] || 'bg-gray-300 text-gray-700';
};
</script>
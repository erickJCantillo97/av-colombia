<template>
    <div>
        <h2 class="text-lg font-bold mb-4">Tickets Asociados</h2>
        
        <!-- Resumen de la reserva -->
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
            <h3 class="font-semibold mb-2 text-blue-900 dark:text-blue-100">Resumen de Pasajeros</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                    <span class="text-gray-600 dark:text-gray-400">Adultos Nacionales:</span>
                    <span class="font-bold ml-2">{{ props.bookingService.adults_nacionales || 0 }}</span>
                </div>
                <div>
                    <span class="text-gray-600 dark:text-gray-400">Adultos Extranjeros:</span>
                    <span class="font-bold ml-2">{{ props.bookingService.adults_extranjeros || 0 }}</span>
                </div>
                <div>
                    <span class="text-gray-600 dark:text-gray-400">Niños Nacionales:</span>
                    <span class="font-bold ml-2">{{ props.bookingService.boys_nacionales || 0 }}</span>
                </div>
                <div>
                    <span class="text-gray-600 dark:text-gray-400">Niños Extranjeros:</span>
                    <span class="font-bold ml-2">{{ props.bookingService.boys_extranjeros || 0 }}</span>
                </div>
            </div>
        </div>
        
        <div class="text-gray-500" v-if="form.ticketType.length === 0">
            No hay tickets asociados a esta reserva.
        </div>
        
        <div v-for="value in form.ticketType" :key="value.type_id" class="mb-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold">{{ value.name }}</span>
                    <span class="text-sm text-gray-500">Disponibles: {{ value.disponibles }}</span>
                </div>
                <Input 
                    v-model="value.cant" 
                    type="number" 
                    min="0" 
                    suffix=" Entradas" 
                    :label="`Cantidad a asignar`" 
                    :max="getMaxTickets(value)"
                    @input="validateTicketAmount(value)"
                />
                <div v-if="value.cant > 0" class="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    Se asignarán {{ value.cant }} tickets de {{ value.name }}
                </div>
            </div>
        </div>
        
        <Button @click="submitForm" severity="success" class="w-full" :disabled="!isFormValid">
            Guardar y Asignar Tickets
        </Button>
    </div>
</template>

<script setup>

import Input from '@/Components/Customs/Input.vue';
import { router, useForm } from '@inertiajs/vue3';
import { Button } from 'primevue';
import { defineProps, ref, computed } from 'vue';
import { getErrorMessage, getSuccessMessage } from '@/composable/Toats';

const props = defineProps({
    bookingService: Object
});

const form = useForm({
    ticketType: [],
    bookingService: props.bookingService.id,
});

// Mapeo de tipos de ticket con las categorías de pasajeros
const ticketCategoryMap = {
    'Adultos Nacionales': 'adults_nacionales',
    'Adultos Extranjeros': 'adults_extranjeros',
    'Niños Nacionales': 'boys_nacionales',
    'Niños Extranjeros': 'boys_extranjeros'
};

function getTickets() {
    axios.get(route('get.ticket.types'))
        .then(response => {
            response.data.ticketTypes.filter(tt =>
                tt.services.some(s => s.id === props.bookingService.service_id)
            ).forEach(element => {
                // Inicializar con la cantidad correspondiente según el tipo
                const initialCant = getInitialQuantity(element.name);
                
                form.ticketType.push({
                    type_id: element.id,
                    name: element.name,
                    disponibles: element.disponibles,
                    cant: initialCant,
                    category: ticketCategoryMap[element.name] || null
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener los tipos de tickets:', error);
        });
}

// Obtener la cantidad inicial basada en el tipo de ticket
function getInitialQuantity(ticketName) {
    const categoryField = ticketCategoryMap[ticketName];
    if (categoryField && props.bookingService[categoryField]) {
        return props.bookingService[categoryField];
    }
    return 0;
}

// Obtener el máximo de tickets permitidos
function getMaxTickets(ticket) {
    const categoryField = ticket.category;
    if (categoryField && props.bookingService[categoryField]) {
        const passengerCount = props.bookingService[categoryField];
        return Math.min(passengerCount, ticket.disponibles);
    }
    return ticket.disponibles;
}

// Validar que la cantidad de tickets no exceda los pasajeros
function validateTicketAmount(ticket) {
    const maxAllowed = getMaxTickets(ticket);
    if (ticket.cant > maxAllowed) {
        ticket.cant = maxAllowed;
        getErrorMessage(`La cantidad máxima para ${ticket.name} es ${maxAllowed}`);
    }
}

// Validar que el formulario sea válido antes de enviar
const isFormValid = computed(() => {
    return form.ticketType.some(ticket => ticket.cant > 0);
});

getTickets();

const submitForm = () => {
    // Validar que no se intenten asignar más tickets de los necesarios
    let hasErrors = false;
    
    form.ticketType.forEach((ticketType) => {
        if (ticketType.cant > 0) {
            const maxAllowed = getMaxTickets(ticketType);
            if (ticketType.cant > maxAllowed) {
                hasErrors = true;
                getErrorMessage(`La cantidad de ${ticketType.name} excede el número de pasajeros`);
            }
        }
    });
    
    if (hasErrors) return;
    
    // Enviar solo los tickets con cantidad mayor a 0
    const ticketsToSubmit = form.ticketType.filter(ticket => ticket.cant > 0);
    
    if (ticketsToSubmit.length === 0) {
        getErrorMessage('Debe asignar al menos un ticket');
        return;
    }
    
    ticketsToSubmit.forEach((ticketType) => {
        router.post(route('pagoEntradas.storeTicket'), {
            ticket_type_id: ticketType.type_id,
            cantidad: ticketType.cant,
            costo_total: 0,
            tipo_movimiento: 'salida',
            booking_service_id: props.bookingService.id
        }, {
            onSuccess: () => {
                getSuccessMessage('Tickets asignados correctamente');
            },
            onError: (errors) => {
                console.error('Error al asignar tickets:', errors);
                getErrorMessage('Error al asignar los tickets');
            }
        });
    });
};

</script>

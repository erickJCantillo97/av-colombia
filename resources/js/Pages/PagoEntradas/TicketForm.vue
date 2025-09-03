<template>
    <div class="p-2">
        <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Tipo de Ticket -->
                <div>
                    <Input label="Tipo de Ticket" v-model="form.ticket_type_id" type="dropdown" option-value="id"
                        option-label="name" :options="ticketTypes" :error-message="form.errors.ticket_type_id"
                        placeholder="Selecciona un tipo de ticket" @value-change="calculateTotal" />
                </div>

                <!-- Cliente (Opcional) -->
                <div>
                    <Input label="Cliente (Opcional)" v-model="form.booking_service_id" type="dropdown"
                        option-value="id" option-label="client_name" :options="bookingServices"
                        :error-message="form.errors.booking_service_id" placeholder="Selecciona un cliente" />
                </div>

                <!-- Cantidad -->
                <div>
                    <Input label="Cantidad" v-model="form.cantidad" type="number" :min="1"
                        :error-message="form.errors.cantidad" placeholder="Ingresa la cantidad"
                        @input="calculateTotal" />
                </div>

                <!-- Precio por ticket -->
                <div>
                    <Input label="Precio por Ticket" v-model="precioUnitario" type="number" step="1000" :min="0"
                        placeholder="Precio por ticket" @input="calculateTotal" />
                </div>

                <!-- Tipo de Movimiento -->
                <div>
                    <Input label="Tipo de Movimiento" v-model="form.tipo_movimiento" type="dropdown" 
                        option-value="value" option-label="label" 
                        :options="[
                            { label: 'Entrada', value: 'entrada' },
                            { label: 'Salida', value: 'salida' }
                        ]"
                        :error-message="form.errors.tipo_movimiento" 
                        placeholder="Selecciona tipo de movimiento" />
                </div>
            </div>

            <!-- Costo Total (Calculado) -->
            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center">
                    <span class="text-lg font-medium text-gray-700">Costo Total:</span>
                    <span class="text-2xl font-bold text-green-600">
                        ${{ formatCurrency(form.costo_total) }}
                    </span>
                </div>
                <div class="text-sm text-gray-500 mt-1">
                    {{ form.cantidad || 0 }} tickets × ${{ formatCurrency(precioUnitario) }}
                </div>
            </div>

            <!-- Resumen del ticket seleccionado -->
            <div v-if="selectedTicketType" class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Resumen del Ticket</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-blue-600 font-medium">Tipo:</span>
                        <span class="ml-2">{{ selectedTicketType.name }}</span>
                    </div>
                    <div>
                        <span class="text-blue-600 font-medium">Servicios asociados:</span>
                        <span class="ml-2">{{ selectedTicketType.services?.length || 0 }}</span>
                    </div>
                </div>
                <div v-if="selectedTicketType.services?.length > 0" class="mt-2">
                    <span class="text-blue-600 font-medium text-sm">Servicios:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                        <span v-for="service in selectedTicketType.services" :key="service.id"
                            class="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {{ service.title }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-end space-x-3 pt-4 border-t">
                <Button type="button" label="Cancelar" severity="secondary" outlined @click="$emit('close')" />
                <Button 
                    type="submit" 
                    :label="isEditing ? 'Actualizar Ticket' : 'Comprar Tickets'" 
                    severity="success" 
                    :icon="isEditing ? 'fa-solid fa-save' : 'fa-solid fa-shopping-cart'"
                    :loading="form.processing" 
                />
            </div>
        </form>
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { computed, ref, watch, onMounted } from 'vue';
import Input from '@/Components/Customs/Input.vue';
import Button from 'primevue/button';

const props = defineProps({
    ticketTypes: Array,
    bookingServices: Array,
    editingTicket: Object,
    isEditing: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['ticket-created', 'close']);

const precioUnitario = ref(10000); // Precio base por defecto

const form = useForm({
    ticket_type_id: null,
    booking_service_id: null,
    cantidad: 1,
    costo_total: 0,
    tipo_movimiento: 'entrada'
});

const selectedTicketType = computed(() => {
    return props.ticketTypes.find(type => type.id === form.ticket_type_id);
});

const calculateTotal = () => {
    const cantidad = parseInt(form.cantidad) || 0;
    const precio = parseFloat(precioUnitario.value) || 0;
    form.costo_total = cantidad * precio;
};

const formatCurrency = (value) => {
    return parseFloat(value || 0).toLocaleString('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

const submitForm = () => {
    if (props.isEditing && props.editingTicket) {
        // Actualizar ticket existente
        form.put(route('tickets.update', props.editingTicket.id), {
            onSuccess: () => {
                emit('ticket-created');
                resetForm();
            },
            onError: (errors) => {
                console.error('Error al actualizar ticket:', errors);
            }
        });
    } else {
        // Crear nuevo ticket
        form.post(route('pagoEntradas.storeTicket'), {
            onSuccess: () => {
                emit('ticket-created');
                resetForm();
            },
            onError: (errors) => {
                console.error('Error al crear ticket:', errors);
            }
        });
    }
};

const resetForm = () => {
    form.reset();
    precioUnitario.value = 10000;
};

// Llenar el formulario cuando se esté editando
onMounted(() => {
    if (props.isEditing && props.editingTicket) {
        form.ticket_type_id = props.editingTicket.ticket_type_id;
        form.booking_service_id = props.editingTicket.booking_service_id;
        form.cantidad = props.editingTicket.cantidad;
        form.costo_total = props.editingTicket.costo_total;
        form.tipo_movimiento = props.editingTicket.tipo_movimiento;
        
        // Calcular precio unitario basado en los datos existentes
        if (props.editingTicket.cantidad > 0) {
            precioUnitario.value = props.editingTicket.costo_total / props.editingTicket.cantidad;
        }
    } else {
        resetForm();
    }
});

// Calcular total cuando cambie la cantidad o precio
watch([() => form.cantidad, precioUnitario], calculateTotal);

// Calcular total inicial
calculateTotal();
</script>

<template>
    <div>
        <h2 class="text-lg font-bold mb-4">Tickets Asociados</h2>
        <div class="text-gray-500" v-if="form.ticketType.length === 0">
            No hay tickets asociados a esta reserva.
        </div>
        <div v-for="value in form.ticketType" :key="value.type_id" class="mb-4 grid grid-cols-3 gap-4">

            <Input v-model="value.cant" type="number" min="0" suffix=" Entradas" :label="`Cantidad de ${value.name}`" />

        </div>
        <Button @click="submitForm" severity="success" class="w-full">Guardar</Button>
    </div>
</template>

<script setup>

import Input from '@/Components/Customs/Input.vue';
import { useForm } from '@inertiajs/vue3';
import { Button } from 'primevue';
import { defineProps, ref } from 'vue';



const props = defineProps({
    bookingService: Object
});

const form = useForm({
    ticketType: [],
    bookingService: props.bookingService.id,
});

function getTickets() {
    axios.get(route('get.ticket.types'))
        .then(response => {
            response.data.ticketTypes.filter(tt =>
                tt.services.some(s => s.id === props.bookingService.service_id)
            ).forEach(element => {
                form.ticketType.push({
                    type_id: element.id,
                    name: element.name,
                    cant: 0
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener los tipos de tickets:', error);
        });
}

getTickets();

</script>

<template>
    <div class="flex flex-col gap-y-3 text-xs p-4" v-if="tickets.length != 0">
            <strong class="">Tickets con pocas unidades</strong>
            <!-- <span v-if="tickets.length == 0">No hay tickets con pocas unidades disponibles</span> -->
            <ul class="flex flex-col gap-5">
              <li v-for="ticket in tickets" :key="ticket.id" class="py-2 px-4 bg-amber-200 rounded-md shadow-md shadow-red-200 text-amber-700 flex flex-col justify-center items-center ">
                <div>
                  <strong>{{ ticket.name }}</strong>
                </div>
                <div class="font-bold">
                  {{ ticket.disponibles }} <span class="text-xs">Disponibles</span>
                </div>
              </li>
            </ul>
        
        </div>
</template>
<script setup>
import { ref } from 'vue';


const tickets = ref([]);
const getTickets = async (id) => {
  const { data } = await axios.get(route("get.ticket.types"));
  tickets.value = data.ticketTypes.filter(item => item.disponibles < 5);
};

getTickets();
</script>
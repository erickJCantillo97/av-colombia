<template>
 <div  :class="`${reservas.color} ${reservas.value.length > 0 ? 'cursor-pointer' : 'hidden'
            } `"
            class="rounded-lg py-2 border w-full flex flex-col gap-y-1 items-center font-bold cursor-pointer scale-90 hover:scale-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
            <h1>{{ reservas.name }}</h1>
            <div class="flex gap-2 divide-x-4 divide-white items-center">
                <p class="p-1">{{ reservas.value.length }} Reservas</p>
                <p class="p-1 pl-3">
                    {{ getTotalPaxByReservas(reservas.value) }} Pasajeros
                </p>
            </div>
            <p>
                {{
                    currencyFormat(getTotalCostByReservas(reservas.value))
                }}
            </p>
        </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
    reservas: Array,
});


import { currencyFormat ,  getTotalPaxByReservas, getTotalCostByReservas } from '@/composable/useCommonUtilities';



</script>
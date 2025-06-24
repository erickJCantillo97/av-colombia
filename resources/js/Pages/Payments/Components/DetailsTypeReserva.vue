<template>
    <div class="flex justify-between gap-x-4">
        <ItemDetailTypeReserva v-for="reservas in reservasType" :key="reservas.name"
            :reservas="reservas" @click="toggle($event, reservas)" :proveedor="proveedor" />
    </div>
    <Popover ref="op">
        <div class="flex flex-col gap-4">
            <div>
                <span class="font-medium block mb-2">{{ reservas.name }} </span>
                <div class="w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2">
                    <div @click="value = op.value" v-for="op in options"
                        class="w-full rounded-lg text-center py-2 text-sm md:text-md cursor-pointer"
                        :class="value == op.value ? 'bg-white' : 'hover:bg-white/30'">
                        {{ op.name }}
                    </div>
                </div>
                <div class="flex flex-col gap-y-2 h-64 overflow-auto">
                    <div v-if="value == 1">
                        <div class="flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"
                            v-for="(grupo, index) in groupReservas">
                            <div class="flex flex-col">
                                <span class="font-bold flex items-center gap-x-2">
                                    <p>
                                        {{ index }}
                                    </p>
                                </span>
                                <span class="text-xs">{{ grupo.count }} Reservas</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">{{ grupo.pasajeros }} Pasajeros</span>
                                <span class="font-bold">{{ currencyFormat(grupo.total) }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="value == 2">
                        <div class="flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"
                            v-for="member in reservas.value">
                            <div class="flex flex-col">
                                <span class="font-bold flex items-center gap-x-2">
                                    <p>
                                        {{ member.title }}
                                    </p>
                                </span>
                                <span class="text-xs">{{ member.cliente_name }} <span class="px-1.5 py-0.5 border border-red-700 text-red-700 rounded-lg" v-if="member.proveedors.find((x) => x.proveedor_id == proveedor).discount > 0"> - {{ currencyFormat(member.proveedors.find((x) => x.proveedor_id == proveedor).discount) }}</span></span>
                                <span class="text-xs">{{ member.fecha }}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">{{ member.adults }} Pasajeros</span>
                                <span class="font-bold">{{
                                    currencyFormat(
                                        member.proveedors
                                    .filter((x) => x.proveedor_id == proveedor)
                                            .reduce((a, c) => a + c.cost_total, 0)
                                    )
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Popover>
</template>
<script setup>
import { currencyFormat } from '@/composable/useCommonUtilities';
import ItemDetailTypeReserva from './ItemDetailTypeReserva.vue';


import { ref } from 'vue';
const value = ref(1);
const options = [
    { name: "Agrupados", value: 1 },
    { name: "Detalles", value: 2 },
];
const op = ref();

const props = defineProps({
    reservasType: {
        type: Array,
        required: true,
    },
    proveedor: {
        type: [Number, String],
        required: true,
    }
});

const reservas = ref([]);
const groupReservas = ref([]);

const toggle = (event, r) => {
    groupReservas.value = r.value.reduce((acc, curr) => {
        const title = curr.title;
        if (!acc[title]) {
            acc[title] = { count: 0, pasajeros: 0, total: 0 };
        }
        acc[title].count += 1;
        acc[title].pasajeros += curr.adults;
        acc[title].total += curr.proveedors
            .filter((x) => x.proveedor_id == props.proveedor)
            .reduce((a, c) => a + c.cost_total, 0);
        return acc;
    }, {});
    reservas.value = r;
    op.value.toggle(event);
};

</script>
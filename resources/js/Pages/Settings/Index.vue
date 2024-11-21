<template>
    <AppLayout title="Configuración General">
        <div class="p-4">
            <h1 class="text-xl font-extrabold ">
                Configuración General
            </h1>
            <div data-aos="flip-down" data-aos-duration="1000" class="bg-white p-2 rounded-lg shadow-lg">
                <div class="w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2">
                    <div @click="value = op.value" v-for="op in options"
                        class="w-full rounded-lg text-center py-2 text-sm md:text-md  cursor-pointer "
                        :class="value == op.value ? 'bg-white' : 'hover:bg-white/30'">
                        {{ op.name }}
                    </div>
                </div>
                <PaymentMethods v-if="value == 1" />
                <div v-else-if="value == 3" class="p-4">
                    <h1 class="text-xl font-extrabold ">
                        Dolar
                    </h1>
                    <Input type="number" label="Valor del Dolar" />
                    <div class="flex justify-end mt-4">
                        <Button label="Guardar" severity="success" class="!h-9 justify-end" />
                    </div>
                </div>
                <div v-else-if="value == 2">
                    <Index :users />
                </div>
                <div v-else-if="value == 4">
                    <Channels />
                </div>

            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import Input from '@/Components/Customs/Input.vue';
import PaymentMethods from '@/Components/PaymentMethods.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
import Index from './Users/Index.vue';
import Channels from './Channels.vue';
const value = ref(1);

const props = defineProps({
    users: {
        type: Array,
        default: [],
    },
});

const options = [
    { name: 'Métodos de Pago', value: 1 },
    { name: 'Usuarios', value: 2 },
    { name: 'Canales', value: 4 },
    { name: 'Tasas', value: 3 },
];


</script>
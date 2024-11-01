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
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import PaymentMethods from '@/Components/PaymentMethods.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
const value = ref(1);



</script>
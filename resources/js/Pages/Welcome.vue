<script setup>
import { Head, Link } from '@inertiajs/vue3';
import axios from 'axios';
import { ref } from 'vue';
import FsLightbox from "fslightbox-vue/v3";
import Input from '@/Components/Customs/Input.vue';
import Header from '@/Components/Sections/Header.vue';
import Banner from '@/Components/Sections/Banner.vue';
import Experiencias from '@/Components/SearchEngines/Experiencias.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';


const toggler = ref(false)
defineProps({
    canLogin: {
        type: Boolean,
    }
});
const services = ref([]);
const servicesFilter = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}
const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

getServices();



const value = ref({ name: 'Option 1', value: 1 });
const options = ref([
    { name: 'Experiencias', value: 1 },
    { name: 'Alojamiento', value: 2 },
    { name: 'Transporte', value: 3 },
    { name: 'Embarcaciones', value: 4 }
]);

const changeMotor = (motor) => {
    value.value = motor;
}

</script>

<template>

    <GuestLayout>
        <div class="flex justify-center w-full h-[55vh] py-4">
            <div class="shadow-2xl flex flex-col items-center rounded-lg p-5 w-[90vw] px-28 h-full"
                style="background-image: url('/images/cartagena.webp');background-size: cover;background-position: center;">
                <!-- <img src="/images/cartagena.webp" class="w-[90vw] h-[70vh] object-cover absolute " alt=""> -->
                <div class="py-10 space-y-16 mt-4 w-full">
                    <h1 data-aos="zoom-in-down" data-aos-duration="2000"
                        class="text-center text-6xl text-white font-extrabold">
                        Busca la mejor experiencia para ti
                    </h1>
                    <div data-aos="flip-down" data-aos-duration="1000" class="bg-white p-2 rounded-lg shadow-lg">
                        <div class="w-full bg-gray-200 rounded-md p-2 flex space-x-2">
                            <div @click="changeMotor(op)" v-for="op in options"
                                class="w-full rounded-full text-center py-2 text-md  cursor-pointer "
                                :class="value.value == op.value ? 'bg-white' : 'hover:bg-white/30'">
                                {{ op.name }}
                            </div>
                        </div>
                        <Experiencias />
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white w-full px-10">
            <div class="px-4 py-16 sm:px-6 sm:py-24 mx-auto lg:px-1">
                <h2 class="text-xl font-bold text-gray-900">Destacados del mes</h2>

                <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    <div v-for="product in services" :key="product.id">
                        <div class="relative">
                            <div class="relative h-72 w-full overflow-hidden rounded-lg">
                                <img :src="product.images[0].filepath" :alt="product.imageAlt"
                                    class="h-full w-full object-cover object-center" />
                            </div>
                            <div class="relative mt-4">
                                <h3 class="text-sm font-medium text-gray-900">{{ product.title }}</h3>
                                <p class="mt-1 text-sm text-gray-500 text-nowrap text-clip overflow-hidden  w-full"
                                    v-html="product.description">
                                </p>
                            </div>
                            <div
                                class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                <div aria-hidden="true"
                                    class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                <p class="relative text-lg font-semibold text-white">{{ USDollar.format(product.price)
                                    }}
                                </p>
                            </div>
                        </div>
                        <div class="mt-6">
                            <a :href="product.href"
                                class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 cursor-pointer">Reservar<span
                                    class="sr-only">, {{ product.name }}</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>

</template>

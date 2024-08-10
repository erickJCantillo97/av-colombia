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
import ProductCard from '@/Components/Sections/ProductCard.vue';


const toggler = ref(false)
defineProps({
    canLogin: {
        type: Boolean,
    }
});
const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}


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
        <div class="md:flex justify-center w-full h-[55vh] py-4 hidden">
            <div class=" shadow-2xl shadow-gray-700 flex flex-col items-center rounded-lg md:p-5 w-[98vw] md:w-[90vw] md:px-28 h-full"
                style="background-image: url('/images/cartagena.webp');background-size: cover;background-position: center;">
                <!-- <img src="/images/cartagena.webp" class="w-[90vw] h-[70vh] object-cover absolute " alt=""> -->
                <div class="py-10 space-y-10 mt-4 w-full">
                    <h1 data-aos="zoom-in-down" data-aos-duration="2000"
                        class="text-center text-3xl lg:text-6xl text-white font-extrabold">
                        Busca la mejor experiencia para ti
                    </h1>
                    <div data-aos="flip-down" data-aos-duration="1000" class="bg-white p-2 rounded-lg shadow-lg">
                        <div class="w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2">
                            <div @click="changeMotor(op)" v-for="op in options"
                                class="w-full rounded-full text-center py-2 text-sm md:text-md  cursor-pointer "
                                :class="value.value == op.value ? 'bg-white' : 'hover:bg-white/30'">
                                {{ op.name }}
                            </div>
                        </div>
                        <Experiencias v-if="value.value == 1" />
                    </div>
                </div>
            </div>
        </div>
        <div class="md:hidden fixed w-full -mt-2 bg-gray-700 p-4 rounded-b">
            <h1 class="text-white font-bold text-lg">Buscar Experiencias en Cartagena</h1>
            <Experiencias  v-if="value.value == 1" />
        </div>
        <div class="bg-white w-full mt-36 md:mt-0 z-30">
            <div class="px-4 py-2 sm:px-6 sm:py-10 mx-auto lg:px-1">
                <div class="flex justify-between">
                    <h2 class="text-xl font-bold text-gray-900">Destacados del mes</h2>
                    <Link class="text-indigo-500 text-md space-x-1 hover:space-x-3 flex items-center">
                    <div>Ver todas</div>
                    <di class="fa-solid fa-arrow-right"></di>
                    </Link>
                </div>

                <div class="mt-2 grid grid-cols-1 gap-y-2 -mx-4 md:gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    <ProductCard v-for="product in services" :key="product.id" :product="product" />
                    <ProductCard v-for="product in services" :key="product.id" :product="product" />
                    <ProductCard v-for="product in services" :key="product.id" :product="product" />
                    <ProductCard v-for="product in services" :key="product.id" :product="product" />
                    <ProductCard v-for="product in services" :key="product.id" :product="product" />
                    <ProductCard v-for="product in services" :key="product.id" :product="product" />
                    <ProductCard v-for="product in services" :key="product.id" :product="product" />
                </div>
                
            </div>
        </div>
    </GuestLayout>

</template>

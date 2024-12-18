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
import ExperienceCard from '@/Components/Items/ExperienceCard.vue';
import ExperienceMiniCard from '@/Components/Items/ExperienceMiniCard.vue';

const toggler = ref(false)
defineProps({
    canLogin: {
        type: Boolean,
    }
});
const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.filter((x) => x.type == 'TOUR').slice(0, 6);
    });
}


getServices();



const value = ref({ name: 'Experiencias y Tours', value: 1 });

const options = ref([
    { name: 'Experiencias y Tours', value: 1 },
    // { name: 'Alojamiento', value: 2 },
    { name: 'Transporte', value: 3 },
    { name: 'Embarcaciones', value: 4 }
]);

const changeMotor = (motor) => {
    value.value = motor;
}

</script>

<template>

    <GuestLayout>

        <div class="flex justify-center w-full h-[60vh] py-4">
            <div class="shadow-2xl shadow-gray-700 flex flex-col items-center rounded-lg md:p-5 w-[90vw] px-2 md:px-12 h-full"
                style="background-image: url('/images/cartagena.webp');background-size: cover;background-position: center;">
                <!-- <img src="/images/cartagena.webp" class="w-[90vw] h-[70vh] object-cover absolute " alt=""> -->
                <div class="py-10 space-y-10 mt-4 w-full">
                    <h1 data-aos="zoom-in-down" data-aos-duration="2000"
                        class="text-center text-3xl lg:text-6xl text-white font-extrabold">
                        Bienvenido a AV Colombia
                    </h1>
                    <h3>
                        <p data-aos="zoom-in-down" data-aos-duration="2000"
                            class="text-center text-lg lg:text-3xl text-white font-bold">
                            Encuentra las mejores experiencias
                        </p>
                    </h3>
                    <div data-aos="flip-down" data-aos-duration="1000" class="bg-white p-2 rounded-lg shadow-lg">
                        <Experiencias :type="value.name" />
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white w-full px-0 md:px-10 mt-44 md:mt-0 z-30">
            <div class="px-4 py-2 sm:px-6 sm:py-10 mx-auto lg:px-1">
                <div class="flex justify-between">
                    <h2 class="text-xl font-bold text-gray-900">Vive nuestras Experiencias</h2>
                    <Link :href="route('services.home')"
                        class="text-indigo-500 text-md space-x-1 hover:space-x-3 flex items-center">
                    <div>Ver todas</div>
                    <i class="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
                <div class="flex w-full space-x-2 overflow-x-auto py-2 justify-center ">
                    <ExperienceMiniCard :class="'w-1/2 lg:w-1/' + services.length > 6 ? 6 : services.length"
                        v-for="product in services" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
        <!-- <div class="bg-white w-full px-0 md:px-10 border-t md:mt-0 z-30">
            <div class="px-4 py-2 sm:px-6 sm:py-10 mx-auto lg:px-1">
                <div class="flex justify-between ">
                    <h2 class="text-xl font-bold text-gray-900">Todas nuestras experiencias</h2>
                </div>

                <div class="mt-2 grid grid-cols-1 gap-y-2 -mx-4 md:gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    <ExperienceCard v-for="product in services" :key="product.id" :product="product" />
                </div>
                
            </div>
        </div> -->
    </GuestLayout>

</template>

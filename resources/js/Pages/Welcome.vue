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
        services.value = response.data.services;
        servicesFilter.value = services.value;
    });
}
const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

getServices();

const images = ref();
const getImage = (service) => {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(randomNumber);

    var url = `https://api.unsplash.com/search/photos?page=${randomNumber}&query=cartagena&per_page=1&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k`;
    axios.get(url).then((res) => {
        console.log(res);
        let rawImageUrl = res.data.results[0].urls.raw;
        // Modificar la URL para incluir los parámetros de tamaño
        let sizedImageUrl = `${rawImageUrl}&w=100&h=100`;
        images.value = sizedImageUrl;
    });
};

getImage();
const search = ref('')
const filterElements = () => {
    servicesFilter.value = []
    servicesFilter.value = services.value.filter((service) => service.title.toLowerCase().includes(search.value.toLowerCase()))
}

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
        <div class="flex justify-center w-full h-[65vh] py-4">
            <div class="shadow-2xl flex flex-col items-center rounded-lg p-5 w-[90vw] h-full"
                style="background-image: url('/images/cartagena.webp');background-size: cover;background-position: center;">
                <!-- <img src="/images/cartagena.webp" class="w-[90vw] h-[70vh] object-cover absolute " alt=""> -->
                <div class="py-10 space-y-16 mt-4">
                    <h1 data-aos="zoom-in-down" data-aos-duration="2000" class="text-center text-6xl text-white font-extrabold">
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
    </GuestLayout>

</template>

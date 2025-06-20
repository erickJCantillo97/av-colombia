<template>
    <div>
        <div class="flex flex-col md:flex-row justify-between py-10 px-4 md:px-20 mt-32 md:mt-4">
            <p
                class="text-2xl md:text-3xl font-bold border-t-4 border-black placeholder-vtd-primary-100 pt-8 md:pr-32 justify-between">
                Nuestros Servicios <br class="hidden md:block"> para ti
            </p>
            <div
                class="text-justify md:mr-14 text-sm md:text-xl font-extralight w-full md:w-1/3 text-gray-500 pt-5 md:pt-10">
                Explora nuestras opciones de servicios, encontraras todo lo necesario para tu estancia en Colombia
            </div>

        </div>
        <div class="w-full flex flex-col md:flex-row items-start justify-start gap-2 md:gap-10 p-4 px-10 md:px-10">
            <div v-for="(service, index) in servicesType" @click="openDrawer(service.type)" class="flex efect hover:scale-105 item flex-col w-full p-5 md:pt-10 shadow-xl hover:bg-gray-800
                hover:text-white group">
                <h3 class="font-bold text-2xl md:text-3xl">{{ service.name }}</h3>
                <div class="size-2 border-2 mt-8 group-hover:bg-gray-100">
                </div>
                <p class="mt-4 text-justify">
                    {{ service.text }}
                </p>
                <p class="mt-10 text-right text-xl font-bold mb-4 flex items-center justify-end gap-x-2">
                    <span>
                        {{ service.textButton }}
                    </span>
                    <i class="fa-solid fa-caret-right"></i>
                </p>
            </div>
        </div>

        <Drawer :pt="{
            root: '!bg-slate-900 !animate-flip !animate-once !animate-duration-500',
        }" v-model:visible="visible" position="full">
            <div class="text-white flex flex-col items-center justify-center">
                <!-- <h1 class="text-6xl font-bold">Experiencias</h1> -->
                <div class="flex flex-col md:flex-row items-start justify-between w-full">
                    <div class="w-full p-10 flex flex-col items-start justify-start gap-10">
                        <h2 class="text-4xl md:text-5xl font-extrabold">Experiencias y tours</h2>
                        <p class="text-justify text-gray-100 text-lg md:pr-52">
                            En AV Colombia te ofrecemos las mejores experiencias para que disfrutes de tu estancia en
                            Colombia
                            al máximo.
                            Vive las mejores experiencias en Colombia,
                            conoce los mejores lugares y disfruta de la
                            cultura
                            y la gastronomía de nuestro país.
                        </p>
                        
                    </div>
                    <video loop autoplay class="rounded-lg h-[45vh] hidden md:block">
                        <source src="https://avcolombia.net/videos/cartagena.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="w-full space-x-2 py-2 justify-center mt-6 " v-if="services.length > 0">
                    <Carousel :pt="{
                        indicator: '!hidden',
                        pcNextButton: {
                            root: '!bg-white !rounded-full',
                        }
                    }" :value="services" :numVisible="5" :numScroll="2" :responsiveOptions="responsiveOptions" circular
                        :autoplayInterval="3000">
                        <template #item="slotProps">
                            <Link :href="route('show.services', slotProps.data.slug)"
                                class="flex flex-col items-start mx-2 gap-y-2 justify-start  rounded-md text-black">
                            <img :src="slotProps.data.portada == '/laravel/public/' ? 'https://avcolombia.net/images/logo.webp' : slotProps.data.portada"
                                alt="" class="object-cover h-52 w-full rounded-md">
                            <div class="mt-1 flex  items-center justify-start gap-2">
                                <div class="size-2 border-2 border-withe">
                                </div>
                                <h1 class="text-md font-bold w-full capitalize text-white ">
                                    {{ slotProps.data.title }}
                                </h1>
                            </div>
                            </Link>
                        </template>
                    </Carousel>
                    <!-- <div v-for="service in services" class="p-5 bg-gray-200 rounded-md text-black">
                        {{ service.title }}
                    </div> -->
                </div>

            </div>
        </Drawer>
    </div>
</template>
<script setup>
import ExperienceMiniCard from '@/Components/Items/ExperienceMiniCard.vue';
import { Link } from '@inertiajs/vue3';
import axios from 'axios';
import { ref } from 'vue';

const visible = ref(false);
const title = ref('')
const services = ref([]);

const openDrawer = (t) => {
    title.value = t;
    visible.value = true;
    if (t == 'TOUR') {
        axios.get(route('get.all.services')).then((response) => {
            services.value = response.data.services.filter(service => service.type === 'TOUR');
        });
    }
    if(t == 'BOAT') {
        axios.get(route('get.all.services')).then((response) => {
            services.value = response.data.services.filter(service => service.type === 'EMBARCACION');
        });
    }
}


const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 5,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const servicesType = ref([
    {
        type: 'TOUR',
        name: 'Tours',
        text: 'Vive las mejores experiencias en Colombia, conoce los mejores lugares y disfruta de la cultura y la gastronomía de nuestro país.',
        textButton: 'Ir a Disfrutar'

    },
    {
        type: 'TRANSPORT',
        name: 'Transportes',
        text: 'Vive las mejores experiencias en Colombia, conoce los mejores lugares y disfruta de la cultura y la gastronomía de nuestro país.',
        textButton: 'Transportes Seguros'

    },
    {
        type: 'ACCOMMODATION',
        name: 'Alojamientos',
        text: 'Vive las mejores experiencias en Colombia, conoce los mejores lugares y disfruta de la cultura y la gastronomía de nuestro país.',
        textButton: 'Ir a Alojamientos'

    },
    {
        type: 'BOAT',
        name: 'Embarcaciones',
        text: 'Vive las mejores experiencias en Colombia, conoce los mejores lugares y disfruta de la cultura y la gastronomía de nuestro país.',
        textButton: 'Ver Embarcaciones'
    }

]);



</script>
<style>
.efect {
    position: relative;
    overflow: hidden;
    display: inline-block;
}

/* Efecto de animación */
.efect::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: #084975;

    /* Color de la animación */
    transition: left 0.5s ease-in-out;
}

.efect:hover::after {
    left: 100%;
}

.contenedor {
    display: flex;
    justify-content: flex-start;
    /* Alinea los elementos al inicio del contenedor */
    align-items: flex-start;
    /* Alinea los elementos en la parte superior */
    gap: 20px;
    /* Añade espacio entre los elementos */
}

.item {
    cursor: pointer;
    border-radius: 10px;
    /* Establece una altura fija para todos los elementos */
}
</style>
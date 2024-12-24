<template>
    <div>
        <div class="flex justify-between py-10 px-20 ">
            <p
                class="text-3xl font-bold border-t-4 border-black placeholder-vtd-primary-100 pt-8 pr-32 justify-between">
                Nuestros Servicios <br> para ti
            </p>
            <div class="text-justify mr-14 text-xl font-extralight w-1/3 text-gray-500 pt-10">
                Explora nuestras opciones de servicios, encontraras todo lo necesario para tu estancia en Colombia
            </div>

        </div>
        <div class="w-full flex items-start justify-start gap-10 p-20">
            <div @click="openDrawer('Experiencias')"
                class="flex efect hover:scale-105 item flex-col w-full px-5 pt-20 shadow-xl hover:bg-gray-800  hover:text-white group mb-10">
                <h3 class="font-bold text-6xl">Experiencias</h3>
                <div class="size-2 border-2 mt-8 group-hover:bg-gray-100">
                </div>
                <p class="mt-4 text-justify">
                    Vive las mejores experiencias en Colombia, conoce los mejores lugares y disfruta de la cultura y la
                    gastronomía de nuestro país.
                </p>
                <p class="mt-10 text-right text-xl font-bold mb-4 flex items-center justify-end gap-x-2">
                    <span>
                        Ir a Disfrutar
                    </span>
                    <i class="fa-solid fa-caret-right"></i>
                </p>
            </div>
            <div
                class="flex efect item mt-10 flex-col w-full px-5 py-20 shadow-xl hover:bg-gray-800  hover:text-white group mb-10">
                <h1 class="font-bold text-6xl">Transportes</h1>
                <div class="size-2 border-2 mt-8 group-hover:bg-gray-100">
                </div>
                <p class="mt-4 text-justify">
                    Vive las mejores experiencias en Colombia, conoce los mejores lugares y disfruta de la cultura y la
                    gastronomía de nuestro país.
                </p>
            </div>
            <div
                class="flex efect item mt-20 flex-col w-full px-5 py-20 shadow-xl hover:bg-gray-800  hover:text-white group mb-10">
                <h1 class="font-bold text-6xl">Alojamientos</h1>
                <div class="size-2 border-2 mt-8 group-hover:bg-gray-100">
                </div>
                <p class="mt-4 text-justify">
                    Vive las mejores experiencias en Colombia, conoce los mejores lugares y disfruta de la cultura y la
                    gastronomía de nuestro país.
                </p>
            </div>
            <div
                class="flex efect item mt-32 flex-col w-full px-5 py-20 shadow-xl hover:bg-gray-800  hover:text-white group mb-10">
                <h1 class="font-bold text-6xl">Embarcaciones</h1>
                <div class="size-2 border-2 mt-8 group-hover:bg-gray-100">
                </div>
                <p class="mt-4 text-justify">
                    Vive las mejores experiencias en Colombia, conoce los mejores lugares y disfruta de la cultura y la
                    gastronomía de nuestro país.
                </p>
            </div>

        </div>

        <Drawer :pt="{
            root: '!bg-slate-900 !animate-flip !animate-once !animate-duration-500',
            header: '!hidden',
        }" v-model:visible="visible" :header="title" position="full">
            <div class="text-white  flex flex-col items-center justify-center">
                <!-- <h1 class="text-6xl font-bold">Experiencias</h1> -->
                <div class="flex items-start justify-between w-full mt-10">
                    <div class="w-full p-10 flex flex-col items-start justify-start gap-10">
                        <h2 class="text-6xl font-extrabold">Experiencias y tours</h2>
                        <p class="text-justify text-gray-100 text-lg pr-52">
                            En AV Colombia te ofrecemos las mejores experiencias para que disfrutes de tu estancia en
                            Colombia
                            al máximo.
                            Vive las mejores experiencias en Colombia,
                            conoce los mejores lugares y disfruta de la
                            cultura
                            y la gastronomía de nuestro país.
                        </p>
                        <button
                            class="p-3 hover:pr-8 bg-lime-300 text-black text-lg font-bold rounded-lg mt-10 flex items-center gap-x-5 group">
                            <span>
                                Contactar un Vendedor
                            </span>
                            <i class="fa-solid fa-right-long group-hover:translate-x-4"></i>
                        </button>

                    </div>
                    <video loop autoplay class="rounded-lg h-[45vh]">
                        <source src="https://avcolombia.net/videos/cartagena.mp4" type="video/mp4"> >
                    </video>
                </div>
                <!-- {{ services }} -->
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

    if (t == 'Experiencias') {
        axios.get(route('get.services'), {
            type: 'TOUR'
        }).then((response) => {
            services.value = response.data.services;
            console.log(response.data);
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
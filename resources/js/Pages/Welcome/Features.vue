<template>
    <div>
        <div class="flex flex-col md:flex-row justify-between py-4 px-4 md:px-20 mt-32 md:mt-2">
            <h2
                class="text-xl md:text-22xl font-bold border-t-4 border-black placeholder-vtd-primary-100 pt-4 md:pr-32 justify-between">
                Los mejor de Cartagena
            </h2>
            <p
                class="text-rights text-sm md:text-lg font-extralight w-full md:w-1/3 text-gray-500 pt-5 md:pt-4">
                Explora nuestras opciones de servicios, encontraras todo lo necesario para tu estancia en Cartagena
            </p>

        </div>
        <div class="w-full flex flex-col md:flex-row items-start justify-start gap-2 md:gap-4 p-1 px-10 md:px-10">
            <div v-for="(service, index) in servicesType" @click="openDrawer(service)" class="flex efect item flex-col w-full p-4 space-y-10 shadow-xl hover:bg-gray-800 hover:text-white group" :key="index">
                <h3 class="font-bold text-2xl md:text-3xl">{{ service.name }}</h3>
                <p class="text-justify">
                    {{ service.text }}
                </p>
                <p class="text-right text-xl font-bold mb-4 flex items-center justify-end gap-x-2">
                    <span>
                        {{ service.textButton }}
                    </span>
                    <i class="fa-solid fa-caret-right"></i>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>

import state from '@/store/searchStore';
import { ref } from 'vue';

const visible = ref(false);
const title = ref('');
const services = ref([]);

const openDrawer = (t) => {
    title.value = t;
    visible.value = true;
    state.location.value = 'Cartagena';
    state.type.value = t;
    location.href = '/services-home';
}



const servicesType = ref([
    {
        value: 'TOUR',
        name: 'Tours',
        text: 'Vive las mejores experiencias en Cartagena, conoce los mejores lugares y disfruta de la cultura y la gastronomía de nuestro país.',
        textButton: 'Ir a Disfrutar'

    },
    {
        value: 'TRANSPORT',
        name: 'Transportes',
        text: 'Vive las mejores experiencias en Cartagena, conoce los mejores lugares y disfruta de la cultura y la gastronomía de nuestro país.',
        textButton: 'Transportes Seguros'

    },
    {
        value: 'ACCOMMODATION',
        name: 'Alojamientos',
        text: 'Vive las mejores experiencias en Cartagena, conoce los mejores lugares y disfruta de la cultura y la gastronomía de nuestro país.',
        textButton: 'Ir a Alojamientos'

    },
    {
        value: 'EMBARCACION',
        name: 'Embarcaciones',
        text: 'Vive las mejores experiencias en Cartagena, conoce los mejores lugares y disfruta de la cultura y la gastronomía de nuestro país.',
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
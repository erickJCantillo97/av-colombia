<template>
    <div class="flex items-center gap-x-4 px-4 justify-start">
        <div class="shadow-md flex justify-start rounded-lg gap-x-4  pr-5  items-center">
            <div class="bg-black rounded-lg py-1 px-2">
                <img src="/images/show/people.png" class="w-20 object-cover " alt="">
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-2xl">Capacidad</span>
                <span class="text-md">{{ service.capacidad_max }} Personas</span>
            </div>
        </div>
        <div class="shadow-md flex justify-start rounded-lg gap-x-4  pr-5  items-center">
            <div class="bg-black rounded-lg py-1 px-2">
                <img src="/images/show/boat.png"  style="filter: drop-shadow(0 10px 8px rgb(255 255 255 / 0.5)) drop-shadow(0 4px 3px rgb(255 255 255 / 0.5));" class="w-20 object-cover drop-shadow-lg" alt="">
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-2xl">Tamaño</span>
                <span class="text-md">29 pies</span>
            </div>
        </div>
        <div class="shadow-md flex justify-start rounded-lg gap-x-4  pr-5  items-center">
            <div class="bg-black rounded-lg py-1 px-2">
                <img src="/images/show/engine.png"  style="filter: drop-shadow(0 10px 8px rgb(255 255 255 / 0.5)) drop-shadow(0 4px 3px rgb(255 255 255 / 0.5));" class="w-20 object-cover drop-shadow-lg" alt="">
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-2xl">Motor</span>
                <span class="text-md">2 motores fuera de borda</span>
            </div>
        </div>

    </div>

</template>

<script setup>
import { caracteristicas } from '@/composable/CommonData';
import Service from '@/Models/Services/Service';

const props = defineProps({
    service: Object
})


const serviceModel = new Service(props.service);
const includes = serviceModel.form.includes



</script>
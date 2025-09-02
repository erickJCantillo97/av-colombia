<template>
    <div class="flex flex-wrap gap-12 justify-center">
        <div v-if="service.capacidad_max" class="shadow-md flex justify-start rounded-lg gap-x-4  pr-5  items-center">
            <div class="bg-black rounded-lg py-1 px-2">
                <i class="fa-solid fa-people-group text-white text-2xl"></i>
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-2xl">Capacidad</span>
                <span class="text-md">{{ service.capacidad_max }} Personas</span>
            </div>
        </div>
        <div v-if="service.size" class="shadow-md flex justify-start rounded-lg gap-x-4  pr-5  items-center">
            <div class="bg-black rounded-lg py-1 px-2">
                <i class="fa-solid fa-ruler-combined text-white text-2xl"></i>
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-2xl">Tamaño</span>
                <span class="text-md">{{ service.size }} Pies</span>
            </div>
        </div>
        <div v-if="service.motor" class="shadow-md flex justify-start rounded-lg gap-x-4  pr-5  items-center">
            <div class="bg-black rounded-lg py-1 px-2">
                <i class="fa-solid fa-gear text-white text-2xl"></i>
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-2xl">Motor</span>
                <span class="text-md">{{ service.motor }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    service: Object
})
</script>

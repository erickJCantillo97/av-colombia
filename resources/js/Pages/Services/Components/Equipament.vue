<template>
    <div class="flex flex-wrap gap-12 justify-center">
        <div v-for="feature in features" :key="feature.name" class="shadow-md flex justify-start rounded-lg gap-4  px-5  items-center">
            <i :class="feature.icon" class="text-5xl"></i>
            <div class="flex flex-col">
                <span class="font-bold text-2xl">{{ feature.name }}</span>
                <span v-if="feature.unit" class="text-md">{{ feature.value }} {{ feature.unit }}</span>
                <span v-else class="text-md">{{ feature.value }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    service: Object
})

const features = [
    {
        icon: 'fa-solid fa-people-group',
        name: 'Capacidad',
        value: props.service.capacidad_max,
        unit: 'Personas'
    },
    {
        icon: 'fa-solid fa-ruler-combined',
        name: 'Tamaño',
        value: props.service.size,
        unit: 'Pies'
    },
    {
        icon: 'fa-solid fa-gear',
        name: 'Motor',
        value: props.service.motor,
    }
]
</script>

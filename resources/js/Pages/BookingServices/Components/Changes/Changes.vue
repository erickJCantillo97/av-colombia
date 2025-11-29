<template>
    <div class="relative">
        <!-- Línea vertical central -->
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
        
        <!-- Items de la línea de tiempo -->
        <div class="flex flex-col gap-y-8 py-8">
            <div 
                v-for="(change, index) in bookingService.changes" 
                :key="change.id"
                :class="[
                    'relative flex',
                    index % 2 === 0 ? 'justify-start pr-[52%]' : 'justify-end pl-[52%]'
                ]"
            >
                <!-- Punto en la línea de tiempo -->
                <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10 shadow-lg"></div>
                
                <!-- Contenido del item -->
                <div 
                    :class="[
                        'w-full transform transition-all duration-300 hover:scale-105',
                        index % 2 === 0 ? 'pr-8' : 'pl-8'
                    ]"
                >
                    <Item :change="change" :position="index % 2 === 0 ? 'left' : 'right'"></Item>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Item from './Item.vue';


defineProps({
    bookingService: Object,
})
</script>

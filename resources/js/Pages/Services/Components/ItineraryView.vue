<template>
    <div v-if="(itineraries.length != 0)" class="col-span-2 p-2 rounded-md gap-4 flex flex-col"
    :class="readOnly ? 'bg-transparent h-min w-full mx-auto' : 'bg-gradient-to-br from-slate-50 to-slate-100 h-[600px] overflow-y-auto'">
        <div v-if="itineraries.length === 0" class="flex items-center justify-center h-full">
            <p class="text-gray-500 italic">No hay itinerarios agregados</p>
        </div>
        
        <!-- Items del itinerario con timeline vertical -->
        <div v-for="(item, index) in itineraries" :key="index" class="relative itinerary-item-card group">
            <!-- Número de step con círculo decorativo -->
            <div class="absolute -left-3 top-6 z-10 flex items-center justify-center">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 shadow-lg flex items-center justify-center ring-4 ring-white group-hover:ring-cyan-100 transition-all duration-300">
                    <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
                </div>
            </div>
            
            <!-- Línea conectora vertical (excepto último item) -->
            <div v-if="index < itineraries.length - 1" class="absolute left-2 top-16 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-cyan-400 via-blue-400 to-transparent opacity-40"></div>
            
            <!-- Card del item -->
            <div class="ml-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:translate-x-1">
                <!-- Header con imagen -->
                <div class="relative h-32 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img :src="item.image" alt="Itinerary step" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <!-- Badge con número -->
                    <div class="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-cyan-600 shadow-lg">
                        Paso {{ index + 1 }}
                    </div>
                </div>
                
                <!-- Contenido -->
                <div class="p-5 relative">
                    <!-- Decoración -->
                    <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
                                {{ item.title }}
                            </h3>
                            <p class="text-gray-600 leading-relaxed">{{ item.description }}</p>
                        </div>
                        
                        <!-- Botones de acción (solo en modo edición) -->
                        <div v-if="!readOnly" class="flex flex-col gap-2 ml-2">
                            <button 
                                type="button" 
                                @click="$emit('edit',index)"
                                class="p-2.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                            >
                                <i class="fa-solid fa-pen text-sm"></i>
                            </button>
                            <button 
                                type="button" 
                                @click="$emit('deleteItem',index)"
                                class="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                            >
                                <i class="fa-solid fa-trash text-sm"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Footer decorativo -->
                    <div class="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
                        <i class="fa-solid fa-clock"></i>
                        <span>Etapa del itinerario</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>


const props = defineProps({
    itineraries: Array,
    readOnly: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['deleteItem','edit'])

</script>

<style scoped>
.itinerary-item-card {
    animation: fadeInUp 0.5s ease-out backwards;
}

.itinerary-item-card:nth-child(1) { animation-delay: 0.1s; }
.itinerary-item-card:nth-child(2) { animation-delay: 0.2s; }
.itinerary-item-card:nth-child(3) { animation-delay: 0.3s; }
.itinerary-item-card:nth-child(4) { animation-delay: 0.4s; }
.itinerary-item-card:nth-child(5) { animation-delay: 0.5s; }
.itinerary-item-card:nth-child(n+6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

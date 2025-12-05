<template>
    <div class="space-y-10">
        <!-- Servicios Incluidos -->
        <div>
            <!-- Grid de servicios incluidos -->
            <div v-if="service.type != 'EMBARCACION'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(include, index) in includes" :key="index" 
                    class="include-item group">
                    <div class="flex items-start gap-4">
                        <!-- Icono -->
                        <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                            <i class="fa-solid fa-check text-green-600 text-xl group-hover:text-white transition-colors duration-300"></i>
                        </div>
                        <!-- Contenido -->
                        <div class="flex-1 min-w-0">
                            <p class="text-gray-900 font-semibold leading-tight group-hover:text-green-600 transition-colors duration-300">
                                {{ include }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Para embarcaciones (con features) -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(feature, index) in features" :key="index" 
                    v-show="includes.includes(feature.name.toUpperCase() || feature.id)"
                    class="include-item group">
                    <div class="flex items-start gap-4">
                        <!-- Icono -->
                        <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                            <i class="fa-solid text-green-600 text-xl group-hover:text-white transition-colors duration-300" :class="[feature.icon]"></i>
                        </div>
                        <!-- Contenido -->
                        <div class="flex-1 min-w-0">
                            <p class="text-gray-900 font-semibold leading-tight group-hover:text-green-600 transition-colors duration-300">
                                {{ feature.name.toUpperCase() }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Servicios NO Incluidos (si existen) -->
        <div v-if="notIncludes.length > 0" class="relative">
            <!-- Separador decorativo -->
            <div class="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            
            <div class="pt-10">
                <!-- Header de NO incluidos -->
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center">
                        <i class="fa-solid fa-info-circle text-red-600 text-lg"></i>
                    </div>
                    <div>
                        <h4 class="text-xl font-bold text-gray-900">No Incluye</h4>
                        <p class="text-sm text-gray-500">Servicios no contemplados en el paquete</p>
                    </div>
                </div>

                <!-- Grid de NO incluidos (más compacto) -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div v-for="(include, index) in notIncludes" :key="index" 
                        class="not-include-item group">
                        <div class="flex items-center gap-3">
                            <!-- Icono -->
                            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                <i class="fa-solid fa-xmark text-red-500 text-sm"></i>
                            </div>
                            <!-- Contenido -->
                            <div class="flex-1 min-w-0">
                                <p class="text-gray-700 text-sm font-medium leading-tight">
                                    {{ include }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const includes = ref([])
const notIncludes = ref([])
const props = defineProps({
    service: Object,
    features: Array,
});

includes.value = JSON.parse(props.service.includes);
notIncludes.value = JSON.parse(props.service.notIncludes);

</script>

<style scoped>
/* Item de servicio incluido */
.include-item {
    padding: 1.25rem;
    background: linear-gradient(to bottom right, #ffffff, #fafafa);
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
}

.include-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.12);
    border-color: #10b981;
    background: linear-gradient(to bottom right, #ffffff, #f0fdf4);
}

/* Item de servicio NO incluido */
.not-include-item {
    padding: 0.875rem 1rem;
    background: #ffffff;
    border: 1px solid #fee2e2;
    border-radius: 0.75rem;
    transition: all 0.2s ease;
}

.not-include-item:hover {
    background: #fef2f2;
    border-color: #fecaca;
}

/* Animación de entrada escalonada */
.include-item {
    animation: fadeInUp 0.5s ease-out backwards;
}

.include-item:nth-child(1) { animation-delay: 0.05s; }
.include-item:nth-child(2) { animation-delay: 0.1s; }
.include-item:nth-child(3) { animation-delay: 0.15s; }
.include-item:nth-child(4) { animation-delay: 0.2s; }
.include-item:nth-child(5) { animation-delay: 0.25s; }
.include-item:nth-child(6) { animation-delay: 0.3s; }
.include-item:nth-child(n+7) { animation-delay: 0.35s; }

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

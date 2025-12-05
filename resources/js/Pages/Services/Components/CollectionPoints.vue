<template>
  <div class="space-y-6">
    <!-- Badge destacado -->
    <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full border-2 border-amber-300">
      <i class="fa-solid fa-gift text-amber-600"></i>
      <span class="text-sm font-bold text-gray-800">¡Recogida GRATIS en todos los puntos!</span>
    </div>

    <!-- Grid de puntos de recogida -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(point, index) in points" :key="index" 
        class="collection-point-item group">
        <div class="flex items-start gap-4">
          <!-- Icono de ubicación -->
          <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300 relative">
            <i class="fa-solid fa-location-dot text-indigo-600 text-xl group-hover:text-white transition-colors duration-300"></i>
            <!-- Punto de pulso -->
            <div class="absolute inset-0 rounded-xl bg-indigo-500 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
          </div>
          <!-- Contenido -->
          <div class="flex-1 min-w-0">
            <p class="text-gray-900 font-semibold leading-tight capitalize group-hover:text-indigo-600 transition-colors duration-300">
              {{ point }}
            </p>
            <p class="text-xs text-gray-500 mt-1">Punto de recogida disponible</p>
          </div>
          <!-- Badge de número -->
          <div class="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-500 transition-colors duration-300">
            <span class="text-xs font-bold text-indigo-600 group-hover:text-white transition-colors duration-300">{{ index + 1 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje informativo -->
    <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
        <i class="fa-solid fa-lightbulb text-white"></i>
      </div>
      <div class="flex-1">
        <h4 class="text-sm font-bold text-gray-900 mb-1">Consejo útil</h4>
        <p class="text-xs text-gray-700 leading-relaxed">
          Si tu ubicación no está en la lista, contáctanos. Podemos coordinar un punto de recogida alternativo cercano a ti sin costo adicional.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const points = ref()
const props = defineProps({
  service: Array,
});

onMounted(() => {
  points.value = JSON.parse(props.service.recogidas);
});
</script>

<style scoped>
/* Item de punto de recogida */
.collection-point-item {
    padding: 1.25rem;
    background: linear-gradient(to bottom right, #ffffff, #fafafa);
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
}

.collection-point-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
    border-color: #6366f1;
    background: linear-gradient(to bottom right, #ffffff, #ede9fe);
}

/* Animación de entrada escalonada */
.collection-point-item {
    animation: fadeInUp 0.5s ease-out backwards;
}

.collection-point-item:nth-child(1) { animation-delay: 0.05s; }
.collection-point-item:nth-child(2) { animation-delay: 0.1s; }
.collection-point-item:nth-child(3) { animation-delay: 0.15s; }
.collection-point-item:nth-child(4) { animation-delay: 0.2s; }
.collection-point-item:nth-child(5) { animation-delay: 0.25s; }
.collection-point-item:nth-child(6) { animation-delay: 0.3s; }
.collection-point-item:nth-child(n+7) { animation-delay: 0.35s; }

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

/* Animación de pulso para el icono */
@keyframes ping {
    75%, 100% {
        transform: scale(2);
        opacity: 0;
    }
}

.group:hover .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
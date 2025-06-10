<template>
  <div class="flex ">

    <div class="relative w-full" ref="searchContainer">
      <!-- Input de búsqueda -->
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input type="text" placeholder="Describe el servicio que buscas..." v-model="searchQuery" @focus="openPanel"
          @keydown.esc="closePanel" @keydown.enter="generateWithAi"
          class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-800 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
      </div>

      <!-- Panel de resultados -->
      <Transition name="panel">
        <div v-if="isPanelOpen"
          class="absolute z-10 mt-2 w-full origin-top-right rounded-xl border border-gray-200 bg-white shadow-2xl">
          <div class="p-4">
            <!-- ✨ Sección de IA (visible solo al escribir) -->
            <div v-if="searchQuery" class="mb-4">
              <h3 class="text-xs font-semibold uppercase text-gray-400">Acción Inteligente</h3>
              <ul class="mt-2 space-y-1">
                <li @click="generateWithAi"
                  class="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-indigo-50">
                  <div class="flex items-center gap-4">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="h-5 w-5">
                        <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9 1.9 4.8 1.9-4.8 4.8-1.9-4.8-1.9z" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-indigo-700">✨ Encontrar Serivicio para: "{{ searchQuery }}"</p>
                      <p class="text-sm text-gray-500">Usar IA para buscar en nuestra base de datos.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- Resultados de búsqueda estáticos -->
            <div v-if="!searchQuery">
              <h3 class="text-xs font-semibold uppercase text-gray-400">Acciones rápidas</h3>
              <ul class="mt-2 space-y-1">
                <li v-for="item in staticActions" :key="item.title"
                  class="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-gray-100">
                  <div class="flex items-center gap-4">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600"
                      v-html="item.icon"></div>
                    <div>
                      <p class="font-medium text-gray-800">{{ item.title }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2">
            <div class="flex items-center gap-4 text-xs text-gray-500"><span>↵ Buscar</span><span>Esc Salir</span></div>
            <a href="#" class="text-xs font-medium text-indigo-600 hover:underline">Editar Acciones</a>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Modal para mostrar el resultado de la IA -->
    <Transition name="modal">
      <div v-if="isModalVisible" class="fixed inset-0 z-[99999999] flex items-center justify-center bg-black bg-opacity-50">
        <div class="modal-container w-full max-w-2xl rounded-xl bg-white shadow-2xl m-4">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-semibold text-gray-900">✨ Recomendación de Servicio</h2>
              <button @click="closeModal"
                class="p-1 leading-none text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">&times;</button>
            </div>
            <div v-if="isLoading" class="mt-4 text-center py-8">
              <div class="animate-pulse-fast text-gray-500">Buscando el mejor Servicio para ti...</div>
            </div>
            <div v-else
              class="ai-content mt-4 p-4 bg-gray-50 rounded-lg max-h-[60vh] overflow-y-auto text-gray-700 whitespace-pre-wrap"
              v-html="formattedContent"></div>
          </div>
          <div v-if="!isLoading"
            class="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-3 rounded-b-xl">

            <button @click="closeModal"
              class="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700">Cerrar</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const isPanelOpen = ref(false);
const isModalVisible = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');
const generatedContent = ref('');
const searchContainer = ref(null);

const openPanel = () => { isPanelOpen.value = true; };
const closePanel = () => { isPanelOpen.value = false; };
const openModal = () => { isModalVisible.value = true; };
const closeModal = () => {
  isModalVisible.value = false;
  generatedContent.value = '';
};

const generateWithAi = async () => {
  if (!searchQuery.value.trim()) return;
  closePanel();
  openModal();
  isLoading.value = true;
  const apiUrl = '/get-service';
  try {
    const response = await axios.post(apiUrl, { prompt: searchQuery.value });
    const result = response.data;
    generatedContent.value = result.recommendation || result.response || "No se recibió una recomendación válida.";
  } catch (error) {
    console.error("Error al contactar el backend:", error);
    generatedContent.value = `Ocurrió un error al buscar el producto: ${error.message}`;
  } finally {
    isLoading.value = false;
  }
};

const formattedContent = computed(() => {
  if (!generatedContent.value) return '';

  // 1. Convierte el Markdown a HTML usando la librería 'marked'
  const rawHtml = marked.parse(generatedContent.value);

  // 2. Reemplaza los enlaces con el ID por la URL final de tu producto
  // Este regex busca <a href="CUALQUIER_NUMERO">
  const finalHtml = rawHtml.replace(/<a href="([^"]+)">/g, (match, slug) => {
    // Construye la URL final con la ruta /showservice/ y el slug capturado.
    const linkClasses = "text-green-600 hover:text-green-800 font-semibold underline";
    return `<a href="/showservice/${slug}" target="_blank" rel="noopener noreferrer" class="${linkClasses}">`;
  });

  console.log(finalHtml)

  return finalHtml;
});

const staticActions = ref([
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`, title: 'Todos los Tours' },
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`, title: 'Todas las Embarcaciones' }
]);

const handleClickOutside = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    closePanel();
  }
};

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

body {
  background-color: #f3f4f6;
}

.panel-enter-active,
.panel-leave-active,
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease-out;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-1rem) scale(0.95);
}

.panel-enter-to,
.panel-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: scale(0.9);
}

.modal-container {
  transition: all 0.25s ease-out;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse-fast {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.ai-content a {
    color: #4f46e5; /* Este es el color actual (Indigo-600) */
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid #a5b4fc;
    transition: background-color 0.2s;
}
</style>
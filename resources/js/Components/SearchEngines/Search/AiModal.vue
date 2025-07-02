<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isModalVisible" class="fixed inset-0 z-[99999999] flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="modal-container w-full max-w-2xl rounded-xl bg-white shadow-2xl max-h-[90vh] flex flex-col">
          <div class="p-4 sm:p-6 flex-shrink-0">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-semibold text-gray-900">✨ Recomendación de Servicio</h2>
              <button @click="$emit('close')"
                class="py-1 px-2 leading-none text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 text-xl flex-shrink-0">×</button>
            </div>
            <div v-if="isLoading" class="mt-4 text-center py-8">
              <div class="animate-pulse-fast text-gray-500">Buscando el mejor Servicio para ti...</div>
            </div>
          </div>
          <div v-if="!isLoading" class="flex-1 overflow-hidden">
            <div class="ai-content px-4 sm:px-6 pb-4 h-full overflow-y-auto">
              <div class="p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-wrap" v-html="formattedContent"></div>
            </div>
          </div>
          <div v-if="!isLoading"
            class="flex flex-col sm:flex-row justify-end gap-2 border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 rounded-b-xl flex-shrink-0">
            <button @click="$emit('close')"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 w-full sm:w-auto">Buscaré yo mismo</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
defineProps([
  'isModalVisible',
  'isLoading',
  'formattedContent'
]);
defineEmits(['close']);
</script>

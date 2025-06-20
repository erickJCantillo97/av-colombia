<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isModalVisible" class="fixed inset-0 z-[99999999] flex items-center justify-center bg-black bg-opacity-50">
        <div class="modal-container w-full max-w-2xl rounded-xl bg-white shadow-2xl m-4">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-semibold text-gray-900">✨ Recomendación de Servicio</h2>
              <button @click="$emit('close')"
                class="py-1 px-2 leading-none text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 text-xl">x</button>
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
            <button @click="$emit('close')"
              class="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700">Buscaré yo mismo</button>
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

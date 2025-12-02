<template>
  <Modal v-model="show" close-on-escape width="60vw">
    <template #header>
      <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <i class="fa-solid fa-comments text-white"></i>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Notas de la Actividad</h3>
          <p class="text-xs text-gray-500">{{ props.service.service }} - {{ props.service.cliente_name }}</p>
        </div>
      </div>
    </template>

    <div class="flex flex-col h-[60vh]">
      <!-- Chat Messages Area -->
      <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-full">
          <div class="text-center">
            <Loading />
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="notas.length === 0"
          class="flex justify-center flex-col items-center h-full text-center px-8 py-12"
        >
          <!-- Animated Icon Container -->
          <div class="relative mb-6">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-xl opacity-60 animate-pulse-slow"></div>
            <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <div class="absolute inset-0 rounded-full bg-white opacity-20 animate-ping-slow"></div>
              <i class="fa-solid fa-message-plus text-4xl text-white drop-shadow-lg"></i>
            </div>
          </div>

          <!-- Title and Description -->
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            No hay notas todavía
          </h3>
          <p class="text-sm text-gray-600 mb-6 max-w-xs leading-relaxed">
            Esta actividad aún no tiene notas. Comienza la conversación agregando la primera nota.
          </p>

          <!-- Decorative Elements -->
          <div class="flex items-center gap-3 text-xs text-gray-400">
            <div class="flex items-center gap-1.5">
              <div class="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style="animation-delay: 0s;"></div>
              <div class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 0.2s;"></div>
              <div class="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style="animation-delay: 0.4s;"></div>
            </div>
            <span class="font-medium">Escribe tu primera nota abajo</span>
          </div>

          <!-- Floating Particles -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
          </div>
        </div>

        <!-- Messages -->
        <div v-else class="space-y-3">
          <div
            v-for="n in notas"
            :key="n.id"
            :class="[
              'flex animate-fade-in',
              n.user_id === $page.props.auth.user.id ? 'justify-end' : 'justify-start'
            ]"
          >
            <!-- Own Message -->
            <div
              v-if="n.user_id === $page.props.auth.user.id"
              class="flex items-end gap-2 max-w-[75%] group"
            >
              <div class="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl rounded-br-sm shadow-md hover:shadow-lg transition-shadow duration-200">
                <div class="px-4 py-3">
                  <p class="text-white text-sm leading-relaxed break-words">{{ n.note }}</p>
                  <div class="flex items-center justify-end gap-2 mt-2">
                    <span class="text-xs text-blue-100">
                      {{ formatDate(n.created_at) }}
                    </span>
                    <i class="fa-solid fa-check-double text-xs text-blue-100"></i>
                  </div>
                </div>
                <div class="px-2 pb-2 flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    @click="editMode(n)"
                    class="px-2 py-1 text-xs text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                    title="Editar"
                  >
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    @click="eliminar(n)"
                    class="px-2 py-1 text-xs text-white hover:bg-red-500 rounded-lg transition-colors duration-200"
                    title="Eliminar"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
                {{ getInitials($page.props.auth.user.name) }}
              </div>
            </div>

            <!-- Other User Message -->
            <div v-else class="flex items-end gap-2 max-w-[75%]">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
                {{ getInitials(n.user.name) }}
              </div>
              <div class="flex-1 bg-white rounded-2xl rounded-bl-sm shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
                <div class="px-4 py-3">
                  <p class="text-sm font-semibold text-gray-900 mb-1">{{ n.user.name }}</p>
                  <p class="text-gray-700 text-sm leading-relaxed break-words">{{ n.note }}</p>
                  <span class="text-xs text-gray-500 mt-2 block">
                    {{ formatDate(n.created_at) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-gray-200 bg-white px-6 py-4">
        <div v-if="noteEditMode" class="mb-2 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Editando nota</span>
          <button @click="cancelEdit" class="ml-auto text-gray-500 hover:text-gray-700">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="flex gap-3 items-end">
          <div class="flex-1">
            <Input 
              type="textarea" 
              v-model="note"
              :rowsTextarea="2"
              placeholder="Escribe una nota..."
              class="w-full"
            />
          </div>
          <button
            v-if="!noteEditMode"
            @click="sendNote"
            :disabled="!note.trim()"
            class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          >
            <i class="fa-solid fa-paper-plane group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"></i>
          </button>
          <button
            v-else
            @click="edit"
            :disabled="!note.trim()"
            class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          >
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Modal from "./Modal.vue";
import Input from "./Input.vue";
import axios from "axios";
import Logo from "../logo.vue";
import Loading from "../Loading.vue";

const show = defineModel();

const props = defineProps({
  todayActivity: Boolean,
  notes: Array,
  note: String,
  service: Array,
});

const notas = ref(props.notes);
const noteEditMode = ref(false);
const noteSelected = ref(null);
const loading = ref(false);
const note = ref("");

const sendNote = () => {
  axios
    .post(route("notes.store"), {
      note: note.value,
      booking_service_id: props.service.id,
    })
    .then((response) => {
      note.value = "";
      getNotes();
    });
};

const eliminar = (n) => {
  axios.delete(route("notes.destroy", n.id)).then((response) => {
    getNotes();
  });
};

const editMode = (n) => {
  note.value = n.note;
  noteEditMode.value = true;
  noteSelected.value = n;
};

const edit = () => {
  axios
    .put(route("notes.update", noteSelected.value.id), {
      note: note.value,
    })
    .then((response) => {
      getNotes();
      note.value = "";
      noteEditMode.value = false;
      noteSelected.value = null;
    });
};

const cancelEdit = () => {
  note.value = "";
  noteEditMode.value = false;
  noteSelected.value = null;
};

const getNotes = () => {
  loading.value = true;
  axios
    .get(route("notes.index", { booking_service_id: props.service.id }))
    .then((response) => {
      notas.value = response.data.notes;
      loading.value = false;
    });
};

const formatDate = (date) => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (d.toDateString() === today.toDateString()) {
    return `Hoy ${d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (d.toDateString() === yesterday.toDateString()) {
    return `Ayer ${d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return d.toLocaleString('es-CO', { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
};

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

onMounted(() => {
  getNotes();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Empty State Animations */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes float-particle {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translate(10px, -15px) rotate(180deg);
    opacity: 0.6;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Floating Particles */
.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  opacity: 0.2;
  animation: float-particle 6s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
  animation-duration: 5s;
}

.particle-2 {
  top: 60%;
  right: 20%;
  animation-delay: 1.5s;
  animation-duration: 6s;
}

.particle-3 {
  bottom: 25%;
  left: 25%;
  animation-delay: 3s;
  animation-duration: 7s;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

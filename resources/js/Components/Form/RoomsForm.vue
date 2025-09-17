<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Habitaciones</h3>
            <Button 
                @click="openCreateModal" 
                icon="fa-solid fa-plus" 
                label="Agregar Habitación"
                severity="success" 
                outlined 
            />
        </div>

        <div v-if="form.rooms.length === 0" class="text-center text-gray-500 py-8">
            <div class="flex flex-col items-center">
                <i class="pi pi-home text-4xl mb-4 text-gray-300"></i>
                <p class="text-lg font-medium mb-2">No hay habitaciones agregadas</p>
                <p class="text-sm">Agrega al menos una habitación para continuar</p>
                <Button 
                    @click="openCreateModal" 
                    icon="fa-solid fa-plus" 
                    label="Agregar Primera Habitación"
                    severity="success" 
                    class="mt-4"
                />
            </div>
        </div>

        <!-- Grid de tarjetas de habitaciones -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RoomCard
                v-for="(room, index) in form.rooms"
                :key="'room-' + index"
                :room="room"
                :index="index"
                @edit="openEditModal"
                @delete="removeRoom"
            />
        </div>

        <!-- Modal para crear/editar habitación -->
        <RoomModal
            v-model:visible="showModal"
            :room="currentRoom"
            :is-editing="isEditing"
            :errors="roomErrors"
            :processing="form.processing"
            @submit="handleRoomSubmit"
            @remove-image="handleRemoveImage"
            @images-select="handleImagesSelect"
        />

        <div class="flex gap-x-4 mt-8 justify-between">
            <Button 
                @click="$emit('cancel')" 
                title="Cancelar" 
                severity="danger" 
                label="Cancelar"
                icon="fa-solid fa-times" 
                class="!h-9 w-full" 
            />
            <Button 
                @click="$emit('submit')" 
                title="Guardar" 
                severity="success" 
                :loading="form.processing"
                label="Guardar" 
                icon="fa-solid fa-save" 
                class="!h-9 w-full" 
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import Button from "primevue/button";
import RoomCard from "./RoomCard.vue";
import RoomModal from "./RoomModal.vue";

const props = defineProps({
    form: {
        type: Object,
        required: true
    },
    accommodation: {
        type: Object,
        default: null
    }
});

const emit = defineEmits([
    'submit', 
    'cancel', 
    'addRoom', 
    'removeRoom', 
    'removeImage', 
    'roomImagesSelect'
]);

// Estados del modal
const showModal = ref(false);
const isEditing = ref(false);
const currentRoom = ref(null);
const currentRoomIndex = ref(null);

// Errores específicos de la habitación actual
const roomErrors = computed(() => {
    if (!isEditing.value || currentRoomIndex.value === null) {
        return {};
    }
    
    const errors = {};
    const roomPrefix = `rooms.${currentRoomIndex.value}.`;
    
    Object.keys(props.form.errors).forEach(key => {
        if (key.startsWith(roomPrefix)) {
            const fieldName = key.replace(roomPrefix, '');
            errors[fieldName] = props.form.errors[key];
        }
    });
    
    return errors;
});

// Funciones del modal
const openCreateModal = () => {
    currentRoom.value = null;
    currentRoomIndex.value = null;
    isEditing.value = false;
    showModal.value = true;
};

const openEditModal = (room, index) => {
    currentRoom.value = { ...room };
    currentRoomIndex.value = index;
    isEditing.value = true;
    showModal.value = true;
};

const handleRoomSubmit = (roomData) => {
    if (isEditing.value && currentRoomIndex.value !== null) {
        // Actualizar habitación existente
        Object.assign(props.form.rooms[currentRoomIndex.value], roomData);
        
        // Manejar las imágenes nuevas si existen
        if (roomData.room_images && roomData.room_images.length > 0) {
            emit('roomImagesSelect', { files: roomData.room_images }, currentRoomIndex.value);
        }
    } else {
        // Agregar nueva habitación
        emit('addRoom');
        
        // Esperar al siguiente tick para asegurar que la habitación se agregó
        nextTick(() => {
            const newIndex = props.form.rooms.length - 1;
            Object.assign(props.form.rooms[newIndex], roomData);
            
            // Manejar las imágenes nuevas si existen
            if (roomData.room_images && roomData.room_images.length > 0) {
                emit('roomImagesSelect', { files: roomData.room_images }, newIndex);
            }
        });
    }
    
    showModal.value = false;
};

const removeRoom = (index) => {
    emit('removeRoom', index);
};

const handleRemoveImage = (imageId) => {
    if (isEditing.value && currentRoomIndex.value !== null) {
        emit('removeImage', imageId, true, currentRoomIndex.value);
    }
};

const handleImagesSelect = (event) => {
    if (isEditing.value && currentRoomIndex.value !== null) {
        emit('roomImagesSelect', event, currentRoomIndex.value);
    } else {
        // Para nuevas habitaciones, guardamos las imágenes temporalmente
        // El componente padre manejará esto cuando se cree la habitación
        emit('roomImagesSelect', event, -1); // -1 indica nueva habitación
    }
};
</script>

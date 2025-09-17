<template>
    <Dialog 
        :visible="visible" 
        @update:visible="$emit('update:visible', $event)"
        modal 
        :header="isEditing ? 'Editar Habitación' : 'Agregar Habitación'" 
        :style="{ width: '50rem' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        @hide="resetForm"
    >
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Nombre de la Habitación" 
                    v-model="roomForm.name"
                    :error-message="errors.name" 
                    required 
                />

                <Input 
                    label="Precio por Noche" 
                    v-model="roomForm.price_per_night"
                    type="number" 
                    min="0" 
                    step="0.01" 
                    currency="COP"
                    :error-message="errors.price_per_night"
                    required 
                />

                <Input 
                    label="Capacidad Adultos" 
                    v-model="roomForm.capacity_adults"
                    type="number" 
                    min="1"
                    :error-message="errors.capacity_adults"
                    required 
                />

                <Input 
                    label="Capacidad Niños" 
                    v-model="roomForm.capacity_children"
                    type="number" 
                    min="0"
                    :error-message="errors.capacity_children"
                    required 
                />

                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Descripción de la Habitación
                    </label>
                    <Textarea 
                        v-model="roomForm.description" 
                        rows="3"
                        placeholder="Describe esta habitación..."
                        :class="{ 'border-red-500': errors.description }" 
                    />
                    <span 
                        v-if="errors.description"
                        class="text-red-500 text-xs"
                    >
                        {{ errors.description }}
                    </span>
                </div>
            </div>

            <!-- Fotos de la habitación -->
            <div class="border-t pt-4">
                <h5 class="font-medium mb-2">Fotos de la Habitación</h5>

                <!-- Mostrar imágenes existentes si es edición -->
                <div 
                    v-if="isEditing && roomForm.images && roomForm.images.length > 0"
                    class="mb-4"
                >
                    <div class="grid grid-cols-6 gap-4">
                        <div 
                            v-for="image in roomForm.images" 
                            :key="image.id" 
                            class="relative"
                        >
                            <img 
                                :src="image.filepath"
                                :alt="'Foto habitación'"
                                class="h-28 shadow-md rounded-lg w-full object-cover" 
                            />
                            <button 
                                type="button"
                                @click="removeExistingImage(image.id)"
                                class="absolute -top-2 -right-2 bg-red-500 hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md shadow-red-400 size-6"
                            >
                                <i class="fa-solid fa-xmark text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Subir nuevas fotos -->
                <FileUpload 
                    ref="fileUpload"
                    name="room-images" 
                    :multiple="true" 
                    accept="image/*"
                    :maxFileSize="1000000"
                    @select="handleImageSelect" 
                    customUpload
                >
                    <template #header="{ chooseCallback, clearCallback, files }">
                        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                            <div class="flex gap-2">
                                <Button 
                                    type="button"
                                    @click="chooseCallback()" 
                                    icon="pi pi-images"
                                    size="small" 
                                    severity="primary" 
                                    label="Seleccionar" 
                                />
                                <Button 
                                    type="button"
                                    label="Limpiar" 
                                    @click="clearCallback()"
                                    icon="pi pi-times" 
                                    size="small" 
                                    severity="danger"
                                    :disabled="!files || files.length === 0" 
                                />
                            </div>
                            <span class="text-sm font-medium">Fotos de la Habitación</span>
                        </div>
                    </template>

                    <template #content="{ files, removeFileCallback }">
                        <div v-if="files.length > 0" class="flex flex-wrap gap-4 pt-4">
                            <div 
                                v-for="(file, fileIndex) of files"
                                :key="file.name + file.type + file.size" 
                                class="relative"
                            >
                                <img 
                                    :src="file.objectURL" 
                                    :alt="file.name"
                                    class="h-20 w-20 object-cover rounded border" 
                                />
                                <button 
                                    type="button"
                                    @click="removeFileCallback(fileIndex)"
                                    class="absolute -top-2 -right-2 bg-red-500 hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md size-5"
                                >
                                    <i class="fa-solid fa-xmark text-xs"></i>
                                </button>
                                <div class="text-xs text-center mt-1 truncate w-20">
                                    {{ file.name }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <template #empty>
                        <div class="flex items-center justify-center flex-col py-4">
                            <i class="pi pi-cloud-upload text-2xl text-gray-400" />
                            <p class="mt-2 text-sm text-gray-500">
                                Arrastra fotos aquí o haz clic para seleccionar
                            </p>
                        </div>
                    </template>
                </FileUpload>
            </div>
        </form>

        <template #footer>
            <div class="flex gap-2 justify-end">
                <Button 
                    label="Cancelar" 
                    icon="fa-solid fa-times" 
                    severity="secondary" 
                    @click="closeModal" 
                />
                <Button 
                    :label="isEditing ? 'Actualizar' : 'Agregar'" 
                    :icon="isEditing ? 'fa-solid fa-edit' : 'fa-solid fa-plus'" 
                    severity="success" 
                    @click="handleSubmit"
                    :loading="processing"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Input from '@/Components/Customs/Input.vue';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    room: {
        type: Object,
        default: null
    },
    isEditing: {
        type: Boolean,
        default: false
    },
    errors: {
        type: Object,
        default: () => ({})
    },
    processing: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    'update:visible',
    'submit',
    'removeImage',
    'imagesSelect'
]);

const fileUpload = ref();
const roomForm = reactive({
    name: '',
    price_per_night: '',
    capacity_adults: 1,
    capacity_children: 0,
    description: '',
    images: []
});

// Observar cambios en el room prop para llenar el formulario
watch(() => props.room, (newRoom) => {
    if (newRoom) {
        Object.assign(roomForm, {
            name: newRoom.name || '',
            price_per_night: newRoom.price_per_night || '',
            capacity_adults: newRoom.capacity_adults || 1,
            capacity_children: newRoom.capacity_children || 0,
            description: newRoom.description || '',
            images: newRoom.images ? [...newRoom.images] : []
        });
    }
}, { immediate: true, deep: true });

// Observar cambios en visible para manejar el estado del modal
watch(() => props.visible, (newValue) => {
    if (!newValue) {
        nextTick(() => {
            resetForm();
        });
    }
});

const resetForm = () => {
    Object.assign(roomForm, {
        name: '',
        price_per_night: '',
        capacity_adults: 1,
        capacity_children: 0,
        description: '',
        images: []
    });
    
    if (fileUpload.value) {
        fileUpload.value.clear();
    }
};

const closeModal = () => {
    emit('update:visible', false);
};

const handleSubmit = () => {
    const formData = {
        name: roomForm.name,
        price_per_night: roomForm.price_per_night,
        capacity_adults: roomForm.capacity_adults,
        capacity_children: roomForm.capacity_children,
        description: roomForm.description,
        images: roomForm.images
    };
    
    // Si hay archivos seleccionados en el FileUpload, los incluimos
    if (fileUpload.value && fileUpload.value.files && fileUpload.value.files.length > 0) {
        formData.room_images = fileUpload.value.files;
    }
    
    emit('submit', formData);
};

const removeExistingImage = (imageId) => {
    emit('removeImage', imageId);
    // Remover la imagen del formulario local
    roomForm.images = roomForm.images.filter(img => img.id !== imageId);
};

const handleImageSelect = (event) => {
    emit('imagesSelect', event);
};
</script>

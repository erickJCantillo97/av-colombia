<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Habitaciones</h3>
            <Button 
                @click="$emit('addRoom')" 
                icon="fa-solid fa-plus" 
                label="Agregar Habitación"
                severity="success" 
                outlined 
            />
        </div>

        <div v-if="form.rooms.length === 0" class="text-center text-gray-500 py-8">
            No hay habitaciones agregadas. Agrega al menos una habitación.
        </div>

        <div v-else class="space-y-4">
            <div 
                v-for="(room, index) in form.rooms" 
                :key="'room-' + index"
                class="border rounded-lg p-4 bg-gray-50"
            >
                <div class="flex justify-between items-center mb-4">
                    <h4 class="font-medium">Habitación {{ index + 1 }}</h4>
                    <Button 
                        @click="$emit('removeRoom', index)" 
                        icon="fa-solid fa-trash" 
                        severity="danger"
                        text 
                        v-tooltip="'Eliminar habitación'" 
                    />
                </div>

                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                            :label="'Nombre de la Habitación'" 
                            v-model="room.name"
                            :error-message="form.errors[`rooms.${index}.name`]" 
                            required 
                        />

                        <Input 
                            :label="'Precio por Noche'" 
                            v-model="room.price_per_night"
                            type="number" 
                            min="0" 
                            step="0.01" 
                            currency="COP"
                            :error-message="form.errors[`rooms.${index}.price_per_night`]"
                            required 
                        />

                        <Input 
                            :label="'Capacidad Adultos'" 
                            v-model="room.capacity_adults"
                            type="number" 
                            min="1"
                            :error-message="form.errors[`rooms.${index}.capacity_adults`]"
                            required 
                        />

                        <Input 
                            :label="'Capacidad Niños'" 
                            v-model="room.capacity_children"
                            type="number" 
                            min="0"
                            :error-message="form.errors[`rooms.${index}.capacity_children`]"
                            required 
                        />

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Descripción de la Habitación
                            </label>
                            <Textarea 
                                v-model="room.description" 
                                rows="3"
                                placeholder="Describe esta habitación..."
                                :class="{ 'border-red-500': form.errors[`rooms.${index}.description`] }" 
                            />
                            <span 
                                v-if="form.errors[`rooms.${index}.description`]"
                                class="text-red-500 text-xs"
                            >
                                {{ form.errors[`rooms.${index}.description`] }}
                            </span>
                        </div>
                    </div>

                    <!-- Fotos de la habitación -->
                    <div class="border-t pt-4">
                        <h5 class="font-medium mb-2">Fotos de la Habitación {{ index + 1 }}</h5>

                        <!-- Mostrar imágenes existentes si es edición -->
                        <div 
                            v-if="accommodation && room.images && room.images.length > 0"
                            class="mb-4"
                        >
                            <div class="grid grid-cols-6 gap-4">
                                <div 
                                    v-for="image in room.images" 
                                    :key="image.id" 
                                    class="relative"
                                >
                                    <img 
                                        :src="image.filepath"
                                        :alt="'Foto habitación ' + (index + 1)"
                                        class="h-28 shadow-md rounded-lg w-full object-cover" 
                                    />
                                    <button 
                                        @click="$emit('removeImage', image.id, true, index)"
                                        class="absolute -top-2 -right-2 bg-red-500 hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md shadow-red-400 size-6"
                                    >
                                        <i class="fa-solid fa-xmark text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Subir nuevas fotos -->
                        <FileUpload 
                            :name="'room-images-' + index" 
                            :multiple="true" 
                            accept="image/*"
                            :maxFileSize="1000000"
                            @select="(event) => $emit('roomImagesSelect', event, index)" 
                            customUpload
                        >
                            <template #header="{ chooseCallback, clearCallback, files }">
                                <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                                    <div class="flex gap-2">
                                        <Button 
                                            @click="chooseCallback()" 
                                            icon="pi pi-images"
                                            size="small" 
                                            severity="primary" 
                                            label="Seleccionar" 
                                        />
                                        <Button 
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
                </div>
            </div>
        </div>

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
import Input from "@/Components/Customs/Input.vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";

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
</script>

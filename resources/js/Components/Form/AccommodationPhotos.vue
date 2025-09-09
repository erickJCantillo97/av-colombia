<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Fotos del Alojamiento</h3>

        <!-- Portada -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Imagen de Portada</label>
            <Input type="file-basic" v-model="form.portada" acceptFile="image/*" />
        </div>

        <!-- Galería de fotos existentes -->
        <div v-if="accommodation.images && accommodation.images.length > 0">
            <h4 class="font-medium mb-2">Fotos Actuales</h4>
            <div class="grid grid-cols-6 gap-4 mb-4">
                <div 
                    v-for="image in accommodation.images" 
                    :key="image.id" 
                    class="relative"
                >
                    <img 
                        :src="image.filepath" 
                        :alt="accommodation.name"
                        class="h-28 shadow-md rounded-lg w-full object-cover" 
                    />
                    <button 
                        @click="$emit('removeImage', image.id)"
                        class="absolute -top-2 -right-2 bg-red-500 hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md shadow-red-400 size-6"
                    >
                        <i class="fa-solid fa-xmark text-xs"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Subir nuevas fotos -->
        <div>
            <h4 class="font-medium mb-2">Agregar Nuevas Fotos</h4>
            <FileUpload 
                name="accommodation-images" 
                :multiple="true" 
                accept="image/*"
                :maxFileSize="1000000" 
                @select="$emit('accommodationImagesSelect', $event)" 
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
                        <span class="text-lg font-bold">Subir Imágenes del Alojamiento</span>
                    </div>
                </template>

                <template #content="{ files, removeFileCallback }">
                    <div v-if="files.length > 0" class="flex flex-wrap gap-4 pt-4">
                        <div 
                            v-for="(file, index) of files" 
                            :key="file.name + file.type + file.size"
                            class="p-4 rounded border flex flex-col items-center gap-2"
                        >
                            <img 
                                :src="file.objectURL" 
                                :alt="file.name"
                                class="h-24 w-24 object-cover rounded" 
                            />
                            <span class="font-semibold text-sm truncate max-w-24">
                                {{ file.name }}
                            </span>
                            <div class="text-xs text-gray-500">
                                {{ formatSize(file.size) }}
                            </div>
                            <Button 
                                icon="pi pi-times" 
                                @click="removeFileCallback(index)" 
                                outlined
                                rounded 
                                severity="danger" 
                                size="small" 
                            />
                        </div>
                    </div>
                </template>

                <template #empty>
                    <div class="flex items-center justify-center flex-col">
                        <i class="pi pi-cloud-upload border-2 rounded-full p-8 text-4xl text-gray-400" />
                        <p class="mt-6 mb-0">Arrastra y suelta imágenes aquí.</p>
                    </div>
                </template>
            </FileUpload>
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
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";

const props = defineProps({
    form: {
        type: Object,
        required: true
    },
    accommodation: {
        type: Object,
        required: true
    }
});

const emit = defineEmits([
    'submit', 
    'cancel', 
    'removeImage', 
    'accommodationImagesSelect'
]);

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = ['B', 'KB', 'MB', 'GB'];

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
</script>

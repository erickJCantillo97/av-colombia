<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Fotos del Alojamiento</h3>

        <!-- Portada -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Imagen de Portada</label>
            <Input type="file-basic" v-model="form.portada" acceptFile="image/*" />
        </div>

      
        <div v-if="accommodation.photos && accommodation.photos.length > 0">
            <h4 class="font-medium mb-2">Fotos Actuales</h4>
            <div class="grid grid-cols-6 gap-4 mb-4">
                <div 
                    v-for="image in accommodation.photos" 
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
            <FileSelection :route="route('accommodations.photos.upload', accommodation.id)"></FileSelection>
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
import FileSelection from "@/Pages/Services/Form/FileSelection.vue";
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

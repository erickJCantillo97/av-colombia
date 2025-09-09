<template>
    <div class="card">
        <FileUpload name="demo[]" customUpload @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*"
            :maxFileSize="1000000" @uploader="uploadArchives" @select="onSelectedFiles">
            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                    <div class="flex gap-2">
                        <Button @click="chooseCallback()" icon="pi pi-images" size="small" severity="primary"
                            label="Seleccionar"></Button>
                        <Button label="Subir" @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload"
                            size="small" severity="success" :disabled="!files || files.length === 0"></Button>
                        <Button label="Limpiar" @click="clearCallback()" icon="pi pi-times" size="small"
                            severity="danger" :disabled="!files || files.length === 0"></Button>
                    </div>
                    <h1 class="text-lg font-bold">Subir Imágenes</h1>
                </div>
            </template>
            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                <div class="flex flex-col gap-8 pt-4">
                    <div v-if="files.length > 0">
                        <h5>Pendientes</h5>
                        <div class="flex flex-wrap gap-4">
                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                <div>
                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100"
                                        height="50" />
                                </div>
                                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                                    file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <Badge value="Pendiente" severity="warn" />
                                <Button icon="pi pi-times"
                                    @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded
                                    severity="danger" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex items-center justify-center flex-col">
                    <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-xl !text-muted-color" />
                    <p class="mt-6 mb-0">Arrastrar y soltar imágenes AQUÍ.</p>
                </div>
            </template>
        </FileUpload>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useToast } from "primevue/usetoast";
import axios from 'axios';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    accommodation: {
        type: Object,
    },
    roomIndex: {
        type: Number,
        default: null
    }
});

const $primevue = usePrimeVue();
const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    callback();
};

const onTemplatedUpload = () => {
    toast.add({ severity: "info", summary: "Success", detail: "Archivo subido", life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale?.fileSizeTypes || ['B', 'KB', 'MB', 'GB'];

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};

const uploadArchives = (event) => {
    let files = event.files;
    
    // Determinar la ruta según si es para habitación o alojamiento principal
    let routeName = 'accommodations.images.upload';
    let routeParams = { accommodation: props.accommodation.id };
    
    if (props.roomIndex !== null) {
        routeName = 'accommodations.rooms.images.upload';
        routeParams.room = props.accommodation.rooms[props.roomIndex].id;
    }
    
    router.post(route(routeName, routeParams), { images: files }, {
        onSuccess: () => {
            toast.add({ severity: "success", summary: "Éxito", detail: "Imágenes subidas exitosamente", life: 3000 });
        },
        onError: (error) => {
            toast.add({ severity: "error", summary: "Error", detail: "Error al subir imágenes", life: 3000 });
        }
    });
};
</script>

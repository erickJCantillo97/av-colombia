<template>
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <!-- Imagen principal -->
        <div class="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
            <img 
                v-if="room.images && room.images.length > 0"
                :src="room.images[0].filepath" 
                :alt="room.name"
                class="w-full h-full object-cover"
            />
            <div 
                v-else 
                class="w-full h-full flex items-center justify-center bg-gray-200"
            >
                <i class="pi pi-image text-4xl text-gray-400"></i>
            </div>
            
            <!-- Badge de imágenes múltiples -->
            <div 
                v-if="room.images && room.images.length > 1"
                class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded"
            >
                <i class="pi pi-images mr-1"></i>
                {{ room.images.length }}
            </div>
        </div>

        <!-- Contenido de la tarjeta -->
        <div class="p-4">
            <!-- Nombre y precio -->
            <div class="flex justify-between items-start mb-2">
                <h4 class="text-lg font-semibold text-gray-900 truncate">
                    {{ room.name }}
                </h4>
                <div class="text-right ml-2">
                    <p class="text-lg font-bold text-green-600">
                        ${{ formatPrice(room.price_per_night) }}
                    </p>
                    <p class="text-xs text-gray-500">por noche</p>
                </div>
            </div>

            <!-- Capacidad -->
            <div class="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div class="flex items-center gap-1">
                    <i class="pi pi-users"></i>
                    <span>{{ room.capacity_adults }} adultos</span>
                </div>
                <div v-if="room.capacity_children > 0" class="flex items-center gap-1">
                    <i class="fa-solid fa-child"></i>
                    <span>{{ room.capacity_children }} niños</span>
                </div>
            </div>

            <!-- Descripción -->
            <p 
                v-if="room.description" 
                class="text-sm text-gray-600 mb-4 line-clamp-2"
            >
                {{ room.description }}
            </p>

            <!-- Acciones -->
            <div class="flex gap-2">
                <Button 
                    @click="$emit('edit', room, index)"
                    label="Editar" 
                    icon="fa-solid fa-edit" 
                    severity="info" 
                    size="small"
                    outlined
                    class="flex-1"
                />
                <Button 
                    @click="confirmDelete"
                    icon="fa-solid fa-trash" 
                    severity="danger" 
                    size="small"
                    outlined
                    v-tooltip="'Eliminar habitación'"
                />
            </div>
        </div>
    </div>

    <!-- Confirmación de eliminación -->
    <ConfirmDialog />
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';

const props = defineProps({
    room: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['edit', 'delete']);

const confirm = useConfirm();

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
};

const confirmDelete = () => {
    confirm.require({
        message: `¿Estás seguro de que deseas eliminar la habitación "${props.room.name}"?`,
        header: 'Confirmar Eliminación',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Eliminar',
        acceptClass: 'p-button-danger',
        accept: () => {
            emit('delete', props.index);
        }
    });
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

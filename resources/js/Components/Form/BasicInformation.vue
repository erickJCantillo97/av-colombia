<template>
    <form @submit.prevent="$emit('submit')" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
                <Input 
                    label="Nombre del Alojamiento" 
                    v-model="form.name"
                    :error-message="form.errors.name" 
                    required 
                />
            </div>

            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                </label>
                <Textarea 
                    v-model="form.description" 
                    rows="4"
                    placeholder="Describe tu alojamiento..."
                    class="w-full border border-gray-300 rounded-md p-2"
                    :class="{ 'border-red-500': form.errors.description }" 
                />
                <span v-if="form.errors.description" class="text-red-500 text-xs">
                    {{ form.errors.description }}
                </span>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Alojamiento
                </label>
                <Dropdown 
                    v-model="form.type" 
                    :options="accommodationTypes" 
                    option-label="label"
                    class="w-full" 
                    option-value="value" 
                    placeholder="Selecciona el tipo"
                    :class="{ 'border-red-500': form.errors.type }" 
                />
                <span v-if="form.errors.type" class="text-red-500 text-xs">
                    {{ form.errors.type }}
                </span>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Rating de Estrellas
                </label>
                <Rating 
                    v-model="form.star_rating" 
                    :stars="5" 
                    :cancel="false"
                    :class="{ 'border-red-500': form.errors.star_rating }" 
                />
                <span v-if="form.errors.star_rating" class="text-red-500 text-xs">
                    {{ form.errors.star_rating }}
                </span>
            </div>

            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Estado de Publicación
                </label>
                <Dropdown 
                    v-model="form.status" 
                    :options="statusOptions" 
                    option-label="label"
                    option-value="value" 
                    placeholder="Selecciona el estado"
                    :class="{ 'border-red-500': form.errors.status }" 
                />
                <span v-if="form.errors.status" class="text-red-500 text-xs">
                    {{ form.errors.status }}
                </span>
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
    </form>
</template>

<script setup>
import Input from "@/Components/Customs/Input.vue";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Rating from "primevue/rating";
import Button from "primevue/button";

const props = defineProps({
    form: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['submit', 'cancel']);

const accommodationTypes = [
    { label: 'Hotel', value: 'hotel' },
    { label: 'Apartamento', value: 'apartamento' },
    { label: 'Casa', value: 'casa' },
    { label: 'Hostal', value: 'hostal' },
    { label: 'Villa', value: 'villa' },
];

const statusOptions = [
    { label: 'Borrador', value: 'borrador' },
    { label: 'Publicado', value: 'publicado' },
    { label: 'Inactivo', value: 'inactivo' },
];
</script>

<template>
    <div class="space-y-6">
        <!-- Contacto -->
        <div>
            <h3 class="text-lg font-semibold mb-4">Información de Contacto</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Email de Contacto" 
                    v-model="form.contact_email" 
                    type="email"
                    :error-message="form.errors.contact_email" 
                    required 
                />

                <Input 
                    label="Teléfono de Contacto" 
                    v-model="form.contact_phone"
                    :error-message="form.errors.contact_phone" 
                    required 
                />
            </div>
        </div>

        <div>
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Servicios y Amenidades</h3>
                <Button 
                    @click="showAmenityModal = true" 
                    icon="fa-solid fa-plus" 
                    label="Agregar Amenidad"
                    severity="success" 
                    outlined 
                    size="small"
                />
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <div 
                    v-for="amenity in amenities" 
                    :key="amenity.id"
                    class="flex items-center space-x-2"
                >
                    <Checkbox 
                        :inputId="'amenity-' + amenity.id" 
                        v-model="form.amenities"
                        :value="amenity.id" 
                    />
                    <label 
                        :for="'amenity-' + amenity.id" 
                        class="text-sm cursor-pointer flex items-center space-x-2"
                    >
                        <i v-if="amenity.icon" :class="amenity.icon" class="text-blue-600"></i>
                        <span>{{ amenity.name }}</span>
                    </label>
                </div>
            </div>
        </div>

        <!-- Modal para añadir amenidades y servicios -->
        <Dialog 
            v-model:visible="showAmenityModal" 
            modal 
            header="Agregar Nueva Amenidad" 
            :style="{ width: '500px' }"
            class="p-fluid"
        >
            <form @submit.prevent="saveAmenity" class="space-y-4">
                <div>
                    <Input 
                        label="Nombre de la Amenidad" 
                        v-model="newAmenity.name"
                        :error-message="amenityErrors.name"
                        required 
                        placeholder="Ej: WiFi Gratis, Piscina, Parking..."
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Icono de la Amenidad
                    </label>
                    <div class="flex items-center space-x-4 mb-4">
                        <div class="flex-1">
                            <Input 
                                label="Buscar Icono" 
                                v-model="iconSearch"
                                placeholder="Buscar icono..."
                                @input="filterIcons"
                            />
                        </div>
                        <div v-if="newAmenity.icon" class="flex items-center space-x-2 text-blue-600">
                            <i :class="newAmenity.icon" class="text-2xl"></i>
                            <span class="text-sm">{{ newAmenity.icon }}</span>
                        </div>
                    </div>
                    
                    <div class="border rounded-lg p-4 max-h-60 overflow-y-auto">
                        <div class="grid grid-cols-8 gap-2">
                            <button
                                v-for="icon in filteredIcons"
                                :key="icon"
                                type="button"
                                @click="selectIcon(icon)"
                                :class="[
                                    'p-3 border rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center',
                                    newAmenity.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                ]"
                                :title="icon"
                            >
                                <i :class="icon" class="text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <span v-if="amenityErrors.icon" class="text-red-500 text-xs">
                        {{ amenityErrors.icon }}
                    </span>
                </div>

                <div class="flex gap-x-4 justify-end pt-4">
                    <Button 
                        @click="closeAmenityModal" 
                        type="button"
                        severity="secondary" 
                        label="Cancelar"
                        outlined
                    />
                    <Button 
                        type="submit"
                        severity="success" 
                        label="Guardar Amenidad"
                        :loading="savingAmenity"
                        icon="fa-solid fa-save"
                    />
                </div>
            </form>
        </Dialog>

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
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import Input from "@/Components/Customs/Input.vue";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const props = defineProps({
    form: {
        type: Object,
        required: true
    },
    amenities: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['submit', 'cancel', 'amenityAdded']);

// Modal state
const showAmenityModal = ref(false);
const savingAmenity = ref(false);

// New amenity form
const newAmenity = ref({
    name: '',
    icon: ''
});

const amenityErrors = ref({
    name: '',
    icon: ''
});

// Icon selection
const iconSearch = ref('');

// Lista de iconos FontAwesome comunes para amenidades
const availableIcons = [
    'fa-solid fa-wifi',
    'fa-solid fa-swimming-pool', 
    'fa-solid fa-car',
    'fa-solid fa-utensils',
    'fa-solid fa-dumbbell',
    'fa-solid fa-hot-tub',
    'fa-solid fa-snowflake',
    'fa-solid fa-fire',
    'fa-solid fa-tv',
    'fa-solid fa-bed',
    'fa-solid fa-bath',
    'fa-solid fa-shower',
    'fa-solid fa-coffee',
    'fa-solid fa-wine-glass',
    'fa-solid fa-cocktail',
    'fa-solid fa-bicycle',
    'fa-solid fa-dog',
    'fa-solid fa-baby',
    'fa-solid fa-wheelchair',
    'fa-solid fa-smoking-ban',
    'fa-solid fa-wind',
    'fa-solid fa-sun',
    'fa-solid fa-moon',
    'fa-solid fa-mountain',
    'fa-solid fa-water',
    'fa-solid fa-tree',
    'fa-solid fa-leaf',
    'fa-solid fa-spa',
    'fa-solid fa-massage',
    'fa-solid fa-gamepad',
    'fa-solid fa-music',
    'fa-solid fa-book',
    'fa-solid fa-camera',
    'fa-solid fa-phone',
    'fa-solid fa-envelope',
    'fa-solid fa-globe',
    'fa-solid fa-map-marker-alt',
    'fa-solid fa-clock',
    'fa-solid fa-calendar',
    'fa-solid fa-credit-card',
    'fa-solid fa-lock',
    'fa-solid fa-key',
    'fa-solid fa-bell',
    'fa-solid fa-gift',
    'fa-solid fa-heart',
    'fa-solid fa-star',
    'fa-solid fa-thumb-up',
    'fa-solid fa-check',
    'fa-solid fa-plus',
    'fa-solid fa-home',
    'fa-solid fa-building',
    'fa-solid fa-warehouse',
    'fa-solid fa-store',
    'fa-solid fa-hospital',
    'fa-solid fa-school',
    'fa-solid fa-university',
    'fa-solid fa-church',
    'fa-solid fa-mosque',
    'fa-solid fa-synagogue',
    'fa-solid fa-plane',
    'fa-solid fa-train',
    'fa-solid fa-bus',
    'fa-solid fa-taxi',
    'fa-solid fa-ship',
    'fa-solid fa-anchor'
];

const filteredIcons = computed(() => {
    if (!iconSearch.value) {
        return availableIcons;
    }
    return availableIcons.filter(icon => 
        icon.toLowerCase().includes(iconSearch.value.toLowerCase())
    );
});

const selectIcon = (icon) => {
    newAmenity.value.icon = icon;
    amenityErrors.value.icon = '';
};

const filterIcons = () => {
    // This is handled by the computed property
};

const validateAmenity = () => {
    amenityErrors.value = {
        name: '',
        icon: ''
    };

    let isValid = true;

    if (!newAmenity.value.name.trim()) {
        amenityErrors.value.name = 'El nombre es requerido';
        isValid = false;
    }

    if (!newAmenity.value.icon) {
        amenityErrors.value.icon = 'Debes seleccionar un icono';
        isValid = false;
    }

    return isValid;
};

const saveAmenity = () => {
    if (!validateAmenity()) {
        return;
    }

    savingAmenity.value = true;

    // Usar router.post de Inertia 
    router.post(route('amenities.store'), {
        name: newAmenity.value.name.trim(),
        icon: newAmenity.value.icon
    }, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page) => {
            // Crear un objeto temporal para la nueva amenidad
            const newAmenityData = {
                id: Date.now(), // ID temporal
                name: newAmenity.value.name.trim(),
                icon: newAmenity.value.icon,
                slug: newAmenity.value.name.trim().toLowerCase().replace(/\s+/g, '-')
            };
            
            // Añadir la nueva amenidad a la lista
            props.amenities.push(newAmenityData);
            
            // Seleccionar automáticamente la nueva amenidad
            if (!props.form.amenities.includes(newAmenityData.id)) {
                props.form.amenities.push(newAmenityData.id);
            }

            closeAmenityModal();
            
            // Emitir evento para notificar al componente padre
            emit('amenityAdded', newAmenityData);
        },
        onError: (errors) => {
            // Los errores de validación vienen en este formato de Inertia
            amenityErrors.value = errors;
        },
        onFinish: () => {
            savingAmenity.value = false;
        }
    });
};

const closeAmenityModal = () => {
    showAmenityModal.value = false;
    newAmenity.value = {
        name: '',
        icon: ''
    };
    amenityErrors.value = {
        name: '',
        icon: ''
    };
    iconSearch.value = '';
};
</script>

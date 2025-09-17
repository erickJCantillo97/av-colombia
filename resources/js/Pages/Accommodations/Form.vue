<template>
    <AppLayout :title="accommodation ? 'Editar Alojamiento' : 'Crear Alojamiento'">
        <div class="p-4 space-y-4 h-full overflow-y-auto">
            <h1 class="text-xl font-extrabold">
                {{ accommodation ? `Editar Alojamiento ${accommodation.name}` : "Crear nuevo alojamiento" }}
            </h1>

            <Tabs value="0">
                <TabList>
                    <Tab value="0">Información Básica</Tab>
                    <Tab value="1">Ubicación</Tab>
                    <Tab value="2">Contacto y Amenidades</Tab>
                    <Tab value="3">Habitaciones</Tab>
                    <Tab value="4" v-if="accommodation">Fotos del Alojamiento</Tab>
                </TabList>

                <TabPanels>
                    <!-- Tab 0: Información Básica -->
                    <TabPanel value="0">
                        <BasicInformation 
                            :form="form" 
                            @submit="submit" 
                            @cancel="cancel" 
                        />
                    </TabPanel>

                    <!-- Tab 1: Ubicación -->
                    <TabPanel value="1">
                        <LocationForm 
                            :form="form" 
                            @submit="submit" 
                            @cancel="cancel" 
                        />
                    </TabPanel>

                    <!-- Tab 2: Contacto y Amenidades -->
                    <TabPanel value="2">
                        <ContactAmenities 
                            :form="form" 
                            :amenities="amenities"
                            @submit="submit" 
                            @cancel="cancel" 
                        />
                    </TabPanel>

                    <!-- Tab 3: Habitaciones -->
                    <TabPanel value="3">
                        <RoomsForm 
                            :form="form" 
                            :accommodation="accommodation"
                            @submit="submit" 
                            @cancel="cancel"
                            @addRoom="addRoom"
                            @removeRoom="removeRoom"
                            @removeImage="removeImage"
                            @roomImagesSelect="onRoomImagesSelect"
                        />
                    </TabPanel>
                    
                    <!-- Tab 4: Fotos del Alojamiento -->
                    <TabPanel value="4" v-if="accommodation">
                        <AccommodationPhotos 
                            :form="form" 
                            :accommodation="accommodation"
                            @submit="submit" 
                            @cancel="cancel"
                            @removeImage="removeImage"
                            @accommodationImagesSelect="onAccommodationImagesSelect"
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </AppLayout>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import { onMounted, watch } from 'vue';

import AppLayout from '@/Layouts/AppLayout.vue';
import Button from 'primevue/button';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

// Importar los nuevos componentes de formulario
import BasicInformation from '@/Components/Form/BasicInformation.vue';
import LocationForm from '@/Components/Form/LocationForm.vue';
import ContactAmenities from '@/Components/Form/ContactAmenities.vue';
import RoomsForm from '@/Components/Form/RoomsForm.vue';
import AccommodationPhotos from '@/Components/Form/AccommodationPhotos.vue';

const props = defineProps({
    accommodation: {
        type: Object,
        default: null
    },
    amenities: {
        type: Array,
        default: () => []
    }
});



const form = useForm({
    name: props.accommodation?.name || '',
    description: props.accommodation?.description || '',
    type: props.accommodation?.type || '',
    star_rating: props.accommodation?.star_rating || 0,
    status: props.accommodation?.status || 'draft',
    address_line_1: props.accommodation?.address_line_1 || '',
    city: props.accommodation?.city || '',
    state: props.accommodation?.state || '',
    country: props.accommodation?.country || '',
    postal_code: props.accommodation?.postal_code || '',
    latitude: props.accommodation?.latitude || '',
    longitude: props.accommodation?.longitude || '',
    contact_email: props.accommodation?.contact_email || '',
    contact_phone: props.accommodation?.contact_phone || '',
    amenities: props.accommodation?.amenities?.map(a => a.id) || [],
    portada: null,
    rooms: props.accommodation?.rooms || [],
    accommodation_images: [],
});

const submit = () => {
    if (props.accommodation) {
        form.post(route('accommodations.update', props.accommodation.id), {
            forceFormData: true,
            _method: 'PUT'
        });
    } else {
        form.post(route('accommodation.store'), {
            forceFormData: true
        });
    }
};

const cancel = () => {
    router.visit(route('accommodation.index'));
};

const addRoom = () => {
    form.rooms.push({
        name: '',
        description: '',
        price_per_night: 0,
        capacity_adults: 1,
        capacity_children: 0,
        room_images: []
    });
};

const removeRoom = (index) => {
    form.rooms.splice(index, 1);
};

const removeImage = (imageId, isRoom = false, roomIndex = null) => {
    if (isRoom && roomIndex !== null) {
        // Eliminar imagen de habitación
        const room = form.rooms[roomIndex];
        if (room.images) {
            room.images = room.images.filter(img => img.id !== imageId);
        }
    } else {
        // Eliminar imagen de alojamiento
        if (props.accommodation && props.accommodation.images) {
            props.accommodation.images = props.accommodation.images.filter(img => img.id !== imageId);
        }
    }
    
    // Llamar al endpoint para eliminar la imagen
    router.delete(route('accommodations.images.destroy', imageId), {
        preserveState: true,
        preserveScroll: true
    });
};

const onRoomImagesSelect = (event, roomIndex) => {
    // Si roomIndex es -1, significa que es para una nueva habitación
    // En este caso, guardamos las imágenes temporalmente para cuando se cree la habitación
    if (roomIndex === -1) {
        // Crear nueva habitación con las imágenes
        addRoom();
        const newRoomIndex = form.rooms.length - 1;
        if (!form.rooms[newRoomIndex].room_images) {
            form.rooms[newRoomIndex].room_images = [];
        }
        form.rooms[newRoomIndex].room_images = event.files;
    } else {
        // Habitación existente
        if (!form.rooms[roomIndex].room_images) {
            form.rooms[roomIndex].room_images = [];
        }
        form.rooms[roomIndex].room_images = event.files;
    }
};

const onAccommodationImagesSelect = (event) => {
    form.accommodation_images = event.files;
};


</script>
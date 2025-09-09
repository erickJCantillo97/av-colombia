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
                        <form @submit.prevent="submit" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <Input label="Nombre del Alojamiento" v-model="form.name"
                                        :error-message="form.errors.name" required />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Descripción
                                    </label>
                                    <Textarea v-model="form.description" rows="4"
                                        placeholder="Describe tu alojamiento..."
                                        class="w-full border border-gray-300 rounded-md p-2"
                                        :class="{ 'border-red-500': form.errors.description }" />
                                    <span v-if="form.errors.description" class="text-red-500 text-xs">
                                        {{ form.errors.description }}
                                    </span>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo de Alojamiento
                                    </label>
                                    <Dropdown v-model="form.type" :options="accommodationTypes" option-label="label"
                                        class="w-full" option-value="value" placeholder="Selecciona el tipo"
                                        :class="{ 'border-red-500': form.errors.type }" />
                                    <span v-if="form.errors.type" class="text-red-500 text-xs">
                                        {{ form.errors.type }}
                                    </span>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Rating de Estrellas
                                    </label>
                                    <Rating v-model="form.star_rating" :stars="5" :cancel="false"
                                        :class="{ 'border-red-500': form.errors.star_rating }" />
                                    <span v-if="form.errors.star_rating" class="text-red-500 text-xs">
                                        {{ form.errors.star_rating }}
                                    </span>
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Estado de Publicación
                                    </label>
                                    <Dropdown v-model="form.status" :options="statusOptions" option-label="label"
                                        option-value="value" placeholder="Selecciona el estado"
                                        :class="{ 'border-red-500': form.errors.status }" />
                                    <span v-if="form.errors.status" class="text-red-500 text-xs">
                                        {{ form.errors.status }}
                                    </span>
                                </div>
                            </div>

                            <div class="flex gap-x-4 mt-8 justify-between">
                                <Button @click="cancel" title="Cancelar" severity="danger" label="Cancelar"
                                    icon="fa-solid fa-times" class="!h-9 w-full" />
                                <Button @click="submit" title="Guardar" severity="success" :loading="form.processing"
                                    label="Guardar" icon="fa-solid fa-save" class="!h-9 w-full" />
                            </div>
                        </form>
                    </TabPanel>

                    <!-- Tab 1: Ubicación -->
                    <TabPanel value="1">
                        <div class="space-y-6">
                            <h3 class="text-lg font-semibold mb-4">Ubicación</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Dirección" v-model="form.address_line_1"
                                    :error-message="form.errors.address_line_1" required />

                                <Input label="Ciudad" v-model="form.city" :error-message="form.errors.city" required />

                                <Input label="Departamento/Estado" v-model="form.state"
                                    :error-message="form.errors.state" required />

                                <Input label="País" v-model="form.country" :error-message="form.errors.country"
                                    required />

                                <Input label="Código Postal" v-model="form.postal_code"
                                    :error-message="form.errors.postal_code" required />

                                <div></div>

                                <Input label="Latitud (Opcional)" v-model="form.latitude" type="number" step="any"
                                    :error-message="form.errors.latitude" />

                                <Input label="Longitud (Opcional)" v-model="form.longitude" type="number" step="any"
                                    :error-message="form.errors.longitude" />
                            </div>

                            <div class="flex gap-x-4 mt-8 justify-between">
                                <Button @click="cancel" title="Cancelar" severity="danger" label="Cancelar"
                                    icon="fa-solid fa-times" class="!h-9 w-full" />
                                <Button @click="submit" title="Guardar" severity="success" :loading="form.processing"
                                    label="Guardar" icon="fa-solid fa-save" class="!h-9 w-full" />
                            </div>
                        </div>
                    </TabPanel>

                    <!-- Tab 2: Contacto y Amenidades -->
                    <TabPanel value="2">
                        <div class="space-y-6">
                            <!-- Contacto -->
                            <div>
                                <h3 class="text-lg font-semibold mb-4">Información de Contacto</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Email de Contacto" v-model="form.contact_email" type="email"
                                        :error-message="form.errors.contact_email" required />

                                    <Input label="Teléfono de Contacto" v-model="form.contact_phone"
                                        :error-message="form.errors.contact_phone" required />
                                </div>
                            </div>

                            <!-- Amenidades -->
                            <div>
                                <h3 class="text-lg font-semibold mb-4">Servicios y Amenidades</h3>
                                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    <div v-for="amenity in amenities" :key="amenity.id"
                                        class="flex items-center space-x-2">
                                        <Checkbox :inputId="'amenity-' + amenity.id" v-model="form.amenities"
                                            :value="amenity.id" />
                                        <label :for="'amenity-' + amenity.id" class="text-sm cursor-pointer">
                                            {{ amenity.name }}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-x-4 mt-8 justify-between">
                                <Button @click="cancel" title="Cancelar" severity="danger" label="Cancelar"
                                    icon="fa-solid fa-times" class="!h-9 w-full" />
                                <Button @click="submit" title="Guardar" severity="success" :loading="form.processing"
                                    label="Guardar" icon="fa-solid fa-save" class="!h-9 w-full" />
                            </div>
                        </div>
                    </TabPanel>

                    <!-- Tab 3: Habitaciones -->
                    <TabPanel value="3">
                        <div class="space-y-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-semibold">Habitaciones</h3>
                                <Button @click="addRoom" icon="fa-solid fa-plus" label="Agregar Habitación"
                                    severity="success" outlined />
                            </div>

                            <div v-if="form.rooms.length === 0" class="text-center text-gray-500 py-8">
                                No hay habitaciones agregadas. Agrega al menos una habitación.
                            </div>

                            <div v-else class="space-y-4">
                                <div v-for="(room, index) in form.rooms" :key="'room-' + index"
                                    class="border rounded-lg p-4 bg-gray-50">
                                    <div class="flex justify-between items-center mb-4">
                                        <h4 class="font-medium">Habitación {{ index + 1 }}</h4>
                                        <Button @click="removeRoom(index)" icon="fa-solid fa-trash" severity="danger"
                                            text v-tooltip="'Eliminar habitación'" />
                                    </div>

                                    <div class="space-y-4">
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input :label="'Nombre de la Habitación'" v-model="room.name"
                                                :error-message="form.errors[`rooms.${index}.name`]" required />

                                            <Input :label="'Precio por Noche'" v-model="room.price_per_night"
                                                type="number" min="0" step="0.01" currency="COP"
                                                :error-message="form.errors[`rooms.${index}.price_per_night`]"
                                                required />

                                            <Input :label="'Capacidad Adultos'" v-model="room.capacity_adults"
                                                type="number" min="1"
                                                :error-message="form.errors[`rooms.${index}.capacity_adults`]"
                                                required />

                                            <Input :label="'Capacidad Niños'" v-model="room.capacity_children"
                                                type="number" min="0"
                                                :error-message="form.errors[`rooms.${index}.capacity_children`]"
                                                required />

                                            <div class="md:col-span-2">
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Descripción de la Habitación
                                                </label>
                                                <Textarea v-model="room.description" rows="3"
                                                    placeholder="Describe esta habitación..."
                                                    :class="{ 'border-red-500': form.errors[`rooms.${index}.description`] }" />
                                                <span v-if="form.errors[`rooms.${index}.description`]"
                                                    class="text-red-500 text-xs">
                                                    {{ form.errors[`rooms.${index}.description`] }}
                                                </span>
                                            </div>
                                        </div>

                                        <!-- Fotos de la habitación -->
                                        <div class="border-t pt-4">
                                            <h5 class="font-medium mb-2">Fotos de la Habitación {{ index + 1 }}</h5>

                                            <!-- Mostrar imágenes existentes si es edición -->
                                            <div v-if="accommodation && room.images && room.images.length > 0"
                                                class="mb-4">
                                                <div class="grid grid-cols-6 gap-4">
                                                    <div v-for="image in room.images" :key="image.id" class="relative">
                                                        <img :src="image.filepath"
                                                            :alt="'Foto habitación ' + (index + 1)"
                                                            class="h-28 shadow-md rounded-lg w-full object-cover" />
                                                        <button @click="removeImage(image.id, true, index)"
                                                            class="absolute -top-2 -right-2 bg-red-500 hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md shadow-red-400 size-6">
                                                            <i class="fa-solid fa-xmark text-xs"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Subir nuevas fotos -->
                                            <FileUpload :name="'room-images-' + index" :multiple="true" accept="image/*"
                                                :maxFileSize="1000000"
                                                @select="(event) => onRoomImagesSelect(event, index)" customUpload>
                                                <template #header="{ chooseCallback, clearCallback, files }">
                                                    <div
                                                        class="flex flex-wrap justify-between items-center flex-1 gap-4">
                                                        <div class="flex gap-2">
                                                            <Button @click="chooseCallback()" icon="pi pi-images"
                                                                size="small" severity="primary" label="Seleccionar" />
                                                            <Button label="Limpiar" @click="clearCallback()"
                                                                icon="pi pi-times" size="small" severity="danger"
                                                                :disabled="!files || files.length === 0" />
                                                        </div>
                                                        <span class="text-sm font-medium">Fotos de la Habitación</span>
                                                    </div>
                                                </template>

                                                <template #content="{ files, removeFileCallback }">
                                                    <div v-if="files.length > 0" class="flex flex-wrap gap-4 pt-4">
                                                        <div v-for="(file, fileIndex) of files"
                                                            :key="file.name + file.type + file.size" class="relative">
                                                            <img :src="file.objectURL" :alt="file.name"
                                                                class="h-20 w-20 object-cover rounded border" />
                                                            <button @click="removeFileCallback(fileIndex)"
                                                                class="absolute -top-2 -right-2 bg-red-500 hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md size-5">
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
                                                        <p class="mt-2 text-sm text-gray-500">Arrastra fotos aquí o haz
                                                            clic para seleccionar</p>
                                                    </div>
                                                </template>
                                            </FileUpload>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-x-4 mt-8 justify-between">
                                <Button @click="cancel" title="Cancelar" severity="danger" label="Cancelar"
                                    icon="fa-solid fa-times" class="!h-9 w-full" />
                                <Button @click="submit" title="Guardar" severity="success" :loading="form.processing"
                                    label="Guardar" icon="fa-solid fa-save" class="!h-9 w-full" />
                            </div>
                        </div>
                    </TabPanel>

                    <!-- Tab 4: Fotos del Alojamiento -->
                    <TabPanel value="4" v-if="accommodation">
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
                                    <div v-for="image in accommodation.images" :key="image.id" class="relative">
                                        <img :src="image.filepath" :alt="accommodation.name"
                                            class="h-28 shadow-md rounded-lg w-full object-cover" />
                                        <button @click="removeImage(image.id)"
                                            class="absolute -top-2 -right-2 bg-red-500 hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md shadow-red-400 size-6">
                                            <i class="fa-solid fa-xmark text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Subir nuevas fotos -->
                            <div>
                                <h4 class="font-medium mb-2">Agregar Nuevas Fotos</h4>
                                <FileUpload name="accommodation-images" :multiple="true" accept="image/*"
                                    :maxFileSize="1000000" @select="onAccommodationImagesSelect" customUpload>
                                    <template #header="{ chooseCallback, clearCallback, files }">
                                        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                                            <div class="flex gap-2">
                                                <Button @click="chooseCallback()" icon="pi pi-images" size="small"
                                                    severity="primary" label="Seleccionar" />
                                                <Button label="Limpiar" @click="clearCallback()" icon="pi pi-times"
                                                    size="small" severity="danger"
                                                    :disabled="!files || files.length === 0" />
                                            </div>
                                            <span class="text-lg font-bold">Subir Imágenes del Alojamiento</span>
                                        </div>
                                    </template>

                                    <template #content="{ files, removeFileCallback }">
                                        <div v-if="files.length > 0" class="flex flex-wrap gap-4 pt-4">
                                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                                                class="p-4 rounded border flex flex-col items-center gap-2">
                                                <img :src="file.objectURL" :alt="file.name"
                                                    class="h-24 w-24 object-cover rounded" />
                                                <span class="font-semibold text-sm truncate max-w-24">{{ file.name
                                                    }}</span>
                                                <div class="text-xs text-gray-500">{{ formatSize(file.size) }}</div>
                                                <Button icon="pi pi-times" @click="removeFileCallback(index)" outlined
                                                    rounded severity="danger" size="small" />
                                            </div>
                                        </div>
                                    </template>

                                    <template #empty>
                                        <div class="flex items-center justify-center flex-col">
                                            <i
                                                class="pi pi-cloud-upload border-2 rounded-full p-8 text-4xl text-gray-400" />
                                            <p class="mt-6 mb-0">Arrastra y suelta imágenes aquí.</p>
                                        </div>
                                    </template>
                                </FileUpload>
                            </div>

                            <div class="flex gap-x-4 mt-8 justify-between">
                                <Button @click="cancel" title="Cancelar" severity="danger" label="Cancelar"
                                    icon="fa-solid fa-times" class="!h-9 w-full" />
                                <Button @click="submit" title="Guardar" severity="success" :loading="form.processing"
                                    label="Guardar" icon="fa-solid fa-save" class="!h-9 w-full" />
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Input from "@/Components/Customs/Input.vue";
import { useForm, router } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";
import { alerts } from "@/composable/toasts";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Rating from "primevue/rating";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";

const { toast } = alerts();

const files = ref([]);
const roomFiles = ref({});

const props = defineProps({
    accommodation: Object,
    amenities: Array,
});

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

const form = useForm({
    name: '',
    description: '',
    type: '',
    address_line_1: '',
    city: '',
    state: '',
    country: 'Colombia',
    postal_code: '',
    latitude: null,
    longitude: null,
    star_rating: 1,
    contact_email: '',
    contact_phone: '',
    status: 'borrador',
    amenities: [],
    rooms: [],
    images: [],
    portada: '',
});

const assignMatchingKeys = (source, target) => {
    Object.keys(source).forEach((key) => {
        if (key in target.data()) {
            target[key] = source[key];
        }
    });
};

onMounted(() => {
    if (props.accommodation) {
        // Cargar datos del alojamiento existente
        assignMatchingKeys(props.accommodation, form);

        // Cargar amenidades seleccionadas
        if (props.accommodation.amenities) {
            form.amenities = props.accommodation.amenities.map(a => a.id);
        }

        // Cargar habitaciones
        if (props.accommodation.rooms) {
            form.rooms = props.accommodation.rooms.map((room, index) => {
                // Inicializar archivos para habitaciones existentes
                roomFiles.value[index] = [];
                return {
                    id: room.id,
                    name: room.name,
                    description: room.description,
                    capacity_adults: room.capacity_adults,
                    capacity_children: room.capacity_children,
                    price_per_night: room.price_per_night,
                    images: room.images || [],
                };
            });
        }
    } else {
        // Agregar una habitación por defecto para nuevos alojamientos
        addRoom();
    }
});

const addRoom = () => {
    const roomIndex = form.rooms.length;
    form.rooms.push({
        name: '',
        description: '',
        capacity_adults: 2,
        capacity_children: 0,
        price_per_night: 0,
        images: [],
    });
    // Inicializar array de archivos para esta habitación
    roomFiles.value[roomIndex] = [];
};

const removeRoom = (index) => {
    form.rooms.splice(index, 1);
    // Limpiar archivos asociados a esta habitación
    delete roomFiles.value[index];
    // Reindexar los archivos de habitaciones restantes
    const newRoomFiles = {};
    Object.keys(roomFiles.value).forEach((key, newIndex) => {
        if (parseInt(key) < index) {
            newRoomFiles[key] = roomFiles.value[key];
        } else if (parseInt(key) > index) {
            newRoomFiles[newIndex] = roomFiles.value[key];
        }
    });
    roomFiles.value = newRoomFiles;
};

const onAccommodationImagesSelect = (event) => {
    files.value = event.files;
};

const onRoomImagesSelect = (event, roomIndex) => {
    roomFiles.value[roomIndex] = event.files;
};

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

const removeImage = (id, isRoom = false, roomIndex = null) => {
    // Esta función necesitaría implementarse en el backend
    router.delete(route('accommodations.images.delete', id), {
        onSuccess: () => {
            toast('success', 'Imagen eliminada con éxito');
        },
        onError: (error) => {
            toast('error', 'Error al eliminar la imagen: ' + error);
        },
    });
};

const submit = () => {
    // Asignar imágenes principales
    form.images = files.value;

    // Asignar imágenes a cada habitación
    form.rooms.forEach((room, index) => {
        if (roomFiles.value[index]) {
            room.images = roomFiles.value[index];
        }
    });

    if (props.accommodation) {
        form.put(route('accommodations.update', props.accommodation.id), {
            onSuccess: () => {
                toast('success', 'Alojamiento actualizado exitosamente');
            },
        });
    } else {
        form.post(route('accommodations.store'), {
            onSuccess: () => {
                toast('success', 'Alojamiento creado exitosamente');
            },
        });
    }
};

const cancel = () => {
    router.visit(route('accommodations.index'));
};
</script>

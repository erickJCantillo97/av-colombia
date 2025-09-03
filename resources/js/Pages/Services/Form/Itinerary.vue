<template>
    <div class="flex flex-col gap-y-2">
        <h4 class="text-2xl font-semibold text-green-800">Itinerario</h4>
        <span class=" italic">Estos son los servicios que se incluirán en la reserva</span>
    </div>
    <div class="sm:grid sm:grid-cols-3 gap-4 mt-6">
        <form @submit.prevent="submit" class="space-y-7 h-[600px] flex flex-col items-center justify-center">
            <div class="flex flex-col gap-2">
                <label for="title">Título a mostrar</label>
                <InputText id="title" v-model="form.title" aria-describedby="title-help" required />
                <Message size="small" severity="secondary" variant="simple">
                    El título a mostrar se mostrará en la página de detalle del servicio
                </Message>
            </div>
            <div class="flex flex-col gap-2">
                <label for="description">Descripción a mostrar</label>
                <Textarea id="description" v-model="form.description" required aria-describedby="description-help" />
                <Message size="small" severity="secondary" variant="simple">
                    La descripción a mostrar se mostrará en la página de detalle del servicio
                </Message>
            </div>
            <div class="card flex flex-col gap-6">
                <FileUpload mode="basic" choose-label="Agrega una imagen del itinerario" @select="onFileSelect"
                    customUpload auto severity="secondary" class="p-button-outlined w-full" />
                <img v-if="form.image" :src="form.image" alt="Image"
                    class="shadow-md rounded-xl w-full h-40 object-cover" style="filter: grayscale(100%)" />
            </div>
            <div class="flex gap-7">
                <Button type="submit" severity="primary">{{ isEditing ? 'Actualizar' : 'Agregar' }}</Button>
                <Button v-if="isEditing" type="button" @click="cancelEdit" severity="secondary">Cancelar</Button>
            </div>
        </form>
        <div class="col-span-2 bg-gray-300 p-2 rounded-md h-[600px] gap-3 flex flex-col overflow-y-auto">
            <div v-if="filteredItineraries.length === 0" class="flex items-center justify-center h-full">
                <p class="text-gray-500 italic">No hay itinerarios agregados</p>
            </div>
            <span v-for="(item, index) in filteredItineraries" :key="index">
                <div class="w-full bg-white grid grid-cols-3 gap-3 p-5 rounded-lg shadow-md mb-3">
                    <img :src="item.image" alt="Image" class="w-full rounded-lg h-full object-cover" />
                    <div class="col-span-2 flex justify-center">
                        <span class="w-full">
                            <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                            <p>{{ item.description }}</p>
                        </span>
                        <div class="flex flex-col justify-end gap-2">
                            <Button type="button" @click="edit(index)" severity="warn" icon="fa-solid fa-pen"></Button>
                            <Button type="button" @click="deleteItem(index)" severity="danger"
                                icon="fa-solid fa-trash"></Button>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    </div>
    <div class="flex justify-center p-5">
        <Button type="button" @click="save" icon="fa-solid fa-save" label="Guardar todo" severity="primary" />
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { reactive, ref, computed } from 'vue';

const props = defineProps({
    service: Object,
    itineraries: Array,
});

// Estado para controlar si estamos editando o creando
const isEditing = ref(false);
const editingIndex = ref(-1);

// Formulario reactivo para los datos del itinerario
const form = reactive({
    id: '',
    title: '',
    description: '',
    image: null,
    service_id: props.service.id,
    option: 'create'
});

// Inicializar los itinerarios con los datos recibidos
const itineraries = ref(props.itineraries.map(item => ({
    ...item,
    image: item.images && item.images.length > 0 ? item.images[0].filepath : null,
    option: null // Inicialmente ningún itinerario tiene modificaciones
})));

// Computed property para mostrar solo los itinerarios no eliminados
const filteredItineraries = computed(() => {
    return itineraries.value.filter(item => item.option !== 'delete');
});

/**
 * Maneja la selección de archivos para la imagen del itinerario
 * @param {Event} event - Evento de selección de archivo
 */
function onFileSelect(event) {
    const file = event.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        form.image = e.target.result;
    };
    reader.readAsDataURL(file);
}

/**
 * Valida el formulario antes de enviarlo
 * @returns {Boolean} - Verdadero si el formulario es válido
 */
function validateForm() {
    if (!form.title || !form.title.trim()) {
        alert('El título es obligatorio');
        return false;
    }
    if (!form.description || !form.description.trim()) {
        alert('La descripción es obligatoria');
        return false;
    }
    if (!form.image) {
        alert('La imagen es obligatoria');
        return false;
    }
    return true;
}

/**
 * Envía el formulario para agregar o actualizar un itinerario
 */
const submit = () => {
    if (!validateForm()) return;

    if (isEditing.value) {
        // Actualizar itinerario existente
        const index = editingIndex.value;
        if (index >= 0 && index < itineraries.value.length) {
            // Si el itinerario ya existía en la base de datos, marcarlo como editado
            if (itineraries.value[index].id) {
                itineraries.value[index].option = 'edit';
            }

            // Actualizar los datos del itinerario
            itineraries.value[index].title = form.title;
            itineraries.value[index].description = form.description;
            itineraries.value[index].image = form.image;

            // Resetear el modo de edición
            cancelEdit();
        }
    } else {
        // Agregar nuevo itinerario
        itineraries.value.push({
            id: '',
            title: form.title,
            description: form.description,
            image: form.image,
            service_id: props.service.id,
            option: 'create'
        });

        // Limpiar el formulario
        resetForm();
    }
};

/**
 * Limpia el formulario
 */
function resetForm() {
    form.id = '';
    form.title = '';
    form.description = '';
    form.image = null;
    form.option = 'create';
}

/**
 * Cancela la edición actual
 */
function cancelEdit() {
    isEditing.value = false;
    editingIndex.value = -1;
    resetForm();
}

/**
 * Guarda todos los itinerarios modificados
 */
function save() {
    // Filtrar solo los itinerarios que tienen una opción asignada (create, edit, delete)
    const modifiedItineraries = itineraries.value.filter(item => item.option !== null).map(item => {
        // Crear una copia limpia del itinerario con solo los campos necesarios
        const cleanItem = {
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
            service_id: item.service_id,
            option: item.option
        };

        return cleanItem;
    });

    if (modifiedItineraries.length === 0) {
        alert('No hay cambios para guardar');
        return;
    }

    console.log('Itinerarios modificados:', modifiedItineraries);

    const data = useForm({
        itineraries: modifiedItineraries
    });

    data.post(route('itinerary.store'), {
        onSuccess: (response) => {
            console.log('Guardado exitoso:', response);
            // Actualizar los itinerarios después de guardar
            itineraries.value = itineraries.value.filter(item => item.option !== 'delete');
            // Resetear las opciones ya que se han guardado los cambios
            itineraries.value.forEach(item => item.option = null);
        },
        onError: (errors) => {
            console.error('Error al guardar:', errors);
            alert('Ocurrió un error al guardar los cambios');
        }
    });
}

/**
 * Prepara el formulario para editar un itinerario existente
 * @param {Number} index - Índice del itinerario a editar
 */
function edit(index) {
    const item = filteredItineraries.value[index];
    if (!item) return;

    // Encontrar el índice real en el array original
    const realIndex = itineraries.value.findIndex(i =>
        i.id === item.id &&
        i.title === item.title &&
        i.description === item.description
    );

    if (realIndex >= 0) {
        isEditing.value = true;
        editingIndex.value = realIndex;

        form.id = item.id || '';
        form.title = item.title;
        form.description = item.description;
        form.image = item.image;
    }
}

/**
 * Marca un itinerario para eliminación
 * @param {Number} index - Índice del itinerario a eliminar
 */
function deleteItem(index) {
    const item = filteredItineraries.value[index];
    if (!item) return;

    // Encontrar el índice real en el array original
    const realIndex = itineraries.value.findIndex(i =>
        i.id === item.id &&
        i.title === item.title &&
        i.description === item.description
    );

    if (realIndex >= 0) {
        // Si el itinerario ya existe en la base de datos, marcarlo para eliminación
        if (itineraries.value[realIndex].id) {
            itineraries.value[realIndex].option = 'delete';
        } else {
            // Si es un itinerario nuevo que no se ha guardado, eliminarlo directamente
            itineraries.value.splice(realIndex, 1);
        }
    }
}
</script>

<script setup>
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const op = ref();
const addFeature = ref(false);
const feature = ref({
    name: '',
    color: ''
});

const newFeature = () => {
    form.features.push({
        name: feature.value.name,
        color: feature.value.color
    });
    feature.value = {
        name: '',
        color: ''
    }
}

const form = useForm({
    title: '',
    description: '',
    features: [],
    price: '',
    images: [],
    days: []
});

const files = ref([])

const submit = () => {
    let data = [];
    if (files.value) {
        console.log(files.value)
        files.value.getFiles().forEach((file) => data.push(file.file));
    }
    form.images = data;
    form.post(route('services.store'), {
        onSuccess: () => {
            visible.value = false
        }
    })
}

const toggle = (event) => {
    op.value.toggle(event);
}
const days = [
    { name: 'Domingo', value: 0 },
    { name: 'Lunes', value: 1 },
    { name: 'Martes', value: 2 },
    { name: 'Miercoles', value: 3 },
    { name: 'Jueves', value: 4 },
    { name: 'Viernes', value: 5 },
    { name: 'Sabado', value: 6 },
];
</script>
<template>
    <AppLayout>
        <div class="p-10 space-y-">
            <h1 class="text-3xl font-extrabold">Crear nuevo servicio</h1>
            <div class="space-y-5">
                <div class="grid grid-cols-2 gap-4 my-4">
                    <Input label="Titulo" v-model="form.title" />
                    <Input label="Precio" type="number" min="0" currency="COP" :minFractionDigits="2"
                        :maxFractionDigits="2" v-model="form.price" />
                </div>
                <div>
                    <label for="" class="text-md font-bold"> Dias de Atencion</label>
                    <div class="flex justify-between items-center">
                        <div v-for="(day, index) in days" class="flex items-center cursor-pointer">
                            <Checkbox :value="day.value" name="days" :inputId="`Day${index}`" v-model="form.days"
                                class="mr-2" />
                            <label :for="`Day${index}`" class="cursor-pointer">{{ day.name }}</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="" class="text-md font-bold">Descripción del Servicio</label>
                    <Editor v-model="form.description" :key="editor" editorStyle="height: 120px" />
                </div>
                <div>
                    <label for="" class="text-lg font-bold ">Caracteristicas Generales</label>
                    <div class="flex space-x-4 w-full mt-2 overflow-y-auto border-b py-2">
                        <div v-for="feature in form.features"
                            class="py-1.5 px-3 text-sm font-bold text-white  rounded-full"
                            :style="`background-color: #${feature.color};`">
                            {{ feature.name }}
                        </div>
                        <div @click="toggle"
                            class="py-1.5 px-3 text-sm font-bold text-white bg-teal-700 rounded-full cursor-pointer">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="" class="text-md font-bold">Fotos</label>
                    <Input type="file-pond" v-model="files" />
                </div>
            </div>
            <div class="flex justify-between">
                <Button @click="submit" title="Save" severity="success" label="Enviar" outlined icon="fa-solid fa-save"
                    class="!h-8" />
                <Button @click="visible = false" title="Cancel" severity="danger" label="Cancel" outlined
                    icon="fa-solid fa-times" class="!h-8" />
            </div>
        </div>



        <Popover ref="op">
            <div class="flex flex-col gap-4 w-[25rem]">
                <div class="space-y-4">
                    <Input type="text" v-model="feature.name" label="Nombre" />
                    <div class="flex flex-col">
                        <label for="" class="text-md font-bold mb-2">Seleccione un color</label>
                        <ColorPicker v-model="feature.color" pt:root="w-full" pt:preview="!w-full !h-9"
                            inputId=" cp-hex" format="hex" class="mb-4" />
                    </div>
                </div>
                <div class="flex justify-between">
                    <Button @click="addFeature = false" title="Cancel" severity="danger" label="Cancelar" outlined
                        icon="fa-solid fa-times" class="!h-8" />
                    <Button @click="newFeature" title="Save" severity="success" label="Añadir" outlined
                        icon="fa-solid fa-save" class="!h-8" />
                </div>
            </div>
        </Popover>

    </AppLayout>
</template>
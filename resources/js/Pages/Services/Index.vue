<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :columnas="columns" :data="services" :actions="buttons" title="Servicios">
                <template #buttonHeader>
                    <Button title="Add project" @click="addItem()" severity="success" label="New" outlined
                        icon="fa-solid fa-plus" class="!h-8" />
                </template>
            </Datatable>
        </div>
    </AppLayout>

    <Modal v-model:visible="visible">
        <template #title>
            <span class="text-xl font-bold white-space-nowrap">
                Agregar Servicio</span>
        </template>
        <template #icon>
            <i class="fa-solid fa-plus" />
        </template>
        <template #body>
            <div class="grid grid-cols-2 gap-4 my-4">
                <Input label="Titulo" v-model="form.title" />
                <Input label="Precio" type="number" currency="COP" :minFractionDigits="2" :maxFractionDigits="2"
                    v-model="form.price" />
            </div>
            <Editor v-model="form.description" :key="editor" editorStyle="height: 120px" />

            <div>
                <label for="">Fotos</label>
                <Input type="file-pond" v-model:input="files" />
            </div>
        </template>
        <template #footer>
            <Button @click="submit" title="Save" severity="success" label="Save" outlined icon="fa-solid fa-save"
                class="!h-8" />
            <Button @click="visible = false" title="Cancel" severity="danger" label="Cancel" outlined
                icon="fa-solid fa-times" class="!h-8" />
        </template>
    </Modal>
    <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Datatable from '@/Components/Customs/Datatable.vue';
import { router, useForm } from '@inertiajs/vue3';
import ConfirmPopup from 'primevue/confirmpopup';
import Modal from '@/Components/Customs/Modal.vue';
import { ref } from 'vue';
import Input from '@/Components/Customs/Input.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const files = ref([])

const columns = [
    {
        header: 'Nombre',
        field: 'title',
        filter: true,
    },
    {
        header: 'Descripción',
        field: 'description',
        type: 'html',
        filter: true,
    },
    {
        header: 'Precio',
        field: 'price',
        type: 'currency',
        filter: true,
    },

];

const toast = useToast()

const confirm = useConfirm()
const editor = ref(false)

const form = useForm({
    title: '',
    description: '',
    price: '',
    images: []
});

const visible = ref(false)
const buttons = [
    {
        action: (data) => {
            visible.value = true
            form.title = data.title
            form.description = data.description
            editor.value = data.id;
            form.price = data.price
        },
        severity: 'secondary',
        icon: 'fa-solid fa-pencil text-sm',

    },
    {
        action: (data, event) => {
            confirm.require({
                target: event.currentTarget,
                message: 'Seguro de Eliminar el Servicio ' + data.title + '?',
                icon: 'fa-solid fa-exclamation-triangle',
                rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
                acceptClass: 'p-button-sm p-button-danger',
                rejectLabel: 'Cancelar',
                acceptLabel: 'Eliminar',
                accept: () => {
                    console.log(data)
                    router.delete(route('services.destroy', data.id), {
                        onSuccess: () => {
                            toast.add({ severity: 'error', icon: 'fa-solid fa-trash-can', summary: '¡Accion realizada!', detail: 'Se eliminó con exito', group: 'customTooltipDataTable', life: 5000 });
                        }
                    })

                }
            });
        },
        severity: 'danger',
        icon: 'fa-regular fa-trash-can text-sm',

    },
    // { event: 'deleteClic', severity: 'danger', icon: 'fa-regular fa-trash-can', class: '!h-8', text: true, outlined: false, rounded: false, show: hasPermission('projects delete') },
]

const addItem = () => {
    visible.value = true
}

const props = defineProps({
    services: Array,
});

const submit = () => {
    let data = [];
    if (files.value) {
        files.value.getFiles().forEach((file) => data.push(file.file));
    }
    form.images = data;
    form.post(route('services.store'), {
        onSuccess: () => {
            visible.value = false
        }
    })
}

</script>
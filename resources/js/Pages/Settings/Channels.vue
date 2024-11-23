<template>
    <div class="h-[99vh]">
        <Datatable :columnas="columns" :add :data="channels" routecreate="services.create" :actions="buttons">
        </Datatable>
    </div>

    <Modal v-model:visible="visible" :close-on-escape="true">
        <template #title>
            <span class="text-xl font-bold white-space-nowrap">
                Agregar Canal</span>
        </template>
        <template #icon>
            <i class="fa-solid fa-plus" />
        </template>
        <div class="space-y-3">
            <Input label="Nombre del Canal" v-model="form.name" />
            <Input label="Iniciales" v-model="form.abreviacion" />
            <Input type="number" label="Porcentaje" v-model="form.percent" suffix=" %" min-fraction-digits="2"
                max-fraction-digits="2" />

        </div>
        <template #footer>
            <Button @click="submit" title="Guardar" severity="success" label="Guardar" outlined icon="fa-solid fa-save"
                class="!h-8" />
            <Button @click="visible = false" title="Cancel" severity="danger" label="Cancelar" outlined
                icon="fa-solid fa-times" class="!h-8" />
        </template>
    </Modal>
    <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Datatable from '@/Components/Customs/Datatable.vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import ConfirmPopup from 'primevue/confirmpopup';
import Modal from '@/Components/Customs/Modal.vue';
import { ref } from 'vue';
import Input from '@/Components/Customs/Input.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';



const columns = [
    {
        header: 'Nombre',
        field: 'name',
        filter: true,
    },
    {
        header: 'iniciales ',
        field: 'abreviacion',
        filter: true,
    },
    {
        header: 'Porcentaje',
        field: 'percent',
        filter: true,
        format: (value) => {
            return value + '%'
        }
    },
    {
        header: 'Creación',
        field: 'created_at',
        type: 'datetime',
        filter: true,
    },

];

const toast = useToast()

const confirm = useConfirm()

const editor = ref(false)

const form = useForm({
    name: '',
    abreviacion: '',
    percent: '',
});


const visible = ref(false)

const add = {
    action: () => {
        form.reset();
        editor.value = false;
        visible.value = true
    },

}


const buttons = [

    {
        action: (data) => {
            visible.value = true
            editor.value = data.id
            form.name = data.name
            form.abreviacion = data.abreviacion
            form.percent = data.percent

        },
        severity: 'secondary',
        icon: 'fa-solid fa-pencil text-sm',

    },
    {
        action: (data, event) => {
            confirm.require({
                target: event.currentTarget,
                message: 'Seguro de Eliminar el Usuario ' + data.name + '?',
                icon: 'fa-solid fa-exclamation-triangle',
                rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
                acceptClass: 'p-button-sm p-button-danger',
                rejectLabel: 'Cancelar',
                acceptLabel: 'Eliminar',
                accept: () => {
                    console.log(data)
                    router.delete(route('users.destroy', data.id), {
                        onSuccess: () => {
                            toast.add({ severity: 'error', icon: 'fa-solid fa-trash-can', summary: '¡Accion realizada!', detail: 'Usuario eliminado con exito', group: 'customTooltipDataTable', life: 5000 });
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



const submit = () => {
    if (editor.value) {
        router.put(route('channels.update', editor.value), form, {
            onSuccess: () => {
                visible.value = false
                getChannels()
                editor.value = false
            }
        })

    } else {
        router.post(route('channels.store'), form, {
            onSuccess: () => {
                visible.value = false
                getChannels()
                editor.value = false
            }
        })
    }
}

const channels = ref([])

const getChannels = () => {
    axios.get(route('channels.index'))
        .then(response => {
            channels.value = response.data
        })
}


getChannels()

</script>
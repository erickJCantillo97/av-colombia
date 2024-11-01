<template>
    <Datatable :add :data :columnas="columns" :actions="buttons">

    </DataTable>

    <Modal v-model="visible" title="Crear Metodo de Pago" :close-on-escape="true">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nombre" v-model="form.name" />
            <Input label="Porcentaje de pago" type="number" v-model="form.parcent_charge" />
        </div>
        <template #footer>
            <Button @click="submit" title="Save" severity="success" label="Save" outlined icon="fa-solid fa-save"
                class="!h-8" />
            <Button @click="visible = false" title="Cancel" severity="danger" label="Cancel" outlined
                icon="fa-solid fa-times" class="!h-8" />
        </template>
    </Modal>
</template>
<script setup>
import { ref } from 'vue';
import Datatable from './Customs/Datatable.vue';
import Modal from './Customs/Modal.vue';
import axios from 'axios';
import Input from './Customs/Input.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { alerts } from '@/composable/toasts';

const { toast } = alerts()
const visible = ref(false)
const add = {
    action: () => {
        visible.value = true
    },
}

const columns = [
    {
        header: 'Nombre',
        field: 'name',
        filter: true,
    },
    {
        header: 'Porcentaje de Pago',
        field: 'parcent_charge',
        filter: true,
        format: (value) => {
            return value + '%'
        }
    }
];

const buttons = [

    {
        action: (data) => {
            if (usePage().props.auth.user.rol == 'admin') {
                router.visit(route('services.edit', data.id))
            } else {
                visible.value = true
                service.value = data
                form.service_id = data.id
                form.adult_tarifa = data.adult_tarifa
                form.boys_tarifa = data.boy_tarifa
            }
        },
        severity: 'secondary',
        icon: 'fa-solid fa-pencil text-sm',

    },
    {
        action: (data, event) => {
            confirm.require({
                target: event.currentTarget,
                message: 'Seguro de Eliminar el Metodo de pago ' + data.name + '?',
                icon: 'fa-solid fa-exclamation-triangle',
                rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
                acceptClass: 'p-button-sm p-button-danger',
                rejectLabel: 'Cancelar',
                acceptLabel: 'Eliminar',
                accept: () => {
                    console.log(data)
                    router.delete(route('services.destroy', data.id), {
                        onSuccess: () => {
                            toast('success', 'Servicio eliminado con exito')
                        }
                    })

                }
            });
        },
        show: usePage().props.auth.user.rol == 'admin',
        severity: 'danger',
        icon: 'fa-regular fa-trash-can text-sm',

    },
    // { event: 'deleteClic', severity: 'danger', icon: 'fa-regular fa-trash-can', class: '!h-8', text: true, outlined: false, rounded: false, show: hasPermission('projects delete') },
]

const form = useForm({
    name: '',
    parcent_charge: 0,
    description: ''
})

const data = ref([]);

const getData = () => {
    axios.get(route('paymentMethods.index'))
        .then(response => {
            data.value = response.data
        })
        .catch(error => {
            console.log(error)
        })
}
getData()

const submit = () => {
    form.post(route('paymentMethods.store'), {
        onSuccess: () => {
            visible.value = false
            getData()
            toast('success', 'Metodo de pago creado correctamente')
        }
    })
}
</script>
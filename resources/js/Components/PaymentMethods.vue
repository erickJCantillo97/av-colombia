<template>
    <div class="bg-white rounded-xl">
        <Datatable :add :data :columnas="columns" :actions="buttons">
        </Datatable>
    </div>

    <Modal v-model="visible" :title="form.id ? 'Editar Método de Pago' : 'Crear Método de Pago'" :close-on-escape="true" width="500px">
        <template #icon>
            <i :class="form.id ? 'fa-solid fa-pencil' : 'fa-solid fa-plus'"></i>
        </template>
        <div class="space-y-4 p-2">
            <div class="bg-gray-50 rounded-xl p-4 space-y-4">
                <Input label="Nombre del Método" v-model="form.name" placeholder="Ej: Tarjeta de Crédito, PSE, Efectivo" />
                <Input label="Porcentaje de Cargo" type="number" suffix=" %" min-fraction-digits="0" max-fraction-digits="2"
                    v-model="form.parcent_charge" placeholder="0.00" />
            </div>
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <i class="fa-solid fa-circle-exclamation text-amber-600 mt-0.5"></i>
                <p class="text-sm text-amber-800">Este porcentaje se agregará al total de la transacción como cargo adicional.</p>
            </div>
        </div>
        <template #footer>
            <Button @click="submit" title="Guardar" severity="success" label="Guardar" outlined icon="fa-solid fa-save"
                class="!h-9" />
            <Button @click="visible = false" title="Cancelar" severity="danger" label="Cancelar" outlined
                icon="fa-solid fa-times" class="!h-9" />
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
        form.reset()
        visible.value = true
    },
}
const methods = ref([]);



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

            visible.value = true
            form.name = data.name
            form.parcent_charge = data.parcent_charge
            form.id = data.id

        },
        severity: 'secondary',
        icon: 'fa-solid fa-pencil text-sm',

    },
    {
        action: (data, event) => {
            form.delete(route('paymentMethods.destroy', data.id), {
                onSuccess: () => {
                    getData()
                    toast('success', 'Metodo de pago eliminado correctamente')
                }
            })
        },
        show: usePage().props.auth.user.rol == 'admin',
        severity: 'danger',
        icon: 'fa-regular fa-trash-can text-sm',

    },
    // { event: 'deleteClic', severity: 'danger', icon: 'fa-regular fa-trash-can', class: '!h-8', text: true, outlined: false, rounded: false, show: hasPermission('projects delete') },
]

const form = useForm({
    id: null,
    name: '',
    parcent_charge: 0,
    description: '',
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
    if (form.id) {
        form.put(route('paymentMethods.update', form.id), {
            onSuccess: () => {
                visible.value = false
                getData()
                toast('success', 'Metodo de pago actualizado correctamente')
            }
        })
        return
    }
    form.post(route('paymentMethods.store'), {
        onSuccess: () => {
            visible.value = false
            getData()
            toast('success', 'Metodo de pago creado correctamente')
        }
    })
}

const getMethos = () => {
    axios.get(route('paymentMethods.index'))
        .then(response => {
            methods.value = response.data
        })
        .catch(error => {
            console.log(error)
        })
}
getMethos()
</script>
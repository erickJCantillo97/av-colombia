<template>
    <Datatable :add :data :columnas="columns" :actions="buttons">

    </DataTable>

    <Modal v-model="visible" title="Crear Metodo de Pago" :close-on-escape="true">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nombre" v-model="form.name" />
            <Input label="Porcentaje de pago" type="number" suffix=" %" min-fraction-digits="0" max-fraction-digits="2"
                v-model="form.parcent_charge" />
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
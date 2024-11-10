<template>
    <AppLayout>
            <Datatable :data="proveedores" :columnas :add title="proveedores">

            </Datatable>
    </AppLayout> 
    <Modal v-model:visible="visible" close-on-escape="true" title="Añadir Proveedor">
        <div class="flex flex-col">
            <Input label="Nombre" v-model="form.nombre" />
            <Input label="Direccion" v-model="form.direccion"/>
            <Input label="Telefono" v-model="form.telefono"/>
        </div>

        <template #footer>
            <div class="flex gap-x-2">
                <Button severity="success" label="Guardar" @click="submit"></Button>
                <Button severity="danger" label="Cancelar" @click="visible = false"></Button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { alerts } from '@/composable/toasts';


const {toast} = alerts()

const visible = ref(false)
const add = {
    action:() => {
        visible.value = true
    }   
}

const props = defineProps({
    proveedores: Array
})

const columnas = [
    {
        field: 'nombre',
        header: 'Nombre',
        filter: true
    },
    {
        field: 'direccion',
        header: 'Direción',
        filter: true
    },
    {
        field: 'telefono',
        header: 'Telefono',
        filter: true
    },

]

const form = useForm({
    nombre: '',
    direccion: '',
    telefono: ''
})

const submit = () => {
    form.post(route('proveedors.store'), {
        onSuccess: () => {
            toast('success', 'Proveedor Creado')
        }
    })
}



</script>
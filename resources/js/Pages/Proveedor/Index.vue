<template>
    <AppLayout>
        <Datatable :data="proveedores" :actions="buttons" :columnas :add title="proveedores">

        </Datatable>
    </AppLayout>
    <Modal v-model:visible="visible" close-on-escape="true" title="Añadir Proveedor">
        <div class="flex gap-x-4 w-full">
            <Input label="Nombre" class="w-full" v-model="form.nombre" />
            <!-- <Input label="Direccion" v-model="form.direccion" /> -->
            <Input label="Telefono" class="w-full" v-model="form.telefono" />
        </div>
        <div class="mt-4 w-full col-sapn-1 md:col-span-3 border rounded-lg" v-if="$page.props.auth.user.rol == 'admin'">
            <h1 class="text-2xl font-mono font-semibold text-center bg-black rounded-t-lg text-white gap-x-3 p-2">
                Servicios <Button icon="fa-solid fa-plus" outlined="" severity="success" class="size-6"
                    @click="addService()" /> </h1>
            <div class="flex justify-between w-full font-bold px-2">
                <label for="">Servicio</label>
                <label for="">Tarifa</label>
                <label for="">.</label>
            </div>
            <div v-for="(p, index) in form.services" class="flex justify-between gap-x-4 px-2">
                <Input type="dropdown" v-model="p.service_id" option-label="title" option-value="id" class="w-full"
                    :options="services"></Input>
                <Input type="number" mode="currency" class="w-full" v-model="p.value"></Input>
                <Button icon="fa-solid fa-xmark-circle" class="w-full" v-tooltip="`Quitar`" text severity="danger"
                    @click="removeService(index)" />
            </div>
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
import Swal from 'sweetalert2';


const { toast } = alerts()

const visible = ref(false)
const add = {
    action: () => {
        visible.value = true
        form.reset()
    }
}


const buttons = [
    {
        action: (data) => {
            visible.value = true
            form.services = data.services.map(x => x.pivot)
            form.id = data.id
            form.nombre = data.nombre
            form.direccion = data.direccion
            form.telefono = data.telefono

        },
        severity: 'info',
        icon: 'fa-solid fa-pencil text-sm',

    },
    {
        action: (data) => {

            Swal.fire({
                title: "Eliminar Proveedor",
                text: "Estas seguro de eliminar este proveedor?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si"
            }).then((result) => {
                if (result.isConfirmed) {
                    form.delete(route('proveedors.destroy', data.id), {
                        onSuccess: () => {
                            toast('error', 'Proveedor Eliminado')
                        }
                    })
                }
            });
        },
        severity: 'danger',
        icon: 'fa-solid fa-trash text-sm'
    }
]

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
        field: 'telefono',
        header: 'Telefono',
        filter: true
    },

]

const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services;
    });
}
getServices();

const form = useForm({
    id: null,
    nombre: '',
    direccion: 'a.',
    telefono: '',
    services: []
})

const addService = () => {
    form.services.push({
        service_id: '',
        value: ''
    })
}

const removeService = (index) => {
    form.services.splice(index, 1)
}

const submit = () => {
    if (form.id) {
        form.put(route('proveedors.update', form.id), {
            onSuccess: () => {
                form.reset()
                visible.value = false
                toast('success', 'Proveedor Actualizado')
            }
        })
    } else {
        form.post(route('proveedors.store'), {
            onSuccess: () => {
                form.reset()
                toast('success', 'Proveedor Creado')
            }
        })
    }

}



</script>
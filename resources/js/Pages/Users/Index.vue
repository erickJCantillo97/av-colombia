<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :columnas="columns" :add :data="users" routecreate="services.create" :actions="buttons"
                title="Usuarios">
            </Datatable>
        </div>
    </AppLayout>

    <Modal v-model:visible="visible">
        <template #title>
            <span class="text-xl font-bold white-space-nowrap">
                Agregar Usuario</span>
        </template>
        <template #icon>
            <i class="fa-solid fa-plus" />
        </template>
            <div class="space-y-3">
                <Input label="Nombre" v-model="form.name" />
                <Input label="Email" v-model="form.email" />
                <Input label="Rol" type="dropdown" :options="['ADMINISTRADOR', 'VENDEDOR', 'VISITANTE', 'SIN ROL']" v-model="form.rol" />
                <Input label="Contraseña" type="password" v-model="form.password" />
                <Input label="Confirmar contraseña" type="password" v-model="form.password_confirmation" />
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



const columns = [
    {
        header: 'Nombre',
        field: 'name',
        filter: true,
    },
    {
        header: 'Correo',
        field: 'email',
        filter: true,
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
    email: '',
    password: '',
    password_confirmation: '',
});

const visible = ref(false)

const add =  {
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
            editor.value = true
            form.name = data.name
            form.email = data.email
          
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


const props = defineProps({
    users: Array,
});

const submit = () => {
    if(editor.value){
        router.put(route('users.update', form.id), form)
    }else{
        router.post(route('users.store'), form, {
            onSuccess: () => {
                visible.value = false
            }
        })
    }
}

</script>
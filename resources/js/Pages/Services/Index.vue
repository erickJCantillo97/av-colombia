<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :add :columnas="columns" :data="services" routecreate="services.create" :actions="buttons"
                title="Servicios">
            </Datatable>
        </div>
    </AppLayout>

    <Modal v-model:visible="visible">
        <template #title>
            <span class="text-xl font-bold white-space-nowrap">
                Modificar  Servicio</span>
        </template>
        <template #icon>
            <i class="fa-solid fa-plus" />
        </template>
        <h3 class="text-2xl font-bold my-4">
            Agregar Tarifa a <strong>{{ service.title }}</strong>
        </h3>
        <Input label="Tarifa para Adultos" type="number" currency="COP" :minFractionDigits="2" :maxFractionDigits="2"
            v-model="form.adult_tarifa" />
        <div class="italic text-xs mt-1 mb-4">
            La tariafa Base es de {{ COP.format(service.adults_price) }}
        </div>
        <Input label="Tarifa para niños" type="number" currency="COP" :minFractionDigits="2" :maxFractionDigits="2"
            v-model="form.boys_tarifa" />
        <span class="italic text-xs mt-1">
            La tariafa Base es de {{ COP.format(service.boys_price) }}
        </span>
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
import { Link, router, useForm, usePage } from '@inertiajs/vue3';
import ConfirmPopup from 'primevue/confirmpopup';
import Modal from '@/Components/Customs/Modal.vue';
import { ref } from 'vue';
import Input from '@/Components/Customs/Input.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const files = ref([])

const add = {
    action: () => {
        router.visit(route('services.create'))
    },

}

const COP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

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
        header: 'Precio Adultos',
        field: 'adults_price',
        type: 'currency',
        filter: true,
    },
    {
        header: 'Tarifa Adultos',
        field: 'adult_tarifa',
        type: 'currency',
        filter: true,
        // visible: false
    },
    {
        header: 'Precio Niños',
        field: 'boys_price',
        type: 'currency',
        filter: true,
    },
    {
        header: 'Tarifa Niños',
        field: 'boy_tarifa',
        type: 'currency',
        filter: true,
        // visible: false
    },

];

const toast = useToast()

const confirm = useConfirm()
const editor = ref(false)

const form = useForm({
    service_id: '',
    adult_tarifa: 0,
    boys_tarifa: 0,
});

const service = ref({})

const visible = ref(false)
const buttons = [
    {
        action: (data) => {
            router.visit(route('services.show', data.slug))
        },
        show: usePage().props.auth.user.rol == 'admin',
        severity: 'primary',
        icon: 'fa-solid fa-eye text-sm',
        label: 'Ver',
    },
    {
        action: (data) => {
            if(usePage().props.auth.user.rol == 'admin'){
                router.visit(route('services.edit', data.slug))
            }else{
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
        show: usePage().props.auth.user.rol == 'admin',
        severity: 'danger',
        icon: 'fa-regular fa-trash-can text-sm',

    },
    // { event: 'deleteClic', severity: 'danger', icon: 'fa-regular fa-trash-can', class: '!h-8', text: true, outlined: false, rounded: false, show: hasPermission('projects delete') },
]


const props = defineProps({
    services: Array,
});

const submit = () => {
    
    form.post(route('custom.product'), {
        onSuccess: () => {
            visible.value = false
        }
    })
}

</script>
<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :actions="buttons" :add :columnas="columns" :data="bookingServices" routecreate="services.create"
                title="Reservas">
            </Datatable>
        </div>
        <Modal v-model="show" title="Añadir Reserva" width="40vw">
            <form @submit.prevent="reservar">
                <Input type="dropdown" v-model="form.service_id" label="Servicio" option-label="title" option-value="id"
                    :options="services"></Input>
                <Input label="Fecha" type="date" v-model="form.date"></Input>
                <Input label="Adultos" type="number" v-model="form.adults"></Input>
                <Input label="Niños" type="number" v-model="form.boys"></Input>
                <div>
                    <Input type="checkbox" inputId="payment" v-model="form.payment"
                        label="Este Servicio Fue pagado"></Input>
                </div>
                <div class="flex justify-end mt-4">
                    <Button type="submit" severity="success" label="Guardar" :loading />
                </div>
            </form>
        </Modal>
        <Toast></Toast>
        <Drawer v-model:visible="info" pt:root:class="!bg-blue-100" header="Detalles de la actividad" position="right">
            <template #header>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-lg">{{service.service.title}}</span>
                </div>
            </template>
            <div class="flex flex-col gap-y-1.5 text-sm">
                
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Fecha del Servicio:</strong>
                    <p>{{ service.date }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Hora del Servicio:</strong>
                    <p>{{ service.hour }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Cliente:</strong>
                    <p>{{ service.cliente_name }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Telelfono:</strong>
                    <a :href="`tel://${service.cliente_phone}`">{{ service.cliente_phone }}</a>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Edificio:</strong>
                    <p>{{ service.cliente_building }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Adultos:</strong>
                    <p>{{ service.adults }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Niños:</strong>
                    <p>{{ service.boys }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Valor:</strong>
                    <p>{{ COP.format(service.total_price) }}</p>
                </div>
                <div v-if="service.user" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Vendedor:</strong>
                    <p>{{ service.user?.name }}</p>
                </div>
                <div v-if="service.user" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Fecha de reserva:</strong>
                    <p>{{ new Date(service.created_at).toLocaleDateString('es-CO') }}</p>
                </div>
                <div class="flex flex-col gap-y-2 mt-2 ">
                    <div class="flex justify-between">
                        <h2 class="text-xl font-bold ">Pagos Realizados </h2>
                        <div class="bg-blue-600 text-white p-1 rounded-lg">
                            {{ COP.format(service.payment.reduce((a, b) => a + b.amount, 0)) }}
                        </div>
                    </div>
                    <div class="flex items-center text-xs justify-between border shadow-xl rounded-md p-1 bg-white"
                        v-for="payment in service.payment">
                        <div>
                            <div class="uppercase font-bold">
                                {{ payment.type }} {{ COP.format(payment.amount) }}
                            </div>
                            <div>
                                {{ new Date(payment.created_at).toLocaleDateString('es-CO') }} {{
                                payment.metohd_payment.name }}
                            </div>

                        </div>
                        <div class="uppercase"
                            :class="payment.status == 'pendiente' ? 'bg-red-500 p-1 text-white rounded-lg shadow-md shadow-red-500' : ''">
                            {{ payment.status }}
                            <div>

                            </div>
                        </div>
                        <!-- {{ payment }} -->
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex flex-col items-center gap-2">
                    <h1 class="font-bold text-center">Saldo: {{ COP.format(service.total_price - service.payment.reduce((a, b) => a + b.amount, 0)) }}</h1>
                    <div class="flex gap-x-2">
                        <Button  icon="fa-solid fa-circle-check" text size="large" v-tooltip.top="'Completar Servicio'" class="flex-auto" severity="success"  />
                        <Button  icon="fa-solid fa-eye-slash" text size="large" v-tooltip.top="'Servicio No show'" class="flex-auto" severity="warn"  />
                        <Button  icon="fa-solid fa-xmark-circle" text size="large" v-tooltip.top="'Cancelar Servicio'" class="flex-auto" severity="danger"  />
                        <Button  icon="fa-solid fa-person-dress-burst" text size="large" v-tooltip.top="'Servicio Problematico'" class="flex-auto" severity="danger"  />
                        <!-- <Button label="Registrar Pago" icon="pi pi-sign-out" class="flex-auto" severity="success"  /> -->
                    </div>
                </div>
            </template>
        </Drawer>
    </AppLayout>
</template>
<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router, useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    bookingServices: Array
})
const info = ref(false);
const service = ref({});
const toast = useToast();

const COP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});
const show = ref(false);
const add = {
    action: () => {
        form.reset();
        show.value = true;
    },
}

const form = useForm({
    service_id: '',
    user_id: '',
    date: '',
    payment: false,
    adults: '',
    boys: 0,
})

const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}

getServices()

const buttons = [
    {
        label: 'Detalles',
        action: (data) => {
            service.value = data;
            info.value = true;
        },
        icon: 'fa-solid fa-circle-info text-sm',
        severity: "info"
        // class: 'p-button-warning text-sm'
    },
    {
        label: 'Registrar Pago',
        action: (data) => {
            form.service_id = data.id;
            show.value = true;
        },
        icon: 'fa-solid fa-dollar text-sm',
        severity: "success"
        // class: 'p-button-warning text-sm'
    },
    {
        label: 'Problematica',
        action: (data) => {
            form.service_id = data.id;
            show.value = true;
        },
        icon: 'fa-solid fa-person-dress-burst text-sm',
        severity: "danger"
        // class: 'p-button-warning text-sm'
    }
]

const columns = [
    {
        field: 'cliente_name',
        header: 'Nombre del pasajero',
        filter: true,
        sortable: true

    },
    {
        field: 'cliente_building',
        header: 'Edificio u Hotel',
        filter: true,
        sortable: true
    },
    {
        field: 'service.title',
        header: 'Actividad',
        filter: true,
        sortable: true
    },
    {
        field: 'date',
        header: 'Fecha',
        filter: true,
        sortable: true
    },

    {
        field: 'status',
        header: 'Estado',
        filter: true, sortable: true, type: 'tag', filtertype: 'EQUALS',
        class: 'text-center uppercase',
        severitys: [
            { text: 'reservado', severity: 'info', class: '' },
            { text: 'CONSTRUCCIÓN', severity: 'success', class: '' },
            { text: 'DISEÑO', severity: 'info', class: '' },
            { text: 'GARANTIA', severity: 'warning', class: '' },
            { text: 'SERVICIO POSTVENTA', severity: 'success', class: '' },
            { text: 'SIN ESTADO', severity: 'danger', class: 'animate-pulse' }
        ]
    },
    // {
    //     field: 'payment',
    //     header: 'Pago',
    //     sortable: true,
    //     filter: true,
    //     type: 'tag', filtertype: 'EQUALS',
    //     class: 'text-center uppercase',
    //     severitys: [
    //         { text: 'pendiente', severity: 'danger', class: '' },
    //     ]
    // },

]



const loading = ref(false);

const reservar = (event) => {
    event.preventDefault();
    loading.value = true
    form.post(route('reservar'), {

        onSuccess: () => {
            toast.add({
                severity: 'success',
                summary: 'Reserva Realizada',
                detail: 'Tu reserva ha sido realizada con exito',
                life: 3000
            });
            loading.value = false;
            show.value = false;
        },
    })

}

</script>
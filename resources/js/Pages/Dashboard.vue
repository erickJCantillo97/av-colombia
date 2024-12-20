<script setup>
// #region Imports
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { ScheduleXCalendar } from '@schedule-x/vue'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import {
    createCalendar,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { viewMonthGrid } from '@schedule-x/calendar';
import Modal from '@/Components/Customs/Modal.vue';
import Tag from '@/Components/Tag.vue';
const services = ref([]);
const totalToPay = ref(0);
// #endregion

// #region CalendarPlugins
const eventsServicePlugin = createEventsServicePlugin();

// #endregion

// #region Variables
const COP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});
const dateActivities = ref([]);
const reservas = ref([]);
const todayActivity = ref(false)
const serviceSelected = ref({});
const configCalendar = reactive({
    defaultView: viewMonthGrid.name,
    dayBoundaries: {
        start: '06:00',
        end: '19:00',
    },
    isResponsive: false,
    weekOptions: {
        gridHeight: 500,
        nDays: 7,
        timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },
    },
    dayOptions: {
        gridHeight: 400,
    },
    locale: 'es-ES',
    selectedDate: new Date().toISOString().split('T')[0],
    views: [
        createViewMonthGrid(),
        createViewWeek(),
    ],
    callbacks: {
        onEventClick(calendarEvent) {
            editBooking(calendarEvent);
        },
    },
    events: [],
    plugins: [eventsServicePlugin],
});
const calendarApp = createCalendar(configCalendar);

const visible = ref(false);
// #endregion

// #region Methods
const getServices = () => {
    axios.get(route('dashboard.services.no.pay')).then(response => {
        services.value = response.data.bookings;
        totalToPay.value = response.data.bookings.reduce((acc, item) => acc + item.total_price, 0);
    });
}
const getReservas = () => {
    axios.get(route('BookingServices.index')).then(response => {
        reservas.value = response.data.bookingServices;
        reservas.value.forEach((item) => {
            if (item.date == new Date().toISOString().split('T')[0] && item.status == 'reservado') {
                dateActivities.value.push(item);
            }
            calendarApp.eventsService.add({
                title: item.service.title,
                start: item.date + ' ' + item.hour.substring(0, 5),
                description: item.total_price,
                end: item.date + ' ' + (parseInt(item.hour[1]) + 5) + item.hour.substring(2, 5),
                id: item.id
            })
        });
        console.log(calendarApp.eventsService.getAll());
        if (dateActivities.value.length > 0) {
            todayActivity.value = true;
        }
    });
}

const editBooking = (data) => {
    serviceSelected.value = reservas.value.find(item => item.id == data.id);
    visible.value = true;
}
getServices();
getReservas();

// #endregion
</script>

<template>
    <AppLayout title="Dashboard">
        <div class="py-4">
            <div class="w-full mx-auto sm:px-6 lg:px-8 space-y-4">
                <div class="bg-white overflow-hidden  sm:rounded-lg flex justify-between items-center px-8">
                    <h1>
                        Hola <strong class="uppercase">
                            {{ $page.props.auth.user.name }}
                        </strong>, Bienvenido a tu panel de control
                    </h1>
                    <Link :href="route('portafolio')">
                    <Button label="Ver Portafolio" />
                    </Link>
                </div>
                <div class=" p-4 rounded-lg grid grid-cols-2 gap-4">
                    <div class="shadow-md rounded-md p-4 text-center">
                        <h2 class="text-xl font-bold">{{ services?.length ?? 0 }}</h2>
                        <h3> Reservas Pendinetes de Pago por total de {{ COP.format(totalToPay) }}</h3>
                    </div>
                    <div class="shadow-md rounded-md p-4 text-center ">
                        <h2>Tu Rol es</h2>
                        <h3 class="text-xl font-bold">
                            {{ $page.props.auth.user.rol }}
                        </h3>

                    </div>
                </div>
                <div>
                    <ScheduleXCalendar :calendar-app="calendarApp" />
                </div>
            </div>
        </div>
    </AppLayout>
    <Modal v-model:visible="visible" :title="'Reserva de ' + serviceSelected.service?.title ?? ''"
        :close-on-escape="true">
        <div class="flex flex-col gap-y-5">
            <h1 class="text-xl font-bold">Datos de la reserva</h1>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-2 w-full">
                <Tag label="Fecha" :value="serviceSelected.date" />
                <Tag label="Hora" :value="serviceSelected.hour" />
                <Tag label="Adultos" :value="serviceSelected.adults" />
                <Tag label="Niños" :value="serviceSelected.boys" />
                <Tag label="Valor" :value="COP.format(serviceSelected.total_price)" />
                <Tag label="Estado" :value="serviceSelected.status" />

            </div>
            <h1 class="text-xl font-bold">Datos del Cliente</h1>
            <div class="grid grid-cols-3 md:grid-cols-4 gap-2 w-full">
                <Tag label="Cliente" :value="serviceSelected.cliente_name" />
                <Tag label="Telefono" :value="serviceSelected.cliente_phone" />
                <Tag label="Edificio" :value="serviceSelected.cliente_building" />
                <Tag label="Ciudad de Origen" :value="serviceSelected.cliente_city" />
                <!-- <Tag label="Valor" :value="COP.format(serviceSelected.total_price)" /> -->
            </div>
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-bold">Proveedores</h1>
                <div class="border bg-blue-600 font-bold p-1 rounded-lg text-white text-sm">
                    Costo: {{ serviceSelected.proveedors.length > 0 ? COP.format(serviceSelected.proveedors.reduce((acc,
                        item) => acc + item.cost, 0)) : 0 }}
                </div>
            </div>
            <div class="flex flex-col">
                <div class="flex justify-between border-b-2 font-extrabold px-2">
                    <span>Proveedor</span>
                    <span>Celular</span>
                    <span>Tarifa</span>
                </div>
                <div v-for="p in serviceSelected.proveedors"
                    class="mb-2 flex justify-between border-b px-2 py-1 rounded-md">
                    <span>{{ p.proveedor.nombre }}</span>
                    <a :href="`tel:${p.proveedor.telefono}`">{{ p.proveedor.telefono }}</a>
                    <span>{{ COP.format(p.cost) }}</span>
                </div>
            </div>
        </div>
        <!-- <code>
            {{ serviceSelected }}
        </code> -->
    </Modal>
    <Modal v-model="todayActivity" close-on-escape="true" title="Actividades de Hoy" width="90vw">
        <div>
            <h1 class="text-xl font-bold">Actividades de Hoy</h1>
            <div
                class="flex justify-between font-extrabold text-lg mt-4 bg-gray-200 rounded-t-md gap-x-4 p-1 w-full overflow-x-auto">
                <p class="w-full flex text-center">
                    Actividad
                </p>
                <p class="w-full flex text-center">
                    Cliente
                </p>
                <p class="w-full flex text-center">
                    Edificio
                </p>
                <p class="w-full flex text-center">
                    Telefono
                </p>

                <p class="w-full flex text-center">
                    Hora
                </p>
                <p class="w-full flex text-center">
                    Valor
                </p>

            </div>
            <div v-for="activity in dateActivities" :class="activity.problematic ? 'bg-red-200' : 'bg-blue-200'"
                class="flex justify-between p-1.5 text-center w-full overflow-x-auto">
                <p class="w-full flex text-center">
                    {{ activity.service.title }}
                </p>
                <p class="w-full flex text-center">
                    {{ activity.cliente_name }}
                </p>
                <p class="w-full flex text-center">
                    {{ activity.cliente_building }}
                </p>
                <a :href="`tel://${activity.cliente_phone}`" class="w-full flex">
                    {{ activity.cliente_phone }}
                </a>
                <p class="w-full flex text-center">
                    {{ activity.hour }}
                </p>
                <p class="w-full flex text-center">
                    {{ COP.format(activity.total_price) }}
                </p>

            </div>
        </div>
    </Modal>
</template>

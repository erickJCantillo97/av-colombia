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
const reservas = ref([]);
const serviceSelected = ref({});
const configCalendar = reactive({
    defaultView: viewMonthGrid.name,
    dayBoundaries: {
        start: '06:00',
        end: '19:00',
    },
    weekOptions: {
        gridHeight: 500,
        nDays: 7,
        eventWidth: 50,
        timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },
    },
    locale: 'es-ES',
    selectedDate: new Date().toISOString().split('T')[0],
    views: [
        createViewMonthGrid(),
        createViewDay(),
        createViewWeek(),
        createViewMonthAgenda(),
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

            calendarApp.eventsService.add({
                title: item.service.title,
                start: item.date + ' 09:15',
                description: item.total_price,
                end: item.date + ' 20:15',
                id: item.id
            })
        });

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
                        <h3 class="text-xl font-bold" v-if="$page.props.auth.user.name != 'Brian'">
                            Vendedor
                        </h3>
                        <h3 class="text-xl font-bold" v-else>
                            Administrador
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
        <div class="flex flex-col gap-y-2">
            <h1 class="text-xl font-bold">Datos de la reserva</h1>
            <div class="grid grid-cols-3 md:grid-cols-5 gap-2 w-full">
                <Tag label="Fecha" :value="serviceSelected.date" />
                <Tag label="Hora" :value="serviceSelected.time" />
                <Tag label="Adultos" :value="serviceSelected.adults" />
                <Tag label="Niños" :value="serviceSelected.boys" />
                <Tag label="Valor" :value="COP.format(serviceSelected.total_price)" />

            </div>
            <h1 class="text-xl font-bold">Datos del Cliente</h1>
        </div>
        <!-- <code>
            {{ serviceSelected }}
        </code> -->
    </Modal>
</template>

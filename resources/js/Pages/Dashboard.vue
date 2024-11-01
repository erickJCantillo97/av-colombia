<script setup>
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
const services = ref([]);
const totalToPay = ref(0);

const eventsServicePlugin = createEventsServicePlugin();

const COP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

const getServices = () => {
    axios.get(route('dashboard.services.no.pay')).then(response => {
        services.value = response.data.bookings;
        totalToPay.value = response.data.bookings.reduce((acc, item) => acc + item.total_price, 0);
    });
}
getServices();

const reservas = ref([]);

const configCalendar = reactive({
    locale: 'es-ES',
    selectedDate: new Date().toISOString().split('T')[0],
    views: [
        createViewMonthGrid(),
        createViewDay(),
        createViewWeek(),
        createViewMonthAgenda(),
    ],
    events: [],
    plugins: [eventsServicePlugin],
},


);
const calendarApp = createCalendar(configCalendar);
const getReservas = () => {
    axios.get(route('BookingServices.index')).then(response => {
        reservas.value = response.data.bookingServices;

        // calendarApp.events = response.data.bookingServices.map((item) => {
        //     return {
        //         id: item.id,
        //         title: item.service.title,
        //         start: item.date,
        //         end: item.date,
        //     }
        // });
        reservas.value.forEach((item) => {
            console.log(item.date + ' 20:15');
            calendarApp.eventsService.add({

                title: item.service.title,
                start: item.date + ' 09:15',
                end: item.date + ' 20:15',
                id: item.id
            })
        });

    });
}
getReservas();


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
</template>

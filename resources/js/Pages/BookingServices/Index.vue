<template>
    <AppLayout title="Reservas">
        <div
            class="hidden bg-amber-200 bg-orange-200 bg-blue-200 !bg-green-200 !bg-gray-200 !bg-orange-200 !bg-amber-200">
        </div>
        <div class="h-[92vh]">
            <div class="flex py-2 px-4 justify-between items-center">
                <div class="italic flex flex-col">
                    <h1 class="text-2xl font-bold">Reservas</h1>
                    <Changes />
                </div>
                <div class="flex gap-x-2">
                    <div class="p-2 bg-black text-white text-center rounded-lg cursor-pointer transition-all duration-300 scale-95 hover:scale-100 border-2"
                        @click="statusFilter = null" v-tooltip.bottom="`${dataFilter.length} Reservas
                        ${ dataFilter.reduce((acc, item) => acc + item.adults, 0)
                        } Pasajeros
                        `
                        " >
                        <p class="text-sm font-bold uppercase">Todos</p>
                    </div>
                    <div v-for="status in statues" @click="filteringByStatus(status.text)" class="flex items-center  transition-all duration-300 py-1 px-4 rounded-lg cursor-pointer hover:scale-105 hover:border-b-4 hover:border-gray-800"
                    :class="[`bg-${status.color}-200`, statusFilter == status.text ? 'border-b-4 scale-105 shadow-lg border-gray-800':'' ]" v-tooltip.bottom="`${dataFilter.filter((x) => x.status == status.text).length} Reservas
                    ${ dataFilter
                            .filter((x) => x.status == status.text)
                            .reduce((acc, item) => acc + item.adults, 0)
                    } Pasajeros
                    `
                    ">
                    <p class="text-xs font-bold uppercase">{{ status.text }}</p>
                    </div>

                </div>
                <div>
                    <VueDatePicker
                    hide-offset-dates
                    v-model="selectDate"
                    :teleport="true"
                    :format="format"
                    model-type="yyyy-MM-dd"
                    range
                    :enable-time-picker="false"
                    locale="es"
                    :multi-calendars="{ solo: true }"
                    timezone="America/Bogota"
                  >
                  </VueDatePicker>
                </div>

            </div>
            <Datatable :actions="buttons" :add showButtonBar :columnas="columns" :data="bookings"
            cacheName="reservas" :rowClass="true" @filterApply="getDataFilter">
            </Datatable>
        </div>
        <ViewBooking v-model="info" :service="service" v-if="service" :proveedors="proveedors"></ViewBooking>
    </AppLayout>
    <Notas v-model="todayActivity" :notes="notes" v-if="todayActivity" :note="note" :service="serviceSelected"></Notas>
</template>
<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import {  router,  usePage } from "@inertiajs/vue3";
import {  ref, watch } from "vue";
import { alerts } from "@/composable/toasts";
import Swal from "sweetalert2";
import ViewBooking from "@/Components/viewBooking.vue";
import Changes from "@/Components/Customs/Changes.vue";
import Notas from "@/Components/Customs/Notas.vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useBookingServiceStore } from "@/stores/BookingService";
import { columns } from "./Columns";

const props = defineProps({
    bookingServices: Array,
});

const { toast } = alerts();
const proveedors = ref([]);
const notes = ref([]);
const verTodos = ref(false);
const note = ref("");
const serviceSelected = ref([]);
const info = ref(false);
const service = ref(null);
// const selectDate = ref([]);

const todayActivity = ref(false);
const bookings = ref(props.bookingServices);

const store = useBookingServiceStore();

const { selectDate, statusFilter } = storeToRefs(store);

const statues = [
    { text: "RESERVADO", color: "blue" },
    { text: "CAMBIO DE FECHA", color: "gray" },
    { text: "NO SHOW", color: "amber" },
    { text: "REUBICADO", color: "orange" },
    { text: "CANCELADA", color: "green" },
    { text: "SIN CONFIRMAR", color: "red" },
];

const add = {
    action: () => {
        router.get(route("BookingServices.create"));
    },
};

const getReservas = async (dates) => {
    const {data} = await axios.get(route("get.all.booking.services.dates", {
        dates
    }));
    return data.bookingServices;
};


watch([selectDate, statusFilter, verTodos], async ([newValue, newValueStatusFilter, newVerTodos]) => {
    if(newVerTodos){
       selectDate.value = [
           new Date('2024-11-02'),
           new Date()
       ]
       verTodos.value = false;
       return
    }
    if (!newValue) {
        bookings.value = props.bookingServices;
    }else{
        const result = await getReservas(newValue);
        bookings.value = result;
    }
    if(newValueStatusFilter){
        bookings.value = bookings.value.filter((item) => item.status == newValueStatusFilter);
    }
}, { immediate: true }); // Add immediate:true to run on component mount

const filteringByStatus = (status) => {
    statusFilter.value = status;
};

const buttons = [
    {
        label: "Detalles",
        action: async (data) => {
            service.value = data;
            info.value = true;
            await getProveedors();
        },
        icon: "fa-solid fa-circle-info text-sm",
        severity: "info",
        // class: 'p-button-warning text-sm'
    },
    {
        label: "Editar",
        action: async (data) => {
            router.get(route("BookingServices.edit", data.id));
        },
        icon: "fa-solid fa-pencil text-sm",
        severity: "warn",
        // class: 'p-button-warning text-sm'
    },
    {
        label: "Notas",
        severity: "secondary",
        action: (data) => {
            serviceSelected.value = data;
            todayActivity.value = true;
        },
       
        icon: "fa-solid fa-note-sticky text-sm",
    },
    {
        label: "Eliminar",
        icon: "fa-solid fa-trash text-sm",
        severity: "danger",
        show:
            usePage().props.auth.user.rol == "admin" ||
            usePage().props.auth.user.rol == "superadmin",
        action: (data) => {
            Swal.fire({
                title: "Estas Seguro?",
                text: `Eliminar la reservación de ${data.cliente_name}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: `Si, Eliminar!`,
            }).then((result) => {
                if (result.isConfirmed) {
                    router.delete(route("BookingServices.destroy", data.id), {
                        onSuccess: () => {
                            toast("success", "Reserva Eliminada");
                        },
                    });
                }
            });
        },
    },
];

const dataFilter = ref([]);

const getDataFilter = (data) => {
    dataFilter.value = data;
};

const format = (date) => {
  const day = date[0].getDate();
  const month = date[0].getMonth() + 1;
  const year = date[0].getFullYear();

  const padZero = (num) => (num < 10 ? `0${num}` : num);
  return `${padZero(day)}/${padZero(month)}/${year} - ${padZero(date[1].getDate())}/${padZero(date[1].getMonth() + 1)}/${date[1].getFullYear()}`;
};
</script>

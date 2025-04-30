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
                    <!-- <div   :class="[
               ,
                dataFilter == status.text
                    ? 'border-2 border-gray-500 scale-105'
                    : 'border-2 border-transparent scale-95',
                    dataFilter.filter((x) => x.status == status.text).length == 0
                    ? ''
                    : 'cursor-pointer hover:scale-105 hover:border-2 hover:border-gray-500']">
                        <p class="text-sm font-bold uppercase">{{ status.text }}</p>
                        <p class="text-xs italic">
                            {{ dataFilter.filter((x) => x.status == status.text).length}} Reservas |
                            {{ dataFilter
                                    .filter((x) => x.status == status.text)
                                    .reduce((acc, item) => acc + item.adults, 0)
                            }}
                            Pasajeros
                        </p>
                    </div> -->
                </div>
                <DatePicker v-model="selectDate" selectionMode="range" dateFormat="dd/mm/yy"
                    v-tooltip.bottom="`Filtrar fecha de Actividad`" :manualInput="false" >
                <template #footer>
                    <div class="w-full justify-between flex">
                        <Button @click="selectDate = []" label="Clear" size="small" severity="danger"></Button>
                        <Button @click="verTodos = true" label="Ver Todos" size="small" severity="success"></Button>
                    </div>
                </template>

            </DatePicker>
            </div>
            <Datatable :actions="buttons" :add showButtonBar :columnas="columns" :data="bookings"
                routecreate="services.create" :rowClass="true" @filterApply="getDataFilter">
            </Datatable>
        </div>
        <ViewBooking v-model="info" :service="service" v-if="service" :proveedors="proveedors"></ViewBooking>
    </AppLayout>
    <Notas v-model="todayActivity" :notes="notes" v-if="todayActivity" :note="note" :service="serviceSelected"></Notas>
</template>
<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { Link, router, useForm, usePage, usePoll } from "@inertiajs/vue3";
import { computed, ref, watch } from "vue";
import { alerts } from "@/composable/toasts";
import Swal from "sweetalert2";
import ViewBooking from "@/Components/viewBooking.vue";
import Changes from "@/Components/Customs/Changes.vue";
import Notas from "@/Components/Customs/Notas.vue";
import axios from "axios";

const props = defineProps({
    bookingServices: Array,
});

usePoll(1000 * 20);
// #region Variables

const { toast } = alerts();
const proveedors = ref([]);
const notes = ref([]);
const verTodos = ref(false);
const note = ref("");
const serviceSelected = ref([]);
const info = ref(false);
const service = ref(null);
const selectDate = ref([]);
const statusFilter = ref(null);


const todayActivity = ref(false);
const columns = [
    {
        field: "created_at",
        header: "Fecha Entrada",
        filter: true,
        sortable: true,
        type: "date",
    },
    {
        field: "cliente_name",
        header: "Nombre del pasajero",
        filter: true,
        sortable: true,
    },
    {
        field: "adults",
        header: "Pasajeros",
        filter: true,
        sortable: true,
    },
    {
        field: "cliente_building",
        header: "Edificio u Hotel",
        filter: true,
        sortable: true,
    },
    {
        field: "service",
        header: "Actividad",
        filter: true,
        sortable: true,
    },
    {
        field: "date",
        header: "Fecha de la Actividad",
        filter: false,
        type: "date",
        sortable: true,
    },
    {
        field: "channel.name",
        header: "Canal de venta",
        filter: true,
        sortable: true,
    },
    {
        field: "proveedors_names",
        header: "proveedores",
        class: "text-center font-semibold text-sm",
        filter: true,
    },
    {
        field: "status",
        header: "Estado",
        filter: true,
        sortable: true,
        type: "tag",
        filtertype: "EQUALS",
        class: "text-center uppercase",
        severitys: [
            { text: "RESERVADO", severity: "info", class: "" },
            { text: "CAMBIO DE FECHA", class: "bg-gray-200 font-bold" },
            { text: "COMPLETADA", severity: "success", class: "" },
            { text: "NO SHOW", severity: "warn", class: "" },
            { text: "REUBICADO", severity: "warn", class: "" },
            { text: "CANCELADA", severity: "danger", class: "animate-pulse" },
            { text: "PROBLEMATICA", severity: "danger", class: "animate-pulse" },
            { text: "SIN CONFIRMAR", severity: "danger" },
        ],
    },
];

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


const bookings = ref(props.bookingServices);

watch([selectDate, statusFilter,verTodos], async ([newValue, newValueStatusFilter, newVerTodos]) => {
    if(newVerTodos){
       selectDate.value = [
           new Date('2024-11-02'),
           new Date()
       ]
       verTodos.value = false;
       return
    }
    if (!newValue[0] || !newValue[1]) {
        bookings.value = props.bookingServices;
    }else{
        const result = await getReservas(newValue);
        bookings.value = result;
    }
    if(newValueStatusFilter){
        bookings.value = bookings.value.filter((item) => item.status == newValueStatusFilter);
    }
});

const filteringByStatus = (status) => {
    statusFilter.value = status;
};

const bookingFecha = computed(() => {
    if (!selectDate.value[0]) return props.bookingServices;
    const [startDate, endDate] = selectDate.value.map(
        (date) => new Date(date).toISOString().split("T")[0]
    );
    return props.bookingServices.filter((item) => {
        const itemDate = new Date(item.date).toISOString().split("T")[0];
        return itemDate >= startDate && itemDate <= endDate;
    });
});

const getReservas = async (dates) => {
    const {data} = await axios.get(route("get.all.booking.services.dates", {
        dates
    }));
    return data.bookingServices;
};


const form = useForm({
    id: "",
    service_id: null,
    date: "",
    adults: 1,
    time_service: "",
    boys: 0,
    cliente_name: "",
    cliente_phone: "",
    cliente_city: "",
    cliente_building: "",
    mascota: 0,
    persona_adicional: 0,
    cobre_transaccion: 0,
    cobro_extra_cliente: 0,
    reserva: 0,
    abono: 0,
    method_id: "",
    channel_id: "9d99a95f-6c3d-48fd-aa7d-6ef4e6860123",
    saldo: 0,
    proveedors: [],
    total: 0,
    total_real: 0,
    percent_channel: 0,
    observations: "",
    code_booking: "",
    extras: [],
});


const buttons = [
    {
        label: "Detalles",
        action: async (data) => {
            service.value = data;
            form.service_id = data.service_id;
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
        badge: (data) => {
            return data.notes;
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
</script>

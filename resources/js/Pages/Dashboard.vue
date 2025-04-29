<script setup>
// #region Imports
import AppLayout from "@/Layouts/AppLayout.vue";
import axios from "axios";
import { reactive, ref } from "vue";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import {
  createCalendar,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { viewMonthGrid } from "@schedule-x/calendar";
import Datatable from "@/Components/Customs/Datatable.vue";
import Scheduler from "./Dashboards/Scheduler.vue";
import ViewBooking from "@/Components/viewBooking.vue";
import Notas from "@/Components/Customs/Notas.vue";
import Completar from "@/Components/Customs/Completar.vue";
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
const services = ref([]);
const notes = ref([]);
const note = ref("");
const totalToPay = ref(0);
const dateActivities = ref([]);
const reservas = ref();
const todayActivity = ref(false);
const completar = ref(false);
const serviceSelected = ref({});
const configCalendar = reactive({
  defaultView: viewMonthGrid.name,
  dayBoundaries: {
    start: "06:00",
    end: "19:00",
  },
  isResponsive: false,
  weekOptions: {
    gridHeight: 500,
    nDays: 7,
    timeAxisFormatOptions: { hour: "2-digit", minute: "2-digit" },
  },
  dayOptions: {
    gridHeight: 400,
  },
  locale: "es-ES",
  selectedDate: new Date().toISOString().split("T")[0],
  views: [createViewMonthGrid(), createViewWeek()],
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
const totalPasajeros = ref(0);
const selectDate = ref([new Date(), new Date()]);
const getServicesSelectedDate = () => {
  dateActivities.value = reservas.value.filter((item) => {
    var fecha = new Date(item.date).toISOString().split("T")[0];
    return (
      fecha >= new Date(selectDate.value[0]).toISOString().split("T")[0] &&
      fecha <= new Date(selectDate.value[1]).toISOString().split("T")[0]
    );
  });
  totalPasajeros.value = dateActivities.value.reduce((acc, item) => acc + item.adults, 0);
};

const getReservas = () => {
  axios.get(route("get.all.booking.services")).then((response) => {
    reservas.value = response.data.bookingServices;
    getServicesSelectedDate();
    reservas.value.forEach((item) => {
      calendarApp.eventsService.add({
        title: item.service.title,
        start: item.date + " " + item.hour.substring(0, 5),
        description: item.total_price,
        end: item.date + " " + (parseInt(item.hour[1]) + 5) + item.hour.substring(2, 5),
        id: item.id,
      });
    });
  });
};

const editBooking = (data) => {
  serviceSelected.value = reservas.value.find((item) => item.id == data.id);
  visible.value = true;
};

getReservas();

const actions = [
  {
    label: "Compeltar Servicio",
    action: (data) => {
      serviceSelected.value = data;
      completar.value = true;
    },
    icon: "fa-solid fa-circle-check text-sm",
    severity: "success",
  },
  {
    label: "Detalles",
    action: (data) => {
      editBooking(data);
    },
    icon: "fa-solid fa-circle-info text-sm",
    severity: "info",
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
];

const columns = [
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
    type: "html-custom",
    renderer: (rowData) => {
      return `
      <div class="flex flex-col text-right text-sm items-center">
        <span class="text-center font-bold">Adultos: ${rowData.adults}</span>
        <span class="text-center">Niños: ${rowData.boys}</span>
        </div>
      `;
    },
  },
  {
    field: "service",
    header: "Actividad",
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
    field: "cliente_building",
    header: "Edificio",
    filter: true,
    sortable: true,
  },
  {
    field: "cliente_phone",
    header: "Telefono",
    filter: true,
    sortable: true,
    type: "html-custom",
    renderer: (rowData) => {
      return `<a target="_blank" href="https://wa.me/${rowData.cliente_phone}?text=Hola%20👋,%20mi%20nombre%20es%20*Sandra%20%Gil*,%20Le%20escribo%20desde%20*AV%20COLOMBIA*">${rowData.cliente_phone}</a>`;
    },
  },
  {
    field: "hour",
    header: "Hora",
    filter: true,
    sortable: true,
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
      { text: "COMPLETADA", class: "" },
      { text: "NO SHOW", severity: "warn", class: "" },
      { text: "REUBICADO", severity: "warn", class: "" },
      { text: "CANCELADA", severity: "danger", class: "animate-pulse" },
      { text: "PROBLEMATICA", severity: "danger", class: "animate-pulse" },
      { text: "SIN CONFIRMAR", severity: "danger" },
    ],
  },
];

const handleEventClick = (event) => {
  let serviceSelected = reservas.value.find((item) => item.id == event.Id);
  editBooking(serviceSelected);
  // Manejar el evento aquí
};

const dataFilter = ref([]);
const getDataFilter = (data) => {
  dataFilter.value = data;
};
// #endregion
</script>

<template>
  <AppLayout title="Dashboard">
    <div class="py-4">
      <div class="w-full mx-auto sm:px-1 lg:px-4 space-y-2">
        <div
          class="bg-white overflow-hidden sm:rounded-lg flex justify-between items-center px-1"
        >
          <h1>
            Hola
            <strong class="uppercase"> {{ $page.props.auth.user.name }} </strong>,
            Bienvenido a tu panel de control
          </h1>
          <a
            target="_blank"
            :href="`https://vendedores-site.netlify.app/${$page.props.auth.user.id}`"
          >
            <Button label="Ver Portafolio" />
          </a>
        </div>
        <div class="flex w-full justify-between font-bold text-xl items-center">
          <p>Actividades</p>
          <DatePicker
            v-model="selectDate"
            selectionMode="range"
            dateFormat="dd/mm/yy"
            :manualInput="false"
            @value-change="getServicesSelectedDate"
          />
        </div>
        <div class="shadow-xl rounded-lg p-1">
          <Datatable
            :columnas="columns"
            :rowClass="true"
            :data="dateActivities"
            :actions
            @filterApply="getDataFilter"
          >
            <template #groupRows>
              <ColumnGroup type="footer">
                <Row>
                  <Column
                    footer="Pasajeros:"
                    :colspan="0"
                    footerStyle="text-align:right"
                  />
                  <Column
                    :footer="dataFilter.reduce((acc, item) => acc + item.adults, 0)"
                  />
                </Row>
              </ColumnGroup>
            </template>
          </Datatable>
        </div>
        <Scheduler v-if="reservas" :reservas @event-click="handleEventClick"></Scheduler>
      </div>
    </div>
  </AppLayout>
  <ViewBooking
    v-model="visible"
    :service="serviceSelected"
    v-if="serviceSelected"
  ></ViewBooking>
  <Notas
    v-model="todayActivity"
    :notes="notes"
    v-if="todayActivity"
    :note="note"
    :service="serviceSelected"
  ></Notas>
  <Completar v-if="completar" v-model="completar" :service="serviceSelected"> </Completar>
</template>

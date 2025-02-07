<script setup>
// #region Imports
import AppLayout from "@/Layouts/AppLayout.vue";
import { Link } from "@inertiajs/vue3";
import axios from "axios";
import { reactive, ref } from "vue";
import { ScheduleXCalendar } from "@schedule-x/vue";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { viewMonthGrid } from "@schedule-x/calendar";
import Modal from "@/Components/Customs/Modal.vue";
import Tag from "@/Components/Tag.vue";
import Datatable from "@/Components/Customs/Datatable.vue";
import Scheduler from "./Dashboards/Scheduler.vue";
import Input from "@/Components/Customs/Input.vue";
import Logo from "@/Components/logo.vue";
import ViewBooking from "@/Components/viewBooking.vue";
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

const selectDate = ref([
  new Date(),
  new Date(),
]);

const getServicesSelectedDate = () => {
  console.log("Fecha seleccionada", selectDate.value);
  dateActivities.value = reservas.value.filter((item) => new Date(item.date) >= new Date(selectDate.value[0]) && new Date(item.date) <= new Date(selectDate.value[1]));
  totalPasajeros.value = dateActivities.value.reduce((acc, item) => acc + item.adults, 0);
};

const getReservas = () => {
  console.log("Fecha seleccionada", selectDate.value);
  axios.get(route("BookingServices.index")).then((response) => {
    reservas.value = response.data.bookingServices.filter(
      (item) => item.status == "reservado"
    );
    getServicesSelectedDate();
    reservas.value.forEach((item) => {
      // if (
      //   item.date == new Date().toLocaleDateString("en-CA") &&
      //   item.status == "reservado"
      // ) {
      //   dateActivities.value.push(item);
      // }
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
    label: "Detalles",
    action: (data) => {
      editBooking(data);
    },
    icon: "fa-solid fa-circle-info text-sm",
    severity: "info",
  },
  {
    label: "Notas",
    action: (data) => {
      serviceSelected.value = data;
      axios
        .get(route("notes.index", { booking_service_id: data.id }))
        .then((response) => {
          notes.value = response.data.notes;
        });
      todayActivity.value = true;
    },
    icon: "fa-solid fa-note-sticky text-sm",
  },
];

const columns = [
  {
    field: "adults",
    header: "Pasajeros",
    filter: true,
    sortable: true,
  },
  {
    field: "channel.name",
    header: "Canal de venta",
    filter: true,
    sortable: true,
  },
  {
    field: "service.title",
    header: "Actividad",
    filter: true,
    sortable: true,
  },
  {
    field: "cliente_name",
    header: "Nombre del pasajero",
    filter: true,
    sortable: true,
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
      return `<a href="tel:${rowData}">${rowData}</a>`;
    },
  },
  {
    field: "hour",
    header: "Hora",
    filter: true,
    sortable: true,
  },
];

const handleEventClick = (event) => {

  let serviceSelected = reservas.value.find((item) => item.id == event.Id);
  editBooking(serviceSelected);
  // Manejar el evento aquí
};

const sendNote = () => {
  axios
    .post(route("notes.store"), {
      note: note.value,
      booking_service_id: serviceSelected.value.id,
    })
    .then((response) => {
      axios
        .get(route("notes.index", { booking_service_id: serviceSelected.value.id }))
        .then((response) => {
          notes.value = response.data.notes;
          note.value = "";
        });
    });
};
// #endregion
</script>

<template>
  <AppLayout title="Dashboard">
    <div class="py-4">
      <div class="w-full mx-auto sm:px-1 lg:px-4 space-y-2">
        <div class="bg-white overflow-hidden sm:rounded-lg flex justify-between items-center px-1">
          <h1>
            Hola
            <strong class="uppercase"> {{ $page.props.auth.user.name }} </strong>,
            Bienvenido a tu panel de control
          </h1>
          <Link :href="route('portafolio')">
          <Button label="Ver Portafolio" />
          </Link>
        </div>
        <!-- <div class=" p-1 rounded-lg grid grid-cols-2 gap-4">
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
                </div> -->
        <div class="flex w-full justify-between font-bold text-xl items-center">
          <p>Actividades</p>
          <DatePicker v-model="selectDate" selectionMode="range" :manualInput="false"
            @value-change="getServicesSelectedDate" />

          <!-- <input
            type="date"
            class="mx-2 ring-0 border-0 shadow-md rounded-md"
            v-model="selectDate"
            @input="getServicesSelectedDate"
          /> -->
        </div>
        <div class="shadow-xl rounded-lg p-1">
          <Datatable :rows-default="20" :columnas="columns" :rowClass="true" :data="dateActivities" :actions>
            <template #groupRows>
              <ColumnGroup type="footer">
                <Row>
                  <Column footer="Pasajeros:" :colspan="0" footerStyle="text-align:right" />
                  <Column :footer="totalPasajeros" />
                </Row>
              </ColumnGroup>
            </template>
          </Datatable>
        </div>
        <!-- <div>
                    <h3 class="font-bold text-xl mb-2">Calendario de Eventos</h3>
                    <ScheduleXCalendar :calendar-app="calendarApp" />
                </div> -->
        <Scheduler v-if="reservas" :reservas @event-click="handleEventClick"></Scheduler>
      </div>
    </div>
  </AppLayout>
  <ViewBooking v-model="visible" :service="serviceSelected" v-if="serviceSelected"></ViewBooking>
  <Modal v-model="todayActivity" close-on-escape="true" title="Notas" width="90vw">
    <div class="w-full flex flex-col gap-y-5 p-2">
      <h3 class="text-xl font-bold">Notas de la Actividad</h3>
      <div class="h-[30vh] overflow-y-auto flex flex-col gap-y-2">
        <div class="flex border shadow-md p-2 rounded-md" v-for="n in notes" :key="n.id">
          <img :src="n.user.profile_photo_url" class="size-12 rounded-full" alt="" />
          <div class="ml-4 flex flex-col gap-y-2 w-full">
            <h2 class="font-bold text-2xl">{{ n.user.name }}</h2>
            <div class="w-full flex justify-between">
              <p>{{ n.note }}</p>
              <p>{{ new Date(n.created_at).toISOString().split("T")[0] }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-center flex-col items-center" v-if="notes.length == 0">
          <Logo></Logo>
          <p class="font-semibold text-xl">Serivicio sin notas</p>
        </div>
      </div>
      <div class="flex gap-x-2">
        <Input type="textarea" class="w-full shadow-xl" v-model="note"></Input>
        <Button label="Guardar" severity="info" icon="pi pi-send" @click="sendNote" />
      </div>
    </div>
  </Modal>
</template>

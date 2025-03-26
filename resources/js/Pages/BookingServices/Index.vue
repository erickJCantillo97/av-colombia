<template>
  <AppLayout title="Reservas">
    <div
      class="hidden bg-amber-200 bg-orange-200 !bg-blue-200 !bg-green-200 !bg-gray-200 !bg-orange-200 !bg-amber-200"
    ></div>
    <div class="h-[92vh]">
      <div class="flex py-2 px-4 justify-between items-center">
        <div class="italic flex flex-col">
          <h1 class="text-2xl font-bold">Reservas</h1>
          <Changes />
        </div>
        <div class="flex gap-x-2">
          <div
            class="p-2 bg-black text-white text-center rounded-lg cursor-pointer transition-all duration-300 scale-95 hover:scale-100"
            @click="statusFilter = null"
          >
            <p class="text-sm font-bold uppercase">Todos</p>
            <p class="text-xs italic">
              {{ bookingFecha.length }} Reservas |
              {{ bookingFecha.reduce((acc, item) => acc + item.adults, 0) }}
              Pasajeros
            </p>
          </div>
          <div
            v-for="status in statues"
            @click="
              bookingFecha.filter((x) => x.status == status.text).length != 0
                ? (statusFilter = status.text)
                : null
            "
            class="flex flex-col items-center transition-all duration-300"
            :class="[
              `bg-${status.color}-200 p-2 rounded-lg`,
              statusFilter == status.text
                ? 'border-2 border-gray-500 scale-105'
                : 'border-2 border-transparent scale-95',
              bookingFecha.filter((x) => x.status == status.text).length == 0
                ? 'cursor-not-allowed opacity-55'
                : 'cursor-pointer hover:scale-105 hover:border-2 hover:border-gray-500',
            ]"
          >
            <p class="text-sm font-bold uppercase">{{ status.text }}</p>
            <p class="text-xs italic">
              {{ bookingFecha.filter((x) => x.status == status.text).length }} Reservas |
              {{
                bookingFecha
                  .filter((x) => x.status == status.text)
                  .reduce((acc, item) => acc + item.adults, 0)
              }}
              Pasajeros
            </p>
          </div>
        </div>
        <DatePicker
          v-model="selectDate"
          selectionMode="range"
          dateFormat="dd/mm/yy"
          v-tooltip.bottom="`Filtrar fecha de Actividad`"
          :manualInput="false"
        />
      </div>
      <Datatable
        :actions="buttons"
        :add
        showButtonBar
        :columnas="columns"
        :data="bookings"
        routecreate="services.create"
        :rowClass="true"
      >
      </Datatable>
    </div>
    <Modal v-model="show" title="Añadir Reserva" width="70vw">
      <form class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center" novalidate>
        <Input
          class="col-span-3"
          type="dropdown"
          v-model="form.service_id"
          :error-message="form.errors.service_id"
          label="Servicio"
          option-label="title"
          option-value="id"
          :options="services"
          @value-change="getProveedors"
        ></Input>
        <Input
          label="Codigo de Reserva"
          v-model="form.code_booking"
          :error-message="form.errors.code_booking"
        />
        <Input
          label="Fecha de Reserva"
          :enableTimePicker="true"
          :disabled-dates="disabledDates"
          v-model="form.date"
          required
          class="w-full"
          type="datetime"
        />
        <Input
          label="Valor Total"
          type="number"
          mode="currency"
          v-model="form.total"
        ></Input>
        <Input
          label="Tiempo del Servicio"
          type="dropdown"
          v-model="form.time_service"
          :options="[
            '20 Minutos',
            '30 Minutos',
            '40 Minutos',
            '1 Hora',
            '2 Horas',
            '6 Horas',
            '12 Horas',
            '24 Horas',
          ]"
        ></Input>
        <Input label="Pasajeros" type="number" v-model="form.adults"></Input>
        <Input label="Niños" type="number" v-model="form.boys"></Input>
        <Input
          label="Nombre del Pasajero"
          v-model="form.cliente_name"
          :error-message="form.errors.cliente_name"
          class="w-full"
        />
        <Input
          label="Telefono"
          v-model="form.cliente_phone"
          :error-message="form.errors.cliente_phone"
          class="w-full"
          type="number"
        />
        <Input
          label="Ciudad de donde Proviene"
          v-model="form.cliente_city"
          :error-message="form.errors.city"
          class="w-full"
        />
        <Input
          label="Edificio u Hotel"
          class="w-full"
          v-model="form.cliente_building"
          :error-message="form.errors.cliente_building"
        />

        <Input
          class="w-full"
          min="0"
          type="dropdown"
          option-label="name"
          option-value="id"
          :options="methods"
          v-model="form.method_id"
          label="Medio de Pago"
        />
        <Input
          class="w-full"
          min="0"
          type="dropdown"
          option-label="name"
          option-value="id"
          :options="channels"
          v-model="form.channel_id"
          label="Canal de Venta"
        />
        <Input
          class="w-full"
          label="Saldo"
          v-model="form.saldo"
          :error-message="form.errors.saldo"
          min="0"
          type="number"
          mode="currency"
        />
        <Input
          class="w-full col-span-1 md:col-span-4"
          :rows-textarea="2"
          label="Observaciones"
          v-model="form.observations"
          :error-message="form.errors.observations"
          type="textarea"
        />
        <div
          class="w-full col-span-1 md:col-span-4 flex justify-between gap-x-2 items-center"
        >
          <div
            class="w-full flex flex-col justify-center items-center p-2 shadow-lg border"
          >
            <p class="text-lg font-mono font-semibold">{{ COP.format(totalPax) }}</p>
            <p class="italic text-md">Valor Pasajero</p>
          </div>
          <div
            class="w-full flex flex-col justify-center items-center p-2 shadow-lg border"
          >
            <p class="text-lg font-mono font-semibold">{{ COP.format(valorReal) }}</p>
            <p class="italic text-md">Valor Real</p>
          </div>
        </div>
        <div
          class="mt-4 w-full col-span-1 md:col-span-4 border rounded-lg"
          v-if="serviceSelected"
        >
          <h1
            class="text-2xl font-mono font-semibold text-center bg-black rounded-t-lg text-white gap-x-3 p-2"
          >
            Proveedores
            <Button
              icon="fa-solid fa-plus"
              outlined=""
              severity="success"
              class="size-6"
              @click="addProveedor()"
            />
          </h1>

          <div class="flex justify-between w-full font-bold px-2">
            <label for="">Proveedor</label>
            <label for="">Costo</label>
            <label for="">.</label>
          </div>

          <div
            v-for="(p, index) in proveedorsAdd"
            class="flex justify-between gap-x-4 px-2"
          >
            <Select
              :options="proveedors"
              @value-change="selectedProveedor(p)"
              v-model="p.proveedor"
              placeholder="Selecciona un proveedor"
              class="w-full"
              option-label="nombre"
            >
              <template #value="slotProps">
                <span v-if="slotProps.value">
                  {{ slotProps.value.nombre }} - {{ slotProps.value.pivot.concept }}</span
                >
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex gap-x-2">
                  <span>{{ slotProps.option.nombre }} - </span>
                  <span>{{ slotProps.option.pivot.concept }} - </span>
                  <span>{{ slotProps.option.pivot.value }}</span>
                </div>
              </template>
            </Select>
            <!-- <Input
              type="dropdown"
              v-model="p.proveedor"
              @value-change="selectedProveedor(p)"
              option-label="nombre"
              option-value="id"
              class="w-full"
              :options="proveedors"
            ></Input> -->
            <Input type="number" mode="currency" class="w-full" v-model="p.costo"></Input>
            <Button
              icon="fa-solid fa-xmark-circle"
              class="w-full"
              v-tooltip="`Quitar`"
              text
              severity="danger"
              @click="removeProveedor(index)"
            />
          </div>
        </div>
        <div class="mt-4 w-full col-span-1 md:col-span-4 border rounded-lg">
          <h1
            class="text-2xl font-mono font-semibold text-center bg-green-800 rounded-t-lg text-white gap-x-3 p-2"
          >
            Cargos Extras
            <Button
              icon="fa-solid fa-plus"
              outlined=""
              severity="success"
              class="size-6"
              @click="addExtra()"
            />
          </h1>
          <div class="grid grid-cols-6 w-full font-bold px-2 gap-x-4">
            <label for="" class="col-span-1">Cantidad</label>
            <label for="" class="col-span-2">Descripción</label>
            <label for="" class="col-span-2">Precio Unitario</label>
            <label for=""></label>
          </div>
          <div v-for="(p, index) in extrasAdd" class="grid grid-cols-6 gap-x-4 px-2">
            <Input type="number" v-model="p.cantidad" class="w-full col-span-1"></Input>
            <Input type="text" class="w-full col-span-2" v-model="p.description"></Input>
            <Input
              type="number"
              mode="currency"
              class="w-full col-span-2"
              v-model="p.unit_price"
            ></Input>
            <Button
              icon="fa-solid fa-xmark-circle"
              class="w-full"
              v-tooltip="`Quitar`"
              text
              severity="danger"
              @click="removeExtra(index)"
            />
          </div>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end gap-x-2 mt-4 w-full">
          <Button @click="show = false" severity="danger" label="Cancelar" :loading />
          <Button
            type="submit"
            v-if="form.id"
            label="Actualizar"
            severity="warn"
            @click="update"
          ></Button>
          <Button
            type="submit"
            v-else
            severity="success"
            label="Guardar"
            :loading
            @click="reservar"
          />
        </div>
      </template>
    </Modal>
    <Toast></Toast>
    <ViewBooking
      v-model="info"
      :service="service"
      v-if="service"
      :proveedors="proveedors"
    ></ViewBooking>
  </AppLayout>
  <Notas
    v-model="todayActivity"
    :notes="notes"
    v-if="todayActivity"
    :note="note"
    :service="serviceSelected"
  ></Notas>
</template>
<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import Input from "@/Components/Customs/Input.vue";
import Modal from "@/Components/Customs/Modal.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { Link, router, useForm, usePage } from "@inertiajs/vue3";
import { computed, ref, watch } from "vue";
import Toast from "primevue/toast";
import { alerts } from "@/composable/toasts";
import Swal from "sweetalert2";
import ViewBooking from "@/Components/viewBooking.vue";
import Changes from "@/Components/Customs/Changes.vue";
import Notas from "@/Components/Customs/Notas.vue";

const props = defineProps({
  bookingServices: Array,
});

// #region Variables

const { toast } = alerts();
const proveedors = ref([]);
const notes = ref([]);
const note = ref("");
const serviceSelected = ref(null);
const channels = ref([]);
const info = ref(false);
const service = ref(null);
const selectDate = ref([]);
const methods = ref([]);
const services = ref([]);
const show = ref(false);
const statusFilter = ref(null);
const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

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
      { text: "reservado", severity: "info", class: "" },
      { text: "CAMBIO DE FECHA", class: "bg-gray-200 font-bold" },
      { text: "COMPLETADA", severity: "success", class: "" },
      { text: "NO SHOW", severity: "warn", class: "" },
      { text: "REUBICADO", severity: "warn", class: "" },
      { text: "CANCELADA", severity: "danger", class: "animate-pulse" },
      { text: "PROBLEMATICA", severity: "danger", class: "animate-pulse" },
    ],
  },
];

const statues = [
  { text: "reservado", color: "blue" },
  { text: "CAMBIO DE FECHA", color: "gray" },
  { text: "NO SHOW", color: "amber" },
  { text: "REUBICADO", color: "orange" },
  { text: "CANCELADA", color: "green" },
];

const add = {
  action: () => {
    form.reset();
    show.value = true;
  },
};
const proveedorsAdd = ref([
  {
    proveedor: null,
    costo: "",
  },
]);

const extrasAdd = ref([
  {
    cantidad: 0,
    description: "",
    unit_price: 0,
  },
]);

// #endregion

// #region Computed
const bookings = computed(() => {
  return props.bookingServices.filter((item) => {
    if (selectDate.value[0] == null) {
      return statusFilter.value == null || item.status == statusFilter.value;
    }
    var fecha = new Date(item.date).toISOString().split("T")[0];
    return (
      fecha >= new Date(selectDate.value[0]).toISOString().split("T")[0] &&
      fecha <= new Date(selectDate.value[1]).toISOString().split("T")[0] &&
      (statusFilter.value == null || item.status == statusFilter.value)
    );
  });
});

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

const totalPax = computed(() => {
  return form.total / form.adults;
});

const valorReal = computed(() => {
  let chanel = channels.value.find((channel) => channel.id == form.channel_id);
  let chanelValue = chanel ? chanel.percent / 100 : 0;
  return form.total - form.total * chanelValue;
});

const disabledDates = computed(() => {
  var dates = [];
  var selectedProduct = services.value.find((service) => service.id == form.service_id);
  if (!selectedProduct) return [];
  for (var lock of selectedProduct.locks) {
    var start = parseDate(lock.start_date);
    var end = parseDate(lock.end_date);
    for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
  }
  return dates;
});

// #endregion

// #region Formularios

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
  // hour: '',
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

// #endregion

// #region Metodos
const getServices = () => {
  axios.get(route("services.index")).then((response) => {
    services.value = response.data.services;
  });
};

const addProveedor = () => {
  proveedorsAdd.value.push({
    proveedor: null,
    costo: "",
  });
};

const removeProveedor = (index) => {
  if (index == 0) return;
  proveedorsAdd.value.splice(index, 1);
};

const addExtra = () => {
  extrasAdd.value.push({
    cantidad: 0,
    description: "",
    total_cost: 0,
    unit_price: 0,
  });
};

const removeExtra = (index) => {
  if (index == 0) return;
  extrasAdd.value.splice(index, 1);
};

const getProveedors = async () => {
  var servicio = services.value.find((service) => service.id == form.service_id);
  serviceSelected.value = servicio;
  proveedorsAdd.value = [
    {
      proveedor: null,
      costo: "",
    },
  ];
  await axios
    .get(route("get.provedors.service", servicio.slug))
    .then((response) => {
      proveedors.value = response.data.proveedors;
    })
    .catch((error) => {
      console.log(error);
    });
};

const selectedProveedor = (proveedor) => {
  proveedor.costo = proveedor.proveedor.pivot.value * form.adults;
};

const getChannels = () => {
  axios
    .get(route("channels.index"))
    .then((response) => {
      channels.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

getServices();
getChannels();

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
      // form.date = data.date + ',' + data.hour;
      form.id = data.id;
      const formatDateTime = (date, time) => {
        const [year, month, day] = date.split("-");
        const [hour, minute] = time.split(":");
        return `${year}-${month}-${day},${hour}:${minute}`;
      };

      form.date = formatDateTime(data.date, data.hour);
      serviceSelected.value = services.value.find(
        (service) => service.id == data.service_id
      );
      form.service_id = data.service_id;
      form.cliente_name = data.cliente_name;
      form.cliente_phone = data.cliente_phone;
      form.cliente_city = data.cliente_city;
      form.cliente_building = data.cliente_building;
      form.adults = data.adults;
      form.total = data.total;
      form.method_id = data.method_id;
      form.channel_id = data.channel_id;
      form.saldo = data.saldo;
      form.proveedors = data.proveedors;
      form.code_booking = data.code_booking;
      form.time_service = data.time_service;
      await getProveedors();
      proveedorsAdd.value = data.proveedors.map((prov) => {
        return {
          proveedor: proveedors.value.filter((p) => {
            console.log(p.id, prov.proveedor_id, p.pivot.concept, prov.concept);
            return p.id == prov.proveedor_id && p.pivot.concept == prov.concept;
          })[0],
          costo: prov.cost,
        };
      });
      // console.log(proveedorsAdd.value);
      form.observations = data.observations;

      service.value = data;
      show.value = true;
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
    label: "Problematica",
    show: usePage().props.auth.user.rol == "admin",
    action: (data) => {
      var marcar = data.problematic ? "Desmarcar" : "Marcar";
      Swal.fire({
        title: "Estas Seguro?",
        text: `${marcar} como problematica esta reservación!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: `Si, ${marcar}!`,
      }).then((result) => {
        if (result.isConfirmed) {
          router.post(route("booking.problematic", data.id), {
            onSuccess: () => {
              toast("success", "Reserva Marcada como problematica");
            },
          });
        }
      });
    },
    icon: "fa-solid fa-person-dress-burst text-sm",
    severity: "danger",
    // class: 'p-button-warning text-sm'
  },

  {
    label: "Eliminar",
    icon: "fa-solid fa-trash text-sm",
    severity: "danger",

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

const loading = ref(false);

const reservar = (event) => {
  event.preventDefault();
  if (!form.cliente_building) {
    toast("error", "Rellene Todos los Campos");
    return 0;
  }
  form.total_real = valorReal.value;
  form.percent_channel = channels.value.find(
    (channel) => channel.id == form.channel_id
  ).percent;
  loading.value = true;
  form.proveedors = proveedorsAdd.value;
  form.extras = extrasAdd.value;
  form.post(route("BookingServices.store"), {
    onSuccess: () => {
      form.reset();
      loading.value = false;
      show.value = false;
      toast("success", "Reserva creada con exito");
    },
    onError: () => {
      loading.value = false;
      toast("error", "Error al crear la reserva");
    },
  });
};

const update = () => {
  form.total_real = valorReal.value;
  form.percent_channel = channels.value.find(
    (channel) => channel.id == form.channel_id
  ).percent;
  form.proveedors = proveedorsAdd.value;
  form.put(route("BookingServices.update", form.id), {
    onSuccess: () => {
      show.value = false;
      toast("success", "Reserva actualizada con exito");
    },
  });
};

const getMethos = () => {
  axios
    .get(route("paymentMethods.index"))
    .then((response) => {
      methods.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
getMethos();

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day);
};
</script>

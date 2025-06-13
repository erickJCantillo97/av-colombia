<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import Modal from "@/Components/Customs/Modal.vue";
import Form from "./Form.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { router, useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { ref } from "vue";
import { alerts } from "@/composable/toasts";
import axios from "axios";
const show = ref(false);

const { toast } = alerts();
const value = ref(1);
const options = [
  { name: "Agrupados", value: 1 },
  { name: "Detalles", value: 2 },
];

const props = defineProps({
  payments: Array,
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const formatDate = (date) => {
  if (date == undefined || date == null) {
    return "Sin definir";
  } else {
    var fecha = new Date(
      new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60000
    );
    return fecha;
  }
};

const loading = ref(false);

const form = useForm({
  date: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  amount: 0,
  proveedor_id: "",
  file: "",
  description: "",
});

const proveedores = ref([]);

const selectDate = ref([new Date(), new Date()]);

const reservas = ref();
const reservasType = ref([]);
const proveedor = ref();
const payment_id = ref(null);
const add = {
  action: () => {
    payment_id.value = null;
    selectDate.value = [new Date(), new Date()];
    form.reset();
    getReservas();
    show.value = true;
    // router.visit(route('services.create'))
  },
};

const actions = [
  {
    name: "Ver",
    icon: "fa-solid fa-pencil",
    severity: "info",
    action: (row) => {
      show.value = true;
      payment_id.value = row.id;
      form.date = row.date;
      selectDate.value = [formatDate(row.startDate), formatDate(row.endDate)];
      form.amount = row.amount;
      proveedor.value = row.proveedor_id;
      getReservas();
    },
  },
];

const columns = [
  {
    header: "Proveedor",
    field: "proveedor.nombre",
    filter: true,
  },
  {
    header: "Fecha de Pago",
    field: "date",
    type: "date",
    filter: true,
  },
  {
    header: "Valor",
    field: "amount",
    type: "currency",
  },
  {
    header: "Fecha Inicio",
    field: "startDate",
    type: "date",
    filter: true,
  },
  {
    header: "Fecha Fin",
    field: "endDate",
    type: "date",
    filter: true,
  },
  {
    header: "Comprobante",
    field: "comprobante",
    type: "html-custom",
    renderer: (row) => {
      return `<a href="${row.comprobante}" class="text-sky-600 underline" target="_blank">Ver Comprobante</a>`;
    },
  },
];

const getReservas = () => {
  axios
    .get(route("get.booking.time.range"), {
      params: {
        start_date: new Date(selectDate.value[0]).toISOString().split("T")[0],
        end_date: new Date(selectDate.value[1]).toISOString().split("T")[0],
      },
    })
    .then((response) => {
      proveedores.value = response.data.proveedores;
      reservas.value = response.data.bookingTimeRange.filter((item) => {
        let p = proveedor.value;
        let proveedoresItems = item.proveedors.map((i) => i.proveedor_id);
        return proveedoresItems.includes(p);
      });
      reservasType.value = [
        {
          name: "RESERVADO",
          value: reservas.value.filter((item) => item.status == "RESERVADO"),
          color: "bg-blue-200",
        },
        {
          name: "COMPLETADA",
          value: reservas.value.filter((item) => item.status == "COMPLETADA"),
          color: "bg-green-200",
        },
        {
          name: "CANCELADA",
          value: reservas.value.filter((item) => item.status == "CANCELADA"),
          color: "bg-red-200",
        },
        {
          name: "NO SHOW",
          value: reservas.value.filter((item) => item.status == "NO SHOW"),
          color: "bg-yellow-200",
        },
        {
          name: "CAMBIO DE FECHA",
          value: reservas.value.filter((item) => item.status == "CAMBIO DE FECHA"),
          color: "bg-gray-200",
        },
        {
          name: "REUBICADO",
          value: reservas.value.filter((item) => item.status == "REUBICADO"),
          color: "bg-yellow-200",
        },
      ];
    });
};

const op = ref();
const members = ref([]);
const groupReservas = ref([]);

const toggle = (event, item) => {
  groupReservas.value = item.value.reduce((acc, curr) => {
    const title = curr.title;
    if (!acc[title]) {
      acc[title] = { count: 0, pasajeros: 0, total: 0 };
    }
    acc[title].count += 1;
    acc[title].pasajeros += curr.adults;
    acc[title].total += curr.proveedors
      .filter((x) => x.proveedor_id == proveedor.value)
      .reduce((a, c) => a + c.cost, 0);
    return acc;
  }, {});
  members.value = item;
  op.value.toggle(event);
};

function previewFiles(event) {
  form.file = event.target.files[0];
}

const save = () => {
  loading.value = true;
  let formData = new FormData();
  formData.append("proveedor_id", proveedor.value);
  formData.append("amount", form.amount);
  formData.append("comprobante", form.file);
  formData.append("date", new Date(form.date).toISOString().split("T")[0]);
  console.log(
    new Date(selectDate.value[0]).toISOString().split("T")[0],
    new Date(selectDate.value[1]).toISOString().split("T")[0]
  );
  formData.append("startDate", new Date(selectDate.value[0]).toISOString().split("T")[0]);
  formData.append("endDate", new Date(selectDate.value[1]).toISOString().split("T")[0]);
  formData.append("description", form.description);

  if (payment_id.value) {
    router.post(route("paymentProveedors.update", payment_id.value), formData, {
      onSuccess: () => {
        toast("success", "Pago Actualizado con exito");
        loading.value = false;
        show.value = false;
      },
    });

    return;
  }
  router.post(route("paymentProveedors.store"), formData, {
    onSuccess: () => {
      toast("success", "Pago Actualizado con exito");
      loading.value = false;
      show.value = false;
    },
  });
};
</script>

<template>
  <AppLayout title="Pagos">
    <div class="h-[99vh]">
      <Datatable :add :columnas="columns" :data="payments" :actions title="Pagos">
      </Datatable>
    </div>
    <Modal v-model="show" title="Añadir Pagos" width="80vw">
      <Form></Form>
    </Modal>
  </AppLayout>

 
</template>

<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import Input from "@/Components/Customs/Input.vue";
import Modal from "@/Components/Customs/Modal.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { router, useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { ref } from "vue";
import { alerts } from "@/composable/toasts";
import axios from "axios";
const show = ref(false);

const { toast } = alerts();

const props = defineProps({
  payments: Array,
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});
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

const add = {
  action: () => {
    show.value = true;
    // router.visit(route('services.create'))
  },
};

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
    field: "date",
    type: "date",
    filter: true,
  },
  {
    header: "Fecha Fin",
    field: "endDate",
    field: "date",
    type: "date",
    filter: true,
  },
  {
    header: "Comprobante",
    field: "comprobante",
    type: "html-custom",
    renderer: (row) => {
      return `<a href="${row}" class="text-sky-600 underline" target="_blank">Ver Comprobante</a>`;
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
          name: "Reservado",
          value: reservas.value.filter((item) => item.status == "reservado"),
          color: "bg-blue-200",
        },
        {
          name: "Completado",
          value: reservas.value.filter((item) => item.status == "completado"),
          color: "bg-green-200",
        },
        {
          name: "Cancelado",
          value: reservas.value.filter((item) => item.status == "CANCELADA"),
          color: "bg-red-200",
        },
        {
          name: "NO SHOW",
          value: reservas.value.filter((item) => item.status == "NO SHOW"),
          color: "bg-yellow-200",
        },
      ];
    });
};

const op = ref();
const members = ref([]);

const toggle = (event, item) => {
  console.log(item);
  members.value = item;
  op.value.toggle(event);
};

const renderNotas = (notas) => {
  var info = ``;
  var nota = notas.map((item) => {
    info += `${item.note} - (${item.user})\n`;
  });
  return info;
};

function previewFiles(event) {
  form.file = event.target.files[0];
}

const store = () => {
  loading.value = true;
  let formData = new FormData();
  formData.append("proveedor_id", proveedor.value);
  formData.append("amount", form.amount);
  formData.append("comprobante", form.file);
  formData.append("date", new Date(form.date).toISOString().split("T")[0]);
  formData.append("startDate", new Date(selectDate.value[0]).toISOString().split("T")[0]);
  formData.append("endDate", new Date(selectDate.value[1]).toISOString().split("T")[0]);
  formData.append("description", form.description);
  axios
    .post(route("paymentProveedors.store"), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      toast("success", "Pago Guardado con exito");
      loading.value = false;
      show.value = false;
    });
};
</script>

<template>
  <AppLayout title="Pagos">
    <div class="h-[99vh]">
      <Datatable :add :columnas="columns" :data="payments" title="Pagos"> </Datatable>
    </div>
    <Modal v-model="show" title="Añadir Pagos">
      <div class="gap-y-2 flex flex-col">
        <div class="flex flex-col w-full justify-between font-bold">
          <p>Fechas</p>
          <DatePicker
            v-model="selectDate"
            selectionMode="range"
            dateFormat="dd/mm/yy"
            class="w-full"
            :manualInput="false"
            @value-change="getReservas"
          />
        </div>
        <Input
          label="Proveedor"
          type="dropdown"
          option-label="proveedor"
          option-value="proveedor_id"
          @value-change="getReservas"
          v-model="proveedor"
          :options="proveedores"
        />

        <div v-if="proveedor" class="flex flex-col gap-y-2">
          <!-- {{ reservas }} -->
          <div class="flex justify-between gap-x-4">
            <div
              v-for="item in reservasType"
              :class="`${item.color} ${
                item.value.length > 0 ? 'cursor-pointer' : 'hidden'
              } `"
              class="rounded-lg py-2 border w-full flex flex-col gap-y-1 items-center font-bold cursor-pointer scale-90 hover:scale-100 shadow-sm hover:shadow-lg transition-all duration-300"
              @click="toggle($event, item)"
            >
              <h1>{{ item.name }}</h1>
              <div class="flex gap-2 divide-x-4 divide-white items-center">
                <p class="p-1">{{ item.value.length }} Reservas</p>
                <p class="p-1 pl-3">
                  {{ item.value.reduce((a, c) => a + c.adults, 0) }} Pasajeros
                </p>
              </div>
              <p>
                {{
                  COP.format(
                    item.value.reduce(
                      (a, c) =>
                        a +
                        c.proveedors
                          .filter((x) => x.proveedor_id == proveedor)
                          .reduce((a, c) => a + c.cost, 0),
                      0
                    )
                  )
                }}
              </p>
            </div>
          </div>
          <div class="flex flex-col w-full justify-between font-bold">
            <p>Fecha en que realizó el pago</p>
            <DatePicker
              v-model="form.date"
              dateFormat="dd/mm/yy"
              class="w-full"
              :manualInput="false"
            />
          </div>
          <Input label="Valor" type="number" mode="currency" v-model="form.amount" />
          <input type="file" @change="previewFiles" label="Comprobante" />
        </div>

        <div class="flex justify-end gap-x-2">
          <button
            @click="show = false"
            class="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            :loading
            v-if="proveedor"
            @click="store"
            class="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  </AppLayout>

  <Popover ref="op">
    <div class="flex flex-col gap-4">
      <div>
        <span class="font-medium block mb-2">{{ members.name }} </span>
        <div class="flex flex-col gap-y-2 h-64 overflow-auto">
          <div
            v-tooltip="renderNotas(member.notas)"
            class="flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"
            v-for="member in members.value"
          >
            <div class="flex flex-col">
              <span class="font-bold flex items-center gap-x-2">
                <p>
                  {{ member.title }}
                </p>
              </span>
              <span class="text-xs">{{ member.cliente_name }}</span>
              <span class="text-xs">{{ member.fecha }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm">{{ member.adults }} Pasajeros</span>
              <span class="font-bold">{{
                COP.format(
                  member.proveedors
                    .filter((x) => x.proveedor_id == proveedor)
                    .reduce((a, c) => a + c.cost, 0)
                )
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Popover>
</template>

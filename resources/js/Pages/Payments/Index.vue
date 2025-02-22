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

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const props = defineProps({
  proveedores: Array,
});

const selectDate = ref([new Date(), new Date()]);

const reservas = ref();
const reservasType = ref([]);
const proveedor = ref();
const costosReservas = ref(0);

const add = {
  action: () => {
    show.value = true;
    // router.visit(route('services.create'))
  },
};

const buttons = [
  {
    action: (data) => {
      // validatePay.value = true
      Swal.fire({
        title: "Confirmar Pago?",
        text: "Esta seguro de Confirmar este pago?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Confirmar!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.post(
            route("payment.set.state", data.id),
            {
              _method: "PUT",
              status: "Confirmado",
            },
            {
              onSuccess: () => {
                toast("success", "Pago Confirmado con exito");
              },
            }
          );
        }
        // toast('success', 'Pago Confirmado con exito')
      });
      serviceSelected.value = data;
    },
    // <i class="fa-solid fa-file-invoice-dollar"></i>
    severity: "success",
    icon: "fa-solid fa-wallet text-sm",
    label: "Validar Pago",
  },
];

const getReservas = () => {
  axios.get(route("BookingServices.index")).then((response) => {
    let dateActivities = response.data.bookingServices.filter((item) => {
      var fecha = new Date(item.date).toISOString().split("T")[0];
      return (
        fecha >= new Date(selectDate.value[0]).toISOString().split("T")[0] &&
        fecha <= new Date(selectDate.value[1]).toISOString().split("T")[0]
      );
    });
    reservas.value = dateActivities.filter((item) => {
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

    costosReservas.value = reservas.value.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.proveedors.reduce((a, c) => {
          return a + c.cost;
        }, 0)
      );
    }, 0);
  });
};

const op = ref();
const selectedMember = ref(null);
const members = ref([
  { name: "Amy Elsner", image: "amyelsner.png", email: "amy@email.com", role: "Owner" },
  {
    name: "Bernardo Dominic",
    image: "bernardodominic.png",
    email: "bernardo@email.com",
    role: "Editor",
  },
  {
    name: "Ioni Bowcher",
    image: "ionibowcher.png",
    email: "ioni@email.com",
    role: "Viewer",
  },
]);

const toggle = (event, item) => {
  console.log(item);
  members.value = item;
  op.value.toggle(event);
};
</script>

<template>
  <AppLayout title="Pagos">
    <div class="h-[99vh]">
      <Datatable
        :add
        :columnas="columns"
        :actions="buttons"
        :data="payments"
        title="Pagos"
      >
      </Datatable>
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
          option-label="nombre"
          option-value="id"
          @value-change="getReservas"
          v-model="proveedor"
          :options="proveedores"
        />

        <div>
          <!-- {{ reservas }} -->
          <div class="flex justify-between gap-x-4">
            <div
              v-for="item in reservasType"
              :class="`${item.color}`"
              class="rounded-lg py-2 border w-full flex flex-col gap-y-1 items-center font-bold cursor-pointer scale-90 hover:scale-100 shadow-sm hover:shadow-lg transition-all duration-300"
              @click="toggle($event, item)"
            >
              <h1>{{ item.name }}</h1>
              <p>{{ item.value.length }}</p>
              <p>
                {{
                  COP.format(
                    item.value.reduce(
                      (acum, reserva) =>
                        acum +
                        reserva.proveedors
                          .filter((x) => x.proveedor_id == proveedor)
                          .reduce((a, c) => a + c.cost, 0),
                      0
                    )
                  )
                }}
              </p>
            </div>
          </div>
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
            class="flex items-center gap-x-8 border-b shadow-md justify-between p-3 rounded-md hover:bg-gray-300"
            v-for="member in members.value"
          >
            <div class="flex flex-col">
              <span class="font-medium">{{ member.service.title }}</span>
              <span class="text-sm">{{ member.cliente_name }}</span>
            </div>
            <div>
              <span class="font-medium">{{
                COP.format(member.proveedors.reduce((a, c) => a + c.cost, 0))
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Popover>
</template>

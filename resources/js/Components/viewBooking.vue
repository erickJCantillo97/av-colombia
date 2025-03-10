<template>
  <Drawer
    v-model:visible="show"
    pt:root:class="!bg-blue-100"
    header="Detalles de la actividad"
    position="right"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <span class="font-bold text-lg">{{ service.service }}</span>
      </div>
    </template>
    <div class="flex flex-col gap-y-1.5 text-sm">
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Fecha del Servicio:</strong>
        <p>{{ formatDate(service.date) }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Hora del Servicio:</strong>
        <p>{{ service.hour }}</p>
      </div>
      <div
        v-if="service.time_service"
        class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
      >
        <strong>Duración del Servicio:</strong>
        <p>{{ service.time_service }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Canal de Venta:</strong>
        <p>{{ service.channel.name }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Cliente:</strong>
        <p>{{ service.cliente_name }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Ciudad:</strong>
        <p>{{ service.cliente_city }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Telelfono:</strong>
        <a
          target="_blank"
          :href="`https://wa.me/${service.cliente_phone}?text=Hola%20👋,%20mi%20nombre%20es%20*Sandra Gil*,%20Le%20escribo%20desde%20*AV%20COLOMBIA*`"
          >{{ service.cliente_phone }}</a
        >
      </div>

      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Edificio:</strong>
        <p>{{ service.cliente_building }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Adultos:</strong>
        <p>{{ service.adults }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Niños:</strong>
        <p>{{ service.boys }}</p>
      </div>

      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Total:</strong>
        <p>{{ COP.format(service.total) }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Total Real:</strong>
        <p>{{ COP.format(service.total_real) }}</p>
      </div>
      <div
        v-if="service.user"
        class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
      >
        <strong>Usuario:</strong>
        <p>{{ service.user?.name }}</p>
      </div>
      <div
        v-if="service.user"
        class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
      >
        <strong>Fecha de reserva:</strong>
        <p>{{ new Date(service.created_at).toLocaleDateString("es-CO") }}</p>
      </div>

      <div
        v-if="service.fecha_cancelacion"
        class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
      >
        <strong>Fecha de Cancelación:</strong>
        <p>{{ service.fecha_cancelacion }}</p>
      </div>
      <div class="flex flex-col border py-1 bg-white/30 rounded-md px-2">
        <strong>Observacion:</strong>
        <p>{{ service.observations }}</p>
      </div>

      <div class="text-lg flex w-full justify-between items-center mt-2">
        <p class="font-bold">Proveedores</p>
        <p
          class="rounded-full bg-green-800 text-white px-1.5 py-0.5 text-xs fles items-center justify-center"
        >
          {{ service.proveedors.length }}
        </p>
        <!-- {{ service.proveedors }} -->
      </div>
      <div
        v-for="proveedor in service.proveedors"
        class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
      >
        <p>
          {{ proveedor.proveedor.proveedor.nombre }}
        </p>
        <p>
          {{ COP.format(proveedor.cost) }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex flex-col items-center">
        <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
          <Button
            @click="setState('reservado', true)"
            icon="fa-solid fa-circle-check"
            v-tooltip.top="'Reservada'"
            severity="info"
          />
          <Button
            @click="setState('NO SHOW', true)"
            icon="fa-solid fa-eye-slash"
            v-tooltip.top="'Servicio No show'"
            class="!text-white !bg-yellow-600"
          />
          <Button
            @click="dateChange()"
            icon="fa-solid fa-calendar-week"
            v-tooltip.top="'Cambio de Fecha'"
            class="!bg-gray-600 !text-white"
          />
          <Button
            @click="reubicarServicio()"
            icon="fa-solid fa-people-arrows"
            v-tooltip.top="'Cambio de proveedor'"
            severity="warn"
          />
          <Button
            @click="cancelarServicio()"
            icon="fa-solid fa-xmark-circle"
            v-tooltip.top="'Cancelar Servicio'"
            severity="danger"
          />
          <Button
            @click="setState('PROBLEMATICA', false)"
            icon="fa-solid fa-person-dress-burst"
            v-tooltip.top="'Servicio Problematico'"
            class="flex-auto"
            severity="danger"
          />
        </div>
      </div>
    </template>
  </Drawer>

  <Modal v-model="reubicar" title="Cambio de proveedor" close-on-escape>
    <div class="flex flex-col gap-y-2">
      <span class="flex flex-col gap-y-1">
        <label for="" class="font-bold"> Proveedor Actual</label>
        <Select
          placeholder="Proveedor Actual"
          :options="service.proveedors"
          label="Proveedor Actual"
          v-model="current_proveedors"
          option-label="proveedor.name"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center gap-x-2">
              <div>{{ current_proveedors.proveedor.proveedor.nombre }}</div>
              <span>-</span>
              <div>{{ COP.format(current_proveedors.cost) }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="{ option }">
            <div class="flex items-center gap-2">
              <span>{{ option.proveedor.proveedor.nombre }}</span>
              <span>-</span>
              <span>{{ COP.format(option.cost) }}</span>
            </div>
          </template>
        </Select>
      </span>
      <Input
        option-label="nombre"
        option-value="id"
        type="dropdown"
        label="Nuevo Proveedor"
        v-model="formReu.new_id"
        :options="proveedors"
      ></Input>
      <Input label="Valor" v-model="formReu.value" type="number" mode="currency"></Input>
      <Input label="Nota" v-model="formReu.note" type="textarea" mode="currency"></Input>

      <div class="flex justify-end gap-2">
        <Button
          @click="reubicar = false"
          label="Cancelar"
          severity="danger"
          icon="fa-solid fa-xmark"
        />
        <Button
          @click="sendReubicar()"
          label="Guardar"
          severity="success"
          icon="fa-solid fa-save"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Swal from "sweetalert2";
import { router, useForm } from "@inertiajs/vue3";
import { alerts } from "@/composable/toasts";
import { ref } from "vue";
import Modal from "./Customs/Modal.vue";
import Input from "./Customs/Input.vue";

const { toast } = alerts();
const props = defineProps({
  service: Object,
  proveedors: Array,
});

const current_proveedors = ref(null);

const show = defineModel();
const reubicar = ref(false);
const formReu = useForm({
  service: props.service.id,
  current_id: "",
  new_id: "",
  state: "",
  note: "",
  terminated: true,
  value: "",
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const cancelarServicio = () => {
  Swal.fire({
    title: "Cancelar Servicio",
    input: "date",
    inputLabel: "Fecha de Cancelación",
    showCancelButton: true,
    confirmButtonText: "Cancelar Servicio",
    showLoaderOnConfirm: true,
    preConfirm: async (date) => {
      await router.post(route("set.states"), {
        service: props.service.id,
        state: "CANCELADA",
        date: date,
        terminated: true,
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      toast("success", "Reserva Cancelada");
    }
  });
};

const setState = (state, terminated) => {
  Swal.fire({
    title: state,
    text: "Estas seguro de realizar esta acción?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: state,
        text: "Esta reserva ha sido " + state + ".",
        icon: "success",
      });

      router.post(
        route("set.states"),
        {
          service: props.service.id,
          state: state,
          terminated: terminated,
        },
        {
          onSuccess: () => {
            toast("success", "Reserva " + state);
          },
        }
      );
    }
  });
};

const dateChange = () => {
  Swal.fire({
    title: "Cambio de Fecha",
    input: "date",
    inputLabel: "Nueva Fecha",
    showCancelButton: true,
    confirmButtonText: "Cambiar Fecha",
    showLoaderOnConfirm: true,
    preConfirm: async (date) => {
      await router.post(route("set.states"), {
        service: props.service.id,
        state: "CAMBIO DE FECHA",
        date: date,
        terminated: false,
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      toast("success", "Fecha Cambiada");
    }
  });
};

const formatDate = (date) => {
  if (date == undefined || date == null) {
    return "Sin definir";
  } else {
    var fecha = new Date(
      new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60000
    ).toLocaleString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return fecha == "30/11/2" ? "INDEFINIDO" : fecha;
  }
};

const sendReubicar = () => {
  if (!current_proveedors.value || !formReu.new_id || !formReu.value) {
    toast("error", "Rellene todos los Campos");
    return 0;
  }
  formReu.current_id = current_proveedors.value.proveedor_id;
  formReu.state = "REUBICADO";
  formReu.terminated = true;
  formReu.post(route("set.states"), {
    onSuccess: () => {
      reubicar.value = false;
      formReu.reset();
      toast("success", "Servicio REUBICADO");
    },
  });
  console.log(formReu.current_id);
};

const reubicarServicio = () => {
  formReu.reset();
  reubicar.value = true;
};
</script>

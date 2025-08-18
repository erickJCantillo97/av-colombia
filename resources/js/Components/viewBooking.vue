<template>
  <Drawer v-model:visible="show" :pt:root:class="`!bg-${statues[service.status]}-200`" header="Detalles de la actividad"
    position="right">
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
      <div v-if="service.time_service" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
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
        <strong>Telefono:</strong>
        <a target="_blank" :href="`https://wa.me/${service.cliente_phone}?text=Hola  mucho gusto yo soy Sandra la coordinadora de su actividad 
Hello, nice to talk to you  I'm Sandra the coordinator for  your activity`">{{ service.cliente_phone }}</a>
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
      <div v-if="service.user" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>{{ service.user.rol == "vendedor" ? "Vendedor" : "Usuario" }}:</strong>
        <p>{{ service.user?.name }}</p>
      </div>
      <div v-if="service.user" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Fecha de reserva:</strong>
        <p>{{ new Date(service.created_at).toLocaleDateString("es-CO") }}</p>
      </div>

      <div v-if="service.conductor" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>conductor:</strong>
        <p>{{ service.conductor }}</p>
      </div>
      <div v-if="service.placa" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>conductor:</strong>
        <p>{{ service.placa }}</p>
      </div>
      <div v-if="service.total_pago_proveedor" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Valor del Servicio:</strong>
        <p>{{ COP.format(service.total_pago_proveedor) }}</p>
      </div>
      <div v-if="service.fecha_cancelacion" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Fecha de Cancelación:</strong>
        <p>
          {{
            new Date(
              new Date(service.fecha_cancelacion).setDate(
                new Date(service.fecha_cancelacion).getDate() + 1
              )
            ).toLocaleDateString("es-CO", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })
          }}
        </p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Saldo:</strong>
        <p>{{ COP.format(service.saldo) }}</p>
      </div>
      <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <strong>Soporte:</strong>
        <a target="_blank" :href="service.file">Ver Archivo</a>
      </div>
      <div class="flex flex-col border py-1 bg-white/30 rounded-md px-2">
        <strong>Observacion:</strong>
        <p>{{ service.observations }}</p>
      </div>

      <div class="text-lg flex w-full justify-between items-center mt-2 ">
        <p class="font-bold">Proveedores</p>
        <p class="rounded-full bg-green-800 text-white px-1.5 py-0.5 text-xs fles items-center justify-center">
          {{ service.proveedors.length }}
        </p>
      </div>
      <div v-for="proveedor in service.proveedors" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <p>
          {{ proveedor.proveedor.proveedor.nombre }}
        </p>
        <p>
          {{ COP.format(proveedor.cost) }}
        </p>
      </div>
      <div class="text-lg flex w-full justify-between items-center mt-2">
        <p class="font-bold">Extras</p>
        <p class="rounded-full bg-sky-800 text-white px-1.5 py-0.5 text-xs flex items-center justify-center">
          {{ service.extras.length }}
        </p>
      </div>
      <div v-for="extra in service.extras" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
        <p>
          {{ extra.cantidad }} {{ extra.description }}
        </p>
        <p class="font-semibold">
          {{ COP.format(extra.total_price) }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex flex-col items-center" v-if="hasRole(['admin', 'superadmin'])">
        <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
          <Button @click="setState('reservado', true)" icon="fa-solid fa-circle-check" v-tooltip.top="'Reservada'"
            severity="info" />
          <Button @click="showNoShow = true" icon="fa-solid fa-eye-slash" v-tooltip.top="'Servicio No show'"
            class="!text-white !bg-yellow-600" />
          <Button @click="dateChange()" icon="fa-solid fa-calendar-week" v-tooltip.top="'Cambio de Fecha'"
            class="!bg-gray-600 !text-white" />
          <Button @click="reubicarServicio()" icon="fa-solid fa-people-arrows" v-tooltip.top="'Cambio de proveedor'"
            severity="warn" />
          <Button @click="cancelarServicio()" icon="fa-solid fa-xmark-circle" v-tooltip.top="'Cancelar Servicio'"
            severity="danger" />
          <Button @click="setState('PROBLEMATICA', false)" icon="fa-solid fa-person-dress-burst"
            v-tooltip.top="'Servicio Problematico'" class="flex-auto" severity="danger" />
        </div>
      </div>
      <!-- <div v-else class="flex items-center w-full justify-center">
        <div class="bg-black text-white rounded-lg p-4 uppercase shadow-2xl">
          Reserva {{ service.status }}
        </div>
      </div> -->
    </template>
  </Drawer>

  <Modal v-model="reubicar" title="Cambio de proveedor" close-on-escape>
    <div class="flex flex-col gap-y-2">
      <span class="flex flex-col gap-y-1">
        <label for="" class="font-bold"> Proveedor Actual</label>
        <Select placeholder="Proveedor Actual" :options="service.proveedors" label="Proveedor Actual"
          v-model="current_proveedors" option-label="proveedor.name">
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
      <Input option-label="nombre" type="dropdown" label="Nuevo Proveedor" v-model="formReu.new_id"
        :options="proveedors"></Input>
      <Input label="Valor" v-model="formReu.value" type="number" mode="currency"></Input>
      <Input label="Nota" v-model="formReu.note" type="textarea" mode="currency"></Input>

      <div class="flex justify-end gap-2">
        <Button @click="reubicar = false" label="Cancelar" severity="danger" icon="fa-solid fa-xmark" />
        <Button @click="sendReubicar()" label="Guardar" severity="success" icon="fa-solid fa-save" />
      </div>
    </div>
  </Modal>
  <ServiceCancel v-model="showCancel" v-model:view="show" :service="service" v-if="showCancel" />
  <ServiceNoShow v-model="showNoShow" :service="service" v-if="showNoShow" />
</template>

<script setup>
import Swal from "sweetalert2";
import { router, useForm } from "@inertiajs/vue3";
import { alerts } from "@/composable/toasts";
import { ref } from "vue";
import Modal from "./Customs/Modal.vue";
import Input from "./Customs/Input.vue";
import ServiceCancel from "./ServiceCancel.vue";
import ServiceNoShow from "./ServiceNoShow.vue";
import Service from "@/Models/Services/Service";
import { usePermissions } from '@/composable/Auth.js';

const { hasRole } = usePermissions();
const serviceModel = new Service();
const { toast } = alerts();
const props = defineProps({
  service: Object,
});

const current_proveedors = ref(null);
const show = defineModel();
const showCancel = ref(false);
const showNoShow = ref(false);
const reubicar = ref(false);
const formReu = useForm({
  service: props.service.id,
  current_id: "",
  new_id: "",
  state: "REUBICAR",
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
  showCancel.value = true;
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
        route("set.states.booking"),
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
    html: `<input type="date" id="swal-date" class="w-full rounded-md text-center">`,
    showCancelButton: true,
    confirmButtonText: "Cambiar Fecha",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      const date = document.getElementById('swal-date').value;
      if (!date) {
        Swal.showValidationMessage('Debes seleccionar una fecha');
        return false;
      }
      await router.post(route("set.states.booking"), {
        service: props.service.id,
        state: "CAMBIO DE FECHA",
        date: date,
        terminated: false,
      });
      return date;
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
  formReu.current_id = current_proveedors.value.id;
  formReu.service = props.service.id;
  formReu.state = "REUBICADO";
  formReu.terminated = false;
  formReu.post(route("set.states.booking"), {
    onSuccess: () => {
      reubicar.value = false;
      formReu.reset();
      toast("success", "Servicio REUBICADO");
    },
  });
};

const statues = {
  reservado: "blue",
  "CAMBIO DE FECHA": "gray",
  "NO SHOW": "amber",
  REUBICADO: "orange",
  CANCELADA: "green",
};

const proveedors = ref([]);

const getProveedorsByService = async () => {

  proveedors.value = await serviceModel.getProveedorsByService(props.service.service_id);

};



const reubicarServicio = () => {
  formReu.reset();
  reubicar.value = true;
  getProveedorsByService();
};
</script>

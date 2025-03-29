<template>
  <AppLayout title="Services">
    <div class="h-[90vh] md:h-[99vh] overflow-y-auto">
      <Datatable
        :add="hasPermissionTo('crear experiencas') ? add : null"
        :columnas="columns"
        :data="services"
        routecreate="services.create"
        :actions="buttons"
        title="Servicios"
      >
      </Datatable>
    </div>
  </AppLayout>

  <Modal v-model:visible="visible">
    <template #title>
      <span class="text-xl font-bold white-space-nowrap"> Modificar Servicio</span>
    </template>
    <template #icon>
      <i class="fa-solid fa-plus" />
    </template>
    <h3 class="text-2xl font-bold my-4">
      Agregar Tarifa a <strong>{{ service.title }}</strong>
    </h3>
    <div class="flex justify-between w-full my-4 text-lg px-8">
      <div>
        <label for="" class="font-bold">Tarifa Neta a Pagar AV</label>
        <div class="text-gray-500 text-center">
          {{ COP.format(service.adults_price) }}
        </div>
      </div>
      <div>
        <label for="" class="font-bold">Tarifa Maxima a Cobrar</label>
        <div class="text-gray-500 text-center">-</div>
      </div>
    </div>
    <Input
      label="Tarifa para Adultos"
      type="number"
      currency="COP"
      :minFractionDigits="2"
      :maxFractionDigits="2"
      v-model="form.adult_tarifa"
    />
    <div class="italic text-xs mt-1 mb-4">
      La tariafa Base es de {{ COP.format(service.adults_price) }}
    </div>
    <Input
      label="Tarifa para niños"
      type="number"
      currency="COP"
      :minFractionDigits="2"
      :maxFractionDigits="2"
      v-model="form.boys_tarifa"
    />
    <span class="italic text-xs mt-1">
      La tariafa Base es de {{ COP.format(service.boys_price) }}
    </span>
    <template #footer>
      <Button
        @click="submit"
        title="Save"
        severity="success"
        label="Save"
        outlined
        icon="fa-solid fa-save"
        class="!h-8"
      />
      <Button
        @click="visible = false"
        title="Cancel"
        severity="danger"
        label="Cancel"
        outlined
        icon="fa-solid fa-times"
        class="!h-8"
      />
    </template>
  </Modal>
  <Modal v-model:visible="lock">
    <template #title>
      <span class="text-xl font-bold white-space-nowrap"> Bloqueos</span>
    </template>
    <template #icon>
      <i class="fa-solid fa-lock" />
    </template>
    <h3 class="text-2xl text-center text-amber-600 font-bold my-4">
      Bloqueos del Servicio <strong>{{ service.title }}</strong>
    </h3>

    <div v-if="service.locks.length == 0" class="text-center text-gray-500">
      No hay bloqueos
    </div>
    <div v-else class="flex flex-col gap-y-2">
      <div class="flex justify-between font-bold">
        <p>Razón</p>
        <p>Fecha Inicio</p>
        <p>Fecha Fin</p>
        <p>Quitar</p>
      </div>
      <div class="flex justify-between border-b" v-for="lock in service.locks">
        <p>
          {{ lock.description }}
        </p>
        <p>
          {{ lock.start_date }}
        </p>
        <p>
          {{ lock.end_date }}
        </p>
        <p>
          <Button
            icon="fa-solid fa-xmark-circle"
            @click="unlock(lock.id)"
            v-tooltip="'Quitar Bloqueo'"
            text
            severity="danger"
          />
        </p>
      </div>
    </div>

    <div class="flex justify-between gap-x-2 my-2">
      <div class="w-full">
        <Input
          label="Razón del Bloqueo"
          v-model="formLock.description"
          :error-message="formLock.errors.description"
        />
      </div>
      <div class="w-full">
        <label for="" class="font-bold"
          >Seleccione el Rango de bloque o del servicio</label
        >
        <div class="flex items-center gap-x-2">
          <VueDatePicker
            v-model="formLock.start_date"
            hide-offset-dates
            :teleport="true"
            auto-apply
            :enable-time-picker="false"
            timezone="America/Bogota"
          ></VueDatePicker>
          <i class="fa-solid fa-minus"></i>
          <VueDatePicker
            v-model="formLock.end_date"
            :min-date="formLock.start_date"
            hide-offset-dates
            :teleport="true"
            auto-apply
            :enable-time-picker="false"
            timezone="America/Bogota"
          >
          </VueDatePicker>
        </div>
        <span class="text-xs text-red-500">{{ formLock.errors.start_date }}</span>
      </div>
    </div>

    <template #footer>
      <Button
        @click="locked"
        title="Save"
        severity="success"
        label="Save"
        outlined
        icon="fa-solid fa-save"
        class="!h-8"
      />
      <Button
        @click="lock = false"
        title="Cancel"
        severity="danger"
        label="Cancel"
        outlined
        icon="fa-solid fa-times"
        class="!h-8"
      />
    </template>
  </Modal>
  <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Datatable from "@/Components/Customs/Datatable.vue";
import { Link, router, useForm, usePage } from "@inertiajs/vue3";
import ConfirmPopup from "primevue/confirmpopup";
import Modal from "@/Components/Customs/Modal.vue";
import { ref } from "vue";
import Input from "@/Components/Customs/Input.vue";
import { useConfirm } from "primevue/useconfirm";
import { alerts } from "@/composable/toasts";
import { usePermissions } from "@/composable/Auth";

const { hasPermissionTo } = usePermissions();
const { toast } = alerts();
const files = ref([]);
const add = {
  action: () => {
    router.visit(route("services.create"));
  },
};

const formLock = useForm({
  start_date: "",
  end_date: "",
  description: "",
});

const lock = ref(false);

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const columns = [
  {
    header: "Nombre",
    field: "title",
    filter: true,
  },
  {
    header: "Tarifa Neta",
    field: "adult_tarifa",
    type: "currency",
  },
  {
    header: "Tipo de Servicio",
    field: "type",
    filter: true,
  },
  {
    header: "Ciudad",
    field: "city",
    filter: true,
  },
  {
    header: "Descripción",
    field: "description",
    type: "html",
    filter: true,
  },
];

const confirm = useConfirm();
const editor = ref(false);

const form = useForm({
  service_id: "",
  adult_tarifa: 0,
  boys_tarifa: 0,
});

const service = ref({});

const visible = ref(false);
const subject = ref("");
const buttons = [
  {
    action: (data) => {
      router.visit(route("services.show", data.slug));
    },

    severity: "primary",
    icon: "fa-solid fa-eye text-sm",
    label: "Ver",
  },
  {
    action: (data) => {
      lock.value = true;
      formLock.reset();
      service.value = data;
    },
    show: usePage().props.auth.user.rol == "admin",
    severity: "warn",
    icon: "fa-solid fa-lock",
    label: "Bloqueos",
  },
  {
    action: (data) => {
      if (
        usePage().props.auth.user.rol == "admin" ||
        usePage().props.auth.user.rol == "superadmin"
      ) {
        router.visit(route("services.edit", data.slug));
      } else {
        visible.value = true;
        service.value = data;
        form.service_id = data.id;
        form.adult_tarifa = data.adult_tarifa;
        form.boys_tarifa = data.boy_tarifa;
      }
    },
    severity: "info",
    icon: "fa-solid fa-pencil text-sm",
  },
  {
    action: (data, event) => {
      confirm.require({
        target: event.currentTarget,
        message: "Seguro de Eliminar el Servicio " + data.title + "?",
        icon: "fa-solid fa-exclamation-triangle",
        rejectClass: "p-button-secondary p-button-outlined p-button-sm",
        acceptClass: "p-button-sm p-button-danger",
        rejectLabel: "Cancelar",
        acceptLabel: "Eliminar",
        accept: () => {
          console.log(data);
          router.delete(route("services.destroy", data.id), {
            onSuccess: () => {
              toast("success", "Servicio eliminado con exito");
            },
          });
        },
      });
    },
    show: hasPermissionTo("eliminar experiencas"),
    severity: "danger",
    icon: "fa-regular fa-trash-can text-sm",
  },
  // { event: 'deleteClic', severity: 'danger', icon: 'fa-regular fa-trash-can', class: '!h-8', text: true, outlined: false, rounded: false, show: hasPermission('projects delete') },
];

const props = defineProps({
  services: Array,
});

const submit = () => {
  form.post(route("custom.product"), {
    onSuccess: () => {
      toast("success", "Tarifa creada con exito");
      visible.value = false;
    },
  });
};

const locked = () => {
  if (formLock.description == "") {
    formLock.errors.description = "Ingrese una descripción";
    return;
  }
  if (formLock.start_date == "" || formLock.end_date == "") {
    formLock.errors.start_date = "Seleccione un rango de fechas";
    return;
  }

  router.post(
    route("services.lock", service.value.slug),
    {
      start_date: formLock.start_date,
      description: formLock.description,
      end_date: formLock.end_date,
    },
    {
      onSuccess: () => {
        toast("success", "Servicio Bloqueado con exito");
        lock.value = false;
        formLock.reset();
      },
    }
  );
};

const unlock = (id) => {
  router.post(
    route("services.unlock", id),
    {},
    {
      onSuccess: () => {
        toast("success", "Bloque Quitado Exitosamente");
        // lock.value = false
      },
    }
  );
};
</script>

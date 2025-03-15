<template>
  <div class="h-[99vh]">
    <Datatable
      :columnas="columns"
      :add
      :data="users"
      routecreate="services.create"
      :actions="buttons"
    >
    </Datatable>
  </div>

  <Modal v-model:visible="visible" width="90vw">
    <template #title>
      <span class="text-xl font-bold white-space-nowrap"> Agregar Usuario</span>
    </template>
    <template #icon>
      <i class="fa-solid fa-plus" />
    </template>
    <div class="flex gap-x-3 py-2">
      <div class="space-y-3 w-full shadow-lg p-2 rounded-md">
        <h3 class="text-center font-semibold text-lg">Datos del usuario</h3>
        <Input label="Nombre" v-model="form.name" :error-message="form.errors.name" />
        <Input label="Email" v-model="form.email" />

        <Input label="Contraseña" type="password" v-model="form.password" />
        <Input
          label="Confirmar contraseña"
          type="password"
          v-model="form.password_confirmation"
        />
      </div>
      <div class="w-full shadow-md rounded-md p-2">
        <h3 class="text-center font-semibold text-lg">Permisos</h3>
        <Input class="my-1" v-model="search"></Input>
        <div class="grid grid-cols-3 gap-2">
          <span
            class="p-1 rounded-md cursor-pointer border border-black bg-gray-100 text-center uppercase hover:bg-black hover:text-white"
            v-for="permiso in filterPermissions"
            >{{ permiso.name }}</span
          >
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        @click="submit"
        title="Guardar"
        severity="success"
        label="Guardar"
        outlined
        icon="fa-solid fa-save"
        class="!h-8"
      />
      <Button
        @click="visible = false"
        title="Cancel"
        severity="danger"
        label="Cancelar"
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
import { Link, router, useForm } from "@inertiajs/vue3";
import ConfirmPopup from "primevue/confirmpopup";
import Modal from "@/Components/Customs/Modal.vue";
import { computed, ref } from "vue";
import Input from "@/Components/Customs/Input.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const columns = [
  {
    header: "Nombre",
    field: "name",
    filter: true,
  },
  {
    header: "Correo",
    field: "email",
    filter: true,
  },
  {
    header: "Creación",
    field: "created_at",
    type: "datetime",
    filter: true,
  },
  {
    header: "URL Portafolio",
    field: "url",
  },
];

const toast = useToast();

const confirm = useConfirm();

const editor = ref(false);

const search = ref();

const filterPermissions = computed(() => {
  return props.permisos.filter((x) => !search.value || x.name.includes(search.value));
});

const form = useForm({
  id: null,
  name: "",
  email: "",
  password: "",
  rol: "",
  password_confirmation: "",
});

const visible = ref(false);

const add = {
  action: () => {
    form.reset();
    editor.value = false;
    visible.value = true;
  },
};

const buttons = [
  {
    action: (data) => {
      form.reset();
      visible.value = true;
      editor.value = true;
      form.name = data.name;
      form.email = data.email;
      console.log(data.rol);
      form.rol = data.rol;
      form.id = data.id;
    },
    severity: "secondary",
    icon: "fa-solid fa-pencil text-sm",
  },
  {
    action: (data, event) => {
      confirm.require({
        target: event.currentTarget,
        message: "Seguro de Eliminar el Usuario " + data.name + "?",
        icon: "fa-solid fa-exclamation-triangle",
        rejectClass: "p-button-secondary p-button-outlined p-button-sm",
        acceptClass: "p-button-sm p-button-danger",
        rejectLabel: "Cancelar",
        acceptLabel: "Eliminar",
        accept: () => {
          router.delete(route("users.destroy", data.id), {
            onSuccess: () => {
              toast.add({
                severity: "error",
                icon: "fa-solid fa-trash-can",
                summary: "¡Accion realizada!",
                detail: "Usuario eliminado con exito",
                group: "customTooltipDataTable",
                life: 5000,
              });
            },
          });
        },
      });
    },
    severity: "danger",
    icon: "fa-regular fa-trash-can text-sm",
  },
  // { event: 'deleteClic', severity: 'danger', icon: 'fa-regular fa-trash-can', class: '!h-8', text: true, outlined: false, rounded: false, show: hasPermission('projects delete') },
];

const props = defineProps({
  users: Array,
  permisos: Array,
});

const submit = () => {
  if (editor.value) {
    form.put(route("users.update", form.id), {
      onSuccess: () => {
        visible.value = false;
      },
    });
  } else {
    form.post(route("users.store"), {
      onSuccess: () => {
        visible.value = false;
      },
    });
  }
};
</script>

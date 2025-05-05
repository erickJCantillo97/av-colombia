<template>
  <div class="h-[99vh]">
    <div class="flex justify-center w-full gap-x-3 py-2">
      <span
        v-for="type in usersType"
        class="bg-black p-1 rounded-md cursor-pointer text-center uppercase hover:text-black font-bold"
        :class="[
          `bg-${type.color}-200 p-2 rounded-lg`,
          typeSelected == type.value
            ? 'border-2 border-gray-500 scale-105'
            : 'border-2 border-transparent scale-95',
        ]"
        @click="typeSelected = type.value"
        >{{ type.label }}</span
      >
    </div>
    <Datatable
      :columnas="filterColumns"
      :add
      :data
      routecreate="services.create"
      :actions="buttons"
    >
    </Datatable>
  </div>

  <Modal v-model:visible="visible" width="90vw" close-on-escape>
    <template #title>
      <span class="text-xl font-bold white-space-nowrap"> Agregar Usuario</span>
    </template>
    <template #icon>
      <i class="fa-solid fa-plus" />
    </template>
    <div class="flex gap-x-3 py-2">
      <div class="grid grid-cols-2 w-full shadow-2xl border rounded-md gap-2 p-4">
        <Input
          label="Tipo de Usuario"
          v-model="form.rol"
          @value-change="selectedRol"
          type="dropdown"
          option-value="value"
          option-label="label"
          :options="roles"
        />
        <Input label="Nombre" v-model="form.name" :error-message="form.errors.name" />
        <Input label="Email" v-model="form.email" />

        <Input label="Contraseña" type="password" v-model="form.password" />
        <Input
          label="Confirmar contraseña"
          type="password"
          v-model="form.password_confirmation"
        />
        <Input label="Telefono" v-model="form.phone" />
        <div class="flex flex-col" v-if="form.rol == 'vendedor'">
          <div class="rounded-md border border-gray-100 bg-white p-4 shadow-md">
            <label for="upload" class="flex flex-col items-center gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 fill-white stroke-indigo-500"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span class="text-gray-600 font-medium text-sm truncate w-full">
                {{ form.camara ? form.camara.name : "Seleccionar Camara de Comercio" }}
              </span>
            </label>
            <input
              id="upload"
              accept=".pdf"
              @change="subirCamara"
              type="file"
              class="hidden"
            />
          </div>
        </div>
        <div class="flex flex-col" v-if="form.rol == 'vendedor'">
          <div class="rounded-md border border-gray-100 bg-white p-4 shadow-md">
            <label
              for="uploadRut"
              class="flex flex-col items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 fill-white stroke-indigo-500"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span class="text-gray-600 font-medium text-sm truncate w-full text-center">
                {{ form.rut ? form.rut.name : "Seleccionar Rut" }}
              </span>
            </label>
            <input
              id="uploadRut"
              accept=".pdf"
              @change="subirRut"
              type="file"
              class="hidden"
            />
          </div>
        </div>
        <div class="flex flex-col" v-if="form.rol == 'vendedor'">
          <div class="rounded-md border border-gray-100 bg-white p-4 shadow-md">
            <label
              for="uploadCuenta"
              class="flex flex-col items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 fill-white stroke-indigo-500"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span class="text-gray-600 font-medium text-sm truncate w-full text-center">
                {{
                  form.cuenta
                    ? form.cuenta.name
                    : "Seleccionar Certificado de Cuenta Bancari"
                }}
              </span>
            </label>
            <input
              id="uploadCuenta"
              accept=".pdf"
              @change="subirCuenta"
              type="file"
              class="hidden"
            />
          </div>
        </div>

        <div
          class="w-full flex flex-col justify-center items-center"
          v-if="form.rol == 'vendedor'"
        >
          <a target="_blank" :href="form.url">
            <qrcode-vue :value="form.url" :size="150" level="H" render-as="svg" />
          </a>
        </div>
      </div>
      <div class="w-full shadow-2xl border rounded-md gap-2 p-4">
        <h3 class="text-center font-semibold text-lg">Permisos</h3>
        <Input class="my-1" v-model="search"></Input>
        <div class="grid grid-cols-3 gap-2">
          <span
            @click="selectPermmision(permiso.name)"
            :class="{
              'bg-black text-white': form.permissions.includes(permiso.name),
              'bg-gray-100': !form.permissions.includes(permiso.name),
            }"
            class="p-1 rounded-md cursor-pointer border border-black text-center uppercase hover:bg-black hover:text-white"
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
import Datatable from "@/Components/Customs/Datatable.vue";
import { Link, router, useForm } from "@inertiajs/vue3";
import ConfirmPopup from "primevue/confirmpopup";
import Modal from "@/Components/Customs/Modal.vue";
import { computed, ref } from "vue";
import Input from "@/Components/Customs/Input.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import QrcodeVue from "qrcode.vue";

const usersType = [
  { label: "Usuarios AV Colombia", value: "av", color: "green" },
  { label: "Vendedores", value: "vendedor", color: "blue" },
  { label: "Proveedores", value: "proveedor", color: "yellow" },
  { label: "Hoteles", value: "Hotel", color: "orange" },
  { label: "Agencias", value: "agencia", color: "gray" },
];

const typeSelected = ref("vendedor");

const columns = ref([
  {
    header: "Nombre",
    field: "name",
    filter: true,
  },
  {
    header: "Tipo de Usuario",
    field: "rol",
    filter: true,
  },
  {
    header: "Correo",
    field: "email",
    filter: true,
  },
  {
    header: "Telefono",
    field: "phone",
    filter: true,
  },
  {
    header: "Cuenta Bancaria",
    field: "cuenta",
    filter: true,
    type: "html-custom",
    renderer: (row) => {
      if (row.cuenta == "/laravel/public/") return "No tiene Certificado";
      return `<a href="${row.cuenta}" class="text-sky-600 underline" target="_blank">Ver</a>`;
    },
  },
  {
    header: "RUT",
    field: "rut",
    filter: true,
    type: "html-custom",
    renderer: (row) => {
      if (row.rut == "/laravel/public/") return "No tiene RUT";
      return `<a href="${row.rut}" class="text-sky-600 underline" target="_blank">Ver</a>`;
    },
  },
  {
    header: "camara de comercio",
    field: "camara_comercio",
    filter: true,
    type: "html-custom",
    renderer: (row) => {
      if (row.camara_comercio == "/laravel/public/") return "No tiene camara comercio";
      return `<a href="${row.camara_comercio}" class="text-sky-600 underline" target="_blank">Ver</a>`;
    },
  },
  {
    header: "URL Portafolio",
    field: "url",
  },
]);

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
  phone: "",
  email: "",
  password: "",
  url: "",
  rol: "",
  password_confirmation: "",
  permissions: [],
  camara: null,
  rut: null,
  cuenta: null,
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
      form.rol = data.rol;
      form.id = data.id;
      form.url = data.url;
      form.permissions = data.permissions.map((x) => x.name);
      form.phone = data.phone;
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
  let formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("password_confirmation", form.password_confirmation);
  formData.append("phone", form.phone);
  formData.append("rol", form.rol);
  formData.append("permissions", form.permissions);
  formData.append("camara", form.camara);
  formData.append("rut", form.rut);
  formData.append("cuenta", form.cuenta);
  if (editor.value) {
    router.post(route("users.update", form.id), formData, {
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

const roles = [
  { label: "Super Administrador", value: "superadmin" },
  { label: "Administrador", value: "admin" },
  { label: "Cordinador", value: "cordinador" },
  { label: "Vendedor", value: "vendedor" },
  { label: "Proveedor", value: "proveedor" },
  { label: "Hotel", value: "Hotel" },
  { label: "Agencia", value: "agencia" },
];

function selectedRol() {
  if (form.rol == "superadmin") {
    form.permissions = props.permisos.map((x) => x.name);
  } else if (form.rol == "admin") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return !(x.includes("usuarios") || x.includes("pagos") || x.includes("entradas"));
      })
      .map((x) => x.name);
  } else if (form.rol == "cordinador") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  } else if (form.rol == "vendedor") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  } else if (form.rol == "proveedor") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  } else if (form.rol == "hotel") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  } else if (form.rol == "agencia") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  }
}

function selectPermmision(permiso) {
  if (form.permissions.includes(permiso)) {
    form.permissions = form.permissions.filter((x) => x != permiso);
  } else {
    form.permissions.push(permiso);
  }
}

const data = computed(() => {
  if (typeSelected.value == "av") {
    return props.users.filter(
      (user) =>
        user.rol == "superadmin" || user.rol == "admin" || user.rol == "cordinador"
    );
  }
  return props.users.filter((user) => user.rol == typeSelected.value);
});

const filterColumns = computed(() => {
  if (typeSelected.value == "av") {
    return columns.value.filter(
      (x) =>
        x.field != "camara_comercio" &&
        x.field != "rut" &&
        x.field != "cuenta" &&
        x.field != "url"
    );
  }
  return columns.value;
});

const subirCamara = (e) => {
  form.camara = e.target.files[0];
};
const subirRut = (e) => {
  form.rut = e.target.files[0];
};
const subirCuenta = (e) => {
  form.cuenta = e.target.files[0];
};
</script>

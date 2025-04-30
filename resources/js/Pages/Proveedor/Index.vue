<template>
  <AppLayout>
    <Datatable :data="proveedores" :actions="buttons" :columnas :add title="proveedores">
    </Datatable>
  </AppLayout>
  <Modal
    v-model:visible="visible"
    close-on-escape="true"
    title="Añadir Proveedor"
    width="80vw"
  >
    <div class="flex gap-4">
      <div class="flex flex-col w-1/3 gap-y-4">
        <h1
          class="text-2xl font-mono font-semibold text-center bg-black rounded-t-lg text-white gap-x-3 p-2"
        >
          Datos del Proveedor
        </h1>
        <Input label="Nombre" class="w-full" v-model="form.nombre" />
        <!-- <Input label="Direccion" v-model="form.direccion" /> -->
        <Input label="NIT" class="w-full" v-model="form.nit" />
        <Input label="Telefono" class="w-full" v-model="form.telefono" />
        <div class="flex flex-wrap gap-4 w-full justify-between">
          <label for="">Politicas</label>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="politicas"
              inputId="Dinero"
              name="Dinero"
              value="Dinero"
            />
            <label for="Dinero">Dinero</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="politicas"
              inputId="Porcentaje"
              name="Porcentaje"
              value="Porcentaje"
              size="Normal"
            />
            <label for="Porcentaje" class="text-sm">Porcentaje</label>
          </div>
        </div>
        <Input
          label="Penalización por NO SHOW"
          type="number"
          v-model="form.penalidad_no_show"
          :mode="politicas == 'Dinero' ? 'currency' : 'decimal'"
          :suffix="politicas == 'Dinero' ? '' : '%'"
          min="0"
          :max="politicas == 'Dinero' ? 100000 : 100"
          :step="0.25"
          :minFractionDigits="0"
          :max-fraction-digits="2"
        ></Input>
        <Input
          label="Penalización por CANCELACIÓN"
          type="number"
          v-model="form.penalidad_cancelacion"
          :mode="politicas == 'Dinero' ? 'currency' : 'decimal'"
          :suffix="politicas == 'Dinero' ? '' : '%'"
          min="0"
          :max="politicas == 'Dinero' ? 100000 : 100"
          :step="0.25"
          :minFractionDigits="0"
          :max-fraction-digits="2"
        ></Input>
      </div>
      <div
        class="w-2/3 col-sapn-1 md:col-span-3 border rounded-lg "
        v-if="
          $page.props.auth.user.rol == 'admin' ||
          $page.props.auth.user.rol == 'superadmin'
        "
      >
        <h1
          class="text-2xl font-mono font-semibold text-center bg-black rounded-t-lg text-white gap-x-3 p-2"
        >
          Servicios
          <Button
            icon="fa-solid fa-plus"
            outlined=""
            severity="success"
            class="size-6"
            @click="addService()"
          />
        </h1>
        <div class="grid grid-cols-8 w-full font-bold px-2 text-left ">
          <div class="col-span-3 w-full">Servicio</div>
          <div class="col-span-2">Concepto</div>
          <div class="">Tarifa</div>
          <div class=""></div>
        </div>
        <div class="h-[50vh] overflow-y-auto">
          <div
            v-for="(p, index) in form.services"
            class="justify-between w-full px-2 gap-x-2 grid grid-cols-8"
          >
            <Input
              type="dropdown"
              class="col-span-3"
              v-model="p.service_id"
              option-label="title"
              option-value="id"
              :options="services"
            ></Input>
            <Input class="w-full col-span-2" v-model="p.concept"></Input>
            <input type="number"  class="w-full rounded-md h-10 col-span-2" v-model="p.value"></input>
            <Button
              icon="fa-solid fa-xmark-circle"
              class="w-full"
              v-tooltip="`Quitar`"
              text
              severity="danger"
              @click="removeService(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-x-2">
        <Button severity="success" label="Guardar" @click="submit"></Button>
        <Button severity="danger" label="Cancelar" @click="visible = false"></Button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import Input from "@/Components/Customs/Input.vue";
import Modal from "@/Components/Customs/Modal.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { useForm } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";
import { alerts } from "@/composable/toasts";
import Swal from "sweetalert2";
import CustomUpload from "@/Components/CustomUpload.vue";
import Service from "@/Models/Services/Service";

const { toast } = alerts();
const services = ref([]);


const serviceModel = new Service();
onMounted(async () => {
  services.value = await serviceModel.getServices();
});
const visible = ref(false);
const add = {
  action: () => {
    visible.value = true;
    form.reset();
  },
};

const politicas = ref("Dinero");

const buttons = [
  {
    action: (data) => {
      visible.value = true;
      form.services = data.services.map((x) => x.pivot);
      form.id = data.id;
      form.nit = data.nit;
      form.nombre = data.nombre;
      form.penalidad_no_show = data.penalidad_no_show;
      form.penalidad_cancelacion = data.penalidad_cancelacion;
      politicas.value = data.type_penalidad_cost;
      form.direccion = data.direccion;
      form.telefono = data.telefono;
    },
    severity: "info",
    icon: "fa-solid fa-pencil text-sm",
  },
  {
    action: (data) => {
      Swal.fire({
        title: "Eliminar Proveedor",
        text: "Estas seguro de eliminar este proveedor?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.isConfirmed) {
          form.delete(route("proveedors.destroy", data.id), {
            onSuccess: () => {
              toast("error", "Proveedor Eliminado");
            },
          });
        }
      });
    },
    severity: "danger",
    icon: "fa-solid fa-trash text-sm",
  },
];

const props = defineProps({
  proveedores: Array,
});

const columnas = [
  {
    field: "nombre",
    header: "Nombre",
    filter: true,
  },
  {
    field: "nit",
    header: "NIT",
    filter: true,
  },

  {
    field: "telefono",
    header: "Telefono",
    filter: true,
  },
];



const form = useForm({
  id: null,
  nombre: "",
  direccion: "a.",
  nit: "",
  telefono: "",
  type_penalidad_cost: "",
  penalidad_no_show: '',
  penalidad_cancelacion: '',
  services: [],
});

const addService = () => {
  form.services.push({
    service_id: "",
    concepto: "",
    value: "",
  });
};

const removeService = (index) => {
  form.services.splice(index, 1);
};

const submit = () => {
  form.type_penalidad_cost = politicas.value;
  if (form.id) {
    form.put(route("proveedors.update", form.id), {
      onSuccess: () => {
        form.reset();
        visible.value = false;
        toast("success", "Proveedor Actualizado");
      },
    });
  } else {
    form.post(route("proveedors.store"), {
      onSuccess: () => {
        form.reset();
        toast("success", "Proveedor Creado");
      },
    });
  }
};
</script>

<template>
 <Modal
    v-model:visible="visible"
    :close-on-escape="true"
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
        <Input label="Número de Cuenta Bancanria" class="w-full" v-model="form.account_number" />
        <div class="flex flex-col" >
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
                  {{ form.cuenta ? form.cuenta.name : "Seleccionar Camara de Comercio" }}
                </span>
              </label>
              <input
                id="upload"
                accept=".pdf"
                @change="subirCuenta"
                type="file"
                class="hidden"
              />
            </div>
          </div>
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
import Input from "@/Components/Customs/Input.vue";
import Modal from "@/Components/Customs/Modal.vue";
import { useForm } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";
import { alerts } from "@/composable/toasts";
import Service from "@/Models/Services/Service";

const { toast } = alerts();
const services = ref([]);

const props = defineProps({
    proveedor: Object,
})
const serviceModel = new Service();
onMounted(async () => {
  services.value = await serviceModel.getServices();
  
});
const politicas = ref(props.proveedor?.type_penalidad_cost?? "Dinero");
const visible = defineModel(false);


const form = useForm({
  id: props.proveedor?.id ?? "",
  nombre: props.proveedor?.nombre ?? "",
  direccion: "a.",
  nit: props.proveedor?.nit?? "",
  telefono: props.proveedor?.telefono?? "",
  type_penalidad_cost: props.proveedor?.type_penalidad_cost?? "Dinero",
  penalidad_no_show: props.proveedor?.penalidad_no_show?? 0,
  penalidad_cancelacion: props.proveedor?.penalidad_cancelacion?? 0,
  services: props.proveedor?.services.map((x) => x.pivot)?? [],
  cuenta: null,
  account_number: props.proveedor?.account_number?? "",
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

const subirCuenta = (e) => {
  form.cuenta = e.target.files[0];
};
</script>

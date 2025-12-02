<template>
  <Modal
    v-model:visible="visible"
    :close-on-escape="true"
    width="90vw"
    :maximizable="true"
  >
    <template #header>
      <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <i class="fa-solid fa-truck-field text-white"></i>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-900">
            {{ form.id ? 'Editar Proveedor' : 'Nuevo Proveedor' }}
          </h3>
          <p class="text-xs text-gray-500">Complete la información del proveedor</p>
        </div>
      </div>
    </template>

    <div class="p-6">
      <div class="space-y-6">
        <!-- Datos del Proveedor -->
        <div>
          <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 shadow-sm">
            <div class="flex items-center gap-2 mb-6">
              <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <i class="fa-solid fa-building text-white text-sm"></i>
              </div>
              <h2 class="text-lg font-bold text-gray-900">Datos del Proveedor</h2>
            </div>

            <div class="space-y-6">
              <!-- Primera fila: Nombre y NIT -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nombre" class="w-full" v-model="form.nombre" />
                <Input label="NIT" class="w-full" v-model="form.nit" />
              </div>

              <!-- Segunda fila: Teléfono y Cuenta Bancaria -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Teléfono" class="w-full" v-model="form.telefono" />
                <Input label="Número de Cuenta Bancaria" class="w-full" v-model="form.account_number" />
              </div>

              <!-- Upload Cámara de Comercio -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 block">Cámara de Comercio</label>
                <div class="group relative">
                  <input
                    id="upload"
                    accept=".pdf"
                    @change="subirCuenta"
                    type="file"
                    class="hidden"
                  />
                  <label 
                    for="upload" 
                    class="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 bg-white"
                  >
                    <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <i class="fa-solid fa-file-pdf text-2xl text-blue-600"></i>
                    </div>
                    <div class="text-center">
                      <p class="text-sm font-medium text-gray-900 truncate max-w-full px-2">
                        {{ form.cuenta ? form.cuenta.name : "Click para seleccionar PDF" }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">PDF máximo 10MB</p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Políticas -->
              <div class="space-y-3 pt-4 border-t border-gray-200">
                <label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <i class="fa-solid fa-shield-halved text-blue-600"></i>
                  Tipo de Penalización
                </label>
                <div class="flex gap-4">
                  <div class="flex items-center gap-2 flex-1">
                    <RadioButton
                      v-model="politicas"
                      inputId="Dinero"
                      name="Dinero"
                      value="Dinero"
                    />
                    <label for="Dinero" class="text-sm font-medium text-gray-700 cursor-pointer">Dinero</label>
                  </div>
                  <div class="flex items-center gap-2 flex-1">
                    <RadioButton
                      v-model="politicas"
                      inputId="Porcentaje"
                      name="Porcentaje"
                      value="Porcentaje"
                    />
                    <label for="Porcentaje" class="text-sm font-medium text-gray-700 cursor-pointer">Porcentaje</label>
                  </div>
                </div>
              </div>

              <!-- Penalizaciones en dos columnas -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                />
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
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Servicios -->
        <div
          v-if="
            $page.props.auth.user.rol == 'admin' ||
            $page.props.auth.user.rol == 'superadmin'
          "
        >
          <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
            <!-- Header de Servicios -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <i class="fa-solid fa-list-check text-white text-sm"></i>
                </div>
                <div>
                  <h2 class="text-lg font-bold text-white">Servicios</h2>
                  <p class="text-xs text-blue-100">{{ form.services.length }} servicio(s) configurado(s)</p>
                </div>
              </div>
              <button
                @click="addService()"
                class="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <i class="fa-solid fa-plus"></i>
                Agregar Servicio
              </button>
            </div>

            <!-- Services List -->
            <div class="flex-1 overflow-y-auto max-h-[calc(60vh-140px)]">
              <!-- Empty State -->
              <div v-if="form.services.length === 0" class="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <i class="fa-solid fa-inbox text-3xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">No hay servicios</h3>
                <p class="text-sm text-gray-500 mb-4">Agrega servicios para este proveedor</p>
                <button
                  @click="addService()"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 tra  nsition-colors duration-200"
                >
                  <i class="fa-solid fa-plus"></i>
                  Agregar Primer Servicio
                </button>
              </div>

              <!-- Services Items -->
              <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                <div
                  v-for="(p, index) in form.services"
                  :key="index"
                  class="relative bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <!-- Badge de número -->
                  <div class="absolute -top-2 -left-2 w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <span class="text-white text-xs font-bold">{{ index + 1 }}</span>
                  </div>

                  <!-- Botón eliminar -->
                  <button
                    @click="removeService(index)"
                    class="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    title="Eliminar servicio"
                  >
                    <i class="fa-solid fa-xmark text-white text-xs"></i>
                  </button>

                  <div class="space-y-3">
                    <!-- Servicio -->
                    <div>
                      <label class="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                        <i class="fa-solid fa-tag text-blue-600"></i>
                        Servicio
                      </label>
                      <Input
                        type="dropdown"
                        class="w-full"
                        v-model="p.service_id"
                        option-label="title"
                        option-value="id"
                        :options="services"
                        placeholder="Seleccionar..."
                      />
                    </div>

                    <!-- Concepto -->
                    <div>
                      <label class="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                        <i class="fa-solid fa-file-lines text-green-600"></i>
                        Concepto
                      </label>
                      <Input 
                        class="w-full" 
                        v-model="p.concept"
                        placeholder="Ej: Transporte, Guía..."
                      />
                    </div>

                    <!-- Tarifa -->
                    <div>
                      <label class="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                        <i class="fa-solid fa-dollar-sign text-amber-600"></i>
                        Tarifa (COP)
                      </label>
                      <div class="relative group-tarifa">
                        <div class="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-amber-100 to-amber-50 border-r border-amber-200 rounded-l-lg flex items-center justify-center">
                          <span class="text-amber-700 font-bold text-xs">$</span>
                        </div>
                        <input 
                          type="number"  
                          class="w-full pl-12 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 font-medium text-gray-900 text-sm"
                          v-model="p.value"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Visual Divider -->
                  <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <button
          @click="visible = false"
          class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          <i class="fa-solid fa-xmark mr-2"></i>
          Cancelar
        </button>
        <button
          @click="submit"
          class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          <i class="fa-solid fa-check mr-2"></i>
          {{ form.id ? 'Actualizar' : 'Guardar' }} Proveedor
        </button>
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
  form.transform((data) => ({
    ...data,
    _method: form.id ? 'PUT' : 'POST',
  }));
  
  if (form.id) {
    form.post(route("proveedors.update", form.id), {
      forceFormData: true,
      onSuccess: () => {
        form.reset();
        visible.value = false;
        toast("success", "Proveedor Actualizado");
      },
    });
  } else {
    form.post(route("proveedors.store"), {
      forceFormData: true,
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

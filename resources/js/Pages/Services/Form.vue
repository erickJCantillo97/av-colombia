<script setup>
import Input from "@/Components/Customs/Input.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { router, useForm } from "@inertiajs/vue3";
import AutoComplete from "primevue/autocomplete";
import { onMounted, ref } from "vue";
import { alerts } from "@/composable/toasts";
import Horarios from "./Horarios.vue";
import FileSelection from "./Form/FileSelection.vue";
const { toast } = alerts();

const op = ref();
const includes = ref();
const noIncludes = ref();

const value = ref(1);



const props = defineProps({
  features: Array,
  included: Array,
  availabilities: Array,
  service: Object,
});

const feature = ref({
  name: "",
  color: "",
});


onMounted(() => {
  if (props.service) {
    assignMatchingKeys(props.service, form);
    form.includes = JSON.parse(props.service.includes);
    form.notIncludes = JSON.parse(props.service.notIncludes);
    form.puntos = JSON.parse(props.service.puntos) ?? [];
    form.recogidas = JSON.parse(props.service.recogidas) ?? [];
  }
});

const includeName = ref();
const noIncludeName = ref("");
const recogidaName = ref();
const puntosName = ref();
const addincludes = () => {
  if (!includeLabel.value) return;
  if (!form.includes) {
    form.includes = [];
  }
  if (!form.includes.includes(includeLabel.value)) {
    form.includes.push(includeLabel.value.trim());
  }
  includeLabel.value = "";
};

const addNoIncludes = () => {
  if (!form.notIncludes) {
    form.notIncludes = [];
  }
  if (!noIncludeName.value) return;
  if (!form.notIncludes.includes(noIncludeName.value)) {
    form.notIncludes.push(noIncludeName.value.trim());
  }
  noIncludeName.value = "";
};

const removeIncludes = (index) => {
  //obtener el index del elemento a eliminar y eliminarlo
  form.includes.splice(index, 1);
};

const removeNotIncludes = (index) => {
  form.notIncludes.splice(index, 1);
};

const addRecogidas = () => {
  if (!recogidaName.value) return;
  if (!form.recogidas.includes(recogidaName.value)) {
    form.recogidas.push(recogidaName.value);
  }
  recogidaName.value = "";
};

const removeRecogidas = (index) => {
  form.recogidas.splice(index, 1);
};

const addPuntos = () => {
  if (!puntosName.value) return;
  if (!form.puntos.includes(puntosName.value)) {
    form.puntos.push(puntosName.value);
  }
  puntosName.value = "";
};
const removePuntos = (index) => {
  form.puntos.splice(index, 1);
};

const form = useForm({
  title: "",
  description: "",
  features: [],
  boys_price: 0,
  adults_price: 0,
  code: "",
  images: [],
  includes: [],
  notIncludes: [],
  type: "expericence",
  city: "Cartagena",
  portada: "",
  recogida: "recogida",
  duration_type: "",
  destinations: "",
  duration: 0,
  duration_unit: "Dias",
  capacidad_min: 1,
  capacidad_max: 1,
  recogidas: [],
  puntos: [],

});

const files = ref([]);

const submit = () => {
  let included = form.includes;
  let notIncluded = form.notIncludes;
  let puntos = form.puntos;
  let recogidas = form.recogidas;
  form.images = files.value;
  form.notIncludes = JSON.stringify(form.notIncludes);
  form.includes = JSON.stringify(form.includes);
  form.recogidas = JSON.stringify(form.recogidas);
  form.puntos = JSON.stringify(form.puntos);
  if (props.service) {
    form.post(route("services.update", props.service.slug), {
      onSuccess: () => {
        toast("success", "Servicio actualizado con exito");
      },
      onError: (error) => {
        toast("error", "Error al actualizar el servicio: " + error);
      },
    });
  } else {
    form.post(route("services.store"), {
      onSuccess: (service) => {
        // form.reset();
        toast("success", "Servicio creado con exito");
        // router.visit(route('services.edit',))
      },
      onError: (error) => {
        console.log(error);
        toast("error", "Error al crear el servicio: " + Object.values(error));
      },
    });
  }
  form.includes = included;
  form.notIncludes = notIncluded;
  form.recogidas = recogidas;
  form.puntos = puntos;
};

const includeLabel = ref("");

const includeSuggestions = ref(props.included);

const search = (includes) => {
  if (includes) {
    includeSuggestions.value = props.included.filter((x) =>
      x.toLowerCase().includes(includeLabel.value.toLowerCase())
    );
  } else {
    includeSuggestions.value = props.included.filter((x) =>
      x.toLowerCase().includes(noIncludeName.value.toLowerCase())
    );
  }
};

const removeImage = (id) => {
  router.delete(route("delete.images", id), {
    onSuccess: () => {
      toast("success", "Imagen eliminada con exito");
    },
    onError: (error) => {
      toast("error", "Error al eliminar la imagen: " + error);
    },
  });
};
</script>
<template>
  <AppLayout>
    <div class="p-4 space-y-4 h-full overflow-y-auto">
      <h1 class="text-xl font-extrabold">
        {{ service ? `Editar Servicio ${service.title}` : "Crear nuevo servicio" }}
      </h1>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Datos del Servicio</Tab>
          <Tab value="4" v-if="service && form.type == 'TRANSFER'">Itinerario</Tab>
          <Tab value="1" v-if="service && form.type == 'TOUR'">Ecuentro/Recogida</Tab>
          <Tab value="2" v-if="service">Disponibilidad y precios</Tab>
          <Tab value="3" v-if="service">Fotos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div class="gap-y-4 flex flex-col">
              <div class="w-full gap-4 grid grid-cols-3">
                <Input
                  label="Tipo de Servicio"
                  class="w-full"
                  v-model="form.type"
                  :error-message="form.errors.type"
                  type="dropdown"
                  :options="['TOUR', 'TRANSFER', 'EMBARCACION', 'ALQUILER']"
                />
                <Input
                  label="Titulo"
                  class="w-full"
                  v-model="form.title"
                  :error-message="form.errors.title"
                />
                <Input
                  label="Código de Referencia"
                  class="w-full"
                  v-model="form.code"
                  :error-message="form.errors.code"
                />
                <Input
                  label="Ubicación del servicio"
                  class="w-full"
                  v-model="form.city"
                  :error-message="form.errors.city"
                  type="dropdown"
                  :options="[
                    'Cartagena',
                    'Barranquilla',
                    'Cali',
                    'Santa Marta',
                    'Medellin',
                  ]"
                />
                <div>
                  <label for="multiple-ac-2" class="font-bold block"
                    >Lugares de Visita (Destino)</label
                  >
                  <AutoComplete
                    v-model="form.destinations"
                    inputId="multiple-ac-2"
                    multiple
                    fluid
                    :typeahead="false"
                  />
                </div>
                <!-- <Input label="Lugares de Visita (Destino)" class="w-full" v-model="form.city"
                                    :error-message="form.errors.city" type="multiselect" :options="[
                                        'Cartagena',
                                        'Cali'
                                    ]" /> -->
                <Input
                  label="Duración o Validez"
                  class="w-full"
                  v-model="form.duration_type"
                  :error-message="form.errors.duration_type"
                  type="dropdown"
                  :options="[
                    'Duración Fija',
                    'Valido en fecha de Reserva',
                    'Valido durante un periodo de tiempo a partir de la fecha reservada',
                  ]"
                />
                <Input
                  v-if="form.duration_type != 'Valido en fecha de Reserva'"
                  type="number"
                  label="Valido por"
                  v-model="form.duration"
                />
                <Input
                  v-if="form.duration_type != 'Valido en fecha de Reserva'"
                  label="Unidad de tiempo"
                  class="w-full"
                  v-model="form.duration_unit"
                  :error-message="form.errors.duration_type"
                  type="dropdown"
                  :options="['Dias', 'Horas', 'Minutos']"
                />
                <Input
                  type="number"
                  label="Capacidad minima"
                  v-model="form.capacidad_min"
                />
                <Input
                  type="number"
                  label="Capacidad maxima"
                  v-model="form.capacidad_max"
                  :min="form.capacidad_min"
                />
                <Input
                  type="number"
                  label="Tarifa de Adultos para Vendedores"
                  v-model="form.adults_price"
                  mode="currency"
                />
                <Input
                  type="number"
                  label="Tarifa de Niños para Vendedores"
                  v-model="form.boys_price"
                  mode="currency"
                />

              </div>
              <div class="w-full">
                <Input
                  type="textarea"
                  label="Descripción Breve"
                  :rows-textarea="3"
                ></Input>
              </div>
              <div class="w-full">
                <label for="" class="text-md font-bold">Descripción larga del Servicio</label>
                <Input
                  type="textarea"
                  v-model="form.description"
                  :key="editor"
                  editorStyle="height: 120px"
                />
                <span class="text-xs text-red-400">{{ form.errors.description }}</span>
              </div>

              <div class="flex justify-between space-x-4 items-center">
                <div class="w-full shadow-md p-2 rounded-md">
                  <label for="" class="text-lg font-bold text-center"
                    >Incluidos en El servicio</label
                  >
                  <div class="flex space-x-2 overflow-y-auto w-full">
                    <AutoComplete
                      @complete="search(true)"
                      emptyMessage="Sin resultados"
                      :suggestions="includeSuggestions"
                      dropdown
                      @keyup.enter="addincludes"
                      v-model="includeLabel"
                      class="w-full"
                      pt:root="!w-full"
                      pt:inputText="!w-full"
                    />
                    <Button
                      title="Añadir"
                      @click="addincludes"
                      severity="primary"
                      label="Añadir"
                      icon="fa-solid fa-plus"
                      class="!h-11"
                    />
                  </div>
                  <div
                    v-for="(feature, index) in form.includes"
                    class="py-1.5 px-3 flex justify-between my-2 text-nowrap text-sm font-bold text-emerald-700 rounded-lg border-b"
                  >
                    <p>{{ index + 1 }}. {{ feature }}</p>
                    <span
                      @click="removeIncludes(index)"
                      v-tooltip="'Quitar'"
                      class="cursor-pointer"
                      ><i class="fa-solid fa-trash text-red-500"></i
                    ></span>
                  </div>
                </div>
                <div class="w-full shadow-md p-2 bg-gray-200 rounded-md">
                  <label for="" class="text-lg font-bold text-red-700"
                    >No Incluidos en El servicio</label
                  >
                  <div class="flex justify-between space-x-2">
                    <AutoComplete
                      dropdown
                      @complete="search(false)"
                      emptySearchMessage="Sin resultados"
                      :suggestions="includeSuggestions"
                      @keyup.enter="addNoIncludes"
                      v-model="noIncludeName"
                      class="w-full"
                      pt:root="!w-full"
                      pt:inputText="!w-full"
                    />
                    <Button
                      title="Añadir"
                      @click="addNoIncludes"
                      severity="primary"
                      label="Añadir"
                      icon="fa-solid fa-plus"
                      class="!h-11"
                    />
                  </div>
                  <div
                    v-for="(feature, index) in form.notIncludes"
                    class="py-1.5 px-3 flex justify-between my-2 text-nowrap text-sm font-bold text-emerald-700 rounded-lg border-b border-white"
                  >
                    <p>{{ index + 1 }}. {{ feature }}</p>
                    <span @click="removeNotIncludes(index)" class="cursor-pointer"
                      ><i class="fa-solid fa-trash text-red-500"></i
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-x-4 mt-8 justify-between">
              <Button
                @click="visible = false"
                title="Cancel"
                severity="danger"
                label="Cancel"
                icon="fa-solid fa-times"
                class="!h-9 w-full"
              />
              <Button
                @click="submit"
                title="Save"
                severity="success"
                :loading="form.processing"
                label="Guardar"
                icon="fa-solid fa-save"
                class="!h-9 w-full"
              />
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div class="m-0">
              <div
                class="w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2"
              >
                <div
                  @click="value = op.value"
                  v-for="op in options"
                  class="w-full rounded-lg text-center py-2 text-sm md:text-md cursor-pointer"
                  :class="value == op.value ? 'bg-white' : 'hover:bg-white/30'"
                >
                  {{ op.name }}
                </div>
              </div>
              <div v-if="value == 1" class="mt-4">
                <div class="w-full shadow-md p-2 rounded-md">
                  <div class="flex space-x-2 overflow-y-auto w-full">
                    <AutoComplete
                      @complete="search(true)"
                      placeholder="Describa el Lugar de Recogida"
                      emptyMessage="Sin resultados"
                      :suggestions="includeSuggestions"
                      dropdown
                      @keyup.enter="addRecogidas"
                      v-model="recogidaName"
                      class="w-full"
                      pt:root="!w-full"
                      pt:inputText="!w-full"
                    />
                    <Button
                      title="Añadir"
                      @click="addRecogidas"
                      severity="primary"
                      label="Añadir"
                      icon="fa-solid fa-plus"
                      class="!h-11"
                    />
                  </div>
                  <div
                    v-for="(feature, index) in form.recogidas"
                    class="py-1.5 px-3 flex justify-between my-2 text-nowrap text-sm font-bold text-emerald-700 rounded-lg border-b"
                  >
                    <p>{{ index + 1 }}. {{ feature }}</p>
                    <span
                      @click="removeRecogidas(index)"
                      v-tooltip="'Quitar'"
                      class="cursor-pointer"
                      ><i class="fa-solid fa-trash text-red-500"></i
                    ></span>
                  </div>
                </div>
              </div>
              <div v-else class="mt-4">
                <div class="w-full shadow-md p-2 rounded-md">
                  <div class="flex space-x-2 overflow-y-auto w-full">
                    <AutoComplete
                      @complete="search(true)"
                      placeholder="Describa el punto de encuentro"
                      emptyMessage="Sin resultados"
                      :suggestions="includeSuggestions"
                      dropdown
                      @keyup.enter="addPuntos"
                      v-model="puntosName"
                      class="w-full"
                      pt:root="!w-full"
                      pt:inputText="!w-full"
                    />
                    <Button
                      title="Añadir"
                      @click="addPuntos"
                      severity="primary"
                      label="Añadir"
                      icon="fa-solid fa-plus"
                      class="!h-11"
                    />
                  </div>
                  <div
                    v-for="(feature, index) in form.puntos"
                    class="py-1.5 px-3 flex justify-between my-2 text-nowrap text-sm font-bold text-emerald-700 rounded-lg border-b"
                  >
                    <p>{{ index + 1 }}. {{ feature }}</p>
                    <span
                      @click="removePuntos(index)"
                      v-tooltip="'Quitar'"
                      class="cursor-pointer"
                      ><i class="fa-solid fa-trash text-red-500"></i
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-x-4 mt-6 justify-between">
              <Button
                @click="visible = false"
                title="Cancel"
                severity="danger"
                label="Cancel"
                icon="fa-solid fa-times"
                class="!h-9 w-full"
              />
              <Button
                @click="submit"
                title="Save"
                severity="success"
                :loading="form.processing"
                label="Guardar"
                icon="fa-solid fa-save"
                class="!h-9 w-full"
              />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div class="m-0">
              <Horarios :service :availabilities />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div class="m-0 h-[70vh] overflow-y-auto">
              <div>
                <label for="" class="text-md font-bold">Portada</label>
                <Input type="file-basic" v-model="form.portada" acceptFile="image/*" />
              </div>
              <div class="my-2">
                <label for="" class="text-md font-bold">Fotos</label>
                <div class="grid grid-cols-6 gap-4 my-4">
                  <!-- image.filepath -->
                  <div class="flex gap-y-4" v-for="image in service.images">
                    <img
                      :src="image.filepath"
                      alt="hola"
                      class="h-28 shadow-md rounded-lg w-full"
                    />
                    <div class="-ml-5 -mt-4">
                      <button
                        @click="removeImage(image.id)"
                        class="bg-red-500 fa-solid fa-xmark hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md shadow-red-400 size-8"
                      ></button>
                    </div>
                  </div>
                </div>
                <FileSelection v-model="files" :service />
              </div>
              <div class="flex gap-x-4 mt-6 justify-between">
                <Button
                  @click="visible = false"
                  title="Cancel"
                  severity="danger"
                  label="Cancel"
                  icon="fa-solid fa-times"
                  class="!h-9 w-full"
                />
                <Button
                  @click="submit"
                  title="Save"
                  severity="success"
                  :loading="form.processing"
                  label="Guardar"
                  icon="fa-solid fa-save"
                  class="!h-9 w-full"
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div class="m-0 h-[70vh] overflow-y-auto"></div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </AppLayout>
</template>

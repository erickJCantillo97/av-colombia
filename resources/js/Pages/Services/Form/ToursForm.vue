<template>
    <div class="gap-y-1 flex flex-col py-2">
        <div class="w-full gap-1 grid grid-cols-3">
            <Input label="Titulo" class="w-full" v-model="form.title" :error-message="form.errors.title" />
            <Input label="Código de Referencia" class="w-full" v-model="form.code" :error-message="form.errors.code" />
            <Input label="Ubicación del servicio" class="w-full" v-model="form.city" :error-message="form.errors.city"
                type="dropdown" :options="[
                    'Cartagena',
                    'Barranquilla',
                    'Cali',
                    'Santa Marta',
                    'Medellin',
                ]" />
            <Input label="Duración o Validez" class="w-full" v-model="form.duration_type"
                :error-message="form.errors.duration_type" type="dropdown" :options="[
                    'Duración Fija',
                    'Valido en fecha de Reserva',
                    'Valido durante un periodo de tiempo a partir de la fecha reservada',
                ]" />
            <Input v-if="form.duration_type != 'Valido en fecha de Reserva'" type="number" label="Valido por"
                v-model="form.duration" />
            <Input v-if="form.duration_type != 'Valido en fecha de Reserva'" label="Unidad de tiempo" class="w-full"
                v-model="form.duration_unit" :error-message="form.errors.duration_type" type="dropdown"
                :options="['Dias', 'Horas', 'Minutos']" />
            <Input type="number" label="Capacidad minima" v-model="form.capacidad_min" />
            <Input type="number" label="Capacidad maxima" v-model="form.capacidad_max" :min="form.capacidad_min" />
            <Input type="number" label="Tarifa de Adultos para Vendedores" v-model="form.adults_price"
                :min="form.capacidad_min" mode="currency" />
            <Input type="number" label="Tarifa de Niños para Vendedores" v-model="form.boys_price"
                :min="form.capacidad_min" mode="currency" />
        </div>   
            <Input label="Descripción del Servicio" type="textarea" :rowsTextarea="3" v-model="form.description"  :error-message="form.errors.description" />
        <div class="flex justify-between space-x-4 items-center">
            <div class="w-full shadow-md p-2 rounded-md bg-teal-400">
                <label for="" class="text-lg font-bold text-teal-50 text-center w-full flex justify-center">Incluidos en El servicio</label>
                <div class="flex space-x-2 overflow-y-auto w-full">
                    <AutoComplete @complete="search(true)" emptyMessage="Sin resultados"
                        :suggestions="includeSuggestions" dropdown @keyup.enter="addincludes" v-model="includeLabel"
                        class="w-full" pt:root="!w-full" pt:inputText="!w-full" >
                        <template #option="{ option }">
                            <p class="text-wrap truncate">{{ truncatedString(option.trim(), 50) }}</p>
                        </template>
                    </AutoComplete>
                    <Button title="Añadir" @click="addincludes" severity="primary" label="Añadir"
                        icon="fa-solid fa-plus" class="!h-11" />
                </div>
                <div v-for="(feature, index) in form.includes"
                    class="py-1.5 px-3 flex items-center justify-between my-2 text-wrap text-sm font-bold text-teal-50 border-b border-white">
                    <p>{{ index + 1 }}. {{ feature }}</p>
                    <span @click="removeIncludes(index)" v-tooltip="'Quitar'" class="cursor-pointer"><i
                            class="fa-solid fa-trash text-red-500"></i></span>
                </div>
            </div>
            <div class="w-full shadow-md p-2 rounded-md bg-red-200">
                <label for="" class="text-lg font-bold text-red-600 text-center w-full flex justify-center">No Incluidos en El servicio</label>
                <div class="flex justify-between space-x-2">
                    <AutoComplete dropdown @complete="search(false)" emptySearchMessage="Sin resultados"
                        :suggestions="includeSuggestions" @keyup.enter="addNoIncludes" v-model="noIncludeName"
                        class="w-full" pt:root="!w-full" pt:inputText="!w-1/2" pt:option="!text-wrap">
                        <template #option="{ option }">
                            <p class="text-wrap truncate">{{ truncatedString(option.trim(), 50) }}</p>
                        </template>
                    </AutoComplete>
                    <Button title="Añadir" @click="addNoIncludes" severity="primary" label="Añadir"
                        icon="fa-solid fa-plus" class="h-10" />
                </div>
                <div v-for="(feature, index) in form.notIncludes"
                    class="py-1.5 px-3 flex items-center justify-between my-2 text-wrap text-sm font-bold text-red-600 border-b border-white">
                    <p>{{ index + 1 }}. {{ feature }}</p>
                    <span @click="removeNotIncludes(index)" class="cursor-pointer"><i
                            class="fa-solid fa-trash text-red-800"></i></span>
                </div>
            </div>
        </div>
    </div>
    <div class="flex gap-x-4 mt-8 justify-between">
        <Button @click="visible = false" title="Cancel" severity="danger" label="Cancel" icon="fa-solid fa-times"
            class="!h-9 w-full" />
        <Button @click="serviceModel.submit()" title="Save" severity="success"  label="Guardar"
            icon="fa-solid fa-save" class="!h-9 w-full" />
    </div>
</template>


<script setup>
import Input from "@/Components/Customs/Input.vue";
import {  useForm } from "@inertiajs/vue3";
import AutoComplete from "primevue/autocomplete";
import { onMounted, ref } from "vue";
import { alerts } from "@/composable/toasts";
const { toast } = alerts();
import { truncatedString } from "@/composable/useCommonUtilities"
import Service from '@/Models/Services/Service';

const op = ref();
const includes = ref();
const noIncludes = ref();


const props = defineProps({
    features: Array,
    included: Array,
    availabilities: Array,
    service: Object,
});

const serviceModel = new Service(props.service);
const form = serviceModel.form;

const noIncludeName = ref("");
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


</script>

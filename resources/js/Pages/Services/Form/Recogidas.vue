<template>
    <div class="m-0">
        <div class="w-full bg-gray-200 rounded-md p-2 grid grid-cols-2 divide-y-2 md:flex space-x-2">
            <div @click="value = op.value" v-for="op in options"
                class="w-full rounded-lg text-center py-2 text-sm md:text-md cursor-pointer"
                :class="value == op.value ? 'bg-white' : 'hover:bg-white/30'">
                {{ op.name }}
            </div>
        </div>
        <div v-if="value == 1" class="mt-4">
            <div class="w-full shadow-md p-2 rounded-md">
                <div class="flex space-x-2 overflow-y-auto w-full">
                    <Input type="text"  placeholder="Describa el Lugar de Recogida"
                        @keyup.enter="addRecogidas" v-model="recogidaName" class="w-full"  />
                    <Button title="Añadir" @click="addRecogidas" severity="primary" label="Añadir"
                        icon="fa-solid fa-plus" class="!h-11" />
                </div>
                <div v-for="(feature, index) in form.recogidas"
                    class="py-1.5 px-3 flex justify-between my-2 text-nowrap text-sm font-bold capitalize text-emerald-700 rounded-lg border-b">
                    <p>{{ index + 1 }}. {{ feature }}</p>
                    <span @click="removeRecogidas(index)" v-tooltip="'Quitar'" class="cursor-pointer"><i
                            class="fa-solid fa-trash text-red-500"></i></span>
                </div>
            </div>
        </div>
        <div v-else class="mt-4">
            <div class="w-full shadow-md p-2 rounded-md">
                <div class="flex space-x-2 overflow-y-auto w-full">
                    <Input  placeholder="Describa el punto de encuentro"
                        @keyup.enter="addPuntos" v-model="puntosName" class="w-full" pt:root="!w-full"
                        pt:inputText="!w-full" />
                    <Button title="Añadir" @click="addPuntos" severity="primary" label="Añadir" icon="fa-solid fa-plus"
                        class="!h-11" />
                </div>
                <div v-for="(feature, index) in form.puntos"
                    class="capitalize py-1.5 px-3 flex justify-between my-2 text-nowrap text-sm font-bold text-emerald-700 rounded-lg border-b">
                    <p>{{ index + 1 }}. {{ feature }}</p>
                    <span @click="removePuntos(index)" v-tooltip="'Quitar'" class="cursor-pointer"><i
                            class="fa-solid fa-trash text-red-500"></i></span>
                </div>
            </div>
        </div>
    </div>
    <div class="flex gap-x-4 mt-6 justify-between">
       
        <Button @click="serviceModel.submit()" title="Save" severity="success" :loading="form.processing" label="Guardar"
            icon="fa-solid fa-save" class="!h-9 w-full" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Service from '@/Models/Services/Service';
import Input from '@/Components/Customs/Input.vue';

const props = defineProps({
    service: Object,
});

const recogidaName = ref('');
const puntosName = ref('');

const serviceModel = new Service(props.service);
const form = serviceModel.form;

const options = [
    { name: "Recogidas", value: 1 },
    { name: "Puntos de encuentro", value: 2 },
];

const op = ref({ name: "Recogidas", value: 1 });

const value = ref(1);

const addRecogidas = () => {
  if (!recogidaName.value) return;
if (!form.recogidas.some(item => item.toLowerCase() === recogidaName.value.toLowerCase())) {
    form.recogidas.push(recogidaName.value);
}
  recogidaName.value = "";
};

const removeRecogidas = (index) => {
  form.recogidas.splice(index, 1);
};

const addPuntos = () => {
  if (!puntosName.value) return;
  if (!form.puntos.some(item => item.toLowerCase() === puntosName.value.toLowerCase())) {
    form.puntos.push(puntosName.value);
  }
  puntosName.value = "";
};
const removePuntos = (index) => {
  form.puntos.splice(index, 1);
};




</script>

<style scoped></style>
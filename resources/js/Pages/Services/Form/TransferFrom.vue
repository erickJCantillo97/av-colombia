<template>
    <div class="gap-2 grid grid-cols-1 md:grid-cols-3 p-4">

        <Input label="Ubicación del servicio" class="w-full" v-model="form.city" :error-message="form.errors.city"
            type="dropdown" :options="[
                'Cartagena',
                'Barranquilla',
                'Cali',
                'Santa Marta',
                'Medellin',
            ]" />
        <Input label="Origen" class="w-full" v-model="form.origen" :error-message="form.errors.origen" />
        <Input label="Destino" class="w-full" v-model="form.destino" :error-message="form.errors.destino" />
        <Input label="Duración aproximada en minutos" type="number" class="w-full" v-model="form.duration"
            :error-message="form.errors.duration" suffix=" Minutos" />
        <Input label="Tarifa por vehiculo" type="number" mode="currency" class="w-full" v-model="form.tarifa_vehiculo"
            :error-message="form.errors.tarifa_vehiculo" />
        <Input label="Pax maximos por Vehiculo" type="number" class="w-full" v-model="form.capacidad_max"
            :error-message="form.errors.capacidad_max" />
        <Input label="Tarifa maxima vendedores" type="number" class="w-full" v-model="form.adults_price"
            :error-message="form.errors.adults_price" />
        <div class="flex flex-col items-center justify-center">
            <label for="" class="font-bold">Disponible Ida y vuelta</label>
            <ToggleSwitch v-model="form.is_round_trip">
                <template #handle="{ checked }">
                    <i :class="['!text-xs pi', { 'pi-check': checked, 'pi-times': !checked }]" />
                </template>
            </ToggleSwitch>
        </div>
          <Input label="Descripción del Servicio" class=" col-span-1 md:col-span-3" type="textarea" :rowsTextarea="3" v-model="form.description"  :error-message="form.errors.description" />
        <div class="grid grid-cols-2 col-span-3 gap-2">
            <Button severity="danger" label="Cancelar" icon="fa-solid fa-xmark"></Button>
            <Button @click="submit()" title="Save" severity="success" label="Guardar" icon="fa-solid fa-save"
                class="!h-12 w-full" />
        </div>
    </div>
</template>

<script setup>
import Input from "@/Components/Customs/Input.vue";
import { onMounted, ref } from "vue";
import Service from '@/Models/Services/Service';
import { Button } from "primevue";

const checked = ref(false);

const props = defineProps({
    service: Object,
});

const serviceModel = new Service(props.service);
const form = serviceModel.form;


const submit = () => {
    form.title = `Transfer ${form.origen} - ${form.destino}`;
    form.type = "TRANSFER";
    form.code = `T-${form.origen}-${form.destino}`;
    // form.description = 'Transfer';
    form.duration_type = 'Duración Fija';
    serviceModel.submit();
};

</script>
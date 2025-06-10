<template>
    <div class="gap-y-1 flex flex-col py-2">
        <div class="grid grid-cols-3 gap-2 w-full">
            <Input label="Nombre de la embarcación" v-model="serviceModel.form.title" />
            <Input label="Codigo de Referencia" v-model="serviceModel.form.code" />
            <Input label="Número de Pasajeros" v-model="serviceModel.form.capacidad_max" />
            <Input label="Potencia" />
            <Input label="Tamaño de la lancha" type="number" suffix=" pies" />
            <Input label="Motores" />

        </div>
        <Input label="Descripción" type="textarea" :rowsTextarea="3" v-model="serviceModel.form.description" />
        <div class="flex flex-col">
            <label class="font-bold">
                Incluidos en el alquiler
            </label>
            <div class="grid grid-cols-8 gap-4 my-2">
                
                <div class="flex items-center w-full gap-2" v-for="caracteristica in caracteristicas">
                    <!-- <Checkbox v-model="pizza" :inputId="caracteristica.value" :name="caracteristica.value" :value="caracteristica.value" /> -->
                    <div @click="caracteristicasHandleClick(caracteristica.value)" :for="caracteristica.value" class="flex items-center font-semibold capitalize text-gray-700 border w-full p-2 cursor-pointer rounded-md space-x-2"
                    :class="serviceModel.form.includes.includes(caracteristica.value) ? 'bg-blue-200 border-blue-500' : 'bg-gray-200'"
                    > 
                        <i :class="caracteristica.icon"></i>
                        <p>
                            {{caracteristica.value}} 
                        </p>
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
    </div>
</template>


<script setup>
import Input from '@/Components/Customs/Input.vue';
import {caracteristicas} from '@/composable/CommonData'
import { ref } from 'vue';

import Service from '@/Models/Services/Service';

const props = defineProps({
    service: Object
})
const serviceModel = new Service(props.service);
serviceModel.form.type = 'EMBARCACION'

const caracteristicasHandleClick= (caracteristica) => {
    if(serviceModel.form.includes.includes(caracteristica)){
        return serviceModel.form.includes = serviceModel.form.includes.filter(item => item !== caracteristica)
    }
    serviceModel.form.includes.push(caracteristica)
}

</script>

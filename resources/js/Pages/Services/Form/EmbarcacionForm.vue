<template>
    <form class="gap-y-1 flex flex-col py-2" id="embarcacion-form" @submit.prevent="serviceModel.submit()">
        <div class="grid grid-cols-3 gap-2 w-full">
            <Input label="Nombre de la embarcación" v-model="serviceModel.form.title" required />
            <Input label="Codigo de Referencia" v-model="serviceModel.form.code" required />
            <Input label="Número de Pasajeros" v-model="serviceModel.form.capacidad_max" />
            <Input label="Potencia" v-model="serviceModel.form.potencia" />
            <Input label="Tamaño de la lancha" type="number" suffix=" pies" v-model="serviceModel.form.size" />
            <Input label="Motores" v-model="serviceModel.form.motor" />

        </div>
        <Input label="Descripción" type="textarea" :rowsTextarea="3" v-model="serviceModel.form.description" required />
        <div class="flex flex-col">
            <label class="font-bold">
                Incluidos en el alquiler
            </label>
            <div class="flex flex-wrap justify-around gap-2 my-2">
                <div class="flex items-center gap-2" v-for="caracteristica in allFeatures">
                    <!-- <Checkbox v-model="pizza" :inputId="caracteristica.value" :name="caracteristica.value" :value="caracteristica.value" /> -->
                    <div @click="caracteristicasHandleClick(caracteristica.id)" :for="caracteristica.name"
                        class="flex items-center font-semibold capitalize border w-full p-2 cursor-pointer rounded-md space-x-2"
                        :class="[serviceModel.form.includes.includes(caracteristica.id|| String(caracteristica.name).toLowerCase()) ?
                            'bg-blue-200 border-blue-500' :
                            'bg-gray-200',
                        'text-' + caracteristica.color + '-800']">
                        <i :class="[caracteristica.icon]"></i>
                        <p>
                            {{ caracteristica.name }}
                        </p>
                    </div>

                </div>
            </div>
        </div>
        <div class="flex gap-x-4 mt-8 justify-between">
            <Button @click="visible = false" title="Cancel" severity="danger" label="Cancel" icon="fa-solid fa-times"
                class="!h-9 w-full" />
            <Button @click="" title="Save" severity="success" label="Guardar" type="submit" form="embarcacion-form"
                icon="fa-solid fa-save" class="!h-9 w-full" />
        </div>
    </form>
</template>


<script setup>
import Input from '@/Components/Customs/Input.vue';
import { caracteristicas } from '@/composable/CommonData'
import { onMounted, ref } from 'vue';

import Service from '@/Models/Services/Service';

const props = defineProps({
    service: Object
})
const serviceModel = new Service(props.service);
serviceModel.form.type = 'EMBARCACION'

const allFeatures = ref()
onMounted(async () => {
    allFeatures.value = await serviceModel.getAllFeatures()
}
)

const caracteristicasHandleClick = (caracteristica) => {
    if (serviceModel.form.includes.includes(caracteristica)) {
        return serviceModel.form.includes = serviceModel.form.includes.filter(item => item !== caracteristica)
    }
    serviceModel.form.includes.push(caracteristica)
}

</script>

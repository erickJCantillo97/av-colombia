<template>
    <div class="flex items-center gap-x-4">
        <div class="flex items-center border gap-x-4 p-4 bg-gray-200/80 rounded-lg shadow-lg">
        <i class="fa-solid fa-users text-4xl text-lime-800"></i>
        <div class="flex flex-col">
            <h3 class="font-bold">Tripulación</h3>
            <span>
                Estaras Acompañado de un
                <span v-if="includes.includes('capitán')">
                    <strong>
                        Capitán
                    </strong>
                </span>
                <span v-if="includes.includes('capitán') && includes.includes('marinero')">
                    y de un
                </span>
                <span v-if="includes.includes('marinero')" class="font-bold">
                    Marinero
                </span>
            </span>
        </div>
    </div>
    <div class="flex items-center border gap-x-4 p-4 bg-gray-200/80 rounded-lg shadow-lg" v-if="includes.includes('bebidas')">
        <i class="fa-solid fa-wine-bottle text-4xl text-amber-800"></i>
        <div class="flex flex-col">
            <h3 class="font-bold">Bebidas</h3>
            <span>
                Contaras con bebida a bordo
            </span>
        </div>
    </div>
    </div>
    
</template>

<script setup>
import { caracteristicas } from '@/composable/CommonData';
import Service from '@/Models/Services/Service';

const props = defineProps({
    service: Object
})


const serviceModel = new Service(props.service);
const includes = serviceModel.form.includes



</script>
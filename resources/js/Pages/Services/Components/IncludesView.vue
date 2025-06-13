<template>
    <div class="flex flex-com md:flex-row justify-between items-start gap-x-4">
        <div class="flex flex-col gap-y-2">
            <h4 class="text-lg font-semibold text-green-800">Servicios Incluidos</h4>
            <span class="text-xs italic">Estos son los servicios que se incluyen en tu reserva</span>
            <div>
                <ul class=" text-gray-700 flex flex-col gap-y-1 text-sm">
                    <li v-for="(include, index) in includes" class="" :key="index">
                        <i class="fa-solid fa-check text-teal-500"></i>
                        <span class="ml-2 font-semibold">
                            {{ include }}
                        </span>
                        </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-col gap-y-2">
            <h4 class="text-lg font-semibold text-red-700">Servicios NO Incluidos</h4>
            <span class="text-xs italic">Lastimosamente NO podemos asegurarte estos servicios con tu reserva</span>
            <div>
                <ul class="text-gray-700 flex flex-col gap-y-1 text-sm">
                    <li v-for="(include, index) in notIncludes" :key="index">
                        <i class="fa-solid fa-xmark text-red-500"></i>
                        <span class="ml-2 font-semibold">
                        {{ include }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
       

        
    </div>
</template>
<script setup>
import { ref } from 'vue';

const includes = ref([])
const notIncludes = ref([])
const props = defineProps({
  service: Object,
});

includes.value = JSON.parse(props.service.includes);
notIncludes.value = JSON.parse(props.service.notIncludes);

</script>
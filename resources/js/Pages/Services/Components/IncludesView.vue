<template>
    <div class="flex flex-col md:flex-row justify-between items-start gap-x-4 gap-y-6">
        <div class="flex flex-col gap-y-2">
            <h4 class="text-2xl font-semibold text-green-800">Servicios Incluidos</h4>
            <span class=" italic">Estos son los servicios que se incluyen en tu reserva</span>
            <div v-if="service.type != 'EMBARCACION'">
                <ul class=" text-gray-700 flex flex-col gap-y-1 text-md">
                    <li v-for="(include, index) in includes" class="p-1 shadow-sm" :key="index">
                        <i class="fa-solid fa-check text-teal-500"></i>
                        <span class="ml-2 font-semibold">
                            {{ include }}
                        </span>
                    </li>
                </ul>
            </div>
            <div v-else>
                <ul class=" text-gray-700 flex flex-col text-md">
                    <span v-for="(feature, index) in features" :key="index">
                        <li class="mt-2" v-if="includes.includes(feature.name.toUpperCase() || feature.id)">
                            <i class="fa-solid text-teal-500" :class="[feature.icon]"></i>
                            <span class="ml-2 font-semibold">
                                {{ feature.name.toUpperCase() }}
                            </span>
                        </li>
                    </span>
                </ul>
            </div>
        </div>

        <div v-if="notIncludes.length > 0" class="flex flex-col gap-y-2">
            <h4 class="text-lg font-semibold text-red-700">Servicios NO Incluidos</h4>
            <span class="text-xs italic">Lastimosamente NO podemos asegurarte estos servicios con tu reserva</span>
            <div>
                <ul class="text-gray-700 flex flex-col gap-y-1 text-sm">
                    <li v-for="(include, index) in notIncludes" class="p-1 shadow-sm" :key="index">
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
    features: Array,
});

includes.value = JSON.parse(props.service.includes);
notIncludes.value = JSON.parse(props.service.notIncludes);

</script>

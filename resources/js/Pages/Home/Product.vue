<template>
    <!-- {{ service }} -->

    <div class="flex p-4 rounded-lg shadow-xl gap-x-4 items-center w-full justify-between">
        <div class="flex gap-x-5">
            <img :src="service.portada == '/laravel/public/' ? 'https://avcolombia.net/images/logo.webp' : service.portada"
                alt="portada" class="h-full w-48 md:w-96 rounded-md object-contain shadow-sm">
            <div class="flex flex-col">
                <h3 class="text-2xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">{{ service.title }}</h3>
                <div v-html="truncateString(service.description, esMovil() ? 100 : 350)"
                    class="mt-4 text-gray-500 text-justify"></div>
                <div class="flex justify-start gap-x-4">
                    <span v-for="include in includes" class="text-sm my-2 italic text-teal-900 capitalize">
                        <i class="fa-solid fa-check text-teal-500"></i>
                        {{ truncateString(include.toLowerCase(), 20) }}
                    </span>
                </div>
                <div class="mt-3 text-gray-900 flex w-full justify-between items-center">
                    <div>
                        <span>Desde</span>
                        <h3 class="font-bold text-lg ">{{ USDollar.format(service.adult_tarifa) }}COP /persona
                        </h3>
                    </div>
                </div>
            </div>
        </div>

        <Link :href="route('show.services', service.slug)">
        <Button>Ver más</Button>
        </Link>
    </div>
</template>

<script setup>

import { useCommonUtilities } from '@/composable/useCommonUtilities.js';
import { Link } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const { truncateString, esMovil } = useCommonUtilities();

const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

const includes = ref([]);

const props = defineProps({
    service: Object,
})

onMounted(() => {
    includes.value = JSON.parse(props.service.includes).slice(0, 3);
})


</script>
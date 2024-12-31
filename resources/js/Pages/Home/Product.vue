<template>

    <div class="flex p-4 rounded-lg shadow-xl gap-x-4 items-center w-full justify-between" v-if="type == 'list'">
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
                <div v-if="form.date" class="mt-3 text-gray-900 flex w-full justify-between items-center">
                    <div>
                        <span>Desde</span>
                        <h3 class="font-bold text-lg">{{ USDollar.format(service.availabilities.find((x) =>
                            formatDate(x.start_date) <= formatDate(form.date))?.precies.find((x) => x.value > 0).value ??
                            0)
                                }} por Persona
                        </h3>
                    </div>
                </div>
                <div v-else>
                    Ver precios
                </div>
            </div>
        </div>

        <Link :href="route('show.services', service.slug)">
        <Button>Ver más</Button>
        </Link>
    </div>
    <div href="#" v-else
        class="flex flex-col bg-white py-4 px-4 rounded-md hover:scale-105 transition duration-500 ease-in-out hover:shadow-lg cursor-pointer">
        <div class="flex items-center justify-between gap-x-4 py-2">
            <h3 class="text-xl font-extrabold text-nowrap truncate ">{{ service.title }}</h3>
            <span>
                <i class="fa-solid fa-bookmark text-xl"></i>
            </span>
        </div>
        <span class="text-sm text-gray-700">
            <i class="fa-solid fa-map-marker-alt text-red-600"></i> Cartagena
        </span>

        <div class="px-5 min-w-full shadow-xl rounded-xl my-4">
            <img v-if="service.portada != '/laravel/public/'" :src="service.portada" alt="portada"
                class="h-[25vh] w-full rounded-md object-contain shadow-sm">
            <div v-else
                class="h-[25vh] w-full rounded-md object-cover shadow-sm flex flex-col items-center justify-center">
                <Logo></Logo>
                <p class="text-5xl font-extrabold">AV COLOBIA</p>
            </div>
        </div>

        <div class="flex items-center justify-between mt-5 gap-x-2 text-sm">
            <span v-if="form.date"> {{
                USDollar.format(service.availabilities.find((x) =>
                    formatDate(x.start_date) <= formatDate(form.date))?.precies.find((x) => x.value > 0).value ??
                    0)
            }} por Persona</span>
            <button class="bg-blue-800 py-1.5 px-3 font-semibold  text-white rounded-md " v-else>Ver precios</button>

            <Link :href="route('show.services', service.slug)"
                class="border-gray-800 shadow-md py-1.5 px-3 font-extrabold rounded-md border">Explorar</Link>
        </div>
    </div>
</template>

<script setup>

import { useCommonUtilities } from '@/composable/useCommonUtilities.js';
import { Link } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';
import { useHomeStore } from '@/stores/HomeStore';
import { storeToRefs } from 'pinia';
import Logo from '@/Components/Logo.vue';
const store = useHomeStore();
const { form } = storeToRefs(store);

const { truncateString, esMovil } = useCommonUtilities();

const USDollar = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0, });
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
};
const includes = ref([]);

const props = defineProps({
    service: Object,
    type: {
        type: String,
        default: 'list'
    }
})

onMounted(() => {
    includes.value = JSON.parse(props.service.includes).slice(0, 3);
})


</script>

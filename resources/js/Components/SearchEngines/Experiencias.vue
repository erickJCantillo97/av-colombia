<script setup>
import { ref } from 'vue';
import Input from '../Customs/Input.vue';
import axios from 'axios';
import { Link } from '@inertiajs/vue3';
import ProductCard from '../Sections/ProductCard.vue';

const search = ref({
    search: '',
    date: '',
    persons: {
        adult: 0,
        children: 0,
    }
})


const props = defineProps({
    type: {
        type: Boolean,
    }
});
const services = ref([])
const loading = ref(false)
const getServices = () => {
    loading.value = true
    services.value = []
    axios.get(route('get.services', { search: search.value })).then(response => {
        services.value = response.data.services;
        loading.value = false
    });
}
const isFocused = ref(false);



const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});
</script>

<template>
    <div class="p-4">
        <div
            class="w-full h-12 p-4 rounded-lg flex items-center border border-gray-600 gap-x-2 divide-x justify-between">
            <div class="w-full">
                <input type="search" v-model="search.search" placeholder="Escriba aqui para buscar..."
                    class="w-full right-0 border-0 focus:ring-0">
            </div>
            <div class="w-full">
                <Input type="date" v-model="search.date" placeholder="Escriba aqui para buscar..."
                    class="w-full right-0 border-0 focus:ring-0" />
            </div>
        </div>
        <!-- <InputText class="h-12 w-full" @focus="isFocused = true" @blur="isFocused = false" v-model="search"
            @input="getServices" :placeholder="'Buscar ' + type" type="text" size="large" /> -->
        <!-- <div class="absolute w-[90vw] lg:w-[70vw] rounded-b-lg z-10 p-2 bg-gray-200 space-y-2"
            v-if="search || isFocused">
            <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
            <Link v-else-if="services.length > 0 && search" :href="route('show.services', service.slug)"
                v-for="service in services">
            <div
                class="p-2 bg-white hidden md:flex my-1 justify-between rounded-lg hover:bg-black cursor-pointer hover:text-white">
                <div class="flex flex-col w-full">
                    <p>{{ service.title }}</p>
                    <div class="flex space-x-2 items-center">
                        <div v-for="feature in service.features"
                            class="py-0.5 px-3 text-sm font-bold text-white  rounded-full"
                            :style="`background-color: #${feature.color};`">
                            {{ feature.name }}
                        </div>
                    </div>
                </div>
                <p>
                    {{ USDollar.format(service.price) }}
                </p>
            </div>
            <ProductCard class="md:hidden block " :product="service" />
            </Link>
            <div v-else-if="search" class="text-lg">
                No encontramos nada relacionado con <strong>{{ search }}</strong> pero te recomendamos
            </div>
            <div v-else class="text-lg">
                Escriba algo para buscar...
            </div>
        </div> -->
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Input from '../Customs/Input.vue';
import axios from 'axios';
import { Link } from '@inertiajs/vue3';

const search = ref('')

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
    <div class="h-full p-4">
        <InputText class="h-12 w-full" @focus="isFocused = true" @blur="isFocused = false" v-model="search"
            @input="getServices" placeholder="Buscar" type="text" size="large" />
        <div class="absolute lg:w-[70vw] rounded-b-lg z-10 p-2 bg-gray-200 space-y-2" v-if="search || isFocused">
            <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
            <Link v-else-if="services.length > 0 && search" :href="route('show.services', service.slug)"
                class="p-2 bg-white flex justify-between rounded-lg hover:bg-black cursor-pointer hover:text-white"
                v-for="service in services">
            <div class="flex flex-col w-full">
                <p>{{ service.title }}</p>
                <div>
                    <div class="flex space-x-2" v-for="feature in service.features">
                        <div class="py-0.5 px-3 text-sm font-bold text-white  rounded-full"
                            :style="`background-color: #${feature.color};`">
                            Playa
                        </div>
                    </div>
                    <!-- <div v-for="day in JSON.parse(service.days)">
                        {{ day }}
                    </div> -->
                </div>


            </div>
            <p>
                {{ USDollar.format(service.price) }}
            </p>
            </Link>
            <div v-else-if="search" class="text-lg">
                No encontramos nada relacionado con <strong>{{ search }}</strong> pero te recomendamos
            </div>
            <div v-else class="text-lg">
                Escriba algo para buscar...
            </div>
        </div>
    </div>
</template>
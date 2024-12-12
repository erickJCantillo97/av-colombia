<template>
    <GuestLayout>
        <div class="w-full flex flex-col items-center justify-center">
            <h1 class="text-3xl font-bold text-center">Servicios</h1>
            <div class="w-[50vw]  rounded-lg flex items-center border border-gray-600 gap-x-2 divide-x ">
                <div class="w-full">
                    <Button type="button" size="large" :label="type ? type : 'Selecciona un Servicio'" text
                        @click="toggle" class="w-full" icon="fa-solid fa-arrow-down" icon-pos="right"
                        pt:root:class="!flex justify-between " />
                    <Popover ref="op">
                        <div class="flex flex-col gap-4">
                            <div>
                                <span class="mb-2 text-xl font-extrabold">Nuestros Servicios</span>
                                <ul class="grid grid-cols-2 gap-4">
                                    <div @click="selectMember(service)" v-for="service in serviceType"
                                        class="flex flex-col items-center justify-center shadow-sm p-4 border-gray-100 border shadow-gray-200 rounded-lg cursor-pointer hover:bg-teal-100">
                                        <i class="fa-solid text-lg" :class="service.icon"></i>
                                        <p class="text-lg font-bold">{{ service.name }}</p>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </Popover>
                </div>
                <div class="w-full">
                    <input type="search" v-model="search" placeholder="Escriba aqui para buscar..."
                        class="w-full text-lg right-0 border-0 focus:ring-0">
                </div>
                <div class="w-full">
                    <vue-tailwind-datepicker v-model="date" i18n="es" as-single placeholder="Fecha"
                        input-classes="w-full text-lg right-0 border-0 focus:ring-0" :shortcuts="false" overlay
                        :formatter="formatter" />
                    <!-- <input type="date" v-model="search.date" placeholder="Escriba aqui para buscar..."
                        class="w-full right-0 border-0 focus:ring-0" /> -->
                </div>

            </div>
            <ul class="mx-auto max-w-7xl w-full flex flex-col gap-y-4">
                <Product :service v-for="service in services" />
            </ul>
        </div>
    </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { onMounted, ref, watch } from 'vue';
import Product from './Product.vue';


const services = ref([]);

const props = defineProps({
    search: String,
    date: Date,
    type: String
});

const search = ref(props.search);
const date = ref(props.date);
const type = ref(props.type);

onMounted(() => {
    getServices();
});


const getServices = () => {
    axios.get(route('get.services', {
        search: search.value,
        date: date.value,
        type: type.value
    })).then(response => {
        services.value = response.data.services;
    });
}

watch([search, date, type], () => {
    getServices();
});

const op = ref();

const serviceType = ref([
    { name: 'Experiencias', icon: 'fa-umbrella-beach', value: 'TOUR' },
    { name: 'Alojamiento', icon: 'fa-hotel', value: 'ALOJAMIENTO' },
    { name: 'Transporte', icon: 'fa-car', value: 'TRANSFER' },
    { name: 'Embarcaciones', icon: 'fa-ship', value: 'EMBARCACIONES' },
]);

const toggle = (event) => {
    op.value.toggle(event);
}

const selectMember = (member) => {
    type.value = member.value;
    op.value.hide();
}



</script>
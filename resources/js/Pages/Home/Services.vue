<template>
    <GuestLayout>
        <div class="sticky top-20 z-50 bg-white shadow-md">
            <div class="flex items-center justify-between px-4 py-2">
                <div class="flex items-center gap-x-4">
                    filtros
                </div>
            </div>
        </div>
        <div class="w-full flex flex-col items-center justify-center gap-y-4 mt-2">

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

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MM',
})


</script>
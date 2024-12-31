<template>
    <GuestLayout>
        <div class="sticky top-20 z-50 bg-white shadow-md">
            <div class="flex items-center justify-between px-4 py-2">
                <div class="w-full flex items-center gap-x-4 justify-between">
                    <div>
                        sd
                    </div>
                    <div>
                        <SelectButton v-model="value" :options="options" optionLabel="value" dataKey="value"
                            aria-labelledby="custom">
                            <template #option="slotProps">
                                <i :class="slotProps.option.icon"></i>
                            </template>
                        </SelectButton>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex flex-col items-center justify-center gap-y-4">
            <div v-if="services.length == 0 && !searching" class="w-full flex items-center justify-between px-4 py-2">
                sin resultados
            </div>
            <div v-else-if="searching" class="w-full flex  items-center justify-center px-4 py-2 h-[20vh]">
                <Loading />
            </div>
            <ul v-else class=" w-full gap-6 py-10 bg-gray-100"
                :class="value.value == 'list' ? 'grid grid-cols-1 px-5' : 'grid grid-cols-1 md:grid-cols-3 md:px-44 px-5'">
                <Product :service v-for="service in services" :type="value.value" />
            </ul>
        </div>
    </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { onMounted, ref, watch } from 'vue';
import Product from './Product.vue';
import Loading from '@/Components/Loading.vue';

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

const searching = ref(false);
const getServices = () => {
    searching.value = true;
    axios.get(route('get.services', {
        search: search.value,
        date: date.value,
        type: type.value
    })).then(response => {
        searching.value = false;
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

const value = ref({ icon: 'pi pi-list', value: 'list' });
const options = ref([
    { icon: 'pi pi-list', value: 'list' },
    { icon: 'pi pi-th-large', value: 'grid' },
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
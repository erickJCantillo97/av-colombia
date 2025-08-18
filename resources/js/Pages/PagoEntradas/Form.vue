<template>
    <div class="p-2">
        <Input @value-change="getProveedors" type="dropdown" option-label="title" option-value="id" v-model="formData.service_id" :options="services" label="Servicio" ></Input>
        <Input type="dropdown" option-label="nombre" option-value="id" v-model="formData.proveedor_id" :options="proveedors" label="Proveedor" ></Input>
        <Input v-model="formData.cant" label="Cantidad" type="number" :min="1"></Input>
        <Input v-model="formData.total_cost" label="Costo Total" type="currency"></Input>
    </div>

</template>
<script setup>
import Input from '@/Components/Customs/Input.vue';
import { onMounted, ref } from 'vue';
import Service from '@/Models/Services/Service';
import { useForm } from '@primevue/forms/useform';
import BookingServicesProveedors from '@/Models/BookingServices/Proveedors';
const services = ref([]);

const props = defineProps({
    payment: Object
})

const service = new Service();

const proveedors = ref([]);


onMounted(async () => {
    services.value = await service.getServices();
})

const getProveedors = async () => {
    if (formData.service_id) {
        proveedors.value = await service.getProveedorsByService(formData.service_id);
    } else {
        proveedors.value = [];
    }
}

const formData = useForm({
    cant: '',
    total_cost: '',
    service_id: '',
    proveedor_id: '',
    descripcion: ''
});

</script>
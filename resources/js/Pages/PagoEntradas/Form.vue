<template>
    <div class="p-2">
        <Input type="dropdown" option-label="title" option-value="id" v-model="formData.service_id" :options="services" label="Servicio" ></Input>
        <Input v-model="formData.cant" label="Cantidad" type="number" :min="1"></Input>
        <Input v-model="formData.total_cost" label="Costo Total" type="currency"></Input>
        <Input v-model="formData.ciudad" label="Proveedor"></Input>
    </div>

</template>
<script setup>
import Input from '@/Components/Customs/Input.vue';
import { onMounted, ref } from 'vue';
import Service from '@/Models/Services/Service';
import { useForm } from '@primevue/forms/useform';
const services = ref([]);

const props = defineProps({
    payment: Object
})

const service = new Service();

onMounted(async () => {
    services.value = await service.getServices();
})

const formData = useForm({
    cant: '',
    total_cost: '',
    service_id: '',
    ciudad: '',
    descripcion: ''
});

</script>
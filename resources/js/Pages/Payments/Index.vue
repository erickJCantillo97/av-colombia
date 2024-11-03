<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const show = ref(false)

const props = defineProps({
    payments: {
        type: Array,
        required: true,
    },
})

const form = useForm({
    payable_id: '',
    payable_type: 'App\\Models\\Service',
    method: '',
    amount: '',
    currency: 'COP',
})

const add = {
    action: () => {
        show.value = true
        // router.visit(route('services.create'))
    },
}

const serviceSelected = ref();

const submit = (event) => {
    event.preventDefault()
}

const services = ref([]);
const getServices =  () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}
getServices()

const servicesNoPaiyment = ref([]);

const getServicesNoPayment =  () => {
    axios.get(route('get.services.no.payment')).then(response => {
        servicesNoPaiyment.value = response.data.bookingNoPayment;
    });
}

getServicesNoPayment()

const columns = [
    {
        header: 'Servicio',
        field: 'user',
        filter: true,
    },
    {
        header: 'Metodo de Pago',
        field: 'metohdPayment.name',
        filter: true,
    },
    {
        header: 'Monto',
        field: 'amount',
        type: 'currency',
        filter: true,
    },
    {
        header: 'Fecha',
        field: 'created_at',
        type: 'date',
        filter: true,
    },
   
    {
        header: 'Estado',
        field: 'status',
        filter: true,
    },

    
]

</script>

<template>
    <AppLayout title="Pagos">
        <div class="h-[99vh]">
            <Datatable :add :columnas="columns" :data="payments"
                title="Pagos">
            </Datatable>
        </div>
        <Modal v-model="show" title="Añadir Pagos">
            <form @submit.prevent="submit">
                <div class="flex flex-col gap-y-4">
                        <!-- <label for="payable_id" class="block text-sm font-medium text-gray-700">Servicio</label> -->
                         <div>
                             <label for="" class="font-bold">Servicio</label>
                            <Select :options="servicesNoPaiyment" filter showClear v-model="form.payable_id"  class="w-full" option-label="service" placeholder="Seleccione un servicio">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex items-center">
                                        <div>{{ slotProps.value.service }} - {{slotProps.value.cliente_name}}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps" >
                                        <div class="flex justify-between w-full items-center">
                                            <div> 
                                                <p>
                                                    {{ slotProps.option.service }} - {{ slotProps.option.cliente_name }}
                                                </p>
                                                <p class="text-xs">
                                                    {{ slotProps.option.date }} {{ slotProps.option.hour }}
                                                </p>
                                            </div>
                                                <div>{{slotProps.option.total_price_sales}}</div>
                                        </div>
                                </template>
                                
                            </Select>
                         </div>
                        <Input label="Monto"   />
                    </div>
                
            </form>
        </Modal>
    </AppLayout>
</template>
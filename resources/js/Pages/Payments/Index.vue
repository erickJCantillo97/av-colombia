<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const show = ref(false)

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
        field: 'method',
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
        field: 'date',
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
            <Datatable :add :columnas="columns"
                title="Pagos">
            </Datatable>
        </div>
        <Modal v-model="show" title="Añadir Pagos">
            <form @submit.prevent="submit">
                <div class="grid grid-cols-1 gap-6">
                    <div>
                        <!-- <label for="payable_id" class="block text-sm font-medium text-gray-700">Servicio</label> -->
                        <Input type="dropdown"  :options="servicesNoPaiyment" v-model="serviceSelected" option-label="service"  label="servicio" />
                        <Input label="Cantidad"   />
                    </div>
                </div>
            </form>
        </Modal>
    </AppLayout>
</template>
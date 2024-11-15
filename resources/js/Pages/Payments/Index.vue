<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { router, useForm } from '@inertiajs/vue3';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { alerts } from '@/composable/toasts';
const show = ref(false)


const { toast } = alerts()
const props = defineProps({
    payments: {
        type: Array,
        required: true,
    },
})

const methods = ref([])

const validatePay = ref(false)

const form = useForm({
    payable_id: '',
    payable_type: 'App\\Models\\Service',
    method: '',
    amount: '',
    currency: 'COP',
    validatePay: false
})

const add = {
    action: () => {
        show.value = true
        // router.visit(route('services.create'))
    },
}

const buttons = [
    {
        action: (data) => {
            // validatePay.value = true
            Swal.fire({
                title: "Confirmar Pago?",
                text: "Esta seguro de Confirmar este pago?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Si, Confirmar!"
            }).then((result) => {
                if(result.isConfirmed){
                    console.log(data)
                    router.post(route('payment.set.state', data.id), {
                        _method: 'PUT',
                        status: 'Confirmado'
                    },{
                        onSuccess: () => {
                            toast('success', 'Pago Confirmado con exito')
                        }
                    })
                }
                // toast('success', 'Pago Confirmado con exito')
            });
            serviceSelected.value = data
        },
        // <i class="fa-solid fa-file-invoice-dollar"></i>
        severity: 'success',
        icon: 'fa-solid fa-wallet text-sm',
        label: 'Validar Pago',
    },
]

const serviceSelected = ref();

const submit = (event) => {
    if(form.validatePay){
        form.status = 'Confirmado'
    }
    if(form.amount == '' || form.method == '' || form.payable_id == ''){
        toast('error', 'Todos los campos son obligatorios')
        return
    }
    form.payable_id = form.payable_id.id
    form.post(route('payments.store'), {
        onSuccess: () => {
            show.value = false
            toast('success', 'Pago Registrado con exito')
        }
    })
}

const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}
getServices()

const servicesNoPaiyment = ref([]);

const getServicesNoPayment = () => {
    axios.get(route('get.services.no.payment')).then(response => {
        servicesNoPaiyment.value = Object.values(response.data.bookingNoPayment);
    });
}

getServicesNoPayment()

const columns = [
    {
        header: 'Servicio',
        field: 'payable.service',
        filter: true,
    },
    {
        header: 'Cliente',
        field: 'payable.cliente_name',
        filter: true,
    },
    {
        header: 'Tipo de Pago',
        field: 'type',
        filter: true,
        format: (value) => {
            return value.toUpperCase()
        }
    },
    {
        header: 'Monto',
        field: 'amount',
        type: 'currency',
        filter: true,
    },
    {
        header: 'Metodo de Pago',
        field: 'metohd_payment.name',
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
        filter: true, sortable: true, type: 'tag', filtertype: 'EQUALS',
        class: 'text-center uppercase',
        severitys: [
            { text: 'Pendiente', severity: 'danger', class: '' },
            { text: 'Confirmado', severity: 'success', class: '' },
            // { text: 'DISEÑO', severity: 'info', class: '' },
            // { text: 'GARANTIA', severity: 'warning', class: '' },
            // { text: 'SERVICIO POSTVENTA', severity: 'success', class: '' },
            // { text: 'SIN ESTADO', severity: 'danger', class: 'animate-pulse' }
        ]
    },


]

const getMethos = () => {
    axios.get(route('paymentMethods.index'))
        .then(response => {
            methods.value = response.data
        })
        .catch(error => {
            console.log(error)
        })
}
getMethos()


</script>

<template>
    <AppLayout title="Pagos">
        <div class="h-[99vh]">
            <Datatable :add :columnas="columns" :actions="buttons" :data="payments" title="Pagos">
            </Datatable>
        </div>
        <Modal v-model="show" title="Añadir Pagos">
            <form >
                <div class="flex flex-col gap-y-4">
                    <!-- <label for="payable_id" class="block text-sm font-medium text-gray-700">Servicio</label> -->
                    <div>
                        <label for="" class="font-bold">Servicio</label>
                        <Select :options="servicesNoPaiyment" filter showClear v-model="form.payable_id" class="w-full"
                            option-label="service" placeholder="Seleccione un servicio">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex items-center">
                                    <div>{{ slotProps.value.service }} - {{ slotProps.value.cliente_name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex justify-between w-full items-center">
                                    <div>
                                        <p>
                                            {{ slotProps.option.service }} - {{ slotProps.option.cliente_name }}
                                        </p>
                                        <p class="text-xs">
                                            {{ slotProps.option.date }} {{ slotProps.option.hour }}
                                        </p>
                                    </div>
                                    <div>{{ slotProps.option.total_price_sales }}</div>
                                </div>
                            </template>

                        </Select>
                    </div>
                    <Input label="Monto" v-model="form.amount" mode="currency" type="number" required/>
                    <Input label="Medio de Pago" class="w-full" min="0"  type="dropdown" option-label="name"
                        option-value="id" :options="methods" v-model="form.method" required />
                    <Input checkboxLabel="Pago Verificado" v-model="form.validatePay" type="checkbox" required/>
                </div>
            </form>
            <template #footer>
                <div class="flex gap-x-4">
                    <Button label="Cancelar" size="small" severity="danger" icon="pi pi-times" @click="show = false"/>
                    <Button label="Guardar" size="small" severity="success" icon="pi pi-save" @click="submit"/>
                </div>
            </template>
        </Modal>
        
    </AppLayout>
</template>
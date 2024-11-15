<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :actions="buttons" :add :columnas="columns" :data="bookingServices" routecreate="services.create"
                title="Reservas">
            </Datatable>
        </div>
        <Modal v-model="show" title="Añadir Reserva" width="70vw">
            <form @submit.prevent="reservar" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center" novalidate>
                <Input type="dropdown" v-model="service_id" :error-message="errors.service_id" label="Servicio"
                    option-label="title" option-value="id" :options="services" v-bind="serviceIdAttrs"></Input>

                <Input label="Fecha de Reserva" :disabled-dates="disabledDates" v-model="date" required
                    :min-date="new Date()" class="w-full" type="date" :error-message="errorDate" v-bind="dateAttrs" />

                <Input label="Pasajeros" type="number" v-model="adults"></Input>
                <Input label="Niños" type="number" v-model="boys"></Input>
                <Input label="Nombre del Pasajero" v-bind="nameAttrs" v-model="cliente_name"
                    :error-message="errors.cliente_name" class="w-full" />
                <Input label="Telefono" v-model="cliente_phone" v-bind="phoneAttrs"
                    :error-message="errors.cliente_phone" class="w-full" type="number" />
                <Input label="Ciudad de donde Proviene" v-bind="cityAttrs" v-model="cliente_city"
                    :error-message="errors.city" class="w-full" />
                <Input label="Edificio u Hotel" class="w-full" v-bind="buildingAttrs" v-model="cliente_building"
                    :error-message="errors.cliente_building" />
                <Input type="time" label="Hora de Actividad" class="w-full" v-bind="hourAttrs" v-model="hour"
                    :error-message="errors.hour" />

                <Input class="w-full" label="Abono" v-bind="abonoAttrs" v-model="abono" :error-message="errors.abono"
                    min="1" type="number" />
                <Input class="w-full" min="0" v-bind="methodAttrs" type="dropdown" option-label="name" option-value="id"
                    :options="methods" v-model="method" label="Medio de Pago" />
                <div class="">
                    <h1 class="text-xl  font-mono font-semibold"> Precio total: {{ COP.format(totalCost) }}
                    </h1>
                </div>
                <div class="mt-4 w-full col-sapn-1 md:col-span-3">
                    <h1 class="text-xl font-mono font-semibold text-center"> 
                        Proveedores <Button icon="fa-solid fa-plus" outlined=""  severity="success" class="size-6" @click="addProveedor()" /> </h1>
                    <div class="flex justify-between w-full font-bold">
                        <label for="" >Proveedor</label>
                        <label for="">Costo</label>
                        <label for="">.</label>
                    </div>
                    <div v-for="(p, index) in proveedorsAdd" class="flex justify-between gap-x-4">
                        <Input type="dropdown" v-model="p.proveedor" :error-message="errors.proveedor"
                            option-label="nombre" option-value="id" class="w-full" :options="proveedors"></Input>
                        <Input type="number" mode="currency" class="w-full" v-model="p.costo" :error-message="errors.costo" ></Input>
                        <Button icon="fa-solid fa-xmark-circle" class="w-full" v-tooltip="`Quitar`" text severity="danger" @click="removeProveedor(index)"/>
                    </div>
                </div>
                <div class="flex justify-end mt-4 w-full col-sapn-1 md:col-span-3">
                    <Button type="submit" severity="success" label="Guardar" :loading />
                </div>
            </form>

        </Modal>
        <Toast></Toast>
        <Drawer v-model:visible="info" pt:root:class="!bg-blue-100" header="Detalles de la actividad" position="right">
            <template #header>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-lg">{{ service.service.title }}</span>
                </div>
            </template>
            <div class="flex flex-col gap-y-1.5 text-sm">

                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Fecha del Servicio:</strong>
                    <p>{{ service.date }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Hora del Servicio:</strong>
                    <p>{{ service.hour }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Cliente:</strong>
                    <p>{{ service.cliente_name }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Ciudad:</strong>
                    <p>{{ service.cliente_city }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Telelfono:</strong>
                    <a :href="`tel://${service.cliente_phone}`">{{ service.cliente_phone }}</a>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Edificio:</strong>
                    <p>{{ service.cliente_building }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Adultos:</strong>
                    <p>{{ service.adults }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Niños:</strong>
                    <p>{{ service.boys }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Valor:</strong>
                    <p>{{ COP.format(service.total_price) }}</p>
                </div>
                <div v-if="service.user" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Vendedor:</strong>
                    <p>{{ service.user?.name }}</p>
                </div>
                <div v-if="service.user" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Fecha de reserva:</strong>
                    <p>{{ new Date(service.created_at).toLocaleDateString('es-CO') }}</p>
                </div>
                <div class="flex flex-col gap-y-2 mt-2 ">
                    <div class="flex justify-between">
                        <h2 class="text-xl font-bold ">Pagos Realizados </h2>
                        <div class="bg-blue-600 text-white p-1 rounded-lg">
                            {{ COP.format(service.payments.reduce((a, b) => a + b.amount, 0)) }}
                        </div>
                    </div>
                    <div class="flex items-center text-xs justify-between border shadow-xl rounded-md p-1 bg-white"
                        v-for="payment in service.payments">
                        <div>
                            <div class="uppercase font-bold">
                                {{ payment.type }} {{ COP.format(payment.amount) }}
                            </div>
                            <div>
                                {{ new Date(payment.created_at).toLocaleDateString('es-CO') }} {{
                                    payment.metohd_payment.name }}
                            </div>

                        </div>
                        <div class="uppercase"
                            :class="payment.status == 'pendiente' ? 'bg-red-500 p-1 text-white rounded-lg shadow-md shadow-red-500' : ''">
                            {{ payment.status }}
                            <div>

                            </div>
                        </div>
                        <!-- {{ payment }} -->
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex flex-col items-center gap-2">
                    <h1 class="font-bold text-center">Saldo: {{ COP.format(service.total_price -
                        service.payments.reduce((a, b) => a + b.amount, 0)) }}</h1>
                    <div class="flex gap-x-2">
                        <Button @click="setState('COMPLETADA', true)" icon="fa-solid fa-circle-check" text size="large"
                            v-tooltip.top="'Completar Servicio'" class="flex-auto" severity="success" />
                        <Button @click="setState('NO SHOW', true)" icon="fa-solid fa-eye-slash" text size="large"
                            v-tooltip.top="'Servicio No show'" class="flex-auto" severity="warn" />
                        <Button @click="setState('CANCELADA', true)" icon="fa-solid fa-xmark-circle" text size="large"
                            v-tooltip.top="'Cancelar Servicio'" class="flex-auto" severity="danger" />
                        <Button @click="setState('PROBLEMATICA', false)" icon="fa-solid fa-person-dress-burst" text
                            size="large" v-tooltip.top="'Servicio Problematico'" class="flex-auto" severity="danger" />
                        <!-- <Button label="Registrar Pago" icon="pi pi-sign-out" class="flex-auto" severity="success"  /> -->
                    </div>
                </div>
            </template>
        </Drawer>
    </AppLayout>
</template>
<script setup>
import Datatable from '@/Components/Customs/Datatable.vue';
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import Toast from 'primevue/toast';
import * as yup from 'yup';
import { alerts } from '@/composable/toasts';
import { useForm } from 'vee-validate';
import Swal from 'sweetalert2';

const props = defineProps({
    bookingServices: Array
})
const { toast } = alerts()
const info = ref(false);
const service = ref({});
const COP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});
const show = ref(false);
const add = {
    action: () => {
        show.value = true;
    },
}
const methods = ref([]);

// #region Validates

const schema2 = yup.object({
    service_id: yup.string().required(),
    date: yup.date().required(),
    adults: yup.number().required(),
    date: yup.date().required(),
    adults: yup.number().required(),
    cliente_name: yup.string().required(),
    cliente_phone: yup.string().required(),
    cliente_city: yup.string().required(),
    cliente_building: yup.string().required(),
    hour: yup.string().required(),
    abono: yup.number().required(),
    method: yup.string().required(),
});

const { values, defineField, errors, meta } = useForm({
    validationSchema: schema2,
});
// #endregion

// #region Fields
const [service_id, serviceIdAttrs] = defineField('service_id');
const [date, dateAttrs] = defineField('date');
const [boys, boysAttrs] = defineField('boys');
const [adults, adultsAttrs] = defineField('adults');
const [cliente_name, nameAttrs] = defineField('cliente_name');
const [cliente_phone, phoneAttrs] = defineField('cliente_phone');
const [cliente_city, cityAttrs] = defineField('cliente_city');
const [cliente_building, buildingAttrs] = defineField('cliente_building');
const [hour, hourAttrs] = defineField('hour');
const [abono, abonoAttrs] = defineField('abono');
const [method, methodAttrs] = defineField('method');

boys.value = 0;
adults.value = 1;

const proveedorsAdd = ref([
    {
        proveedor: null,
        costo: ''
    }
]);

// #endregion

const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}

const addProveedor = () => {
    proveedorsAdd.value.push({
        proveedor: null,
        costo: ''
    })
}

const removeProveedor = (index) => {
    if(index == 0) return;
    proveedorsAdd.value.splice(index, 1);
}

const proveedors = ref([]);

const getProveedors = () => {
    axios.get(route('proveedors.index'))
        .then(response => {
            proveedors.value = response.data.proveedors
        })
        .catch(error => {
            console.log(error)
        })
}
getProveedors()

getServices()

const buttons = [
   
    {
        label: 'Detalles',
        action: (data) => {
            service.value = data;
            info.value = true;
        },
        icon: 'fa-solid fa-circle-info text-sm',
        severity: "info"
        // class: 'p-button-warning text-sm'
    },
    {
        label: 'Editar',
        action: (data) => {
            date.value = data.date;
            service_id.value = data.service_id;
            adults.value = data.adults
            boys.value = data.boys;
            cliente_name.value = data.cliente_name;
            cliente_phone.value = data.cliente_phone;
            cliente_city.value = data.cliente_city;
            cliente_building.value = data.cliente_building;
            hour.value = data.hour;
            service.value = data;
            show.value = true;
        },
        icon: 'fa-solid fa-pencil text-sm',
        severity: "warn"
        // class: 'p-button-warning text-sm'
    },
    // {
    //     label: 'Registrar Pago',
    //     action: (data) => {
    //         form.service_id = data.id;
    //         show.value = true;
    //     },
    //     icon: 'fa-solid fa-dollar text-sm',
    //     severity: "success"
    //     // class: 'p-button-warning text-sm'
    // },
    {
        label: 'Problematica',
        action: (data) => {
            var marcar = data.problematic ? 'Desmarcar' : 'Marcar';
            Swal.fire({
                title: "Estas Seguro?",
                text: `${marcar} como problematica esta reservación!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: `Si, ${marcar}!`
            }).then((result) => {
                if (result.isConfirmed) {
                    router.post(route('booking.problematic', data.id), {
                        onSuccess: () => {
                            toast('success', 'Reserva Marcada como problematica');
                        }
                    })

                }
            });
        },
        icon: 'fa-solid fa-person-dress-burst text-sm',
        severity: "danger"
        // class: 'p-button-warning text-sm'
    }
]

const columns = [
    {
        field: 'cliente_name',
        header: 'Nombre del pasajero',
        filter: true,
        sortable: true

    },
    {
        field: 'cliente_building',
        header: 'Edificio u Hotel',
        filter: true,
        sortable: true
    },
    {
        field: 'service.title',
        header: 'Actividad',
        filter: true,
        sortable: true
    },
    {
        field: 'date',
        header: 'Fecha de la Actividad',
        filter: true,
        sortable: true,
        type: 'date'
    },
    {
        field: 'created_at',
        header: 'Fecha Entrada',
        filter: true,
        sortable: true,
        type: 'date'
    },
    {
        field: 'problematic',
        header: 'Problematica',
        filter: true,
        sortable: true,
        type: 'boolean',
    },
    {
        field: 'status',
        header: 'Estado',
        filter: true, sortable: true, type: 'tag', filtertype: 'EQUALS',
        class: 'text-center uppercase',
        severitys: [
            { text: 'reservado', severity: 'info', class: '' },
            { text: 'COMPLETADA', severity: 'success', class: '' },
            { text: 'DISEÑO', severity: 'info', class: '' },
            { text: 'NO SHOW', severity: 'warn', class: '' },
            { text: 'SERVICIO POSTVENTA', severity: 'success', class: '' },
            { text: 'CANCELADA', severity: 'danger', class: 'animate-pulse' }
        ]
    },
    // {
    //     field: 'payment',
    //     header: 'Pago',
    //     sortable: true,
    //     filter: true,
    //     type: 'tag', filtertype: 'EQUALS',
    //     class: 'text-center uppercase',
    //     severitys: [
    //         { text: 'pendiente', severity: 'danger', class: '' },
    //     ]
    // },

]

const totalCost = computed(() => {
    let serv = services.value.find(service => service.id == service_id.value);
    if (!serv) return 0;
    return serv.adult_tarifa * adults.value + serv.boy_tarifa * boys.value;
})

const loading = ref(false);

const reservar = (event) => {
    event.preventDefault();
    loading.value = true
    router.post(route('reservar', {proveedors: proveedorsAdd.value}), values, {
        onSuccess: () => {
            loading.value = false;
            show.value = false;
            toast('success', 'Reserva creada con exito');
        },
    })
}

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

const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
};

const disabledDates = computed(() => {
    var dates = [];
    var selectedProduct = services.value.find(service => service.id == service_id.value);
    if (!selectedProduct) return [];
    for (var lock of selectedProduct.locks) {
        var start = parseDate(lock.start_date);
        var end = parseDate(lock.end_date);
        for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }
    }
    return dates;
})


const setState = (state, terminated) => {
    Swal.fire({
        title: state,
        text: "Estas seguro de realizar esta acción?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: state,
                text: "Esta reserva ha sido " + state + ".",
                icon: "success"
            });

            router.post(route('set.states'), {
                service: service.value.id,
                state: state,
                terminated: terminated
            }, {
                onSuccess: () => {
                    info.value = false;
                    toast('success', 'Reserva ' + state);
                }
            })
        }
    });
}

</script>
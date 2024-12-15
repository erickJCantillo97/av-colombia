<template>
    <AppLayout title="Services">
        <div class="h-[99vh]">
            <Datatable :actions="buttons" :add :columnas="columns" :data="bookingServices" routecreate="services.create"
                title="Reservas">
            </Datatable>
        </div>
        <Modal v-model="show" title="Añadir Reserva" width="70vw">
            <form class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center" novalidate>
                <Input type="dropdown" v-model="form.service_id" :error-message="form.errors.service_id"
                    label="Servicio" option-label="title" option-value="id" @value-change="getProveedors"
                    :options="services"></Input>

                <Input label="Fecha de Reserva" :enableTimePicker="true" :disabled-dates="disabledDates"
                    v-model="form.date" required :min-date="new Date()" class="w-full" type="datetime" />

                <Input label="Valor Total" type="number" mode="currency" v-model="form.total"></Input>
                <Input label="Pasajeros" type="number" v-model="form.adults"></Input>
                <Input label="Niños" type="number" v-model="form.boys"></Input>
                <Input label="Nombre del Pasajero" v-model="form.cliente_name" :error-message="form.errors.cliente_name"
                    class="w-full" />
                <Input label="Telefono" v-model="form.cliente_phone" :error-message="form.errors.cliente_phone"
                    class="w-full" type="number" />
                <Input label="Ciudad de donde Proviene" v-model="form.cliente_city" :error-message="form.errors.city"
                    class="w-full" />
                <Input label="Edificio u Hotel" class="w-full" v-model="form.cliente_building"
                    :error-message="form.errors.cliente_building" />
                <!-- <Input label="Mascota" class="w-full" v-model="form.mascota" :error-message="form.errors.mascota" /> -->
                <!-- <Input label="Persona Adicional" class="w-full" v-model="form.persona_adicional"
                    :error-message="form.errors.persona_adicional" />

                <Input label="Cobro por transacción" type="number" class="w-full" v-model="form.cobre_transaccion"
                    :error-message="form.errors.cobre_transaccion" /> -->

                <!-- <Input label="Extra por Daños cobrados al cliente" type="number" class="w-full"
                    v-model="form.cobro_extra_cliente" :error-message="form.errors.cobro_extra_cliente" /> -->

                <!-- <Input v-if="$page.props.auth.user.rol == 'admin'" class="w-full" label="Saldo" v-model="form.abono"
                    :error-message="form.errors.abono" min="1" type="number" /> -->
                {{ form.method }}
                <Input v-if="$page.props.auth.user.rol == 'admin'" class="w-full" min="0" type="dropdown"
                    option-label="name" option-value="id" :options="methods" v-model="form.method_id"
                    label="Medio de Pago" />
                <Input v-if="$page.props.auth.user.rol == 'admin'" class="w-full" min="0" type="dropdown"
                    option-label="name" option-value="id" :options="channels" v-model="form.channel_id"
                    label="Canal de Venta" />
                <Input v-if="$page.props.auth.user.rol == 'admin'" class="w-full" label="Descuento"
                    v-model="form.percent_descuento" :error-message="form.errors.percent_descuento" min="0" max="100"
                    type="number" suffix=" %" />
                <Input v-if="$page.props.auth.user.rol == 'admin'" class="w-full col-span-1 md:col-span-4"
                    :rows-textarea="2" label="Observaciones" v-model="form.observations"
                    :error-message="form.errors.observations" type="textarea" />
                <div class="w-full col-span-1 md:col-span-4 flex justify-between gap-x-2 items-center">
                    <div class="w-full flex flex-col justify-center items-center p-2 shadow-lg border">
                        <p class="text-lg  font-mono font-semibold"> {{ COP.format(totalPax) }}
                        </p>
                        <p class="italic text-md">
                            Valor Pasajero
                        </p>
                    </div>
                    <div class="w-full flex flex-col justify-center items-center p-2 shadow-lg border">
                        <p class="text-lg  font-mono font-semibold"> {{ COP.format(valorReal) }}
                        </p>
                        <p class="italic text-md">
                            Valor Real
                        </p>
                    </div>
                </div>
                <div class="mt-4 w-full col-span-1 md:col-span-4 rounded-lg" v-if="form.service_id">
                    <!-- && services.find(x => x.id == form.service_id).type == 'Transfer' -->
                    <div class="flex  gap-x-2">
                        <Input label="Placa del Vehiculo" v-model="form.vehicle_plate" class="w-full" />
                        <Input label="Nombre del Conductor" v-model="form.driver_name" class="w-full" />
                    </div>

                </div>
                <div class="mt-4 w-full col-span-1 md:col-span-4 border rounded-lg"
                    v-if="$page.props.auth.user.rol == 'admin'">
                    <h1
                        class="text-2xl font-mono font-semibold text-center bg-black rounded-t-lg text-white gap-x-3 p-2">
                        Proveedores <Button icon="fa-solid fa-plus" outlined="" severity="success" class="size-6"
                            @click="addProveedor()" /> </h1>
                    <div class="flex justify-between w-full font-bold px-2">
                        <label for="">Proveedor</label>
                        <label for="">Costo</label>
                        <label for="">.</label>
                    </div>
                    <div v-for="(p, index) in proveedorsAdd" class="flex justify-between gap-x-4 px-2">
                        <Input type="dropdown" v-model="p.proveedor" @value-change="selectedProveedor(p)"
                            option-label="nombre" option-value="id" class="w-full" :options="proveedors"></Input>
                        <Input type="number" mode="currency" class="w-full" v-model="p.costo"></Input>
                        <Button icon="fa-solid fa-xmark-circle" class="w-full" v-tooltip="`Quitar`" text
                            severity="danger" @click="removeProveedor(index)" />
                    </div>
                </div>


            </form>
            <template #footer>
                <div class="flex justify-end gap-x-2 mt-4 w-full">
                    <Button @click="show = false" severity="danger" label="Cancelar" :loading />
                    <Button type="submit" severity="success" label="Guardar" :loading @click="reservar" />
                </div>
            </template>
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
                    <strong>Canal de Venta:</strong>
                    <p>{{ service.channel.name }}</p>
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
                    <strong>Mascota:</strong>
                    <p>{{ service.mascota }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Total:</strong>
                    <p>{{ COP.format(service.total) }}</p>
                </div>
                <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Total Real:</strong>
                    <p>{{ COP.format(service.total_real) }}</p>
                </div>
                <div v-if="service.user" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Vendedor:</strong>
                    <p>{{ service.user?.name }}</p>
                </div>
                <div v-if="service.user" class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <strong>Fecha de reserva:</strong>
                    <p>{{ new Date(service.created_at).toLocaleDateString('es-CO') }}</p>
                </div>
                <div class="text-lg flex w-full justify-between mt-2" v-if="$page.props.auth.user.rol == 'admin'">
                    <p class="font-bold">
                        Proveedores
                    </p>
                    <p class="rounded-full bg-black text-white px-2">
                        {{ service.proveedors.length }}
                    </p>
                    <!-- {{ service.proveedors }} -->
                </div>
                <div v-for="proveedor in service.proveedors" v-if="$page.props.auth.user.rol == 'admin'"
                    class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
                    <p>
                        {{ proveedor.proveedor.nombre }}
                    </p>
                    <p>
                        {{ COP.format(proveedor.cost) }}
                    </p>

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
                    <div class="flex gap-x-2" v-if="$page.props.auth.user.rol == 'admin'">
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
import { Link, router, useForm, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import Toast from 'primevue/toast';
import { alerts } from '@/composable/toasts';
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
        form.reset();
        show.value = true;
    },
}
const methods = ref([]);

// #region Validates


const form = useForm({
    service_id: null,
    date: '',
    adults: 1,
    boys: 0,
    cliente_name: '',
    cliente_phone: '',
    cliente_city: '',
    cliente_building: '',
    // hour: '',
    mascota: 0,
    persona_adicional: 0,
    cobre_transaccion: 0,
    cobro_extra_cliente: 0,
    reserva: 0,
    abono: 0,
    method_id: '',
    channel_id: '9d99a95f-6c3d-48fd-aa7d-6ef4e6860123',
    percent_descuento: 0,
    proveedors: [],
    total: 0,
    total_real: 0,
    percent_channel: 0,
    observations: ''
})


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
        services.value = response.data.services;
    });
}

const addProveedor = () => {
    proveedorsAdd.value.push({
        proveedor: null,
        costo: ''
    })
}

const removeProveedor = (index) => {
    if (index == 0) return;
    proveedorsAdd.value.splice(index, 1);
}

const proveedors = ref([]);
const channels = ref([]);

const getProveedors = () => {
    axios.get(route('get.proveedors', form.service_id))
        .then(response => {
            proveedors.value = response.data.proveedors
        })
        .catch(error => {
            console.log(error)
        })
}

const selectedProveedor = (proveedor) => {
    // console.log(proveedor, proveedors.value.find(p => p.id == proveedor.proveedor));

    proveedor.costo = proveedors.value.find(p => p.id == proveedor.proveedor).pivot.value * form.adults;
}

const getChannels = () => {
    axios.get(route('channels.index'))
        .then(response => {
            channels.value = response.data
        })
        .catch(error => {
            console.log(error)
        })
}

getServices()

getChannels()

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
            // form.date = data.date + ',' + data.hour;
            form.service_id = data.service_id;
            form.cliente_name = data.cliente_name;
            form.cliente_phone = data.cliente_phone;
            form.cliente_city = data.cliente_city;
            form.cliente_building = data.cliente_building;
            form.adults = data.adults;
            form.total = data.total
            form.method_id = data.method_id;
            form.channel_id = data.channel_id;
            form.percent_descuento = data.percent_descuento;
            form.proveedors = data.proveedors;
            proveedorsAdd.value = data.proveedors;
            form.observations = data.observations;


            // adults.value = data.adults
            // boys.value = data.boys;
            // cliente_name.value = data.cliente_name;
            // cliente_phone.value = data.cliente_phone;
            // cliente_city.value = data.cliente_city;
            // cliente_building.value = data.cliente_building;
            // hour.value = data.hour;
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
        show: usePage().props.auth.user.rol == 'admin',
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

const totalPax = computed(() => {
    return form.total / form.adults;
})

const valorReal = computed(() => {
    let chanel = channels.value.find(channel => channel.id == form.channel_id);
    let chanelValue = (chanel ? chanel.percent / 100 : 0);
    return form.total - (form.total * chanelValue);
})

const loading = ref(false);

const reservar = (event) => {
    event.preventDefault();
    form.total_real = valorReal.value;
    form.percent_channel = channels.value.find(channel => channel.id == form.channel_id).percent;
    loading.value = true
    form.proveedors = proveedorsAdd.value;
    form.post(route('reservar'), {
        onSuccess: () => {
            loading.value = false;
            show.value = false;
            toast('success', 'Reserva creada con exito');
        },
        onError: () => {
            loading.value = false;
            toast('error', 'Error al crear la reserva');
        }
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
    var selectedProduct = services.value.find(service => service.id == form.service_id);
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

watch(form.adults, (newAdults) => {
    for (var p of proveedorsAdd.value) {
        if (p.proveedor) {
            p.costo = proveedors.value.find(prov => prov.id == p.proveedor).pivot.value * newAdults;
        }
    }
})

</script>
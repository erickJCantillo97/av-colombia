<template>
    <!-- <Header /> -->
    <div class="bg-gray-50 py-5 overflow-y-auto">

        <div class="m-auto max-w-2xl px-4  sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="sr-only">Checkout</h2>

            <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-4 overflow-y-auto" @submit.prevent="handleSubmit">
                <div>
                    <div class="flex items-center justify-start gap-x-2">
                        <!-- <Link :href="route('/')">
            Volver
            </Link> -->
                        <h2 class="text-lg font-medium text-gray-900">Información del pasajero principal</h2>
                    </div>

                    <div class="mt-4 border-t border-gray-200 pt-1">

                        <div class="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
                            <Input label="Nombres" v-model="formReserva.cliente_name" :required="true" />
                            <Input label="Apellidos" v-model="formReserva.cliente_last_name" :required="true" />
                            <Input label="Correo" v-model="formReserva.cliente_email" type="email" class="sm:col-span-2"
                                :required="true" />
                            <Input label="Hotel" v-model="formReserva.cliente_building" class="sm:col-span-2"
                                :required="true" />
                            <Input label="Pais o Ciudad de Origen" v-model="formReserva.cliente_city"
                                :required="true" />
                            <Input label="Telefono" type="number" v-model="formReserva.cliente_phone"
                                :required="true" />
                        </div>
                    </div>

                    <div class="mt-4 border-t border-gray-200 p-1">
                        <fieldset>
                            <legend class="text-lg font-medium text-gray-900">Forma de Pago</legend>
                            <RadioGroup v-model="selectedDeliveryMethod"
                                class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                <RadioGroupOption as="template" v-for="deliveryMethod in deliveryMethods"
                                    :key="deliveryMethod.id" :value="deliveryMethod" :aria-label="deliveryMethod.title"
                                    :aria-description="`${deliveryMethod.turnaround} for ${deliveryMethod.price}`"
                                    v-slot="{ active, checked }">
                                    <div :class="[
                                        checked ? 'border-transparent' : 'border-gray-300',
                                        active ? 'ring-2 ring-indigo-500 bg-indigo-500 text-white transition-colors duration-150' : 'bg-white',
                                        'relative flex cursor-pointer rounded-lg border  p-4 shadow-sm focus:outline-none',
                                    ]">
                                        <span class="flex flex-1">
                                            <span class="flex flex-col">
                                                <span class="block text-sm font-medium text-gray-900" :class="{
                                                    'text-white': active,
                                                    'text-gray-900': !active
                                                }">{{
                                                    deliveryMethod.title
                                                }}</span>
                                                <span class="mt-1 flex items-center text-sm " :class="{
                                                    'text-white': active,
                                                    'text-gray-500': !active
                                                }">{{
                                                    deliveryMethod.turnaround
                                                }}</span>

                                            </span>
                                        </span>
                                        <!-- <CheckCircleIcon v-if="checked" class="size-5 text-indigo-600" aria-hidden="true" /> -->
                                        <span :class="[
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-indigo-500 ' : 'border-transparent',
                                            'pointer-events-none absolute -inset-px rounded-lg',
                                        ]" aria-hidden="true" />
                                    </div>
                                </RadioGroupOption>
                            </RadioGroup>
                        </fieldset>
                    </div>


                </div>

                <div class="mt-10 lg:mt-0 flex flex-col">
                    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm"
                        v-if="selectedDeliveryMethod.id != 2">
                        <div class="p-4">
                            <h3 class="text-lg font-medium text-gray-900">Instrucciones de pago</h3>
                            <div v-if="selectedDeliveryMethod.id == 1" class="mt-2 text-md text-gray-600">
                                <p>Realice su pago directamente en nuestras oficinas:</p>
                                <p class="text-gray-900 font-bold">Av. Santander Cra 1 #46-50, Marbella, Cartagena de
                                    Indias.</p>
                                <p>Una vez confirmado el pago, recibirá un comprobante y los detalles de su reserva por
                                    correo
                                    electrónico.</p>
                            </div>
                            <div v-else-if="selectedDeliveryMethod.id == 3" class="mt-2 text-md text-gray-600 gap-y-2">
                                <div class="flex-col text-center items-center gap-x-2 w-full">
                                    <p>Las transacciones y giros se haran a nombre de:</p>
                                    <div class="flex justify-between gap-x-2 w-full">
                                        <div class="w-full p-2 rounded-md flex justify-center items-center gap-x-2">
                                            <p class=" font-medium border px-4 rounded-lg bg-gray-800 text-white">
                                                Melissa Zurita</p>
                                            <p class="font-medium border px-4 rounded-lg bg-gray-800 text-white">CC:
                                                1047475135</p>
                                        </div>

                                    </div>
                                </div>
                                <p>Los canales disponibles son</p>
                                <div class="flex justify-between gap-x-2 w-full">
                                    <div class="shadow-xl w-full p-2 rounded-md text-sm gap-y-2 flex flex-col">
                                        <p class="text-gray-900 font-medium">Bancolombia</p>
                                        <p class="text-gray-700">Cuenta de Ahorros</p>
                                        <p class="text-gray-900">Numero: 678 0000 8810</p>

                                    </div>
                                    <div class="flex flex-col justify-center shadow-xl w-full p-2 rounded-md text-sm">
                                        <p class="text-center text-gray-900 font-medium">Para giros</p>
                                        <div class="flex justify-center gap-x-2 w-full">
                                            <img v-tooltip="`Almacenes Exito`" src="/exito.png" alt="Bancolombia"
                                                class="w-16 h-16 object-contain">
                                            <img v-tooltip="`Western Union`" src="/western.png" alt="Bancolombia"
                                                class="w-16 h-16 object-contain rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex-col items-start justify-start p-2 rounded-lg border border-gray-200 bg-white shadow-sm"
                        v-if="selectedDeliveryMethod.id == 3">
                        <h2 class="border-b border-gray-200 pb-2 mb-2 text-lg font-medium text-gray-900">Comprobante de
                            Pago</h2>
                        <label class="w-full">
                            <input @change="previewFiles" type="file" class="text-sm text-grey-500
              file:py-3 file:px-10
              file:rounded-md file:border-0
              file:text-md file:font-semibold  file:text-white
              file:bg-gray-800
              hover:file:cursor-pointer hover:file:opacity-80" />
                        </label>
                    </div>
                    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div>
                            <h2 class="text-lg  text-gray-900 mx-4 mt-2 font-bold text-center">Resumen de reserva</h2>
                            <span class="flex gap-2 justify-center">
                                <p class="text-center  text-gray-500">Fecha:

                                </p>
                                <p class="text-center  text-gray-500">Hora:
                                    <strong>
                                        {{ formReserva.hour }}
                                    </strong>
                                </p>
                            </span>
                            <p class="text-center  text-gray-500">Servicio:
                                <strong>
                                    {{ formReserva.service_name }}
                                </strong>
                            </p>
                            <span v-if="service.type == 'TRANSPORTE'" class="flex gap-2 justify-center">
                                <p class="text-center  text-gray-500">Origen:
                                    <strong>
                                        {{ formReserva.origin }}
                                    </strong>
                                </p>
                                <p class="text-center  text-gray-500">Destino:
                                    <strong>
                                        {{ formReserva.destination }}
                                    </strong>
                                </p>
                            </span>
                            <span class="flex justify-center gap-2">
                                <p class="text-center text-gray-500">Niños:
                                    <strong>
                                        {{ formReserva.children }}
                                    </strong>
                                </p>
                                <p class="text-center text-gray-500">Adultos:
                                    <strong>
                                        {{ formReserva.adults }}
                                    </strong>
                                </p>
                                <p class="text-center  text-gray-500">Infantes:
                                    <strong>
                                        {{ formReserva.infants }}
                                    </strong>
                                </p>
                            </span>
                        </div>
                        <h3 class="sr-only">Personas de la reserva</h3>
                        <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div class="flex items-center justify-between">
                                <dt class="">Subtotal</dt>
                                <dd class=" font-medium text-gray-900">
                                    <span>
                                        {{ formatCurrency(formReserva.price_service) }}
                                    </span>
                                </dd>
                            </div>
                            <div class="flex items-center justify-between">
                                <dt class="">Extras</dt>
                                <dd class=" font-medium text-gray-900">
                                    <span>
                                        {{ formatCurrency(formReserva.extras) }}
                                    </span>
                                </dd>
                            </div>

                            <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt class="text-base font-medium">Total</dt>
                                <dd class="text-base font-medium text-gray-900">{{
                                    formatCurrency(formReserva.total_real) }}</dd>
                            </div>
                        </dl>
                        <div class="border-t border-gray-200 px-4 py-6 sm:px-6 space-y-3">
                            <button :disabled="totalCost == 0 || isLoading" type="submit"
                                class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span>{{ isLoading ? 'Procesando...' : 'Confirmar el Pago y Reservar' }}</span>
                            </button>
                            <a :href="route('show.services', props.service.slug)" 
                                class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                <span>Volver a Comprar</span>
                            </a>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import Input from "@/Components/Customs/Input.vue";
import searchStore from "@/store/searchStore.js";
import { router } from "@inertiajs/vue3";
import Swal from "sweetalert2";

// #endregion
const props = defineProps({
    service: Object,
});

const formReserva = ref({
    adults: searchStore.guests.value.adults,
    children: searchStore.guests.value.children,
    infants: searchStore.guests.value.infants,
    price_service: 0,
    service_name: props.service.title,
    service_id: props.service.id,
    total_real: 0,
    payment_method: 0,
    cliente_name: "",
    cliente_last_name: "",
    cliente_email: "",
    cliente_phone: "",
    extras: 0,
    soporte: '',
    date: searchStore.checkin.value,
})


function getPrice() {
   const maxCapacity = parseInt(props.service.capacidad_max)
   if (props.service.type === 'TOUR') {
       formReserva.value.price_service =   props.service.adults_price * (formReserva.value.adults  + formReserva.value.children);
    } else if (props.service.type === 'EMBARCACION') {
        formReserva.value.price_service =   props.service.adults_price;
    }if (props.service.type === 'TRANSFER') {
        formReserva.value.price_service =  props.service.adults_price * Math.ceil((formReserva.value.adults + formReserva.value.children) / maxCapacity);
    }
    formReserva.value.total_real = formReserva.value.price_service;
    return props.service.adults_price * formReserva.adults;
}

onMounted(() => {
    getPrice();
})

const soporte = ref('');
const isLoading = ref(false);



const deliveryMethods = [
    { id: 2, title: "T.Debito, T. Credito, PSE", turnaround: "El Pago se refleja de inmediato" },
    {
        id: 1,
        title: "Efectivo",
        turnaround: "Pagar en Oficinas",
    },
    {
        id: 3,
        title: "Giros y Consignaciones",
        turnaround: "Validaremos su pago una vez recibido.",
    },
];

const selectedDeliveryMethod = ref(deliveryMethods[0]);

const handleSubmit = () => {

    if(selectedDeliveryMethod.value.id == 3 && !formReserva.value.soporte){
        Swal.fire({
            title: "Comprobante Requerido",
            text: "Por favor adjunte el comprobante de pago.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Entendido",
        });
        return;
    }
    isLoading.value = true;

    const formData = new FormData();
    Object.keys(formReserva.value).forEach(key => {
        if (key === 'soporte' && formReserva.value[key] instanceof File) {
            formData.append(key, formReserva.value[key]);
        } else if (key !== 'soporte') {
            formData.append(key, formReserva.value[key]);
        }
    });
    formData.append('payment_method', selectedDeliveryMethod.value.id);
    axios.post(route('booking.reservar.by.api'), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        if (response.data.payment != null) {
            location.href = response.data.payment.data.payment.payment_url; // Redirigir al enlace de pago
        } else {
            console.log(response.data)
            router.get(route('booking.success', response.data.bookingService.id));
        }
    })
        .catch(error => {
            console.error("Error al generar el enlace de pago:", error);
            isLoading.value = false;
        })
        .finally(() => {
            // Solo desactivar si no hay redirección
            isLoading.value = false;

        });
};

function previewFiles(event) {
    soporte.value = event.target.files[0];
    formReserva.value.soporte = event.target.files[0];
    console.log(formReserva.value)
}

const formatCurrency = (value) => {
    // Convert input to number, defaulting to 0 if invalid
    const number = Number(value) || 0;

    // Format as Colombian Peso
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(number);
};


</script>

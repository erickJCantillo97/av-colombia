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
                            <Input label="Apellidos" v-model="formReserva.last_name" :required="true" />
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
                        <h2 class="text-lg  text-gray-900 mx-4 mt-2">Resumen de reserva de <strong>{{
                            formReserva.service_name
                        }}</strong></h2>
                        <h3 class="sr-only">Personas de la reserva</h3>
                        <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div class="flex items-center justify-between">
                                <dt class="text-sm">Subtotal</dt>
                                <dd class="text-sm font-medium text-gray-900">{{ formReserva.price_service }}</dd>
                            </div>
                            <div class="flex items-center justify-between">
                                <dt class="text-sm">Extras</dt>
                                <dd class="text-sm font-medium text-gray-900">$ 0</dd>
                            </div>

                            <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt class="text-base font-medium">Total</dt>
                                <dd class="text-base font-medium text-gray-900">{{ formReserva.total_real }}</dd>
                            </div>
                        </dl>
                        <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <button :disabled="totalCost == 0" type="submit"
                                class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                Confirmar el Pago y Reservar
                            </button>
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
    total_real: 0,
    payment_method: 0,
    cliente_name: "",
    cliente_last_name: "",
    cliente_email: "",
    cliente_phone: "",
})


function getPrice() {
    if (props.service.type == "EMBARCACION") {
        formReserva.value.price_service = props.service.adult_tarifa;
        formReserva.value.total_real = props.service.adult_tarifa;
    } else {
        var totalAdults = searchStore.guests.value.adults * props.service.adult_tarifa;
        var totalChildren = searchStore.guests.value.children * props.service.boy_tarifa;
        formReserva.value.price_service = totalAdults + totalChildren;
        formReserva.value.total_real = totalAdults + totalChildren;
    }
    // console.log(props.service.type );
}

onMounted(() => {
    getPrice();
})

const soporte = ref('');

const totalCost = computed(() => {
    return formReserva.adults * formReserva.price_service;
});

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
    //   formReserva.total_real = totalCost.value;
    //   formReserva.payment_method = selectedDeliveryMethod.value.id;
    //   axios.post(`/reservar/${route.params.id}`, formReserva)
    //     .then(response => {
    //       if (formReserva.payment_method === 2) {
    //         location.href = response.data.payment.data.payment.payment_url; // Redirigir al enlace de pago
    //       } else {
    //         router.push({ name: "success", params: { id: response.data.bookingService.id } });
    //       }
    //     })
    //     .catch(error => {
    //       console.error("Error al generar el enlace de pago:", error);
    //     });
};

function previewFiles(event) {
    soporte.value = event.target.files[0];
}


</script>

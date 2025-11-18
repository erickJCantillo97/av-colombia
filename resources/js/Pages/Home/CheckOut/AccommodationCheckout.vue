<template>
    <div class="bg-gray-50 py-5 overflow-y-auto min-h-screen">
        <div class="m-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="sr-only">Checkout Alojamiento</h2>

            <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-4 overflow-y-auto" @submit.prevent="handleSubmit">
                <div>
                    <div class="flex items-center justify-start gap-x-2">
                        <h2 class="text-lg font-medium text-gray-900">Información del huésped principal</h2>
                    </div>

                    <div class="mt-4 border-t border-gray-200 pt-1">
                        <div class="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
                            <Input label="Nombres" v-model="formBooking.guest_name" :required="true" />
                            <Input label="Apellidos" v-model="formBooking.guest_last_name" :required="true" />
                            <Input label="Correo" v-model="formBooking.guest_email" type="email" class="sm:col-span-2"
                                :required="true" />
                            <Input label="Teléfono" type="tel" v-model="formBooking.guest_phone" :required="true" />
                            <Input label="País de Origen" v-model="formBooking.guest_country" :required="true" />
                        </div>
                    </div>

                    <div class="mt-4 border-t border-gray-200 p-1">
                        <fieldset>
                            <legend class="text-lg font-medium text-gray-900">Forma de Pago</legend>
                            <RadioGroup v-model="selectedPaymentMethod"
                                class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                <RadioGroupOption as="template" v-for="method in paymentMethods" :key="method.id"
                                    :value="method" :aria-label="method.title" v-slot="{ active, checked }">
                                    <div :class="[
                                        checked ? 'border-transparent' : 'border-gray-300',
                                        active ? 'ring-2 ring-indigo-500 bg-indigo-500 text-white transition-colors duration-150' : 'bg-white',
                                        'relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none',
                                    ]">
                                        <span class="flex flex-1">
                                            <span class="flex flex-col">
                                                <span class="block text-sm font-medium" :class="{
                                                    'text-white': active,
                                                    'text-gray-900': !active
                                                }">{{ method.title }}</span>
                                                <span class="mt-1 flex items-center text-sm" :class="{
                                                    'text-white': active,
                                                    'text-gray-500': !active
                                                }">{{ method.description }}</span>
                                            </span>
                                        </span>
                                        <span :class="[
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-indigo-500' : 'border-transparent',
                                            'pointer-events-none absolute -inset-px rounded-lg',
                                        ]" aria-hidden="true" />
                                    </div>
                                </RadioGroupOption>
                            </RadioGroup>
                        </fieldset>
                    </div>

                    <!-- Instrucciones de pago -->
                    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm"
                        v-if="selectedPaymentMethod.id != 2">
                        <div class="p-4">
                            <h3 class="text-lg font-medium text-gray-900">Instrucciones de pago</h3>
                            <div v-if="selectedPaymentMethod.id == 1" class="mt-2 text-md text-gray-600">
                                <p>Realice su pago directamente en nuestras oficinas:</p>
                                <p class="text-gray-900 font-bold">Av. Santander Cra 1 #46-50, Marbella, Cartagena de
                                    Indias.</p>
                                <p>Una vez confirmado el pago, recibirá un comprobante y los detalles de su reserva por
                                    correo electrónico.</p>
                            </div>
                            <div v-else-if="selectedPaymentMethod.id == 3" class="mt-2 text-md text-gray-600 gap-y-2">
                                <div class="flex-col text-center items-center gap-x-2 w-full">
                                    <p>Las transacciones y giros se harán a nombre de:</p>
                                    <div class="flex justify-between gap-x-2 w-full">
                                        <div class="w-full p-2 rounded-md flex justify-center items-center gap-x-2">
                                            <p class="font-medium border px-4 rounded-lg bg-gray-800 text-white">
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
                                            <img v-tooltip="`Almacenes Exito`" src="/exito.png" alt="Exito"
                                                class="w-16 h-16 object-contain">
                                            <img v-tooltip="`Western Union`" src="/western.png" alt="Western Union"
                                                class="w-16 h-16 object-contain rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Comprobante de pago -->
                    <div class="mt-4 flex-col items-start justify-start p-2 rounded-lg border border-gray-200 bg-white shadow-sm"
                        v-if="selectedPaymentMethod.id == 3">
                        <h2 class="border-b border-gray-200 pb-2 mb-2 text-lg font-medium text-gray-900">Comprobante de
                            Pago</h2>
                        <label class="w-full">
                            <input @change="previewFiles" type="file" class="text-sm text-grey-500
                                file:py-3 file:px-10 file:rounded-md file:border-0
                                file:text-md file:font-semibold file:text-white
                                file:bg-gray-800 hover:file:cursor-pointer hover:file:opacity-80" />
                        </label>
                    </div>
                </div>

                <div class="mt-10 lg:mt-0 flex flex-col">
                    <div class="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div>
                            <h2 class="text-lg text-gray-900 mx-4 mt-2 font-bold text-center">Resumen de reserva</h2>
                            <div class="px-4 py-2">
                                <p class="text-center text-gray-500 font-medium">{{ accommodation.name }}</p>
                                <p class="text-center text-sm text-gray-500">{{ room.name }}</p>
                            </div>
                            <div class="px-4 space-y-1">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-500">Check-in:</span>
                                    <strong class="text-gray-900">{{ formatDate(checkIn) }}</strong>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-500">Check-out:</span>
                                    <strong class="text-gray-900">{{ formatDate(checkOut) }}</strong>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-500">Huéspedes:</span>
                                    <strong class="text-gray-900">{{ guests }}</strong>
                                </div>
                            </div>
                        </div>
                        <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div class="flex items-center justify-between">
                                <dt class="">{{ formatCurrency(room.price_per_night) }} x {{ nights }} noche{{
                                    nights > 1 ? 's' : '' }}</dt>
                                <dd class="font-medium text-gray-900">
                                    {{ formatCurrency(subtotal) }}
                                </dd>
                            </div>
                            <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt class="text-base font-medium">Total</dt>
                                <dd class="text-base font-medium text-gray-900">{{ formatCurrency(total) }}</dd>
                            </div>
                        </dl>
                        <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <button :disabled="isLoading" type="submit" class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span>{{ isLoading ? 'Procesando...' : 'Confirmar Reserva y Pagar' }}</span>
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
import { router } from "@inertiajs/vue3";
import axios from "axios";

const props = defineProps({
    accommodation: Object,
    room: Object,
    checkIn: String,
    checkOut: String,
    guests: [Number, String],
});

const formBooking = ref({
    room_id: props.room.id,
    check_in_date: props.checkIn,
    check_out_date: props.checkOut,
    guests_adults: parseInt(props.guests) || 2,
    guests_children: 0,
    guest_name: "",
    guest_last_name: "",
    guest_email: "",
    guest_phone: "",
    guest_country: "",
    payment_method: 2,
    soporte: null,
});

const isLoading = ref(false);
const soporte = ref(null);

const paymentMethods = [
    { id: 2, title: "T.Débito, T. Crédito, PSE", description: "El pago se refleja de inmediato" },
    { id: 1, title: "Efectivo", description: "Pagar en Oficinas" },
    { id: 3, title: "Giros y Consignaciones", description: "Validaremos su pago una vez recibido" },
];

const selectedPaymentMethod = ref(paymentMethods[0]);

const nights = computed(() => {
    if (!props.checkIn || !props.checkOut) return 0;
    const start = new Date(props.checkIn);
    const end = new Date(props.checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
});

const subtotal = computed(() => {
    return props.room.price_per_night * nights.value;
});

const total = computed(() => {
    return subtotal.value;
});

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

const formatCurrency = (value) => {
    const number = Number(value) || 0;
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(number);
};

function previewFiles(event) {
    soporte.value = event.target.files[0];
    formBooking.value.soporte = event.target.files[0];
}

const handleSubmit = async () => {
    isLoading.value = true;

    try {
        const formData = new FormData();
        
        // Agregar todos los campos del formulario
        Object.keys(formBooking.value).forEach(key => {
            if (key === 'soporte' && formBooking.value[key] instanceof File) {
                formData.append(key, formBooking.value[key]);
            } else if (key !== 'soporte') {
                formData.append(key, formBooking.value[key]);
            }
        });
        
        formData.append('payment_method', selectedPaymentMethod.value.id);

        const response = await axios.post(route('api.accommodations.booking'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Si hay URL de pago, redirigir
        if (response.data.payment_url) {
            window.location.href = response.data.payment_url;
        } else {
            // Redirigir a página de éxito
            router.get(route('accommodations.booking.success', response.data.booking.id));
        }
    } catch (error) {
        console.error("Error al procesar la reserva:", error);
        alert(error.response?.data?.message || 'Error al procesar la reserva. Por favor intente de nuevo.');
        isLoading.value = false;
    }
};

onMounted(() => {
    console.log('Checkout montado', props);
});
</script>

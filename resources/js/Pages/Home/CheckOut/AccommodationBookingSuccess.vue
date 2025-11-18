<template>
    <AppLayout title="Reserva Confirmada">
        <div class="min-h-screen bg-gray-50 py-12">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Success Header -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="bg-green-600 text-white p-6 text-center">
                        <div class="flex justify-center mb-4">
                            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h1 class="text-3xl font-bold mb-2">¡Reserva Confirmada!</h1>
                        <p class="text-green-100">Tu reserva ha sido procesada exitosamente</p>
                    </div>

                    <!-- Booking Details -->
                    <div class="p-6 space-y-6">
                        <!-- Booking Reference -->
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p class="text-sm text-gray-600 mb-1">Número de Reserva</p>
                            <p class="text-2xl font-bold text-blue-700">#{{ booking.id }}</p>
                        </div>

                        <!-- Accommodation Info -->
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Detalles del Alojamiento</h2>
                            <div class="space-y-3">
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Alojamiento</span>
                                    <span class="font-medium text-gray-900">{{ booking.room.accommodation.name }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Habitación</span>
                                    <span class="font-medium text-gray-900">{{ booking.room.name }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Check-in</span>
                                    <span class="font-medium text-gray-900">{{ formatDate(booking.check_in) }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Check-out</span>
                                    <span class="font-medium text-gray-900">{{ formatDate(booking.check_out) }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Huéspedes</span>
                                    <span class="font-medium text-gray-900">{{ booking.guests }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Noches</span>
                                    <span class="font-medium text-gray-900">{{ nights }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Guest Info -->
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Datos del Huésped</h2>
                            <div class="space-y-3">
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Nombre</span>
                                    <span class="font-medium text-gray-900">{{ booking.guest_name }} {{ booking.guest_last_name }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Email</span>
                                    <span class="font-medium text-gray-900">{{ booking.guest_email }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Teléfono</span>
                                    <span class="font-medium text-gray-900">{{ booking.guest_phone }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">País</span>
                                    <span class="font-medium text-gray-900">{{ booking.guest_country }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Info -->
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Información de Pago</h2>
                            <div class="space-y-3">
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Método de Pago</span>
                                    <span class="font-medium text-gray-900">{{ paymentMethodName }}</span>
                                </div>
                                <div class="flex justify-between py-2 border-b">
                                    <span class="text-gray-600">Estado</span>
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="statusClass">
                                        {{ statusText }}
                                    </span>
                                </div>
                                <div class="flex justify-between py-2">
                                    <span class="text-lg font-semibold text-gray-900">Total</span>
                                    <span class="text-2xl font-bold text-green-600">${{ Number(booking.total_price).toLocaleString('es-CO') }} COP</span>
                                </div>
                            </div>
                        </div>

                        <!-- Important Notice -->
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div class="flex">
                                <svg class="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                                </svg>
                                <div>
                                    <h3 class="text-sm font-medium text-yellow-800">Información Importante</h3>
                                    <div class="mt-2 text-sm text-yellow-700">
                                        <p v-if="booking.payment_method_id === 2">
                                            Tu reserva será confirmada una vez se procese el pago en línea. Recibirás un correo electrónico con los detalles de tu reserva.
                                        </p>
                                        <p v-else-if="booking.payment_method_id === 3">
                                            Hemos recibido tu comprobante de pago. La reserva será confirmada una vez nuestro equipo valide el pago. Te notificaremos por correo electrónico.
                                        </p>
                                        <p v-else>
                                            Deberás realizar el pago en efectivo al momento del check-in. Por favor, llega 15 minutos antes de tu hora de check-in para completar el proceso.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex gap-4 pt-4">
                            <a :href="route('home')" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition text-center">
                                Volver al Inicio
                            </a>
                            <a v-if="$page.props.auth.user" :href="route('my-bookings.index')" class="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition text-center">
                                Ver Mis Reservas
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Email Confirmation Notice -->
                <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p class="text-blue-800">
                        Se ha enviado un correo de confirmación a <strong>{{ booking.guest_email }}</strong>
                    </p>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
    booking: Object
});

const nights = computed(() => {
    const checkIn = new Date(props.booking.check_in);
    const checkOut = new Date(props.booking.check_out);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const paymentMethodName = computed(() => {
    const methods = {
        1: 'Efectivo en Oficina',
        2: 'Pago en Línea',
        3: 'Transferencia Bancaria'
    };
    return methods[props.booking.payment_method_id] || 'No especificado';
});

const statusText = computed(() => {
    if (props.booking.payment_method_id === 1) {
        return 'Pendiente de Pago';
    } else if (props.booking.payment_method_id === 2) {
        return props.booking.is_confirmed ? 'Pagado' : 'Procesando Pago';
    } else if (props.booking.payment_method_id === 3) {
        return props.booking.is_confirmed ? 'Confirmado' : 'Validando Pago';
    }
    return 'Pendiente';
});

const statusClass = computed(() => {
    if (props.booking.is_confirmed) {
        return 'bg-green-100 text-green-800';
    }
    return 'bg-yellow-100 text-yellow-800';
});

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>

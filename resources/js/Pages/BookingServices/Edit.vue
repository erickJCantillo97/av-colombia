<template>
    <AppLayout title="Editar Reserva">
        <div class="h-[92vh] overflow-hidden flex flex-col">
            <!-- Header Section -->
            <div class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4 flex-1 min-w-0">
                        <Link 
                            :href="route('BookingServices.index')" 
                            class="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                        >
                            <i class="fa-solid fa-arrow-left"></i>
                        </Link>
                        <div class="min-w-0 flex-1">
                            <h1 class="text-xl font-bold text-gray-900 truncate">
                                {{ bookingService.service }}
                            </h1>
                            <p class="text-sm text-gray-600 truncate">
                                <i class="fa-solid fa-user mr-1"></i>
                                {{ bookingService.cliente_name }}
                            </p>
                        </div>
                    </div>

                    <span 
                        :class="getStatusBadgeClass()"
                        class="flex-shrink-0 inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold uppercase shadow-sm"
                    >
                        {{ bookingService.status }}
                    </span>
                </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="bg-white border-b border-gray-200 px-6">
                <nav class="flex gap-1 -mb-px overflow-x-auto">
                    <button
                        v-for="op in options"
                        :key="op.value"
                        v-show="op.show"
                        @click="value = op.value"
                        :class="[
                            value === op.value
                                ? 'border-blue-600 text-blue-600 bg-blue-50'
                                : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50',
                            'relative group inline-flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap'
                        ]"
                    >
                        <span>{{ op.name }}</span>
                        <span 
                            v-if="op.label"
                            :class="[
                                value === op.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300',
                                'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full text-xs font-bold transition-colors duration-200'
                            ]"
                        >
                            {{ op.label }}
                        </span>
                    </button>
                </nav>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto bg-gray-50">
                <div class="max-w-7xl mx-auto p-6">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-6">
                            <div v-if="value === 1">
                                <Form :bookingService></Form>
                            </div>
                            <div v-if="value === 2 && hasRole(['admin', 'superadmin'])">
                                <Index :bookingService></Index>
                            </div>
                            <div v-if="value === 3">
                                <IndexExtra :bookingService></IndexExtra>
                            </div>
                            <div v-if="value === 4">
                                <Changes :bookingService></Changes>
                            </div>
                            <div v-if="value === 5 && hasRole(['admin', 'superadmin'])">
                                <Tickets :bookingService></Tickets>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
<script setup>
import Form from './Components/FormFirst.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
import BookingServices from '@/Models/BookingServices/BookingServices'
import { Link } from '@inertiajs/vue3';
import Index from './Components/Proveedor/Index.vue';
import IndexExtra from './Components/Extra/Index.vue';
import Changes from './Components/Changes/Changes.vue';
import { usePermissions } from '@/composable/Auth.js';
import Tickets from './Components/Tickets.vue';

const { hasRole } = usePermissions();

const value = ref(1);

const props = defineProps({
    bookingService: Object
})

const bookingServices = new BookingServices(props.bookingService);

const options = [
    { name: "Datos de la Reserva", value: 1, show: true },
    { name: "Proveedores", value: 2, label: props.bookingService.proveedors.length, show: hasRole(['admin', 'superadmin']) },
    { name: "Extras", value: 3, label: props.bookingService.extras.length, show: !hasRole('Vendedor') },
    { name: "Tickets", value: 5, show: hasRole(['admin', 'superadmin']) },
    { name: "Historial de Cambios", value: 4, label: props.bookingService.changes.length, show: hasRole(['admin', 'superadmin']) },
];

const getStatusBadgeClass = () => {
    const statusClasses = {
        'RESERVADO': 'bg-blue-100 text-blue-800 border border-blue-200',
        'CAMBIO DE FECHA': 'bg-gray-100 text-gray-800 border border-gray-200',
        'COMPLETADA': 'bg-green-100 text-green-800 border border-green-200',
        'NO SHOW': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        'REUBICADO': 'bg-orange-100 text-orange-800 border border-orange-200',
        'CANCELADA': 'bg-green-100 text-green-800 border border-green-200',
        'PROBLEMATICA': 'bg-red-100 text-red-800 border border-red-200 animate-pulse',
        'SIN CONFIRMAR': 'bg-purple-100 text-purple-800 border border-purple-200'
    };
    
    return statusClasses[props.bookingService.status] || 'bg-gray-100 text-gray-800 border border-gray-200';
};
</script>

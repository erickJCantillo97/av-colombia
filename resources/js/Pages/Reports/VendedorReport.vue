<template>
    <AppLayout title="Informe de Vendedores">
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <!-- Header -->
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                            Informe de Contabilidad - Vendedores
                        </h2>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Consulta las ventas, recaudos y pagos realizados a cada vendedor
                        </p>
                    </div>

                    <!-- Filtros -->
                    <div class="p-6 bg-gray-50 dark:bg-gray-900">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <!-- Selector de Vendedor -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Vendedor
                                </label>
                                <select 
                                    v-model="selectedVendedor" 
                                    :disabled="isVendedor"
                                    class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
                                    @change="loadReport"
                                >
                                    <option :value="null">Seleccione un vendedor</option>
                                    <option 
                                        v-for="vendedor in vendedores" 
                                        :key="vendedor.id" 
                                        :value="vendedor.id"
                                    >
                                        {{ vendedor.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Fecha Inicio -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Fecha Inicio
                                </label>
                                <input 
                                    v-model="fechaInicio" 
                                    type="date"
                                    class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    @change="loadReport"
                                />
                            </div>

                            <!-- Fecha Fin -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Fecha Fin
                                </label>
                                <input 
                                    v-model="fechaFin" 
                                    type="date"
                                    class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    @change="loadReport"
                                />
                            </div>

                            <!-- Botón Limpiar -->
                            <div v-if="!isVendedor" class="flex items-end">
                                <button 
                                    @click="clearFilters"
                                    class="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
                                >
                                    Limpiar Filtros
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Resumen -->
                    <div v-if="reportData" class="p-6">
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Resumen - {{ reportData.vendedor.name }}
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                    <p class="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Vendido</p>
                                    <p class="text-2xl font-bold text-blue-900 dark:text-blue-300">
                                        ${{ formatNumber(reportData.totales.total_vendido) }}
                                    </p>
                                </div>
                                <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                                    <p class="text-sm text-green-600 dark:text-green-400 font-medium">Total Recaudo</p>
                                    <p class="text-2xl font-bold text-green-900 dark:text-green-300">
                                        ${{ formatNumber(reportData.totales.total_recaudo) }}
                                    </p>
                                </div>
                                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                                    <p class="text-sm text-purple-600 dark:text-purple-400 font-medium">Total Pagado</p>
                                    <p class="text-2xl font-bold text-purple-900 dark:text-purple-300">
                                        ${{ formatNumber(reportData.totales.total_pagado) }}
                                    </p>
                                </div>
                                <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                                    <p class="text-sm text-orange-600 dark:text-orange-400 font-medium">Saldo Pendiente</p>
                                    <p class="text-2xl font-bold text-orange-900 dark:text-orange-300">
                                        ${{ formatNumber(reportData.totales.saldo_pendiente) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Tabla de Detalles -->
                        <div class="overflow-x-auto">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Detalle de Reservaciones
                            </h3>
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Fecha
                                        </th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Servicio
                                        </th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Cliente
                                        </th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Pax
                                        </th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Precio Total
                                        </th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Recaudo
                                        </th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Pagado
                                        </th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Saldo
                                        </th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr 
                                        v-for="detalle in reportData.detalles" 
                                        :key="detalle.id"
                                        class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {{ formatDate(detalle.fecha) }}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                                            {{ detalle.servicio }}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                                            {{ detalle.cliente }}
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {{ detalle.adultos }}A / {{ detalle.ninos }}N
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                                            ${{ formatNumber(detalle.precio_total) }}
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400 font-medium">
                                            ${{ formatNumber(detalle.recaudo) }}
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-right text-purple-600 dark:text-purple-400 font-medium">
                                            ${{ formatNumber(detalle.pagado) }}
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-right font-medium"
                                            :class="detalle.saldo_pendiente > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'"
                                        >
                                            ${{ formatNumber(detalle.saldo_pendiente) }}
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap">
                                            <span class="px-2 py-1 text-xs font-medium rounded-full"
                                                :class="getStatusClass(detalle.status)"
                                            >
                                                {{ detalle.status }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Estado vacío -->
                    <div v-else-if="!loading" class="p-12 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sin datos</h3>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Selecciona un vendedor para ver su informe
                        </p>
                    </div>

                    <!-- Loading -->
                    <div v-if="loading" class="p-12 text-center">
                        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">Cargando informe...</p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import axios from 'axios';

const props = defineProps({
    vendedores: Array,
});

const page = usePage();
const currentUser = computed(() => page.props.auth.user);
const isVendedor = computed(() => currentUser.value?.rol === 'vendedor');

const selectedVendedor = ref(null);
const fechaInicio = ref(null);
const fechaFin = ref(null);
const reportData = ref(null);
const loading = ref(false);

// Inicializar vendedor si el usuario autenticado es vendedor
onMounted(() => {
    if (isVendedor.value) {
        selectedVendedor.value = currentUser.value.id;
        loadReport();
    }
});

const loadReport = async () => {
    if (!selectedVendedor.value) {
        reportData.value = null;
        return;
    }

    loading.value = true;
    try {
        const params = {};
        if (fechaInicio.value) params.fecha_inicio = fechaInicio.value;
        if (fechaFin.value) params.fecha_fin = fechaFin.value;

        const { data } = await axios.get(route('vendedor.report.show', selectedVendedor.value), { params });
        reportData.value = data;
    } catch (error) {
        console.error('Error al cargar el informe:', error);
        alert('Error al cargar el informe. Por favor, intente nuevamente.');
    } finally {
        loading.value = false;
    }
};

const clearFilters = () => {
    if (!isVendedor.value) {
        selectedVendedor.value = null;
    }
    fechaInicio.value = null;
    fechaFin.value = null;
    reportData.value = null;
    if (isVendedor.value) {
        loadReport();
    }
};

const formatNumber = (number) => {
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(number);
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

const getStatusClass = (status) => {
    const statusMap = {
        'RESERVADO': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        'CONFIRMADO': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        'CANCELADO': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        'COMPLETADO': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return statusMap[status?.toUpperCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
};
</script>

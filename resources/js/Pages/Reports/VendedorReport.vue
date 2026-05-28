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

const formatCOP = (number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(number);

const formatDate = (date) =>
    new Date(date).toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' });

const statusConfig = {
    RESERVADO:  { label: 'Reservado',  classes: 'bg-blue-50 text-blue-700' },
    CONFIRMADO: { label: 'Confirmado', classes: 'bg-green-50 text-green-700' },
    CANCELADO:  { label: 'Cancelado',  classes: 'bg-red-50 text-red-700' },
    COMPLETADO: { label: 'Completado', classes: 'bg-purple-50 text-purple-700' },
};

const getStatusConfig = (status) =>
    statusConfig[status?.toUpperCase()] ?? { label: status, classes: 'bg-gray-100 text-gray-600' };
</script>

<template>
    <AppLayout title="Informe de Vendedores">
        <div class="min-h-screen bg-gray-50">
            <div class=" mx-auto px-6 py-8 space-y-6">

                <!-- Header -->
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Reportes</p>
                    <h1 class="text-2xl font-bold text-gray-900">
                        Informe de Vendedores
                        <span v-if="reportData" class="text-gray-400 font-normal text-xl">
                            — {{ reportData.vendedor.name }}
                        </span>
                    </h1>
                </div>

                <!-- Filtros -->
                <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Filtros</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1.5">Vendedor</label>
                            <select
                                v-model="selectedVendedor"
                                :disabled="isVendedor"
                                class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                @change="loadReport"
                            >
                                <option :value="null">Seleccione un vendedor</option>
                                <option v-for="vendedor in vendedores" :key="vendedor.id" :value="vendedor.id">
                                    {{ vendedor.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1.5">Fecha inicio</label>
                            <input
                                v-model="fechaInicio"
                                type="date"
                                class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white transition-colors"
                                @change="loadReport"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-medium text-gray-500 mb-1.5">Fecha fin</label>
                            <input
                                v-model="fechaFin"
                                type="date"
                                class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white transition-colors"
                                @change="loadReport"
                            />
                        </div>

                        <div v-if="!isVendedor" class="flex items-end">
                            <button
                                @click="clearFilters"
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Loading -->
                <div v-if="loading" class="bg-white rounded-xl border border-gray-100 shadow-sm p-12 flex flex-col items-center gap-3">
                    <div class="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                    <p class="text-sm text-gray-400">Cargando informe…</p>
                </div>

                <template v-else-if="reportData">
                    <!-- KPIs -->
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Resumen</p>
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="bg-white rounded-xl border border-gray-100 border-l-4 border-l-blue-500 shadow-sm p-5">
                                <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Total vendido</p>
                                <p class="text-xl font-bold text-blue-600">{{ formatCOP(reportData.totales.total_vendido) }}</p>
                            </div>
                            <div class="bg-white rounded-xl border border-gray-100 border-l-4 border-l-green-500 shadow-sm p-5">
                                <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Total recaudo</p>
                                <p class="text-xl font-bold text-green-600">{{ formatCOP(reportData.totales.total_recaudo) }}</p>
                            </div>
                            <div class="bg-white rounded-xl border border-gray-100 border-l-4 border-l-purple-500 shadow-sm p-5">
                                <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Total pagado</p>
                                <p class="text-xl font-bold text-purple-600">{{ formatCOP(reportData.totales.total_pagado) }}</p>
                            </div>
                            <div class="bg-white rounded-xl border border-gray-100 border-l-4 border-l-amber-500 shadow-sm p-5">
                                <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Saldo pendiente</p>
                                <p class="text-xl font-bold text-amber-600">{{ formatCOP(reportData.totales.saldo_pendiente) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Tabla de detalle -->
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Detalle de reservaciones</p>
                        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-gray-100">
                                            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Fecha</th>
                                            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Servicio</th>
                                            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Cliente</th>
                                            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Pax</th>
                                            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">Precio</th>
                                            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">Recaudo</th>
                                            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">Pagado</th>
                                            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">Saldo</th>
                                            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="detalle in reportData.detalles"
                                            :key="detalle.id"
                                            class="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0"
                                        >
                                            <td class="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">{{ formatDate(detalle.fecha) }}</td>
                                            <td class="px-5 py-3.5 text-sm text-gray-800">{{ detalle.servicio }}</td>
                                            <td class="px-5 py-3.5 text-sm text-gray-800">{{ detalle.cliente }}</td>
                                            <td class="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">{{ detalle.adultos }}A / {{ detalle.ninos }}N</td>
                                            <td class="px-5 py-3.5 text-sm text-right text-gray-800 font-medium whitespace-nowrap">{{ formatCOP(detalle.precio_total) }}</td>
                                            <td class="px-5 py-3.5 text-sm text-right text-green-600 font-semibold whitespace-nowrap">{{ formatCOP(detalle.recaudo) }}</td>
                                            <td class="px-5 py-3.5 text-sm text-right text-purple-600 font-semibold whitespace-nowrap">{{ formatCOP(detalle.pagado) }}</td>
                                            <td class="px-5 py-3.5 text-sm text-right font-semibold whitespace-nowrap"
                                                :class="detalle.saldo_pendiente > 0 ? 'text-amber-600' : 'text-gray-400'"
                                            >
                                                {{ formatCOP(detalle.saldo_pendiente) }}
                                            </td>
                                            <td class="px-5 py-3.5 whitespace-nowrap">
                                                <span
                                                    class="inline-block px-2.5 py-1 text-xs font-medium rounded-full"
                                                    :class="getStatusConfig(detalle.status).classes"
                                                >
                                                    {{ getStatusConfig(detalle.status).label }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Estado vacío -->
                <div v-else class="bg-white rounded-xl border border-gray-100 shadow-sm p-12 flex flex-col items-center gap-3 text-center">
                    <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-sm font-medium text-gray-500">Sin datos</p>
                    <p class="text-xs text-gray-400">Selecciona un vendedor para ver su informe</p>
                </div>

            </div>
        </div>
    </AppLayout>
</template>

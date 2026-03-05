<script setup>
import Input from '@/Components/Customs/Input.vue';
import BookingServices from '@/Models/BookingServices/BookingServices'
import { onMounted, ref, computed, watch } from 'vue';
import Service from '@/Models/Services/Service';
import { usePermissions } from '@/composable/Auth.js';

const { hasRole } = usePermissions();


const services = ref([]);
const channels = ref([]);
const methods = ref([]);
const props = defineProps({
    bookingService: Object,
    users: Array,
})

const service = new Service();
const bookingServices = new BookingServices(props.bookingService);
const form = bookingServices.form

// Computed para calcular automáticamente los totales
const totalAdults = computed(() => {
    const nacionales = parseInt(form.adults_nacionales) || 0;
    const extranjeros = parseInt(form.adults_extranjeros) || 0;
    return nacionales + extranjeros;
});

const totalBoys = computed(() => {
    const nacionales = parseInt(form.boys_nacionales) || 0;
    const extranjeros = parseInt(form.boys_extranjeros) || 0;
    return nacionales + extranjeros;
});

// Watch para actualizar los valores del formulario
watch([totalAdults, totalBoys], ([newAdults, newBoys]) => {
    form.adults = newAdults;
    form.boys = newBoys;
});

onMounted(async () => {
    services.value = await service.getServices();
    channels.value = await bookingServices.getChannels();
    methods.value = await bookingServices.getMethods();
    console.log(channels.value);
})

const minPricePax = ref(0);
const minPriceBoys = ref(0);
const valorPorAdulto = ref(0);
const valorPorNino = ref(0);

function selectedService() {
    const selected = services.value.find(s => s.id === form.service_id);
    if (selected) {
        console.log(selected);
        minPricePax.value = selected.adults_price || 0;
        minPriceBoys.value = selected.boys_price || 0;
        // Autorellenar con precios del servicio si es vendedor
        if (hasRole('vendedor')) {
            valorPorAdulto.value = selected.adult_tarifa || 0;
            valorPorNino.value = selected.boy_tarifa || 0;
        }
    } else {
        minPricePax.value = 0;
        minPriceBoys.value = 0;
    }
}

// Computed para calcular el total automáticamente cuando es vendedor
const totalCalculado = computed(() => {
    if (hasRole('vendedor')) {
        const totalAdultos = totalAdults.value * (parseFloat(valorPorAdulto.value) || 0);
        const totalNinos = totalBoys.value * (parseFloat(valorPorNino.value) || 0);
        return totalAdultos + totalNinos;
    }
    return parseFloat(form.total) || 0;
});

// Watch para actualizar form.total cuando cambia el cálculo
watch(totalCalculado, (newTotal) => {
    if (hasRole('vendedor')) {
        form.total = newTotal;
    }
});

// Watch para actualizar cuando cambian los valores por pasajero
watch([valorPorAdulto, valorPorNino], () => {
    if (hasRole('vendedor')) {
        const totalAdultos = totalAdults.value * (parseFloat(valorPorAdulto.value) || 0);
        const totalNinos = totalBoys.value * (parseFloat(valorPorNino.value) || 0);
        form.total = totalAdultos + totalNinos;
    }
});

</script>
<template>
    <div class="">
        <form class="space-y-3" @submit.prevent="bookingServices.submit">
            <!-- Sección: Información del Servicio -->
            <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
                <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1.5">
                    📋 Información del Servicio
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <Input v-model="form.service_id" class="md:col-span-2" type="dropdown" label="Servicio"
                        option-label="title" option-value="id" @value-change="selectedService"
                        :options="services"></Input>

                    <Input label="Fecha de Reserva" v-model="form.date" :enableTimePicker="true" type="datetime"
                        class="md:col-span-1" />
                    <Input label="Tiempo del Servicio" type="dropdown" v-model="form.time_service" :options="[
                        '20 Minutos',
                        '30 Minutos',
                        '40 Minutos',
                        '1 Hora',
                        '2 Horas',
                        '6 Horas',
                        '12 Horas',
                        '24 Horas',
                    ]"></Input>
                </div>
            </div>

            <!-- Sección: Pasajeros -->
            <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
                <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1.5">
                    👥 Pasajeros
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Input label="Adultos Nac." type="number" :min="0" v-model="form.adults_nacionales"></Input>
                    <Input label="Adultos Ext." type="number" :min="0" v-model="form.adults_extranjeros"></Input>
                    <Input label="Niños Nac." type="number" :min="0" v-model="form.boys_nacionales"></Input>
                    <Input label="Niños Ext." type="number" :min="0" v-model="form.boys_extranjeros"></Input>
                </div>

                <!-- Totales calculados -->
                <div
                    class="grid grid-cols-2 gap-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                    <div class="flex items-center justify-center gap-2">
                        <span class="text-xs text-blue-600 dark:text-blue-400">Adultos:</span>
                        <span class="text-lg font-bold text-blue-900 dark:text-blue-100">{{ totalAdults }}</span>
                    </div>
                    <div class="flex items-center justify-center gap-2">
                        <span class="text-xs text-blue-600 dark:text-blue-400">Niños:</span>
                        <span class="text-lg font-bold text-blue-900 dark:text-blue-100">{{ totalBoys }}</span>
                    </div>
                </div>
            </div>

            <!-- Sección: Datos del Cliente -->
            <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
                <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1.5">
                    👤 Datos del Cliente
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <Input label="Nombre del Pasajero" :required="true" v-model="form.cliente_name"
                        class="md:col-span-1" />
                    <Input label="Teléfono" type="number" v-model="form.cliente_phone" />
                    <Input label="Ciudad" v-model="form.cliente_city" />
                    <Input label="Edificio u Hotel" v-model="form.cliente_building" class="md:col-span-1" />
                </div>
            </div>

            <!-- Sección: Información de Pago -->
            <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
                <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1.5">
                    💳 Información de Pago
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <!-- Para vendedores: ingresar valores por adulto y niño -->
                    <Input v-if="hasRole('vendedor')" :min="minPricePax" label="Valor por Adulto" type="number"
                        mode="currency" :required="true" v-model="valorPorAdulto"></Input>
                    <Input v-if="hasRole('vendedor')" :min="minPriceBoys" label="Valor por Niño" type="number"
                        mode="currency" v-model="valorPorNino"></Input>

                    <!-- Para otros roles: ingresar valor total directamente -->
                    <Input v-else label="Valor Total" type="number" mode="currency" :required="true"
                        v-model="form.total"></Input>

                    <Input label="Saldo en Sitio" type="number" mode="currency" v-model="form.saldo" :step="1000"
                        :min="0" :max="form.total" />

                    <Input v-if="!hasRole('vendedor')" type="dropdown" option-label="name" option-value="id"
                        :options="methods" v-model="form.method_id" label="Medio de Pago" />

                    <Input v-if="!hasRole('vendedor')" type="dropdown" option-label="name" option-value="id"
                        :options="channels" v-model="form.channel_id" label="Canal de Venta" />

                    <Input v-if="form.channel_id == '9d75e9d5-6e8f-48c1-9f56-276fd185297e' && !hasRole('vendedor')"
                        label="Seleccione un vendedor" type="dropdown" :options="users" option-label="name"
                        option-value="id" v-model="form.vendedor_id"  />
                </div>

                <!-- Mostrar valor total calculado para vendedores -->
                <div v-if="hasRole('vendedor')"
                    class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-blue-700 dark:text-blue-300">💰 Valor Total:</span>
                        <span class="text-xl font-bold text-blue-900 dark:text-blue-100">${{
                            totalCalculado.toLocaleString('es-CO') }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mt-2">
                        <p class="text-xs text-blue-600 dark:text-blue-400">
                            👨 {{ totalAdults }} adulto(s) × ${{ parseFloat(valorPorAdulto || 0).toLocaleString('es-CO')
                            }} = ${{ (totalAdults * (parseFloat(valorPorAdulto || 0))).toLocaleString('es-CO') }}
                        </p>
                        <p class="text-xs text-blue-600 dark:text-blue-400">
                            👶 {{ totalBoys }} niño(s) × ${{ parseFloat(valorPorNino || 0).toLocaleString('es-CO') }} =
                            ${{ (totalBoys * (parseFloat(valorPorNino || 0))).toLocaleString('es-CO') }}
                        </p>
                    </div>
                </div>
                <!-- Resumen Financiero -->
                <div v-if="!hasRole('vendedor')" class="grid grid-cols-3 gap-2">
                    <div
                        class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded p-2 border border-green-200 dark:border-green-800 text-center">
                        <p class="text-[10px] text-green-700 dark:text-green-400">Valor Pasajero</p>
                        <h1 class="text-sm font-bold text-green-900 dark:text-green-100">{{
                            bookingServices.valuePasajeros }}</h1>
                    </div>
                    <div
                        class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded p-2 border border-orange-200 dark:border-orange-800 text-center">
                        <p class="text-[10px] text-orange-700 dark:text-orange-400">Comisiones</p>
                        <h1 class="text-sm font-bold text-orange-900 dark:text-orange-100">{{
                            bookingServices.valueCanalVenta }}</h1>
                    </div>
                    <div
                        class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded p-2 border border-blue-200 dark:border-blue-800 text-center">
                        <p class="text-[10px] text-blue-700 dark:text-blue-400">Total Real</p>
                        <h1 class="text-sm font-bold text-blue-900 dark:text-blue-100">{{
                            bookingServices.valorRealFormat }}</h1>
                    </div>
                </div>
            </div>

            <!-- Observaciones y Botón -->
            <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
                <Input :rows-textarea="2" label="💬 Observaciones" v-model="form.observations" type="textarea" />
                <Button type="submit" severity="success" :label="bookingService ? 'Actualizar Reserva' : 'Crear Reserva'"
                    :loading="bookingServices.loading.value" class="w-full" />
            </div>
        </form>
    </div>

</template>

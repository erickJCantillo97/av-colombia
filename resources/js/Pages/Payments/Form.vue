<template>
    <div class="space-y-6">
        <!-- Selection Card -->
        <div class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-center gap-2 mb-4">
                <div class="p-2 bg-blue-500 rounded-lg">
                    <i class="fa-solid fa-filter text-white text-sm"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-800">Filtros de Búsqueda</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                        <i class="fa-solid fa-calendar-range text-blue-500"></i>
                        Rango de Fechas
                    </label>
                    <DatePicker 
                        v-model="selectDate" 
                        selectionMode="range" 
                        dateFormat="dd/mm/yy" 
                        class="w-full custom-datepicker"
                        :manualInput="false" 
                        @update:modelValue="getReservas"
                        placeholder="Seleccionar fechas..."
                    />
                </div>
                
                <Input 
                    label="Proveedor" 
                    type="dropdown" 
                    option-label="proveedor" 
                    option-value="proveedor_id"
                    @value-change="getReservas" 
                    class="w-full" 
                    v-model="proveedor" 
                    :options="proveedores"
                    placeholder="Seleccionar proveedor..."
                >
                    <template #label>
                        <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <i class="fa-solid fa-truck text-blue-500"></i>
                            Proveedor
                        </label>
                    </template>
                </Input>
            </div>
        </div>

        <!-- Payment Details Section -->
        <div v-if="proveedor" class="space-y-6 animate-fade-in">
            <!-- Reservations Details -->
            <DetailsTypeReserva :reservasType="reservasType" :proveedor="proveedor" />
            
            <!-- Payment Information Card -->
            <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div class="flex items-center gap-2 mb-6">
                    <div class="p-2 bg-green-500 rounded-lg">
                        <i class="fa-solid fa-money-bill-wave text-white text-sm"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-800">Información del Pago</h3>
                </div>
                
                <!-- Payment Date -->
                <div class="mb-6">
                    <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                        <i class="fa-solid fa-calendar-check text-green-500"></i>
                        Fecha de Realización del Pago
                    </label>
                    <DatePicker 
                        v-model="form.date" 
                        dateFormat="dd/mm/yy" 
                        class="w-full custom-datepicker" 
                        :manualInput="false"
                        placeholder="Seleccionar fecha..."
                    />
                </div>
                
                <!-- Amount Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="relative">
                        <Input 
                            label="Valor Pagado" 
                            type="number" 
                            mode="currency" 
                            v-model="form.amount"
                        >
                            <template #label>
                                <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <i class="fa-solid fa-hand-holding-dollar text-blue-500"></i>
                                    Valor Pagado
                                </label>
                            </template>
                        </Input>
                    </div>
                    
                    <div class="relative">
                        <Input 
                            label="Valor Total" 
                            type="number" 
                            mode="currency" 
                            v-model="totalCostoProveedor" 
                            disabled
                        >
                            <template #label>
                                <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <i class="fa-solid fa-calculator text-slate-500"></i>
                                    Valor Total
                                </label>
                            </template>
                        </Input>
                    </div>
                    
                    <div class="relative">
                        <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <i class="fa-solid fa-scale-balanced" :class="diferenceColor"></i>
                            Diferencia
                        </label>
                        <div 
                            class="w-full px-4 py-3 rounded-lg border-2 font-bold text-lg transition-all duration-300"
                            :class="diferenceClass"
                        >
                            {{ new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(diference) }}
                        </div>
                    </div>
                </div>
                
                <!-- File Upload -->
                <div class="mt-6">
                    <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                        <i class="fa-solid fa-file-invoice text-indigo-500"></i>
                        Comprobante de Pago
                    </label>
                    <div class="relative">
                        <input 
                            type="file" 
                            @change="previewFiles" 
                            id="file-upload"
                            class="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label 
                            for="file-upload"
                            class="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 group"
                        >
                            <div class="text-center">
                                <i class="fa-solid fa-cloud-arrow-up text-3xl text-slate-400 group-hover:text-indigo-500 transition-colors mb-2"></i>
                                <p class="text-sm font-semibold text-slate-600 group-hover:text-indigo-600">
                                    {{ fileName || 'Click para seleccionar archivo' }}
                                </p>
                                <p class="text-xs text-slate-500 mt-1">PDF, JPG, PNG (Max. 10MB)</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button 
                v-if="$page.props.auth.user.rol == 'superadmin' && proveedor" 
                @click="save"
                :disabled="loading"
                class="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                <span class="flex items-center gap-2">
                    <i class="fa-solid" :class="loading ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                    {{ loading ? 'Guardando...' : 'Guardar Pago' }}
                </span>
                <div class="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </div>
    </div>

</template>
<style scoped>
.custom-datepicker {
    width: 100%;
}

.custom-datepicker :deep(.p-inputtext) {
    width: 100%;
    padding: 0.625rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

.custom-datepicker :deep(.p-inputtext:focus) {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: #3b82f6;
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

<script setup>
import { router, useForm } from "@inertiajs/vue3";
import { computed, onMounted, ref } from "vue";
import { alerts } from "@/composable/toasts";
import axios from "axios";
import Input from "@/Components/Customs/Input.vue";
import DetailsTypeReserva from "./Components/DetailsTypeReserva.vue";
import { getTotalCostByReservas } from '@/composable/useCommonUtilities';
const show = ref(false);

const { toast } = alerts();


const props = defineProps({
    payment: Array,
});


const formatDate = (date) => {
    if (date == undefined || date == null) {
        return "Sin definir";
    } else {
        var fecha = new Date(
            new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60000
        );
        return fecha;
    }
};

const loading = ref(false);

const form = useForm({
    date: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    amount: 0,
    proveedor_id: "",
    file: "",
    description: "",
});

const proveedores = ref([]);

const selectDate = ref([new Date(), new Date()]);

const reservas = ref();
const reservasType = ref([]);
const proveedor = ref();
const payment_id = ref(null);
const totalCostoProveedor = ref(0);

const getReservas = () => {
    axios
        .get(route("get.booking.time.range"), {
            params: {
                start_date: new Date(selectDate.value[0]).toISOString().split("T")[0],
                end_date: new Date(selectDate.value[1]).toISOString().split("T")[0],
            },
        })
        .then((response) => {
            proveedores.value = response.data.proveedores;
            reservas.value = response.data.bookingTimeRange.filter((item) => {
                let p = proveedor.value;
                let proveedoresItems = item.proveedors.map((i) => i.proveedor_id);
                return proveedoresItems.includes(p);
            });

            totalCostoProveedor.value = getTotalCostByReservas(reservas.value, proveedor.value);
            reservasType.value = [
                {
                    name: "RESERVADO",
                    value: reservas.value.filter((item) => item.status == "RESERVADO"),
                    color: "bg-blue-200",
                },
                {
                    name: "COMPLETADA",
                    value: reservas.value.filter((item) => item.status == "COMPLETADA"),
                    color: "bg-green-200",
                },
                {
                    name: "CANCELADA",
                    value: reservas.value.filter((item) => item.status == "CANCELADA"),
                    color: "bg-red-200",
                },
                {
                    name: "NO SHOW",
                    value: reservas.value.filter((item) => item.status == "NO SHOW"),
                    color: "bg-yellow-200",
                },
                {
                    name: "CAMBIO DE FECHA",
                    value: reservas.value.filter((item) => item.status == "CAMBIO DE FECHA"),
                    color: "bg-gray-200",
                },
                {
                    name: "REUBICADO",
                    value: reservas.value.filter((item) => item.status == "REUBICADO"),
                    color: "bg-yellow-200",
                },
            ];
        });
};


const save = () => {
    loading.value = true;
    let formData = new FormData();
    formData.append("proveedor_id", proveedor.value);
    formData.append("amount", form.amount);
    formData.append("comprobante", form.file);
    formData.append("date", new Date(form.date).toISOString().split("T")[0]);
    formData.append("startDate", new Date(selectDate.value[0]).toISOString().split("T")[0]);
    formData.append("endDate", new Date(selectDate.value[1]).toISOString().split("T")[0]);
    formData.append("description", form.description);

    if (payment_id.value) {
        router.post(route("paymentProveedors.update", payment_id.value), formData, {
            onSuccess: () => {
                toast("success", "Pago Actualizado con exito");
                loading.value = false;
                show.value = false;
            },
        });

        return;
    }
    router.post(route("paymentProveedors.store"), formData, {
        onSuccess: () => {
            toast("success", "Pago Actualizado con exito");
            loading.value = false;
            show.value = false;
        },
    });
};

const diference = computed(() => {
    return totalCostoProveedor.value - form.amount;
});

const diferenceClass = computed(() => {
    const diff = diference.value;
    if (diff > 0) {
        return 'bg-red-50 border-red-300 text-red-700';
    } else if (diff < 0) {
        return 'bg-green-50 border-green-300 text-green-700';
    } else {
        return 'bg-slate-50 border-slate-300 text-slate-700';
    }
});

const diferenceColor = computed(() => {
    const diff = diference.value;
    if (diff > 0) return 'text-red-500';
    if (diff < 0) return 'text-green-500';
    return 'text-slate-500';
});

const fileName = ref('');

function previewFiles(event) {
    form.file = event.target.files[0];
    fileName.value = event.target.files[0]?.name || '';
}

onMounted(() => {
    if (props.payment) {
        payment_id.value = props.payment.id;
        form.date = formatDate(props.payment.date);
        form.startDate = formatDate(props.payment.startDate);
        form.endDate = formatDate(props.payment.endDate);
        form.amount = props.payment.amount;
        form.proveedor_id = props.payment.proveedor_id;
        form.description = props.payment.description;
        selectDate.value = [formatDate(props.payment.startDate), formatDate(props.payment.endDate)];
        proveedor.value = props.payment.proveedor_id;
        getReservas();
    }
});
</script>
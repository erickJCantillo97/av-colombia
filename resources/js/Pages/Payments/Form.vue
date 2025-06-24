<template>
    <div class="gap-y-2 flex flex-col">
        <div class="flex flex-col md:flex-row  gap-x-2 items-center">
            <div class="flex flex-col w-full justify-between font-bold">
                <p>Fechas</p>
                <DatePicker v-model="selectDate" selectionMode="range" dateFormat="dd/mm/yy" class="w-full h-9"
                    :manualInput="false" @value-change="getReservas" />
            </div>
            <Input label="Proveedor" type="dropdown" option-label="proveedor" option-value="proveedor_id"
                @value-change="getReservas" class="w-full" v-model="proveedor" :options="proveedores" />
        </div>

        <div v-if="proveedor" class="flex flex-col gap-y-2">
            <DetailsTypeReserva v-if="proveedor"  :reservasType="reservasType" :proveedor="proveedor" />
            <div class="flex flex-col w-full justify-between font-bold">
                <p>Fecha en que realizó el pago</p>
                <DatePicker v-model="form.date" dateFormat="dd/mm/yy" class="w-full" :manualInput="false" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 ">
                <Input label="Valor Pagado" type="number" mode="currency" v-model="form.amount" />
                <Input label="Valor Total" type="number" mode="currency"  v-model="totalCostoProveedor" disabled />
                <Input label="Diferencia" type="number" mode="currency"  v-model="diference" disabled  />
            </div>
            <input type="file" @change="previewFiles" label="Comprobante" />
        </div>

        <div class="flex justify-end gap-x-2">
            <button @click="show = false" class="bg-red-500 text-white px-4 py-2 rounded-md">
                Cancelar
            </button>
            <button :loading v-if="proveedor" @click="save" class="bg-green-500 text-white px-4 py-2 rounded-md">
                Guardar
            </button>
        </div>
    </div>
    
</template>
<script setup>
import { router, useForm } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import { alerts } from "@/composable/toasts";
import axios from "axios";
import Input from "@/Components/Customs/Input.vue";
import DetailsTypeReserva from "./Components/DetailsTypeReserva.vue";
import {  getTotalCostByReservas } from '@/composable/useCommonUtilities';
const show = ref(false);

const { toast } = alerts();


const props = defineProps({
    payments: Array,
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


function previewFiles(event) {
    form.file = event.target.files[0];
}

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
</script>
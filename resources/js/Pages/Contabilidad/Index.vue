<script setup>
import { onMounted, provide, ref } from 'vue';
import { ChartComponent as EjsChart, SeriesCollectionDirective as ESeriesCollection, SeriesDirective as ESeries, ColumnSeries, Legend, Category, Tooltip, DataLabel } from "@syncfusion/ej2-vue-charts";
import AppLayout from '@/Layouts/AppLayout.vue';
import TotalCard from './TotalCard.vue';
import BarSeries from './BarSeries.vue';
import axios from 'axios';
import Datatable from '@/Components/Customs/Datatable.vue';

const props = defineProps(
    {
        bookings: Array,
    }
);
const seriesData = ref(Object.values(props.bookings));

const title = 'Ventas del Mes ';
const tooltip = { enable: true }
const primaryXAxis = { valueType: 'Category' };
const chart = [ColumnSeries, Legend, Category, Tooltip, DataLabel];

const marker = {
    //Data label for chart series
    dataLabel: { visible: true }
};
const ventas = ref(0);
const proveedores = ref([]);
const costos = ref(0);

onMounted(() => {
    axios.get(route('get.ventas.mouth')).then((response) => {
        ventas.value = response.data;
    });
    axios.get(route('get.costos.proveedores')).then((response) => {
        let data = Object.values(response.data);
        proveedores.value = data;
        costos.value = data.reduce((total, current) => total + current.costos, 0);
        // ventasProveedores.value = Object.values(response.data).reduce((total, current) => total + current.ventas, 0);
    });
});


const columns = [
    {
        header: 'Proveedor',
        field: 'proveedor',
        filter: true,
    },
    {
        header: 'Ventas',
        field: 'ventas',
        type: 'currency',
        filter: true,
    },
    {
        header: 'Costos',
        field: 'costos',
        type: 'currency',
        filter: true,
    },
];

provide('chart', chart);

const date = ref(new Date());
</script>

<template>
    <AppLayout title="Services">
        <div class="hidden bg-amber-100 text-amber-800 bg-blue-100 text-blue-800"></div>
        <div class="p-4 gap-y-4 shadow-lg ">
            <div class="my-10 w-full justify-between flex">
                <h1 class="text-2xl ">Contabilidad <span class="text-3xl font-bold">AV COLOMBIA</span></h1>
                <DatePicker v-model="date" view="month" dateFormat="mm/yy" />
            </div>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="grid grid-cols-2 rounded-lg shadow-xl">
                    <TotalCard label="Ventas de " class="rounded-s-sm" :value="ventas" color="blue" />
                    <TotalCard label="Costos de " :value="costos" color="amber" />
                    <TotalCard class="col-span-2" label="Utilidad de " :value="ventas - costos" />
                </div>
                <ejs-chart id="container" class="shadow-xl w-full" width="100%" :tooltip='tooltip' :title='title'
                    :primaryXAxis='primaryXAxis'>
                    <e-series-collection>
                        <e-series :dataSource='seriesData' type='Column' xName='date' yName='cant' name='Sales'
                            :marker='marker'>
                        </e-series>
                    </e-series-collection>
                </ejs-chart>
                <div>
                    <BarSeries v-if="proveedores.length != 0" :data="proveedores"></BarSeries>
                </div>
                <div>
                    <Datatable :data="proveedores" :columnas="columns"></DataTable>
                </div>
            </div>
        </div>

    </AppLayout>
</template>
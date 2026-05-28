<script setup>
import { onMounted, ref, computed } from "vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import StatCard from "./StatCard.vue";
import CompactCard from "./CompactCard.vue";
import PieChart from "./PieChart.vue";
import ColumnChart from "./ColumnChart.vue";
import BarChart from "./BarChart.vue";
import ComparisonBarChart from "./ComparisonBarChart.vue";
import GroupedBarChart from "./GroupedBarChart.vue";
import SimpleTable from "./SimpleTable.vue";
import axios from "axios";

const props = defineProps({
  bookings: Array,
});

const seriesData = ref();
const today = new Date();
const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const selectDate = ref([firstOfMonth, today]);
const ventas = ref(0);
const proveedores = ref([]);
const costos = ref(0);
const pagosProveedores = ref([]);
const reservasPorTipo = ref([]);
const topServicios = ref({ top5: [], bottom5: [] });
const topProveedor = ref(null);
const topVendedor = ref(null);
const topProveedorPagado = ref(null);
const estadisticasEstados = ref({ reservado: 0, cancelado: 0, no_show: 0 });
const reservasAdelantadas = ref(0);
const reservasPorCanal = ref([]);

const getVentas = () => {
  axios.get(route("get.ventas"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { ventas.value = r.data; });
};

const costosProveedores = () => {
  axios.get(route("get.costos.proveedores"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => {
      const data = Object.values(r.data);
      proveedores.value = data;
      costos.value = data.reduce((total, cur) => total + cur.costos, 0);
    });
};

const getTotalReservas = () => {
  axios.get(route("get.total.reservas"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { seriesData.value = Object.values(r.data); });
};

const getPagosProveedoresData = () => {
  axios.get(route("get.pagos.proveedores")).then((r) => { pagosProveedores.value = r.data; });
};

const getReservasPorTipoData = () => {
  axios.get(route("get.reservas.tipo.servicio"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { reservasPorTipo.value = r.data; });
};

const getTopServiciosData = () => {
  axios.get(route("get.top.servicios"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { topServicios.value = r.data; });
};

const getProveedorTopData = () => {
  axios.get(route("get.proveedor.top.reservas"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { topProveedor.value = r.data; });
};

const getVendedorTopData = () => {
  axios.get(route("get.vendedor.top.reservas"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { topVendedor.value = r.data; });
};

const getEstadisticasEstadosData = () => {
  axios.get(route("get.estadisticas.estados"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { estadisticasEstados.value = r.data; });
};

const getReservasAdelantadasData = () => {
  axios.get(route("get.reservas.adelantadas"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { reservasAdelantadas.value = r.data; });
};

const getProveedorMasPagadoData = () => {
  axios.get(route("get.proveedor.mas.pagado"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { topProveedorPagado.value = r.data; });
};

const getReservasPorCanalData = () => {
  axios.get(route("get.reservas.por.canal"), { params: { startDate: selectDate.value[0], endDate: selectDate.value[1] } })
    .then((r) => { reservasPorCanal.value = r.data; });
};

function getData() {
  getVentas();
  costosProveedores();
  getTotalReservas();
  getPagosProveedoresData();
  getReservasPorTipoData();
  getTopServiciosData();
  getProveedorTopData();
  getVendedorTopData();
  getEstadisticasEstadosData();
  getReservasAdelantadasData();
  getProveedorMasPagadoData();
  getReservasPorCanalData();
}

onMounted(() => { getData(); });

const columns = [
  { header: "Proveedor", field: "proveedor", filter: true },
  { header: "Ventas", field: "ventas", type: "currency", filter: true },
  { header: "Costos", field: "costos", type: "currency", filter: true },
];

const columnsTopServicios = [
  { header: "Servicio", field: "service_name", filter: true },
  { header: "Cantidad", field: "cantidad", filter: true },
  { header: "Ventas", field: "ventas", type: "currency", filter: true },
];


const estadosChartData = computed(() => [
  {
    x: "Reservado",
    y: estadisticasEstados.value.reservado?.cantidad || 0,
    porcentaje: estadisticasEstados.value.reservado?.porcentaje || 0,
    recaudado: estadisticasEstados.value.reservado?.recaudado || 0,
    pagado: estadisticasEstados.value.reservado?.pagado || 0,
  },
  {
    x: "Cancelado",
    y: estadisticasEstados.value.cancelado?.cantidad || 0,
    porcentaje: estadisticasEstados.value.cancelado?.porcentaje || 0,
    recaudado: estadisticasEstados.value.cancelado?.recaudado || 0,
    pagado: estadisticasEstados.value.cancelado?.pagado || 0,
  },
  {
    x: "No Show",
    y: estadisticasEstados.value.no_show?.cantidad || 0,
    porcentaje: estadisticasEstados.value.no_show?.porcentaje || 0,
    recaudado: estadisticasEstados.value.no_show?.recaudado || 0,
    pagado: estadisticasEstados.value.no_show?.pagado || 0,
  },
]);

const reservasPorTipoChartData = computed(() =>
  reservasPorTipo.value.map((item) => ({ x: item.service, y: item.cantidad }))
);

const formatCOP = (val) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(val);
</script>

<template>
  <AppLayout title="Contabilidad">
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-screen-2xl mx-auto px-6 py-8 space-y-8">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Panel de control</p>
            <h1 class="text-2xl font-bold text-gray-900">Contabilidad <span class="text-gray-400 font-normal">— AV Colombia</span></h1>
          </div>
          <DatePicker
            variant="filled"
            v-model="selectDate"
            selectionMode="range"
            dateFormat="dd/mm/yy"
            :manualInput="false"
            @value-change="getData"
            class="text-sm"
          />
        </div>

        <!-- KPIs financieros -->
        <section>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Resumen financiero</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CompactCard title="Ventas" :value="ventas" :isCurrency="true" color="blue" />
            <CompactCard title="Costos" :value="costos" :isCurrency="true" color="amber" />
            <CompactCard title="Utilidad" :value="ventas - costos" :isCurrency="true" color="emerald" />
          </div>
        </section>

        <!-- Destacados -->
        <section>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Destacados</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Proveedor top"
              :value="topProveedor?.proveedor || 'N/A'"
              :subtitle="`${topProveedor?.cantidad || 0} reservas`"
              color="purple"
            />
            <StatCard
              title="Vendedor top"
              :value="topVendedor?.vendedor || 'N/A'"
              :subtitle="`${topVendedor?.cantidad || 0} reservas`"
              color="green"
            />
            <StatCard
              v-if="topProveedorPagado?.[0]"
              title="Más pagado"
              :value="topProveedorPagado[0].proveedor || 'N/A'"
              :subtitle="`${formatCOP(topProveedorPagado[0].total_pagado)} · ${topProveedorPagado[0].cantidad_pagos} pagos`"
              color="indigo"
            />
            <StatCard
              v-if="topProveedorPagado?.[1]"
              title="2° más pagado"
              :value="topProveedorPagado[1].proveedor || 'N/A'"
              :subtitle="`${formatCOP(topProveedorPagado[1].total_pagado)} · ${topProveedorPagado[1].cantidad_pagos} pagos`"
              color="blue"
            />
          </div>
        </section>

        <!-- Estados de reservas -->
        <section>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Estados de reservas</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              title="Reservadas"
              :value="estadisticasEstados.reservado?.cantidad || 0"
              subtitle="Estado activo"
              color="blue"
            />
            <StatCard
              title="Canceladas"
              :value="estadisticasEstados.cancelado?.cantidad || 0"
              subtitle="Estado cancelado"
              color="red"
            />
            <StatCard
              title="No show"
              :value="estadisticasEstados.no_show?.cantidad || 0"
              subtitle="No presentados"
              color="amber"
            />
            <StatCard
              title="Adelantadas"
              :value="reservasAdelantadas"
              subtitle="Fecha futura"
              color="indigo"
            />
          </div>
        </section>

        <!-- Gráficos principales -->
        <section>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Tendencias</p>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <ColumnChart
                v-if="seriesData && seriesData.length > 0"
                :data="seriesData"
                title="Reservas por día"
                labelKey="date"
                valueKey="cant"
              />
              <div v-else class="h-48 flex items-center justify-center text-sm text-gray-400">Sin datos</div>
            </div>
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <ComparisonBarChart
                v-if="pagosProveedores && pagosProveedores.length > 0"
                :data="pagosProveedores"
                title="Comparación anual: pagos vs recaudado"
              />
              <div v-else class="h-48 flex items-center justify-center text-sm text-gray-400">Sin datos</div>
            </div>
          </div>
        </section>

        <!-- Distribución -->
        <section>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Distribución</p>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <PieChart
                v-if="estadosChartData && estadosChartData.length > 0"
                :data="estadosChartData"
                title="Estados de reservas"
              />
              <div v-else class="h-48 flex items-center justify-center text-sm text-gray-400">Sin datos</div>
            </div>
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <BarChart
                v-if="reservasPorTipoChartData && reservasPorTipoChartData.length > 0"
                :data="reservasPorTipoChartData"
                title="Por tipo de servicio"
                labelKey="x"
                valueKey="y"
              />
              <div v-else class="h-48 flex items-center justify-center text-sm text-gray-400">Sin datos</div>
            </div>
          </div>
        </section>

        <!-- Canal de venta -->
        <section>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Canal de venta</p>
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <GroupedBarChart
              v-if="reservasPorCanal && reservasPorCanal.length > 0"
              :data="reservasPorCanal"
              title="Reservas y ventas por canal"
            />
            <div v-else class="h-48 flex items-center justify-center text-sm text-gray-400">Sin datos</div>
          </div>
        </section>

        <!-- Tablas de servicios -->
        <section>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Top servicios</p>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SimpleTable
              v-if="topServicios.top5 && topServicios.top5.length > 0"
              :data="topServicios.top5"
              :columns="columnsTopServicios"
              title="Más vendidos"
            />
            <SimpleTable
              v-if="topServicios.bottom5 && topServicios.bottom5.length > 0"
              :data="topServicios.bottom5"
              :columns="columnsTopServicios"
              title="Menos vendidos"
            />
          </div>
        </section>

        <!-- Costos por proveedor -->
        <section>
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Proveedores</p>
          <SimpleTable
            v-if="proveedores && proveedores.length > 0"
            :data="proveedores"
            :columns="columns"
            title="Costos por proveedor"
          />
        </section>

      </div>
    </div>
  </AppLayout>
</template>

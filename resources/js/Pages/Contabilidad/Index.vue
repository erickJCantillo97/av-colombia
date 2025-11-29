<script setup>
import { onMounted, ref, computed } from "vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import TotalCard from "./TotalCard.vue";
import BarSeries from "./BarSeries.vue";
import StatCard from "./StatCard.vue";
import CompactCard from "./CompactCard.vue";
import PieChart from "./PieChart.vue";
import ColumnChart from "./ColumnChart.vue";
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";
import ComparisonBarChart from "./ComparisonBarChart.vue";
import GroupedBarChart from "./GroupedBarChart.vue";
import SimpleTable from "./SimpleTable.vue";
import axios from "axios";
import Datatable from "@/Components/Customs/Datatable.vue";

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
  axios
    .get(route("get.ventas"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      ventas.value = response.data;
    });
};

const costosProveedores = () => {
  axios
    .get(route("get.costos.proveedores"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      let data = Object.values(response.data);
      proveedores.value = data;
      costos.value = data.reduce((total, current) => total + current.costos, 0);
    });
};

const getTotalReservas = () => {
  axios
    .get(route("get.total.reservas"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      seriesData.value = Object.values(response.data);
    });
};

const getPagosProveedoresData = () => {
  axios
    .get(route("get.pagos.proveedores"))
    .then((response) => {
      pagosProveedores.value = response.data;
    });
};

const getReservasPorTipoData = () => {
  axios
    .get(route("get.reservas.tipo.servicio"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      reservasPorTipo.value = response.data;
    });
};

const getTopServiciosData = () => {
  axios
    .get(route("get.top.servicios"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      topServicios.value = response.data;
    });
};

const getProveedorTopData = () => {
  axios
    .get(route("get.proveedor.top.reservas"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      topProveedor.value = response.data;
    });
};

const getVendedorTopData = () => {
  axios
    .get(route("get.vendedor.top.reservas"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      topVendedor.value = response.data;
    });
};

const getEstadisticasEstadosData = () => {
  axios
    .get(route("get.estadisticas.estados"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      estadisticasEstados.value = response.data;
    });
};

const getReservasAdelantadasData = () => {
  axios
    .get(route("get.reservas.adelantadas"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      reservasAdelantadas.value = response.data;
    });
};

const getProveedorMasPagadoData = () => {
  axios
    .get(route("get.proveedor.mas.pagado"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      topProveedorPagado.value = response.data;
    });
};

const getReservasPorCanalData = () => {
  axios
    .get(route("get.reservas.por.canal"), {
      params: {
        startDate: selectDate.value[0],
        endDate: selectDate.value[1],
      },
    })
    .then((response) => {
      reservasPorCanal.value = response.data;
    });
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

onMounted(() => {
  getData();
});

const columns = [
  {
    header: "Proveedor",
    field: "proveedor",
    filter: true,
  },
  {
    header: "Ventas",
    field: "ventas",
    type: "currency",
    filter: true,
  },
  {
    header: "Costos",
    field: "costos",
    type: "currency",
    filter: true,
  },
];

const columnsServicios = [
  {
    header: "Servicio",
    field: "service",
    filter: true,
  },
  {
    header: "Cantidad",
    field: "cantidad",
    filter: true,
  },
  {
    header: "Ventas",
    field: "ventas",
    type: "currency",
    filter: true,
  },
];

const columnsTopServicios = [
  {
    header: "Servicio",
    field: "service_name",
    filter: true,
  },
  {
    header: "Cantidad",
    field: "cantidad",
    filter: true,
  },
  {
    header: "Ventas",
    field: "ventas",
    type: "currency",
    filter: true,
  },
];

const columnsCanales = [
  {
    header: "Canal",
    field: "channel",
    filter: true,
  },
  {
    header: "Cantidad",
    field: "cantidad",
    filter: true,
  },
  {
    header: "Ventas",
    field: "ventas",
    type: "currency",
    filter: true,
  },
];

const estadosChartData = computed(() => {
  return [
    { 
      x: 'Reservado', 
      y: estadisticasEstados.value.reservado?.cantidad || 0,
      porcentaje: estadisticasEstados.value.reservado?.porcentaje || 0,
      recaudado: estadisticasEstados.value.reservado?.recaudado || 0,
      pagado: estadisticasEstados.value.reservado?.pagado || 0
    },
    { 
      x: 'Cancelado', 
      y: estadisticasEstados.value.cancelado?.cantidad || 0,
      porcentaje: estadisticasEstados.value.cancelado?.porcentaje || 0,
      recaudado: estadisticasEstados.value.cancelado?.recaudado || 0,
      pagado: estadisticasEstados.value.cancelado?.pagado || 0
    },
    { 
      x: 'No Show', 
      y: estadisticasEstados.value.no_show?.cantidad || 0,
      porcentaje: estadisticasEstados.value.no_show?.porcentaje || 0,
      recaudado: estadisticasEstados.value.no_show?.recaudado || 0,
      pagado: estadisticasEstados.value.no_show?.pagado || 0
    },
  ];
});

const reservasPorTipoChartData = computed(() => {
  return reservasPorTipo.value.map(item => ({
    x: item.service,
    y: item.cantidad
  }));
});
</script>

<template>
  <AppLayout title="Services">
    <!-- Hidden classes para cargar los colores de Tailwind -->
    <div class="hidden bg-amber-100 text-amber-800 bg-blue-100 text-blue-800 bg-green-100 text-green-800 bg-purple-100 text-purple-800 bg-red-100 text-red-800 bg-indigo-100 text-indigo-800"></div>
    
    <div class="p-4 gap-y-4 shadow-lg">
      <div class="my-10 w-full justify-between flex">
        <h1 class="text-2xl">
          Contabilidad <span class="text-3xl font-bold">AV COLOMBIA</span>
        </h1>
        <DatePicker
          variant="filled"
          v-model="selectDate"
          selectionMode="range"
          dateFormat="dd/mm/yy"
          :manualInput="false"
          @value-change="getData"
        />
      </div>

      <!-- Cards de resumen principal -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-5 mb-6">
        <CompactCard
          title="Ventas"
          :value="ventas"
          :isCurrency="true"
          icon="💰"
          color="blue"
        />
        
        <CompactCard
          title="Costos"
          :value="costos"
          :isCurrency="true"
          icon="💸"
          color="amber"
        />
        
        <CompactCard
          title="Utilidad"
          :value="ventas - costos"
          :isCurrency="true"
          icon="📈"
          color="emerald"
        />
        
        <StatCard
          title="Proveedor Top"
          :value="topProveedor?.proveedor || 'N/A'"
          :subtitle="`${topProveedor?.cantidad || 0} reservas`"
          icon="🏆"
          color="purple"
        />
        
        <StatCard
          title="Vendedor Top"
          :value="topVendedor?.vendedor || 'N/A'"
          :subtitle="`${topVendedor?.cantidad || 0} reservas`"
          icon="⭐"
          color="green"
        />
      </div>

      <!-- Tarjetas de proveedores más pagados -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        <StatCard
          v-if="topProveedorPagado && topProveedorPagado[0]"
          title="Proveedor Más Pagado"
          :value="topProveedorPagado[0].proveedor || 'N/A'"
          :subtitle="`Total: ${new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 0}).format(topProveedorPagado[0].total_pagado)} (${topProveedorPagado[0].cantidad_pagos} pagos)`"
          icon="💳"
          color="indigo"
        />
        
        <StatCard
          v-if="topProveedorPagado && topProveedorPagado[1]"
          title="Segundo Proveedor Más Pagado"
          :value="topProveedorPagado[1].proveedor || 'N/A'"
          :subtitle="`Total: ${new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 0}).format(topProveedorPagado[1].total_pagado)} (${topProveedorPagado[1].cantidad_pagos} pagos)`"
          icon="💳"
          color="purple"
        />
      </div>

      <!-- Estadísticas de Estados y Reservas Adelantadas -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4 mb-6">
        <StatCard
          title="Reservas"
          :value="estadisticasEstados.reservado?.cantidad || 0"
          subtitle="Estado: Reservado"
          icon="✅"
          color="blue"
        />
        
        <StatCard
          title="Canceladas"
          :value="estadisticasEstados.cancelado?.cantidad || 0"
          subtitle="Estado: Cancelado"
          icon="❌"
          color="red"
        />
        
        <StatCard
          title="No Show"
          :value="estadisticasEstados.no_show?.cantidad || 0"
          subtitle="No presentados"
          icon="⚠️"
          color="amber"
        />
        
        <StatCard
          title="Reservas Adelantadas"
          :value="reservasAdelantadas"
          subtitle="Fecha futura"
          icon="📅"
          color="indigo"
        />
      </div>

      <!-- Gráficos principales -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        <ColumnChart
          v-if="seriesData && seriesData.length > 0"
          :data="seriesData"
          title="Reservas por Día"
          labelKey="date"
          valueKey="cant"
        />

        <ComparisonBarChart
          v-if="pagosProveedores && pagosProveedores.length > 0"
          :data="pagosProveedores"
          title="Comparación Anual: Pagos vs Recaudado"
        />
      </div>

      <!-- Gráfico de estados y reservas por tipo de servicio -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        <PieChart
          v-if="estadosChartData && estadosChartData.length > 0"
          :data="estadosChartData"
          title="Distribución de Estados de Reservas"
        />

        <BarChart
          v-if="reservasPorTipoChartData && reservasPorTipoChartData.length > 0"
          :data="reservasPorTipoChartData"
          title="Reservas por Tipo de Servicio"
          labelKey="x"
          valueKey="y"
        />
      </div>

      <!-- Gráfico de reservas y ventas por canal -->
      <div class="mb-6">
        <GroupedBarChart
          v-if="reservasPorCanal && reservasPorCanal.length > 0"
          :data="reservasPorCanal"
          title="Reservas y Ventas por Canal de Venta"
        />
      </div>

      <!-- Gráfico de barras de costos por proveedor -->
      

      <!-- Top 5 Servicios más vendidos y menos vendidos -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        <SimpleTable
          v-if="topServicios.top5 && topServicios.top5.length > 0"
          :data="topServicios.top5"
          :columns="columnsTopServicios"
          title="Top 5 Servicios Más Vendidos"
        />
        
        <SimpleTable
          v-if="topServicios.bottom5 && topServicios.bottom5.length > 0"
          :data="topServicios.bottom5"
          :columns="columnsTopServicios"
          title="Top 5 Servicios Menos Vendidos"
        />
      </div>

      <!-- Tabla de servicios por tipo -->
      
        
        <SimpleTable
          v-if="proveedores && proveedores.length > 0"
          :data="proveedores"
          :columns="columns"
          title="Costos por Proveedor"
        />
    </div>
  </AppLayout>
</template>

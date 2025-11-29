<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
});

const chartCanvas = ref(null);
let chartInstance = null;

const createChart = () => {
  if (!chartCanvas.value || !props.data.length) return;

  // Destruir gráfico anterior si existe
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartCanvas.value.getContext('2d');
  
  const labels = props.data.map(item => item.month);
  const totalPagado = props.data.map(item => item.total_pagado);
  const totalRecaudado = props.data.map(item => item.total_recaudado);

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Total Pagado a Proveedores',
          data: totalPagado,
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 2
        },
        {
          label: 'Total Recaudado',
          data: totalRecaudado,
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: props.title,
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          padding: 12,
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          callbacks: {
            title: function(tooltipItems) {
              return tooltipItems[0].label;
            },
            beforeBody: function(tooltipItems) {
              // Obtener los datos del mes actual
              const monthIndex = tooltipItems[0].dataIndex;
              const totalPagado = props.data[monthIndex].total_pagado;
              const totalRecaudado = props.data[monthIndex].total_recaudado;
              const utilidad = totalRecaudado - totalPagado;
              
              return '';
            },
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
              }).format(context.parsed.y);
              return label;
            },
            footer: function(tooltipItems) {
              const monthIndex = tooltipItems[0].dataIndex;
              const totalPagado = props.data[monthIndex].total_pagado;
              const totalRecaudado = props.data[monthIndex].total_recaudado;
              const utilidad = totalRecaudado - totalPagado;
              const porcentajeUtilidad = totalRecaudado > 0 
                ? ((utilidad / totalRecaudado) * 100).toFixed(1) 
                : 0;
              
              return [
                '━━━━━━━━━━━━━━━━━',
                'Utilidad: ' + new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                }).format(utilidad),
                'Margen: ' + porcentajeUtilidad + '%'
              ];
            }
          },
          footerColor: '#10b981',
          footerFont: {
            weight: 'bold',
            size: 12
          }
        }
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            font: {
              size: 11
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                notation: 'compact',
                compactDisplay: 'short'
              }).format(value);
            }
          }
        }
      }
    }
  });
};

onMounted(() => {
  createChart();
});

watch(() => props.data, () => {
  createChart();
}, { deep: true });
</script>

<template>
  <div class="w-full h-96 shadow-xl rounded-lg p-4 bg-white">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

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

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const createChart = () => {
    if (!chartCanvas.value || !props.data.length) return;

    // Destruir gráfico anterior si existe
    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = chartCanvas.value.getContext('2d');

    const labels = props.data.map(item => item.x);
    const values = props.data.map(item => item.y);
    const percentages = props.data.map(item => item.porcentaje);
    const recaudado = props.data.map(item => item.recaudado);
    const pagado = props.data.map(item => item.pagado);

    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(239, 68, 68)',
                    'rgb(251, 191, 36)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: props.title,
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = percentages[context.dataIndex];
                            const totalRecaudado = recaudado[context.dataIndex];
                            const totalPagado = pagado[context.dataIndex];
                            const utilidad = totalRecaudado - totalPagado;

                            return [
                                `${label}: ${value} reservas`,
                                `Porcentaje: ${percentage}%`,
                                `Recaudado: ${formatCurrency(totalRecaudado)}`,
                                `Pagado: ${formatCurrency(totalPagado)}`,
                                `Utilidad: ${formatCurrency(utilidad)}`
                            ];
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 16
                    },
                    formatter: (value, context) => {
                        const percentage = percentages[context.dataIndex];
                        return `${percentage}%`;
                    }
                }
            }
        },
        plugins: [{
            id: 'customDataLabels',
            afterDatasetsDraw: (chart) => {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, datasetIndex) => {
                    const meta = chart.getDatasetMeta(datasetIndex);
                    meta.data.forEach((element, index) => {
                        const data = dataset.data[index];
                        const percentage = percentages[index];

                        // Calcular la posición
                        const { x, y } = element.tooltipPosition();

                        // Estilo del texto
                        ctx.fillStyle = '#fff';
                        ctx.font = 'bold 16px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        // Dibujar el porcentaje
                        ctx.fillText(`${percentage}%`, x, y);
                    });
                });
            }
        }]
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

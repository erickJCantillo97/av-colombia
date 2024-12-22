<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
    data: {
        type: Array,
        default: []
    }
});

onMounted(() => {
    console.log(props.data);
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: props.data.map((item) => item.proveedor),
        datasets: [
            {
                label: 'Ingresos',
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                data: props.data.map((item) => item.ventas)
            },
            {
                label: 'Costos',
                backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                data: props.data.map((item) => item.costos)
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
</script>

<script setup>
import { onMounted, ref } from 'vue';
import { boolean } from 'yup';


const props = defineProps(
    {
        label: String,
        value: Number,
        mes: {
            type: Boolean,
            default: true
        },
        color: {
            type: String,
            default: "teal"
        }
    }
);



const COP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];
const currentMonth = monthNames[new Date().getMonth()];

</script>

<template>
    <div :class="`flex items-center py-8 px-4   font-bold bg-${color}-100
        flex-col`">
        <p :class="`text-${color}-800 text-3xl`">
            {{ COP.format(value) }}
        </p>
        <p :class="`text-${color}-800 text-xl`">{{ label }} <span v-if="mes" class="capitalize">{{ currentMonth
                }}</span></p>

    </div>
</template>
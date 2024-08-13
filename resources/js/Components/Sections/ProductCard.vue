<template>
    
    
</template>
<script setup>
import { Link } from '@inertiajs/vue3';


const props = defineProps({
    product: Object
});
const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});
</script>
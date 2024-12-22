<template>
    <div>
        <div
            class="flex gap-y-2 items-center justify-between py-8 px-4 rounded-lg shadow-xl font-bold bg-teal-100  flex-col">
            <p class="text-teal-800 text-3xl">
                {{ costos }}
            </p>
        </div>
        <div
            class="flex gap-y-2 items-center justify-between py-8 px-4 rounded-lg shadow-xl font-bold bg-teal-100  flex-col">
            <p class="text-teal-800 text-3xl">
                {{ ventas }}
            </p>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const ventas = ref(0);
const costos = ref(0);


onMounted(() => {

    
});

</script>
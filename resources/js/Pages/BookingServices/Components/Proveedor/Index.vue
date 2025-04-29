<template>
    <div class="flex flex-col gap-y-6">
        <ProveedorForm :bookingService></ProveedorForm>
        <ProveedorsTable
            :bookingService
        />
    </div>
</template>
<script setup>
import ProveedorsTable from './Table.vue';
import ProveedorForm from './Form.vue';

const props = defineProps({
    bookingService: Object,
})
</script>

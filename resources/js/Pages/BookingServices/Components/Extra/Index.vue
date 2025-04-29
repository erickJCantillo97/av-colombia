<template>
    <div class="flex flex-col gap-y-6">
        <Form :bookingService></Form>
        <Table
            :bookingService
        />
    </div>
</template>
<script setup>
import Table from './Table.vue';
import Form from './Form.vue';

const props = defineProps({
    bookingService: Object,
})
</script>

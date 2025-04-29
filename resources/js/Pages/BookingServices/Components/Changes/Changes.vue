<template>
    <div class="flex flex-col gap-y-4">
        <div v-for="change in bookingService.changes">
            <Item :change></Item>
        </div>
    </div>
</template>

<script setup>
import Item from './Item.vue';


defineProps({
    bookingService: Object,
})
</script>

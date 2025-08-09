
<template>
    <div class="card flex justify-center">
        <Drawer v-model:visible="visible">
            <template #container="{ closeCallback }">
               <Menu></Menu>
            </template>
        </Drawer>
        <Button icon="pi pi-bars" @click="visible = true" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "./Menu.vue";

const visible = ref(false);
</script>

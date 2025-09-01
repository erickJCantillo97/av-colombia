<template>
    <div class="p-4">
        Tipos de tiquetes
    </div>
</template>
<script setup>

const columns = [
    {
        header: 'Tipo de Tiquete',
        field: 'name',
        filter: true,
    },
    {
        header: 'Servicios',
        field: 'servicios',
        filter: true,
    }
]
</script>
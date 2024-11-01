<template>
    <div
        class="shadow-md border border-slate-400 ease-in duration-300 rounded-md text-sm p-1.5 text-center hover:bg-slate-800 hover:text-white cursor-default">
        <p class="font-semibold ">
            {{ label
            }}
        </p>
        <p>
            {{ value ?? '-' }}
        </p>
    </div>
</template>
<script setup>

defineProps({
    label: String,
    value: String,
});
</script>
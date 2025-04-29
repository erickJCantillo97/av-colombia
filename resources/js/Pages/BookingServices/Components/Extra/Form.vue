<template>
    <form class="w-full flex justify-between gap-x-4" @submit.prevent="extras.submit">
        <IftaLabel class="w-full">
            <InputNumber  v-model="extras.form.cantidad"  inputId="cant"  variant="filled" class="w-full" />
            <label for="cant">Cantidad</label>
        </IftaLabel>
        <IftaLabel class="w-full">
            <InputText  v-model="extras.form.description"  inputId="des"  variant="filled" class="w-full" />
            <label for="des">Descipcion</label>
        </IftaLabel>
        <IftaLabel class="w-full">
            <InputNumber  v-model="extras.form.unit_price"  inputId="price_input" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-full" />
            <label for="price_input">Precio Unitario</label>
        </IftaLabel>
        <IftaLabel class="w-full">
            <InputNumber  :default-value="extras.totalPrice"  disabled inputId="price_input" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-full" />
            <label for="price_input">Precio Total</label>
        </IftaLabel>
        <Button type="submit" severity="success"  class="w-full">
            <i class="fa-solid fa-plus"></i>
            Agregar
        </Button>
    </form>

</template>
<script setup>
import Extras from '@/Models/BookingServices/Extras';

const props = defineProps({
    bookingService: Object,
})

const extras = new Extras(props.bookingService);

</script>

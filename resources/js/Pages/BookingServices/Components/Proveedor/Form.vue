<template>
  <form class="w-full flex justify-between gap-x-4" @submit.prevent="bookingServicesProveedors.submit">
    <IftaLabel class="w-full">
      <Select :options="proveedors" inputId="proveedor" @change="bookingServicesProveedors.calculateCost()"
        v-model="bookingServicesProveedors.form.p" variant="filled" placeholder="Selecciona un proveedor" class="w-full"
        option-label="nombre">
        <template #value="slotProps">
          <span v-if="slotProps.value">
            {{ slotProps.value.nombre }} - {{ slotProps.value.pivot.concept }}</span>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex gap-x-2">
            <span>{{ slotProps.option.nombre }} - </span>
            <span>{{ slotProps.option.pivot.concept }} - </span>
            <span>{{ slotProps.option.pivot.value }}</span>
          </div>
        </template>
      </Select>
      <label for="proveedor">Proveedor - Concepto</label>
    </IftaLabel>
    <IftaLabel class="w-full">
      <InputNumber v-model="bookingServicesProveedors.form.cost" inputId="price_input" mode="currency" currency="USD"
        locale="en-US" variant="filled" class="w-full" />
      <label for="price_input">Costo</label>
    </IftaLabel>
    <IftaLabel class="w-full">
      <InputNumber v-model="bookingServicesProveedors.form.discount" inputId="price_input" mode="currency"
        currency="USD" locale="en-US" variant="filled" class="w-full" />
      <label for="price_input">
        Descuento por pasajero
      </label>
    </IftaLabel>
    <IftaLabel class="w-full">
      <InputNumber v-model="bookingServicesProveedors.form.percent_discount" inputId="discount_input"
         variant="filled"  class="w-full" />
      <label for="discount_input">
       % Descuento por pasajero
      </label>
    </IftaLabel>

    
    <Button type="submit" severity="success" class="w-full">
      <i class="fa-solid fa-plus"></i>
      Agregar
    </Button>
  </form>

</template>
<script setup>
import Service from '@/Models/Services/Service';
import { onMounted, ref } from 'vue';
import BookingServicesProveedors from '@/Models/BookingServices/Proveedors';


const serviceModel = new Service();
const props = defineProps({
  bookingService: Object,
})
const proveedors = ref([]);
const bookingServicesProveedors = new BookingServicesProveedors(props.bookingService);

onMounted(async () => {
  proveedors.value = await serviceModel.getProveedorsByService(props.bookingService?.service_id);
})

</script>

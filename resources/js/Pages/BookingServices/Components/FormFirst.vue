<script setup>
import Input from '@/Components/Customs/Input.vue';
import BookingServices from '@/Models/BookingServices/BookingServices'
import { onMounted, ref } from 'vue';
import Service from '@/Models/Services/Service';
const services = ref([]);
const channels = ref([]);
const methods = ref([]);
const props = defineProps({
    bookingService: Object
})

const service = new Service();
const bookingServices = new BookingServices(props.bookingService);
const form = bookingServices.form

onMounted(async () => {
    services.value = await service.getServices();
    channels.value = await bookingServices.getChannels();
    methods.value = await bookingServices.getMethods();
})

</script>
<template>
    <div class="">
        <form class="grid grid-cols-1 md:grid-cols-2 gap-2 items-center" @submit.prevent="bookingServices.submit">
            <!-- @value-change="getProveedors" -->
            <Input v-model="form.service_id" class="col-span-2" type="dropdown" label="Servicio" option-label="title" option-value="id"
                :options="services" ></Input>
            <!-- <Input label="Codigo de Reserva" v-model="form.code_booking" /> -->
            <Input label="Fecha de Reserva" v-model="form.date" :enableTimePicker="true" class="w-full" type="datetime" />
            <Input label="Valor Total" type="number" mode="currency" :required="true" v-model="form.total"></Input>
            <Input label="Tiempo del Servicio" type="dropdown" v-model="form.time_service" :options="[
                '20 Minutos',
                '30 Minutos',
                '40 Minutos',
                '1 Hora',
                '2 Horas',
                '6 Horas',
                '12 Horas',
                '24 Horas',
            ]"></Input>
            <Input label="Pasajeros" type="number" v-model="form.adults"></Input>
            <Input label="Niños" type="number" v-model="form.boys"></Input>
            <Input label="Nombre del Pasajero" :required="true" v-model="form.cliente_name" class="w-full" />
            <Input label="Telefono" class="w-full" type="number" v-model="form.cliente_phone" />
            <Input label="Ciudad de donde Proviene" class="w-full"  v-model="form.cliente_city"/>
            <Input label="Edificio u Hotel" class="w-full" v-model="form.cliente_building"/>

            <Input class="w-full" type="dropdown" option-label="name" option-value="id" :options="methods" v-model="form.method_id"
                label="Medio de Pago"  />
            <Input class="w-full" type="dropdown" option-label="name" option-value="id" :options="channels" v-model="form.channel_id"
                label="Canal de Venta"  />
            <Input class="w-full" label="Saldo"type="number" mode="currency" v-model="form.saldo" />
            <Input class="w-full col-span-1 md:col-span-2" :rows-textarea="2" label="Observaciones" v-model="form.observations" type="textarea" />
            <div class="flex justify-between w-full gap-x-4 col-span-2">
                <div class="p-2 border rounded-md shadow-md w-full text-center">
                    <p class="text-md font-extralight">Valor Pasajero</p>
                    <h1 class="text-xl font-bold">{{ bookingServices.valuePasajeros }}</h1>
                </div>
                <div class="p-2 border rounded-md shadow-md w-full text-center">
                    <p class="text-md font-extralight">Comisiones Canal de venta</p>
                    <h1 class="text-xl font-bold">{{ bookingServices.valueCanalVenta }}</h1>
                </div>
                <div class="p-2 border rounded-md shadow-md w-full text-center">
                    <p class="text-md font-extralight">Valor total Real</p>
                    <h1 class="text-xl font-bold">{{ bookingServices.valorRealFormat }}</h1>
                </div>
            </div>
            <Button class="col-span-2" type="submit" severity="success" :label="bookingService ? 'Actualizar Reserva':'Crear Reserva'" :loading="bookingServices.loading.value" />
        </form>
    </div>

</template>

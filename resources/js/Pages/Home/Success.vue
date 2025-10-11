<template>
  <div class="w-screen h-screen bg-teal-100/60 flex items-center justify-center">
    <div
      class="font-bold text-teal-900 border-2 border-teal-900 rounded-lg p-2 md:p-10 w-full md:w-1/2 mx-10 bg-white shadow-lg"
    >
      <p class="text-3xl text-center">Solicitud de Reserva Enviada</p>
      <p class="text-sm mt-4 text-center">Su reserva ha sido enviada con éxito</p>
      <div class="flex flex-col gap-y-4 mt-4 p-1">
        <dl class="text-md flex justify-between w-full">
          <dt>Servicio</dt>
          <dd class="text-end">
            {{ bookingService.service }}
          </dd>
        </dl>
        <dl class="text-md flex justify-between w-full items-center">
          <dt>Fecha</dt>
          <dd>
            {{ bookingService.date }}
          </dd>
        </dl>
        <dl class="text-md flex justify-between w-full">
          <dt>Hora</dt>
          <dd>
            {{ bookingService.hour }}
          </dd>
        </dl>
        <dl class="text-md flex justify-between w-full">
          <dt>Cliente</dt>
          <dd>
            {{ bookingService.cliente_name }}
          </dd>
        </dl>
        <dl class="text-md flex justify-between w-full">
          <dt>Telefono</dt>
          <dd>
            {{ bookingService.cliente_phone }}
          </dd>
        </dl>
        <dl class="text-md flex justify-between w-full">
          <dt>Edificio</dt>
          <dd>
            {{ bookingService.cliente_building }}
          </dd>
        </dl>
        <dl class="text-md flex justify-between w-full">
          <dt>Valor Total</dt>
          <dd>
            {{ USDollar.format(bookingService.total_real) }}
          </dd>
        </dl>
        
      </div>
      <p
        class="text-xs text-center text-gray-600 italic my-4 w-full md:w-[20vw] flex items-center justify-center mx-auto"
      >
        Esta reserva será verificada lo antes posible, nos comunicaremos con usted para
        confirmar la reserva.
      </p>
      <p class="text-lg mt-4 text-center">Gracias por elegirnos</p>
      <div class="w-full flex justify-center mt-4">
        <router-link :to="`/${bookingService.user_id}`" class="text-teal-800"
          >Volver al inicio</router-link
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
    bookingService: Object,
});


const USDollar = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

// const getBookingService = () => {
//   axios.get("getBookingServices/" + route.params.id).then((response) => {
//     bookingService.value = response.data.booking_service;
//   });
// };

// getBookingService();
</script>
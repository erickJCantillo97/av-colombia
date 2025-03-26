<template>
  <div
    class="p-4 shadow-xl w-[20%] rounded-lg fixed right-52 -mt-32 bg-white space-y-4 overflow-y-auto h-[60vh]"
  >
    <p class="font-extrabold text-center text-3xl uppercase text-green-700">
      Reservar tour
    </p>
    <div class="flex flex-col gap-y-2">
      <label for="date" class="font-bold">Fecha</label>
      <flat-pickr
        v-model="date"
        :config
        class="text-center rounded-lg shadow-lg border-2 border-black"
      />
    </div>
    <hr />
    <div v-if="date" class="flex flex-col gap-y-4">
      <p class="font-bold">¿Para cuantos?</p>
      <div class="flex flex-col gap-y-1">
        <div
          v-for="person in formReserva.persons"
          :key="person.id"
          class="p-3 flex items-center justify-between font-bold rounded-lg w-full shadow-xl"
        >
          <div class="flex flex-col text-md w-full">
            <span>Adultos</span>
            <span class="text-xs">({{ person.min ?? 0 }} - {{ person.max }} Años)</span>
          </div>
          <div class="flex items-center gap-x-4 w-full justify-end text-center">
            <button
              class="text-red-500 border border-red-400 font-bold rounded-full px-2.5 py-1"
              @click="person.cant = person.cant - 1"
            >
              -
            </button>
            <input
              type="text"
              v-model="person.cant"
              min="0"
              class="w-full rounded-xl right-0 border-0 focus:ring-0 text-center"
            />
            <button
              class="text-green-500 border border-green-500 font-bold rounded-full px-2.5 py-1"
              @click="person.cant += 1"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <p class="font-bold">¿A que hora?</p>
      <div class="grid grid-cols-3 gap-2">
        <Button
          :outlined="formReserva.time != time.horario.id"
          v-for="time in filterAvailabilitiesHours"
          :key="time.horario.id"
          @click="formReserva.time = time.horario.id"
        >
          <span>{{ time.start.slice(0, 5) }} </span>
          <span v-if="time.end">-</span>
          <span v-if="time.end">{{ time.end.slice(0, 5) }}</span>
        </Button>
      </div>
      <hr />
      <div class="text-2xl font-bold text-green-500 flex items-center gap-x-4">
        <span class="text-xl font-bold text-green-500">
          <i class="fa-solid fa-tag rotate-90"></i>
        </span>
        <span class="text-xl font-bold text-green-500">
          {{ COP.format(costoTotal) }}</span
        >
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-y-4">
      <Logo></Logo>
      <h1 class="font-mono font-bold text-xl">Seleccione una fecha</h1>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/themes/material_blue.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import { useForm } from "@inertiajs/vue3";
import { Button } from "primevue";
import { data } from "autoprefixer";
import Logo from "@/Components/logo.vue";

const props = defineProps(["product", "availabilities"]);

const config = {
  minDate: "today",
  locale: Spanish,
};

const date = ref();

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const formReserva = useForm({
  date: "",
  persons: [],
  time: "",
});

const filterAvailabilitiesHours = computed(() => {
  var availabilities =
    props.availabilities.find(
      (x) => x.start_date <= date.value && x.end_date >= date.value
    ) ?? [];
  var horarios = [];
  if (availabilities.horarios) {
    horarios = availabilities.horarios
      .filter((x) => x.day_number == new Date(date.value).getDay() + 1)
      .map((x) => {
        return {
          start: x.start,
          end: x.end,
          horario: x,
        };
      });
  }
  addPersons();
  return horarios;
});

const addPersons = () => {
  var availabilities =
    props.availabilities.find(
      (x) => x.start_date <= date.value && x.end_date >= date.value
    )?.precies ?? [];
  formReserva.persons = availabilities.map((x) => {
    return {
      id: x.id,
      min: x.min,
      max: x.max,
      value: x.value,
      cant: 0,
    };
  });
};

const costoTotal = computed(() => {
  var total = 0;
  formReserva.persons.forEach((person) => {
    total += person.cant * person.value;
  });
  return total;
});
</script>

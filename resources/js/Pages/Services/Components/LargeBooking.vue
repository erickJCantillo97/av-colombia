<template>
  <div
    class="px-6 py-4 shadow-xl w-[18%] rounded-lg fixed right-64 -mt-32 bg-white space-y-4"
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
    <code>
      {{ filterAvailabilitiesHours }}
    </code>
    <p class="font-bold">¿Para cuantos?</p>

    <div class="grid grid-cols-2">
      <div v-for="time in filterAvailabilitiesHours" :key="time.horario.id">
        <button
          class="bg-green-500 text-white font-bold rounded-lg p-2"
          @click="console.log(time)"
        >
          {{ time.start }} - {{ time.end }}
        </button>
      </div>
    </div>
    <div class="text-2xl font-bold text-green-500 flex items-center gap-x-4">
      <span class="text-xl font-bold text-green-500">
        <i class="fa-solid fa-tag rotate-90"></i>
      </span>
      <span class="text-xl font-bold text-green-500"
        >{{ COP.format(400000) }} x Adulto</span
      >
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/themes/material_blue.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";

const props = defineProps(["product", "availabilities"]);

const config = {
  minDate: "today",
  defaultDate: "today",
  locale: Spanish,
};

const date = ref(new Date());

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const filterAvailabilitiesHours = computed(() => {
  var horarios =
    props.availabilities.find(
      (x) => x.start_date <= date.value && x.end_date >= date.value
    )?.horarios ?? [];
  if (horarios.length > 0) {
    return horarios
      .filter((x) => x.day_number == new Date(date.value).getDay() + 1)
      .map((x) => {
        return {
          start: x.start,
          end: x.end,
          horario: x,
        };
      });
  }
  return horarios;
});
</script>

<template>
  <span @click="show = true" class="text-xs font-bold text-blue-800 cursor-pointer"
    >Listado de Cambios</span
  >

  <Modal title="Historial de Cambios" v-model="show" close-on-escape>
    <Input
      :max-date="new Date()"
      type="date"
      class="my-2"
      v-model="date"
      dateFormat="dd/mm/yy"
    />
    <div
      v-if="changes && changes.length == 0"
      class="items-center justify-center flex flex-col"
    >
      <Logo></Logo>
      <p>Sin Cambio Registrados</p>
    </div>
    <div class="flex flex-col gap-y-3 h-[60vh] overflow-y-auto">
      <div
        v-for="change in changes"
        class="shadow-lg pr-4 rounded-md flex items-center justify-between"
      >
        <div
          class="rounded-l-md text-lg font-bold uppercase"
          :class="`bg-${statues[change.state]}-200 p-2`"
        >
          {{ change.state }}
        </div>
        <div>
          <p class="text-xl font-bold">{{ change.statable.service }}</p>
          <span class="font-bold text-sm">
            {{ change.user.name }}
          </span>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import Modal from "./Modal.vue";
import Input from "./Input.vue";
import { computedAsync } from "@vueuse/core";
import Logo from "../logo.vue";

const show = ref(false);
const date = ref();

const changes = computedAsync(async () => {
  var { data } = await axios.get(
    route("get.states.change", {
      date: date.value,
    })
  );
  console.log(data.status);
  return data.status;
});

const statues = {
  reservado: "blue",
  "CAMBIO DE FECHA": "gray",
  "NO SHOW": "amber",
  REUBICADO: "orange",
  CANCELADA: "green",
  PROBLEMATICA: "red",
};
</script>

<script setup>
import { ref } from "vue";
import Input from "../Customs/Input.vue";
import axios from "axios";
import { Link, router } from "@inertiajs/vue3";
import { useHomeStore } from "@/stores/HomeStore";
import { storeToRefs } from "pinia";
import DatePicker from "primevue/datepicker";
import { root } from "postcss";

const store = useHomeStore();
const { form } = storeToRefs(store);

const searchRef = ref(null);

const props = defineProps({
  type: {
    type: String,
  },
});

const op = ref();
const opCity = ref();
const dateSelector = ref();
const selectedMember = ref(null);

const serviceType = ref([
  { name: "Tours", icon: "fa-umbrella-beach", value: "TOUR" },
  { name: "Alojamientos", icon: "fa-hotel", value: "ALOJAMIENTO" },
  { name: "Transportes", icon: "fa-car", value: "TRANSFER" },
  { name: "Embarcaciones", icon: "fa-ship", value: "EMBARCACIONES" },
]);
const toggle = (event) => {
  op.value.toggle(event);
};

const toogleCity = (event) => {
  opCity.value.toggle(event);
};

const selectMember = (member) => {
  selectedMember.value = member;
  form.value.type = member.value;
  op.value.hide();
  searchRef.value.focus();
  // toogleCity();
};

const selectionCity = (member) => {
  form.value.city = member;
  opCity.value.hide();
  // searchRef.value.focus();
  console.log(dateSelector.value);
  dateSelector.value.click();
};

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MM",
});

const search = () => {
  let type = "";
  if (form.value.type) {
    type = form.value.type;
  }
  router.visit(
    route("services.home", {
      type: type,
      city: form.value.city,
      date: form.value.date,
      search: form.value.search,
    })
  );
};
</script>

<template>
  <div class="p-4">
    <form
      @submit.prevent="search"
      class="w-full rounded-lg grid grid-cols-6 items-center border border-gray-600 gap-x-2 divide-x"
    >
      <div class="col-span-3 md:col-span-1">
        <Button
          type="button"
          size="large"
          :label="form.type ? form.type : 'Servicios'"
          text
          @click="toggle"
          class="w-full"
          icon="fa-solid fa-arrow-down"
          icon-pos="right"
          pt:root:class="!flex !justify-between !text-md !text-gray-600"
        />
        <Popover ref="op">
          <div class="flex flex-col gap-4">
            <div>
              <span class="mb-2 text-xl font-extrabold"
                >Selecciona uno de nuestros Servicios</span
              >
              <ul class="grid grid-cols-2 gap-4">
                <div
                  @click="selectMember(service)"
                  v-for="service in serviceType"
                  class="flex flex-col items-center justify-center shadow-sm p-4 border-gray-100 border shadow-gray-200 rounded-lg cursor-pointer hover:bg-teal-100"
                >
                  <i class="fa-solid text-lg" :class="service.icon"></i>
                  <p class="text-lg font-bold">{{ service.name }}</p>
                </div>
              </ul>
            </div>
          </div>
        </Popover>
      </div>
      <div class="col-span-3 md:col-span-1">
        <Button
          type="button"
          size="large"
          :label="form.city ? form.city : 'Ciudad'"
          text
          @click="toogleCity"
          class="w-full"
          icon="fa-solid fa-arrow-down"
          icon-pos="right"
          pt:root:class="!flex !justify-between !text-md !text-gray-600"
        />
        <Popover ref="opCity">
          <div class="flex flex-col gap-4">
            <div>
              <span class="mb-2 text-xl font-extrabold">Selecciona una Ciudades</span>
              <ul class="grid grid-cols-2 gap-4 mt-2">
                <div
                  @click="selectionCity('Cartagena')"
                  class="flex items-center justify-center flex-col h-32 w-52 rounded-lg grayscale hover:grayscale-0 cursor-pointer"
                  style="
                    background-image: url('https://avcolombia.net/images/cartagenaSearch.webp');
                    background-size: cover;
                  "
                >
                  <h2
                    class="font-bold text-3xl text-white backdrop-opacity-10 backdrop-invert"
                  >
                    Cartagena
                  </h2>
                </div>
                <div
                  @click="selectionCity('Cali')"
                  class="flex items-center justify-center flex-col h-32 w-52 rounded-lg grayscale hover:grayscale-0 cursor-pointer"
                  style="
                    background-image: url('https://avcolombia.net/images/caliSearch.webp');
                    background-size: cover;
                  "
                >
                  <h2
                    class="font-bold text-3xl text-white backdrop-opacity-10 backdrop-invert"
                  >
                    Cali
                  </h2>
                </div>
              </ul>
            </div>
          </div>
        </Popover>
      </div>

      <div class="col-span-6 md:col-span-2 my-2 border-2 md:border-0 py-4">
        <input
          type="search"
          ref="searchRef"
          v-model="form.search"
          placeholder="Escriba aqui para buscar..."
          class="w-full text-lg right-0 border-0 focus:ring-0"
        />
      </div>
      <div class="col-span-6 md:col-span-1 my-2" ref="dateSelector">
        <!-- <DatePicker
          v-model="form.date"
          :pt="{
            root: 'w-full text-lg right-0 border-0 focus:ring-0',
            input: 'w-full text-lg right-0 border-0 focus:ring-0',
            pcInputText: {
              root: '!w-full !text-lg !right-0 border-0 focus:ring-0 ',
            },
          }"
        /> -->

        <!-- <vue-tailwind-datepicker
          v-model="form.date"
          i18n="es"
          as-single
          placeholder="Fecha"
          input-classes="w-full text-lg right-0 border-0 focus:ring-0"
          :shortcuts="false"
          overlay
          :formatter="formatter"
        /> -->
        <input
          type="date"
          v-model="search.date"
          placeholder="Escriba aqui para buscar..."
          class="w-full right-0 border-0 focus:ring-0"
        />
      </div>
      <button
        type="submit"
        class="col-span-6 md:col-span-1 text-center justify-center bg-green-400 h-full p-4 cursor-pointer rounded-sm text-xl flex gap-x-4 items-center"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>Buscar</p>
      </button>
    </form>
    <!-- <InputText class="h-12 w-full" @focus="isFocused = true" @blur="isFocused = false" v-model="search"
            @input="getServices" :placeholder="'Buscar ' + type" type="text" size="large" /> -->
    <!-- <div class="absolute w-[90vw] lg:w-[70vw] rounded-b-lg z-10 p-2 bg-gray-200 space-y-2"
            v-if="search || isFocused">
            <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
            <Link v-else-if="services.length > 0 && search" :href="route('show.services', service.slug)"
                v-for="service in services">
            <div
                class="p-2 bg-white hidden md:flex my-1 justify-between rounded-lg hover:bg-black cursor-pointer hover:text-white">
                <div class="flex flex-col w-full">
                    <p>{{ service.title }}</p>
                    <div class="flex space-x-2 items-center">
                        <div v-for="feature in service.features"
                            class="py-0.5 px-3 text-sm font-bold text-white  rounded-full"
                            :style="`background-color: #${feature.color};`">
                            {{ feature.name }}
                        </div>
                    </div>
                </div>
                <p>
                    {{ USDollar.format(service.price) }}
                </p>
            </div>
            <ProductCard class="md:hidden block " :product="service" />
            </Link>
            <div v-else-if="search" class="text-lg">
                No encontramos nada relacionado con <strong>{{ search }}</strong> pero te recomendamos
            </div>
            <div v-else class="text-lg">
                Escriba algo para buscar...
            </div>
        </div> -->
  </div>
</template>

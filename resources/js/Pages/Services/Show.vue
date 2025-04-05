<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { computed, ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { StarIcon } from "@heroicons/vue/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/vue/24/outline";
import Header from "@/Components/Sections/Header.vue";
import Portada from "./Components/Portada.vue";
import Breadcrumb from "./Components/Breadcrumb.vue";
import Gallery from "./Components/Gallery.vue";
import LargeBooking from "./Components/LargeBooking.vue";

const props = defineProps({
  service: Object,
  availabilities: Array,
});

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const product = {
  name: props.service.title,
  price: USDollar.format(props.service.price),
  rating: 4,
  images: props.service.images.map((image) => image.filepath),
  features: props.service.features,
  description: props.service.description,
  details: [
    {
      name: "Incluidos",
      items: JSON.parse(props.service.includes),
    },
    {
      name: "No Incluidos",
      items: JSON.parse(props.service.notIncludes),
    },
    // More sections...
  ],
};

const date = ref();

const allowedDates = computed(() => {
  let horarios = props.availabilities;
  let dates = [];
  // console.log(horarios);
  horarios.forEach((element) => {
    let fecha = new Date(element.start_date);
    do {
      // console.log(fecha);
      dates.push(fecha);
      fecha = new Date(fecha.setDate(fecha.getDate() + 1));
    } while (fecha <= new Date(element.end_date));
  });
  // console.log(dates);
  return dates;
});

const times = computed(() => {
  let horarios = props.availabilities;
  let times = horarios
    .find((x) => x.start_date < date.value && x.end_date > date.value)
    .horarios.filter((x) => x.day_number == new Date(date.value).getDay() + 1);
  return times;
});
</script>

<template>
  <Header />
  <div class="px-4 py-16 md:p-28 bg-gray-100">
    <Portada :images="product.images" :portada="product.images[0]" />
    <div class="flex md:flex-row flex-col gap-4">
      <div class="my-4 rounded-xl p-4 w-full md:w-[70%] flex flex-col gap-y-4">
        <Breadcrumb />
        <h1 class="text-3xl font-bold text-gray-800">
          {{ product.name }}
        </h1>
        <Gallery :images="product.images"></Gallery>
        <div class="flex flex-col gap-y-4" v-html="product.description"></div>
      </div>
      <LargeBooking :product="service" :availabilities></LargeBooking>
    </div>
  </div>
</template>

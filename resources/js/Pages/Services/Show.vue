<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { computed, ref } from "vue";
import IncludesView from "./Components/IncludesView.vue";
import Header from "@/Components/Sections/Header.vue";
import Portada from "./Components/Portada.vue";
import Breadcrumb from "./Components/Breadcrumb.vue";
import Gallery from "./Components/Gallery.vue";
import LargeBooking from "./Components/LargeBooking.vue";
import Equipament from "./Components/Equipament.vue";
import CollectionPoints from "./Components/CollectionPoints.vue";

const props = defineProps({
  service: Object,
  availabilities: Array,
});

const showFullDescription = ref(false);

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


</script>

<template>
  <Header />
  <div class="px-4 py-16 md:p-28 ">
    <Portada :images="product.images" :portada="product.images[0]" />
    <div class="flex md:flex-row flex-col gap-4">
      <div class="my-4 rounded-xl p-4 w-full md:w-[70%] flex flex-col gap-y-4">
        <Breadcrumb :service="service"  />
        <h1 class="text-3xl font-bold text-gray-800">
          {{ product.name }}
        </h1>
        <Gallery :images="product.images"></Gallery>
        <div class="flex flex-col gap-y-4 text-justify text-gray-700">
          <transition name="expand">
            <div
              v-if="showFullDescription || product.description.length <= 500"
              key="full"
              v-html="product.description"
            ></div>
            <div
              v-else
              key="short"
              v-html="product.description.slice(0, 500) + '...'"
            ></div>
          </transition>
          <button
            v-if="product.description.length > 500"
            @click="showFullDescription = !showFullDescription"
            class="text-blue-600 hover:underline mt-2 self-end"
          >
            {{ showFullDescription ? 'Ver menos' : 'Ver más' }}
          </button>
        </div>
        <Equipament :service="service" v-if="service.type == 'EMBARCACION'"></Equipament>
        <IncludesView :service="service" v-if="service.includes != '[]'"></IncludesView>
        <CollectionPoints :service="service" v-if="service.recogidas != '[]'"  />
      </div>
      <LargeBooking :product="service" :availabilities></LargeBooking>
    </div>
  </div>
</template>
<style scoped>
/* ...existing code... */

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
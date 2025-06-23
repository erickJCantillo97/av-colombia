<template>
  <GuestLayout>
    <div class="sticky top-20 z-10 bg-white shadow-md">
      <div class="flex items-center justify-between px-4 py-2">
        <div class="w-full flex items-center gap-x-4 justify-between">
          <div class="flex flex-col">
            <span class="font-semibold text-lg">Filtros</span>
           
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-y-4">
      <ul
        class="w-full gap-2 md:gap-4 py-10 bg-gray-100 grid grid-cols-1 md:grid-cols-4 md:px-10 px-5"
      >
        <Product :service v-for="service in services" />
      </ul>
      <div class="w-full flex items-center justify-center py-4" v-if="searching">
        <Loading v-if="searching" />
      </div>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { onMounted, ref, watch } from "vue";
import Product from "./Product.vue";
import Loading from "@/Components/Loading.vue";
import Service from "@/Models/Services/Service";

const serviceModel = new Service();

const services = ref([]);
const page = ref(1);
const hasMore = ref(true);
const searching = ref(false);

async function fetchServices(reset = false) {
  if (searching.value || (!hasMore.value && !reset)) return;
  searching.value = true;
  if (reset) {
    services.value = [];
    page.value = 1;
    hasMore.value = true;
  }
  try {
    const result = await serviceModel.getServicePagination(page.value, 10);
    console.log(result);
    if (result && Array.isArray(result.data)) {
      if (reset) services.value = result.data;
      else services.value.push(...result.data);
      hasMore.value = !!result.next_page_url;
    } else if (Array.isArray(result)) {
      // fallback si backend no responde con paginación
      if (reset) services.value = result;
      else services.value.push(...result);
      hasMore.value = false;
    }
    page.value++;
  } finally {
    searching.value = false;
  }
}

function onScroll() {
  if (searching.value || !hasMore.value) return;
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.offsetHeight;
  if (scrollY + windowHeight + 200 >= docHeight) {
    fetchServices();
  }
}

onMounted(() => {
  fetchServices(true);
  window.addEventListener('scroll', onScroll);
});


</script>

<template>
  <GuestLayout>
    <div class="sticky top-20 z-50 bg-white shadow-md">
      <div class="flex items-center justify-between px-4 py-2">
        <div class="w-full flex items-center gap-x-4 justify-between">
          <div class="flex flex-col">
            <span class="font-semibold text-lg">Filtros</span>
            <span class="italic text-sm">{{ services.length }} resultados</span>
          </div>
          <div>
            <SelectButton
              v-model="typeList"
              :options="options"
              optionLabel="value"
              dataKey="value"
              aria-labelledby="custom"
            >
              <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
              </template>
            </SelectButton>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-y-4">
      <div
        v-if="services.length == 0 && !searching"
        class="w-full flex items-center justify-between px-4 py-2"
      >
        sin resultados
      </div>
      <div
        v-else-if="searching"
        class="w-full flex items-center justify-center px-4 py-2 h-[20vh]"
      >
        <Loading />
      </div>
      <ul
        v-else
        class="w-full gap-2 md:gap-10 py-10 bg-gray-100"
        :class="
          typeList.value == 'list'
            ? 'grid grid-cols-1 px-5'
            : 'grid grid-cols-1 md:grid-cols-4 md:px-10 px-5'
        "
      >
        <Product :service v-for="service in services" />
      </ul>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { onMounted, ref, watch } from "vue";
import Product from "./Product.vue";
import Loading from "@/Components/Loading.vue";
import { useHomeStore } from "@/stores/HomeStore";
import { storeToRefs } from "pinia";
import Service from "@/Models/Services/Service";


const store = useHomeStore();
const { typeList } = storeToRefs(store);

const seriveModel = new Service();

const services = ref([]);

const props = defineProps({
  search: String,
  date: Date,
  type: String,
});

const search = ref(props.search);
const date = ref(props.date);
const type = ref(props.type);

onMounted( async () => {
  services.value = await seriveModel.getServices();
});

const searching = ref(false);

const op = ref();

const serviceType = ref([
  { name: "Experiencias", icon: "fa-umbrella-beach", value: "TOUR" },
  { name: "Alojamiento", icon: "fa-hotel", value: "ALOJAMIENTO" },
  { name: "Transporte", icon: "fa-car", value: "TRANSFER" },
  { name: "Embarcaciones", icon: "fa-ship", value: "EMBARCACIONES" },
]);

const options = ref([
  { icon: "pi pi-list", value: "list" },
  { icon: "pi pi-th-large", value: "grid" },
]);

const toggle = (event) => {
  op.value.toggle(event);
};
const selectMember = (member) => {
  type.value = member.value;
  op.value.hide();
};

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MM",
});
</script>

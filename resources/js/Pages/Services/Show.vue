<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { computed, ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'


const props = defineProps({
  service: Object,
  availabilities: Array,
})

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
      name: 'Incluidos',
      items: JSON.parse(props.service.includes),
    },
    {
      name: 'No Incluidos',
      items: JSON.parse(props.service.notIncludes),
    },
    // More sections...
  ],
}

const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
]);


const op = ref();
const members = ref([
  { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
  { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
  { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
]);

const toggle = (event) => {
  op.value.toggle(event);
}



const galleria = ref();
const images = ref();
const activeIndex = ref(0);
const showThumbnails = ref(false);
const fullScreen = ref(false);

const onThumbnailButtonClick = () => {
  showThumbnails.value = !showThumbnails.value;
};

const toggleFullScreen = () => {
  if (fullScreen.value) {
    closeFullScreen();
  } else {
    openFullScreen();
  }
};
const onFullScreenChange = () => {
  fullScreen.value = !fullScreen.value;
};
const openFullScreen = () => {
  let elem = galleria.value.$el;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
};
const closeFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

const fullScreenIcon = computed(() => {
  return `pi ${fullScreen.value ? 'pi-window-minimize' : 'pi-window-maximize'}`;
});


const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MM',
})

const date = ref();

const allowedDates = computed(() => {
  let horarios = props.availabilities
  let dates = [];
  // console.log(horarios);
  horarios.forEach((element) => {
    let fecha = new Date(element.start_date);
    do {
      // console.log(fecha);
      dates.push(fecha);
      fecha = new Date(fecha.setDate(fecha.getDate() + 1));
    } while (fecha <= new Date(element.end_date))
  });
  // console.log(dates);
  return dates;
})



const times = computed(() => {
  let horarios = props.availabilities
  let times = horarios.find((x) =>
    x.start_date < date.value && x.end_date > date.value
  ).horarios.filter((x) => x.day_number == new Date(date.value).getDay() + 1);
  return times;

})


</script>

<template>
  <GuestLayout>
    <div
      class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    </div>
    <div class="mx-4 md:mx-10">
      <div class="w-full md:p-10">
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <!-- Image gallery -->

          <!-- {{ product.images }} -->
          <div class="w-full shadow-2xl">

            <Galleria ref="galleria" :value="product.images" :numVisible="5" :showThumbnails="showThumbnails"
              :showItemNavigators="true" :showItemNavigatorsOnHover="true" :circular="true" :autoPlay="true"
              :transitionInterval="2000" :responsiveOptions="responsiveOptions" :pt="{
                root: {
                  class: [{ 'flex flex-col': fullScreen }]
                },
                content: {
                  class: ['relative', { 'flex-1 justify-center': fullScreen }]
                },
                thumbnails: 'absolute w-full left-0 bottom-0'
              }">
              <template #item="slotProps">
                <img :src="slotProps.item" :alt="slotProps.item.alt"
                  :style="[{ width: !fullScreen ? '100%' : '', display: !fullScreen ? 'block' : '' }]" />
              </template>
              <template #thumbnail="slotProps">
                <div class="grid gap-4 justify-center">
                  <img :src="slotProps.item" alt="images" style="display: block" />
                </div>
              </template>
              <template #footer>
                <div class="flex items-stretch bg-gray-500 text-white h-10">
                  <button type="button" @click="onThumbnailButtonClick"
                    class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3">
                    <i class="pi pi-th-large"></i>
                  </button>
                  <button type="button" @click="toggleAutoSlide"
                    class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"><i
                      :class="slideButtonIcon"></i></button>
                  <button type="button" @click="toggleFullScreen"
                    class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3 ml-auto">
                    <i :class="fullScreenIcon"></i>
                  </button>
                </div>
              </template>
            </Galleria>
          </div>

          <!-- Product info -->
          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-5xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>



            <!-- Reviews -->
            <div class="mt-3">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center">
                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                    :class="[product.rating > rating ? 'text-indigo-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                    aria-hidden="true" />
                </div>
                <p class="sr-only">{{ product.rating }} out of 5 stars</p>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="sr-only">Description</h3>
              <div class="space-y-6 text-base text-gray-700" v-html="product.description" />
            </div>

            <form class="mt-6">

              <!-- <div>
                      <h3 class="text-sm font-medium text-gray-600">Color</h3>
        
                      <fieldset aria-label="Choose a color" class="mt-2">
                        <RadioGroup v-model="selectedColor" class="flex items-center space-x-3">
                          <RadioGroupOption as="template" v-for="color in product.colors" :key="color.name" :value="color" :aria-label="color.name" v-slot="{ active, checked }">
                            <div :class="[color.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                              <span aria-hidden="true" :class="[color.bgColor, 'h-8 w-8 rounded-full border border-black border-opacity-10']" />
                            </div>
                          </RadioGroupOption>
                        </RadioGroup>
                      </fieldset>
                    </div> -->

              <div class="mt-10 flex">
                <button type="button"
                  class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  @click="toggle">Reservar</button>

                <button type="button"
                  class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span class="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" class="mt-12">
              <h2 id="details-heading" class="sr-only">Additional details</h2>

              <div class="divide-y divide-gray-200 border-t">
                <Disclosure as="div" v-for="detail in product.details" :key="detail.name" v-slot="{ open }">
                  <h3>
                    <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
                      <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">{{ detail.name
                        }}</span>
                      <span class="ml-6 flex items-center">
                        <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true" />
                        <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                          aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel as="div" class="prose prose-sm pb-6">
                    <ul role="list">
                      <li v-for="item in detail.items" :key="item">{{ item }}</li>
                    </ul>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

  </GuestLayout>

  <Popover ref="op">
    <div class="flex flex-col gap-4 w-[25rem]">
      <div>
        <span class="font-medium block mb-2">Reservar este servicio</span>

      </div>
      <div>
        <span class="font-medium block mb-2">Selecione una fecha de reserva</span>
        <VueDatePicker v-model="date" :allowed-dates="allowedDates" hide-offset-dates :enable-time-picker="false"
          :teleport="true" model-type="yyyy-MM-dd" :min-date="new Date()" locale="es" timezone="America/Bogota"
          auto-apply />
        <span v-if="date" class="block mt-2">
          Seleccionar la hora de inicio de la Actividad
          <div class="grid grid-cols-4 gap-2 mt-2">
            <div v-for="time in times" :key="time.id"
              class="flex items-center justify-center p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white">
              {{ time.start.substring(0, 5) }}
            </div>
          </div>

        </span>
      </div>

    </div>
  </Popover>
</template>
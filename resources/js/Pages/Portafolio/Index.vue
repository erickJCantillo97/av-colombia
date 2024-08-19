<template>

    <Head title="Inicio" />
    <!-- <Header /> -->
    <div class="absolute top-0 w-full h-10  p-6 flex justify-between items-center">
        <div class="flex space-x-6 items-center">
            <h1 class="font-extrabold">
                {{ $page.props.auth.user.name }}.
            </h1>
            <Button label="Inicio" text="" />
            <Button label="Reservas" text="" />
        </div>
        <div>
            <Button label="Log In" size="small" text="" icon="fa-solid fa-arrow-right" icon-pos="right" />
        </div>
    </div>
    <div class="h-[90vh] overflow-y-auto py-1">
        <div class="px-10 py-24">
            <ol class="flex items-center whitespace-nowrap">
                <li class="inline-flex items-center">
                    <a class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                        href="#">
                        Nuestras Experiencias
                    </a>
                    <svg class="shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16"
                        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round"></path>
                    </svg>
                </li>

                <li class="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200"
                    aria-current="page">
                    Cartagena
                </li>
            </ol>
            <div class="w-full flex mt-12">
                <div class="w-1/6 p-4">
                    <div>
                        <h4 class="font-bold text-lg">
                            Categorias
                        </h4>
                        <ul class="space-y-4 my-2 text-sm py-4">
                            <li>
                                <a href="#" class="text-gray-700 font-light">Almuerzo Tipico</a>
                            </li>
                            <li>
                                <a href="#" class="text-gray-700 font-light">Playa</a>
                            </li>
                            <li>
                                <a href="#" class="text-gray-700 font-light">Pasadias</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg">
                            Filtros
                        </h4>
                        <ul class="space-y-4 my-2 text-sm py-4">
                            <li>
                                <Input type="checkbox" inputId="Almuerzo" checkboxLabel="Almuerzo Incluido" />
                            </li>
                            <li>
                                <Input type="checkbox" inputId="transporte" checkboxLabel="Transporte Incluido" />
                            </li>
                            <li>
                                <Input type="checkbox" inputId="ninos" checkboxLabel="Niños" />
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="w-full">
                    <IconField class="w-full flex items-center shadow-md">
                        <InputIcon class="fa-solid fa-magnifying-glass" />
                        <InputText class="w-full !border-0 mx-7" type="search" size="small" placeholder="Buscar" />
                        <Button icon="fa-solid fa-arrow-right" text rounded="" />
                    </IconField>
                    <div class="w-full flex justify-between my-4">
                        <h3>
                            <strong>10</strong> Resultados
                        </h3>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
                        <div v-for="service in services"
                            :style="`background-image: url('/images/productos/${currentImage}');background-position:center;background-size:cover`"
                            class="h-72 cursor-pointer w-full shadow-md z-10 rounded-tr-[3rem] rounded-bl-[3rem]" @click="visible = true">

                            <div class="flex flex-col justify-between h-full px-10 ">
                                <h3 class="text-right text-white text-2xl font-bold p-2">{{ USDollar.format(service.price) }}</h3>
                                <h4 class="text-white text-3xl font-extrabold mb-2 bg-gray-500/20">{{ service.title }}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal v-model="visible" title="Producto 1" width="95vw">
        <div class=" flex flex-col md:flex-row  w-full ">
            <div class="w-1/2">
                <carousel :items-to-show="1.2" :wrapAround="true" :transition="500">
                    <slide v-for="image in images" :key="image">
                      <img  :src="'/images/productos/'+image" alt="" class="w-full h-full object-cover carousel__item">
                    </slide>
                
                    <template #addons>
                      <navigation />
                      <pagination />
                    </template>
                  </carousel>
            </div>
            <div class="w-1/2 p-4">
                <h1 class="text-3xl font-bold">Producto 1</h1>
                <p class="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold">Precio: {{ USDollar.format(100000) }}</h2>
                    <Button label="Reservar" />
                </div>
            </div>
        </div>
    </Modal>
</template>
<script setup>
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { Head } from '@inertiajs/vue3';
import { onMounted, onUnmounted, ref } from 'vue';

const images = ref(['baru-1.webp', 'baru-2.webp', 'baru-3.webp']);

const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}

const visible = ref(false);

const randomIndex = Math.floor(Math.random() * 3);
const currentImage = ref(images.value[randomIndex]);

const intervalId = ref(null);

const changeImage = () => {
    var nextImageIndex = (images.value.indexOf(currentImage.value) + 1) % images.value.length;
    // console.error(nextImageIndex);

    currentImage.value = images.value[nextImageIndex];
    console.log(currentImage.value);
}


getServices();

onMounted(() => {
    startImageRotation();
})

const startImageRotation = () => {
    intervalId.value = setInterval(changeImage, 5000); // Cambia la imagen cada 20 segundos
}

onUnmounted(() => {
    stopImageRotation();
})

const stopImageRotation = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
    }
}

const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

</script>

<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
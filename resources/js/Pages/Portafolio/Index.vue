<template>

    <Head title="Inicio" />
    <!-- <Header /> -->
    <div class="absolute top-0 w-full h-10  p-6 flex justify-between items-center">
        <div class="flex space-x-6 items-center">
            <h1 class="font-extrabold truncate w-32 md:w-64">
                {{ $page.props.auth.user.name }}.
            </h1>

        </div>
        <div>
            <Button label="Entrar" size="small" text="" icon="fa-solid fa-arrow-right" icon-pos="right" />
        </div>
    </div>
    <div class="h-[99vh] overflow-y-auto py-1">
        <div class="px-4 md:px-10 pt-14 md:pt-16">
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
            <div class="w-full flex mt-4 md:mt-8">
                <div class="w-1/6 p-4 hidden md:block">
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
                            <strong>{{ services.length }}</strong> Resultados
                        </h3>
                    </div>
                    <div
                        class="grid grid-cols-1 snap-y snap-mandatory md:grid-cols-3 gap-4 mt-4 h-[66vh] md:h-[65vh] overflow-y-auto">
                        <Card class="h-64 w-full snap-start" :service v-for="service in services"
                            @click="productSelection(service)" />

                    </div>
                </div>
            </div>
        </div>
    </div>
    <FsLightbox :toggler="toggler" :sources="[
        '/images/productos/baru-1.webp',
        '/images/productos/baru-2.webp',
        '/images/productos/baru-3.webp',
    ]" />
    <Modal v-model="visible" title="" width="95vw">
        <div class=" flex flex-col md:flex-row  w-full">
            <div class="">
                <carousel :items-to-show="1.2" :wrapAround="true" :transition="500">
                    <slide v-for="image in images" :key="image">
                        <img :src="'/images/productos/' + image" alt="" @click="toggler = !toggler"
                            class="w-full h-full object-cover carousel__item">
                    </slide>

                    <template #addons>
                        <navigation />
                        <pagination />
                    </template>
                </carousel>
            </div>
            <div class=" p-4 space-y-4">
                <h1 class="text-3xl font-bold">
                    {{ selectedProduct.title }}
                </h1>

                <p class="text-md" v-html="selectedProduct.description"></p>
                <section aria-labelledby="details-heading" class="mt-12">
                    <h2 id="details-heading" class="sr-only">Additional details</h2>

                    <div class="divide-y divide-gray-200 border-t">
                        <Disclosure as="div" v-for="detail in details" :key="detail.name" v-slot="{ open }">
                            <h3>
                                <DisclosureButton
                                    class="group relative flex w-full items-center justify-between py-6 text-left">
                                    <span
                                        :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">{{
                                            detail.name
                                        }}</span>
                                    <span class="ml-6 flex items-center">
                                        <PlusIcon v-if="!open"
                                            class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true" />
                                        <MinusIcon v-else
                                            class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
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
                <div class="flex flex-col space-y-4">

                    <Input label="Fecha de Reserva" v-model="form.date" class="w-full" type="date" />
                    <div class="flex flex-col md:flex-row justify-between md:space-x-4 ">
                        <div>
                            <div class="w-full flex justify-between font-extrabold items-end">
                                <label for="">N° Adultos</label>
                                <label for="" class="text-xs font-extralight italic">{{ USDollar.format(selectedProduct.adult_tarifa) }}</label>
                            </div>
                            <Input class="w-full" v-model="form.adults" min="1" type="number" />
                        </div>
                        <div>
                            <div class="w-full flex justify-between font-extrabold items-end">
                                <label for="">N° Niños</label>
                                <label for="" class="text-xs font-extralight italic">{{ USDollar.format(selectedProduct.boy_tarifa) }}</label>
                            </div>
                            <Input  class="w-full" min="0" type="number" v-model="form.boys" />
                        </div>
                    </div>
                    <div class="flex w-full justify-end text-xl font-bold">
                        <span>Precio Total <strong>{{ USDollar.format((form.adults * selectedProduct.adult_tarifa) + (form.boys * selectedProduct.boy_tarifa)) }}</strong></span>
                    </div>
                    <Button label="Reservar" @click="reservar()" class="w-full" />
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
import { Head, useForm } from '@inertiajs/vue3';
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid';
import FsLightbox from "fslightbox-vue/v3";
import Card from './Card.vue';

const images = ref(['baru-1.webp', 'baru-2.webp', 'baru-3.webp']);

const services = ref([]);
const getServices = () => {
    axios.get(route('get.services')).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}
const toggler = ref(false);
const visible = ref(false);

const randomIndex = Math.floor(Math.random() * 3);
const currentImage = ref(images.value[randomIndex]);
const form = useForm({
    adults: 1,
    service_id: null,
    boys: 0,
    date: ''
})

const intervalId = ref(null);


const changeImage = () => {
    var nextImageIndex = (images.value.indexOf(currentImage.value) + 1) % images.value.length;
    // console.error(nextImageIndex);

    currentImage.value = images.value[nextImageIndex];
    console.log(currentImage.value);
}

const reservar = () => {
    form.post(route('reservar'), {
        onSuccess : () => {
            console.log('reserva Realizada')
        }
    })
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

const selectedProduct = ref({
    price: 0
});
const details = ref([]);
const productSelection = (product) => {
    selectedProduct.value = product;
    form.service_id = product.id;
    visible.value = true;
    details.value = [
        {
            name: 'Incluidos',
            items: JSON.parse(selectedProduct.value.includes),
        },
        {
            name: 'No Incluidos',
            items: JSON.parse(selectedProduct.value.notIncludes),
        },
        // More sections...
    ]
}



const totalCost = computed(() => {
    if (selectedProduct.value) {
        return selectedProduct.value.price * form.adults;
    }
    return 0;
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

.carousel__slide--active~.carousel__slide {
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
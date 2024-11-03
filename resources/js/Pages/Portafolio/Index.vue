<template>

    <Head title="Portafolio" />
    <!-- <Header /> -->
    <div class="absolute top-0 w-full h-10  p-6 flex justify-between items-center">
        <div class="flex space-x-6 items-center">
            <h1 class="font-extrabold truncate w-32 md:w-64">
                {{ $page.props.auth.user.name }}.
            </h1>

        </div>
        <Link :href="route('dashboard')">
        <Button label="Entrar" size="small" text="" icon="fa-solid fa-arrow-right" icon-pos="right" />
        </Link>
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
                        <InputText @input="handleInput()" v-model="search" class="w-full !border-0 mx-7" type="search"
                            size="small" placeholder="Buscar" />
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
        <div class="flex flex-col md:flex-row w-full">
            <div class="md:w-2/3">
                <carousel :items-to-show="1.1" :wrapAround="true" :transition="500">
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
            <div class="md:w-1/3">
                <transition name="slide-fade">
                    <div v-if="formStatus == 1" class="p-4 space-y-4">
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
                        
                        <form class="flex flex-col space-y-10 justify-between" @submit.prevent="firstSteep">
                            <Input label="Fecha de Reserva" v-model="date" required :min-date="new Date()" class="w-full"
                                type="date" :error-message="errorDate" v-bind="dateAttrs" />
                            <div class="flex flex-col md:flex-row justify-between md:space-x-4 ">
                                <div class="w-full">
                                    <div class="w-full flex justify-between font-extrabold items-end">
                                        <label for="">N° Adultos</label>
                                        <label for="" class="text-xs font-extralight italic">{{
                                            USDollar.format(selectedProduct.adult_tarifa) }}</label>
                                    </div>
                                    <Input class="w-full" required v-model="adults" min="1" type="number"
                                        :error-message="errorsAdult" v-bind="adultsAttrs" />
                                </div>
                                <div class="w-full">
                                    <div class="w-full flex justify-between font-extrabold items-end">
                                        <label for="">N° Niños</label>
                                        <label for="" class="text-xs font-extralight italic">{{
                                            USDollar.format(selectedProduct.boy_tarifa)
                                        }}</label>
                                    </div>
                                    <Input class="w-full" min="0" type="number" v-model="form.boys" />
                                    <label for="" class="text-xs italic text-gray-600">Niños mayores de 2 años</label>
                                </div>
                            </div>
                            <div class="flex w-full justify-end text-xl font-bold">
                                <span>Precio Total <strong>{{ USDollar.format((adults *
                                    selectedProduct.adult_tarifa) +
                                    (form.boys *
                                        selectedProduct.boy_tarifa)) }}</strong></span>
                            </div>
                            <button type="submit" 
                                class="cta flex items-center w-full justify-center">
                                <span class="hover-underline-animation"> Siguiente </span>
                                <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10"
                                    viewBox="0 0 46 16">
                                    <path id="Path_10" data-name="Path 10"
                                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                        transform="translate(30)"></path>
                                </svg>
                            </button>

                        </form>
                    </div>
                </transition>
                
                    <form @submit.prevent="reservar" novalidate v-if="formStatus == 2" class="p-4 space-y-4 animate-fadeinleft animate-once animate-duration-1000">
                        <h2
                            class="text-2xl font-extrabold text-center w-full border-b-1 shadow-lg rounded-md pb-1 mb-4">
                            Detalles de la Reserva
                        </h2>
                        <div class="flex flex-col gap-y-4">
                            <div class="flex  gap-x-2 flex-col md:flex-row">
                                <Input label="Nombre del Pasajero" v-bind="nameAttrs" v-model="cliente_name" :error-message="errors.cliente_name"
                                    class="w-full" />
                                <Input label="Telefono" v-model="cliente_phone" v-bind="phoneAttrs" :error-message="errors.cliente_phone" class="w-full"
                                    type="number" />
                            </div>
                            <div class="flex  gap-x-2 flex-col md:flex-row">
                                <Input label="Ciudad de donde Proviene" v-bind="cityAttrs" v-model="cliente_city" :error-message="errors.city"
                                    class="w-full" />
                                <Input label="Edificio u Hotel" class="w-full" v-bind="buildingAttrs" v-model="cliente_building"
                                    :error-message="errors.cliente_building" />
                            </div>


                            <Input type="time" label="Hora de Actividad" class="w-full" v-bind="hourAttrs" v-model="hour"
                                :error-message="errors.hour" />

                            <div class="flex flex-col md:flex-row justify-between md:space-x-4 ">
                                <div class="w-full">
                                    <div class="w-full flex justify-between font-extrabold items-end">
                                        <label for="">Abono</label>
                                    </div>
                                    <Input class="w-full" v-bind="abonoAttrs" v-model="abono" :error-message="errors.abono" min="1"
                                        type="number" />
                                </div>
                                <div class="w-full">
                                    <div class="w-full flex justify-between font-extrabold items-end">
                                        <label for="">Medio de Pago</label>
                                    </div>
                                    <Input class="w-full" min="0" v-bind="methodAttrs" type="dropdown" option-label="name" option-value="id"
                                        :options="methods" v-model="method" />
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-x-4 justify-center">
                            <button @click="formStatus = 1"
                                class="bg-white flex text-center w-full border items-center rounded-lg text-black text-xl font-semibold group"
                                type="button">
                                <div
                                    class="bg-amber-400 rounded-md h-16 w-1/4 flex items-center justify-center  left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px"
                                        width="25px">
                                        <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000">
                                        </path>
                                        <path
                                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                            fill="#000000"></path>
                                    </svg>
                                </div>
                                <p class="translate-x-2 group-hover:hidden text-sx">Volver</p>
                            </button>
                            <Button :disabled="!meta.valid" severity="success" type="submit" class="!h-16 w-full" :loading label="Reservar"
                                icon="fa-solid fa-calendar-check" icon-pos="right" click="formStatus = 1" />
                        </div>
                    </form>
            </div>
        </div>
    </Modal>
    <Toast />
</template>
<script setup>
// #region Imports
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { Head, Link } from '@inertiajs/vue3';
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid';
import FsLightbox from "fslightbox-vue/v3";
import Card from './Card.vue';
import axios from 'axios';
import Toast from 'primevue/toast';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { alerts } from '@/composable/toasts';

// #endregion

// #region variables
const formStatus = ref(1)
const { toast } = alerts()
const images = ref(['baru-1.webp', 'baru-2.webp', 'baru-3.webp']);
const search = ref('');
const debounceTimer = ref(null);
const services = ref([]);
const toggler = ref(false);
const visible = ref(false);
const service_id = ref(null);
const intervalId = ref(null);
const errorDate = ref();
const errorsAdult = ref();
const methods = ref([]);
// #endregion

// #region Validates

const schema2 = yup.object({
    date: yup.date().required(),
    adults: yup.number().required(),
    date: yup.date().required(),
    adults: yup.number().required(),
    cliente_name: yup.string().required(),
    cliente_phone: yup.string().required(),
    cliente_city: yup.string().required(),
    cliente_building: yup.string().required(),
    hour: yup.string().required(),
    abono: yup.number().required(),
    method: yup.string().required(),
});

const { values, defineField, errors, meta } = useForm({
    validationSchema:  schema2,
});
// #endregion



// #region Fields
const [date, dateAttrs] = defineField('date');
const [boys, boysAttrs] = defineField('boys');
const [adults, adultsAttrs] = defineField('adults');
const [cliente_name, nameAttrs] = defineField('cliente_name');
const [cliente_phone, phoneAttrs] = defineField('cliente_phone');
const [cliente_city, cityAttrs] = defineField('cliente_city');
const [cliente_building, buildingAttrs] = defineField('cliente_building');
const [hour, hourAttrs] = defineField('hour');
const [abono, abonoAttrs] = defineField('abono');
const [method, methodAttrs] = defineField('method');

// #endregion

const handleInput = () => {
    if (debounceTimer.value) {
        clearTimeout(debounceTimer.value);
    }
    debounceTimer.value = setTimeout(() => {
        getServices();
    }, 500);
}
const getServices = () => {
    axios.get(route('get.services', {
        search: search.value
    })).then(response => {
        services.value = response.data.services.slice(0, 5);
    });
}
const randomIndex = Math.floor(Math.random() * 3);
const currentImage = ref(images.value[randomIndex]);
const form = ref({
    medio: 'Efectivo',
    abono: 0,
    adults: 1,
    service_id: null,
    boys: 0,
    date: ''
})



const changeImage = () => {
    var nextImageIndex = (images.value.indexOf(currentImage.value) + 1) % images.value.length;
    // console.error(nextImageIndex);
    currentImage.value = images.value[nextImageIndex];
}
const loading = ref(false);
const reservar = () => {
    loading.value = true
    axios.post(route('reservar', {
        service_id: service_id.value
    }), values).then(response => {
        toast('success', 'Reserva Realizada con exito');
        loading.value = false;
        visible.value = false;
    }).error(error => {
        toast('error', 'Error al realizar la reserva');
        loading.value = false;
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
    service_id.value = product.id;
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

const firstSteep = () => {
    if(values.date == undefined){
        console.log(errors)
        errorDate.value = 'Selecione una fecha';
        return ;
    }
    if(values.adults == undefined){
        errorsAdult.value = 'Escoga el numero de adultos';
        return ;
    }
    formStatus.value = 2;
}

// #region methods
const getMethos = () => {
    axios.get(route('paymentMethods.index'))
        .then(response => {
            methods.value = response.data
        })
        .catch(error => {
            console.log(error)
        })
}
getMethos()

// #endregion

</script>

<template>
    <div class="p-4" v-if="products.length > 0">
        <div class="mb-2 flex justify-between items-center">
            <h1 class="font-bold text-xl">{{ title }}</h1>
            <div class="flex items-center gap-2">
                <!-- Botones para controlar el scroll del contenedor horizontal -->
                <button @click="scrollLeft" aria-label="Scroll izquierda" class="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button @click="scrollRight" aria-label="Scroll derecha" class="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    <div ref="scroller" class="flex gap-x-2 overflow-x-auto hide-scrollbar touch-scroll py-2 snap-x snap-mandatory" tabindex="0">
            <a :href="route('show.services', data.slug)" class="flex-shrink-0 px-1 snap-start w-1/2 md:w-1/6" v-for="data in products" :key="data.id || data.slug">
                <div class="bg-white  overflow-hidden w-full flex flex-col">
                    <div class=" overflow-hidden rounded-xl bg-gray-200">
                        <img v-if="data.portada != '/laravel/public/'" :src="'https://avcolombia.net/' + data.portada"
                            class="w-full h-60 object-cover rounded-xl" />
                        <div v-else class="h-60 w-full flex items-center  justify-center rounded-xl">
                            <Logo class="w-16 h-16" />
                        </div>
                    </div>
                    <div class="py-4 flex flex-col">
                        <div class="flex items-start justify-between gap-2">
                            <h3 class="text-md font-semibold text-gray-800 truncate">{{ data.title }}</h3>
                        </div>
                        <span v-if="data.adults_price || data.price || data.total"
                                class="text-sm font-bold text-gray-600 whitespace-nowrap">
                                Desde {{ currencyFormat(data.adults_price || data.price || data.total) }}
                            </span>
                        <p class="text-sm text-gray-500 truncate"><strong>{{  }}</strong></p>
                        
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup>
import searchStore from '@/store/searchStore';
import { ref, watch, nextTick } from 'vue';
import Carousel from 'primevue/carousel';

import Service from "@/Models/Services/Service";
import Logo from '@/Components/logo.vue';
import { currencyFormat } from '@/composable/useCommonUtilities';

const products = ref([]);
const scroller = ref(null);




const serviceModel = new Service();
function getService() {
    serviceModel.getServicePagination(1, 10).then((res) => {
        console.log(res.data)
        products.value = res.data;
    });
}
getService()

function scrollLeft() {
    const el = scroller.value;
    if (!el) return;
    const amount = Math.min(el.clientWidth, 300);
    el.scrollBy({ left: -amount, behavior: 'smooth' });
}

function scrollRight() {
    const el = scroller.value;
    if (!el) return;
    const amount = Math.min(el.clientWidth, 300);
    el.scrollBy({ left: amount, behavior: 'smooth' });
}

const title = ref("")
const subTitle = ref("")
function getTitle() {

    switch (searchStore.type.value.label) {
        case "Tours":
            title.value = "¡Tours populares!"
            subTitle.value = "Tenemos el mejor tour para ti! No lo pienses!."
            break;
        case "Embarcaciones":
            title.value = "¡Embarcaciones espectaculares!"
            subTitle.value = "Grandes? medianas? pequeñas? tenemos una ideal para ti!"
            break;
        case "Hospedaje":
            title.value = "¡Disfruta comodamente!"
            subTitle.value = "Personales, parejas, familiares, el hospedaje que se adapta a ti."
            break;
        case "Transporte":
            title.value = "¡Tranportate con nosotros!"
            subTitle.value = "Transportate seguro y comodo con nosotros."
            break;
        default:
            console.log("Rol no reconocido");
    }

}
getTitle()

watch([
    searchStore.type,
], () => {
    getTitle()
    getService();
}, { deep: true });

</script>

<style scoped>
.hide-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}
.touch-scroll {
    -webkit-overflow-scrolling: touch; /* momentum scrolling on iOS */
    touch-action: pan-x; /* allow horizontal panning */
}
.view {
    width: 300px;
    height: 300px;
    margin: 10px;
    float: left;
    border: 10px solid #fff;
    overflow: hidden;
    position: relative;
    text-align: center;
    box-shadow: 1px 1px 2px #e6e6e6;
    cursor: default;
}

.view .mask,
.view .content {
    width: 300px;
    height: 300px;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0
}

.view img {
    display: block;
    position: relative;
    object-fit: cover;
    width: 280px;
    height: 280px;
}

.view .no-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}

.view h2 {
    text-transform: uppercase;
    width: 280px;
    color: #fff;
    text-align: center;
    position: relative;
    font-size: 16px;
    padding: 5px;
    background: rgba(0, 0, 0, 0.8);
    margin: 20px 0 0 0
}

.view p {
    width: 280px;
    min-height: 100px;
    font-family: Georgia, serif;
    font-style: italic;
    font-size: 12px;
    position: relative;
    color: #fff;
    padding: 5px;
    text-align: center
}

.view a.info {
    display: inline-block;
    text-decoration: none;
    padding: 7px;
    background: #000;
    color: #fff;
    text-transform: uppercase;
    box-shadow: 0 0 1px #000
}

.view a.info:hover {
    box-shadow: 0 0 5px #000
}

.view-third img {
    transition: all 0.2s ease-in;
}

.view-third .mask {
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transform: translate(460px, -100px) rotate(180deg);
    transition: all 0.2s 0.4s ease-in-out;
}

.view-third h2 {
    transform: translateY(-100px);
    transition: all 0.2s ease-in-out;
}

.view-third p {
    transform: translateX(300px) rotate(90deg);
    transition: all 0.2s ease-in-out;
}

.view-third a.info {
    transform: translateY(-200px);
    transition: all 0.2s ease-in-out;
}

.view-third:hover .mask {
    opacity: 1;
    transition-delay: 0s;
    transform: translate(0px, 0px);
}

.view-third:hover h2 {
    transform: translateY(0px);
    transition-delay: 0.5s;
}

.view-third:hover p {
    transform: translateX(0px) rotate(0deg);
    transition-delay: 0.4s;
}

.view-third:hover a.info {
    transform: translateY(0px);
    transition-delay: 0.3s;
}
</style>

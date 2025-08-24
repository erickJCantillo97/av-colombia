<template>
    <div class="p-10" v-if="products.length>0">
        <div>
            <h1 class="font-bold text-2xl">{{ title }}</h1>
            <h2 class="text-xl">
                {{ subTitle }}
            </h2>
        </div>
            <Carousel :key="title" :value="products" :showNavigators="true" :numVisible="5" 
                :responsiveOptions="responsiveOptions" circular>
                <template #item="{ data } = slotProps">
                    <div class="w-full flex justify-center">
                        <div class="bg-white rounded-xl shadow-md overflow-hidden w-64 border border-gray-200 flex flex-col">
                            <div class="h-40 bg-gray-100 overflow-hidden">
                                <img v-if="data.portada != '/laravel/public/'"
                                    :src="'https://avcolombia.net/' + data.portada"
                                    class="w-full h-40 object-cover" />
                                <div v-else class="h-40 w-full flex items-center justify-center">
                                    <Logo class="w-16 h-16" />
                                </div>
                            </div>
                            <div class="p-4 flex flex-col gap-2">
                                <div class="flex items-start justify-between gap-2">
                                    <h3 class="text-md font-semibold text-gray-800 truncate">{{ data.title }}</h3>
                                    <span v-if="data.precio || data.price || data.total" class="text-sm font-bold text-orange-600 whitespace-nowrap">
                                        {{ data.precio || data.price || data.total }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-500 truncate">{{ data.ubicacion || data.location || '' }}</p>
                                    <a :href="route('show.services', data.slug)" class="px-3 py-1 bg-gray-800 hover:bg-gray-900 w-full text-center text-white rounded-md text-md">Ver Tour</a>
                            </div>
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
</template>

<script setup>
import searchStore from '@/store/searchStore';
import { ref, watch } from 'vue';
import Carousel from 'primevue/carousel';

import Service from "@/Models/Services/Service";
import Logo from '@/Components/logo.vue';

const products = ref([]);

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);


const serviceModel = new Service();
function getService() {
    serviceModel.getServicePagination(1, 10).then((res) => {
        console.log(res.data)
        products.value = res.data;
    });
}
getService()

const title = ref("")
const subTitle=ref("")
function getTitle() {

    switch (searchStore.type.value.label) {
        case "Tours":
            title.value="¡Tours populares!"
            subTitle.value = "Tenemos el mejor tour para ti! No lo pienses!."
            break;
        case "Embarcaciones":
            title.value="¡Embarcaciones espectaculares!"
            subTitle.value = "Grandes? medianas? pequeñas? tenemos una ideal para ti!"
            break;
        case "Hospedaje":
            title.value="¡Disfruta comodamente!"
            subTitle.value = "Personales, parejas, familiares, el hospedaje que se adapta a ti."
            break;
        case "Transporte":
            title.value="¡Tranportate con nosotros!"
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

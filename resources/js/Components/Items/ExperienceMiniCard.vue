<template>
    <Link :href="route('show.services', product.slug)"
        class="flex flex-col shadow-slate-400 shadow-lg inset-0 z-10 flex-shrink-0  h-full  rounded-tr-[3rem] rounded-bl-[3rem]  bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] md:scale-90 hover:scale-100">
    <div class="flex flex-col">
        <img :src="currentImage" alt="Foto"
            class="h-48 w-full object-cover object-center z-10 rounded-tr-[3rem] rounded-bl-[3rem] " />
        <div class="h-32 py-4 px-2">
            <h1 class=" md:text-lg font-bold capitalize w-full line-clamp-3">
                {{ product.title }}
            </h1>
            <div class="flex space-x-2 text-xs ">
                <i class="fa-solid fa-map-pin text-emerald-500"></i>
                <span class="italic">
                    Cartagena
                </span>
            </div>
        </div>

        <div class="flex  w-full justify-end mb-2 px-2">
            <p class=" font-semibold text-gray-800 ">
                <strong class="text-md font-semibold mx-1">{{ USDollar.format(product.adults_price) }} </strong> <span
                    class="text-xs">
                    / Adulto
                </span>
            </p>

        </div>
    </div>
    </Link>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
    product: Object
});


const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

const images = ref(props.product.images.map(x => x.filepath))
const currentImage = ref(props.product.images.map(x => x.filepath)[0])
const intervalId = ref()

const changeImage = () => {

    var nextImageIndex = (images.value.indexOf(currentImage.value) + 1) % images.value.length;
    currentImage.value = images.value[nextImageIndex];
    // console.table({ img: currentImage.value, index: nextImageIndex });
}

onMounted(() => {
    startImageRotation();
})

const startImageRotation = () => {
    // changeImage()
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
</script>

<style scoped>
/* Agrega estas reglas CSS personalizadas */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
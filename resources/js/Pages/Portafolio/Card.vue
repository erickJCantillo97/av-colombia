<template>
    <div :style="`background-image: url('/images/productos/${currentImage}');background-position:center;background-size:cover`"
        class="min-h-50 cursor-pointer w-full shadow-md z-10 rounded-tr-[3rem] rounded-bl-[3rem]">

        <div class="flex flex-col justify-between h-full px-10 ">
            <h3 class="text-right text-white text-2xl font-bold p-2">{{ USDollar.format(service.price) }}</h3>
            <h4 class="text-white text-3xl font-extrabold mb-2 bg-gray-500/20">{{ service.title }}
            </h4>
        </div>
    </div>
</template>

<script setup>


const props = defineProps({
    service: Object,
})

import { onMounted, onUnmounted, ref } from 'vue';


const images = ref(['baru-1.webp', 'baru-2.webp', 'baru-3.webp']);


const randomIndex = Math.floor(Math.random() * 3);
const currentImage = ref(images.value[randomIndex]);

const intervalId = ref(null);

const changeImage = () => {
    var nextImageIndex = (images.value.indexOf(currentImage.value) + 1) % images.value.length;
    // console.error(nextImageIndex);

    currentImage.value = images.value[nextImageIndex];
}


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
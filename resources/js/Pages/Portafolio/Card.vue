<template>
    <div :style="`background-image: url('${currentImage}');background-position:center;background-size:cover;height:50vh`"
        class="min-h-50 cursor-pointer w-full shadow-md z-10 rounded-tr-[3rem] rounded-bl-[3rem]">

        <div class="flex flex-col justify-between h-full  ">
            <h3 class="text-right text-white text-2xl font-bold p-2 pr-4">{{ USDollar.format(service.adult_tarifa) }}
            </h3>
            <h4 class="text-white text-xl pl-6  font-extrabold w-full bg-gray-500/60 py-2 rounded-bl-[3rem]">{{
                service.title }}
            </h4>
        </div>
    </div>
</template>

<script setup>


const props = defineProps({
    service: Object,
})

import { onMounted, onUnmounted, ref } from 'vue';


const images = ref([]);

const randomIndex = Math.floor(Math.random() * props.service.images.length - 1);
const currentImage = ref(props.service.images[0].filepath);





const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

</script>
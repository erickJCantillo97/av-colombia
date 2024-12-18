<template>
    <Link :href="route('show.services', product.slug)"
        class="flex flex-col shadow-slate-400 shadow-lg inset-0 z-10 flex-shrink-0  h-full  rounded-tr-[3rem] rounded-bl-[3rem]  bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] md:scale-90 hover:scale-100">
    <div class="flex flex-col">
        <!-- {{ currentImage }} -->
        <img :src="currentImage == '/laravel/public/' ? 'https://avcolombia.net/images/logo.webp' : currentImage"
            alt="Portada" class="h-48 w-full object-cover object-center z-10 rounded-tr-[3rem] rounded-bl-[3rem] " />
        <div class="h-32 py-4 px-2">
            <h1 class=" md:text-lg font-bold w-full  capitalize ">
                {{ truncateString(product.title, 30) }}
            </h1>
            <div class="flex space-x-2 text-xs ">
                <i class="fa-solid fa-map-pin text-emerald-500"></i>
                <span class="italic">
                    Cartagena
                </span>
            </div>
        </div>
    </div>
    </Link>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { onMounted, onUnmounted, ref } from 'vue';
import { useCommonUtilities } from '@/composable/useCommonUtilities';

const { truncateString } = useCommonUtilities();

const props = defineProps({
    product: Object
});


const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

const currentImage = ref(props.product.portada)


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
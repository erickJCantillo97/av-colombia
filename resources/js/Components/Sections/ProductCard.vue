<template>
    <div  >
        <div class="">
            <div class="max-h-72 w-full overflow-hidden rounded-lg">
                <img :src="product.images[0].filepath" :alt="product.imageAlt"
                    class="h-full w-full object-cover object-center z-10" />
            </div>
            <div class="">
                <div class="flex justify-between w-full py-2">
                    <h3 class="text-md font-medium text-gray-900">{{ product.title }}</h3>
                    <p class="text-lg font-semibold text-gray-800">{{ USDollar.format(product.price)
                    }}
                </p>
                </div>
                <p class="text-sm text-gray-500 text-nowrap text-clip overflow-hidden px-2  w-full"
                    v-html="product.description">
                </p>
            </div>
        </div>
        <div class="mt-1">
            <Link :href="route('show.services', product.slug)"
                class="flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 cursor-pointer">Detalles<span
                    class="sr-only">, {{ product.name }}</span></Link>
        </div>
    </div>
</template>
<script setup>
import { Link } from '@inertiajs/vue3';


const props = defineProps({
    product: Object
});
const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});
</script>
<template>
    <div class="hidden md:block" >
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
    <div class="block md:hidden w-full border-y bg-gray-100" >
        <div class="flex justify-between space-x-2 items-start px-2 py-4">
            <div class="max-h-32 max-w-24 overflow-hidden rounded-lg">
                <img src="/images/cartagena.webp" :alt="product.imageAlt"
                    class="h-full w-full object-cover object-center z-10" />
            </div>
            <div class="w-full flex flex-col h-full space-y-2">
                <div class="flex-auto flex justify-between w-full items-start h-full">
                    <h3 class="text-lg font-extrabold text-gray-900">{{ product.title }}</h3>
                </div>
                <p class="flex-auto text-sm text-gray-500 text-nowrap text-clip overflow-hidden px-2  w-full"
                    v-html="product.description">
                </p>
                <div class="flex space-x-2">
                    <div v-for="feature in product.features" class="py-1 px-2  text-xs font-bold text-white  rounded-xl"
                      :style="`color: #${feature.color};`">
                      {{ feature.name }}
                    </div>
                  </div>
                <p class="flex-auto justify-end flex items-center px-4 text-sm">
                    Desde <strong class="text-lg font-semibold mx-1">{{ USDollar.format(product.price)
                    }}</strong> <i class="fa-solid fa-angle-right"></i>
                </p>
            </div>
            
        </div>
        <!-- <div class="mt-1">
            <Link :href="route('show.services', product.slug)"
                class="flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 cursor-pointer">Detalles<span
                    class="sr-only">, {{ product.name }}</span></Link>
        </div> -->
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
<template>
    <div class="w-full">
        <!-- Galleria modal fullscreen -->
        <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="images"
            :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 100%" :circular="true"
            :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
            <template #item="slotProps">
                <img :src="'https://avcolombia.net/' + slotProps.item" :alt="slotProps.item"
                    style="width: 100%; display: block" />
            </template>
        </Galleria>

        <!-- Grid de imágenes moderno -->
        <div class="grid grid-cols-4 gap-3 md:gap-4">
            <!-- Imagen principal (ocupa 2x2) -->
            <div class="col-span-4 md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl">
                <Image :src="'https://avcolombia.net/' + images[0]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[40vh] md:!h-[60vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" @click="imageClick(0)" alt="Imagen principal" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-2xl"></i>
                </div>
            </div>

            <!-- Imagen 2 -->
            <div class="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl">
                <Image :src="'https://avcolombia.net/' + images[1]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[18vh] md:!h-[29vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" @click="imageClick(1)" alt="Imagen 2" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-xl"></i>
                </div>
            </div>

            <!-- Imagen 3 -->
            <div class="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl">
                <Image :src="'https://avcolombia.net/' + images[2]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[18vh] md:!h-[29vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" @click="imageClick(2)" alt="Imagen 3" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-xl"></i>
                </div>
            </div>

            <!-- Imagen 4 -->
            <div class="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl" v-if="images[3]">
                <Image :src="'https://avcolombia.net/' + images[3]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[18vh] md:!h-[29vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" @click="imageClick(3)" alt="Imagen 4" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-xl"></i>
                </div>
            </div>

            <!-- Imagen 5 con overlay de "Ver más" -->
            <div class="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl" v-if="images[4]">
                <Image :src="'https://avcolombia.net/' + images[4]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[18vh] md:!h-[29vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" @click="imageClick(4)" alt="Imagen 5" />
                
                <!-- Overlay "Ver más" si hay más imágenes -->
                <div v-if="images.length > 5" 
                    class="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer hover:bg-black/80 transition-all duration-300"
                    @click="imageClick(4)">
                    <i class="fa-solid fa-images text-4xl mb-2"></i>
                    <span class="text-2xl font-bold">+{{ images.length - 5 }}</span>
                    <span class="text-sm">Ver más fotos</span>
                </div>
                
                <!-- Hover effect normal si no hay overlay -->
                <div v-else class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div v-if="images.length <= 5" class="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-xl"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
    images: {
        type: Array,
        required: true,
    },
});


const responsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);

const activeIndex = ref(0);
const displayCustom = ref(false);

const imageClick = (index) => {
    activeIndex.value = index;
    displayCustom.value = true;
};


</script>

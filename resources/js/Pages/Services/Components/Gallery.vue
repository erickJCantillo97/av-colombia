<template>
    <div class="w-full">
        <Teleport to="body">
            <FsLightbox
                :toggler="toggler"
                :sources="imageSources"
                :sourceIndex="activeIndex"
                :disableBackgroundClose="false"
            />
        </Teleport>

        <!-- Grid de imágenes moderno -->
        <div class="grid grid-cols-4 gap-3 md:gap-4">
            <!-- Imagen principal (ocupa 2x2) -->
            <div class="col-span-4 md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer" @click="imageClick(0)">
                <Image :src="'https://avcolombia.net/' + images[0]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[40vh] md:!h-[60vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" alt="Imagen principal" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-2xl"></i>
                </div>
            </div>

            <!-- Imagen 2 -->
            <div class="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl cursor-pointer" @click="imageClick(1)">
                <Image :src="'https://avcolombia.net/' + images[1]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[18vh] md:!h-[29vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" alt="Imagen 2" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-xl"></i>
                </div>
            </div>

            <!-- Imagen 3 -->
            <div class="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl cursor-pointer" @click="imageClick(2)">
                <Image :src="'https://avcolombia.net/' + images[2]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[18vh] md:!h-[29vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" alt="Imagen 3" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-xl"></i>
                </div>
            </div>

            <!-- Imagen 4 -->
            <div class="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl cursor-pointer" v-if="images[3]" @click="imageClick(3)">
                <Image :src="'https://avcolombia.net/' + images[3]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[18vh] md:!h-[29vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" alt="Imagen 4" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i class="fa-solid fa-magnifying-glass-plus text-xl"></i>
                </div>
            </div>

            <!-- Imagen 5 con overlay de "Ver más" -->
            <div class="col-span-2 md:col-span-1 relative group overflow-hidden rounded-2xl cursor-pointer" v-if="images[4]" @click="imageClick(4)">
                <Image :src="'https://avcolombia.net/' + images[4]" :pt="{
                    root: '!w-full !h-full',
                    image: '!h-[18vh] md:!h-[29vh] !w-full !object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110',
                }" alt="Imagen 5" />
                
                <!-- Overlay "Ver más" si hay más imágenes -->
                <div v-if="images.length > 5" 
                    class="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer hover:bg-black/80 transition-all duration-300"
                    >
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
import FsLightbox from 'fslightbox-vue';
import { computed, ref } from 'vue';

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
});


const imageSources = computed(() => props.images.map((image) => `https://avcolombia.net/${image}`));
const activeIndex = ref(0);
const toggler = ref(false);

const imageClick = (index) => {
    activeIndex.value = index;
    toggler.value = !toggler.value;
};


</script>

<template>
  <Head title="Inicio" />
  
  <div class="">
    <div
      class="justify-center w-full  flex flex-col items-center transition-all duration-1000 ease-in-out"
      :style="backgroundStyle"
    >
      <Header :isScrolled="isScrolled" />
      <div
        class="mt-10 flex items-center justify-between rounded-lg px-10 md:px-12 h-full"
      >
        <div class="py-10 space-y-10 mt-4 w-full">
          <div class="flex gap-x-24 justify-between items-center w-full">
            <div class="">
              <h1
                data-aos="zoom-in-down"
                data-aos-duration="2000"
                class="text-right text-4xl lg:text-6xl text-white font-extrabold"
              >
              
              </h1>
            </div>
          </div>
          <div
            data-aos="flip-down"
            data-aos-duration="1000"
            class="rounded-lg bg-white"
          >
            <!-- <Experiencias  /> -->
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
  <FooterSection></FooterSection>
</template>
<script setup>
import Experiencias from "@/Components/SearchEngines/Search.vue";
import Header from "@/Components/Sections/Header.vue";
import { Head, Link } from "@inertiajs/vue3";
import FooterSection from "@/Pages/Welcome/FooterSection.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import Logo from "@/Components/logo.vue";

const toggler = ref(false);
const isScrolled = ref(false);

// Configuración para la API de Unsplash
const UNSPLASH_ACCESS_KEY = 'k_W3HYBYhd5XSmAQhZ3OIhHav0tIw4eMNJyeuHmnI98'; // Se puede usar sin key para desarrollo
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

// Array dinámico de imágenes que se llenará con la API
const cartagenaImages = ref(['/images/cartagena.webp']); // Fallback inicial
const currentImageIndex = ref(0);
const isLoadingImages = ref(false);
let imageInterval = null;

// Función para obtener imágenes de Cartagena desde Unsplash
const fetchCartagenaImages = async () => {
  if (isLoadingImages.value) return;
  
  isLoadingImages.value = true;
  console.log('Cargando imágenes de Cartagena desde Unsplash...');
  
  try {
    // Usamos la API pública de Unsplash (sin necesidad de API key para desarrollo)
    const queries = [
      'cartagena colombia',
      'cartagena de indias',
      'cartagena old city',
      'cartagena colonial',
      'cartagena walls',
      'cartagena colorful houses'
    ];
    
    const allImages = [];
    
    for (const query of queries) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          const images = data.results.map(photo => ({
            url: `${photo.urls.regular}&w=1920&h=1080&fit=crop&crop=center&auto=format&q=80`,
            alt: photo.alt_description || 'Cartagena Colombia',
            id: photo.id
          }));
          allImages.push(...images);
        }
      } catch (error) {
        console.warn(`Error buscando "${query}":`, error);
      }
    }
    
    if (allImages.length > 0) {
      // Mezclar las imágenes para variedad
      const shuffledImages = allImages.sort(() => 0.5 - Math.random());
      cartagenaImages.value = [
        '/images/cartagena.webp', // Mantener fallback local
        ...shuffledImages.slice(0, 15).map(img => img.url) // Tomar las mejores 15
      ];
      console.log(`✅ Cargadas ${cartagenaImages.value.length - 1} imágenes de Cartagena`);
    } else {
      // Fallback con URLs directas de Unsplash Source (siempre funcionan)
      cartagenaImages.value = [
        '/images/cartagena.webp',
        'https://source.unsplash.com/1920x1080/?cartagena,colombia,1',
        'https://source.unsplash.com/1920x1080/?cartagena,colonial,2',
        'https://source.unsplash.com/1920x1080/?cartagena,colorful,3',
        'https://source.unsplash.com/1920x1080/?cartagena,old,city,4',
        'https://source.unsplash.com/1920x1080/?cartagena,walls,5',
        'https://source.unsplash.com/1920x1080/?cartagena,architecture,6',
        'https://source.unsplash.com/1920x1080/?cartagena,street,7',
        'https://source.unsplash.com/1920x1080/?cartagena,balcony,8'
      ];
      console.log('💡 Usando URLs directas de Unsplash Source como fallback');
    }
    
  } catch (error) {
    console.error('❌ Error cargando imágenes:', error);
    // Fallback final con Source API
    cartagenaImages.value = [
      '/images/cartagena.webp',
      'https://source.unsplash.com/1920x1080/?cartagena,colombia',
      'https://source.unsplash.com/1920x1080/?cartagena,colonial',
      'https://source.unsplash.com/1920x1080/?cartagena,colorful',
      'https://source.unsplash.com/1920x1080/?cartagena,architecture'
    ];
    console.log('🔄 Usando fallback básico de Unsplash Source');
  } finally {
    isLoadingImages.value = false;
  }
};

// Computed property para el estilo de fondo
const backgroundStyle = computed(() => {
  const currentImage = cartagenaImages.value[currentImageIndex.value];
  console.log('🖼️ Imagen actual:', currentImage);
  return {
    backgroundImage: `url('${currentImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '10vh'
  };
});

// Función para cambiar a la siguiente imagen
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % cartagenaImages.value.length;
  console.log(`🔄 Cambiando a imagen ${currentImageIndex.value + 1}/${cartagenaImages.value.length}`);
};

// Precargar la siguiente imagen para transiciones suaves
const preloadNextImage = () => {
  const nextIndex = (currentImageIndex.value + 1) % cartagenaImages.value.length;
  const nextImageUrl = cartagenaImages.value[nextIndex];
  
  if (nextImageUrl) {
    const img = new Image();
    img.onload = () => console.log('⚡ Precargada:', nextImageUrl);
    img.onerror = () => console.warn('⚠️ Error precargando:', nextImageUrl);
    img.src = nextImageUrl;
  }
};

onMounted(async () => {
  console.log('🚀 Iniciando GuestLayout...');
  
  // Cargar imágenes dinámicamente de Unsplash
  await fetchCartagenaImages();
  
  // Precargar la primera imagen
  preloadNextImage();
  
  // Cambiar imagen cada 45 segundos (45000 ms)
  imageInterval = setInterval(() => {
    nextImage();
    preloadNextImage(); // Precargar la siguiente
  }, 45000);
  
  console.log('✅ GuestLayout listo con', cartagenaImages.value.length, 'imágenes');
});

onUnmounted(() => {
  if (imageInterval) {
    clearInterval(imageInterval);
  }
});

defineProps({
  canLogin: {
    type: Boolean,
  },
});

</script>

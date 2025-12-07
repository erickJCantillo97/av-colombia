<template>
  <Head title="Inicio" />
  
  <div class="">
    <Header :isScrolled="isScrolled" :isWelcomePage="isWelcomePage" />
    <div :class="isWelcomePage ? '' : 'pt-44'">
      <slot />
    </div>
  </div>
  <FooterSection></FooterSection>

  <!-- Botón flotante de WhatsApp -->
  <Transition name="fade-scale">
    <a 
      href="https://wa.me/573046790115?text=Hola%2C%20necesito%20información%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-28 right-8 z-50 group whatsapp-button"
      aria-label="Contactar por WhatsApp"
      @mouseenter="showWhatsappTooltipTemporarily"
    >
      <div class="whatsapp-float">
        <i class="fa-brands fa-whatsapp text-white text-3xl"></i>
      </div>
      <Transition name="slide-fade-right">
        <div 
          v-if="showWhatsappTooltip" 
          class="whatsapp-tooltip"
        >
          <span class="tooltip-text">¿Necesitas ayuda?</span>
          <div class="tooltip-subtext">Haz clic para chatear</div>
        </div>
      </Transition>
    </a>
  </Transition>

  <!-- Botón flotante Scroll to Top -->
  <Transition name="fade-scale">
    <button 
      v-if="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-50 group scroll-top-button"
      aria-label="Volver arriba"
    >
      <div class="scroll-top-float">
        <i class="fa-solid fa-arrow-up text-white text-lg"></i>
      </div>
      <div class="scroll-top-tooltip">
        Volver arriba
      </div>
    </button>
  </Transition>
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

// Scroll to top functionality
const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// WhatsApp button functionality
const showWhatsappTooltip = ref(true);
let whatsappTooltipTimeout = null;

const hideWhatsappTooltipTemporarily = () => {
  showWhatsappTooltip.value = false;
};

const showWhatsappTooltipTemporarily = () => {
  showWhatsappTooltip.value = true;
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
  
  // Scroll to top button visibility
  window.addEventListener('scroll', handleScroll);
  
  // WhatsApp tooltip: Mostrar por 5 segundos al cargar, luego solo con hover
  whatsappTooltipTimeout = setTimeout(() => {
    hideWhatsappTooltipTemporarily();
  }, 5000);
  
  console.log('✅ GuestLayout listo con', cartagenaImages.value.length, 'imágenes');
});

onUnmounted(() => {
  if (imageInterval) {
    clearInterval(imageInterval);
  }
  if (whatsappTooltipTimeout) {
    clearTimeout(whatsappTooltipTimeout);
  }
  window.removeEventListener('scroll', handleScroll);
});

defineProps({
  canLogin: {
    type: Boolean,
  },
  isWelcomePage: {
    type: Boolean,
    default: false
  }
});

</script>

<style scoped>
/* ===== WHATSAPP BUTTON ===== */
.whatsapp-button {
  animation: fadeInUp 0.3s ease-out;
}

.whatsapp-float {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25D366 0%, #1EBE57 50%, #128C7E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5), 
              0 0 0 0 rgba(37, 211, 102, 0.7);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: visible;
  animation: whatsappPulse 2.5s infinite;
}

.whatsapp-float::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25D366, #128C7E);
  opacity: 0;
  filter: blur(8px);
  transition: opacity 0.4s ease;
}

.whatsapp-float::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 50%);
  pointer-events: none;
}

.whatsapp-button:hover .whatsapp-float {
  transform: translateY(-6px) scale(1.1);
  box-shadow: 0 12px 40px rgba(37, 211, 102, 0.7),
              0 0 0 8px rgba(37, 211, 102, 0.15),
              0 0 0 16px rgba(37, 211, 102, 0.08);
  animation: none;
}

.whatsapp-button:hover .whatsapp-float::before {
  opacity: 1;
}

.whatsapp-button:hover .whatsapp-float i {
  transform: scale(1.2) rotate(-10deg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.whatsapp-button:active .whatsapp-float {
  transform: translateY(-2px) scale(1.05);
}

.whatsapp-float i {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  z-index: 1;
}

/* Tooltip mejorado del botón WhatsApp */
.whatsapp-tooltip {
  position: absolute;
  right: 85px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #128C7E;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(37, 211, 102, 0.1);
  pointer-events: none;
  z-index: 10;
  min-width: 200px;
  border: 2px solid rgba(37, 211, 102, 0.2);
}

.tooltip-text {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #128C7E;
  margin-bottom: 0.25rem;
  letter-spacing: -0.02em;
}

.tooltip-subtext {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: #25D366;
  opacity: 0.8;
}

.whatsapp-tooltip::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 0 10px 12px;
  border-color: transparent transparent transparent rgba(37, 211, 102, 0.2);
  z-index: -1;
}

.whatsapp-tooltip::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(-2px);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 0 8px 10px;
  border-color: transparent transparent transparent #ffffff;
}

.whatsapp-button:hover .whatsapp-tooltip {
  animation: bounceRight 0.6s ease-out;
}

/* Animación de pulso mejorada */
@keyframes whatsappPulse {
  0%, 100% {
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5),
                0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  50% {
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5),
                0 0 0 12px rgba(37, 211, 102, 0);
  }
}

@keyframes bounceRight {
  0%, 100% {
    transform: translateY(-50%) translateX(0);
  }
  25% {
    transform: translateY(-50%) translateX(-8px);
  }
  50% {
    transform: translateY(-50%) translateX(0);
  }
  75% {
    transform: translateY(-50%) translateX(-4px);
  }
}

/* Slide Fade Right Transition para tooltip */
.slide-fade-right-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-right-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-right-enter-from {
  opacity: 0;
  transform: translateY(-50%) translateX(20px);
}

.slide-fade-right-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(10px);
}

.slide-fade-right-enter-to,
.slide-fade-right-leave-from {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* ===== SCROLL TO TOP BUTTON ===== */
.scroll-top-button {
  animation: fadeInUp 0.3s ease-out;
}

.scroll-top-float {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.scroll-top-float i {
  color: #ffffff;
  transition: transform 0.3s ease;
}

.scroll-top-button:hover .scroll-top-float {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  background: rgba(17, 24, 39, 1);
  border-color: rgba(251, 191, 36, 0.5);
}

.scroll-top-button:hover .scroll-top-float i {
  transform: translateY(-2px);
  color: #fbbf24;
}

.scroll-top-button:active .scroll-top-float {
  transform: translateY(0) scale(0.98);
}

/* Tooltip del botón */
.scroll-top-tooltip {
  position: absolute;
  right: 72px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(17, 24, 39, 0.95);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.scroll-top-button:hover .scroll-top-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-4px);
}

/* Fade Scale Transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive - ocultar en móvil si hay barra sticky */
@media (max-width: 1023px) {
  .scroll-top-button {
    bottom: 24px;
    right: 20px;
  }
  
  .whatsapp-button {
    bottom: 108px;
    right: 20px;
  }
  
  .whatsapp-float {
    width: 60px;
    height: 60px;
  }
  
  .whatsapp-float i {
    font-size: 1.75rem;
  }
  
  .whatsapp-tooltip {
    right: 75px;
    min-width: 160px;
    padding: 0.75rem 1rem;
  }
  
  .tooltip-text {
    font-size: 0.875rem;
  }
  
  .tooltip-subtext {
    font-size: 0.7rem;
  }
}

@media (max-width: 640px) {
  .whatsapp-button {
    bottom: 100px;
  }
  
  .scroll-top-button {
    bottom: 20px;
  }
}
</style>

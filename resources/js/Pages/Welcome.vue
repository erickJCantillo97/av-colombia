<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import ContactSection from './Welcome/ContactSection.vue';
import Experiencias from '@/Components/SearchEngines/Search.vue';
import searchStore from '@/store/searchStore';



defineProps({
    canLogin: {
        type: Boolean,
    }
});

const changeType = (newType) => {
    searchStore.type.value = newType;
    router.visit(route('services.home'));
};

// Configuración para el fondo dinámico del Hero
const cartagenaImages = ref(['/images/cartagena.webp']);
const currentImageIndex = ref(0);

const heroBackgroundStyle = computed(() => {
    const currentImage = cartagenaImages.value[currentImageIndex.value];
    return {
        backgroundImage: `url('${currentImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
});

// Cargar imágenes de Cartagena
const loadCartagenaImages = async () => {
    try {
        const UNSPLASH_ACCESS_KEY = 'k_W3HYBYhd5XSmAQhZ3OIhHav0tIw4eMNJyeuHmnI98';
        const queries = ['cartagena colombia', 'cartagena de indias', 'cartagena old city'];
        const allImages = [];
        
        for (const query of queries) {
            try {
                const response = await fetch(
                    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
                );
                
                if (response.ok) {
                    const data = await response.json();
                    const images = data.results.map(photo => 
                        `${photo.urls.regular}&w=1920&h=1080&fit=crop&crop=center&auto=format&q=80`
                    );
                    allImages.push(...images);
                }
            } catch (error) {
                console.warn(`Error buscando "${query}":`, error);
            }
        }
        
        if (allImages.length > 0) {
            cartagenaImages.value = ['/images/cartagena.webp', ...allImages.slice(0, 10)];
        }
    } catch (error) {
        console.error('Error cargando imágenes:', error);
    }
};

onMounted(() => {
    loadCartagenaImages();
    
    // Cambiar imagen cada 10 segundos
    setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % cartagenaImages.value.length;
    }, 5000);
});

// Servicios principales
const services = ref([
    {
        icon: 'fa-map-marked-alt',
        label: 'Tours Personalizados',
        description: 'Explora Cartagena con experiencias únicas diseñadas para ti',
        color: 'blue',
        value: 'TOUR'
    },
    {
        icon: 'fa-hotel',
        label: 'Alojamiento Premium',
        description: 'Hoteles y hospedajes seleccionados en las mejores ubicaciones',
        color: 'amber',
        value:  'EMBARCACION'
    },
    {
        icon: 'fa-ship',
        label: 'Experiencias Náuticas',
        description: 'Navega por las aguas cristalinas del Caribe colombiano',
        color: 'cyan',
        value:  'HOSPEDAJE'
    },
    {
        icon: 'fa-van-shuttle',
        label: 'Transporte Privado',
        description: 'Traslados seguros y cómodos a cualquier destino',
        color: 'green',
        value:  'TRANSFER'
    }
]);

// Destinos destacados
const destinations = ref([
    {
        name: 'Ciudad Amurallada',
        image: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=800&h=600&fit=crop',
        tours: 12
    },
    {
        name: 'Islas del Rosario',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        tours: 8
    },
    {
        name: 'Playa Blanca',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
        tours: 6
    },
    {
        name: 'Volcán del Totumo',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        tours: 4
    }
]);

// Testimonios
const testimonials = ref([
    {
        name: 'María González',
        location: 'Madrid, España',
        rating: 5,
        text: 'Una experiencia inolvidable. El tour por la ciudad amurallada superó todas nuestras expectativas.',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        name: 'John Smith',
        location: 'New York, USA',
        rating: 5,
        text: 'Profesionales, atentos y con un conocimiento increíble. Altamente recomendado.',
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        name: 'Ana Silva',
        location: 'São Paulo, Brasil',
        rating: 5,
        text: 'El mejor servicio de tours en Cartagena. Todo perfectamente organizado.',
        avatar: 'https://i.pravatar.cc/150?img=5'
    }
]);

// Stats
const stats = ref([
    { value: '50K+', label: 'Clientes Felices' },
    { value: '10K+', label: 'Experiencias' },
    { value: '15+', label: 'Años de Experiencia' },
    { value: '4.9', label: 'Calificación Promedio' }
]);

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
    <GuestLayout :isWelcomePage="true">
        <!-- Hero Section Integrado -->
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Fondos con crossfade -->
            <div class="absolute inset-0">
                <div 
                    v-for="(image, index) in cartagenaImages" 
                    :key="index"
                    class="absolute inset-0 hero-background-layer"
                    :class="{ 'active': index === currentImageIndex }"
                    :style="{ backgroundImage: `url('${image}')` }"
                ></div>
            </div>
            
            <!-- Overlay gradiente elegante -->
            <div class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30"></div>
            
            <!-- Contenido principal -->
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
                <div class="space-y-12 animate-fade-in">
                    <!-- Etiqueta superior -->
                    <div class="flex justify-center">
                        <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <span class="text-white text-sm font-medium">Agencia #1 en Cartagena</span>
                        </div>
                    </div>
                    
                    <!-- Título principal -->
                    <div class="text-center">
                        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
                            Descubre la Magia de
                            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mt-2">
                                Cartagena de Indias
                            </span>
                        </h1>
                        
                        <!-- Subtítulo -->
                        <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                            Vive experiencias únicas con los mejores tours, hospedajes y servicios premium
                        </p>
                    </div>
                    
                    <!-- Buscador de Experiencias Integrado -->
                    <div class="max-w-4xl mx-auto mt-12">
                        <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
                            <Experiencias />
                        </div>
                    </div>
                    
                    <!-- CTAs adicionales -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        <button 
                            @click="scrollToSection('services')"
                            class="group px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-black/50 transition-all duration-300 hover:scale-105 border border-white/20"
                        >
                            <span class="flex items-center gap-2">
                                Explorar Experiencias
                                <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                            </span>
                        </button>
                        <button 
                            @click="scrollToSection('contact')"
                            class="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                        >
                            Contactar Ahora
                        </button>
                    </div>
                </div>
                
                <!-- Indicador de scroll -->
                <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <i class="fa-solid fa-chevron-down text-white text-3xl opacity-60"></i>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-12 bg-black border-y border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div v-for="stat in stats" :key="stat.label" class="text-center">
                        <div class="text-4xl md:text-5xl font-bold text-white mb-2">{{ stat.value }}</div>
                        <div class="text-gray-400 text-sm md:text-base font-medium">{{ stat.label }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
                        Nuestros Servicios
                    </h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experiencias cuidadosamente diseñadas para hacer de tu visita algo inolvidable
                    </p>
                </div>

                <!-- Cards de servicios -->
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div 
                        v-for="service in services" 
                        :key="service.label"
                        @click="changeType(service)"
                        class="group relative cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-gray-200 hover:border-transparent"
                    >
                        <!-- Efecto de brillo animado -->
                        <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <!-- Efecto de luz superior -->
                        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="relative z-10">
                            <!-- Icono con efecto de pulso -->
                            <div class="relative mb-6">
                                <div class="absolute inset-0 bg-black/20 rounded-2xl blur-xl group-hover:bg-yellow-400/30 transition-all duration-500"></div>
                                <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-black to-gray-800 group-hover:from-yellow-400 group-hover:to-orange-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                    <i :class="`fa-solid ${service.icon} text-3xl text-white transition-all duration-300`"></i>
                                </div>
                            </div>
                            
                            <!-- Contenido -->
                            <h3 class="text-2xl font-bold text-black group-hover:text-white mb-3 transition-colors duration-300">
                                {{ service.label }}
                            </h3>
                            <p class="text-gray-600 group-hover:text-gray-300 leading-relaxed mb-6 transition-colors duration-300 min-h-[60px]">
                                {{ service.description }}
                            </p>
                            
                            <!-- Link con animación -->
                            <div class="flex items-center gap-2 text-black group-hover:text-yellow-400 font-semibold transition-all duration-300">
                                <span class="relative">
                                    Ver más
                                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                                </span>
                                <i class="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
                            </div>
                        </div>
                        
                        <!-- Patrón decorativo en esquina -->
                        <div class="absolute -bottom-8 -right-8 w-32 h-32 bg-black/5 group-hover:bg-yellow-400/20 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Destinations Section -->
        <section class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
                        Destinos Populares
                    </h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Los lugares más hermosos de Cartagena te esperan
                    </p>
                </div>

                <!-- Grid de destinos -->
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div 
                        v-for="destination in destinations" 
                        :key="destination.name"
                        class="group relative overflow-hidden rounded-2xl border-2 border-black hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-[3/4]"
                    >
                        <!-- Imagen -->
                        <img 
                            :src="destination.image" 
                            :alt="destination.name"
                            class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        <!-- Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        
                        <!-- Contenido -->
                        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 class="text-2xl font-bold mb-2">{{ destination.name }}</h3>
                            <div class="flex items-center gap-2 text-sm text-gray-200">
                                <i class="fa-solid fa-map-marker-alt"></i>
                                <span>{{ destination.tours }} experiencias disponibles</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="py-20 bg-black text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold mb-4">
                        Lo Que Dicen Nuestros Clientes
                    </h2>
                    <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                        Miles de viajeros han confiado en nosotros para vivir experiencias inolvidables
                    </p>
                </div>

                <!-- Grid de testimonios -->
                <div class="grid md:grid-cols-3 gap-8">
                    <div 
                        v-for="testimonial in testimonials" 
                        :key="testimonial.name"
                        class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                    >
                        <!-- Rating -->
                        <div class="flex gap-1 mb-4">
                            <i v-for="n in testimonial.rating" :key="n" class="fa-solid fa-star text-yellow-400"></i>
                        </div>
                        
                        <!-- Texto -->
                        <p class="text-gray-300 leading-relaxed mb-6 italic">
                            "{{ testimonial.text }}"
                        </p>
                        
                        <!-- Autor -->
                        <div class="flex items-center gap-4">
                            <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full border-2 border-white/20" />
                            <div>
                                <div class="font-semibold text-white">{{ testimonial.name }}</div>
                                <div class="text-sm text-gray-500">{{ testimonial.location }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-white border-t border-black">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-black">
                    ¿Listo para Tu Próxima Aventura?
                </h2>
                <p class="text-xl mb-8 text-gray-600">
                    Contáctanos hoy y descubre por qué somos la agencia #1 en Cartagena
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                        :href="route('services.home')"
                        class="px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        Ver Todos los Tours
                    </a>
                    <button 
                        @click="scrollToSection('contact')"
                        class="px-8 py-4 bg-transparent border-2 border-black text-black rounded-xl font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300"
                    >
                        Solicitar Cotización
                    </button>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <div id="contact">
            <ContactSection></ContactSection>
        </div>
    </GuestLayout>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 1s ease-out;
}

/* Efecto crossfade para el fondo del Hero */
.hero-background-layer {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transition: opacity 2s ease-in-out;
}

.hero-background-layer.active {
    opacity: 1;
}

/* Safelist para Tailwind (agregar al tailwind.config.js si es necesario) */
</style>

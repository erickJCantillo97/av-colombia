<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { computed, ref, watch, onMounted } from "vue";
import searchStore from '@/store/searchStore.js';
import OverlayPanel from 'primevue/overlaypanel';
import IncludesView from "./Components/IncludesView.vue";
import Header from "@/Components/Sections/Header.vue";
import Portada from "./Components/Portada.vue";
import Breadcrumb from "./Components/Breadcrumb.vue";
import Gallery from "./Components/Gallery.vue";
import LargeBooking from "./Components/LargeBooking.vue";
import Equipament from "./Components/Equipament.vue";
import CollectionPoints from "./Components/CollectionPoints.vue";
import MiniBooking from "./Components/miniBooking.vue";
import GuestSelector from "@/Components/SearchEngines/Search/GuestSelector.vue";
import { Head, Link, router } from "@inertiajs/vue3";
import ServicesMain from "./Components/ServicesMain.vue";
import ItineraryView from "./Components/ItineraryView.vue";
import { max } from "date-fns";

const props = defineProps({
    service: Object,
    availabilities: Array,
    features: Array,
    itineraries: Array,
});

const showFullDescription = ref(false);
// datepicker state (range)
const dateRange = ref(null); // [startDate, endDate] (Date objects)
const dateSingle = ref(new Date());
const guests = ref(1);
const op = ref(null);
const guestsOp = ref(null);
const showMobileBooking = ref(false);

// normalize availabilities into a Set of YYYY-MM-DD strings when possible
const availabilitySet = computed(() => {
    if (!props.availabilities) return new Set();
    try {
        const s = new Set();
        props.availabilities.forEach((item) => {
            if (!item) return;
            if (typeof item === 'string') {
                s.add(item.split('T')[0]);
            } else if (item.date) {
                s.add(item.date.split('T')[0]);
            } else if (item.start_date) {
                s.add(item.start_date.split('T')[0]);
            } else if (item.start) {
                s.add(item.start.split('T')[0]);
            }
        });
        return s;
    } catch (e) {
        return new Set();
    }
});

function formatYMD(d) {
    if (!d) return null;
    return d.toISOString();
}

function handleCalendarChange(val) {
    console.log('Calendar change:', val); // Para debug
    try {
        if (!val) {
            dateRange.value = null;
            searchStore.checkin.value = '';
            searchStore.checkout.value = '';
            return;
        }

        // VueDatePicker retorna array de Date objects cuando es range
        if (Array.isArray(val)) {
            const [startDate, endDate] = val;

            // Actualizar dateRange con los objetos Date
            dateRange.value = val;

            // Convertir a strings para el store
            searchStore.checkin.value = startDate ? formatYMD(startDate) : '';
            searchStore.checkout.value = endDate ? formatYMD(endDate) : '';

            // Cerrar el overlay después de seleccionar ambas fechas
            if (startDate && endDate) {
                setTimeout(() => {
                    try { op.value?.hide(); } catch (e) { }
                }, 500);
            }
        } else {
            dateSingle.value = val;
            searchStore.checkin.value = formatYMD(val);
            searchStore.checkout.value = formatYMD(val);
        }
    } catch (e) {
        console.error('Error handling calendar change:', e);
    }
}

const datesAvailable = computed(() => {
    if (!dateRange.value || dateRange.value.length < 2) return false;
    const [start, end] = dateRange.value;
    if (!start || !end) return false;
    // build all dates between start and end inclusive
    const s = new Date(start);
    const e = new Date(end);
    if (s > e) return false;
    const set = availabilitySet.value;
    // if availabilitySet is empty, be permissive (unknown availability)
    if (set.size === 0) return true;
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        const key = formatYMD(d);
        if (!set.has(key)) return false;
    }
    return true;
});

// sync simple checkIn/checkOut refs for other UI uses (optional)
const checkIn = ref(null);
const checkOut = ref(null);
watch(dateRange, (val) => {
    if (!val) {
        checkIn.value = null;
        checkOut.value = null;
        return;
    }
    if (Array.isArray(val)) {
        checkIn.value = val[0] ? formatYMD(val[0]) : null;
        checkOut.value = val[1] ? formatYMD(val[1]) : null;
    }
});

// Parse URL search params to prefill dateRange and guests so the component
// reflects the same values used by the app-wide search engine.
// Prefill from searchStore so dates/viajeros sean los mismos que usa el motor de búsqueda
onMounted(() => {
    try {
        const ci = searchStore.checkin?.value;
        const co = searchStore.checkout?.value;
        if (ci && co) {
            const cIn = new Date(ci);
            const cOut = new Date(co);
            if (!isNaN(cIn) && !isNaN(cOut)) {
                dateRange.value = [cIn, cOut];
            }
        } else if (ci) {
            const cIn = new Date(ci);
            if (!isNaN(cIn)) {
                dateRange.value = [cIn, null];
            }
        }

        // guests in the store is an object {adults, children, infants}
        const gObj = searchStore.guests?.value;
        if (gObj) {
            const total = (Number(gObj.adults || 0) + Number(gObj.children || 0) + Number(gObj.infants || 0)) || 1;
            guests.value = total;
        }
    } catch (e) {
        console.error('Error mounting component:', e);
    }
});

// When store changes elsewhere, reflect into this component
watch([() => searchStore.checkin.value, () => searchStore.checkout.value], ([nci, nco]) => {
    try {
        if (nci && nco) {
            const a = new Date(nci);
            const b = new Date(nco);
            if (!isNaN(a) && !isNaN(b)) {
                // Solo actualizar si es diferente para evitar bucles
                const currentStart = dateRange.value?.[0];
                const currentEnd = dateRange.value?.[1];
                if (!currentStart || !currentEnd ||
                    formatYMD(currentStart) !== nci ||
                    formatYMD(currentEnd) !== nco) {
                    dateRange.value = [a, b];
                }
            }
        } else if (nci && !nco) {
            const a = new Date(nci);
            if (!isNaN(a)) {
                dateRange.value = [a, null];
            }
        } else {
            dateRange.value = null;
        }
    } catch (e) {
        console.error('Error watching store changes:', e);
    }
});

watch(() => searchStore.guests.value, (ng) => {
    if (!ng) return;
    const total = (Number(ng.adults || 0) + Number(ng.children || 0) + Number(ng.infants || 0)) || 1;
    guests.value = total;
}, { deep: true });

// When local guests changes, update store.guests.adults conservatively
watch(guests, (n) => {
    const current = searchStore.guests.value || { adults: 1, children: 0, infants: 0 };
    // map the numeric control into adults (keep children/infants unchanged)
    const newAdults = Math.max(1, Number(n) - (Number(current.children || 0) + Number(current.infants || 0)));
    searchStore.guests.value = { ...current, adults: newAdults };
});

// Funciones para manejar el incremento/decremento de huéspedes detallado
function incrementGuests(type) {

    const current = searchStore.guests.value || { adults: 1, children: 0, infants: 0 };
    const maxCapacity = props.service.capacidad_max
    if (maxCapacity) {
        const total = current.adults + current.children + current.infants
        if (total + 1 > maxCapacity && props.service.type === 'TRANSFER') {
            return;
        }
    }
    const updated = { ...current };
    updated[type] = Math.max(0, (updated[type] || 0) + 1);
    searchStore.guests.value = updated;

    // Actualizar el total local
    const total = updated.adults + updated.children + updated.infants;
    guests.value = total || 1;
}

function decrementGuests(type) {
    const current = searchStore.guests.value || { adults: 1, children: 0, infants: 0 };
    const updated = { ...current };

    // No permitir que los adultos bajen de 1
    if (type === 'adults') {
        updated[type] = Math.max(1, (updated[type] || 1) - 1);
    } else {
        updated[type] = Math.max(0, (updated[type] || 0) - 1);
    }

    searchStore.guests.value = updated;

    // Actualizar el total local
    const total = updated.adults + updated.children + updated.infants;
    guests.value = total || 1;
}

const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const product = {
    name: props.service.title,
    price: USDollar.format(props.service.price),
    rating: 4,
    images: props.service.images.map((image) => image.filepath),
    features: props.service.features,
    description: props.service.description,
    details: [
        {
            name: "Incluidos",
            items: JSON.parse(props.service.includes),
        },
        {
            name: "No Incluidos",
            items: JSON.parse(props.service.notIncludes),
        },
        // More sections...
    ],
};

// Hero image para el header (usa la primera imagen disponible)
const heroImage = computed(() => {
    try {
        return props.service.images && props.service.images.length ? props.service.images[0].filepath : '/images/cartagena.webp';
    } catch (e) {
        return '/images/cartagena.webp';
    }
});

const priceService = computed(() => {
    const maxCapacity = Number(props.service.capacidad_max) || 1;
    // TOUR: precio por persona * # viajeros
    if (props.service.type === 'TOUR') {
        return props.service.adults_price * guests.value;
    }
    // EMBARCACION: tarifa por embarcación (fijo)
    else if (props.service.type === 'EMBARCACION') {
        return props.service.adults_price;
    }
    // TRANSFER: calcular número de unidades según capacidad
    else if (props.service.type === 'TRANSFER') {
        return props.service.adults_price * Math.ceil(guests.value / maxCapacity);
    }
    // fallback: por persona
    return props.service.adults_price * guests.value;
});


const goToCheckout = () => {
    router.get(route('check.out', props.service.slug)
    );
}

// Hero background slideshow con imágenes del servicio
const currentImageIndex = ref(0);
const galleryImages = computed(() => {
    return props.service.images && props.service.images.length > 0 
        ? props.service.images.map(img => img.filepath)
        : ['/images/cartagena.webp'];
});

// Cambiar imagen cada 5 segundos
onMounted(() => {
    if (galleryImages.value.length > 1) {
        setInterval(() => {
            currentImageIndex.value = (currentImageIndex.value + 1) % galleryImages.value.length;
        }, 5000);
    }
});
</script>

<template>
    <Head :title="`Av Colombia -  ${product.name}`" />
    
    <!-- Header transparente integrado sobre el Hero -->
    <Header :isWelcomePage="true" />

    <!-- HERO FULLSCREEN con imagen de fondo (estilo Welcome Premium integrado con Header) -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Fondos con crossfade (múltiples imágenes de la galería) -->
        <div class="absolute inset-0">
            <div 
                v-for="(image, index) in galleryImages" 
                :key="index"
                class="absolute inset-0 hero-background-layer"
                :class="{ 'active': index === currentImageIndex }"
                :style="{ backgroundImage: `url('${image}')` }"
            ></div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/40"></div>
        
        <!-- Contenido Hero (ajustado para el Header transparente) -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Izquierda: Info del servicio -->
                <div class="space-y-8 text-white animate-fade-in">
                    <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <i class="fa-solid fa-star text-yellow-400"></i>
                        <span class="text-sm font-medium">Experiencia Premium</span>
                    </div>

                    <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                        {{ product.name }}
                    </h1>

                    <p class="text-lg md:text-xl text-gray-200 leading-relaxed">
                        {{ product.description ? product.description.replace(/<[^>]*>/g, '').slice(0,200) : 'Vive una experiencia inolvidable' }}
                    </p>

                    <!-- Badges rápidos -->
                    <div class="flex flex-wrap gap-3">
                        <div class="px-4 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm">
                            <i class="fa-solid fa-users mr-2"></i>{{ service.capacidad_max || '8' }} personas máx
                        </div>
                        <div class="px-4 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm">
                            <i class="fa-solid fa-clock mr-2"></i>Cancelación flexible
                        </div>
                    </div>

                </div>

                <!-- Derecha: FORMULARIO DE RESERVA DESTACADO (flotante) -->
                <div class="animate-fade-in-up">
                    <div class="booking-card-hero">
                        <div class="text-center mb-6">
                            <div class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                                {{ USDollar.format(props.service.adults_price) }}
                            </div>
                            <div class="text-white text-sm mt-2">{{ props.service.type == 'TOUR' ? 'por persona' : 'por embarcación' }}</div>
                        </div>

                        <form class="space-y-4">
                            <!-- Fecha -->
                            <div>
                                <label class="block text-xs font-bold text-white mb-2 uppercase tracking-wide">Fecha</label>
                                <button type="button" @click="op?.toggle($event)"
                                    class="w-full text-left flex items-center justify-between px-4 py-4 rounded-xl bg-white/95 hover:bg-white transition-all duration-300 shadow-lg">
                                    <div class="text-sm text-gray-900 font-medium">
                                        {{ checkIn ? new Date(checkIn).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: service.type == 'HOSPEDAJE' ? undefined : 'numeric' }) : 'Selecciona una fecha' }}
                                    </div>
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </button>
                            </div>

                            <OverlayPanel ref="op" appendTo="body" class="!w-auto">
                                <div class="p-0 h-[330px]" v-if="service.type == 'HOSPEDAJE'">
                                    <VueDatePicker v-model="dateRange" range :min-date="new Date()" inline auto-apply :teleport="false" locale="es" :format="'dd/MM/yyyy'" :preview-format="'dd/MM/yyyy'" placeholder="Selecciona fechas" @update:model-value="handleCalendarChange" />
                                </div>
                                <div v-else class="p-0 h-[330px]">
                                    <VueDatePicker v-model="dateSingle" :min-date="new Date()" inline auto-apply :teleport="false" locale="es" :format="'dd/MM/yyyy'" :preview-format="'dd/MM/yyyy'" placeholder="Selecciona fechas" @update:model-value="handleCalendarChange" />
                                </div>
                            </OverlayPanel>

                            <!-- Viajeros -->
                            <div>
                                <label class="block text-xs font-bold text-white mb-2 uppercase tracking-wide">Viajeros</label>
                                <button type="button" @click="guestsOp?.toggle($event)" 
                                    class="w-full text-left px-4 py-4 rounded-xl bg-white/95 hover:bg-white transition-all duration-300 shadow-lg flex items-center justify-between">
                                    <div class="text-sm text-gray-900 font-medium">{{ guests }} viajero{{ guests > 1 ? 's' : '' }}</div>
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                <OverlayPanel ref="guestsOp" appendTo="body" class="!w-auto">
                                    <div class="p-4 min-w-[300px]">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">¿Quién viene?</h3>
                                        <GuestSelector :guests="searchStore.guests.value || { adults: 1, children: 0, infants: 0 }" @increment="incrementGuests" @decrement="decrementGuests" />
                                    </div>
                                </OverlayPanel>
                            </div>

                            <!-- CTA PRINCIPAL DESTACADO -->
                            <div class="pt-2">
                                <button v-if="!checkIn || !checkOut" type="button" @click="op?.toggle($event)" 
                                    class="w-full btn-hero">
                                    <span class="flex items-center justify-center gap-2">
                                        <i class="fa-solid fa-calendar-days"></i>
                                        Selecciona fechas
                                    </span>
                                </button>
                                <button v-else @click="goToCheckout" type="button" 
                                    class="w-full btn-hero-action">
                                    <span class="flex items-center justify-center gap-2">
                                        <i class="fa-solid fa-rocket"></i>
                                        Reservar Ahora
                                    </span>
                                </button>
                            </div>
                        </form>

                        <!-- Totales -->
                        <div v-if="checkIn && checkOut" class="mt-6 pt-6 border-t border-white/20">
                            <div class="flex justify-between text-white/80 text-sm mb-2">
                                <span>{{ USDollar.format(props.service.adults_price) }} x {{ guests }}</span>
                                <span class="font-semibold">{{ USDollar.format(priceService) }}</span>
                            </div>
                            <div class="flex justify-between text-white font-bold text-xl">
                                <span>Total</span>
                                <span>{{ USDollar.format(priceService) }}</span>
                            </div>
                        </div>

                        <p class="mt-4 text-xs text-white/60 text-center">🔒 Pago seguro · Cancelación gratuita 24h antes</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Indicador scroll -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <i class="fa-solid fa-chevron-down text-white text-3xl opacity-60"></i>
        </div>
    </section>

    <!-- Galería de imágenes (rediseñada premium) -->
    <section v-if="service.type != 'TRANSFER'" class="relative py-24 overflow-hidden">
        <!-- Fondo con gradiente dinámico -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
        
        <!-- Patrón decorativo -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header de sección mejorado -->
            <div class="text-center mb-12 space-y-4">
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                    <i class="fa-solid fa-images text-yellow-400"></i>
                    <span class="text-white/80 text-sm font-medium">Galería Visual</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                    Explora Cada Detalle
                </h2>
                <p class="text-gray-400 text-lg max-w-2xl mx-auto">
                    Descubre la experiencia a través de imágenes que cuentan la historia
                </p>
            </div>

            <!-- Gallery con diseño premium -->
            <div class="relative group">
                <!-- Efecto glow alrededor -->
                <div class="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <!-- Contenedor de galería -->
                <div class="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-4 md:p-6 border border-white/10 shadow-2xl">
                    <Gallery :images="product.images" class="rounded-2xl overflow-hidden" />
                    
                    <!-- Contador de imágenes -->
                    <div class="absolute top-8 right-8 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-semibold flex items-center gap-2">
                        <i class="fa-solid fa-camera"></i>
                        <span>{{ product.images.length }} fotos</span>
                    </div>
                </div>
            </div>

            <!-- CTA adicional -->
            <div class="mt-12 text-center">
                <p class="text-gray-400 text-sm">
                    Haz clic en cualquier imagen para ver en pantalla completa
                </p>
            </div>
        </div>
    </section>

    <!-- Contenido Principal (secciones modulares estilo Welcome) -->
    <div class="bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="space-y-16">
                <!-- Información del anfitrión -->
                <div class="border-b pb-1">

                </div>
                <!-- Equipamiento (embarcaciones) en card moderno -->
                <section v-if="service.type == 'EMBARCACION'" class="content-card">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                            <i class="fa-solid fa-ship text-white text-xl"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900">Equipamiento</h2>
                    </div>
                    <Equipament :service="service" />
                </section>

                <!-- Descripción en card destacado MEJORADO -->
                <section class="description-card">
                    <!-- Header con diseño premium -->
                    <div class="relative mb-8">
                        <!-- Línea decorativa -->
                        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
                        
                        <div class="pl-8">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                    <i class="fa-solid fa-file-lines text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Descripción</h2>
                                    <p class="text-sm text-gray-500 font-medium">Conoce todos los detalles de esta experiencia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contenido con diseño mejorado -->
                    <div class="relative">
                        <!-- Decoración de fondo -->
                        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-full blur-3xl opacity-30 -z-10"></div>
                        
                        <div class="prose prose-lg max-w-none">
                            <!-- Contenido con transición -->
                            <transition name="expand">
                                <div v-if="showFullDescription || product.description.length <= 500" 
                                    key="full" 
                                    class="text-gray-700 leading-relaxed"
                                    v-html="product.description">
                                </div>
                                <div v-else 
                                    key="short" 
                                    class="text-gray-700 leading-relaxed relative"
                                    v-html="product.description.slice(0, 500) + '...'">
                                </div>
                            </transition>
                            
                            <!-- Gradiente fade cuando está colapsado -->
                            <div v-if="!showFullDescription && product.description.length > 500" 
                                class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none">
                            </div>
                        </div>

                        <!-- Botón mejorado -->
                        <div v-if="product.description.length > 500" class="mt-8 flex justify-center">
                            <button @click="showFullDescription = !showFullDescription"
                                class="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                                <!-- Efecto de brillo animado -->
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                
                                <span class="relative z-10">{{ showFullDescription ? 'Mostrar menos' : 'Leer más' }}</span>
                                <i class="relative z-10 fa-solid transition-transform duration-300" 
                                    :class="showFullDescription ? 'fa-chevron-up' : 'fa-chevron-down'">
                                </i>
                            </button>
                        </div>
                    </div>

                    <!-- Stats o features destacados (opcional) -->
                    <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 transition-colors duration-300">
                            <i class="fa-solid fa-star text-yellow-500 text-2xl mb-2"></i>
                            <p class="text-xs text-gray-500 font-medium">Experiencia</p>
                            <p class="text-lg font-bold text-gray-900">Premium</p>
                        </div>
                        <div class="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 transition-colors duration-300">
                            <i class="fa-solid fa-shield-halved text-green-500 text-2xl mb-2"></i>
                            <p class="text-xs text-gray-500 font-medium">Garantía</p>
                            <p class="text-lg font-bold text-gray-900">100%</p>
                        </div>
                        <div class="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 transition-colors duration-300">
                            <i class="fa-solid fa-clock text-blue-500 text-2xl mb-2"></i>
                            <p class="text-xs text-gray-500 font-medium">Disponible</p>
                            <p class="text-lg font-bold text-gray-900">24/7</p>
                        </div>
                        <div class="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 transition-colors duration-300">
                            <i class="fa-solid fa-heart text-red-500 text-2xl mb-2"></i>
                            <p class="text-xs text-gray-500 font-medium">Satisfacción</p>
                            <p class="text-lg font-bold text-gray-900">5.0</p>
                        </div>
                    </div>
                </section>

                <!-- Itinerario en card moderno MEJORADO -->
                <section class="itinerary-card">
                    <!-- Header premium con gradiente -->
                    <div class="relative mb-10">
                        <!-- Línea decorativa con puntos -->
                        <div class="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse"></div>
                            <div class="w-1 h-12 bg-gradient-to-b from-blue-400 via-cyan-500 to-teal-500"></div>
                            <div class="w-2 h-2 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 animate-pulse" style="animation-delay: 0.5s;"></div>
                        </div>
                        
                        <div class="pl-10">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                    <i class="fa-solid fa-route text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Itinerario</h2>
                                    <p class="text-sm text-gray-500 font-medium">Plan detallado de tu experiencia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Decoración de fondo -->
                    <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-30 -z-10"></div>
                    <div class="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-50 to-green-50 rounded-full blur-3xl opacity-30 -z-10"></div>

                    <!-- Contenido del itinerario -->
                    <div class="relative">
                        <ItineraryView :itineraries="itineraries" :readOnly="true" />
                    </div>

                    <!-- Info adicional -->
                    <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 rounded-2xl border border-blue-100">
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                                <i class="fa-solid fa-info-circle text-white text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-bold text-gray-900 mb-2">Información Importante</h3>
                                <ul class="space-y-2 text-sm text-gray-700">
                                    <li class="flex items-center gap-2">
                                        <i class="fa-solid fa-check-circle text-green-500"></i>
                                        <span>Los horarios pueden variar según condiciones climáticas</span>
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <i class="fa-solid fa-check-circle text-green-500"></i>
                                        <span>Incluye tiempo libre en cada parada</span>
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <i class="fa-solid fa-check-circle text-green-500"></i>
                                        <span>Guía profesional durante todo el recorrido</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Servicios en card moderno -->
                <section class="content-card">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                            <i class="fa-solid fa-star text-white text-xl"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900">Servicios Incluidos</h2>
                    </div>
                    <ServicesMain :service="service" :features="features" />
                </section>

                <!-- Qué incluye MEJORADO -->
                <section v-if="service.includes != '[]'" class="includes-card">
                    <!-- Header premium con gradiente verde -->
                    <div class="relative mb-10">
                        <!-- Línea decorativa con checkmarks -->
                        <div class="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-gradient-to-br from-green-400 to-green-600 animate-pulse"></div>
                            <div class="w-1 h-12 bg-gradient-to-b from-green-400 via-emerald-500 to-teal-500"></div>
                            <div class="w-2 h-2 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 animate-pulse" style="animation-delay: 0.5s;"></div>
                        </div>
                        
                        <div class="pl-10">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <i class="fa-solid fa-check-double text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Qué Incluye</h2>
                                    <p class="text-sm text-gray-500 font-medium">Todo lo que necesitas para tu experiencia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Decoración de fondo -->
                    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-3xl opacity-30 -z-10"></div>
                    <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-full blur-3xl opacity-30 -z-10"></div>

                    <!-- Contenido -->
                    <div class="relative">
                        <IncludesView :service="service" :features="features" />
                    </div>

                    <!-- Info adicional con badge -->
                    <div class="mt-8 p-6 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl border border-green-100">
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <i class="fa-solid fa-shield-check text-white text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-bold text-gray-900 mb-2">Garantía de Calidad</h3>
                                <p class="text-sm text-gray-700 leading-relaxed">
                                    Todos los servicios incluidos están garantizados y cumplen con los más altos estándares de calidad. Tu satisfacción es nuestra prioridad.
                                </p>
                            </div>
                            <div class="flex-shrink-0">
                                <div class="px-4 py-2 bg-white rounded-full border-2 border-green-500 text-green-600 font-bold text-sm whitespace-nowrap">
                                    ✓ Verificado
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Puntos de recogida MEJORADO -->
                <section v-if="service.recogidas != '[]'" class="collection-card">
                    <!-- Header premium con gradiente azul-púrpura -->
                    <div class="relative mb-10">
                        <!-- Línea decorativa con marcadores de ubicación -->
                        <div class="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 animate-pulse"></div>
                            <div class="w-1 h-12 bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-500"></div>
                            <div class="w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 animate-pulse" style="animation-delay: 0.5s;"></div>
                        </div>
                        
                        <div class="pl-10">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                    <i class="fa-solid fa-map-location-dot text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Puntos de Recogida</h2>
                                    <p class="text-sm text-gray-500 font-medium">Lugares donde podemos recogerte</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Decoración de fondo -->
                    <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30 -z-10"></div>
                    <div class="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full blur-3xl opacity-30 -z-10"></div>

                    <!-- Contenido -->
                    <div class="relative">
                        <CollectionPoints :service="service" />
                    </div>

                    <!-- Info adicional con mapa -->
                    <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <i class="fa-solid fa-circle-info text-white text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-bold text-gray-900 mb-2">Información de Recogida</h3>
                                <ul class="space-y-2 text-sm text-gray-700">
                                    <li class="flex items-center gap-2">
                                        <i class="fa-solid fa-clock text-indigo-500"></i>
                                        <span>Confirma tu hora de recogida al momento de reservar</span>
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <i class="fa-solid fa-phone text-indigo-500"></i>
                                        <span>Te contactaremos 24h antes para coordinar detalles</span>
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <i class="fa-solid fa-map-pin text-indigo-500"></i>
                                        <span>Ubicación exacta será compartida tras la confirmación</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </div>

    <!-- Botón flotante para volver a buscar (siempre visible) -->
    <Link :href="route('welcome')" class="hidden lg:block fixed bottom-8 left-8 z-50 group">
        <div class="back-button-float">
            <i class="fa-solid fa-arrow-left text-white text-lg"></i>
        </div>
        <div class="back-button-tooltip">
            Volver a buscar
        </div>
    </Link>

    <!-- Mobile sticky bottom bar (modernizado) -->
    <div class="lg:hidden fixed left-4 right-4 bottom-4 z-50 flex items-center gap-3">
        <!-- Botón flotante volver (móvil) -->
        <Link :href="route('welcome')" class="flex-shrink-0">
            <div class="back-button-float-mobile">
                <i class="fa-solid fa-arrow-left text-white text-lg"></i>
            </div>
        </Link>

        <!-- Booking card (móvil) -->
        <div class="booking-card-hero flex-1 flex items-center justify-between px-6 py-4 shadow-2xl cursor-pointer" @click="showMobileBooking = true">
            <div>
                <div class="text-2xl font-extrabold text-white">{{ USDollar.format(props.service.adults_price) }}</div>
                <div class="text-sm text-white/80">{{ props.service.type == 'TOUR' ? 'por persona' : 'por embarcación' }}</div>
            </div>
            <button class="btn-hero-action px-6 py-3 text-sm">
                <i class="fa-solid fa-calendar-check mr-2"></i>
                Reservar
            </button>
        </div>
    </div>

        <!-- Mobile booking modal -->
        <Transition name="mobile-modal">
            <div v-if="showMobileBooking" class="lg:hidden fixed inset-0 z-50 overflow-hidden"
                @click="showMobileBooking = false">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>

                <!-- Modal content -->
                <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl max-h-[90vh] overflow-y-auto transform transition-transform mobile-booking-content"
                    @click.stop>
                    <!-- Header -->
                        <div class="sticky top-0 px-4 py-4 flex items-center justify-between rounded-t-2xl modal-header-gradient">
                            <h2 class="text-lg font-semibold text-white">Reservar experiencia</h2>
                            <button @click="showMobileBooking = false" class="p-2 bg-white/18 hover:bg-white/25 rounded-full transition-colors">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                    <!-- Content -->
                    <div class="p-4 pb-20">
                        <div class="mb-6">
                            <div class="flex items-baseline justify-start gap-x-2">
                                <div class="text-2xl font-bold text-gray-900">{{
                                    USDollar.format(props.service.adults_price) }}</div>
                                <div class="text-sm text-gray-600">{{ props.service.type == 'TOUR' ? 'por persona' :
                                    'por Embarcación'
                                    }}</div>
                            </div>
                        </div>

                        <form class="space-y-4">
                            <!-- Selector de fechas móvil -->
                            <div class="space-y-3">
                                <h3 class="text-base font-medium text-gray-900">{{
                                    service.type != 'EMBARCACION' ? 'Fechas' : 'Dia a reservar'
                                    }}
                                </h3>
                                <div class="grid grid-cols-2 gap-3">
                                    <!-- Check-in móvil -->
                                    <div :class="service.type != 'HOSPEDAJE' ? 'col-span-2 w-full' : ''">
                                        <label v-if="service.type == 'HOSPEDAJE'"
                                            class="text-xs font-medium text-gray-700 block mb-1">LLEGADA</label>
                                        <button type="button"
                                            class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            @click="op?.toggle($event)">
                                            <div v-if="service.type != 'EMBARCACION'"
                                                class="text-sm text-gray-900 font-medium">
                                                {{ checkIn ? new Date(checkIn).toLocaleDateString('es-ES', {
                                                    day:
                                                        'numeric', month: 'short'
                                                }) :
                                                    'Agregar fecha' }}
                                            </div>
                                            <div v-else class="text-sm text-gray-900 font-medium w-full text-center">
                                                {{ checkIn ? new Date(checkIn).toLocaleDateString('es-ES', {
                                                    day:
                                                        'numeric', month: 'long', year: 'numeric'
                                                }) :
                                                    'Agregar fecha' }}
                                            </div>
                                        </button>
                                    </div>

                                    <!-- Check-out móvil -->
                                    <div v-if="service.type == 'HOSPEDAJE'">
                                        <label class="text-xs font-medium text-gray-700 block mb-1">SALIDA</label>
                                        <button type="button"
                                            class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            @click="op?.toggle($event)">
                                            <div class="text-sm text-gray-900 font-medium">
                                                {{ checkOut ? new Date(checkOut).toLocaleDateString('es-ES', {
                                                    day:
                                                        'numeric', month: 'short'
                                                })
                                                    : 'Agregar fecha' }}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Selector de huéspedes móvil -->
                            <div class="space-y-3">
                                <h3 class="text-base font-medium text-gray-900">{{
                                    service.type != 'EMBARCACION' ? 'Viajeros' : 'Pasajeros' }}</h3>
                                <button type="button"
                                    class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    @click="guestsOp?.toggle($event)">
                                    <div class="text-sm text-gray-900 font-medium">
                                        {{ guests }} viajero{{ guests > 1 ? 's' : '' }}
                                    </div>
                                </button>   
                            </div>

                            <!-- Totales móvil -->
                            <div v-if="checkIn && checkOut && service.type != 'EMBARCACION'" class="border-t pt-4 mt-6">
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between text-sm text-gray-600">
                                        <div>{{ USDollar.format(props.service.adults_price) }} x {{ guests }} Personas{{
                                            guests > 1 ? 'es' :
                                                '' }}</div>
                                        <div class="font-medium text-gray-900">{{
                                            USDollar.format(props.service.adults_price * guests) }}
                                        </div>
                                    </div>
                                    <div
                                        class="flex items-center justify-between text-base font-semibold text-gray-900 pt-2 border-t">
                                        <div>Total</div>
                                        <div>{{ USDollar.format(props.service.adults_price * guests) }}</div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Fixed bottom button -->
                    <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                        <button v-if="!checkIn || !checkOut" type="button"
                            class="w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg py-3 font-semibold transition duration-200"
                            @click="op?.toggle($event)">
                            Revisa las fechas
                        </button>
                        <Button class="w-full" @click="router.get(route('check.out', props.service))"
                            label="Reservar"></Button>
                    </div>
                </div>
            </div>
        </Transition>
</template>
<style scoped>
/* ===== ANIMACIONES GENERALES ===== */
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

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-fade-in {
    animation: fade-in 0.8s ease-out;
}

.animate-fade-in-up {
    animation: fade-in-up 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* ===== EXPAND TRANSITION ===== */
.expand-enter-active,
.expand-leave-active {
    transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
    max-height: 1000px;
    opacity: 1;
}

/* Mobile modal animations */
.mobile-modal-enter-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-modal-leave-active {
    transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.mobile-modal-enter-from {
    opacity: 0;
}

.mobile-modal-enter-from .mobile-booking-content {
    transform: translateY(100%);
}

.mobile-modal-leave-to {
    opacity: 0;
}

.mobile-modal-leave-to .mobile-booking-content {
    transform: translateY(100%);
}

.mobile-modal-enter-to,
.mobile-modal-leave-from {
    opacity: 1;
}

.mobile-modal-enter-to .mobile-booking-content,analiza esta pagina de show aqui se muestran los detalles de los servicios que ofrece la agencia, verifica la pagina de welcome y dale a este show un estilo acorde a la de welcome, pero sin perder las funciones que ya tiene esta pagina ni sus componentes, haz este cambio visual, elegante, inovador y que se note que es muy moderno, ademas haz algo minimalista que el formulario de reserva sea lo mas importante
.mobile-modal-leave-from .mobile-booking-content {
    transform: translateY(0);
}

/* Smooth backdrop animation */
.mobile-modal-enter-active .bg-black,
.mobile-modal-leave-active .bg-black {
    transition: opacity 0.3s ease-in-out;
}

.mobile-modal-enter-from .bg-black {
    opacity: 0;
}

.mobile-modal-leave-to .bg-black {
    opacity: 0;
}

/* Smooth content slide animation */
.mobile-booking-content {
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
}

/* Smooth scroll for mobile content */
@media (max-width: 1023px) {
    .mobile-booking-content {
        scroll-behavior: smooth;
    }

    /* Add a subtle bounce effect when modal appears */
    .mobile-modal-enter-active .mobile-booking-content {
        animation: slideUpBounce 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
}

@keyframes slideUpBounce {
    0% {
        transform: translateY(100%);
    }

    70% {
        transform: translateY(-2%);
    }

    100% {
        transform: translateY(0);
    }
}

/* Enhanced button transitions */
.mobile-modal button {
    transition: all 0.2s ease-in-out;
}

.mobile-modal button:active {
    transform: scale(0.98);
}

/* ===== TARJETA DE RESERVA HERO (formulario destacado) ===== */
.booking-card-hero {
    background: linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.92) 100%);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.1) inset;
    padding: 2rem;
    border-radius: 1.5rem;
    position: relative;
    overflow: hidden;
}

.booking-card-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #fbbf24, #f97316, #ef4444);
    opacity: 0.8;
}

/* ===== BOTONES HERO ===== */
.btn-hero {
    background: linear-gradient(90deg, #fbbf24, #f97316);
    color: #000;
    padding: 1rem;
    border-radius: 0.85rem;
    font-weight: 800;
    font-size: 1rem;
    box-shadow: 0 10px 30px rgba(251,191,36,0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    cursor: pointer;
}

.btn-hero:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 15px 40px rgba(251,191,36,0.4);
}

.btn-hero-action {
    background: linear-gradient(90deg, #ef4444, #dc2626);
    color: #fff;
    padding: 1rem;
    border-radius: 0.85rem;
    font-weight: 800;
    font-size: 1rem;
    box-shadow: 0 10px 30px rgba(239,68,68,0.35);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    cursor: pointer;
}

.btn-hero-action:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 15px 40px rgba(239,68,68,0.5);
}

/* ===== CONTENT CARDS (secciones de contenido) ===== */
.content-card {
    background: linear-gradient(to bottom right, #ffffff, #f9fafb);
    border: 2px solid #e5e7eb;
    border-radius: 1.5rem;
    padding: 2.5rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.06);
    transition: all 0.3s ease;
}

.content-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
    border-color: #000;
}

/* ===== DESCRIPTION CARD (sección de descripción premium) ===== */
.description-card {
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f9fafb 100%);
    border: 2px solid #e5e7eb;
    border-radius: 2rem;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.description-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #fbbf24, #f97316, #ef4444);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.description-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 80px rgba(0,0,0,0.15);
    border-color: #fbbf24;
}

.description-card:hover::before {
    opacity: 1;
}

/* Mejoras para el prose (contenido HTML) */
.description-card .prose {
    color: #374151;
    line-height: 1.8;
}

.description-card .prose h1,
.description-card .prose h2,
.description-card .prose h3 {
    color: #111827;
    font-weight: 800;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
}

.description-card .prose p {
    margin-bottom: 1.25rem;
}

.description-card .prose strong {
    color: #1f2937;
    font-weight: 700;
}

.description-card .prose ul,
.description-card .prose ol {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
}

.description-card .prose li {
    margin-bottom: 0.5rem;
    line-height: 1.7;
}

/* Animación del gradiente fade */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* ===== ITINERARY CARD (sección de itinerario premium) ===== */
.itinerary-card {
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f8fafc 100%);
    border: 2px solid #e2e8f0;
    border-radius: 2rem;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.itinerary-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4, #14b8a6);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.itinerary-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 80px rgba(59,130,246,0.15);
    border-color: #3b82f6;
}

.itinerary-card:hover::before {
    opacity: 1;
}

/* Animación de pulse para los puntos decorativos */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.6;
        transform: scale(1.2);
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ===== MODAL MOBILE ===== */
.modal-header-gradient {
    background: linear-gradient(135deg, rgba(17,24,39,0.97), rgba(31,41,55,0.95));
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

/* ===== BOTONES LEGACY (mobile) ===== */
.btn-primary {
    background: linear-gradient(90deg, #fbbf24, #f97316);
    color: #000;
    padding: 0.75rem;
    border-radius: 0.75rem;
    font-weight: 700;
    box-shadow: 0 6px 18px rgba(251,191,36,0.25);
    transition: transform 0.2s;
}

.btn-primary:hover {
    transform: scale(1.05);
}

/* ===== GLASS CARD (mobile bar) ===== */
.glass-card {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(8px) saturate(140%);
    -webkit-backdrop-filter: blur(8px) saturate(140%);
    border: 1px solid rgba(16,24,40,0.08);
    box-shadow: 0 12px 40px rgba(2,6,23,0.12);
    padding: 1.25rem;
    border-radius: 1rem;
}

@media (min-width: 1024px) {
    .glass-card { padding: 1.5rem; }
}

/* ===== INCLUDES CARD (sección de incluye premium) ===== */
.includes-card {
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f0fdf4 100%);
    border: 2px solid #d1fae5;
    border-radius: 2rem;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.includes-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #059669, #14b8a6);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.includes-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 80px rgba(16,185,129,0.15);
    border-color: #10b981;
}

.includes-card:hover::before {
    opacity: 1;
}

/* ===== COLLECTION CARD (sección de puntos de recogida premium) ===== */
.collection-card {
    background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #ede9fe 100%);
    border: 2px solid #e0e7ff;
    border-radius: 2rem;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.includes-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #059669, #14b8a6);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.includes-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 80px rgba(16,185,129,0.15);
    border-color: #10b981;
}

.includes-card:hover::before {
    opacity: 1;
}

.collection-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.collection-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 80px rgba(99,102,241,0.15);
    border-color: #6366f1;
}

.collection-card:hover::before {
    opacity: 1;
}

/* ===== BACK BUTTON FLOAT (Desktop) ===== */
.back-button-float {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 2px solid rgba(0, 0, 0, 0.08);
}

.back-button-float i {
    color: #111827;
    transition: transform 0.3s ease;
}

.back-button-float:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 1);
}

.back-button-float:hover i {
    transform: translateX(-2px);
}

.back-button-float:active {
    transform: translateY(0) scale(0.98);
}

/* Tooltip del botón */
.back-button-tooltip {
    position: absolute;
    left: 72px;
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

.group:hover .back-button-tooltip {
    opacity: 1;
    transform: translateY(-50%) translateX(4px);
}

/* ===== BACK BUTTON FLOAT (Mobile) ===== */
.back-button-float-mobile {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 2px solid rgba(0, 0, 0, 0.08);
}

.back-button-float-mobile i {
    color: #111827;
}

.back-button-float-mobile:active {
    transform: scale(0.92);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* ===== HERO BACKGROUND CROSSFADE ===== */
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
</style>

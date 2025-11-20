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
        if (total + 1 > maxCapacity && props.service.type === 'TRANSFER ') {
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

const priceService = computed(() => {
    const maxCapacity = props.service.capacidad_max
    if (props.service.type === 'TOUR') {
        return props.service.adults_price * guests.value;
    } else if (props.service.type === 'EMBARCACION') {
        return props.service.adults_price;
    }if (props.service.type === 'TRANSFER') {
        return props.service.adults_price * Math.ceil(guests.value / maxCapacity);
    }
    return props.service.adults_price * guests.value;
});


const goToCheckout = () => {
    router.get(route('check.out', props.service.slug)
    );
}
</script>

<template>

    <Head :title="`Av Colombia -  ${product.name}`" />
    <Header />
    <div class="px-4 py-36 md:py-48 md:px-56 max-w-full mx-auto pb-20 lg:pb-8">
        <!-- Breadcrumb -->
        <!-- <Breadcrumb :service="service" class="mb-4" /> -->

        <!-- Título y rating arriba de las imágenes -->
        <div class="mb-6">
            <h1 class="text-2xl md:text-3xl font-semibold text-gray-900 capitalize mb-2">
                {{ product.name }}
            </h1>
            <div class="flex flex-wrap items-center gap-4 text-sm">
                <!-- Botones de compartir y guardar -->
                <div class="flex items-center gap-3 ml-auto">
                    <button
                        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z">
                            </path>
                        </svg>
                        Compartir
                    </button>
                    <button
                        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                            </path>
                        </svg>
                        Guardar
                    </button>
                </div>
            </div>
        </div>

        <!-- Galería de imágenes -->
        <Gallery :images="product.images" class="mb-8" v-if="service.type != 'TRANSFER'" />

        <!-- Main grid: left content + right booking card -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left: contenido principal (span 2) -->
            <main class="lg:col-span-2 space-y-6">
                <!-- Información del anfitrión -->
                <div class="border-b pb-1">

                </div>
                <!-- Equipamiento (solo para embarcaciones) -->
                <Equipament :service="service" v-if="service.type == 'EMBARCACION'" class="border-b pb-6" />
                <!-- Descripción -->
                <section class="border-b pb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Descripción del servicio</h3>
                    <div class="prose max-w-none text-gray-700">
                        <transition name="expand">
                            <div v-if="showFullDescription || product.description.length <= 500" key="full"
                                v-html="product.description"></div>
                            <div v-else key="short" v-html="product.description.slice(0, 500) + '...'"></div>
                        </transition>
                        <button v-if="product.description.length > 500"
                            @click="showFullDescription = !showFullDescription"
                            class="text-gray-900 hover:underline mt-2 font-medium">
                            {{ showFullDescription ? 'Mostrar menos' : 'Mostrar más' }} ›
                        </button>
                    </div>
                </section>
                <!-- Itinerario -->
                <ItineraryView :itineraries="itineraries" :readOnly="true" />
                <ServicesMain :service="service" :features="features"></ServicesMain>

                <!-- Qué incluye -->
                <IncludesView :service="service" :features="features" v-if="service.includes != '[]'"
                    class="border-b pb-6" />
                <!-- Puntos de recogida -->
                <CollectionPoints :service="service" v-if="service.recogidas != '[]'" class="border-b pb-6" />
            </main>

            <!-- Right: tarjeta de reserva sticky -->
            <aside class="lg:col-span-1">
                <!-- Desktop version - hidden on mobile -->
                <div class="sticky top-24 hidden lg:block">
                    <div class="bg-white border rounded-2xl shadow-md p-6">
                        <div class="flex items-baseline justify-start gap-x-2">
                            <div class="text-2xl md:text-3xl font-bold text-gray-900">{{
                                USDollar.format(props.service.adults_price)
                                }}</div>
                            <div class="text-sm text-gray-600"> {{
                                props.service.type == 'TOUR' ? 'por persona' : 'por Embarcación'
                            }}
                            </div>
                        </div>
                        <form class="mt-4 space-y-3">
                            <!-- Selector de fechas con formato tipo Airbnb -->
                            <div class="flex gap-2">
                                <!-- Check-in -->
                                <div class="w-full">
                                    <label class="text-xs font-medium  text-gray-700 block mb-1">{{
                                        service.type == 'HOSPEDAJE' ? 'LLEGADA' : 'FECHA' }}</label>
                                    <button type="button"
                                        class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                        @click="op?.toggle($event)">
                                        <div v-if="service.type == 'HOSPEDAJE'"
                                            class="text-sm text-gray-900 font-medium">
                                            {{ checkIn ? new Date(checkIn).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short'
                                            }) :
                                                'Agregar fecha' }}
                                        </div>
                                        <div v-else class="text-md text-gray-900 font-medium text-center">
                                            {{ checkIn ? new Date(checkIn).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }) :
                                                'Agregar fecha' }}
                                        </div>
                                    </button>
                                </div>

                                <!-- Check-out -->
                                <div v-if="service.type == 'HOSPEDAJE'" class="w-full">
                                    <label class="text-xs font-medium text-gray-700 block mb-1">SALIDA</label>
                                    <button type="button"
                                        class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                        @click="op?.toggle($event)">
                                        <div class="text-sm text-gray-900 font-medium">
                                            {{ checkOut ? new Date(checkOut).toLocaleDateString('es-ES', {
                                                day:
                                                    'numeric', month: 'short'
                                            }) :
                                                'Agregar fecha' }}
                                        </div>
                                    </button>
                                </div>

                                <OverlayPanel ref="op" appendTo="body" class="!w-auto">

                                    <div class="p-0 h-[330px]" v-if="service.type == 'HOSPEDAJE'">
                                        <VueDatePicker v-model="dateRange" range :min-date="new Date()" inline
                                            auto-apply :teleport="false" locale="es" :format="'dd/MM/yyyy'"
                                            :preview-format="'dd/MM/yyyy'" placeholder="Selecciona fechas"
                                            @update:model-value="handleCalendarChange" />
                                    </div>
                                    <div v-else class="p-0 h-[330px] ">
                                        <VueDatePicker v-model="dateSingle" :min-date="new Date()" inline auto-apply
                                            :teleport="false" locale="es" :format="'dd/MM/yyyy'"
                                            :preview-format="'dd/MM/yyyy'" placeholder="Selecciona fechas"
                                            @update:model-value="handleCalendarChange" />
                                    </div>
                                </OverlayPanel>
                            </div>

                            <!-- Selector de huéspedes -->
                            <div>
                                <label class="text-xs font-medium text-gray-700 block mb-1">VIAJEROS</label>
                                <button type="button"
                                    class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    @click="guestsOp?.toggle($event)">
                                    <div class="text-sm text-gray-900 font-medium">
                                        {{ guests }} viajero{{ guests > 1 ? 's' : '' }}
                                    </div>
                                </button>

                                <OverlayPanel ref="guestsOp" appendTo="body" class="!w-auto">
                                    <div class="p-4 min-w-[300px]">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">¿Quién viene?</h3>
                                        <GuestSelector
                                            :guests="searchStore.guests.value || { adults: 1, children: 0, infants: 0 }"
                                            @increment="incrementGuests" @decrement="decrementGuests" />
                                    </div>
                                </OverlayPanel>
                            </div>

                            <div class="pt-2 w-full">
                                <button v-if="!checkIn || !checkOut" type="button"
                                    class="w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg py-3 font-semibold transition duration-200"
                                    @click="op?.toggle($event)">
                                    Revisa las fechas
                                </button>
                                <button @click="goToCheckout" v-else type="button"
                                    class="w-full bg-black text-white rounded-lg py-3 font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Reservar
                                </button>
                            </div>
                        </form>

                        <!-- Mensaje de disponibilidad y totales -->
                        <div v-if="checkIn && checkOut" class="mt-4">
                            <div class="border-t pt-3">
                                <div class="flex items-center justify-between text-sm text-gray-600">
                                    <div>{{ USDollar.format(props.service.adults_price) }} x {{ guests }} huésped{{
                                        guests > 1 ? 'es' : ''
                                        }}</div>
                                    <div class="font-medium text-gray-900">{{ USDollar.format(priceService) }}</div>
                                </div>
                                <!-- <div class="flex items-center justify-between text-sm text-gray-600 mt-1">
                  <div>Tarifa de servicio</div>
                  <div class="font-medium text-gray-900">{{ USDollar.format(props.service.adults_price * guests * 0.1) }}</div>
                </div> -->
                                <div
                                    class="flex items-center justify-between text-base font-semibold text-gray-900 mt-3 pt-3 border-t">
                                    <div>Total</div>
                                    <div>{{ USDollar.format(priceService) }}</div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="mt-4 border-t pt-3">
                            <div class="text-center text-gray-500 py-4">
                                <p class="text-sm">Selecciona las fechas para ver el precio total</p>
                            </div>
                        </div>

                        <p class="mt-3 text-xs text-gray-500">Política flexible · Cancelación gratuita hasta 24 horas
                            antes</p>
                    </div>

                </div>

            </aside>
        </div>

        <!-- Mobile sticky bottom bar -->
        <div
            class="lg:hidden fixed rounded-2xl bottom-2 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 mx-4">
            <div class="px-4 py-3">
                <div class="flex items-center justify-between" @click="showMobileBooking = true">
                    <div class="flex-1">
                        <div class="text-lg font-bold text-gray-900">{{ USDollar.format(props.service.adults_price) }}
                        </div>
                        <div class="text-sm text-gray-600">{{
                            props.service.type == 'TOUR' ? 'por persona' : 'por Embarcación'
                            }}
                        </div>
                    </div>
                    <button
                        class="bg-[#FF385C] hover:bg-[#E31C5F] text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
                        Reservar
                    </button>
                </div>
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
                    <div
                        class="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between rounded-t-2xl">
                        <h2 class="text-lg font-semibold text-gray-900">Reservar experiencia</h2>
                        <button @click="showMobileBooking = false"
                            class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
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
    </div>
</template>
<style scoped>
/* ...existing code... */

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

.mobile-modal-enter-to .mobile-booking-content,
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
</style>

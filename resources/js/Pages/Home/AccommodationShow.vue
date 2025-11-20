<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { computed, ref, watch, onMounted } from "vue";
import axios from 'axios';
import searchStore from '@/store/searchStore.js';
import OverlayPanel from 'primevue/overlaypanel';
import Header from "@/Components/Sections/Header.vue";
import { Head, router } from "@inertiajs/vue3";
import Swal from "sweetalert2";

const props = defineProps({
    accommodation: Object,
});

const showFullDescription = ref(false);
const dateRange = ref(null);
const guests = ref(2);
const op = ref(null);
const guestsOp = ref(null);
const showMobileBooking = ref(false);
const selectedRoom = ref(null);
const availabilityLoading = ref(false);
const availableRoomIds = ref([]);
const availabilityError = ref(null);

const isSelectedRoomAvailable = computed(() => {
    if (!selectedRoom.value) return false;
    if (!checkIn.value || !checkOut.value) return false;
    if (availabilityLoading.value) return true; // optimistic while loading
    return availableRoomIds.value.includes(selectedRoom.value.id);
});

// Formatear fecha
function formatYMD(d) {
    if (!d) return null;
    return d.toISOString();
}

function handleCalendarChange(val) {
    try {
        if (!val) {
            dateRange.value = null;
            searchStore.checkin.value = '';
            searchStore.checkout.value = '';
            return;
        }

        if (Array.isArray(val)) {
            const [startDate, endDate] = val;
            dateRange.value = val;
            searchStore.checkin.value = startDate ? formatYMD(startDate) : '';
            searchStore.checkout.value = endDate ? formatYMD(endDate) : '';

            if (startDate && endDate) {
                setTimeout(() => {
                    try { op.value?.hide(); } catch (e) { }
                }, 500);
            }
        }
    } catch (e) {
        console.error('Error handling calendar change:', e);
    }
}

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

// Cuando cambian fechas o huéspedes, validar disponibilidad via API
watch([checkIn, checkOut, guests], async ([nci, nco, ng]) => {
    // Solo validar si hay fechas completas
    if (!nci || !nco) {
        availableRoomIds.value = [];
        availabilityError.value = null;
        return;
    }

    availabilityLoading.value = true;
    availabilityError.value = null;
    try {
        const params = {
            check_in: nci,
            check_out: nco,
            guests: ng || 1,
        };

        const url = route('api.accommodations.availability', props.accommodation.id);
        const { data } = await axios.get(url, { params });
        const rooms = data.available_rooms || [];
        availableRoomIds.value = rooms.map(r => r.id);

        // If selectedRoom is no longer available, unset it
        if (selectedRoom.value && !availableRoomIds.value.includes(selectedRoom.value.id)) {
            selectedRoom.value = null;
        }
    } catch (e) {
        console.error('Error checking availability', e);
        availabilityError.value = e.response?.data?.message || 'Error al verificar disponibilidad';
        availableRoomIds.value = [];
    } finally {
        availabilityLoading.value = false;
    }
});

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
        }

        const gObj = searchStore.guests?.value;
        if (gObj) {
            const total = (Number(gObj.adults || 0) + Number(gObj.children || 0)) || 2;
            guests.value = total;
        }
    } catch (e) {
        console.error('Error mounting component:', e);
    }
});

watch([() => searchStore.checkin.value, () => searchStore.checkout.value], ([nci, nco]) => {
    try {
        if (nci && nco) {
            const a = new Date(nci);
            const b = new Date(nco);
            if (!isNaN(a) && !isNaN(b)) {
                const currentStart = dateRange.value?.[0];
                const currentEnd = dateRange.value?.[1];
                if (!currentStart || !currentEnd ||
                    formatYMD(currentStart) !== nci ||
                    formatYMD(currentEnd) !== nco) {
                    dateRange.value = [a, b];
                }
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
    const total = (Number(ng.adults || 0) + Number(ng.children || 0)) || 2;
    guests.value = total;
}, { deep: true });

watch(guests, (n) => {
    const current = searchStore.guests.value || { adults: 2, children: 0, infants: 0 };
    const newAdults = Math.max(1, Number(n) - Number(current.children || 0));
    searchStore.guests.value = { ...current, adults: newAdults };
});

function incrementGuests(type) {
    const current = searchStore.guests.value || { adults: 2, children: 0, infants: 0 };
    const updated = { ...current };
    updated[type] = Math.max(0, (updated[type] || 0) + 1);
    searchStore.guests.value = updated;

    const total = updated.adults + updated.children + updated.infants;
    guests.value = total || 2;
}

function decrementGuests(type) {
    const current = searchStore.guests.value || { adults: 2, children: 0, infants: 0 };
    const updated = { ...current };

    if (type === 'adults') {
        updated[type] = Math.max(1, (updated[type] || 1) - 1);
    } else {
        updated[type] = Math.max(0, (updated[type] || 0) - 1);
    }

    searchStore.guests.value = updated;
    const total = updated.adults + updated.children + updated.infants;
    guests.value = total || 2;
}

const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const mainPhoto = computed(() => {
    if (props.accommodation.photos && props.accommodation.photos.length > 0) {
        const path = props.accommodation.photos[0].path;
        return path.startsWith('http') ? path : `/storage/${path.replace('public/', '')}`;
    }
    return 'https://avcolombia.net/images/logo.webp';
});

const galleryPhotos = computed(() => {
    if (!props.accommodation.photos || props.accommodation.photos.length === 0) {
        return [];
    }
    return props.accommodation.photos.map(photo => {
        const path = photo.path;
        return path.startsWith('http') ? path : `/storage/${path.replace('public/', '')}`;
    });
});

const activeIndex = ref(0);
const displayGallery = ref(false);

const openGallery = (index) => {
    activeIndex.value = index;
    displayGallery.value = true;
};

const availableRooms = computed(() => {
    return props.accommodation.rooms?.filter(room => room.is_available) || [];
});

const nights = computed(() => {
    if (!checkIn.value || !checkOut.value) return 0;
    const start = new Date(checkIn.value);
    const end = new Date(checkOut.value);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
});

const totalPrice = computed(() => {
    if (!selectedRoom.value || nights.value === 0) return 0;
    return selectedRoom.value.price_per_night * nights.value;
});

const goToCheckout = () => {
    if (!selectedRoom.value) {
        Swal.fire({
            title: "Habitación Requerida",
            text: "Por favor selecciona una habitación",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Entendido",
        });
        return;
    }
    if (!checkIn.value || !checkOut.value) {
        Swal.fire({
            title: "Fechas Requeridas",
            text: "Por favor selecciona las fechas de check-in y check-out",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Entendido",
        });
        return;
    }
    
    // Redirigir al checkout con parámetros
    const url = route('accommodations.checkout', {
        accommodation: props.accommodation.id,
        room: selectedRoom.value.id
    });
    
    const params = new URLSearchParams({
        check_in: checkIn.value,
        check_out: checkOut.value,
        guests: guests.value
    });
    
    window.location.href = `${url}?${params.toString()}`;
};
</script>

<template>
    <Head :title="`Av Colombia - ${accommodation.name}`" />
    <Header />
    <div class="px-4 py-36 md:py-48 md:px-56 max-w-full mx-auto pb-20 lg:pb-8">
        <!-- Título y ubicación -->
        <div class="mb-6">
            <h1 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                {{ accommodation.name }}
            </h1>
            <div class="flex flex-wrap items-center gap-4 text-sm">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-location-dot text-gray-600"></i>
                    <span class="text-gray-600">{{ accommodation.city }}, {{ accommodation.country }}</span>
                </div>
                <div v-if="accommodation.star_rating" class="flex items-center gap-1">
                    <i v-for="n in accommodation.star_rating" :key="n" class="fa-solid fa-star text-yellow-400"></i>
                </div>
                <div v-if="accommodation.average_rating > 0" class="flex items-center gap-2">
                    <i class="fa-solid fa-heart text-red-400"></i>
                    <span class="font-medium">{{ accommodation.average_rating }}</span>
                    <span class="text-gray-600">({{ accommodation.reviews?.length || 0 }} reseñas)</span>
                </div>

                <!-- Botones de compartir y guardar -->
                <div class="flex items-center gap-3 ml-auto">
                    <button
                        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border">
                        <i class="fa-solid fa-share-nodes"></i>
                        Compartir
                    </button>
                    <button
                        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border">
                        <i class="fa-regular fa-heart"></i>
                        Guardar
                    </button>
                </div>
            </div>
        </div>

        <!-- Galería de imágenes -->
        <div v-if="galleryPhotos.length > 0" class="relative">
            <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayGallery" :value="galleryPhotos"
                :numVisible="7" containerStyle="max-width: 100%" :circular="true" :fullScreen="true"
                :showItemNavigators="true" :showThumbnails="false">
                <template #item="slotProps">
                    <img :src="slotProps.item" :alt="accommodation.name" style="width: 100%; display: block" />
                </template>
            </Galleria>

            <div class="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-8 h-[400px] cursor-pointer">
                <div class="col-span-2 row-span-2" @click="openGallery(0)">
                    <img :src="mainPhoto" :alt="accommodation.name"
                        class="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                </div>
                <div v-for="(photo, index) in galleryPhotos.slice(1, 5)" :key="index" @click="openGallery(index + 1)">
                    <img :src="photo" :alt="`${accommodation.name} - ${index + 2}`"
                        class="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                </div>
                <button v-if="galleryPhotos.length > 5"
                    class="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium"
                    @click="openGallery(5)">
                    <i class="fa-solid fa-images mr-2"></i>
                    Mostrar todas las fotos
                </button>
            </div>
        </div>
        <div v-else class="w-full h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center mb-8">
            <div class="text-center text-gray-500">
                <i class="fa-solid fa-image text-6xl mb-4"></i>
                <p>No hay fotos disponibles</p>
            </div>
        </div>

        <!-- Main grid: left content + right booking card -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left: contenido principal -->
            <main class="lg:col-span-2 space-y-6">
                <!-- Información del alojamiento -->
                <div class="border-b pb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2">
                        {{ accommodation.type }} · {{ accommodation.city }}
                    </h2>
                    <div class="flex items-center gap-4 text-gray-600">
                        <span>{{ accommodation.rooms?.length || 0 }} habitaciones</span>
                    </div>
                </div>

                <!-- Descripción -->
                <section class="border-b pb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Acerca de este lugar</h3>
                    <div class="prose max-w-none text-gray-700">
                        <transition name="expand">
                            <div v-if="showFullDescription || accommodation.description?.length <= 500" key="full">
                                {{ accommodation.description }}
                            </div>
                            <div v-else key="short">
                                {{ accommodation.description?.slice(0, 500) }}...
                            </div>
                        </transition>
                        <button v-if="accommodation.description?.length > 500"
                            @click="showFullDescription = !showFullDescription"
                            class="text-gray-900 hover:underline mt-2 font-medium">
                            {{ showFullDescription ? 'Mostrar menos' : 'Mostrar más' }} ›
                        </button>
                    </div>
                </section>

                <!-- Amenidades -->
                <section class="border-b pb-6" v-if="accommodation.amenities?.length">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Lo que ofrece este lugar</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div v-for="amenity in accommodation.amenities" :key="amenity.id"
                            class="flex items-center gap-3">
                            <i class="fa-solid fa-check text-teal-500"></i>
                            <span class="text-gray-700">{{ amenity.name }}</span>
                        </div>
                    </div>
                </section>

                <!-- Habitaciones disponibles -->
                <section class="border-b pb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Habitaciones disponibles</h3>
                    <div class="flex items-center gap-3 mb-3">
                        <div v-if="availabilityLoading" class="text-sm text-gray-600">Comprobando disponibilidad...</div>
                        <div v-else class="text-sm text-gray-600">Disponibles: {{ availableRoomIds.length }} / {{ accommodation.rooms?.length || 0 }}</div>
                        <div v-if="availabilityError" class="text-sm text-red-600">{{ availabilityError }}</div>
                    </div>
                        <div class="space-y-4">
                        <div v-for="room in props.accommodation.rooms" :key="room.id"
                            class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer relative"
                            :class="{
                                'ring-2 ring-indigo-500': selectedRoom?.id === room.id,
                                'opacity-50 cursor-not-allowed': !availableRoomIds.includes(room.id)
                            }"
                            @click="() => { if (availableRoomIds.includes(room.id)) selectedRoom = room }">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-900">{{ room.name }}</h4>
                                    <p class="text-sm text-gray-600 mt-1">{{ room.description }}</p>
                                    <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <span><i class="fa-solid fa-user"></i> {{ room.capacity_adults }} adultos</span>
                                        <span v-if="room.capacity_children > 0"><i class="fa-solid fa-child"></i> {{
                                            room.capacity_children }} niños</span>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xl font-bold text-gray-900">
                                        {{ USDollar.format(room.price_per_night) }}
                                    </div>
                                    <div class="text-sm text-gray-600">por noche</div>
                                </div>
                            </div>
                            <div v-if="!availableRoomIds.includes(room.id)" class="absolute inset-0 bg-white/60 flex items-center justify-center rounded-lg pointer-events-none">
                                <div class="text-sm text-red-600 font-medium">No disponible en las fechas seleccionadas</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Ubicación -->
                <section class="border-b pb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Ubicación</h3>
                    <div class="text-gray-700">
                        <p>{{ accommodation.address_line_1 }}</p>
                        <p>{{ accommodation.city }}, {{ accommodation.state }} {{ accommodation.postal_code }}</p>
                        <p>{{ accommodation.country }}</p>
                    </div>
                </section>
            </main>

            <!-- Right: tarjeta de reserva sticky -->
            <aside class="lg:col-span-1">
                <div class="sticky top-24 hidden lg:block">
                    <div class="bg-white border rounded-2xl shadow-md p-6">
                        <div class="flex items-baseline justify-start gap-x-2 mb-4">
                            <div class="text-2xl md:text-3xl font-bold text-gray-900">
                                {{ USDollar.format(accommodation.min_price || 0) }}
                            </div>
                            <div class="text-sm text-gray-600">por noche</div>
                        </div>

                        <form class="space-y-3">
                            <!-- Selector de fechas -->
                            <div class="flex gap-2">
                                <div class="w-full">
                                    <label class="text-xs font-medium text-gray-700 block mb-1">LLEGADA</label>
                                    <button type="button"
                                        class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                        @click="op?.toggle($event)">
                                        <div class="text-sm text-gray-900 font-medium">
                                            {{ checkIn ? new Date(checkIn).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short'
                                            }) : 'Agregar fecha' }}
                                        </div>
                                    </button>
                                </div>

                                <div class="w-full">
                                    <label class="text-xs font-medium text-gray-700 block mb-1">SALIDA</label>
                                    <button type="button"
                                        class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                        @click="op?.toggle($event)">
                                        <div class="text-sm text-gray-900 font-medium">
                                            {{ checkOut ? new Date(checkOut).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short'
                                            }) : 'Agregar fecha' }}
                                        </div>
                                    </button>
                                </div>

                                <OverlayPanel ref="op" appendTo="body" class="!w-auto">
                                    <div class="p-0 h-[330px]">
                                        <VueDatePicker v-model="dateRange" range :min-date="new Date()" inline auto-apply
                                            :teleport="false" locale="es" :format="'dd/MM/yyyy'"
                                            :preview-format="'dd/MM/yyyy'" placeholder="Selecciona fechas"
                                            @update:model-value="handleCalendarChange" />
                                    </div>
                                </OverlayPanel>
                            </div>

                            <!-- Selector de huéspedes -->
                            <div>
                                <label class="text-xs font-medium text-gray-700 block mb-1">HUÉSPEDES</label>
                                <button type="button"
                                    class="w-full text-left border border-gray-300 rounded-lg px-3 py-3 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    @click="guestsOp?.toggle($event)">
                                    <div class="text-sm text-gray-900 font-medium">
                                        {{ guests }} huésped{{ guests > 1 ? 'es' : '' }}
                                    </div>
                                </button>

                                <OverlayPanel ref="guestsOp" appendTo="body" class="!w-auto">
                                    <div class="p-4 min-w-[300px]">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">¿Cuántos huéspedes?</h3>
                                        <div class="space-y-4">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <div class="font-medium text-gray-900">Adultos</div>
                                                    <div class="text-sm text-gray-500">13 años o más</div>
                                                </div>
                                                <div class="flex items-center gap-3">
                                                    <button type="button" @click="decrementGuests('adults')"
                                                        class="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center">
                                                        <i class="fa-solid fa-minus text-xs"></i>
                                                    </button>
                                                    <span class="w-8 text-center">{{ searchStore.guests.value?.adults ||
                                                        1 }}</span>
                                                    <button type="button" @click="incrementGuests('adults')"
                                                        class="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center">
                                                        <i class="fa-solid fa-plus text-xs"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <div class="font-medium text-gray-900">Niños</div>
                                                    <div class="text-sm text-gray-500">2-12 años</div>
                                                </div>
                                                <div class="flex items-center gap-3">
                                                    <button type="button" @click="decrementGuests('children')"
                                                        class="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center">
                                                        <i class="fa-solid fa-minus text-xs"></i>
                                                    </button>
                                                    <span class="w-8 text-center">{{ searchStore.guests.value?.children
                                                        || 0 }}</span>
                                                    <button type="button" @click="incrementGuests('children')"
                                                        class="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center">
                                                        <i class="fa-solid fa-plus text-xs"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>

                            <div class="pt-2 w-full">
                                <button v-if="!checkIn || !checkOut || !selectedRoom" type="button"
                                    class="w-full bg-gray-400 text-white rounded-lg py-3 font-semibold cursor-not-allowed"
                                    disabled>
                                    {{ !selectedRoom ? 'Selecciona una habitación' : 'Selecciona fechas' }}
                                </button>
                                <button v-else-if="selectedRoom && !isSelectedRoomAvailable" type="button"
                                    class="w-full bg-gray-400 text-white rounded-lg py-3 font-semibold cursor-not-allowed"
                                    disabled>
                                    Habitación no disponible
                                </button>
                                <button v-else @click="goToCheckout" type="button"
                                    class="w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg py-3 font-semibold transition duration-200">
                                    Reservar
                                </button>
                            </div>
                        </form>

                        <!-- Totales -->
                        <div v-if="checkIn && checkOut && selectedRoom" class="mt-4">
                            <div class="border-t pt-3">
                                <div class="flex items-center justify-between text-sm text-gray-600">
                                    <div>{{ USDollar.format(selectedRoom.price_per_night) }} x {{ nights }} noche{{ nights
                                        > 1 ? 's' : '' }}</div>
                                    <div class="font-medium text-gray-900">{{ USDollar.format(totalPrice) }}</div>
                                </div>
                                <div
                                    class="flex items-center justify-between text-base font-semibold text-gray-900 mt-3 pt-3 border-t">
                                    <div>Total</div>
                                    <div>{{ USDollar.format(totalPrice) }}</div>
                                </div>
                            </div>
                        </div>

                        <p class="mt-3 text-xs text-gray-500">Cancelación gratuita hasta 48 horas antes del check-in</p>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<style scoped>
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
</style>

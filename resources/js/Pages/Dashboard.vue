<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';
import axios from 'axios';
import { ref } from 'vue';

const services = ref([]);
const totalToPay = ref(0);

const COP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

const getServices = () => {
    axios.get(route('dashboard.services.no.pay')).then(response => {
        services.value = response.data.bookings;
        totalToPay.value = response.data.bookings?.reduce((acc, item) => acc + item.total_price, 0) ?? 0;
    });
}
getServices();

</script>

<template>
    <AppLayout title="Dashboard">
        <div class="py-4">
            <div class="w-full mx-auto sm:px-6 lg:px-8 space-y-4">
                <div class="bg-white overflow-hidden  sm:rounded-lg flex justify-between items-center px-8">
                    <h1>
                        Hola <strong class="uppercase">
                            {{ $page.props.auth.user.name }}
                        </strong>, Bienvenido a tu panel de control
                    </h1>
                    <Link :href="route('portafolio')">
                    <Button label="Ver Portafolio" />
                    </Link>
                </div>
                <div class=" p-4 rounded-lg grid grid-cols-2 gap-4">
                    <div class="shadow-md rounded-md p-4 text-center">
                        <h2 class="text-xl font-bold">{{ services?.length ?? 0 }}</h2>
                        <h3> Reservas Pendinetes de Pago por total de {{ COP.format(totalToPay) }}</h3>
                    </div>
                    <div class="shadow-md rounded-md p-4 text-center ">
                        <h2>Tu Rol es</h2>
                        <h3 class="text-xl font-bold" v-if="$page.props.auth.user.name != 'Brian'">
                            Vendedor
                        </h3>
                        <h3 class="text-xl font-bold" v-else>
                            Administrador
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

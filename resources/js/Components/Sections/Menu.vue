<template>

    <nav class="hs-accordion-group px-2 w-full flex flex-col flex-wrap justify-between h-full"
        data-hs-accordion-always-open>
        <div>
            <div class="p-1 flex flex-col w-full items-center">
                <img src="/images/logo.webp" class="size-28 shadow-lg rounded-full p-4" alt="">
                <!-- <a class="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">AV COLOMBIA</a> -->
            </div>
            <ul class="space-y-1.5 mt-4">
                <li>
                    <Link
                        class="flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                        :href="route('dashboard')"
                        :class="route().current() == 'dashboard' ? 'bg-black text-white' : 'hover:bg-gray-100'">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg  dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                        :href="route('services.index')"
                        :class="route().current() == 'services.index' ? 'bg-black text-white' : 'hover:bg-gray-100'">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Servicios
                    </Link>
                </li>
                <li>
                    <Link
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg  dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                        :href="route('BookingServices.index')"
                        :class="route().current() == 'BookingServices.index' ? 'bg-black text-white' : 'hover:bg-gray-100'">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Reservas Experienicias
                    </Link>
                </li>
                <li v-if="$page.props.auth.user.rol == 'admin'">
                    <Link
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg  dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                        :href="route('payments.index')"
                        :class="route().current() == 'payments.index' ? 'bg-black text-white' : 'hover:bg-gray-100'">
                    <i class="fa-regular fa-money-bill-1"></i>
                    Pagos
                    </Link>
                </li>
                <li v-if="$page.props.auth.user.rol == 'admin'">
                    <Link
                        class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg  dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                        :href="route('users.index')"
                        :class="route().current() == 'users.index' ? 'bg-black text-white' : 'hover:bg-gray-100'">
                    <i class="fa-regular fa-user"></i>
                    Usuarios
                    </Link>
                </li>

            </ul>
        </div>


        <div class="flex flex-col gap-y-4">
            <ul class="space-y-1.5 mt-4">
                <li>
                    <Link
                        class="flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                        :href="route('settings')"
                        :class="route().current() == 'settings' ? 'bg-black text-white' : 'hover:bg-gray-100'">
                    <i class="fa-solid fa-gears"></i>
                    Configuración
                    </Link>
                </li>
            </ul>

            <div class="flex w-full justify-between p-2">
                <div class="text-xs flex flex-col text-left justify-end">
                    <h2 class="font-bold text-sm truncate text-nowrap w-52">{{ $page.props.auth.user.name }}</h2>
                    <h3 class="text-xs italic text-gray-600 w-52 text-nowrap truncate">
                        {{
                            $page.props.auth.user.name == 'Brian' ? 'Administrador AV Colombia' : 'Hotel'
                        }}
                    </h3>
                </div>

                <Link class="" :href="route('logout')" method="post" v-tooltip.top="'Cerrar sesión'" as="button">
                <svg class="text-gray-500 w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 512 512" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                </svg>
                </Link>
            </div>
        </div>

    </nav>

</template>
<script setup>
import { Link } from '@inertiajs/vue3';
</script>
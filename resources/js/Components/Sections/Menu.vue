<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between px-2 pt-4 shrink-0">
      <span class="inline-flex items-center gap-2">
        <img src="/images/logo.webp" class="size-14" alt="" />
        <span class="font-semibold text-2xl text-primary">AV Colombia</span>
      </span>
      <span class="flex lg:hidden">
        <Button type="button" icon="pi pi-times" rounded outlined></Button>
      </span>
    </div>
    <div class="overflow-y-auto">
      <ul class="list-none p-2 m-0">
        <li>
          <div
            v-ripple
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-slidedown',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-slideup',
            }"
            class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
          >
            <span class="font-medium">FAVORITES</span>
            <i class="pi pi-chevron-down"></i>
          </div>
          <ul class="list-none p-0 m-0 overflow-hidden">
            <li>
              <Link
                :href="route('dashboard')"
                v-ripple
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                v-show="hasPermissionTo('ver servicios')"
                :href="route('services.index')"
                v-ripple
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <svg
                  class="size-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span class="font-medium">Servicios</span>
              </Link>
            </li>
            <li>
              <a
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-calendar mr-2"></i>
                <span class="font-medium">Reservas</span>
                <i class="pi pi-chevron-down ml-auto"></i>
              </a>
              <ul
                class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
              >
                <li>
                  <Link
                    v-if="hasPermissionTo('ver experiencas')"
                    :href="route('BookingServices.index')"
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="fa-solid fa-person-hiking mr-2"></i>
                    <span class="font-medium">Experiencias</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <a
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-dollar mr-2"></i>
                <span class="font-medium">Contabilidad</span>
                <i class="pi pi-chevron-down ml-auto"></i>
              </a>
              <ul
                class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
              >
                <li>
                  <Link
                    v-if="hasPermissionTo('ver pagos')"
                    :href="route('contabilidad')"
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="fa-solid fa-gauge mr-2"></i>
                    <span class="font-medium">Informe</span>
                  </Link>
                  <Link
                    v-if="hasPermissionTo('ver pagos')"
                    :href="route('pagos')"
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="fa-solid fa-money-bill-transfer text-green-500 mr-2"></i>
                    <span class="font-medium">Pagos</span>
                  </Link>
                  <Link
                    v-if="hasPermissionTo('ver entradas')"
                    :href="route('BookingServices.index')"
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="fa-solid fa-person-hiking mr-2"></i>
                    <span class="font-medium">Entradas</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                v-if="hasPermissionTo('ver proveedores')"
                :href="route('proveedors.index')"
                v-ripple
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-truck mr-2"></i>
                <span class="font-pago">Proveedores</span>
              </Link>
            </li>
            <li>
              <Link
                v-if="hasPermissionTo('ver usuarios')"
                :href="route('settings')"
                v-ripple
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-cog mr-2"></i>
                <span class="font-medium">Ajustes</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="mt-auto">
      <hr class="border-t border-0 border-surface-200 dark:border-surface-700" />
      <div class="flex items-center">
        <a
          v-ripple
          class="w-full flex items-center cursor-pointer p-2 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple truncate"
        >
          <span class="font-bold">{{ $page.props.auth.user.name }}</span>
        </a>
        <div
          class="w-full py-2 border-l-2 flex justify-center items-center cursor-pointer hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple gap-x-4 text-red-500"
        >
          <Link :href="route('logout')" method="post" class="flex items-center gap-x-4">
            <p>Salir</p>
            <i class="pi pi-sign-out"></i>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Link } from "@inertiajs/vue3";
import { usePermissions } from "@/composable/Auth";

const { hasPermissionTo } = usePermissions();
</script>

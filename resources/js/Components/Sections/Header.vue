<template>
  <header class="bg-white block">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="text-lg font-bold ">Portafolio</span>
          <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> -->
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <Link v-for="item in navigation" :key="item.name" :href="route(item.href)"
          class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</Link>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link :href="route('login')" class="text-sm font-semibold leading-6 text-gray-900">Log in <span
          aria-hidden="true">&rarr;</span></Link>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{
                  item.name }}</a>
            </div>
            <div class="py-6">
              <Link :href="route('login')"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Log in</Link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>

  <div class="fixed md:hidden z-50 bottom-0 bg-white w-full py-2 ">
   <div class="flex justify-between text-center px-2 ">
    <div class="flex flex-col font-extrabold w-full">
      <i class="fa-solid fa-street-view text-md"></i>
      <h1 class="text-xs">Experiencias</h1>
      <div class="border-b-2 border-black rounded-full mx-4" />
    </div>
    <div class="flex flex-col font-extrabold w-full">
      <i class="fa-solid fa-building text-md"></i>
      <h1 class="text-xs">Alojamientos</h1>
      <div class="border-b-2 border-black rounded-full mx-4 hidden" />
    </div>
    <div class="flex flex-col font-extrabold w-full">
      <i class="fa-solid fa-car"></i>
      <h1 class="text-xs">Alojamientos</h1>
    </div>
    <div class="flex flex-col font-extrabold w-full">
      <i class="fa-solid fa-ship text-md"></i>
      <h1 class="text-xs">Embarcaciones</h1>
      <div class="border-b-2 border-black rounded-full mx-4 hidden" />
    </div>
   </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Link } from '@inertiajs/vue3';

const navigation = [
  { name: 'Inicio', href: 'welcome' },
  { name: 'Sobre Nosotros', href: 'welcome' },
  { name: 'Contacto', href: 'welcome' },
  { name: 'Mi Reserva', href: 'welcome' },
]

const mobileMenuOpen = ref(false)
</script>
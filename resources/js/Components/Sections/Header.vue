<template>
  <header class="bg-transparent w-full z-30" :class="{ 'scrolled': isScrolled }">
    <nav class="flex items-center justify-between p-2 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1 w-1/5 justify-start items-center">
        <Logo width="80" height="30"></Logo>
        <h1 class="text-sm md:text-lg font-bold">AV Colombia
        </h1>
      </div>

      <div class="hidden lg:flex lg:gap-x-12 w-3/5 items-center justify-center" v-if="!isScrolled">
        <Link v-for="item in navigation" :key="item.name" :href="route(item.href)"
          class="text-sm font-semibold leading-6 text-gray-900 w-full">{{ item.name }}</Link>
      </div>
      <input v-model="search" v-else type="search" placeholder="Busqueda Rapida" class="rounded-md w-3/5">

      <div class="flex lg:hidden w-1/5 justify-end">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
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


</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Link } from '@inertiajs/vue3';
import Logo from '../logo.vue';

const navigation = [
  { name: 'Inicio', href: 'welcome' },
  { name: 'Sobre Nosotros', href: 'welcome' },
  { name: 'Contacto', href: 'welcome' },
  { name: 'Mi Reserva', href: 'welcome' },
]


const search = ref('')

const isScrolled = ref(false);

const mobileMenuOpen = ref(false)

const handleScroll = () => {
  console.log(window.scrollY);
  if (window.scrollY > 300) {
    isScrolled.value = true; // Si se ha hecho scroll más de 50px, cambiamos el estado
  } else {
    isScrolled.value = false; // Si no, lo dejamos en el estado inicial
  }
};


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Limpiar el evento cuando el componente se destruya
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});


</script>

<style scoped>
/* Estilo por defecto del header */
header {
  padding: 15px;
  position: fixed;
  width: 100%;
  top: 0;
  transition: background-color 0.3s ease;
}

.scrolled {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.384);
}

/* Contenido principal */
.content {
  padding-top: 80px;
  /* Asegurarse de que el header no cubra el contenido */
}
</style>
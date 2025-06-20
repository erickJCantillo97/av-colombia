<template>
  <header class="bg-transparent  z-30" :class="{ scrolled: isScrolled }">
    <nav class="flex items-center justify-between p-2 lg:px-8 " aria-label="Global">
      <div class="flex  w-1/5 ">
      <Link href="/" >
          <Logo width="120" height="60"></Logo>
        </Link>
      </div>
      <div class="rounded-md w-3/5">
        <Experiencias   />
      </div>
      <div class="flex lg:hidden w-full justify-end">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex w-1/5 justify-end">
        <Link :href="route('login')" class="text-md flex font-semibold leading-6 text-gray-900 w-full justify-end"
          >Log in <span aria-hidden="true">&rarr;</span></Link
        >
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >{{ item.name }}</a
              >
            </div>
            <div class="py-6">
              <Link
                :href="route('login')"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log in</Link
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import Experiencias from "@/Components/SearchEngines/Search.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { Link } from "@inertiajs/vue3";
import Logo from "../logo.vue";

const navigation = [
  { name: "Inicio", href: "welcome" },
  { name: "Sobre Nosotros", href: "welcome" },
  { name: "Contacto", href: "welcome" },
  { name: "Mi Reserva", href: "welcome" },
];

const search = ref("");

const isScrolled = ref(false);

const mobileMenuOpen = ref(false);

const handleScroll = () => {
  if (window.scrollY > 300) {
    isScrolled.value = true; // Si se ha hecho scroll más de 50px, cambiamos el estado
  } else {
    isScrolled.value = false; // Si no, lo dejamos en el estado inicial
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Limpiar el evento cuando el componente se destruya
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
header {
  padding: 30px;
  position: fixed;
  width: 100%;
  top: 0;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s,
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 30;
  transform: translateY(-20px); /* Por defecto, un poco arriba */
}

.scrolled {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.384);
  padding: 0px;
  transform: translateY(0); /* Cuando scrolled, baja a su lugar */
}

@media (max-width: 1024px) {
  .scrolled {
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
}

/* Contenido principal */

</style>

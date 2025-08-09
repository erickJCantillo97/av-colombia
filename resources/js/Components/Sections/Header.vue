<template>
  <header class="bg-transparent z-30" :class="{ scrolled: isScrolled }">
    <nav class="flex items-center justify-between p-0 lg:px-8 " aria-label="Global">
      <div class="hidden md:flex  w-1/5 ">
      <Link href="/" >
          <Logo width="60" height="60"></Logo>
        </Link>
      </div>
      <div class="rounded-md w-full">
        <Experiencias   />
      </div>
      <Link class="rounded-md w-1/5 flex justify-center" :href="route('login')">
        <div class="flex items-center gap-x-3 justify-center h-full bg-white/90 rounded-md px-2 py-1">
          <i class="fa-solid fa-right-to-bracket"></i>
          <span class="text-lg font-bold  text-gray-800">Entrar</span>
        </div>
      </Link>
    </nav>
  </header>
</template>

<script setup>
import Experiencias from "@/Components/SearchEngines/Search.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
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
  padding: 30px 0;
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

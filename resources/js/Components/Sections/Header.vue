<template>
  <header class="z-50" :class="{ scrolled: isScrolled }">
    <nav class="flex items-center justify-between px-4 lg:px-8 py-4" aria-label="Global">
      <div class="flex items-center gap-8">
        <Link href="/" class="flex items-center">
          <Logo width="50" height="50"></Logo>
        </Link>
      </div>
      
      <!-- Motor de búsqueda: se muestra cuando se hace scroll en Welcome o siempre en otras páginas -->
      <div v-if="showSearch" class="flex-1 max-w-3xl mx-8 transition-all duration-500" :class="showSearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'">
        <Experiencias />
      </div>
      
      <Link class="flex items-center" :href="route('login')">
        <div class="flex items-center gap-x-2 px-4 py-2 rounded-lg transition-all duration-300" :class="isScrolled ? 'bg-black text-white hover:bg-gray-800' : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'">
          <i class="fa-solid fa-right-to-bracket"></i>
          <span class="text-sm font-semibold">Entrar</span>
        </div>
      </Link>
    </nav>
  </header>
</template>

<script setup>
import Experiencias from "@/Components/SearchEngines/Search.vue";
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { Link } from "@inertiajs/vue3";
import Logo from "../logo.vue";

const props = defineProps({
  isWelcomePage: {
    type: Boolean,
    default: false
  }
});

const navigation = [
  { name: "Inicio", href: "welcome" },
  { name: "Sobre Nosotros", href: "welcome" },
  { name: "Contacto", href: "welcome" },
  { name: "Mi Reserva", href: "welcome" },
];

const search = ref("");

const isScrolled = ref(false);

const mobileMenuOpen = ref(false);

// Computed para controlar cuándo mostrar el buscador
const showSearch = computed(() => {
  // Si es la página Welcome, mostrar solo cuando se hace scroll
  if (props.isWelcomePage) {
    return isScrolled.value;
  }
  // En otras páginas, mostrar siempre
  return true;
});

const handleScroll = () => {
  if (window.scrollY > 300) {
    isScrolled.value = true; // Si se ha hecho scroll más de 300px, cambiamos el estado
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
  position: fixed;
  width: 100%;
  top: 0;
  background: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
}

.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 1024px) {
  .scrolled {
    width: 100%;
  }
}
</style>

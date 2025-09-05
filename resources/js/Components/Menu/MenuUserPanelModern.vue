<template>
  <div class="border-t border-gray-200 p-3">
    <div v-if="!isCollapsed" class="flex items-center gap-3">
      <!-- Avatar placeholder -->
      <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
        <span class="text-gray-600 text-sm font-medium">{{ userInitials }}</span>
      </div>
      
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">{{ userName }}</p>
        <p class="text-xs text-gray-500">Administrador</p>
      </div>
      
      <!-- Logout button -->
      <Link :href="route('logout')" method="post" 
        class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-red-500"
        title="Cerrar sesión"
      >
        <i class="pi pi-sign-out"></i>
      </Link>
    </div>
    
    <!-- Collapsed mode -->
    <div v-else class="flex flex-col items-center space-y-2">
      <!-- User avatar -->
      <Link :href="route('profile.show')" 
        class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors group relative"
      >
        <span class="text-gray-600 text-sm font-medium">{{ userInitials }}</span>
        
        <!-- Tooltip -->
        <div class="absolute left-full ml-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none"
          style="z-index: 9999;"
        >
          {{ userName }}
          <div class="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-900"></div>
        </div>
      </Link>
      
      <!-- Logout button -->
      <Link :href="route('logout')" method="post" 
        class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-red-500 group relative"
        title="Cerrar sesión"
      >
        <i class="pi pi-sign-out"></i>
        
        <!-- Tooltip -->
        <div class="absolute left-full ml-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none"
          style="z-index: 9999;"
        >
          Cerrar sesión
          <div class="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-900"></div>
        </div>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
});

const page = usePage();

const userName = computed(() => page.props.auth.user.name);

const userInitials = computed(() => {
  const name = userName.value;
  if (!name) return 'U';
  
  const names = name.split(' ');
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
});
</script>

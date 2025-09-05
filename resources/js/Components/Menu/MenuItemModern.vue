<template>
  <div v-if="shouldShow">
    <!-- Simple menu item -->
    <Link v-if="!hasSubmenu" :href="href" 
      class="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group relative"
      :class="isCollapsed ? 'justify-center' : 'justify-start'"
    >
      <i :class="[icon, 'text-gray-500 group-hover:text-gray-700', isCollapsed ? 'text-lg' : 'text-base mr-3']"></i>
      <span v-if="!isCollapsed" class="font-medium">{{ label }}</span>
      
      <!-- Tooltip para modo colapsado -->
      <div v-if="isCollapsed" 
        ref="tooltip"
        class="absolute left-full ml-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none"
        style="z-index: 9999;"
      >
        {{ label }}
        <div class="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-900"></div>
      </div>
    </Link>

    <!-- Menu item with submenu -->
    <div v-else class="relative">
      <button 
        @click="toggleSubmenu"
        class="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group relative"
        :class="isCollapsed ? 'justify-center' : 'justify-start'"
      >
        <i :class="[icon, 'text-gray-500 group-hover:text-gray-700', isCollapsed ? 'text-lg' : 'text-base mr-3']"></i>
        <span v-if="!isCollapsed" class="font-medium flex-1 text-left">{{ label }}</span>
        <i v-if="!isCollapsed" class="pi pi-chevron-down text-xs transition-transform duration-200" :class="isSubmenuOpen ? 'rotate-180' : ''"></i>
        
        <!-- Tooltip para modo colapsado -->
        <div v-if="isCollapsed" 
          ref="submenuTooltip"
          class="absolute left-full ml-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none"
          style="z-index: 9999;"
        >
          {{ label }}
          <div class="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-900"></div>
        </div>
      </button>
      
      <!-- Submenu -->
      <div v-if="!isCollapsed" v-show="isSubmenuOpen" class="mt-1 ml-6 space-y-1 overflow-hidden transition-all duration-200">
        <MenuItemModern 
          v-for="item in submenuItems" 
          :key="item.label"
          :label="item.label"
          :href="item.href"
          :icon="item.icon"
          :permission="item.permission"
          :is-collapsed="false"
          class="text-sm"
        />
      </div>

      <!-- Submenu flotante para modo colapsado -->
      <div v-if="isCollapsed && isSubmenuOpen" 
        class="absolute left-full ml-2 top-0 bg-white border border-gray-200 rounded-lg shadow-xl py-2 min-w-48"
        style="z-index: 9999;"
      >
        <div class="px-3 py-2 text-sm font-medium text-gray-900 border-b border-gray-100">{{ label }}</div>
        <div class="py-1">
          <Link 
            v-for="item in submenuItems" 
            :key="item.label"
            :href="item.href"
            v-if="!item.permission || hasPermissionTo(item.permission)"
            class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <i :class="item.icon" class="mr-3 text-gray-500 text-xs"></i>
            {{ item.label }}
          </Link>
        </div>
        <!-- Flecha del submenu -->
        <div class="absolute left-0 top-4 transform -translate-x-1 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-white"></div>
        <div class="absolute left-0 top-4 transform -translate-x-[2px] w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-200"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { usePermissions } from "@/composable/Auth";
import { computed, ref, watch } from "vue";

const { hasPermissionTo } = usePermissions();

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    required: true
  },
  permission: {
    type: String,
    default: null
  },
  submenuItems: {
    type: Array,
    default: () => []
  },
  isCollapsed: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submenu-toggle']);

const isSubmenuOpen = ref(false);

const hasSubmenu = computed(() => props.submenuItems.length > 0);

const shouldShow = computed(() => {
  return !props.permission || hasPermissionTo(props.permission);
});

const toggleSubmenu = () => {
  const newState = !isSubmenuOpen.value;
  isSubmenuOpen.value = newState;
  
  // Emitir evento cuando se abre un submenú
  if (newState) {
    emit('submenu-toggle', true);
  }
};

// Cerrar submenu cuando el menú se colapsa
watch(() => props.isCollapsed, (newVal) => {
  if (newVal) {
    isSubmenuOpen.value = false;
  }
});
</script>

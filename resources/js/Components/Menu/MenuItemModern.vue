<template>
  <div v-if="shouldShow">
    <!-- Simple menu item -->
    <Link v-if="!hasSubmenu" :href="href" 
      class="menu-item group relative"
      :class="[
        isCollapsed ? 'justify-center px-3' : 'justify-start px-4',
        isActive ? 'menu-item-active' : ''
      ]"
    >
      <!-- Icon container -->
      <div class="menu-icon-box" :class="isCollapsed ? '' : 'mr-3'">
        <i :class="[icon, 'menu-icon', isCollapsed ? 'text-base' : 'text-sm']"></i>
      </div>
      
      <!-- Label -->
      <span v-if="!isCollapsed" class="menu-label">{{ label }}</span>
      
      <!-- Active indicator -->
      <div v-if="isActive && !isCollapsed" class="menu-active-indicator"></div>
      
      <!-- Tooltip premium para modo colapsado -->
      <div v-if="isCollapsed" 
        ref="tooltip"
        class="menu-tooltip"
      >
        {{ label }}
        <div class="menu-tooltip-arrow"></div>
      </div>
    </Link>

    <!-- Menu item with submenu -->
    <div v-else class="relative">
      <button 
        @click="toggleSubmenu"
        class="menu-item group relative w-full"
        :class="[
          isCollapsed ? 'justify-center px-3' : 'justify-start px-4',
          isSubmenuOpen ? 'menu-item-active' : ''
        ]"
      >
        <!-- Icon container -->
        <div class="menu-icon-box" :class="isCollapsed ? '' : 'mr-3'">
          <i :class="[icon, 'menu-icon', isCollapsed ? 'text-base' : 'text-sm']"></i>
        </div>
        
        <!-- Label -->
        <span v-if="!isCollapsed" class="menu-label flex-1 text-left">{{ label }}</span>
        
        <!-- Chevron -->
        <i v-if="!isCollapsed" class="fa-solid fa-chevron-down menu-chevron" :class="isSubmenuOpen ? 'rotate-180' : ''"></i>
        
        <!-- Tooltip premium para modo colapsado -->
        <div v-if="isCollapsed" 
          ref="submenuTooltip"
          class="menu-tooltip"
        >
          {{ label }}
          <div class="menu-tooltip-arrow"></div>
        </div>
      </button>
      
      <!-- Submenu expandido -->
      <div v-if="!isCollapsed" v-show="isSubmenuOpen" class="submenu-container">
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

      <!-- Submenu flotante premium para modo colapsado -->
      <div v-if="isCollapsed && isSubmenuOpen" 
        class="floating-submenu"
      >
        <!-- Header del submenu -->
        <div class="floating-submenu-header">
          <i :class="icon" class="mr-2 text-sm"></i>
          {{ label }}
        </div>
        
        <!-- Items del submenu -->
        <div class="floating-submenu-items">
          <Link 
            v-for="item in submenuItems" 
            :key="item.label"
            :href="item.href"
            v-if="!item.permission || hasPermissionTo(item.permission)"
            prefetch
            class="floating-submenu-item group"
          >
            <div class="floating-submenu-icon">
              <i :class="item.icon" class="text-xs"></i>
            </div>
            <span class="flex-1">{{ item.label }}</span>
            <i class="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </Link>
        </div>
        
        <!-- Flecha del submenu -->
        <div class="floating-submenu-arrow"></div>
        <div class="floating-submenu-arrow-border"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== MENU ITEM BASE ===== */
.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  background: transparent;
  border: 1px solid transparent;
}

.menu-item:hover {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.05), rgba(30, 41, 59, 0.03));
  border-color: rgba(15, 23, 42, 0.1);
  transform: translateX(4px);
}

.menu-item-active {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.08), rgba(30, 41, 59, 0.06));
  border-color: rgba(15, 23, 42, 0.15);
}

/* ===== ICON BOX ===== */
.menu-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.05);
  transition: all 0.3s ease;
}

.menu-item:hover .menu-icon-box {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.2);
}

.menu-item-active .menu-icon-box {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.25);
}

/* ===== ICON ===== */
.menu-icon {
  color: #64748b;
  transition: all 0.3s ease;
}

.menu-item:hover .menu-icon,
.menu-item-active .menu-icon {
  color: #ffffff;
  transform: scale(1.1);
}

/* ===== LABEL ===== */
.menu-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  transition: all 0.3s ease;
}

.menu-item:hover .menu-label,
.menu-item-active .menu-label {
  color: #0f172a;
}

/* ===== ACTIVE INDICATOR ===== */
.menu-active-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: linear-gradient(180deg, #0f172a, #1e293b);
  border-radius: 10px 0 0 10px;
}

/* ===== CHEVRON ===== */
.menu-chevron {
  font-size: 0.7rem;
  color: #94a3b8;
  transition: all 0.3s ease;
  margin-left: auto;
}

.menu-item:hover .menu-chevron {
  color: #0f172a;
}

/* ===== TOOLTIP ===== */
.menu-tooltip {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 1px rgba(15, 23, 42, 0.5);
  pointer-events: none;
  z-index: 9999;
  border: 1px solid rgba(15, 23, 42, 0.3);
}

.group:hover .menu-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(4px);
}

.menu-tooltip-arrow {
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #0f172a;
}

/* ===== SUBMENU CONTAINER ===== */
.submenu-container {
  margin-top: 6px;
  margin-left: 48px;
  padding-left: 16px;
  border-left: 2px solid rgba(100, 116, 139, 0.2);
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
}

/* ===== FLOATING SUBMENU ===== */
.floating-submenu {
  position: absolute;
  left: calc(100% + 12px);
  top: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  z-index: 9999;
  overflow: hidden;
  animation: fadeInSubmenu 0.3s ease-out;
}

@keyframes fadeInSubmenu {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.floating-submenu-header {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  background: rgba(15, 23, 42, 0.05);
  border-bottom: 1px solid #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.floating-submenu-items {
  padding: 8px;
}

.floating-submenu-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #475569;
  transition: all 0.3s ease;
  cursor: pointer;
  gap: 10px;
}

.floating-submenu-item:hover {
  background: rgba(15, 23, 42, 0.05);
  color: #0f172a;
  transform: translateX(4px);
}

.floating-submenu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.05);
  color: #64748b;
  transition: all 0.3s ease;
}

.floating-submenu-item:hover .floating-submenu-icon {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #ffffff;
  transform: scale(1.1);
}

.floating-submenu-arrow {
  position: absolute;
  left: -5px;
  top: 16px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #ffffff;
}

.floating-submenu-arrow-border {
  position: absolute;
  left: -6px;
  top: 16px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #e2e8f0;
}
</style>

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

// Check if current route is active
const isActive = computed(() => {
  if (!props.href) return false;
  return window.location.pathname === props.href || window.location.pathname.startsWith(props.href);
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

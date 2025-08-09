<template>
  <li v-if="shouldShow">
    <!-- Simple menu item -->
    <Link v-if="!hasSubmenu" :href="href" v-ripple
      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
      <i :class="icon + ' mr-2'"></i>
      <span class="font-medium">{{ label }}</span>
    </Link>

    <!-- Menu item with submenu -->
    <template v-else>
      <a v-ripple v-styleclass="{
        selector: '@next',
        enterFromClass: 'hidden',
        enterActiveClass: 'animate-slidedown',
        leaveToClass: 'hidden',
        leaveActiveClass: 'animate-slideup',
      }"
        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
        <i :class="icon + ' mr-2'"></i>
        <span class="font-medium">{{ label }}</span>
        <i class="pi pi-chevron-down ml-auto"></i>
      </a>
      <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
        <MenuItem 
          v-for="item in submenuItems" 
          :key="item.label"
          :label="item.label"
          :href="item.href"
          :icon="item.icon"
          :permission="item.permission"
        />
      </ul>
    </template>
  </li>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { usePermissions } from "@/composable/Auth";
import { computed } from "vue";

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
  }
});

const hasSubmenu = computed(() => props.submenuItems.length > 0);

// Show the item if no permission is required or if user has the permission
const shouldShow = computed(() => {
  return !props.permission || hasPermissionTo(props.permission);
});
</script>

<template>
  <div class="mt-auto">
    <hr class="border-t border-0 border-surface-200 dark:border-surface-700" />
    <div class="flex items-center">
      <Link :href="route('profile.show')" v-ripple
        class="w-full flex items-center cursor-pointer p-2 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple truncate">
        <span class="font-bold">{{ userName }}</span>
      </Link>
      <div
        class="w-full py-2 border-l-2 flex justify-center items-center cursor-pointer hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple gap-x-4 text-red-500">
        <Link :href="route('logout')" method="post" class="flex items-center gap-x-4">
          <p>Salir</p>
          <i class="pi pi-sign-out"></i>
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

const page = usePage();

const userName = computed(() => page.props.auth.user.name);
</script>

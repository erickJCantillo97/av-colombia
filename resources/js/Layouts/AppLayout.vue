<script setup>
import { ref } from "vue";
import { Head, Link, router } from "@inertiajs/vue3";
import Banner from "@/Components/Banner.vue";
import Menu from "@/Components/Sections/Menu.vue";
import DrawerMenu from "@/Components/Sections/DrawerMenu.vue";

defineProps({
  title: String,
});

const showingNavigationDropdown = ref(false);

const switchToTeam = (team) => {
  router.put(
    route("current-team.update"),
    {
      team_id: team.id,
    },
    {
      preserveState: false,
    }
  );
};

const logout = () => {
  router.post(route("logout"));
};
</script>

<template>
  <div>
    <Head :title="title" />
    <Banner />
    <div class="bg-white">
      <!-- Navigation Toggle -->
      <nav
        class="items-center justify-between p-6 lg:px-8 flex lg:hidden"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="text-lg font-bold capitalize">{{ title }}</span>
            <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> -->
          </a>
        </div>
        <div class="flex">
          <!-- <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                  </button> -->
          <DrawerMenu></DrawerMenu>
        </div>
      </nav>

      <!-- End Navigation Toggle -->
      <!-- Sidebar -->
      <div
        id="docs-sidebar"
        class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-2 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700"
      >
        <Menu></Menu>
      </div>
      <!-- Page Content -->
      <main
        class="px-2 lg:ml-64 bg-white h-[100vh] overflow-y-auto animate-zoomin animate-once animate-duration-300"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

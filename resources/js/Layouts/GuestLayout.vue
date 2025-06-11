<template>
  <Head title="Inicio" />
  <div
    class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
  ></div>
  <div class="">
    <div
      class="justify-center w-full h-[60vh] flex flex-col items-center pb-5"
      style="
        background-image: url('/images/cartagena.webp');
        background-size: cover;
        background-position: center;
      "
    >
      <Header :isScrolled="isScrolled" />
      <div
        class="shadow-xl mt-10 flex items-center justify-between rounded-lg px-10 md:px-12 h-full"
      >
        <div class="py-10 space-y-10 mt-4 w-full">
          <div class="flex justify-between items-center w-full">
            <Link href="/" class="hidden md:flex">
              <Logo></Logo>
              <!-- <img src="/images/logo.svg" class="object-cover" alt=""> -->
            </Link>
            <div class="">
              <h1
                data-aos="zoom-in-down"
                data-aos-duration="2000"
                class="text-right text-4xl lg:text-6xl text-white font-extrabold"
              >
                AV Colombia
              </h1>
              <h3>
                <p
                  data-aos="zoom-in-down"
                  data-aos-duration="2000"
                  class="text-right text-lg lg:text-3xl text-white font-bold"
                >
                  Encuentra las mejores experiencias
                </p>
              </h3>
            </div>
          </div>
          <div
            data-aos="flip-down"
            data-aos-duration="1000"
            class="rounded-lg bg-white"
          >
            <Experiencias  />
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
  <FooterSection></FooterSection>
</template>
<script setup>
import Experiencias from "@/Components/SearchEngines/Search.vue";
import Header from "@/Components/Sections/Header.vue";
import { Head, Link } from "@inertiajs/vue3";
import FooterSection from "@/Pages/Welcome/FooterSection.vue";
import { ref } from "vue";
import Logo from "@/Components/logo.vue";
const toggler = ref(false);
defineProps({
  canLogin: {
    type: Boolean,
  },
});

</script>

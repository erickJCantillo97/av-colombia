<template>
  <section class="relative bg-black py-16 sm:py-20">
    <!-- Fondo con gradiente sutil -->
    <div class="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

    <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-pink-600 px-8 py-12 shadow-2xl shadow-rose-500/20 sm:px-16 sm:py-14"
      >
        <!-- Decoraciones de fondo -->
        <div class="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
        <div class="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-black/10 blur-3xl"></div>

        <div
          class="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left"
        >
          <!-- Texto -->
          <div class="max-w-2xl">
            <div
              class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-md"
            >
              <i class="fa-solid fa-handshake text-white"></i>
              <span class="text-sm font-semibold text-white">Para agencias</span>
            </div>
            <h2 class="text-3xl font-bold text-white sm:text-4xl">
              ¿Eres agencia? Contacta con nosotros
            </h2>
            <p class="mt-3 text-lg text-rose-50">
              Únete a nuestra red de aliados y trabajemos juntos para ofrecer experiencias
              inolvidables a tus clientes.
            </p>
          </div>

          <!-- Acción WhatsApp -->
          <div class="flex shrink-0 flex-col items-center gap-2">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#128C7E] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <i
                class="fa-brands fa-whatsapp text-2xl text-[#25D366] transition-transform group-hover:scale-110"
              ></i>
              Escríbenos por WhatsApp
            </a>
            <span class="text-sm font-medium text-rose-50">+57 316 2479140</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const whatsappNumber = "573162479140";
const whatsappMessage =
  "Hola, soy una agencia y quiero más información sobre alianzas con AV Colombia";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
</script>

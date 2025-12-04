<template>
    <div class="relative bg-black py-24 sm:py-32">
        <!-- Fondo con gradiente sutil -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
        
        <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
            <!-- Título de la sección -->
            <div class="mx-auto max-w-2xl text-center mb-16">
                <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                    Contáctanos
                </h2>
                <p class="text-lg text-gray-400">
                    Estamos aquí para hacer tu experiencia inolvidable
                </p>
            </div>

            <!-- Layout de 2 columnas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <!-- Columna izquierda: Formulario e Info -->
                <div class="space-y-8">
                    <!-- Formulario compacto -->
                    <div class="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">Envíanos un mensaje</h3>
                        <form action="#" method="POST" class="space-y-4">
                            <div class="grid grid-cols-2 gap-3">
                                <input 
                                    type="text" 
                                    name="first-name" 
                                    placeholder="Nombre"
                                    class="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 transition-colors" />
                                <input 
                                    type="text" 
                                    name="last-name" 
                                    placeholder="Apellido"
                                    class="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 transition-colors" />
                            </div>

                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Correo electrónico"
                                class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 transition-colors" />

                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="Teléfono"
                                class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 transition-colors" />

                            <textarea 
                                name="message" 
                                rows="4"
                                placeholder="Tu mensaje..."
                                class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 transition-colors resize-none"></textarea>

                            <button 
                                type="submit"
                                class="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-rose-500/30">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                    <!-- Información de contacto compacta -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                            <div class="flex items-center gap-2 mb-2">
                                <BuildingOffice2Icon class="h-5 w-5 text-rose-500" />
                                <h3 class="text-sm font-semibold text-white">Dirección</h3>
                            </div>
                            <p class="text-xs text-gray-400 leading-relaxed">
                                Av. Santander Cra 1 #46-50, Marbella, Cartagena
                            </p>
                        </div>

                        <div class="bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                            <div class="flex items-center gap-2 mb-2">
                                <PhoneIcon class="h-5 w-5 text-rose-500" />
                                <h3 class="text-sm font-semibold text-white">Teléfonos</h3>
                            </div>
                            <div class="space-y-1">
                                <p class="text-xs text-gray-400">
                                    <a href="tel:3046790115" class="hover:text-rose-400 transition-colors">304 679 0115</a>
                                </p>
                                <p class="text-xs text-gray-400">
                                    <a href="tel:6056528879" class="hover:text-rose-400 transition-colors">605 652 8879</a>
                                </p>
                            </div>
                        </div>

                        <div class="bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                            <div class="flex items-center gap-2 mb-2">
                                <svg class="h-5 w-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 class="text-sm font-semibold text-white">Horario</h3>
                            </div>
                            <div class="space-y-0.5 text-xs text-gray-400">
                                <p>Lun-Vie: 8AM-6PM</p>
                                <p>Sáb: 9AM-2PM</p>
                                <p>Dom: Cerrado</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Columna derecha: Mapa -->
                <div class="lg:sticky lg:top-24 h-fit">
                    <div class="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.8273031643866!2d-75.54070168872555!3d10.435275089650524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef62f8fcb1386dd%3A0xb7ae39a6302e773b!2sCra.%201%20%2346-50%2C%20Cartagena%20de%20Indias%2C%20Provincia%20de%20Cartagena%2C%20Bol%C3%ADvar!5e0!3m2!1ses-419!2sco!4v1764851106435!5m2!1ses-419!2sco"
                            width="100%" 
                            height="600" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade"
                            class="w-full h-[600px]">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { BuildingOffice2Icon, PhoneIcon } from '@heroicons/vue/24/outline'
</script>
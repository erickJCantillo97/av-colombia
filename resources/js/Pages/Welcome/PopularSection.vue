<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

</script>

<template>
    <div class="bg-white rounded-lg flex flex-col items-center p-4 md:p-10">
        <h3 class="text-3xl font-bold">Tours Populares</h3>
        <p class="text-sm text-gray-700 mt-2 text-center">
            Los favoritos de nuestros usuarios. <br> Disfruta de experiencias inolvidables
        </p>
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-full md:px-72 ">
            <div class="w-full  shadow-2xl rounded-lg hover:scale-105 transition duration-500 ease-in-out">
                <img src="https://avcolombia.net/images/productos/isla-del-rosario.webp"
                    class="h-48 w-full object-cover rounded-t-lg shadow-lg" alt="">
                <div class="p-2 flex flex-col gap-y-2">
                    <div class="flex justify-between items-center">
                        <Link href="/showservice/tour-5-islas-basico" class="text-lg font-bold">Tour Islas del rosario</Link>
                        <p class="text-gray-700 text-md font-bold flex items-center space-x-2"><i
                                class="fa-solid fa-star text-amber-400"></i>
                            <span>4.7</span>
                        </p>
                    </div>
                    <span class="text-sm text-gray-700">
                        <i class="fa-solid fa-map-marker-alt text-red-600 mr-3"></i> Cartagena
                    </span>
                    <p class="text-sm text-gray-700 mt-2">
                        Disfruta de un recorrido por las impresionantes playas de las hermosas islas del rosario, donde  el sol radiante te brindarán una experiencia inolvidable.
                    </p>
                    <div class="flex flex-col-reverse md:flex-row py-1 justify-between items-end gap-y-2">
                        <Link href="/showservice/tour-5-islas-basico"
                            class="bg-blue-900 w-full md:w-auto text-nowrap text-center font-bold text-white text-sm py-1 px-3 rounded-md">
                        Ver
                        detalles
                        </Link>
                        <p class="text-gray-700 text-md flex items-center w-full justify-center text-center font-bold">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <span>80.000 </span>
                            <span class="text-xs">/persona</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full  shadow-2xl rounded-lg hover:scale-105 transition duration-500 ease-in-out">
                <img src="https://avcolombia.net/images/productos/baru.webp"
                    class="h-48 w-full object-cover rounded-t-lg shadow-lg" alt="">
                <div class="p-2 flex flex-col gap-y-2">
                    <div class="flex justify-between items-center">
                        <Link href="/showservice/tour-5-islas-basico" class="text-lg font-bold">TOUR BARU</Link>
                        <p class="text-gray-700 text-lg flex items-center space-x-2"><i
                                class="fa-solid fa-star text-amber-400"></i>
                            <span>4.9</span>
                        </p>
                    </div>
                    <span class="text-sm text-gray-700">
                        <i class="fa-solid fa-map-marker-alt text-red-600"></i> Cartagena
                    </span>
                    <p class="text-sm text-gray-700 mt-2">
                        Disfruta de un recorrido inolvidable por las 5 islas más hermosas y fascinantes de Cartagena, donde la belleza natural te dejará sin aliento.
                    </p>
                    <div class="flex flex-col-reverse md:flex-row py-1 justify-between items-end gap-y-2">
                        <Link href="/showservice/tour-5-islas-basico"
                            class="bg-blue-900 w-full md:w-auto text-nowrap text-center font-bold text-white text-sm py-1 px-3 rounded-md">
                        Ver
                        detalles
                        </Link>
                        <p class="text-gray-700 text-md flex items-center w-full justify-center text-center font-bold">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <span>40.000 </span>
                            <span class="text-xs">/persona</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full  shadow-2xl rounded-lg hover:scale-105 transition duration-500 ease-in-out">
                <img src="https://avcolombia.net/images/productos/volcan.webp"
                    class="h-48 w-full object-cover rounded-t-lg shadow-lg" alt="">
                <div class="p-2 flex flex-col gap-y-2">

                    <div class="flex justify-between items-center">
                        <Link href="/showservice/tour-5-islas-basico" class="text-lg font-bold">TOUR VOLCAN</Link>
                        <p class="text-gray-700 text-lg flex items-center space-x-2"><i
                                class="fa-solid fa-star text-amber-400"></i>
                            <span>5.0</span>
                        </p>
                    </div>
                    <span class="text-sm text-gray-700">
                        <i class="fa-solid fa-map-marker-alt text-red-600"></i> Cartagena
                    </span>
                    <p class="text-sm text-gray-700 mt-2">
                        Es un lugar popular por su "lodo medicinal", que se dice tiene propiedades curativas para la piel y alivia dolores musculares.
                    </p>
                    <div class="flex flex-col-reverse md:flex-row py-1 justify-between items-end gap-y-2">
                        <Link href="/showservice/tour-5-islas-basico"
                            class="bg-blue-900 w-full md:w-auto text-nowrap text-center font-bold text-white text-sm py-1 px-3 rounded-md">
                        Ver
                        detalles
                        </Link>
                        <p class="text-gray-700 text-md flex items-center w-full justify-center text-center font-bold">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <span>120.000 </span>
                            <span class="text-xs">/persona</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full  shadow-2xl rounded-lg hover:scale-105 transition duration-500 ease-in-out">
                <img src="https://avcolombia.net/images/productos/city_tour.webp"
                    class="h-48 w-full object-cover rounded-t-lg shadow-lg" alt="">
                <div class="p-2 flex flex-col gap-y-2">
                    <div class="flex justify-between items-center">
                        <Link href="/showservice/tour-5-islas-basico" class="text-lg font-bold">CITY TOUR</Link>
                        <p class="text-gray-700 text-lg flex items-center space-x-2"><i
                                class="fa-solid fa-star text-amber-400"></i>
                            <span>5.0</span>
                        </p>
                    </div>
                    <span class="text-sm text-gray-700">
                        <i class="fa-solid fa-map-marker-alt text-red-600"></i> Cartagena
                    </span>
                    <p class="text-sm text-gray-700 mt-2">
                       Experimente la zona moderna y turística de Bocagrande, Laguito y Castillo Grande. Vea una de las bahías naturales más hermosas y un exuberante parque.
                    </p>
                    <div class="flex flex-col-reverse md:flex-row py-1 justify-between items-end gap-y-2">
                        <Link href="/showservice/tour-5-islas-basico"
                            class="bg-blue-900 w-full md:w-auto text-nowrap text-center font-bold text-white text-sm py-1 px-3 rounded-md">
                        Ver
                        detalles
                        </Link>
                        <p class="text-gray-700 text-md flex items-center w-full justify-center text-center font-bold">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <span>72.000 </span>
                            <span class="text-xs">/persona</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
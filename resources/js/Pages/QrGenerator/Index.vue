<script setup lang="ts">
import Input from '@/Components/Customs/Input.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
import QRCodeVue3 from "qrcode-vue3";

const text = ref('Bienvenido');
const verQr = ref(false);
const verImagen = ref(true);

// Opciones de personalización
const qrSize = ref(300);
const backgroundColor = ref('#ffffff');
const dotsColor = ref('#064a59');
const cornersColor = ref('#000000');
const dotsType = ref('classy');
const cornersType = ref('extra-rounded');
const errorCorrectionLevel = ref('M');

const dotsTypes = [
    { value: 'rounded', label: 'Redondeado' },
    { value: 'dots', label: 'Puntos' },
    { value: 'classy', label: 'Clásico' },
    { value: 'classy-rounded', label: 'Clásico Redondeado' },
    { value: 'square', label: 'Cuadrado' },
];

const cornersTypes = [
    { value: 'dot', label: 'Punto' },
    { value: 'square', label: 'Cuadrado' },
    { value: 'extra-rounded', label: 'Extra Redondeado' },
];

const errorLevels = [
    { value: 'L', label: 'Bajo (7%)' },
    { value: 'M', label: 'Medio (15%)' },
    { value: 'Q', label: 'Alto (25%)' },
    { value: 'H', label: 'Muy Alto (30%)' },
];

const generateQR = async () => {
    verQr.value = false;
    await new Promise(resolve => setTimeout(resolve, 100));
    verQr.value = true;
};
</script>

<template>
    <AppLayout>
        <div class="p-6 max-w-7xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Generador de QR Personalizado</h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">Crea códigos QR únicos con múltiples opciones de personalización</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Panel de configuración -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Configuración</h2>
                        
                        <!-- Contenido -->
                        <div class="space-y-4">
                            <Input 
                                class="w-full" 
                                label="Contenido del QR" 
                                placeholder="URL, texto, teléfono, etc."
                                v-model="text"
                                @input="generateQR"
                            />

                            <!-- Tamaño -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tamaño: {{ qrSize }}px
                                </label>
                                <input 
                                    type="range" 
                                    v-model="qrSize" 
                                    min="200" 
                                    max="500" 
                                    step="50"
                                    @input="generateQR"
                                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                            </div>

                            <!-- Mostrar logo -->
                            <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <input 
                                    type="checkbox" 
                                    id="verImagen" 
                                    class="rounded size-5 text-[#064a59] focus:ring-[#064a59] cursor-pointer" 
                                    v-model="verImagen"
                                    @change="generateQR"
                                >
                                <label for="verImagen" class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                                    Mostrar logo en el centro
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Estilos -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Estilos</h3>
                        
                        <div class="space-y-4">
                            <!-- Estilo de puntos -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Estilo de puntos
                                </label>
                                <select 
                                    v-model="dotsType"
                                    @change="generateQR"
                                    class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-[#064a59] focus:ring-[#064a59]"
                                >
                                    <option v-for="type in dotsTypes" :key="type.value" :value="type.value">
                                        {{ type.label }}
                                    </option>
                                </select>
                            </div>

                            <!-- Estilo de esquinas -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Estilo de esquinas
                                </label>
                                <select 
                                    v-model="cornersType"
                                    @change="generateQR"
                                    class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-[#064a59] focus:ring-[#064a59]"
                                >
                                    <option v-for="type in cornersTypes" :key="type.value" :value="type.value">
                                        {{ type.label }}
                                    </option>
                                </select>
                            </div>

                            <!-- Nivel de corrección -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Corrección de errores
                                </label>
                                <select 
                                    v-model="errorCorrectionLevel"
                                    @change="generateQR"
                                    class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-[#064a59] focus:ring-[#064a59]"
                                >
                                    <option v-for="level in errorLevels" :key="level.value" :value="level.value">
                                        {{ level.label }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Colores -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Colores</h3>
                        
                        <div class="grid grid-cols-3 gap-4">
                            <!-- Color de puntos -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Puntos
                                </label>
                                <div class="flex items-center gap-2">
                                    <input 
                                        type="color" 
                                        v-model="dotsColor"
                                        @input="generateQR"
                                        class="h-10 w-full rounded cursor-pointer"
                                    >
                                </div>
                            </div>

                            <!-- Color de esquinas -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Esquinas
                                </label>
                                <div class="flex items-center gap-2">
                                    <input 
                                        type="color" 
                                        v-model="cornersColor"
                                        @input="generateQR"
                                        class="h-10 w-full rounded cursor-pointer"
                                    >
                                </div>
                            </div>

                            <!-- Color de fondo -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Fondo
                                </label>
                                <div class="flex items-center gap-2">
                                    <input 
                                        type="color" 
                                        v-model="backgroundColor"
                                        @input="generateQR"
                                        class="h-10 w-full rounded cursor-pointer"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Panel de vista previa -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Vista Previa</h2>
                        <button
                            @click="generateQR"
                            class="px-4 py-2 bg-[#064a59] text-white rounded-md hover:bg-[#053d49] transition-colors duration-200 font-medium shadow-sm"
                        >
                            Actualizar
                        </button>
                    </div>

                    <div v-if="verQr" class="flex flex-col items-center justify-center min-h-[400px]">
                        <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
                            <QRCodeVue3 
                                :width="qrSize" 
                                :height="qrSize" 
                                :value="text"
                                :downloadOptions="{ name: `qr-${text.slice(0, 20)}`, extension: 'png' }" 
                                :backgroundOptions="{ color: backgroundColor }"
                                :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: errorCorrectionLevel }" 
                                :image="verImagen ? '/images/logo.webp' : undefined"
                                :cornersSquareOptions="{
                                    type: cornersType,
                                    color: cornersColor
                                }" 
                                :dotsOptions="{
                                    type: dotsType,
                                    color: dotsColor
                                }" 
                                fileExt="png" 
                                :download="true" 
                                myclass="my-qur" 
                                imgclass="img-qr"
                                downloadButton="mt-4 w-full bg-gray-800 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 p-3 text-white rounded-md flex justify-center items-center gap-2 transition-colors duration-200 font-medium shadow-sm" 
                            />
                        </div>

                        <!-- Información adicional -->
                        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-full">
                            <p class="text-sm text-blue-800 dark:text-blue-300">
                                <strong>Tip:</strong> Los códigos QR con nivel de corrección más alto pueden dañarse parcialmente y seguir funcionando.
                            </p>
                        </div>
                    </div>

                    <div v-else class="flex flex-col items-center justify-center min-h-[400px] text-gray-400 dark:text-gray-500">
                        <svg class="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <p class="text-lg font-medium">Haz clic en "Actualizar" para generar tu QR</p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
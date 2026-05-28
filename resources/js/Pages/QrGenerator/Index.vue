<script setup lang="ts">
import Input from '@/Components/Customs/Input.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
import QRCodeVue3 from "qrcode-vue3";

const text = ref('Bienvenido');
const verQr = ref(false);
const verImagen = ref(true);
const selectedImage = ref<string | null>(null);
const selectedImageName = ref<string | null>(null);

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
    { value: 'classy-rounded', label: 'Clásico redondeado' },
    { value: 'square', label: 'Cuadrado' },
];

const cornersTypes = [
    { value: 'dot', label: 'Punto' },
    { value: 'square', label: 'Cuadrado' },
    { value: 'extra-rounded', label: 'Extra redondeado' },
];

const errorLevels = [
    { value: 'L', label: 'Bajo (7%)' },
    { value: 'M', label: 'Medio (15%)' },
    { value: 'Q', label: 'Alto (25%)' },
    { value: 'H', label: 'Muy alto (30%)' },
];

const generateQR = async () => {
    verQr.value = false;
    await new Promise((resolve) => setTimeout(resolve, 100));
    verQr.value = true;
};

const onFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        selectedImage.value = reader.result as string;
        selectedImageName.value = file.name;
        verImagen.value = true;
        generateQR();
    };
    reader.readAsDataURL(file);
};

const removeSelectedImage = () => {
    selectedImage.value = null;
    selectedImageName.value = null;
    verImagen.value = false;
    generateQR();
};
</script>

<template>
    <AppLayout title="Generador QR">
        <div class="min-h-screen bg-gray-50">
            <div class="w-full px-6 py-8 space-y-6">

                <!-- Header -->
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Herramientas</p>
                    <h1 class="text-2xl font-bold text-gray-900">Generador de QR</h1>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

                    <!-- Panel de configuración -->
                    <div class="lg:col-span-3 space-y-4">

                        <!-- Contenido -->
                        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">Contenido</p>

                            <Input
                                class="w-full"
                                label="Texto o URL"
                                placeholder="https://ejemplo.com, texto libre, teléfono…"
                                v-model="text"
                                @input="generateQR"
                            />

                            <div>
                                <div class="flex justify-between mb-1.5">
                                    <label class="text-xs font-medium text-gray-500">Tamaño</label>
                                    <span class="text-xs text-gray-400">{{ qrSize }}px</span>
                                </div>
                                <input
                                    type="range"
                                    v-model="qrSize"
                                    min="200"
                                    max="500"
                                    step="50"
                                    @input="generateQR"
                                    class="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#064a59]"
                                />
                                <div class="flex justify-between mt-1">
                                    <span class="text-xs text-gray-300">200px</span>
                                    <span class="text-xs text-gray-300">500px</span>
                                </div>
                            </div>
                        </div>

                        <!-- Logo -->
                        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">Logo central</p>

                            <label class="flex items-center gap-3 cursor-pointer select-none">
                                <div class="relative">
                                    <input
                                        type="checkbox"
                                        id="verImagen"
                                        class="sr-only peer"
                                        v-model="verImagen"
                                        @change="generateQR"
                                    />
                                    <div class="w-9 h-5 bg-gray-200 peer-checked:bg-[#064a59] rounded-full transition-colors duration-200"></div>
                                    <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4"></div>
                                </div>
                                <span class="text-sm text-gray-700">Mostrar logo en el centro</span>
                            </label>

                            <div>
                                <label class="block text-xs font-medium text-gray-500 mb-2">Imagen personalizada <span class="text-gray-300">(opcional)</span></label>
                                <label class="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span class="text-sm text-gray-500">{{ selectedImageName ?? 'Seleccionar imagen…' }}</span>
                                    <input type="file" accept="image/*" @change="onFileChange" class="sr-only" />
                                </label>

                                <div v-if="selectedImage" class="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <img :src="selectedImage" alt="Preview" class="w-10 h-10 object-contain rounded border border-gray-200" />
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm text-gray-700 truncate font-medium">{{ selectedImageName }}</p>
                                        <p class="text-xs text-gray-400">Incrustad en el centro del QR</p>
                                    </div>
                                    <button @click="removeSelectedImage" type="button" class="text-xs text-red-500 hover:text-red-700 transition-colors">Quitar</button>
                                </div>
                            </div>
                        </div>

                        <!-- Estilos y colores -->
                        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">Estilo y colores</p>

                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1.5">Estilo de puntos</label>
                                    <select
                                        v-model="dotsType"
                                        @change="generateQR"
                                        class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-[#064a59] focus:ring-1 focus:ring-[#064a59] focus:bg-white transition-colors"
                                    >
                                        <option v-for="type in dotsTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1.5">Estilo de esquinas</label>
                                    <select
                                        v-model="cornersType"
                                        @change="generateQR"
                                        class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-[#064a59] focus:ring-1 focus:ring-[#064a59] focus:bg-white transition-colors"
                                    >
                                        <option v-for="type in cornersTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1.5">Corrección de errores</label>
                                    <select
                                        v-model="errorCorrectionLevel"
                                        @change="generateQR"
                                        class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-[#064a59] focus:ring-1 focus:ring-[#064a59] focus:bg-white transition-colors"
                                    >
                                        <option v-for="level in errorLevels" :key="level.value" :value="level.value">{{ level.label }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-4 pt-1">
                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1.5">Color puntos</label>
                                    <div class="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-gray-50">
                                        <input type="color" v-model="dotsColor" @input="generateQR" class="h-7 w-7 rounded cursor-pointer border-0 bg-transparent p-0" />
                                        <span class="text-xs text-gray-500 font-mono">{{ dotsColor }}</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1.5">Color esquinas</label>
                                    <div class="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-gray-50">
                                        <input type="color" v-model="cornersColor" @input="generateQR" class="h-7 w-7 rounded cursor-pointer border-0 bg-transparent p-0" />
                                        <span class="text-xs text-gray-500 font-mono">{{ cornersColor }}</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1.5">Color fondo</label>
                                    <div class="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-gray-50">
                                        <input type="color" v-model="backgroundColor" @input="generateQR" class="h-7 w-7 rounded cursor-pointer border-0 bg-transparent p-0" />
                                        <span class="text-xs text-gray-500 font-mono">{{ backgroundColor }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Panel de vista previa -->
                    <div class="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 sticky top-6">
                        <div class="flex items-center justify-between">
                            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">Vista previa</p>
                            <button
                                @click="generateQR"
                                class="px-3 py-1.5 bg-[#064a59] hover:bg-[#053d49] text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                                Generar
                            </button>
                        </div>

                        <div v-if="verQr" class="flex flex-col items-center gap-4">
                            <div class="p-5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center w-full">
                                <QRCodeVue3
                                    :width="qrSize"
                                    :height="qrSize"
                                    :value="text"
                                    :downloadOptions="{ name: `qr-${String(text).slice(0, 20)}`, extension: 'png' }"
                                    :backgroundOptions="{ color: backgroundColor }"
                                    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: errorCorrectionLevel }"
                                    :image="selectedImage || (verImagen ? '/images/logo.webp' : undefined)"
                                    :cornersSquareOptions="{ type: cornersType, color: cornersColor }"
                                    :dotsOptions="{ type: dotsType, color: dotsColor }"
                                    fileExt="png"
                                    :download="true"
                                    myclass="my-qur"
                                    imgclass="img-qr"
                                    downloadButton="mt-2 w-full bg-[#064a59] hover:bg-[#053d49] p-2.5 text-white text-sm font-medium rounded-lg flex justify-center items-center gap-2 transition-colors"
                                />
                            </div>

                            <p class="text-xs text-gray-400 text-center">
                                Mayor corrección de errores permite que el QR funcione incluso dañado parcialmente.
                            </p>
                        </div>

                        <div v-else class="flex flex-col items-center justify-center py-16 gap-3 text-center">
                            <svg class="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            <p class="text-sm text-gray-400">Presiona <span class="font-semibold text-gray-500">Generar</span> para ver el QR</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </AppLayout>
</template>

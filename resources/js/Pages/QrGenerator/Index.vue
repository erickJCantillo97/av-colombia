<script setup lang="ts">
import Input from '@/Components/Customs/Input.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
import QrcodeVue from "qrcode.vue";
const text = ref('Bienvenido');
import QRCodeVue3 from "qrcode-vue3";
const verQr = ref(false);
const verImagen = ref(true);


const generateQR = async () => {
    verQr.value = false;
    await new Promise(resolve => setTimeout(resolve, 1000));
    verQr.value = true;
};
</script>

<template>
    <AppLayout>
        <div class="p-6 g">
            <h1 class="text-2xl font-bold mb-4">Generador de QR</h1>
            <div class="flex justify-between gap-x-4 items-end">
                <Input class="w-full" label="Texto para QR" placeholder="Ingresa el texto para generar el QR"
                    v-model="text"></Input>
                <div class="flex items-center border shadow-md p-2 rounded-md gap-x-4">
                    <input type="checkbox" id="verImagen" class="rounded-md size-6" v-model="verImagen">
                    <label for="verImagen" class="font-bold text-nowrap">Mostrar imagen</label>
                </div>
                <Button @click="generateQR">Generar</Button>
            </div>
            <div v-if="verQr"
                class="rounded-md border flex flex-col gap-y-2 p-1 items-center  shadow-lg shadow-[rgba(6,74,89,0.5)] mt-4">

                <QRCodeVue3 :width="300" :height="300" :value="text"
                    :downloadOptions="{ name: `qr-${text}`, extension: 'png' }" :backgroundOptions="{ color: '#ffffff' }"
                    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'M' }" :image="verImagen ? '/images/logo.webp' : undefined"
                    :cornersSquareOptions="{
                        type: 'extra-rounded',
                        color: '#000000'
                    }" :dotsOptions="{
                        type: 'classy',
                        color: '#064a59'
                    }" fileExt="png" :download="true" myclass="my-qur" imgclass="img-qr"
                    downloadButton="bg-gray-800 p-2 text-gray-100 rounded-md flex justify-center items-center" />
            </div>
        </div>
    </AppLayout>
</template>
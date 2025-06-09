<template>
  <div class="m-0 overflow-y-auto">
    <div>
      <label for="" class="text-md font-bold">Portada</label>
      <Input type="file-basic" v-model="service.portada" acceptFile="image/*" />
      <div class="flex gap-x-4 mt-6 justify-between">
        <Button @click="service.setPortada()" title="Save" severity="success" :loading="form.processing" label="Cambiar Portada"
          class="!h-9 w-full" />
      </div>
    </div>
    <div class="my-2">
      <label for="" class="text-md font-bold">Fotos</label>
      <div class="flex overflow-x-auto py-4 space-x-4">
        <div class="flex-shrink-0 w-1/6 min-w-0" v-for="image in service.images" :key="image.id">
          <div class="relative h-28">
            <img :src="image.filepath" alt="hola" class="h-28 w-full object-cover shadow-md rounded-lg" />
            <button @click="removeImage(image.id)"
              class="absolute top-1 right-1 bg-red-500 fa-solid fa-xmark hover:scale-90 rounded-full flex justify-center items-center text-white shadow-md shadow-red-400 size-8"></button>
          </div>
        </div>
      </div>
      <FileSelection v-model="files" :service="props.service" />    
    </div>
  </div>
</template>
<script setup>
import { router, useForm } from '@inertiajs/vue3';
import Input from "@/Components/Customs/Input.vue";
import FileSelection from "./FileSelection.vue";
import Service from "@/Models/Services/Service.js";

const form = useForm({
  portada: null,
});

const props = defineProps({
  service: Object,
});

const service = new Service(props.service);

const removeImage = (id) => {
  router.delete(route("delete.images", id));
};
</script>

<template>
  <div class="w-full flex justify-start rounded-xl gap-4 py-2 text-sm">
    <!-- {{ images }} -->
       <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="images" :responsiveOptions="responsiveOptions" :numVisible="7"
            containerStyle="max-width: 100%" :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
            <template #item="slotProps">
                <img :src="'https://avcolombia.net/' + slotProps.item" :alt="slotProps.item" style="width: 100%; display: block" />
            </template>
        </Galleria>
    <Image
      :src="'https://avcolombia.net/' + images[0]"
      :pt="{
        root: '!w-2/3',
        image: '!h-[30vh] !w-full !rounded-xl !object-cover cursor-pointer',
      }"
      @click="imageClick(0)"
      alt=""
    />
    <div class="flex flex-col gap-y-2 w-1/3">
      <Image
        :pt="{
          root: '!w-full',
          image: '!h-[15vh] !rounded-xl !w-full object-cover cursor-pointer',
        }"
        :src="'https://avcolombia.net/' + images[1]"
         @click="imageClick(1)"
        class=""
        alt=""
      />
      <div>
        <Image
          :pt="{
            root: '!w-full',
            image: '!h-[15vh] !rounded-xl !w-full object-cover cursor-pointer',
          }"
          :src="'https://avcolombia.net/' + images[2]"
          alt=""
           @click="imageClick(2)"
        />
        <span
          class="hidden md:relative -top-20 left-36 cursor-pointer bg-black/15 rounded-md p-2 text-white text-xl shadow-md"
        >
          +3 imagenes</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
  images: {
    type: Array,
    required: true,
  },
});


const responsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);

const activeIndex = ref(0);
const displayCustom = ref(false);

const imageClick = (index) => {
    activeIndex.value = index;
    displayCustom.value = true;
};


</script>

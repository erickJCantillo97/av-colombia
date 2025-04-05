<template>
  <div class="w-full flex justify-start rounded-xl gap-4 py-2 text-sm">
    <!-- {{ images }} -->
    <Image
      :src="'https://avcolombia.net/' + images[0]"
      :pt="{
        root: '!w-2/3',
        image: '!h-[30vh] !w-full !rounded-xl !object-cover',
      }"
      alt=""
    />
    <div class="flex flex-col gap-y-2 w-1/3">
      <Image
        :pt="{
          root: '!w-full',
          image: '!h-[15vh] !rounded-xl !w-full',
        }"
        :src="'https://avcolombia.net/' + images[1]"
        class=""
        alt=""
      />
      <div>
        <Image
          :pt="{
            root: '!w-full',
            image: '!h-[15vh] !rounded-xl !w-full',
          }"
          :src="'https://avcolombia.net/' + images[2]"
          alt=""
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
defineProps({
  images: {
    type: Array,
    required: true,
  },
});
</script>

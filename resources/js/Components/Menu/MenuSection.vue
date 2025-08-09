<template>
  <li>
    <div v-ripple v-styleclass="{
      selector: '@next',
      enterFromClass: 'hidden',
      enterActiveClass: 'animate-slidedown',
      leaveToClass: 'hidden',
      leaveActiveClass: 'animate-slideup',
    }"
      class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple">
      <span class="font-medium">{{ title }}</span>
      <i class="pi pi-chevron-down"></i>
    </div>
    <ul class="list-none p-0 m-0 overflow-hidden">
      <slot></slot>
    </ul>
  </li>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

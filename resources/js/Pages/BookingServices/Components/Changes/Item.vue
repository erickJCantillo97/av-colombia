<template>
    <div 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 relative"
        :class="position === 'left' ? 'timeline-left' : 'timeline-right'"
    >
        <!-- Flecha que apunta hacia la línea de tiempo -->
        <div 
            class="absolute top-6 w-0 h-0 border-solid"
            :class="[
                position === 'left' 
                    ? 'right-[-12px] border-l-[12px] border-l-white dark:border-l-gray-800 border-y-[12px] border-y-transparent' 
                    : 'left-[-12px] border-r-[12px] border-r-white dark:border-r-gray-800 border-y-[12px] border-y-transparent'
            ]"
        ></div>
        
        <div class="flex gap-x-3 items-start">
            <img 
                :src="change.user.profile_photo_url" 
                alt="" 
                class="size-16 rounded-lg shadow-md ring-2 ring-blue-500/20"
            >
            <div class="flex flex-col gap-y-2 flex-1">
                <!-- Header con usuario y fecha -->
                <div class="flex flex-col gap-y-1">
                    <div class="flex gap-x-2 items-center">
                        <i class="fa-solid fa-circle-info text-blue-500"></i>
                        <p class="font-bold text-gray-900 dark:text-white">
                            {{ change.user.name }}
                        </p>
                    </div>
                    <p class="font-extralight text-xs text-gray-500 dark:text-gray-400">
                        {{ formatDateTime24h(change.created_at) }}
                    </p>
                </div>
                
                <!-- Descripción -->
                <div v-if="change.description" class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {{ change.description }}
                </div>
                
                <!-- Cambios de campo -->
                <div v-if="change.before" class="text-sm flex flex-wrap gap-2 items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                    <span class="text-gray-600 dark:text-gray-400">Cambió</span>
                    <span class="rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 font-medium">
                        {{ change.field }}
                    </span>
                    <span class="text-gray-600 dark:text-gray-400">de</span>
                    <span class="rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 font-medium line-through">
                        {{ change.before }}
                    </span>
                    <span class="text-gray-600 dark:text-gray-400">a</span>
                    <span class="rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 font-medium">
                        {{ change.after }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { useCommonUtilities } from '@/composable/useCommonUtilities';

const {formatDateTime24h} = useCommonUtilities();
defineProps({
    change: Object,
    position: {
        type: String,
        default: 'left',
        validator: (value) => ['left', 'right'].includes(value)
    }
})
</script>

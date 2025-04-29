<template>
    <div class="flex flex-col gap-y-4 p-2">
        <div class="flex gap-x-2 items-start">
            <img :src="change.user.profile_photo_url" alt="" class="size-16 rounded-md shadow-sm">
            <div class="flex flex-col gap-y-1">
                <div class="flex gap-x-2 items-center mt-2">
                    <i class="fa-solid fa-circle-info"></i>
                    <p class="font-bold">
                        {{ change.user.name}}
                    </p>
                    <p class=" font-extralight">
                        {{ formatDateTime24h(change.created_at) }}
                    </p>
                </div>
                <div v-if="change.description" class="font-extralight text-sm">
                    {{ change.description }}
                </div>
                <div v-if="change.before" class="font-extralight text-sm flex gap-x-2">
                    Cambio
                   <p class="rounded-md bg-gray-200 px-2 w-auto">
                    {{ change.field }}
                   </p>
                   de
                   <p class="rounded-md bg-gray-200 px-2 w-auto">
                    {{ change.before }}
                   </p>
                   a
                   <p class="rounded-md bg-gray-200 px-2 w-auto">
                    {{ change.after }}
                   </p>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { useCommonUtilities } from '@/composable/useCommonUtilities';

const {formatDateTime24h} = useCommonUtilities();
defineProps({
    change: Object
})
</script>

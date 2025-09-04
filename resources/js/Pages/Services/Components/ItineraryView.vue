<template>
    <div v-if="(itineraries.length != 0)&& readOnly" class="col-span-2 bg-gray-300 p-2 rounded-md h-[600px] gap-3 flex flex-col overflow-y-auto"
    :class="{'bg-white h-min w-2/3 mx-auto': readOnly}">
        <div v-if="itineraries.length === 0" class="flex items-center justify-center h-full">
            <p class="text-gray-500 italic">No hay itinerarios agregados</p>
        </div>
        <span v-for="(item, index) in itineraries" :key="index">
            <div class="w-full bg-white grid grid-cols-3 gap-3 p-5 rounded-lg shadow-md mb-3 h-[190px]">
                <img :src="item.image" alt="Image" class="w-full rounded-lg  h-[150px] border object-cover" />
                <div class="col-span-2 flex items-center justify-center">
                    <span class="w-full">
                        <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                        <p>{{ item.description }}</p>
                    </span>
                    <div v-if="!readOnly" class="flex flex-col justify-end gap-2">
                        <Button type="button" @click="$emit('edit',index)" severity="warn" icon="fa-solid fa-pen"></Button>
                        <Button type="button" @click="$emit('deleteItem',index)" severity="danger"
                            icon="fa-solid fa-trash"></Button>
                    </div>
                </div>
            </div>
        </span>
    </div>
</template>
<script setup>


const props = defineProps({
    itineraries: Array,
    readOnly: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['deleteItem','edit'])

</script>

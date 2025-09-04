<template>
    <div v-if="(itineraries.length != 0)" class="col-span-2 bg-gray-300 p-2 rounded-md h-[600px] gap-3 flex flex-col overflow-y-auto"
    :class="{'bg-white h-min w-full mx-auto': readOnly}">
        <div v-if="itineraries.length === 0" class="flex items-center justify-center h-full">
            <p class="text-gray-500 italic">No hay itinerarios agregados</p>
        </div>
        <span v-for="(item, index) in itineraries" :key="index">
            <div class="w-full bg-white flex gap-3 p-5 rounded-lg shadow-md mb-3  hover:bg-slate-200 transition-all">
                <img :src="item.image" alt="Image" class="rounded-lg  size-[90px] border object-cover" />
                <div class="col-span-2 flex items-center justify-center w-full">
                    <div class="w-full h-full">
                        <h2 class="text-lg font-bold">{{ item.title }}</h2>
                        <p>{{ item.description }}</p>
                    </div>
                    <div v-if="!readOnly" class="flex border flex-col justify-end gap-2">
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

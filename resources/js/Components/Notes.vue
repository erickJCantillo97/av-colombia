<template>
    <Modal v-model="show" close-on-escape="true" title="Notas" width="90vw">
        <div class="w-full flex flex-col gap-y-5 p-2">
            <h3 class="text-xl font-bold">Notas de la Actividad</h3>
            <div class="h-[30vh] overflow-y-auto flex flex-col gap-y-2">
                <div class="flex border shadow-md p-2 rounded-md" v-for="n in notes" :key="n.id">
                    <img :src="n.user.profile_photo_url" class="size-12 rounded-full" alt="" />
                    <div class="ml-4 flex flex-col gap-y-2 w-full">
                        <h2 class="font-bold text-2xl">{{ n.user.name }}</h2>
                        <div class="w-full flex justify-between">
                            <p>{{ n.note }}</p>
                            <p>{{ new Date(n.created_at).toISOString().split("T")[0] }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center flex-col items-center" v-if="notes.length == 0">
                    <Logo></Logo>
                    <p class="font-semibold text-xl">Serivicio sin notas</p>
                </div>
            </div>
            <div class="flex gap-x-2">
                <Input type="textarea" class="w-full shadow-xl" v-model="note"></Input>
                <Button label="Guardar" severity="info" icon="pi pi-send" @click="sendNote" />
            </div>
        </div>
    </Modal>
</template>
<script setup>
import axios from 'axios';

const show = ref(false);
const notes = ref([]);
const note = ref("");

const props = defineProps({
    booking_service_id: Number,
})

const getNotes = () => {
    axios.get(route("notes.index", { booking_service_id: props.booking_service_id }))
        .then((response) => {
            notes.value = response.data.notes;
        });
}

getNotes();

</script>

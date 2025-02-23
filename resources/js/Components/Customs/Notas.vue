<template>
  asndlands
  <Modal v-model="show" close-on-escape="true" title="Notas" width="90vw">
    <div class="w-full flex flex-col gap-y-5 p-2">
      <h3 class="text-xl font-bold">Notas de la Actividad</h3>
      <div class="h-[30vh] overflow-y-auto flex flex-col gap-y-2">
        <div
          class="flex border shadow-md p-2 rounded-md items-center justify-between w-full"
          v-for="n in notas"
          :key="n.id"
        >
          <!-- <img :src="n.user.profile_photo_url" class="size-16 rounded-full" alt="" /> -->
          <span class="flex flex-col">
            <h2 class="font-bold text-xl">{{ n.user.name }}</h2>
            <p class="text-lg">{{ n.note }}</p>
            <p class="italic text-sm">
              {{ new Date(n.created_at).toISOString().split("T")[0] }}
            </p>
          </span>
          <div>
            <Button icon="fa-solid fa-pencil" text severity="info" @click="editMode(n)" />
            <Button
              icon="fa-solid fa-trash"
              text
              severity="danger"
              @click="eliminar(n)"
            />
          </div>
          <!-- <div class="flex flex-col gap-y-2 w-full">
            <h2 class="font-bold text-2xl">{{ n.user.name }}</h2>
            <div class="w-full flex flex-col">
              <p>{{ n.note }}</p>
            </div>
          </div> -->
        </div>
        <div class="flex justify-center flex-col items-center" v-if="notas.length == 0">
          <Logo></Logo>
          <p class="font-semibold text-xl">Serivicio sin notas</p>
        </div>
      </div>
      <div class="flex gap-x-2">
        <Input type="textarea" class="w-full shadow-xl" v-model="note"></Input>
        <Button
          label="Guardar"
          severity="success"
          v-if="!noteEditMode"
          icon="pi pi-send"
          @click="sendNote"
        />
        <Button v-else label="Editar" severity="info" icon="pi pi-send" @click="edit" />
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";
import Input from "./Input.vue";
import axios from "axios";

const show = defineModel();

const props = defineProps({
  todayActivity: Boolean,
  notes: Array,
  note: String,
  service: Array,
});

const notas = ref(props.notes);
const noteEditMode = ref(false);
const noteSelected = ref(null);
const note = ref("");

const sendNote = () => {
  axios
    .post(route("notes.store"), {
      note: note.value,
      booking_service_id: props.service.id,
    })
    .then((response) => {
      axios
        .get(route("notes.index", { booking_service_id: props.service.id }))
        .then((response) => {
          notas.value = response.data.notes;
          note.value = "";
        });
    });
};

const editMode = (n) => {
  note.value = n.note;
  noteEditMode.value = true;
  noteSelected.value = n;
};

const edit = () => {
  axios
    .put(route("notes.update", noteSelected.value.id), {
      note: note.value,
    })
    .then((response) => {
      axios
        .get(route("notes.index", { booking_service_id: props.service.id }))
        .then((response) => {
          notas.value = response.data.notes;
          note.value = "";
          noteEditMode.value = false;
          noteSelected.value = null;
        });
    });
};
</script>

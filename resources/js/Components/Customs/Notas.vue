<template>
  asndlands
  <Modal v-model="show" close-on-escape title="Notas" width="60vw">
    <div class="w-full flex flex-col gap-y-5 p-2">
      <h3 class="text-xl font-bold">Notas de la Actividad</h3>
      <div class="h-[30vh] overflow-y-auto flex flex-col gap-y-2">
        <div
          class="flex p-2 rounded-md items-center justify-between w-full"
          v-for="n in notas"
          :key="n.id"
        >
          <!-- <img :src="n.user.profile_photo_url" class="size-16 rounded-full" alt="" /> -->
          <div class="flex w-full" v-if="n.user_id == $page.props.auth.user.id">
            <div class="w-1/2"></div>
            <div
              class="w-1/2 flex py-1 px-3 rounded-md items-center justify-between bg-sky-100"
            >
              <span class="flex flex-col">
                <p class="text-lg font-bold first-letter:uppercase">{{ n.note }}</p>
                <p class="italic text-xs">
                  {{ new Date(n.created_at).toISOString().split("T")[0] }}
                </p>
              </span>
              <div>
                <Button
                  icon="fa-solid fa-pencil"
                  text
                  severity="info"
                  @click="editMode(n)"
                />
                <Button
                  icon="fa-solid fa-trash"
                  text
                  severity="danger"
                  @click="eliminar(n)"
                />
              </div>
            </div>
          </div>
          <div class="flex w-full" v-else>
            <div
              class="w-1/2 flex py-1 px-3 rounded-md items-center border justify-between bg-gray-300"
            >
              <span class="flex flex-col">
                <p class="text-lg font-bold first-letter:uppercase">{{ n.note }}</p>
                <p class="italic text-xs">
                  {{ n.user.name }} -
                  {{ new Date(n.created_at).toISOString().split("T")[0] }}
                </p>
              </span>
            </div>
            <div class="w-1/2"></div>
          </div>
          <!-- <div class="flex flex-col gap-y-2 w-full">
            <h2 class="font-bold text-2xl">{{ n.user.name }}</h2>
            <div class="w-full flex flex-col">
              <p>{{ n.note }}</p>
            </div>
          </div> -->
        </div>
        <div v-if="loading" class="flex justify-center items-center">
          <Loading />
        </div>
        <div
          class="flex justify-center flex-col items-center"
          v-else
          v-if="notas.length == 0"
        >
          <Logo></Logo>
          <p class="font-semibold text-xl">Serivicio sin notas</p>
        </div>
      </div>
      <div class="flex gap-x-2 px-2">
        <Input type="textarea" class="w-full" :rowsTextarea="2" v-model="note"></Input>
        <Button
          label="Guardar"
          severity="success"
          class="!h-12"
          v-if="!noteEditMode"
          icon="pi pi-send"
          @click="sendNote"
        />
        <Button
          v-else
          label="Editar"
          severity="info"
          icon="pi pi-send"
          class="!h-12"
          @click="edit"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Modal from "./Modal.vue";
import Input from "./Input.vue";
import axios from "axios";
import Logo from "../logo.vue";
import Loading from "../Loading.vue";

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
const loading = ref(false);
const note = ref("");

const sendNote = () => {
  axios
    .post(route("notes.store"), {
      note: note.value,
      booking_service_id: props.service.id,
    })
    .then((response) => {
      note.value = "";
      getNotes();
    });
};

const eliminar = (n) => {
  axios.delete(route("notes.destroy", n.id)).then((response) => {
    getNotes();
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
      getNotes();
      note.value = "";
      noteEditMode.value = false;
      noteSelected.value = null;
    });
};

const getNotes = () => {
  loading.value = true;
  axios
    .get(route("notes.index", { booking_service_id: props.service.id }))
    .then((response) => {
      notas.value = response.data.notes;
      loading.value = false;
    });
};

onMounted(() => {
  getNotes();
});
</script>

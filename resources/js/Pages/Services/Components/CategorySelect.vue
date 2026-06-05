<template>
  <div>
    <label class="mb-0.5 font-bold block">Categoría</label>
    <div class="flex gap-2">
      <div class="flex-1">
        <Input
          type="dropdown"
          v-model="model"
          :options="categories"
          optionLabel="title"
          optionValue="id"
          placeholder="Selecciona una categoría"
          emptyMessage="Sin categorías. Crea una con Gestionar."
        >
          <template #optionDropdown="{ slotProps }">
            <div class="flex items-center gap-2">
              <span
                class="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0"
                :style="{ backgroundColor: slotProps.option.color || '#e5e7eb' }"
              ></span>
              <i v-if="slotProps.option.icon" :class="slotProps.option.icon" class="text-gray-600 w-4 text-center"></i>
              <span>{{ slotProps.option.title }}</span>
            </div>
          </template>
        </Input>
      </div>
      <Button
        type="button"
        title="Gestionar categorías"
        label="Gestionar"
        icon="fa-solid fa-gear"
        severity="secondary"
        outlined
        class="!h-9 shrink-0"
        @click="openManage"
      />
    </div>

    <Modal v-model:visible="manageVisible" width="640px" close-on-escape>
      <template #icon>
        <i class="fa-solid fa-tags text-rose-500"></i>
      </template>
      <template #title>
        <span class="text-lg font-bold">Gestionar Categorías</span>
      </template>

      <div class="p-6 space-y-6">
        <!-- Formulario crear / editar -->
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
          <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
            <i class="fa-solid" :class="editor ? 'fa-pencil text-blue-500' : 'fa-plus text-emerald-500'"></i>
            {{ editor ? 'Editar categoría' : 'Nueva categoría' }}
          </h3>

          <Input
            label="Título"
            v-model="categoryForm.title"
            placeholder="Ej: Playas, Islas, Aventura..."
            :error-message="errors.title?.[0]"
          />

          <!-- Color -->
          <div>
            <label class="mb-1 font-bold block text-sm">Color</label>
            <div class="flex items-center gap-3 flex-wrap">
              <ColorPicker v-model="pickerColor" format="hex" />
              <span
                class="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-gray-200 bg-white text-sm font-mono"
              >
                <span class="w-4 h-4 rounded-full border border-gray-300" :style="{ backgroundColor: categoryForm.color }"></span>
                {{ categoryForm.color || '—' }}
              </span>
              <div class="flex items-center gap-1.5">
                <button
                  v-for="preset in colorPresets"
                  :key="preset"
                  type="button"
                  @click="categoryForm.color = preset"
                  class="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                  :class="categoryForm.color === preset ? 'ring-2 ring-offset-1 ring-gray-800' : ''"
                  :style="{ backgroundColor: preset }"
                  :title="preset"
                ></button>
              </div>
            </div>
          </div>

          <!-- Icono -->
          <div>
            <label class="mb-1 font-bold block text-sm">Icono</label>
            <div class="grid grid-cols-8 gap-1.5 bg-white border border-gray-200 rounded-lg p-2">
              <button
                v-for="icon in iconOptions"
                :key="icon"
                type="button"
                @click="categoryForm.icon = icon"
                class="h-9 flex items-center justify-center rounded-md border transition-all"
                :class="categoryForm.icon === icon
                  ? 'border-gray-800 bg-gray-900 text-white'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-100'"
                :title="icon"
              >
                <i :class="icon"></i>
              </button>
            </div>
            <Input
              v-model="categoryForm.icon"
              placeholder="Clase FontAwesome (ej: fa-solid fa-star)"
              class="mt-2"
            />
          </div>

          <div class="flex justify-end gap-2">
            <Button
              v-if="editor"
              type="button"
              label="Cancelar"
              icon="fa-solid fa-xmark"
              severity="secondary"
              outlined
              class="!h-9"
              @click="resetForm"
            />
            <Button
              type="button"
              :label="editor ? 'Actualizar' : 'Agregar'"
              :icon="editor ? 'fa-solid fa-save' : 'fa-solid fa-plus'"
              severity="success"
              class="!h-9"
              :loading="saving"
              :disabled="!categoryForm.title"
              @click="saveCategory"
            />
          </div>
        </div>

        <!-- Listado de categorías -->
        <div>
          <h3 class="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <i class="fa-solid fa-list text-gray-500"></i>
            Categorías existentes ({{ categories.length }})
          </h3>
          <div v-if="categories.length === 0" class="text-sm text-gray-500 italic py-6 text-center">
            Aún no hay categorías. Crea la primera arriba.
          </div>
          <div v-else class="space-y-2 max-h-64 overflow-y-auto pr-1">
            <div
              v-for="category in categories"
              :key="category.id"
              class="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2"
            >
              <div class="flex items-center gap-3">
                <span
                  class="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                  :style="{ backgroundColor: category.color || '#9ca3af' }"
                >
                  <i v-if="category.icon" :class="category.icon"></i>
                  <i v-else class="fa-solid fa-tag"></i>
                </span>
                <span class="font-medium text-gray-900">{{ category.title }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Button
                  type="button"
                  title="Editar"
                  icon="fa-solid fa-pencil"
                  severity="secondary"
                  text
                  rounded
                  @click="editCategory(category)"
                />
                <Button
                  type="button"
                  title="Eliminar"
                  icon="fa-solid fa-trash"
                  severity="danger"
                  text
                  rounded
                  @click="deleteCategory(category)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button type="button" label="Cerrar" icon="fa-solid fa-xmark" severity="secondary" outlined class="!h-9" @click="manageVisible = false" />
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "@/Components/Customs/Input.vue";
import Modal from "@/Components/Customs/Modal.vue";
import Button from "primevue/button";
import ColorPicker from "primevue/colorpicker";
import { alerts } from "@/composable/toasts";

const { toast } = alerts();

const model = defineModel();

const categories = ref([]);
const manageVisible = ref(false);
const editor = ref(false);
const saving = ref(false);
const errors = ref({});

const categoryForm = ref({ id: null, title: "", color: "#0ea5e9", icon: "" });

const colorPresets = [
  "#0ea5e9",
  "#14b8a6",
  "#6366f1",
  "#f97316",
  "#ef4444",
  "#22c55e",
  "#eab308",
  "#ec4899",
];

const iconOptions = [
  "fa-solid fa-umbrella-beach",
  "fa-solid fa-water",
  "fa-solid fa-mountain-sun",
  "fa-solid fa-city",
  "fa-solid fa-utensils",
  "fa-solid fa-ship",
  "fa-solid fa-anchor",
  "fa-solid fa-person-swimming",
  "fa-solid fa-fish",
  "fa-solid fa-tree",
  "fa-solid fa-sun",
  "fa-solid fa-map-location-dot",
  "fa-solid fa-plane",
  "fa-solid fa-bus",
  "fa-solid fa-car",
  "fa-solid fa-bicycle",
  "fa-solid fa-camera",
  "fa-solid fa-binoculars",
  "fa-solid fa-person-hiking",
  "fa-solid fa-campground",
  "fa-solid fa-music",
  "fa-solid fa-martini-glass",
  "fa-solid fa-heart",
  "fa-solid fa-star",
];

const pickerColor = computed({
  get: () => (categoryForm.value.color || "").replace("#", ""),
  set: (value) => {
    categoryForm.value.color = value ? `#${value}` : "";
  },
});

const fetchCategories = async () => {
  const { data } = await axios.get(route("serviceCategories.index"));
  categories.value = data;
};

const openManage = () => {
  resetForm();
  manageVisible.value = true;
};

const resetForm = () => {
  editor.value = false;
  errors.value = {};
  categoryForm.value = { id: null, title: "", color: "#0ea5e9", icon: "" };
};

const editCategory = (category) => {
  editor.value = true;
  errors.value = {};
  categoryForm.value = {
    id: category.id,
    title: category.title,
    color: category.color || "#0ea5e9",
    icon: category.icon || "",
  };
};

const saveCategory = async () => {
  saving.value = true;
  errors.value = {};
  const payload = {
    title: categoryForm.value.title,
    color: categoryForm.value.color,
    icon: categoryForm.value.icon,
  };
  try {
    if (editor.value) {
      await axios.put(route("serviceCategories.update", categoryForm.value.id), payload);
      toast("success", "Categoría actualizada");
    } else {
      await axios.post(route("serviceCategories.store"), payload);
      toast("success", "Categoría creada");
    }
    await fetchCategories();
    resetForm();
  } catch (error) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors ?? {};
    } else {
      toast("error", "Error al guardar la categoría");
    }
  } finally {
    saving.value = false;
  }
};

const deleteCategory = (category) => {
  Swal.fire({
    title: "Eliminar categoría",
    text: `¿Seguro de eliminar "${category.title}"? Los servicios asociados quedarán sin categoría.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (!result.isConfirmed) {
      return;
    }
    try {
      await axios.delete(route("serviceCategories.destroy", category.id));
      if (model.value === category.id) {
        model.value = null;
      }
      if (editor.value && categoryForm.value.id === category.id) {
        resetForm();
      }
      await fetchCategories();
      toast("error", "Categoría eliminada");
    } catch (e) {
      toast("error", "No se pudo eliminar la categoría");
    }
  });
};

onMounted(fetchCategories);
</script>

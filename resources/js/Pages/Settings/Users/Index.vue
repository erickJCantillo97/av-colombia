<template>
  <div>
    <!-- Filtros por tipo de usuario -->
    <div class="mb-6">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="type in usersType"
          :key="type.value"
          @click="typeSelected = type.value"
          :class="[
            'px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 border-2',
            typeSelected == type.value
              ? `bg-${type.color}-100 border-${type.color}-500 text-${type.color}-700 shadow-md scale-105`
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm',
          ]"
        >
          <i :class="type.icon" class="mr-2"></i>
          {{ type.label }}
        </button>
      </div>
    </div>

    <!-- Tabla de usuarios -->
    <div class="bg-white rounded-xl overflow-hidden">
      <Datatable
        :columnas="filterColumns"
        :add
        :data
        routecreate="services.create"
        :actions="buttons"
      >
      </Datatable>
    </div>
  </div>

  <Modal v-model:visible="visible" width="90vw" close-on-escape>
    <template #title>
      <span class="text-xl font-bold"> {{ editor ? 'Editar' : 'Agregar' }} Usuario</span>
    </template>
    <template #icon>
      <i :class="editor ? 'fa-solid fa-pencil' : 'fa-solid fa-plus'" />
    </template>
    <div class="flex flex-col lg:flex-row gap-4 py-2">
      <!-- Información del Usuario -->
      <div class="lg:w-2/3 space-y-4">
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-user-circle text-rose-500"></i>
            Información del Usuario
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tipo de Usuario"
              v-model="form.rol"
              @value-change="selectedRol"
              type="dropdown"
              option-value="value"
              option-label="label"
              :options="roles"
            />
            <Input label="Nombre Completo" v-model="form.name" :error-message="form.errors.name" placeholder="Ej: Juan Pérez" />
            <Input label="Correo Electrónico" v-model="form.email" type="email" placeholder="correo@ejemplo.com" />
            <Input label="Teléfono" v-model="form.phone" placeholder="+57 300 123 4567" />
            <Input label="Contraseña" type="password" v-model="form.password" placeholder="Mínimo 8 caracteres" />
            <Input
              label="Confirmar Contraseña"
              type="password"
              v-model="form.password_confirmation"
              placeholder="Repite la contraseña"
            />
          </div>
        </div>
        <!-- QR Code -->
        <div
          class="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-6"
          v-if="!(form.rol == 'superadmin' || form.rol == 'admin' || form.rol == 'cordinador')"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
              <i class="fa-solid fa-qrcode text-teal-600"></i>
              Portafolio Digital
            </h3>
            <button @click="downloadQR" class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <i class="fa-solid fa-download"></i>
              <span>Descargar</span>
            </button>
          </div>
          <a target="_blank" id="qrCode" :href="form.url" class="flex flex-col items-center gap-3 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
            <qrcode-vue
              ref="qrCodeRef"
              :value="form.url" 
              :size="200" 
              level="L" 
              render-as="svg" 
              foreground="#064a59" 
              class="rounded-lg" 
               />
            <span class="text-sm font-medium text-gray-600">Escanea para ver el portafolio</span>
          </a>
        </div>
        <!-- Documentos (solo para vendedores) -->
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-6" v-if="form.rol == 'vendedor'">
          <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-file-pdf text-rose-500"></i>
            Documentos Requeridos
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Cámara de Comercio -->
            <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-rose-500 transition-colors p-4">
              <label for="upload" class="flex flex-col items-center gap-3 cursor-pointer">
                <div class="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <i class="fa-solid fa-building text-rose-600 text-xl"></i>
                </div>
                <span class="text-sm font-medium text-gray-700 text-center">
                  {{ form.camara ? form.camara.name : "Cámara de Comercio" }}
                </span>
                <span class="text-xs text-gray-500">Haz clic para subir (PDF)</span>
              </label>
              <input id="upload" accept=".pdf" @change="subirCamara" type="file" class="hidden" />
            </div>

            <!-- RUT -->
            <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors p-4">
              <label for="uploadRut" class="flex flex-col items-center gap-3 cursor-pointer">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i class="fa-solid fa-file-lines text-blue-600 text-xl"></i>
                </div>
                <span class="text-sm font-medium text-gray-700 text-center">
                  {{ form.rut ? form.rut.name : "RUT" }}
                </span>
                <span class="text-xs text-gray-500">Haz clic para subir (PDF)</span>
              </label>
              <input id="uploadRut" accept=".pdf" @change="subirRut" type="file" class="hidden" />
            </div>

            <!-- Certificado Bancario -->
            <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors p-4">
              <label for="uploadCuenta" class="flex flex-col items-center gap-3 cursor-pointer">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i class="fa-solid fa-money-check text-green-600 text-xl"></i>
                </div>
                <span class="text-sm font-medium text-gray-700 text-center">
                  {{ form.cuenta ? form.cuenta.name : "Certificado Bancario" }}
                </span>
                <span class="text-xs text-gray-500">Haz clic para subir (PDF)</span>
              </label>
              <input id="uploadCuenta" accept=".pdf" @change="subirCuenta" type="file" class="hidden" />
            </div>
          </div>
        </div>
      </div>

      <!-- Permisos -->
      <div class="lg:w-1/3">
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-4">
          <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-shield-halved text-purple-600"></i>
            Permisos
          </h3>
          <Input class="mb-4" v-model="search" placeholder="Buscar permisos...">
            <template #prefix>
              <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
            </template>
          </Input>
          <div class="max-h-96 overflow-y-auto space-y-2 pr-2">
            <button
              v-for="permiso in filterPermissions"
              :key="permiso.name"
              @click="selectPermmision(permiso.name)"
              :class="[
                'w-full px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all duration-200 border-2',
                form.permissions.includes(permiso.name)
                  ? 'bg-purple-100 border-purple-500 text-purple-700 shadow-sm'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
              ]"
            >
              <i :class="form.permissions.includes(permiso.name) ? 'fa-solid fa-check-circle' : 'fa-regular fa-circle'" class="mr-2"></i>
              {{ permiso.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        @click="submit"
        title="Guardar"
        severity="success"
        label="Guardar"
        outlined
        icon="fa-solid fa-save"
        class="!h-8"
      />
      <Button
        @click="visible = false"
        title="Cancel"
        severity="danger"
        label="Cancelar"
        outlined
        icon="fa-solid fa-times"
        class="!h-8"
      />
    </template>
  </Modal>
  <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import { Link, router, useForm } from "@inertiajs/vue3";
import ConfirmPopup from "primevue/confirmpopup";
import Modal from "@/Components/Customs/Modal.vue";
import { computed, ref } from "vue";
import Input from "@/Components/Customs/Input.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import QrcodeVue from "qrcode.vue";

const usersType = [
  { label: "Usuarios AV Colombia", value: "av", color: "green", icon: "fa-solid fa-user-shield" },
  { label: "Vendedores", value: "vendedor", color: "blue", icon: "fa-solid fa-user-tie" },
2];

const typeSelected = ref("vendedor");

const columns = ref([
  {
    header: "Nombre",
    field: "name",
    filter: true,
  },
  {
    header: "Tipo de Usuario",
    field: "rol",
    filter: true,
  },
  {
    header: "Correo",
    field: "email",
    filter: true,
  },
  {
    header: "Telefono",
    field: "phone",
    filter: true,
  },
  {
    header: "Cuenta Bancaria",
    field: "cuenta",
    filter: true,
    type: "html-custom",
    renderer: (row) => {
      if (row.cuenta == "/laravel/public/") return "No tiene Certificado";
      return `<a href="${row.cuenta}" class="text-sky-600 underline" target="_blank">Ver</a>`;
    },
  },
  {
    header: "RUT",
    field: "rut",
    filter: true,
    type: "html-custom",
    renderer: (row) => {
      if (row.rut == "/laravel/public/") return "No tiene RUT";
      return `<a href="${row.rut}" class="text-sky-600 underline" target="_blank">Ver</a>`;
    },
  },
  {
    header: "camara de comercio",
    field: "camara_comercio",
    filter: true,
    type: "html-custom",
    renderer: (row) => {
      if (row.camara_comercio == "/laravel/public/") return "No tiene camara comercio";
      return `<a href="${row.camara_comercio}" class="text-sky-600 underline" target="_blank">Ver</a>`;
    },
  },
  {
    header: "URL Portafolio",
    field: "url",
  },
]);

const toast = useToast();

const confirm = useConfirm();

const editor = ref(false);

const search = ref();

const qrCodeRef = ref();

const filterPermissions = computed(() => {
  return props.permisos.filter((x) => !search.value || x.name.includes(search.value));
});

const form = useForm({
  id: null,
  name: "",
  phone: "",
  email: "",
  password: "",
  url: "",
  rol: "",
  password_confirmation: "",
  permissions: [],
  camara: null,
  rut: null,
  cuenta: null,
});

const visible = ref(false);

const add = {
  action: () => {
    form.reset();
    editor.value = false;
    visible.value = true;
  },
};

const buttons = [
  {
    action: (data) => {
      form.reset();
      visible.value = true;
      editor.value = true;
      form.name = data.name;
      form.email = data.email;
      form.rol = data.rol;
      form.id = data.id;
      form.url = data.url;
      form.permissions = data.permissions.map((x) => x.name);
      form.phone = data.phone;
    },
    severity: "secondary",
    icon: "fa-solid fa-pencil text-sm",
  },
  {
    action: (data, event) => {
      confirm.require({
        target: event.currentTarget,
        message: "Seguro de Eliminar el Usuario " + data.name + "?",
        icon: "fa-solid fa-exclamation-triangle",
        rejectClass: "p-button-secondary p-button-outlined p-button-sm",
        acceptClass: "p-button-sm p-button-danger",
        rejectLabel: "Cancelar",
        acceptLabel: "Eliminar",
        accept: () => {
          router.delete(route("users.destroy", data.id), {
            onSuccess: () => {
              toast.add({
                severity: "error",
                icon: "fa-solid fa-trash-can",
                summary: "¡Accion realizada!",
                detail: "Usuario eliminado con exito",
                group: "customTooltipDataTable",
                life: 5000,
              });
            },
          });
        },
      });
    },
    severity: "danger",
    icon: "fa-regular fa-trash-can text-sm",
  },
  // { event: 'deleteClic', severity: 'danger', icon: 'fa-regular fa-trash-can', class: '!h-8', text: true, outlined: false, rounded: false, show: hasPermission('projects delete') },
];

const props = defineProps({
  users: Array,
  permisos: Array,
});

const submit = () => {
  let formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("password_confirmation", form.password_confirmation);
  formData.append("phone", form.phone);
  formData.append("rol", form.rol);
  formData.append("permissions", form.permissions);
  formData.append("camara", form.camara);
  formData.append("rut", form.rut);
  formData.append("cuenta", form.cuenta);
  if (editor.value) {
    router.post(route("users.update", form.id), formData, {
      onSuccess: () => {
        visible.value = false;
      },
    });
  } else {
    form.post(route("users.store"), {
      onSuccess: () => {
        visible.value = false;
      },
    });
  }
};

const roles = [
  { label: "Super Administrador", value: "superadmin" },
  { label: "Administrador", value: "admin" },
  { label: "Cordinador", value: "cordinador" },
  { label: "Vendedor", value: "vendedor" },
];

function selectedRol() {
  if (form.rol == "superadmin") {
    form.permissions = props.permisos.map((x) => x.name);
  } else if (form.rol == "admin") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return !(x.includes("usuarios") || x.includes("pagos") || x.includes("entradas"));
      })
      .map((x) => x.name);
  } else if (form.rol == "cordinador") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  } else if (form.rol == "vendedor") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  } else if (form.rol == "proveedor") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  } else if (form.rol == "hotel") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  } else if (form.rol == "agencia") {
    form.permissions = props.permisos
      .filter((x) => {
        x = x.name;
        return (
          !(
            x.includes("usuarios") ||
            x.includes("pagos") ||
            x.includes("entradas") ||
            x.includes("eliminar")
          ) && x != "crear experiencas"
        );
      })
      .map((x) => x.name);
  }
}

function selectPermmision(permiso) {
  if (form.permissions.includes(permiso)) {
    form.permissions = form.permissions.filter((x) => x != permiso);
  } else {
    form.permissions.push(permiso);
  }
}

const data = computed(() => {
  if (typeSelected.value == "av") {
    return props.users.filter(
      (user) =>
        user.rol == "superadmin" || user.rol == "admin" || user.rol == "cordinador"
    );
  }
  return props.users.filter((user) => user.rol == typeSelected.value);
});

const filterColumns = computed(() => {
  if (typeSelected.value == "av") {
    return columns.value.filter(
      (x) =>
        x.field != "camara_comercio" &&
        x.field != "rut" &&
        x.field != "cuenta" &&
        x.field != "url"
    );
  }
  return columns.value;
});

const subirCamara = (e) => {
  form.camara = e.target.files[0];
};
const subirRut = (e) => {
  form.rut = e.target.files[0];
};
const subirCuenta = (e) => {
  form.cuenta = e.target.files[0];
};

const downloadQR = () => {
  if (!form.url) {
    toast.add({
      severity: "warn",
      icon: "fa-solid fa-exclamation-triangle",
      summary: "Advertencia",
      detail: "No hay código QR para descargar",
      group: "customTooltipDataTable",
      life: 3000,
    });
    return;
  }

  try {
    // Obtener el elemento por ID
    const qrElement = document.getElementById('qrCode');
    if (!qrElement) {
      throw new Error('No se encontró el elemento QR');
    }

    // Crear un canvas basado en las dimensiones del elemento
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Obtener las dimensiones del elemento
    const rect = qrElement.getBoundingClientRect();
    const scale = 2; // Factor de escala para mejor calidad
    
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    
    // Escalar el contexto para mejor calidad
    ctx.scale(scale, scale);
    
    // Función para capturar el elemento como imagen
    const captureElement = () => {
      // Crear un objeto de datos del elemento
      const svgElement = qrElement.querySelector('svg');
      if (!svgElement) {
        throw new Error('No se encontró el SVG dentro del elemento');
      }
      
      // Obtener el SVG como string
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      // Crear imagen desde SVG
      const img = new Image();
      img.onload = () => {
        // Limpiar canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, rect.width, rect.height);
        
        // Calcular posición centrada para el QR
        const qrSize = 200; // Tamaño del QR según el componente
        const x = (rect.width - qrSize) / 2;
        const y = 10; // Pequeño margen superior
        
        // Dibujar el QR
        ctx.drawImage(img, x, y, qrSize, qrSize);
        
        // Agregar el texto "Scanear QR" debajo
        ctx.fillStyle = '#6b7280'; // Color gris del texto
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Scanear QR', rect.width / 2, y + qrSize + 20);
        
        // Convertir canvas a blob y descargar
        canvas.toBlob((blob) => {
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `qr-portafolio-${form.name || 'usuario'}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Limpiar URLs
          URL.revokeObjectURL(downloadUrl);
          URL.revokeObjectURL(url);
          
          toast.add({
            severity: "success",
            icon: "fa-solid fa-download",
            summary: "Descarga exitosa",
            detail: "Código QR descargado correctamente",
            group: "customTooltipDataTable",
            life: 3000,
          });
        }, 'image/png');
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        throw new Error('Error al cargar la imagen SVG');
      };
      
      img.src = url;
    };
    
    captureElement();
    
  } catch (error) {
    console.error('Error al descargar QR:', error);
    toast.add({
      severity: "error",
      icon: "fa-solid fa-exclamation-circle",
      summary: "Error",
      detail: "Error al descargar el código QR: " + error.message,
      group: "customTooltipDataTable",
      life: 3000,
    });
  }
};
</script>

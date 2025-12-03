<template>
    <div class="bg-white rounded-xl">
        <Datatable :columnas="columns" :add :data="ticketTypes" :actions="buttons">
        </Datatable>
    </div>

    <Modal v-model:visible="visible" width="900px" close-on-escape>
        <template #title>
            <span class="text-xl font-bold">
                {{ editor ? 'Editar' : 'Agregar' }} Tipo de Ticket
            </span>
        </template>
        <template #icon>
            <i class="fa-solid fa-plus" v-if="!editor" />
            <i class="fa-solid fa-pencil" v-else />
        </template>

        <div class="space-y-6 py-2">
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6">
                <!-- Nombre del tipo de ticket -->
                <div>
                    <h3 class="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <i class="fa-solid fa-tag text-rose-500"></i>
                        Información del Ticket
                    </h3>
                    <Input label="Nombre del Tipo de Ticket" v-model="form.name" :error-message="form.errors.name"
                        placeholder="Ej: Ticket VIP, Ticket Estándar, etc." />
                </div>

                <!-- Selección de servicios -->
                <div class="w-full">
                    <h3 class="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <i class="fa-solid fa-list-check text-blue-500"></i>
                        Servicios Asociados
                    </h3>
                    <Input v-model="serviceSearch" placeholder="Buscar servicios..." class="mb-3">
                        <template #prefix>
                            <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                        </template>
                    </Input>

                    <div class="max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-xl p-3">
                        <div class="space-y-2">
                            <button
                                v-for="service in filteredServices" 
                                :key="service.id"
                                @click="toggleService(service.id)" 
                                :class="[
                                    'w-full p-3 rounded-lg border-2 transition-all duration-200 text-left',
                                    form.services.includes(service.id)
                                        ? 'bg-blue-50 border-blue-500 shadow-sm'
                                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                ]">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium text-sm text-gray-900">{{ service.title }}</span>
                                    <i v-if="form.services.includes(service.id)"
                                        class="fa-solid fa-check-circle text-blue-600"></i>
                                    <i v-else class="fa-regular fa-circle text-gray-400"></i>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div v-if="form.errors.services" class="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        {{ form.errors.services }}
                    </div>

                    <!-- Servicios seleccionados -->
                    <div v-if="selectedServices.length > 0" class="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                        <h4 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <i class="fa-solid fa-check-double text-blue-600"></i>
                            Servicios Seleccionados ({{ selectedServices.length }})
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="service in selectedServices" :key="service.id"
                                class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-sm hover:bg-blue-600 transition-colors">
                                {{ service.title }}
                                <button @click="toggleService(service.id)"
                                    class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
                                    <i class="fa-solid fa-xmark text-xs"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template #footer>
            <Button @click="submit" title="Guardar" severity="success" label="Guardar" outlined icon="fa-solid fa-save"
                class="!h-9" :loading="form.processing" />
            <Button @click="visible = false" title="Cancelar" severity="danger" label="Cancelar" outlined
                icon="fa-solid fa-times" class="!h-9" />
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
import Button from "primevue/button";

const props = defineProps({
    ticketTypes: Array,
    services: Array,
});

const columns = [
    {
        header: 'Tipo de Ticket',
        field: 'name',
        filter: true,
    },
    {
        header: 'Servicios Asociados',
        field: 'services_count',
        filter: false,
        type: 'html-custom',
        renderer: (row) => {
            const count = row.services ? row.services.length : 0;
            return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ${count} servicio${count !== 1 ? 's' : ''}
              </span>`;
        },
    },
    {
        header: 'Servicios',
        field: 'services_list',
        filter: false,
        type: 'html-custom',
        renderer: (row) => {
            if (!row.services || row.services.length === 0) {
                return '<span class="text-gray-500 italic">Sin servicios</span>';
            }
            const servicesList = row.services.map(s => s.title).join(', ');
            const truncated = servicesList.length > 50 ? servicesList.substring(0, 50) + '...' : servicesList;
            return `<span class="text-sm" title="${servicesList}">${truncated}</span>`;
        },
    },
];

const toast = useToast();
const confirm = useConfirm();
const editor = ref(false);
const visible = ref(false);
const serviceSearch = ref('');

const form = useForm({
    id: null,
    name: "",
    services: [],
});

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
            form.id = data.id;
            form.name = data.name;
            form.services = data.services ? data.services.map(s => s.id) : [];
        },
        severity: "secondary",
        icon: "fa-solid fa-pencil text-sm",
    },
    {
        action: (data, event) => {
            confirm.require({
                target: event.currentTarget,
                message: "¿Seguro de eliminar el tipo de ticket " + data.name + "?",
                icon: "fa-solid fa-exclamation-triangle",
                rejectClass: "p-button-secondary p-button-outlined p-button-sm",
                acceptClass: "p-button-sm p-button-danger",
                rejectLabel: "Cancelar",
                acceptLabel: "Eliminar",
                accept: () => {
                    router.delete(route("ticketTypes.destroy", data.id), {
                        onSuccess: () => {
                            toast.add({
                                severity: "error",
                                icon: "fa-solid fa-trash-can",
                                summary: "¡Acción realizada!",
                                detail: "Tipo de ticket eliminado con éxito",
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
];

const filteredServices = computed(() => {
    if (!serviceSearch.value) {
        return props.services;
    }
    return props.services.filter(service =>
        service.title.toLowerCase().includes(serviceSearch.value.toLowerCase())
    );
});

const selectedServices = computed(() => {
    return props.services.filter(service => form.services.includes(service.id));
});

const toggleService = (serviceId) => {
    if (form.services.includes(serviceId)) {
        form.services = form.services.filter(id => id !== serviceId);
    } else {
        form.services.push(serviceId);
    }
};

const submit = () => {
    if (editor.value) {
        form.put(route("ticketTypes.update", form.id), {
            onSuccess: () => {
                visible.value = false;
                toast.add({
                    severity: "success",
                    icon: "fa-solid fa-check",
                    summary: "¡Éxito!",
                    detail: "Tipo de ticket actualizado con éxito",
                    group: "customTooltipDataTable",
                    life: 3000,
                });
            },
        });
    } else {
        form.post(route("ticketTypes.store"), {
            onSuccess: () => {
                visible.value = false;
                toast.add({
                    severity: "success",
                    icon: "fa-solid fa-check",
                    summary: "¡Éxito!",
                    detail: "Tipo de ticket creado con éxito",
                    group: "customTooltipDataTable",
                    life: 3000,
                });
            },
        });
    }
};
</script>
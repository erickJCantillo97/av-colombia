<template>
    <div class="h-[99vh]">
        <Datatable :columnas="columns" :add :data="ticketTypes" :actions="buttons">
        </Datatable>
    </div>

    <Modal v-model:visible="visible" width="70vw" close-on-escape>
        <template #title>
            <span class="text-xl font-bold white-space-nowrap">
                {{ editor ? 'Editar' : 'Agregar' }} Tipo de Ticket
            </span>
        </template>
        <template #icon>
            <i class="fa-solid fa-plus" v-if="!editor" />
            <i class="fa-solid fa-pencil" v-else />
        </template>

        <div class="flex gap-x-3 py-2">
            <div class="grid grid-cols-1 w-full shadow-2xl border rounded-md gap-4 p-6">
                <!-- Nombre del tipo de ticket -->
                <Input label="Nombre del Tipo de Ticket" v-model="form.name" :error-message="form.errors.name"
                    placeholder="Ej: Ticket VIP, Ticket Estándar, etc." />

                <!-- Selección de servicios -->
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Servicios Asociados
                    </label>
                    <Input v-model="serviceSearch" placeholder="Buscar servicios..." class="mb-3" />

                    <div class="max-h-64 overflow-y-auto border border-gray-200 rounded-md p-2">
                        <div class="grid grid-cols-1 gap-2">
                            <div v-for="service in filteredServices" :key="service.id"
                                @click="toggleService(service.id)" :class="{
                                    'bg-blue-100 border-blue-500': form.services.includes(service.id),
                                    'bg-gray-50 border-gray-200': !form.services.includes(service.id),
                                }" class="p-3 rounded-md cursor-pointer border-2 hover:bg-blue-50 transition-colors duration-200">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium text-sm">{{ service.title }}</span>
                                    <i v-if="form.services.includes(service.id)"
                                        class="fa-solid fa-check text-blue-600"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="form.errors.services" class="text-red-500 text-sm mt-1">
                        {{ form.errors.services }}
                    </div>

                    <!-- Servicios seleccionados -->
                    <div v-if="selectedServices.length > 0" class="mt-4">
                        <h4 class="text-sm font-medium text-gray-700 mb-2">
                            Servicios Seleccionados ({{ selectedServices.length }})
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="service in selectedServices" :key="service.id"
                                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {{ service.title }}
                                <button @click="toggleService(service.id)"
                                    class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 hover:bg-blue-300">
                                    <i class="fa-solid fa-times text-xs"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template #footer>
            <Button @click="submit" title="Guardar" severity="success" label="Guardar" outlined icon="fa-solid fa-save"
                class="!h-8" :loading="form.processing" />
            <Button @click="visible = false" title="Cancelar" severity="danger" label="Cancelar" outlined
                icon="fa-solid fa-times" class="!h-8" />
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
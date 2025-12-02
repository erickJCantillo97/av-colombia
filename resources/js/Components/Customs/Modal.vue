<script setup>
const props = defineProps({
    width: {
        type: String,
        default: '60rem'
    },
    footer: {
        type: Boolean,
        default: true
    },
    maximizable: {
        type: Boolean,
        default: false
    },
    closable: {
        type: Boolean,
        default: true
    },
    closeOnEscape: {
        type: Boolean,
        default: true
    },
    icon: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    baseZIndex: {
        type: Number,
        default: null
    },
    autoZIndex: {
        type: Boolean,
        default: true
    },
    severity: {
        type: String,
        default: 'primary'
    },
    modal: {
        type: Boolean,
        default: true
    }
})

const visible = defineModel()
</script>

<template>
    <Dialog 
        v-model:visible="visible" 
        :maximizable="maximizable" 
        :modal="modal" 
        :closable="closable"
        :closeOnEscape="closeOnEscape" 
        :autoZIndex="autoZIndex" 
        :baseZIndex="baseZIndex" 
        :style="{ width: props.width }"
        :breakpoints="{ '1199px': '75vw', '575px': '95vw' }" 
        :pt="{
            mask: { 
                class: 'backdrop-blur-sm bg-black/40 animate-fade-in' 
            },
            root: { 
                class: 'rounded-xl shadow-2xl animate-modal-up overflow-hidden' 
            },
            header: { 
                class: 'bg-white !p-0 rounded-t-xl border-b-0' 
            },
            headerTitle: {
                class: 'flex-1'
            },
            headerActions: { 
                class: '!text-gray-600 hover:!text-gray-800 !p-2 !gap-2' 
            },
            closeButton: {
                class: 'w-8 h-8 !rounded-lg hover:!bg-gray-100 transition-colors duration-200'
            },
            maximizeButton: {
                class: 'w-8 h-8 !rounded-lg hover:!bg-gray-100 transition-colors duration-200'
            },
            content: { 
                class: '!p-0 bg-white' 
            },
            footer: { 
                class: '!p-4 !h-min !items-end !flex !justify-end bg-gray-50 border-t border-gray-200 gap-2' 
            }
        }"
    >
        <template #header>
            <div class="w-full">
                <slot name="header">
                    <div class="flex items-center gap-3 px-6 py-4">
                        <i v-if="icon" :class="[icon, 'text-xl text-blue-600']" />
                        <slot name="icon" />
                        <span v-if="title" class="text-lg font-semibold text-gray-900 truncate">
                            {{ title }}
                        </span>
                        <slot name="title" />
                    </div>
                </slot>
            </div>
        </template>
        
        <template #default>
            <div class="modal-content">
                <slot />
            </div>
        </template>
        
        <template #footer v-if="footer">
            <slot name="footer" />
        </template>
        
        <template #closeicon>
            <i class="fa-solid fa-xmark text-lg"></i>
        </template>
        
        <template #maximizeicon="{ maximized }">
            <i :class="maximized ? 'fa-solid fa-compress' : 'fa-solid fa-expand'" class="text-base"></i>
        </template>
    </Dialog>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes modalUp {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-fade-in {
    animation: fadeIn 0.2s ease-out;
}

.animate-modal-up {
    animation: modalUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-content {
    position: relative;
}

/* Mejoras para el scroll dentro del modal */
.modal-content :deep(*::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
}

.modal-content :deep(*::-webkit-scrollbar-track) {
    background: #f1f5f9;
    border-radius: 10px;
}

.modal-content :deep(*::-webkit-scrollbar-thumb) {
    background: #cbd5e1;
    border-radius: 10px;
}

.modal-content :deep(*::-webkit-scrollbar-thumb:hover) {
    background: #94a3b8;
}
</style>

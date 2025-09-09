<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Ubicación</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
                label="Dirección" 
                v-model="form.address_line_1"
                :error-message="form.errors.address_line_1" 
                required 
            />

            <Input 
                label="Ciudad" 
                v-model="form.city" 
                :error-message="form.errors.city" 
                required 
            />

            <Input 
                label="Departamento/Estado" 
                v-model="form.state"
                :error-message="form.errors.state" 
                required 
            />

            <Input 
                label="País" 
                v-model="form.country" 
                :error-message="form.errors.country"
                required 
            />

            <Input 
                label="Código Postal" 
                v-model="form.postal_code"
                :error-message="form.errors.postal_code" 
                required 
            />

            <div></div>

            <Input 
                label="Latitud (Opcional)" 
                v-model="form.latitude" 
                type="text" 
                step="any"
                :error-message="form.errors.latitude" 
            />

            <Input 
                label="Longitud (Opcional)" 
                v-model="form.longitude" 
                type="text" 
                step="any"
                :error-message="form.errors.longitude" 
            />
            
            <div class="md:col-span-2">
                <MapSelector 
                    v-model:latitude="form.latitude"
                    v-model:longitude="form.longitude"
                    v-model:address="form.address_line_1"
                    v-model:city="form.city"
                    v-model:state="form.state"
                    v-model:country="form.country"
                    :address="form.address_line_1"
                />
            </div>
        </div>

        <div class="flex gap-x-4 mt-8 justify-between">
            <Button 
                @click="$emit('cancel')" 
                title="Cancelar" 
                severity="danger" 
                label="Cancelar"
                icon="fa-solid fa-times" 
                class="!h-9 w-full" 
            />
            <Button 
                @click="$emit('submit')" 
                title="Guardar" 
                severity="success" 
                :loading="form.processing"
                label="Guardar" 
                icon="fa-solid fa-save" 
                class="!h-9 w-full" 
            />
        </div>
    </div>
</template>

<script setup>
import Input from "@/Components/Customs/Input.vue";
import MapSelector from "@/Components/Customs/MapSelector.vue";
import Button from "primevue/button";

const props = defineProps({
    form: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['submit', 'cancel']);
</script>

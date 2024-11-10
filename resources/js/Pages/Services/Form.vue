<script setup>
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { router, useForm } from '@inertiajs/vue3';
import { root } from 'postcss';
import AutoComplete from 'primevue/autocomplete';
import MultiSelect from 'primevue/multiselect';
import { onMounted, ref } from 'vue';
import { alerts } from '@/composable/toasts';
const { toast } = alerts()

const op = ref();
const includes = ref()
const noIncludes = ref()

const props = defineProps({
    features: Array,
    included: Array,
    service: Object
})

const feature = ref({
    name: '',
    color: ''
});

onMounted(() => {
    if (props.service) {
        form.title = props.service.title;
        form.description = props.service.description;
        form.adults_price = props.service.adults_price;
        form.boys_price = props.service.boys_price;
        form.days = JSON.parse(props.service.days);
        form.includes = JSON.parse(props.service.includes);
        form.notIncludes = JSON.parse(props.service.notIncludes);

    }
})

const includeName = ref();
const noIncludeName = ref();

const addincludes = () => {
    if (!includeLabel.value) return;
    if (!form.includes.includes(includeLabel.value)) {
        form.includes.push(includeLabel.value)
    }
    includeLabel.value = ''

}

const addNoIncludes = () => {
    if (!noIncludeName.value || form.includes.includes(noIncludeName.value)) return;
    if (!form.notIncludes.includes(noIncludeName.value)) {
        form.notIncludes.push(noIncludeName.value)
    }
    noIncludeName.value = ''
}

const removeIncludes = (index) => {
    //obtener el index del elemento a eliminar y eliminarlo
    form.includes.splice(index, 1)
}

const removeNotIncludes = (index) => {
    form.notIncludes.splice(index, 1)
}


const form = useForm({
    title: '',
    description: '',
    features: [],
    boys_price: '',
    adults_price: '',
    images: [],
    days: [],
    includes: [],
    notIncludes: []

});

const files = ref([])

const submit = () => {
    let data = [];
    if (files.value) {
        console.log(files.value)
        files.value.getFiles().forEach((file) => data.push(file.file));
    }
    form.images = data;
    let included = form.includes;
    let notIncluded = form.notIncludes;
    form.days = JSON.stringify(form.days);
    form.notIncludes = JSON.stringify(form.notIncludes);
    form.includes = JSON.stringify(form.includes);
    if (props.service) {
        form.put(route('services.update', props.service.slug), {
            onSuccess: () => {
                visible.value = false
            },
            onError: (errror) => {
                toast('error', 'Error al actualizar el servicio: ' + error)
            }
        })
    } else {
        form.post(route('services.store'), {
            onSuccess: () => {
                form.reset();
                toast('success', 'Servicio creado con exito')
                router.visit(route('services.index'))
                visible.value = false
            },
            onError: (error) => {
                console.log(error)
                toast('error', 'Error al crear el servicio: ' + Object.values(error))
            }
        })
    }
    form.includes = included;
    form.notIncludes = notIncluded;
    
}

const includeLabel = ref('');

const includeSuggestions = ref(props.included);



const search = (includes) => {
    if (includes) {
        includeSuggestions.value = props.included.filter((x) => x.toLowerCase().includes(includeLabel.value.toLowerCase()))
    } else {
        includeSuggestions.value = props.included.filter((x) => x.toLowerCase().includes(noIncludeName.value.toLowerCase()))

    }
}
const days = [
    { name: 'Domingo', value: 0 },
    { name: 'Lunes', value: 1 },
    { name: 'Martes', value: 2 },
    { name: 'Miercoles', value: 3 },
    { name: 'Jueves', value: 4 },
    { name: 'Viernes', value: 5 },
    { name: 'Sabado', value: 6 },
];
</script>
<template>
    <AppLayout>

        <div class="p-4 space-y-4 h-full overflow-y-auto">
            <h1 class="text-3xl font-extrabold">Crear nuevo servicio</h1>
            <div class="space-y-5">
                <Input label="Titulo" v-model="form.title" :error-message="form.errors.title" />
                <div class="grid grid-cols-2 gap-4 my-4">
                    <Input label="Precio Adultos" type="number" min="0" currency="COP" :minFractionDigits="2"
                        :maxFractionDigits="2" v-model="form.adults_price"  :error-message="form.errors.adults_price"/>
                    <Input label="Precio niños" type="number" min="0" currency="COP" :minFractionDigits="2"
                        :maxFractionDigits="2" v-model="form.boys_price" :error-message="form.errors.boys_price" />
                </div>
                <div class="flex justify-between space-x-4">
                    <div class="w-full">
                        <label for="" class="text-md font-bold"> Dias de Atencion</label>
                        <div class="items-center grid grid-cols-3 gap-4">
                            <div v-for="(day, index) in days" class="flex items-center cursor-pointer">
                                <Checkbox :value="day.value" name="days" :inputId="`Day${index}`" v-model="form.days"
                                    class="mr-2" />
                                <label :for="`Day${index}`" class="cursor-pointer">{{ day.name }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <label for="" class="text-md font-bold">Descripción del Servicio</label>
                        <Editor v-model="form.description" :key="editor" editorStyle="height: 120px" />
                        <span class="text-xs text-red-400">{{form.errors.description}}</span>
                    </div>
                </div>

                <div class="flex justify-between space-x-4 items-center">
                    <div class="w-full shadow-md p-2 rounded-md">
                        <label for="" class="text-lg font-bold text-center ">Incluidos en El servicio</label>
                        <div class="flex space-x-2 overflow-y-auto w-full">
                            <AutoComplete @complete="search(true)" emptyMessage="Sin resultados"
                                :suggestions="includeSuggestions" dropdown @keyup.enter="addincludes" v-model="includeLabel"
                                class="w-full" pt:root="!w-full" pt:inputText="!w-full" />
                            <Button title="Añadir" @click="addincludes" severity="primary" label="Añadir"
                                icon="fa-solid fa-plus" class="!h-11" />
                        </div>
                        <div v-for="(feature, index) in form.includes"
                            class="py-1.5 px-3 flex justify-between my-2 text-nowrap text-sm font-bold text-emerald-700 rounded-lg border-b">
                            <p>
                                {{ index + 1 }}. {{ feature }}
                            </p>
                            <span @click="removeIncludes(index)" v-tooltip="'Quitar'" class="cursor-pointer"><i
                                    class="fa-solid fa-trash text-red-500"></i></span>
                        </div>
                    </div>
                    <div class="w-full shadow-md p-2 bg-gray-200 rounded-md">
                        <label for="" class="text-lg font-bold text-red-700">No Incluidos en El servicio</label>
                        <div class="flex justify-between space-x-2">
                            <AutoComplete dropdown @complete="search(false)" emptySearchMessage="Sin resultados"
                                :suggestions="includeSuggestions" @keyup.enter="addNoIncludes" v-model="noIncludeName"
                                class="w-full" pt:root="!w-full" pt:inputText="!w-full" />
                            <Button title="Añadir" @click="addNoIncludes" severity="primary" label="Añadir"
                                icon="fa-solid fa-plus" class="!h-11 " />
                        </div>
                        <div v-for="(feature, index) in form.notIncludes"
                            class="py-1.5 px-3 flex justify-between my-2 text-nowrap text-sm font-bold text-emerald-700 rounded-lg border-b border-white">
                            <p>
                                {{ index + 1 }}. {{ feature }}
                            </p>
                            <span @click="removeNotIncludes(index)" class="cursor-pointer"><i
                                    class="fa-solid fa-trash text-red-500"></i></span>
                        </div>
                    </div>

                </div>
                <div>
                    <label for="" class="text-md font-bold">Fotos</label>
                    <Input type="file-pond" v-model="files" />
                    <span class="text-red-500 text-xs -mt-1">{{form.errors.images}}</span>
                </div>
            </div>
            <div class="flex justify-between">
                <Button @click="submit" title="Save" severity="success" label="Enviar" outlined icon="fa-solid fa-save"
                    class="!h-8" />
                <Button @click="visible = false" title="Cancel" severity="danger" label="Cancel" outlined
                    icon="fa-solid fa-times" class="!h-8" />
            </div>
        </div>
    </AppLayout>
</template>
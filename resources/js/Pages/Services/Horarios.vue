<script setup>
import Input from '@/Components/Customs/Input.vue';
import Modal from '@/Components/Customs/Modal.vue';
import { useForm } from '@inertiajs/vue3';
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const props = defineProps({
    service: {
        type: Object,
        required: true,
    },
    availabilities: {
        type: Array,
        required: true,
    },
});

const formStart = useForm({
    availability_type: '',
    price_type: '',
    horarios: []
});

const showPrice = ref(false);



const form = useForm({
    service_id: props.service.id,
    name: '',
    start_date: '',
    end_date: '',
});

const show = ref(false);
const ingredient = ref('');

const submit = () => {
    axios.post(route('availability.store'), form.data()).then((response) => {
        addHorario(response.data.id);
        show.value = false;
    });
};

const submitStart = () => {
    formStart.horarios = horarios.value;
    formStart.put(route('update.start', props.service.slug));
    console.log(horarios.value)
};

const mapHorario = (time) => {
    return {
        start: {
            hours: time.start.split(':')[0],
            minutes: time.start.split(':')[1],
            seconds: 0
        },
        end: time.end == null ? null : {
            hours: time.end.split(':')[0],
            minutes: time.end.split(':')[1],
            seconds: 0
        }
    }
}

onMounted(() => {
    formStart.availability_type = props.service.availability_type;
    formStart.price_type = props.service.price_type;
    for (let availability of props.availabilities) {
        horarios.value.push({
            id: availability.id,
            name: availability.name,
            start_date: availability.start_date,
            end_date: availability.end_date,
            precios: availability.precies,
            days: [
                {
                    day: 'Lunes',
                    times: availability.horarios.filter(day => day.day == 'Lunes').map(time => mapHorario(time))

                },
                {
                    day: 'Martes',
                    times: availability.horarios.filter(day => day.day == 'Martes').map(time => mapHorario(time))
                },
                {
                    day: 'Miercoles',
                    times: availability.horarios.filter(day => day.day == 'Miercoles').map(time => mapHorario(time))

                },
                {
                    day: 'Jueves',
                    times: availability.horarios.filter(day => day.day == 'Jueves').map(time => mapHorario(time))
                },
                {
                    day: 'Viernes',
                    times: availability.horarios.filter(day => day.day == 'Viernes').map(time => mapHorario(time))

                },
                {
                    day: 'Sabado',
                    times: availability.horarios.filter(day => day.day == 'Sabado').map(time => mapHorario(time))
                },
                {
                    day: 'Domingo',
                    times: availability.horarios.filter(day => day.day == 'Domingo').map(time => mapHorario(time))

                },
                {
                    day: 'Festivo',
                    times: availability.horarios.filter(day => day.day == 'Festivo').map(time => mapHorario(time))

                }
            ]
        });

    }
})

const horarios = ref([])

const precios = ref([{
    min: '',
    max: '',
    duration: 1,
    duration_type: 'Horas',
    value: ''
}])


const addHorario = (id) => {
    horarios.value.push({
        id: id,
        name: form.name,
        start_date: form.start_date,
        end_date: form.end_date,
        days: [
            {
                day: 'Lunes',
                times: []
            },
            {
                day: 'Martes',
                times: []
            },
            {
                day: 'Miercoles',
                times: []
            },
            {
                day: 'Jueves',
                times: []
            },
            {
                day: 'Viernes',
                times: []
            },
            {
                day: 'Sabado',
                times: []
            },
            {
                day: 'Domingo',
                times: []
            },
            {
                day: 'Festivo',
                times: []
            }
        ]
    });
    form.reset();
};

const addPrecio = () => {
    precios.value.push({
        min: '',
        max: '',
        duration: 1,
        duration_type: 'Horas',
        price: ''
    });
};

const removePrecio = (index) => {
    if (precios.value.length == 1) return;
    precios.value.splice(index, 1);
};

const dias = ref([
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
])
const options = [
    { name: 'Horarios', value: 1 },
    { name: 'Precios', value: 2 },
];

const deleteHorario = (index) => {
    Swal.fire({
        title: "Estas Seguro?",
        text: `Eliminar este Horario!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: `Si, Eliminar!`
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(route('availability.destroy', horarios.value[index].id)).then(() => {
                horarios.value.splice(index, 1);
            });

        }
    });
};

const value = ref(1);

const formHorarios = useForm({
    horarios: []
}
);

const addTime = (day) => {
    day.times.push({
        start: '',
        end: ''
    });
};

const copyTime = (day, index) => {
    for (let i = 0; i < horarios.value[index].days.length; i++) {
        if (horarios.value[index].days[i].day != day.day)
            horarios.value[index].days[i].times = [];
        day.times.forEach(time => {
            if (horarios.value[index].days[i].day != day.day) {
                horarios.value[index].days[i].times.push({
                    start: time.start,
                    end: time.end
                });
            }
            // horarios.value[index].days[i].times.push({
            //     start: time.start,
            //     end: time.end
            // });
        });
    }
};

const horarioSelect = ref(null);

const pricesAdd = (horario) => {
    precios.value = horarios.value.find(h => h.id == horario).precios;
    horarioSelect.value = horario;
    showPrice.value = true;
};

const submitPrice = () => {
    axios.post(route('availability.syncPrices', horarioSelect.value), {
        prices: precios.value
    }).then(() => {
        showPrice.value = false;
    });
};

const USDollar = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
});

</script>

<template>
    <div class="card">
        <!-- {{ service }} -->
        <div class="flex justify-between gap-x-2 my-4 font-bold text-lg shadow-xl ">


        </div>
        <div class="card border p-2 rounded-md shadow-2xl">
            <div class=" flex   justify-between w-full  rounded-lg p-2">
                <div class="flex flex-wrap gap-4 shadow-lg p-2 rounded-lg">
                    <div class="flex items-center gap-2">
                        <RadioButton v-model="formStart.availability_type" inputId="ingredient1" name="horario"
                            value="hora" />
                        <label for="ingredient1">Franjas Fijas</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <RadioButton v-model="formStart.availability_type" inputId="ingredient2" name="horario"
                            value="rango" />
                        <label for="ingredient2">Horario de Servicio</label>
                    </div>
                </div>
                <div class="flex flex-wrap gap-4 shadow-lg p-2 rounded-lg">
                    <div class="flex items-center gap-2">
                        <RadioButton v-model="formStart.price_type" inputId="precioEdad" name="precio" value="edad" />
                        <label for="precioEdad">Precio por edades</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <RadioButton v-model="formStart.price_type" inputId="precioGrupo" name="precio" value="grupo" />
                        <label for="precioGrupo">Precio por grupo/Vehiculo</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <RadioButton v-model="formStart.price_type" inputId="precio" name="precioDuracion"
                            value="duracion" />
                        <label for="precioDuracion">Precio por Duración</label>
                    </div>
                </div>
            </div>
            <div class="flex justify-between w-full my-4 border-t-2 px-4 rounded-sm pt-2">
                <h1 class="text-lg font-bold">Disponibilidad</h1>
                <Button @click="show = true" type="button" severity="success" label="Nuevo" icon="pi pi-plus" />
            </div>
            <Accordion value="0" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
                <AccordionPanel :value="index" v-for="(horario, index) in horarios">
                    <AccordionHeader :pt="{
                        root: '!bg-gray-300 !font-bold !text-black',
                    }">
                        <div class="flex justify-between w-full ">
                            <div class="flex flex-col w-full text-lg">
                                <span class="font-bold whitespace-nowrap capitalize">{{ horario.name }}</span>
                                <span class="text-xs italic">
                                    {{ horario.start_date }} - {{ horario.end_date }}
                                </span>
                            </div>
                            <div class="flex w-full  rounded-md gap-x-2">
                                <div v-for="precio in horario.precios"
                                    class="flex flex-col w-full justify-center items-center text-center text-xs shadow-lg shadow-gray-600 rounded-lg bg-white p-1">
                                    <p> {{ precio.min }} a {{ precio.max }} Años</p>
                                    <span>{{ USDollar.format(precio.value) }}</span>
                                </div>

                            </div>
                        </div>
                        <Button text icon="fa-solid fa-dollar" severity="success" class="ml-auto mr-2"
                            @click="pricesAdd(horario.id)" />
                        <Button text size="sm" icon="fa-solid fa-trash" severity="danger" value="3" class="ml-auto mr-2"
                            @click="deleteHorario(index)" />
                    </AccordionHeader>
                    <AccordionContent>
                        <div class="m-0 flex flex-col gap-y-2">
                            <div v-for="day in horario.days" class=" rounded-md shadow-xl p-1 px-4">
                                <div class="">
                                    <div class="flex justify-between border-b-4">
                                        <h3 class="font-bold text-xl  mb-2">{{ day.day }}</h3>
                                        <Button label="Copiar a Todos" @click="copyTime(day, index)" text
                                            icon="fa-solid fa-caret-down"></Button>
                                    </div>
                                    <div class="flex flex-wrap items-center gap-1 py-1">
                                        <div v-for="time in day.times"
                                            class="flex items-center justify-start  gap-x-2 shadow-xl border-b rounded-sm  px-4">
                                            <Input type="time" v-model="time.start" />
                                            <div v-if="formStart.availability_type == 'rango'" class="font-bold">
                                                a
                                            </div>
                                            <Input type="time" v-model="time.end"
                                                v-if="formStart.availability_type == 'rango'" />
                                            <!-- <input v-if="formStart.availability_type == 'rango'"
                                                class="border-0 focus:outline-none rounded-xl w-full  focus:ring-0 text-center"
                                                v-model="form.end_date" type="time" /> -->
                                            <div class=" cursor-pointer">
                                                <i class="pi pi-trash text-red-600 text-xl"></i>
                                            </div>
                                        </div>
                                        <Button label="Añadir" icon="faa-solid fa-plus" text
                                            @click="addTime(day)"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionPanel>

            </Accordion>
        </div>
        <Modal v-model="showPrice" title="Precios" close-on-escape>
            <div class="card flex flex-col gap-y-2 justify-center w-full  rounded-lg p-2">
                <div v-for="(precio, index) in precios"
                    class="flex justify-between gap-x-4 mt-4 border p-2 rounded-md items-center">
                    <div v-if="formStart.price_type != 'duracion'" class="flex items-center gap-x-4">
                        <p>{{ index + 1 }}. </p>
                        <Input v-model="precio.min" type="number" :min="index == 0 ? 0 : precios[index - 1].max + 1"
                            :suffix="formStart.price_type == 'edad' ? ' Años' : ' Personas'" />
                        <p class="font-bold">a</p>
                        <Input type="number" v-model="precio.max" :min="precio.min"
                            :suffix="formStart.price_type == 'edad' ? ' Años' : ' Personas'" />
                        <Input type="number" mode="currency" v-model="precio.value" />
                    </div>
                    <div v-else class="flex items-center gap-x-4">
                        <p>{{ index + 1 }}. </p>
                        <Input type="number" v-model="precio.duration" />
                        <Input type="dropdown" v-model="precio.duration_type" :options="[
                            'Minutos',
                            'Horas'
                        ]" />
                        <Input type="number" mode="currency" v-model="precio.value" />
                    </div>
                    <div>
                        <Button label="Añadir" text icon="fa-solid fa-plus" severity="success"
                            @click="addPrecio"></Button>
                        <Button label="Quitar" text icon="fa-solid fa-trash" severity="danger"
                            @click="removePrecio(index)"></Button>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex gap-x-2">
                    <Button severity="success" label="Guardar" @click="submitPrice()"></Button>
                    <Button severity="danger" label="Cancelar" @click="show = false"></Button>
                </div>
            </template>
        </Modal>
        <div class="flex gap-x-4 mt-4 justify-between">
            <Button @click="visible = false" title="Cancel" severity="danger" label="Cancel" icon="fa-solid fa-times"
                class="!h-9 w-full " />
            <Button @click="submitStart" title="Save" severity="success" :loading="form.processing" label="Guardar"
                icon="fa-solid fa-save" class="!h-9 w-full" />
        </div>
        <Modal v-model:visible="show" close-on-escape="true" title="Añadir Disponibilidad">
            <Input label="Nombre" v-model="form.name"></Input>
            <div class="flex justify-between gap-x-4">
                <Input label="Desde" :enableTimePicker="true" v-model="form.start_date" required :min-date="new Date()"
                    class="w-full" type="date" />
                <Input label="Hasta" :enableTimePicker="true" v-model="form.end_date" :maxDate="form.end_date" required
                    :min-date="new Date()" class="w-full" type="date" />
            </div>
            <template #footer>
                <div class="flex gap-x-2">
                    <Button severity="success" label="Guardar" @click="submit"></Button>
                    <Button severity="danger" label="Cancelar" @click="show = false"></Button>
                </div>
            </template>
        </Modal>
    </div>

</template>

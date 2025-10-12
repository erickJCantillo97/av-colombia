import { router, useForm } from "@inertiajs/vue3";
import axios from "axios";
import GeneralService from "../GeneralService";
import { getErrorMessage, getSuccessMessage } from "@/composable/Toats";
import state from "@/store/searchStore";
export default class Service extends GeneralService {
    loading = false;
    service = [];
    portada = null;
    form = useForm({
        title: "",
        description: "",
        features: [],
        boys_price: 0,
        adults_price: 0,
        code: "",
        includes: [],
        notIncludes: [],
        type: "TOUR",
        city: "Cartagena",
        problematic: 0,
        duration_type: "",
        destinations: "",
        duration: 0,
        duration_unit: "Dias",
        recogidas: [],
        puntos: [],
        capacidad_min: 1,
        is_round_trip: true,
        capacidad_max: 1,
        origen: '',
        destino: '',
        tarifa_vehiculo: '',
        motor: '',
        size: ''
    });

    constructor(service) {
        super();
        this.service = service;
        this.url = "services";
        if (service) {
            this.assignMatchingKeys(service, this.form);
            this.form.is_round_trip = service.is_round_trip == 1 ? true : false;
            this.form.includes = JSON.parse(service.includes);
            this.form.notIncludes = JSON.parse(service.notIncludes);
            this.form.recogidas = JSON.parse(service.recogidas);
            this.form.puntos = JSON.parse(service.puntos);
        }
    }

    async getProveedorsByService(id) {
        const { data } = await axios.get(route("get.proveedors.by.service", id));
        return data.proveedors;
    }

    async getServices() {
        const { data } = await axios.get(route("get.all.services"));
        return data.services;
    }

    async getAllFeatures() {
        const { data } = await axios.get(route('get.all.features'))
        return data
    }

    async getServicePagination(page = 1, perPage = 10) {
        if (state.type.value.value == "HOSPEDAJE") {
            const { data } = await axios.get(route("api.accommodations.available"), {
                params: {
                    page: page, location: state.location.value,
                    check_in: state.checkin.value,
                    check_out: state.checkout.value,
                    guests: state.guests.value.adults,
                    perPage: perPage
                }
            });
            return data;
        }else{

            const params = {
                page: page, location: state.location.value,
                type: state.type.value.value,
                checkin: state.checkin.value,
                checkout: state.checkout.value,
                guests: state.guests.value,
                perPage: perPage
            };
    
            const { data } = await axios.get(route("services.get.paginated"), { params });
    
            return data;
        }
    }

    async submit() {
        // Clone the original values
        const originalFields = ['includes', 'notIncludes', 'recogidas', 'puntos'];
        const originals = {};
        originalFields.forEach(field => {
            originals[field] = this.form[field];
            this.form[field] = JSON.stringify(this.form[field]);
        });

        super.submit(this.form, this.service?.id ?? null);

        // Restore original values
        originalFields.forEach(field => {
            this.form[field] = originals[field];
        });

    }

    async setPortada() {
        router.post(route("set.portada", this.service.slug), {
            portada: this.portada,
        }, {
            onSuccess: () => {
                getSuccessMessage("Portada actualizada exitosamente");
            },
            onError: (error) => {
                getErrorMessage("Error al actualizar la portada");
            }
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    getPrice() {
        const precios = this.service.availabilities.find(av => {
            return this.formatDate(av.start_date) <= this.formatDate(state.checkin.value) && this.formatDate(av.end_date) >= this.formatDate(state.checkout.value)
        })?.precies ?? [];

        if (!precios.length) return 0;

        return precios.reduce((max, obj) => obj.value > max.value ? obj : max, precios[0]).value;
    }



}

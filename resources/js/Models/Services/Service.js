import { router, useForm } from "@inertiajs/vue3";
import axios from "axios";
import GeneralService from "../GeneralService";
import { getErrorMessage, getSuccessMessage } from "@/composable/Toats";
import  state  from "@/store/searchStore";
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
        capacidad_min: 1,
        capacidad_max: 1,
    });

    constructor(service) {
        super();
        this.service = service;
        this.url = "services";
        if (service) {
            this.assignMatchingKeys(service, this.form);
            this.form.includes = JSON.parse(service.includes);
            this.form.notIncludes = JSON.parse(service.notIncludes);
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

    async getServicePagination(page = 1, perPage = 10) {
        const params = { page: page, location: state.location.value, type: state.type.value.value, checkin: state.checkin.value, checkout: state.checkout.value, guests: state.guests.value, perPage: perPage };
        
        const { data } = await axios.get(route("services.get.paginated"), { params });
        
        return data;
    }

    async submit() {
        let included = this.form.includes;
        let notIncluded = this.form.notIncludes;
        this.form.notIncludes = JSON.stringify(this.form.notIncludes);
        this.form.includes = JSON.stringify(this.form.includes);
        super.submit(this.form, this.service?.id ?? null);
        this.form.includes = included;
        this.form.notIncludes = notIncluded;
    }

    async setPortada() {
        router.post(route("set.portada", this.service.slug), {
            portada: this.portada,
        }, {
            onSuccess: () => {
                getSuccessMessage("Portada actualizada exitosamente");
            },
            onError: (error) => {
                getErrorMessage( "Error al actualizar la portada");
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

    getPrice(){
       const precios = this.service.availabilities.find(av => {
       return  this.formatDate(av.start_date) <= this.formatDate(state.checkin.value)  && this.formatDate(av.end_date) >= this.formatDate(state.checkout.value)
       })?.precies ?? [];

    if (!precios.length) return 0;
    
    return precios.reduce((max, obj) => obj.value > max.value ? obj : max, precios[0]).value;
    }

     

}
    
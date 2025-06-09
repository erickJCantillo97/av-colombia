import { router, useForm } from "@inertiajs/vue3";
import axios from "axios";
import GeneralService from "../GeneralService";
import { getErrorMessage, getSuccessMessage } from "@/composable/Toats";

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

}
    
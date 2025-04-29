import axios from "axios";

export default class Service {

    constructor() {

    }

    async getProveedorsByService(id) {
        const {data} = await axios.get(route("get.proveedors.by.service", id));
        return data.proveedors;
    }

    async getServices() {
        const { data } = await axios.get(route("get.all.services"));
        return data.services;
    }

}

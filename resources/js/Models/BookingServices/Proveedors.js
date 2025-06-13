import { getSuccessMessage } from "@/composable/Toats";
import { useForm } from "@inertiajs/vue3";
import axios from "axios";

import { computed, ref } from "vue";

export default class BookingServicesProveedors {
    proveedors = ref([]);
    loading = ref(false);
    bookingService = ref();
    proveedorSelected = ref();
    proveedorsByBookingService = ref([]);

    constructor(bookingService) {
        this.bookingService.value = bookingService;
        this.getProveedorByBookingService();
    }

    form = useForm({
        p: null,
        booking_service_id: null,
        proveedor_id: null,
        cost: 0,
        concept: "",
        discount: 0,
    });

    async getProveedorByBookingService() {
        const { data } = await axios.get(
            route(
                "get.proveedor.by.booking.service",
                this.bookingService.value.id
            )
        );
        this.proveedorsByBookingService.value = data.proveedors;
    }

    calculateCost(){
        this.form.cost =  this.form.p.pivot.value * this.bookingService.value.adults;
    };

    async submit() {
        this.form.proveedor_id = this.form.p.id;
        this.form.booking_service_id = this.bookingService.value.id;
        this.form.concept = this.form.p.pivot.concept;
        this.form.p = null;
        this.form.post(route("BookingServiceProveedors.store"), {
            onSuccess: () => {
                getSuccessMessage("Proveedor agregado");
                this.form.reset();
            }
        });

    }
}

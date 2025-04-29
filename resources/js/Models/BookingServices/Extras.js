import { getSuccessMessage } from "@/composable/Toats";
import { router, useForm } from "@inertiajs/vue3";
import { computed, ref } from "vue";


export default class Extras {

    bookikngService = ref();

    constructor(bookingService) {
        this.bookikngService.value = bookingService;
    }

    form = useForm({
        booking_service_id: null,
        cantidad: 0,
        description: "",
        unit_price: 0,
    });

    totalPrice = computed(() => {
        return this.form.cantidad * this.form.unit_price;
    });

    submit() {
        this.form.booking_service_id = this.bookikngService.value.id;
        this.form.post(route("BookingServiceExtras.store"), {
            onSuccess: () => {
                getSuccessMessage("Extra creado con éxito");
                this.form.reset();
            }
        });
    }

    delete() {
        router.delete(route("BookingServiceExtras.destroy",this.bookikngService.value.id), {
            onSuccess: () => {
                getSuccessMessage("Extra eliminado con éxito");
                this.form.reset();
            }
        });
    }
}

import { getErrorMessage, getSuccessMessage } from "@/composable/Toats";
import { useForm } from "@inertiajs/vue3";
import axios from "axios";
import { computed, ref } from "vue";
import { useCommonUtilities } from "@/composable/useCommonUtilities";

const { currencyFormat} = useCommonUtilities();

export default class BookingServices  {

    loading = ref(false);
    statuesOptions = [
        { text: "RESERVADO", color: "blue" },
        { text: "COMPLETADA", color: "teal" },
        { text: "CAMBIO DE FECHA", color: "gray" },
        { text: "NO SHOW", color: "amber" },
        { text: "REUBICADO", color: "orange" },
        { text: "CANCELADA", color: "green" },
        { text: "SIN CONFIRMAR", color: "purple" },
        { text: "PROBLEMATICA", color: "red"}
      ];

    channels = ref([]);
    bookingService = ref();
    form = useForm({
        id: "",
        service_id: "",
        date: "",
        adults: 1,
        time_service: "",
        boys: 0,
        cliente_name: "",
        cliente_phone: "",
        cliente_city: "",
        cliente_building: "",
        reserva: 0,
        method_id: "",
        channel_id: "9d99a95f-6c3d-48fd-aa7d-6ef4e6860123",
        saldo: 0,
        total: 0,
        total_real: 0,
        percent_channel: 0,
        observations: "",
        code_booking: "",
    });

    formatDateTime  (date, time)  {
        const [year, month, day] = date.split("-");
        const [hour, minute] = time.split(":");
        return `${year}-${month}-${day},${hour}:${minute}`;
      };

    constructor(bookingServices) {
        this.bookingService = bookingServices;
        if (bookingServices) {
            Object.keys(this.form).forEach(key => {
                if (bookingServices[key] !== undefined) {
                    this.form[key] = bookingServices[key];
                }
            });
            this.form.date = this.formatDateTime(bookingServices.date, bookingServices.hour);
        }
    }



    async create() {
        if (!this.form.service_id) return getErrorMessage("Selecciona un Servicio");
        if (!this.form.date) return getErrorMessage("Selecciona una fecha");
        if (!this.form.method_id)
            return getErrorMessage("Selecciona un metodo de pago");
        if (!this.form.channel_id) return getErrorMessage("Selecciona un canal");
        if (!this.form.cliente_name)
            return getErrorMessage("Ingresa el nombre del cliente");
        if (!this.form.cliente_phone)
            return getErrorMessage("Ingresa el telefono del cliente");
        if (!this.form.cliente_city)
            return getErrorMessage("Ingresa la ciudad del cliente");
        if (!this.form.cliente_building)
            return getErrorMessage("Ingresa el edificio del cliente");
        this.form.total_real = this.valorReal.value;
        this.form.percent_channel = this.channels.value.find(
          (channel) => channel.id == this.form.channel_id
        ).percent;
        this.loading.value = true;
        this.form.post(route("BookingServices.store"));
        this.loading.value = false;
    }

    async update() {
        this.form.total_real = this.valorReal.value;
        this.form.percent_channel = this.channels.value.find(
          (channel) => channel.id == this.form.channel_id
        ).percent;
        this.loading.value = true;
        this.form.put(route("BookingServices.update", this.bookingService.id));
        getSuccessMessage("Reserva actualizada Exitosamente");
        this.loading.value = false;
    }

    async getChannels() {
        const { data } = await axios.get(route("channels.index"));
        this.channels.value = data;
        return data;
    }

    async getMethods() {
        const { data } = await axios.get(route("paymentMethods.index"));
        return data;
    }

    getColorStatus() {
        return this.statuesOptions.find((option) => option.text == this.bookingService.status.toUpperCase()).color;
    }

    valorReal = computed(() => {
        let chanel = this.channels.value.find((channel) => channel.id == this.form.channel_id);
        let chanelValue = chanel ? chanel.percent / 100 : 0;
        return this.form.total - this.form.total * chanelValue;
    });

    valorRealFormat = computed(() => {
        return currencyFormat(this.valorReal.value);
    });

    valuePasajeros = computed(() => {
        return currencyFormat(this.form.total/this.form.adults);
    });

    valueCanalVenta = computed(() => {
        let chanel = this.channels.value.find((channel) => channel.id == this.form.channel_id);
        let chanelValue = chanel? chanel.percent / 100 : 0;
        return currencyFormat(this.form.total * chanelValue);
    });

    submit() {
        if(this.bookingService) return this.update();
        return this.create();
    }
}

import { router, useForm } from "@inertiajs/vue3";
import axios from "axios";
import GeneralService from "../GeneralService";
import { getErrorMessage, getSuccessMessage } from "@/composable/Toats";
import state from "@/store/searchStore";

export default class Accommodation extends GeneralService {
    loading = false;
    accommodation = [];
    form = useForm({
        name: "",
        description: "",
        type: "",
        address_line_1: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        latitude: 0,
        longitude: 0,
        star_rating: 0,
        contact_email: "",
        contact_phone: "",
        status: "publicado",
    });

    constructor(accommodation) {
        super();
        this.accommodation = accommodation;
        this.url = "accommodations";
        if (accommodation) {
            this.assignMatchingKeys(accommodation, this.form);
        }
    }

    async getAccommodationPagination(page = 1, perPage = 10, search = "") {
        const params = {
            page: page,
            location: state.location.value,
            type: 'HOSPEDAJE',
            checkin: state.checkin.value,
            checkout: state.checkout.value,
            guests: state.guests.value,
            perPage: perPage,
            search: search
        };

        const { data } = await axios.get(route("services.get.paginated"), { params });
        return data;
    }

    getMinPrice() {
        if (!this.accommodation.rooms || !this.accommodation.rooms.length) return 0;
        const availableRooms = this.accommodation.rooms.filter(room => room.is_available);
        if (!availableRooms.length) return 0;
        return Math.min(...availableRooms.map(room => room.price_per_night));
    }

    getAverageRating() {
        if (!this.accommodation.reviews || !this.accommodation.reviews.length) return 0;
        const sum = this.accommodation.reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / this.accommodation.reviews.length).toFixed(1);
    }

    getMainPhoto() {
        if (!this.accommodation.photos || !this.accommodation.photos.length) {
            return 'https://avcolombia.net/images/logo.webp';
        }
        return this.accommodation.photos[0].filepath || 'https://avcolombia.net/images/logo.webp';
    }
}

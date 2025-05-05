import { useForm } from "@inertiajs/vue3";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBookingServiceStore = defineStore("bookingService", () => {
    const selectDate = ref([])
    const statusFilter = ref(null)

    return { selectDate, statusFilter};
},
{
    persist: {
        storage: sessionStorage,
        paths: ["selectDate", "statusFilter"],
    },
})

import { useForm } from "@inertiajs/vue3";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore(
    "HomeStore",
    () => {
        const form = useForm({
            type: 'Tour',
            ciudad: '',
            search: '',
            date: '',
        });
        const typeList = ref({ icon: 'pi pi-list', value: 'list' })

        return { form, typeList };
    },
    {
        persist: {
            storage: sessionStorage,
            paths: ["form", 'typeList'],
        },
    }
);

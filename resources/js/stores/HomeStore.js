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
        const typeList = ref({ icon: 'pi pi-th-large', value: 'grid' })

        return { form, typeList };
    },
    {
        persist: {
            storage: sessionStorage,
            paths: ["form", 'typeList'],
        },
    }
);

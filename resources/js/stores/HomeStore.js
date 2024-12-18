import { useForm } from "@inertiajs/vue3";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore(
    "HomeStore",
    () => {
        const form = useForm({
            type: 'Experiencia',
            ciudad: '',
            search: '',
            date: '',
        });

        return { form };
    },
    {
        persist: {
            storage: sessionStorage,
            paths: ["form"],
        },
    }
);

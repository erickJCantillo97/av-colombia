import "./bootstrap";
import "../css/app.css";
import "preline";
import 'aos/dist/aos.css'
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from 'primevue/toastservice';
import VueDatePicker from '@vuepic/vue-datepicker';
import AOS from 'aos'
import Tooltip from 'primevue/tooltip';
import '@vuepic/vue-datepicker/dist/main.css'
// https://vue3datepicker.com/installation/#global [Libreria para seleccionar fechas y horas]

const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{zinc.50}",
            100: "{zinc.100}",
            200: "{zinc.200}",
            300: "{zinc.300}",
            400: "{zinc.400}",
            500: "{zinc.500}",
            600: "{zinc.600}",
            700: "{zinc.700}",
            800: "{zinc.800}",
            900: "{zinc.900}",
            950: "{zinc.950}",
        },
        colorScheme: {
            light: {
                primary: {
                    color: "{zinc.950}",
                    inverseColor: "#ffffff",
                    hoverColor: "{zinc.900}",
                    activeColor: "{zinc.800}",
                },
                highlight: {
                    background: "{zinc.950}",
                    focusBackground: "{zinc.700}",
                    color: "#ffffff",
                    focusColor: "#ffffff",
                },
            },
            dark: {
                primary: {
                    color: "{zinc.50}",
                    inverseColor: "{zinc.950}",
                    hoverColor: "{zinc.100}",
                    activeColor: "{zinc.200}",
                },
                highlight: {
                    background: "rgba(250, 250, 250, .16)",
                    focusBackground: "rgba(250, 250, 250, .24)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)",
                },
            },
        },
    },
});

createInertiaApp({
    title: (title) => `${title} - AC COLOMBIA`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(AOS.init())
            .use(ZiggyVue)
            .use(ConfirmationService)
            .use(ToastService)
            .use(PrimeVue, {
                theme: {
                    preset: Noir,
                },
                pt: {
                    button: {
                        root: '!h-8'
                    },

                    dropdown: {
                        root: '!h-8',
                        input: '!py-0 !flex !items-center !text-sm !font-normal',
                        item: '!py-1 !px-3 !text-sm !font-normal',
                        filterInput: '!h-8'
                    },
                    multiselect: {
                        root: '!h-8',
                        label: '!py-0.5 !flex !h-full !items-center !text-sm !font-normal',
                        token: '!py-0 !px-1',
                        tokenLabel: '!text-sm',
                        item: '!py-1 !px-3 !text-sm !font-normal',
                        filterInput: '!h-8',
                        header: '!h-min !py-0.5'
                    }
                },
                zIndex: {
                    modal: 1100,        //dialog, sidebar
                    overlay: 1000,      //dropdown, overlaypanel
                    menu: 1000,         //overlay menus
                    tooltip: 1100       //tooltip
                }
            })
            .directive('tooltip', Tooltip)
            .component('VueDatePicker', VueDatePicker)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});

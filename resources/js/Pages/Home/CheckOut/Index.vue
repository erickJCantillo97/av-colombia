<template>
  <!-- <Header /> -->
  <div class="bg-gray-50 py-10">

    <div class="m-auto max-w-2xl px-4  sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Checkout</h2>

      <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <div class="flex items-center justify-start gap-x-2">
            <Link :href="route('/')">
            Volver
            </Link>
            <h2 class="text-lg font-medium text-gray-900">Información del pasajero principal</h2>
          </div>

          <div class="mt-4 border-t border-gray-200 pt-1">

            <div class="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
              <Input label="Nombre" />
              <Input label="Apellido" />
              <Input label="Hotel" class="sm:col-span-2" />
              <Input label="Ciudad de Origen" />
              <Input label="Telefono" />
            </div>
          </div>

          <div class="mt-4 border-t border-gray-200 pt-1">
            <fieldset>
              <legend class="text-lg font-medium text-gray-900">Forma de Pago</legend>
              <RadioGroup v-model="selectedDeliveryMethod"
                class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <RadioGroupOption as="template" v-for="deliveryMethod in deliveryMethods" :key="deliveryMethod.id"
                  :value="deliveryMethod" :aria-label="deliveryMethod.title"
                  :aria-description="`${deliveryMethod.turnaround} for ${deliveryMethod.price}`"
                  v-slot="{ active, checked }">
                  <div :class="[
                    checked ? 'border-transparent' : 'border-gray-300',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                  ]">
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <span class="block text-sm font-medium text-gray-900">{{
                          deliveryMethod.title
                          }}</span>
                        <span class="mt-1 flex items-center text-sm text-gray-500">{{
                          deliveryMethod.turnaround
                          }}</span>
                        <span class="mt-6 text-sm font-medium text-gray-900">{{
                          deliveryMethod.price
                          }}</span>
                      </span>
                    </span>
                    <CheckCircleIcon v-if="checked" class="size-5 text-indigo-600" aria-hidden="true" />
                    <span :class="[
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg',
                    ]" aria-hidden="true" />
                  </div>
                </RadioGroupOption>
              </RadioGroup>
            </fieldset>
          </div>

          <!-- Payment -->
          <div class="mt-10 border-t border-gray-200 pt-10">
            <h2 class="text-lg font-medium text-gray-900">Instrucciones para el pago</h2>

            <fieldset class="mt-4">
              <legend class="sr-only">Payment type</legend>
              <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div v-for="(paymentMethod, paymentMethodIdx) in paymentMethods" :key="paymentMethod.id"
                  class="flex items-center">
                  <input :id="paymentMethod.id" name="payment-type" type="radio" :checked="paymentMethodIdx === 0"
                    class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden" />
                  <label :for="paymentMethod.id" class="ml-3 block text-sm/6 font-medium text-gray-700">{{
                    paymentMethod.title }}</label>
                </div>
              </div>
            </fieldset>

            <p class="mt-4 text-sm text-gray-500">
              Aqui van las instrucciones de pago para {{ selectedDeliveryMethod.title }}.
            </p>
          </div>
        </div>

        <!-- Order summary -->
        <div class="mt-10 lg:mt-0">
          <h2 class="text-lg font-medium text-gray-900">Resumen de reserva de {{ props.service.service_name }}</h2>

          <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 class="sr-only">Personas de la reserva</h3>

            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="p in persons" :key="p.id" class="flex px-4 py-6 sm:px-2">
                <div class="mx-2 flex items-center justify-between w-full">
                  <div class="flex flex-col text-sm">
                    <span class="font-medium text-gray-700 hover:text-gray-800">{{
                      p.min
                    }} a {{ p.max }} {{ labelTypePrice() }} de Edad</span>

                    <p>{{ currencyFormat(p.value * p.cant) }}</p>
                  </div>

                  <div class="flex items-center gap-x-2">
                    <Button text icon="pi pi-minus" size="samll" severity="danger" v-if="p.cant > 0"
                      @click="p.cant--" />
                    <p class="text-lg font-medium text-gray-900">
                      {{ p.cant }}
                    </p>
                    <Button text icon="pi pi-plus" size="samll" severity="success" @click="p.cant++" />
                  </div>
                </div>
              </li>
            </ul>
            <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div class="flex items-center justify-between">
                <dt class="text-sm">Subtotal</dt>
                <dd class="text-sm font-medium text-gray-900">{{ currencyFormat(totalCost) }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-sm">Extras</dt>
                <dd class="text-sm font-medium text-gray-900">$ 0</dd>
              </div>

              <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt class="text-base font-medium">Total</dt>
                <dd class="text-base font-medium text-gray-900">{{ currencyFormat(totalCost) }}</dd>
              </div>
            </dl>
            <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button :disabled="totalCost == 0" type="submit"
                class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                Confirmar el Pago y Reservar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { CheckCircleIcon, TrashIcon } from "@heroicons/vue/20/solid";
import Header from "@/Components/Sections/Header.vue";
import Input from "@/Components/Customs/Input.vue";
import { currencyFormat } from "@/composable/useCommonUtilities";
import { Link } from "@inertiajs/vue3";
const props = defineProps({
  service: Object,
});

const persons = ref(props.service.persons);


const totalCost = computed(() =>
  persons.value.reduce((acc, person) => acc + parseInt(person.value) * person.cant, 0)
);

const deliveryMethods = [
  {
    id: 1,
    title: "Offline",
    turnaround: "Le notificaremos cuando confirmemos el pago",
  },
  // { id: 2, title: "Online", turnaround: "El Pago se refleja de inmediato" },
];
const paymentMethods = [
  { id: "credit-card", title: "Bancolombia" },
  { id: "paypal", title: "Davivienda" },
  { id: "etransfer", title: "Nequi" },
];
const labelTypePrice = () => {
  switch (props.service.price_type) {
    case "edad":
      return "Años";
    case "paypal":
      return "PayPal";
    case "etransfer":
      return "eTransfer";
    default:
      return props.service.price_type;
  }
};
const selectedDeliveryMethod = ref(deliveryMethods[0]);
</script>

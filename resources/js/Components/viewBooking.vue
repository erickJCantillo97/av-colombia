<template>
 <Drawer
      v-model:visible="show"
      pt:root:class="!bg-blue-100"
      header="Detalles de la actividad"
      position="right"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span class="font-bold text-lg">{{ service.service.title }}</span>
        </div>
      </template>
      <div class="flex flex-col gap-y-1.5 text-sm">
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Fecha del Servicio:</strong>
          <p>{{ service.date }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Hora del Servicio:</strong>
          <p>{{ service.hour }}</p>
        </div>
        <div
          v-if="service.time_service"
          class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
        >
          <strong>Tiempo del Servicio:</strong>
          <p>{{ service.time_service }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Canal de Venta:</strong>
          <p>{{ service.channel.name }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Cliente:</strong>
          <p>{{ service.cliente_name }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Ciudad:</strong>
          <p>{{ service.cliente_city }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Telelfono:</strong>
          <a :href="`tel://${service.cliente_phone}`">{{ service.cliente_phone }}</a>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Edificio:</strong>
          <p>{{ service.cliente_building }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Adultos:</strong>
          <p>{{ service.adults }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Niños:</strong>
          <p>{{ service.boys }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Mascota:</strong>
          <p>{{ service.mascota }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Total:</strong>
          <p>{{ COP.format(service.total) }}</p>
        </div>
        <div class="flex justify-between border py-1 bg-white/30 rounded-md px-2">
          <strong>Total Real:</strong>
          <p>{{ COP.format(service.total_real) }}</p>
        </div>
        <div
          v-if="service.user"
          class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
        >
          <strong>Vendedor:</strong>
          <p>{{ service.user?.name }}</p>
        </div>
        <div
          v-if="service.user"
          class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
        >
          <strong>Fecha de reserva:</strong>
          <p>{{ new Date(service.created_at).toLocaleDateString("es-CO") }}</p>
        </div>

        <div
          v-if="service.fecha_cancelacion"
          class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
        >
          <strong>Fecha de Cancelación:</strong>
          <p>{{ service.fecha_cancelacion }}</p>
        </div>
        <div class="flex flex-col border py-1 bg-white/30 rounded-md px-2">
          <strong>Observacion:</strong>
          <p>{{ service.observations }}</p>
        </div>

        <div
          class="text-lg flex w-full justify-between mt-2"
          v-if="$page.props.auth.user.rol == 'admin'"
        >
          <p class="font-bold">Proveedores</p>
          <p class="rounded-full bg-black text-white px-2">
            {{ service.proveedors.length }}
          </p>
          <!-- {{ service.proveedors }} -->
        </div>
        <div
          v-for="proveedor in service.proveedors"
          v-if="$page.props.auth.user.rol == 'admin'"
          class="flex justify-between border py-1 bg-white/30 rounded-md px-2"
        >
          <p>
            {{ proveedor.proveedor.nombre }}
          </p>
          <p>
            {{ COP.format(proveedor.cost) }}
          </p>
        </div>
        <div class="flex flex-col gap-y-2 mt-2">
          <div class="flex justify-between">
            <h2 class="text-xl font-bold">Pagos Realizados</h2>
            <div class="bg-blue-600 text-white p-1 rounded-lg">
              {{ COP.format(service.payments.reduce((a, b) => a + b.amount, 0)) }}
            </div>
          </div>
          <div
            class="flex items-center text-xs justify-between border shadow-xl rounded-md p-1 bg-white"
            v-for="payment in service.payments"
          >
            <div>
              <div class="uppercase font-bold">
                {{ payment.type }} {{ COP.format(payment.amount) }}
              </div>
              <div>
                {{ new Date(payment.created_at).toLocaleDateString("es-CO") }}
                {{ payment.metohd_payment.name }}
              </div>
            </div>
            <div
              class="uppercase"
              :class="
                payment.status == 'pendiente'
                  ? 'bg-red-500 p-1 text-white rounded-lg shadow-md shadow-red-500'
                  : ''
              "
            >
              {{ payment.status }}
              <div></div>
            </div>
            <!-- {{ payment }} -->
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-col items-center gap-2">
          <h1 class="font-bold text-center">
            Saldo:
            {{
              COP.format(
                service.total_price - service.payments.reduce((a, b) => a + b.amount, 0)
              )
            }}
          </h1>
          <div class="flex gap-x-2" v-if="$page.props.auth.user.rol == 'admin'">
            <Button
              @click="setState('COMPLETADA', true)"
              icon="fa-solid fa-circle-check"
              text
              size="large"
              v-tooltip.top="'Completar Servicio'"
              class="flex-auto"
              severity="success"
            />
            <Button
              @click="setState('NO SHOW', true)"
              icon="fa-solid fa-eye-slash"
              text
              size="large"
              v-tooltip.top="'Servicio No show'"
              class="flex-auto"
              severity="warn"
            />
            <Button
              @click="cancelarServicio()"
              icon="fa-solid fa-xmark-circle"
              text
              size="large"
              v-tooltip.top="'Cancelar Servicio'"
              class="flex-auto"
              severity="danger"
            />
            <Button
              @click="setState('PROBLEMATICA', false)"
              icon="fa-solid fa-person-dress-burst"
              text
              size="large"
              v-tooltip.top="'Servicio Problematico'"
              class="flex-auto"
              severity="danger"
            />
            <!-- <Button label="Registrar Pago" icon="pi pi-sign-out" class="flex-auto" severity="success"  /> -->
          </div>
        </div>
      </template>
    </Drawer>

</template>

<script setup>
import Swal from 'sweetalert2';
import { router } from '@inertiajs/vue3';
import { alerts } from "@/composable/toasts";

const { toast } = alerts();



const props = defineProps({
    service: Object
})

const show = defineModel()


const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const cancelarServicio = () => {
  Swal.fire({
    title: "Cancelar Servicio",
    input: "date",
    inputLabel: "Fecha de Cancelación",
    showCancelButton: true,
    confirmButtonText: "Cancelar Servicio",
    showLoaderOnConfirm: true,
    preConfirm: async (date) => {
      await router.post(route("set.states"), {
        service: props.service.id,
        state: "CANCELADA",
        date: date,
        terminated: true,
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      toast("success", "Reserva Cancelada");
    }
  });
};

const setState = (state, terminated) => {
  Swal.fire({
    title: state,
    text: "Estas seguro de realizar esta acción?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: state,
        text: "Esta reserva ha sido " + state + ".",
        icon: "success",
      });

      router.post(
        route("set.states"),
        {
          service: props.service.id,
          state: state,
          terminated: terminated,
        },
        {
          onSuccess: () => {
            info.value = false;
            toast("success", "Reserva " + state);
          },
        }
      );
    }
  });
};
</script>
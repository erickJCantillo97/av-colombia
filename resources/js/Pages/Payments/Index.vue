<script setup>
import Datatable from "@/Components/Customs/Datatable.vue";
import Modal from "@/Components/Customs/Modal.vue";
import Form from "./Form.vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import { router, useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { ref, computed } from "vue";
import { alerts } from "@/composable/toasts";


const show = ref(false);

const { toast } = alerts();

const props = defineProps({
  payments: Array,
});

// Computed properties for stats
const totalAmount = computed(() => {
  return props.payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
});

const currentMonthPayments = computed(() => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  return props.payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
  }).length;
});


const payment = ref(null);
const add = {
  action: () => {
    show.value = true;
    // router.visit(route('services.create'))
  },
};

const actions = [
  {
    name: "Ver",
    icon: "fa-solid fa-pencil",
    severity: "info",
    action: (row) => {
      show.value = true;
      payment.value = row;
    },
  },
  {
    name: 'Eliminar',
    icon: "fa-solid fa-trash",
    severity: "danger",
    action: (row) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
      }).then((result) => {
        if (result.isConfirmed) {
          router.delete(route("paymentProveedors.destroy", row.id), {
            onSuccess: () => {
              toast("success", "Pago eliminado con éxito");
            },
          });
        }
      });
    },
  }
];

const columns = [
  {
    header: "Proveedor",
    field: "proveedor.nombre",
    filter: true,
  },
  {
    header: "Fecha de Pago",
    field: "date",
    type: "date",
    filter: true,
  },
  {
    header: "Valor",
    field: "amount",
    type: "currency",
  },
  {
    header: "Fecha Inicio",
    field: "startDate",
    type: "date",
    filter: true,
  },
  {
    header: "Fecha Fin",
    field: "endDate",
    type: "date",
    filter: true,
  },
  {
    header: "Comprobante",
    field: "comprobante",
    type: "html-custom",
    renderer: (row) => {
      return `<a href="${row.comprobante}" class="text-sky-600 underline" target="_blank">Ver Comprobante</a>`;
    },
  },
];

</script>

<template>
  <AppLayout title="Pagos">
    <!-- Header Section -->
    <div class="mb-6">
      <div class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-slate-200/50">
        <!-- Decorative Elements -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-slate-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <i class="fa-solid fa-money-bill-transfer text-white text-2xl"></i>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Gestión de Pagos
              </h1>
              <p class="text-slate-600 text-sm mt-1">Administra los pagos a proveedores</p>
            </div>
          </div>
          
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:shadow-md transition-all duration-300">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Pagos</p>
                  <p class="text-2xl font-bold text-slate-800 mt-1">{{ payments.length }}</p>
                </div>
                <div class="p-3 bg-blue-100 rounded-lg">
                  <i class="fa-solid fa-file-invoice-dollar text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:shadow-md transition-all duration-300">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Monto Total</p>
                  <p class="text-2xl font-bold text-green-600 mt-1">
                    {{ new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalAmount) }}
                  </p>
                </div>
                <div class="p-3 bg-green-100 rounded-lg">
                  <i class="fa-solid fa-sack-dollar text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:shadow-md transition-all duration-300">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Este Mes</p>
                  <p class="text-2xl font-bold text-indigo-600 mt-1">{{ currentMonthPayments }}</p>
                </div>
                <div class="p-3 bg-indigo-100 rounded-lg">
                  <i class="fa-solid fa-calendar-days text-indigo-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Datatable Section -->
    <div class="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
      <Datatable :add :columnas="columns" :data="payments" :actions title="Pagos">
      </Datatable>
    </div>

    <!-- Modal -->
    <Modal v-model="show" title="Gestión de Pagos" width="80vw">
      <Form :payment="payment" ></Form>
    </Modal>
  </AppLayout>

</template>

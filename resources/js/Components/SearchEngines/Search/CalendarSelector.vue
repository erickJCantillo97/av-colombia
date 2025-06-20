<template>
  <div>
    <DatePicker
      v-model:value="modelValueProxy"
      range
      :format="'YYYY-MM-DD'"
      :not-before="minDate"
      :not-after="maxDate"
      :clearable="false"
      :inline="true"
      :numberOfMonths="2"
      selectionMode="range" :manualInput="false"
      :show-header="true"
      :show-week-number="false"
      :panel-attr="{ class: 'calendar-inline-custom' }"
      @change="onRangeUpdate"
    />
    <div class="flex gap-2 mt-4 flex-wrap justify-center">
      <button v-for="option in flexOptions" :key="option.label" @click="$emit('flex', option.days)"
        :class="['px-4 py-2 rounded-full border text-base font-medium transition-all', flexValue === option.days ? 'bg-black text-white border-black shadow' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100']">
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.calendar-inline-custom {
  border-radius: 18px !important;
  box-shadow: 0 2px 16px 0 rgba(60,60,60,0.08) !important;
  background: #fff !important;
  border: none !important;
  padding: 12px 8px 0 8px !important;
  width: 100% !important;
  max-width: 700px;
}
.mx-calendar {
  font-family: inherit;
  background: #fff;
  border-radius: 18px;
  padding-bottom: 0.5rem;
}
.mx-table-date td {
  border-radius: 50% !important;
  transition: background 0.2s;
}
.mx-table-date td.current {
  background: #000 !important;
  color: #fff !important;
}
.mx-table-date td.in-range {
  background: #f3f4f6 !important;
}
.mx-table-date td:hover {
  background: #e5e7eb !important;
}
.mx-btn-current {
  background: #000 !important;
  color: #fff !important;
  border-radius: 9999px !important;
}
</style>
<script setup>
import { ref, watch } from 'vue';


const props = defineProps({
  modelValue: [String, Array],
  value: [String, Array],
  minDate: String,
  maxDate: String,
  placeholder: String,
  flexValue: Number,
  flexOptions: Array
});
const emit = defineEmits(['update:modelValue', 'update:value', 'flex']);

const modelValueProxy = ref(props.modelValue ?? props.value);
watch(() => props.modelValue ?? props.value, v => modelValueProxy.value = v);

const onRangeUpdate = (val) => {
  emit('update:modelValue', val);
  emit('update:value', val);
  // Emitir fechas individuales para check-in y check-out si el padre lo espera
  if (Array.isArray(val) && val.length === 2) {
    emit('update:checkin', val[0]);
    emit('update:checkout', val[1]);
  }
};
</script>

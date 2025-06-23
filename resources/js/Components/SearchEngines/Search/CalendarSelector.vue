<template>
  <div>
    <DatePicker
      v-model:value="modelValueProxy"
      range
      class="w-full"
      :format="'YYYY-MM-DD'"
      :minDate="new Date()"
      :maxDate="maxDate"
      :clearable="false"
      :inline="true"
      :numberOfMonths="2"
      selectionMode="range" :manualInput="false"
      :show-header="true"
      :show-week-number="false"
      @value-change="onRangeUpdate"
      :pt="{
        calendarContainer: '!w-full'
      }"
    />
    
  </div>
</template>
<style scoped>

</style>
<script setup>
import { ref, watch } from 'vue';


const props = defineProps({
  modelValue: [String, Array],
  value: [String, Array],
  minDate: String,
  maxDate: String,
  placeholder: String,
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

<template>
  <select :value="modelValue" @input="updateValue"
    class="h-12 w-full rounded-md border-gray-200 text-primary mb-1.5 px-7 cursor-pointer">
    <option v-for="option in options" :key="option.value" :value="option.value" class="mb-1">
      {{ option.title }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { toRefs, PropType, defineEmits } from 'vue';

export interface Option {
  value: string;
  title: string;
}

const props = defineProps({
  modelValue: String,
  options: Array as PropType<Option[]>,
});
const { modelValue, options } = toRefs(props);

const emit = defineEmits(['update:modelValue']);

function updateValue(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}

</script>

<style lang="scss" scoped>
</style>

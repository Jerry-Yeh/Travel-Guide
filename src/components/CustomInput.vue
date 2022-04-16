<template>
  <input
    type="text"
    :value="modelValue"
    @input="updateValue"
    :placeholder="placeholder"
    class="w-full h-12 rounded-md border-gray-200 bg-gray-50 text-red mb-1.5 px-7"
  />
</template>

<script lang="ts" setup>
import { toRefs, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: String,
});
const { modelValue, placeholder } = toRefs(props);
const emit = defineEmits(['update:modelValue']);

function updateValue(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}

</script>


<style lang="scss" scoped>
</style>

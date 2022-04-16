<template>
  <button
    class="w-full h-12 rounded-md flex justify-center items-center"
    :class="[`bg-${bgColor}`, `text-${color}`]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps({
  bgColor: String,
  color: String,
});

const { bgColor, color } = toRefs(props);

</script>


<style lang="scss" scoped>
</style>

<template>
  <div class="text-tertiary text-sm border border-tertiary rounded-xl px-2"># {{ name }}</div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});
const { name } = toRefs(props);

</script>


<style lang="scss" scoped>
</style>

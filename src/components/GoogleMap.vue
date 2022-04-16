<template>
  <iframe
    width="100%"
    height="100%"
    loading="lazy"
    eferrerpolicy="no-referrer-when-downgrade"
    :src="`https://maps.google.com/maps?q=${position.PositionLat},${position.PositionLon}&hl=zh-TW&z=16&amp;output=embed`"
    class="rounded-2xl"
  ></iframe>
</template>

<script lang="ts" setup>
import { toRefs, PropType } from 'vue';
import { Position } from '@/api/tourism';

const props = defineProps({
  position: {
    type: Object as PropType<Position>,
    required: true
  },
});
const { position } = toRefs(props);

</script>

<style lang="scss" scoped>
</style>

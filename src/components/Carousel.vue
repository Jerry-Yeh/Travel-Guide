<!-- @format -->

<template>
  <div class="flex overflow-hidden rounded-3xl w-full h-full relative">
    <div
      class="w-full h-full overflow-hidden flex-none flex justify-center items-center transition duration-500 font-bold md:text-3xl md:justify-between"
      v-for="(item, index) in items"
      :key="item"
      :style="{
        transform: `translate(-${index_ * 100}%)`,
      }"
    >
      <div
        :style="{ 'background-image': `url(${item})` }"
        class="w-full h-full bg-cover bg-center"
      ></div>
    </div>
    <div
      v-if="items.length === 0"
      class="w-full h-full bg-center bg-cover bg-no-image-l md:bg-no-image-xl"
    ></div>
    <div
      v-if="items.length > 1"
      class="absolute bottom-4 right-4 md:bottom-7 md:right-7 flex"
    >
      <div
        class="rounded-full cursor-pointer w-2 h-2 mr-1.5 md:mr-3 md:w-4 md:h-4"
        v-for="(item, index) in items"
        :key="index"
        :class="{
          'bg-white': index_ === index,
          'bg-gray-400': index_ !== index,
        }"
        @click="index_ = index"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, PropType, ref } from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: [],
  },
});
const { items } = toRefs(props);

let index_ = ref(0);
</script>

<style lang="scss" scoped></style>

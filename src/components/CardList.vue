<!-- @format -->

<template>
  <div
    class="grid grid-flow-col overflow-x-auto -mx-4 md:mx-0 md:gap-7 md:grid-flow-row md:grid-cols-2 lg:grid-cols-4"
  >
    <card
      v-for="(item, index) in dataList"
      :key="item.name"
      :data="item"
      :routeName="routeName"
      class="pl-4 md:pl-0 w-56 md:w-full"
      :class="{ 'mr-4': index === dataList.length - 1 }"
    ></card>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, PropType, computed, watch } from "vue";
import Card, { CardData } from "@/components/Card.vue";

const props = defineProps({
  dataList: {
    type: Array as PropType<CardData[]>,
    default: [],
  },
  routeName: {
    type: String,
    default: "",
  },
});
const { dataList, routeName } = toRefs(props);
</script>

<style lang="scss" scoped></style>

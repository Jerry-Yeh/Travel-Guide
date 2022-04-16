<!-- @format -->

<template>
  <section class="flex flex-col">
    <div class="flex items-center">
      <h2 class="text-2xl mr-1.5 md:text-4xl">搜尋結果</h2>
      <p class="text-sm md:text-lg">
        共有
        <span class="text-tertiary">{{ dataList.length }}</span>
        筆
      </p>
    </div>
    <div class="flex-grow grid grid-cols-1 gap-y-5 mb-22 md:grid-cols-4 md:gap-x-7.5">
      <card
        v-for="item in dataList.slice((page_ - 1) * perpage_, page_ * perpage_)"
        :key="item.name"
        :data="item"
        :routeName="routeName"
      ></card>
      <div v-if="dataList.length === 0" class="flex flex-col items-center text-primary font-bold pt-16 md:pt-22">
        <img
          src="../assets/img/icon/NoInformation.svg"
          class="w-22 h-22 mb-1.5"
        />
        <span>目前查無資料</span>
        <span>請重新搜尋</span>
      </div>
    </div>
    <div v-if="dataList.length > 0" class="flex justify-center mb-15">
      <v-pagination
        v-model="page_"
        :pages="pages_"
        :range-size="1"
        active-color="#A8B8A5"
        @update:modelValue="updatePage"
      ></v-pagination>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  toRefs,
  ref,
  PropType,
  computed,
  watch,
  onMounted,
  onUnmounted,
} from "vue";
import Card, { CardData } from "@/components/Card.vue";
import VPagination from "@hennge/vue3-pagination";

// Utility
import useUtility from "@/plugins/utility";

export interface Data {}

const props = defineProps({
  dataList: {
    type: Array as PropType<CardData[]>,
    default: [],
  },
  routeName: String,
});
const { dataList } = toRefs(props);

const { scrollToTop } = useUtility();

// Search result
let width_ = ref(window.innerWidth);
let page_ = ref(1);
let perpage_ = computed(() => (width_.value > 640 ? 20 : 8));
let pages_ = computed(() => Math.ceil(dataList.value.length / perpage_.value));

function updatePage() {
  scrollToTop();
}

function onResize() {
  width_.value = window.innerWidth;
}

watch(dataList.value, (newDataList) => {
  // console.log(newDataList.length);
});

onMounted(() => {
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped></style>

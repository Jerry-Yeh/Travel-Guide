<!-- @format -->

<template>
  <div class="flex text-xs md:text-base whitespace-nowrap overflow-hidden">
    <router-link to="/" class="text-primary mr-2">首頁</router-link>
    <span>/</span>
    <router-link v-if="cityName" :to="`/${mode}`" class="text-primary mx-2">{{
      title_
    }}</router-link>
    <div v-else class="ml-2">{{ title_ }}</div>
    <div v-if="cityName">
      <span>/</span>
      <router-link
        v-if="cityName"
        :to="`/${mode}?cityName=${cityName}`"
        class="text-primary mx-2"
        >{{ cityName }}</router-link
      >
    </div>
    <div v-if="title">
      <span>/</span>
      <span class="ml-2 truncate">{{ title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from "vue";

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  cityName: String,
  title: String,
});
const { mode, cityName, title } = toRefs(props);

let title_ = ref('');
switch (mode.value) {
  case 'ScenicSpot':
    title_.value = '探索景點';
    break;
  case 'Activity':
    title_.value = '節慶活動';
    break;
  case 'Restaurant':
    title_.value = '在地美食';
    break;
}
</script>

<style lang="scss" scoped></style>

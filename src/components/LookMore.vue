<template>
  <div class="flex items-end justify-between leading-none md:px-3.5">
    <h2 class="text-2xl md:text-4xl text-left">
      <span :class="{ 'md:hidden': title.md }">{{ title.default }}</span>
      <span class="hidden md:inline">{{ title.md }}</span>
    </h2>
    <div class="flex text-secondary cursor-pointer" @click="changeRoute">
      <span :class="{ 'md:hidden': title.md }">{{ subTitle.default }}</span>
      <span class="hidden md:inline">{{ subTitle.md }}</span>
      <img src="../assets/img/icon/Arrow-Right_secondary.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, PropType } from 'vue';
import { useRouter } from 'vue-router';

export interface LookMoreTitle {
  default: string;
  md?: string;
}

const props = defineProps({
  title: {
    type: Object as PropType<LookMoreTitle>,
    required: true
  },
  subTitle: {
    type: Object as PropType<LookMoreTitle>,
    required: true
  },
  route: String,
  city: String
});
const { title, subTitle, route, city } = toRefs(props);

const router = useRouter();

function changeRoute() {
  router.push({
    name: route?.value,
    params: city?.value
      ? { city: city.value }
      : {}
  });
}

</script>


<style lang="scss" scoped>
</style>

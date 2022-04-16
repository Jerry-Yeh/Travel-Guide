<!-- @format -->

<template>
  <router-link
    v-if="data"
    :to="`/${routeName}/${data.id}`"
    class="flex flex-col  "
  >
    <div class="flex items-center overflow-hidden rounded-2xl mb-2.5 h-40">
      <div
        v-if="data.picture.PictureUrl1"
        :style="{'background-image': `url(${data.picture.PictureUrl1})`}"
        class="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed transform hover:scale-110 cursor-pointer transition duration-200"
      ></div>
      <div
        v-else
        class="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed transform hover:scale-110 cursor-pointer transition duration-200 bg-no-image-m"
      ></div>
    </div>
    <div class="text-left text-lg font-bold mb-1.5 truncate md:text-2xl">
      {{ data.name }}
    </div>
    <div class="flex">
      <img src="../assets/img/icon/Vector.svg" class="mr-1" />
      <span>{{ data.city }}</span>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { toRefs, PropType } from "vue";
import { Picture } from "@/api/tourism";

export interface CardData {
  name: string;
  picture: Picture;
  city: string;
  id: string;
}

const props = defineProps({
  data: Object as PropType<CardData>,
  routeName: String,
});
const { data } = toRefs(props);
</script>

<style lang="scss" scoped></style>

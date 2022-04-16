<template>
  <div class="flex flex-nowrap overflow-hidden rounded-3xl w-full h-full relative">
    <div
      class="w-full relative overflow-hidden flex-none flex justify-center items-center text-white px-7 transition duration-500 font-bold md:text-3xl md:justify-between"
      v-for="item in items"
      :key="item.ScenicSpotID"
      :style="{
        transform: `translate(-${index_ * 100}%)`,
      }"
    >
      <img
        :src="item.Picture.PictureUrl1"
        class="absolute left-0 -z-10 w-full cursor-pointer bg-no-repeat bg-cover bg-center bg-no-image-l md:bg-no-image-xl"
        @click="toScenicSpotDetail"
      />
      <img
        class="carousel__btn hidden md:block"
        src="../assets/img/icon/Arrow-Left.svg"
        @click="indexMinus"
      />
      <!-- <img class="carousel__btn" src="../assets/img/icon/Arrow-Left_hover.svg" /> -->
      <div>
        <span class="pr-2 md:pr-4 border-r-2 leading-8">{{ item.Address.slice(0, 3) }}</span>
        <span class="pl-2 md:pl-4">{{ item.ScenicSpotName }}</span>
      </div>
      <img
        class="carousel__btn hidden md:block"
        src="../assets/img/icon/Arrow-Right.svg"
        @click="indexPlus"
      />
      <!-- <img class="carousel__btn" src="../assets/img/icon/Arrow-Right_hover.svg" /> -->
    </div>
    <div class="absolute bottom-4 right-4 md:bottom-7 md:right-7 flex">
      <div
        class="carousel__index cursor-pointer w-2 h-2 mr-1.5 md:mr-3 md:w-4 md:h-4"
        v-for="(item, index) in items"
        :key="index"
        :class="{
          'bg-white': index_ === index,
          'bg-gray-400': index_ !== index
        }"
        @click="index_ = index"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { ScenicSpot } from '@/api/tourism';

const props = defineProps({
  items: {
    type: Array as PropType<ScenicSpot[]>,
    default: [],
  },
  pathName: {
    type: String,
    default: '',
  },
});

const { items, pathName } = toRefs(props);

let index_ = ref(0);

function indexPlus() {
  if (index_.value < 5) index_.value++;
}

function indexMinus() {
  if (index_.value > 0) index_.value--;
}

const router = useRouter();

function toScenicSpotDetail() {
  router.push(`/${pathName.value}/${items.value[index_.value].ScenicSpotID}`);
}

</script>


<style lang="scss" scoped>
.carousel {
  &__btn {
    &:hover {
      cursor: pointer;
      color: red;
    }
  }
  &__index {
    border-radius: 50%;
  }
}
</style>

<!-- @format -->

<template>
  <section>
    <h2 class="text-2xl mb-4 md:text-4xl">熱門主題</h2>
    <div
      class="grid grid-flow-row grid-cols-2 gap-x-4 gap-y-3 mb-16 md:grid-cols-4"
    >
      <div
        v-for="classItem in classList"
        :key="classItem.name"
        class="h-20 md:h-32 rounded-2xl overflow-hidden"
        @click="searchByClassName(classItem.name)"
      >
        <div
          :style="{ 'background-image': `url(${classItem.imgUrl})` }"
          class="w-full h-full flex items-center justify-center cursor-pointer bg-no-repeat bg-cover bg-center transform hover:scale-110 cursor-pointer transition duration-200"
        >
          <span class="text-white">{{ classItem.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PropType, toRefs } from "vue";

export interface Class {
  name: string;
  imgUrl: string;
}

const props = defineProps({
  classList: Array as PropType<Class[]>,
});
const { classList } = toRefs(props);

const emit = defineEmits(["search"]);

function searchByClassName(className: string) {
  emit("search", className);
}
</script>

<style lang="scss" scoped></style>

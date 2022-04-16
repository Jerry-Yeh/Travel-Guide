<template>
  <div class="md:border-b fixed w-full bg-white z-10">
    <div class="relative container md:mx-auto px-1 py-2 md:py-8 flex items-center justify-between">
      <div class="w-12.5 h-12.5 md:hidden"></div>
      <router-link to="/">
        <img src="../assets/img/icon/Logo-mobile.svg" class="md:hidden" />
        <img src="../assets/img/icon/Logo-desktop.svg" class="hidden md:block" />
      </router-link>
      <div
        class="w-12.5 h-12.5 bg-primary-light rounded-xl flex items-center justify-center ease-linear md:hidden"
        @click="toggleMenu"
      >
        <img src="../assets/img/icon/Bar.svg" />
      </div>

      <div class="hidden md:block">
        <router-link v-for="link in linkList" :key="link.text" :to="link.path">
          <span class="text-lg mr-5">{{ link.text }}</span>
        </router-link>
      </div>
    </div>
  </div>
  <!-- dropdown menu -->
  <div
    class="fixed right-0 top-0 md:hidden bg-white transform transition ease-in duration-300 flex flex-col px-2 z-30 rounded-bl-3xl"
    :class="{
      'translate-x-full': !menuStatus
    }"
  >
    <div class="flex py-2 pr-1 pl-7">
      <img src="../assets/img/icon/Logo-mobile.svg" class="mr-18" />
      <div
        class="w-12.5 h-12.5 bg-primary-light rounded-xl flex items-center justify-center"
        @click="toggleMenu"
      >
        <img src="../assets/img/icon/Close.svg" />
      </div>
    </div>
    <div
      v-for="(link, index) in linkList"
      :key="link.text"
      class="py-6"
      :class="{ 'border-t border-b': index === 1 }"
      @click="changePath(link.path)"
    >
      <span class="text-lg">{{ link.text }}</span>
    </div>
  </div>
  <!-- blackground blur -->
  <transition name="blur">
    <div
      v-if="menuStatus"
      class="fixed w-full h-full bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm"
      :class="{ 'z-20': menuStatus }"
    ></div>
  </transition>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';

interface Link {
  path: string;
  text: string;
}

const router = useRouter();

const linkList = reactive<Link[]>([
  {
    path: '/scenicspot',
    text: '探索景點',
  },
  {
    path: '/activity',
    text: '節慶活動',
  },
  {
    path: '/restaurant',
    text: '品嘗美食',
  },
]);

let menuStatus = ref(false);

function toggleMenu() {
  menuStatus.value = !menuStatus.value;
}

function changePath(path: string) {
  router.push(path);
  toggleMenu();
}

</script>

<style lang="scss" scoped>
.blur-leave {
  opacity: 1;
}
.blur-leave-active {
  transition: opacity 1s;
}
.blur-leave-to {
  opacity: 0;
}
.blur-enter {
  opacity: 0;
}
.blur-enter-active {
  transition: opacity 1s;
}
.blur-enter-to {
  opacity: 1;
}
</style>


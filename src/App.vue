<!-- @format -->

<template>
  <div class="flex flex-col min-h-screen">
    <Header></Header>
    <div class="container flex flex-col flex-grow mx-auto px-4 md:px-0">
      <router-view :key="route.fullPath" />
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const store = useStore();
const route = useRoute();

store.dispatch("Basic/getCity");
</script>

<style lang="scss">
@font-face {
  font-family: Noto-Sans;
  src: url("./assets/font/NotoSansCJKtc-DemiLight.otf");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

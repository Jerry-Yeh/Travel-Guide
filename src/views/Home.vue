<!-- @format -->

<template>
  <section
    class="pt-18 pb-14 md:px-24 flex flex-col items-center md:pt-40 md:flex-row md:justify-between"
  >
    <div class="mb-9">
      <h1 class="text-3xl md:text-5xl text-center md:text-left font-light mb-2">
        探索
        <span class="border-b-2 border-highlight">台灣之美</span>
        <br />讓我們更親近這片土地
      </h1>
      <div class="flex items-center flex justify-center md:justify-start">
        <img src="../assets/img/icon/Vector_yellow.svg" class="mr-1.5" />
        <span class="text-sm md:text-xl md:text-left mr-1.5"
          >台灣旅遊景點導覽</span
        >
        <span class="text-xs md:text-lg">Taiwan Travel Guide</span>
      </div>
    </div>
    <div class="home__form">
      <custom-select v-model="pageType" :options="options"></custom-select>
      <custom-input
        v-model="keyword"
        @keyup.enter="search"
        :placeholder="inputPlaceholder"
      ></custom-input>
      <custom-button @click="search" :bgColor="'primary'" :color="'white'">
        <img src="../assets/img/icon/Search30.svg" class="mr-2" />
        <span class="mr-6">搜</span>
        <span>尋</span>
      </custom-button>
    </div>
  </section>
  <section class="mb-9 h-44 md:h-100">
    <scenic-spot-carousel
      :items="scenicSpotList_"
      :pathName="`scenicSpotDetail`"
    />
  </section>
  <section class="mb-9">
    <look-more
      :title="{ default: '近期活動' }"
      :subTitle="{ default: '查看更多活動' }"
      route="activity"
      class="mb-3"
    >
    </look-more>
    <div class="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-7">
      <router-link
        v-for="activity in activityList_"
        class="flex md:rounded-2xl h-16 activity overflow-hidden md:h-40 md:border"
        :to="`/activityDetail/${activity.ActivityID}`"
      >
        <div
          v-if="activity.Picture.PictureUrl1"
          class="overflow-hidden flex-none"
        >
          <img
            :src="activity.Picture.PictureUrl1"
            class="w-22 h-full rounded-lg object-cover transform hover:scale-110 transition duration-200 cursor-pointer bg-no-image-s bg-center md:bg-no-image-l md:rounded-none md:w-40"
          />
        </div>
        <div
          class="flex flex-col flex-grow justify-between text-left px-4 md:px-7 md:py-4"
        >
          <div class="text-gray-600">
            <span class="text-xs md:text-base"
              >{{ activity.StartTime.slice(0, 10) }} -
              {{ activity.EndTime.slice(0, 10) }}</span
            >
            <div class="font-bold md:text-2xl">{{ activity.ActivityName }}</div>
          </div>
          <div class="flex justify-between">
            <div class="flex">
              <img
                src="../assets/img/icon/Vector.svg"
                class="mr-1 hidden md:block"
              />
              <span class="text-xs md:text-base whitespace-nowrap">{{
                activity.City
              }}</span>
            </div>
            <div
              class="itmes-center text-primary font-medium cursor-pointer hidden md:flex"
            >
              <span class="mr-1.5">詳細介紹</span>
              <img src="../assets/img/icon/Arrow-Right_primary.svg" />
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </section>
  <section class="mb-9">
    <look-more
      :title="{ default: '熱門打卡景點' }"
      :subTitle="{ default: '查看更多景點' }"
      route="scenicspot"
      class="mb-3"
    >
    </look-more>
    <card-list
      :dataList="popularScenicList_"
      routeName="scenicSpotDetail"
    ></card-list>
  </section>
  <section class="mb-16 md:mb-32">
    <look-more
      :title="{ default: '一再回訪美食' }"
      :subTitle="{ default: '查看更多美食' }"
      route="restaurant"
      class="mb-3"
    />
    <card-list
      :dataList="restaurantList_"
      routeName="restaurantDetail"
    ></card-list>
  </section>
</template>

<script lang="ts" setup>
// Vue
import { computed, ref, watch, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// Utility
import useUtility from "@/plugins/utility";

// Component
import CustomSelect, { Option } from "@/components/CustomSelect.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import ScenicSpotCarousel from "@/components/ScenicSpotCarousel.vue";
import LookMore from "@/components/LookMore.vue";
import CardList from "@/components/CardList.vue";

// Type
import { Activity, ScenicSpot, Restaurant } from "@/api/tourism";
import { CardData } from "@/components/Card.vue";

// API
import TourismService from "@/services/tourismService";

const store = useStore();
const router = useRouter();
const { scrollToTop, formatCity } = useUtility();

// Search

const options: Option[] = [
  {
    value: "scenicSpot",
    title: "探索景點",
  },
  {
    value: "activity",
    title: "節慶活動",
  },
  {
    value: "restaurant",
    title: "品嚐美食",
  },
];
const pageType = ref<string>("scenicSpot");
const keyword = ref<string>("");
const inputPlaceholder = ref<string>("你想去哪裡？請輸入關鍵字");

function search() {
  console.log("search", keyword.value);
  router.push({
    name: pageType.value,
    query: {
      keyword: keyword.value,
    },
  });
}

// Carousel scenic spot data
let scenicSpotList_ = reactive<ScenicSpot[]>([]);

TourismService.getScenicSpot({
  $filter: "Picture/PictureUrl1 ne null and Class1 ne null",
  $top: 6,
}).then((response) => {
  scenicSpotList_.push(...response);
});

// Recently Activity data
let activityList_ = reactive<Activity[]>([]);

TourismService.getActivity({
  $filter: "Picture/PictureUrl1 ne null",
  $top: 4,
}).then((response) => {
  activityList_.push(...response);
});

// Popular scenic spot data
let popularScenicList_ = reactive<CardData[]>([]);

TourismService.getScenicSpot({
  $filter: "Picture/PictureUrl1 ne null and Class1 ne null",
  $top: 4,
  $skip: 6,
}).then((response) => {
  const popularScenicSpotList = response.map((scenicSpot: ScenicSpot) => {
    return {
      id: scenicSpot.ScenicSpotID,
      name: scenicSpot.ScenicSpotName,
      picture: scenicSpot.Picture,
      city: formatCity(scenicSpot.Address),
    };
  });
  popularScenicList_.push(...popularScenicSpotList);
});

// Popular Restaurant data
let restaurantList_ = reactive<CardData[]>([]);

TourismService.getRestaurant({
  $filter: "Picture/PictureUrl1 ne null",
  $top: 4,
}).then((response) => {
  const resaurantList = response.map((restaurant: Restaurant) => {
    return {
      id: restaurant.RestaurantID,
      name: restaurant.RestaurantName,
      picture: restaurant.Picture,
      city: formatCity(restaurant.Address),
    };
  });
  restaurantList_.push(...resaurantList);
});

onMounted(() => {
  scrollToTop();
});
</script>

<style lang="scss" scoped>
.home {
  &__form {
    width: 350px;
  }
}
</style>

<!-- @format -->

<template>
  <div class="flex flex-col flex-grow pt-22 text-left md:pt-36">
    <section class="mb-4">
      <breadcrumb :mode="mode_"> </breadcrumb>
    </section>
    <section class="flex flex-col mb-6 md:flex-row md:gap-x-4">
      <div class="md:flex-1">
        <custom-select
          class="md:flex-1"
          v-model="city_"
          :options="cityOptions_"
        ></custom-select>
      </div>
      <div class="md:flex-2">
        <custom-input
          v-model="keyword_"
          placeholder="你想去哪裡?請輸入關鍵字"
        ></custom-input>
      </div>
      <div class="md:flex-1">
        <custom-button @click="search()" :bgColor="'primary'" :color="'white'">
          <img src="../assets/img/icon/Search30.svg" class="mr-2" />
          <span class="mr-6">搜</span>
          <span>尋</span>
        </custom-button>
      </div>
    </section>
    <popular-class
      v-if="searchStatus_"
      :classList="classList_"
      @search="search"
    ></popular-class>
    <search-result
      v-else
      :dataList="restaurantList_"
      routeName="restaurantDetail"
      class="flex-grow"
    ></search-result>
  </div>
</template>

<script lang="ts" setup>
// Vue
import {
  ref,
  toRefs,
  reactive,
  computed,
  watch,
  onMounted,
} from "vue";
import { useStore } from "vuex";

// Type
import type { City } from "@/api/basic";
import type { Parameters } from "@/api/api";
import type { CardData } from "@/components/Card.vue";

// Component
import Breadcrumb from "@/components/Breadcrumb.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import PopularClass, { Class } from "@/components/PopularClass.vue";
import SearchResult from "@/components/SearchResult.vue";

// API
import TourismService from "@/services/tourismService";

// Utility
import useUtility from "@/plugins/utility";

const props = defineProps({
  cityName: String,
  keyword: String,
  className: String,
});
const { cityName, keyword } = toRefs(props);

const store = useStore();
const { scrollToTop, formatCity } = useUtility();

const mode_ = ref("Restaurant");
let keyword_ = ref(`${keyword?.value ? keyword?.value : ""}`);

// City
let city_ = ref("");

const _cityList = computed<City[]>(() => store.getters["Basic/cityList"]);

let cityOptions_ = computed(() => {
  const list = _cityList.value.map((city) => {
    return {
      title: city.CityName,
      value: city.City,
    };
  });
  list.unshift({
    title: "全部縣市",
    value: "",
  });
  return list;
});

function initCity() {
  const cityItem_ = _cityList.value.find(
    (city) => city.CityName === cityName?.value
  );
  city_.value = cityItem_ ? cityItem_.City : "";
}

watch(_cityList, () => {
  initCity();
});

// Search
let restaurantList_ = reactive<CardData[]>([]);

async function search(className?: string) {
  const parameters: Parameters = {
    $filter: `(
      contains(RestaurantName, '${keyword_.value}') or
      contains(Description, '${keyword_.value}')
    )`,
  };
  let response;
  if (className) {
    parameters.$filter += ` and (
      contains(Class, '${className}')
    )`;
  }
  if (city_.value) {
    response = await TourismService.getRestaurantByCity(
      city_.value,
      parameters
    ).then((response) => response);
  } else {
    response = await TourismService.getRestaurant(parameters).then((response) => response);
  }
  const data = response.map((restaurant) => {
    return {
      id: restaurant.RestaurantID,
      picture: restaurant.Picture,
      city: restaurant.City ? restaurant.City : formatCity(restaurant.Address),
      name: restaurant.RestaurantName,
    };
  });
  restaurantList_.splice(0, restaurantList_.length);
  searchStatus_.value = false;
  restaurantList_.push(...data);
}

// Poupular Class
let searchStatus_ = ref(true);
const classList_ = reactive<Class[]>([
  {
    name: "地方特產",
    imgUrl: "src/assets/img/restaurant/地方特產類.png",
  },
  {
    name: "中式美食",
    imgUrl: "src/assets/img/restaurant/中式美食類.png",
  },
  {
    name: "甜點冰品",
    imgUrl: "src/assets/img/restaurant/甜點冰品類.png",
  },
  {
    name: "異國料理",
    imgUrl: "src/assets/img/restaurant/異國料理類.png",
  },
  {
    name: "伴手禮",
    imgUrl: "src/assets/img/restaurant/伴手禮類.png",
  },
  {
    name: "素食",
    imgUrl: "src/assets/img/restaurant/素食類.png",
  },
]);

onMounted(() => {
  initCity();
});
</script>

<style lang="scss" scoped></style>

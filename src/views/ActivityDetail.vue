<!-- @format -->

<template>
  <div class="pt-22 text-left md:pt-36">
    <section class="mb-4">
      <breadcrumb
        :mode="mode_"
        :cityName="cityName_"
        :title="state_.data.ActivityName"
      ></breadcrumb>
    </section>
    <section class="mb-9 h-46 md:h-100 mb-4">
      <carousel :items="carouselItems_"></carousel>
    </section>
    <section class="mb-7">
      <h1 class="text-2xl mb-2">{{ state_.data.ActivityName }}</h1>
      <div class="flex mb-4">
        <tag
          v-for="className in formatClass(state_.data)"
          :key="className"
          :name="className"
          class="mr-1"
        ></tag>
      </div>
      <h2 class="font-bold mb-2">{{ title_ }}介紹 :</h2>
      <p>{{ state_.data.Description }}</p>
    </section>
    <section
      class="bg-gray-50 -mx-4 px-4 py-7 flex flex-col md:items-start mb-15 md:mx-0 md:px-0 md:flex-row md:bg-white"
    >
      <div
        class="mb-5 flex-auto rounded-xl md:mb-0 md:bg-gray-50 md:mr-4 md:p-7.5"
      >
        <div class="flex mb-2" v-for="detail in info_" :key="detail.title">
          <h3 class="font-bold mr-1 whitespace-nowrap">{{ detail.title }} :</h3>
          <div :class="{ 'text-gray-400': detail.content === _defaultInfo }">
            <p v-if="!detail.link" class="break-all">{{ detail.content }}</p>
            <a
              v-else
              :href="detail.link"
              target="_blank"
              class="text-primary underline break-all"
            >
              {{ detail.content }}
            </a>
          </div>
        </div>
      </div>
      <div class="flex flex-col flex-auto md:ml-4">
        <google-map
          :position="state_.data.Position"
          class="h-46 mb-8"
        ></google-map>
        <nearby
          :position="state_.data.Position"
          :id="state_.data.ActivityID"
        ></nearby>
      </div>
    </section>
    <section class="mb-22 md:mb-30">
      <look-more
        :title="lookMoreTitle_"
        :subTitle="lookMoreSubTitle_"
        route="activity"
        :city="cityName_"
        class="mb-3"
      ></look-more>
      <card-list
        :dataList="activityList_"
        routeName="activityDetail"
      ></card-list>
    </section>
  </div>
</template>

<script lang="ts" setup>
// Vue
import { toRefs, reactive, ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// Type
import { Activity } from "@/api/tourism";
import type { City } from "@/api/basic";
import type { CardData } from "@/components/Card.vue";

// API
import TourismService from "@/services/tourismService";

// Utility
import useUtility from "@/plugins/utility";

// Component
import Breadcrumb from "@/components/Breadcrumb.vue";
import Carousel from "@/components/Carousel.vue";
import Tag from "@/components/Tag.vue";
import GoogleMap from "@/components/GoogleMap.vue";
import Nearby from "@/components/Nearby.vue";
import LookMore from "@/components/LookMore.vue";
import CardList from "@/components/CardList.vue";

interface Detail {
  title: string;
  content: string;
  link?: string;
}

const router = useRouter();
const store = useStore();
const { scrollToTop, formatCity, formatPicture, formatClass, formatTime } =
  useUtility();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const { id } = toRefs(props);

const _defaultInfo = computed(() => store.state.defaultInfo);
let carouselItems_ = reactive<string[]>([]);

let mode_ = ref("Activity");
let title_ = ref("活動");

// Initialize data
const state_ = reactive<{ data: Activity }>({
  data: {
    ActivityID: "",
    ActivityName: "",
    SrcUpdateTime: "",
    Address: "",
    UpdateTime: "",
    StartTime: "",
    EndTime: "",
    Phone: "",
    MapUrl: "",
    WebsiteUrl: "",
    Remarks: "",
    Charge: "",
    Organizer: "",
    City: "",
    Picture: {
      PictureUrl1: "",
      PictureDescription1: "",
      PictureUrl2: "",
      PictureDescription2: "",
      PictureUrl3: "",
      PictureDescription3: "",
    },
    Position: {
      PositionLon: 0,
      PositionLat: 0,
      GeoHash: "",
    },
  },
});

const lookMoreTitle_ = reactive({
  default: "還有這些不能錯過",
  md: `還有這些不能錯過的${title_.value}`,
});
let lookMoreSubTitle_ = reactive({
  default: `查看更多${title_.value}`,
  md: computed(() => `更多${formatCity(state_.data.Address)}${title_.value}`),
});
let info_ = reactive<Detail[]>([]);

function getActivity() {
  TourismService.getActivity({
    $filter: `ActivityID eq '${id.value}'`,
    $top: 1,
  }).then((response: Activity[]) => {
    state_.data = response[0];
    carouselItems_.push(...formatPicture(state_.data.Picture));
    formatPicture(state_.data.Picture);
    info_.push(
      {
        title: "活動時間",
        content:
          formatTime(state_.data.StartTime) +
          " - " +
          formatTime(state_.data.EndTime),
      },
      {
        title: "聯絡電話",
        content: state_.data.Phone ? state_.data.Phone : _defaultInfo.value,
      },
      {
        title: "主辦單位",
        content: state_.data.Organizer,
      },
      {
        title: "活動地點",
        content: state_.data.Address,
        link: state_.data.MapUrl ? state_.data.MapUrl : "",
      },
      {
        title: "官方網站",
        content: state_.data.WebsiteUrl
          ? state_.data.WebsiteUrl
          : _defaultInfo.value,
        link: state_.data.WebsiteUrl ? state_.data.WebsiteUrl : "",
      },
      {
        title: "活動費用",
        content: state_.data.Charge ? state_.data.Charge : _defaultInfo.value,
      },
      {
        title: "注意事項",
        content: state_.data.Remarks ? state_.data.Remarks : _defaultInfo.value,
      }
    );
    scrollToTop();
  });
}

// Nearby data
const _cityList = computed<City[]>(() => store.getters["Basic/cityList"]);
let cityName_ = computed(() =>
  state_.data.City ? state_.data.City : formatCity(state_.data.Address)
);
let activityList_ = reactive<CardData[]>([]);

watch([cityName_, _cityList], ([newCityName, newCityList]) => {
  if (newCityName && newCityList) {
    const city = newCityList.find((city) => city.CityName === newCityName);
    TourismService.getActivityByCity(city?.City || "", {
      $top: 4,
      $filter: `Picture/PictureUrl1 ne null and Class1 ne null and ActivityID ne '${id.value}'`,
    }).then((response: Activity[]) => {
      const data = response.map((activity) => {
        return {
          id: activity.ActivityID,
          picture: activity.Picture,
          city: activity.City,
          name: activity.ActivityName,
        };
      });
      activityList_.push(...data);
    });
  }
});

onMounted(() => {
  getActivity();
});
</script>

<style lang="scss" scoped></style>

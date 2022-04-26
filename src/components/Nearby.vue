<template>
  <div class="w-full">
    <h3 class="font-bold mb-4">周邊資訊 :</h3>
    <div class="flex flex-col md:flex-row w-full">
      <div
        v-for="(item, index) in items_"
        :key="item.name"
        class="flex flex-col flex-auto items-center border-2 border-gray-3 py-3 rounded-lg bg-gray-50"
        :class="{
          'mb-2 md:mb-0': index !== items_.length - 1,
          'md:mx-7': index === 1,
          'cursor-pointer': item.id,
        }"
        @click="changeRoute(item)"
      >
        <img :src="item.icon" class="w-6 mb-1.5" />
        <div>
          <span
            class="font-bold"
            :class="{ 'text-gray-400': !item.id, 'text-primary': item.id }"
          >{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, reactive, PropType, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Position } from '@/api/tourism';
import { Parameters } from '@/api/api';
import TourismService from '@/services/tourismService';

interface Item {
  name: string;
  icon: string;
  route: string;
  id: string;
}

const props = defineProps({
  position: {
    type: Object as PropType<Position>,
    required: true
  },
  id: {
    type: String,
    required: true
  },
});
const { position, id } = toRefs(props);
const router = useRouter();

const items_ = reactive([
  {
    name: '附近景點',
    icon: new URL('../assets/img/icon/ScenicSpot.svg', import.meta.url).href,
    route: 'scenicSpotDetail',
    id: ''
  },
  {
    name: '附近活動',
    icon: new URL('../assets/img/icon/Activity.svg', import.meta.url).href,
    route: 'activityDetail',
    id: ''
  },
  {
    name: '附近美食',
    icon: new URL('../assets/img/icon/Restaurant.svg', import.meta.url).href,
    route: 'restaurantDetail',
    id: ''
  },
]);

watch(position, (newValue: Position) => {
  const parameters: Parameters = {
    $spatialFilter: `nearby(${newValue.PositionLat},${newValue.PositionLon},1000)`,
    $top: 1
  };
  TourismService.getScenicSpot(parameters).then((response) => {
    const nearbyScenicSpot = response.find((scenicSpot) => scenicSpot.ScenicSpotID !== id.value);
    if (nearbyScenicSpot) items_[0].id = nearbyScenicSpot.ScenicSpotID;
  });
  TourismService.getActivity(parameters).then((response) => {
    const nearbyActivity = response.find((Activity) => Activity.ActivityID !== id.value);
    if (nearbyActivity) items_[1].id = nearbyActivity.ActivityID;
  });
  TourismService.getRestaurant(parameters).then((response) => {
    const nearbyRestaurant = response.find((restaurant) => restaurant.RestaurantID !== id.value);
    if (nearbyRestaurant) items_[2].id = nearbyRestaurant.RestaurantID;
  });
});

function changeRoute(item: Item) {
  if (item.id) router.push(`/${item.route}/${item.id}`);
}

</script>


<style lang="scss" scoped>
</style>

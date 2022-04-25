import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ScenicSpot from '../views/ScenicSpot.vue';
import ScenicSpotDetail from '../views/ScenicSpotDetail.vue';
import ActivityDetail from '../views/ActivityDetail.vue';
import RestaurantDetail from '../views/RestaurantDetail.vue';
import Activity from '../views/Activity.vue';
import Restaurant from '../views/Restaurant.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/scenicSpotDetail/:id',
    name: 'scenicSpotDetail',
    component: ScenicSpotDetail,
    props: true
  },
  {
    path: '/activityDetail/:id',
    name: 'activityDetail',
    component: ActivityDetail,
    props: true
  },
  {
    path: '/restaurantDetail/:id',
    name: 'restaurantDetail',
    component: RestaurantDetail,
    props: true
  },
  {
    path: '/scenicSpot',
    name: 'scenicSpot',
    component: ScenicSpot,
    props: route => ({
      cityName: route.query.cityName,
      keyword: route.query.keyword,
      className: route.query.className,
    })
  },
  {
    path: '/activity',
    name: 'activity',
    component: Activity,
    props: route => ({
      cityName: route.query.cityName,
      keyword: route.query.keyword,
      className: route.query.className,
    })
  },
  {
    path: '/restaurant',
    name: 'restaurant',
    component: Restaurant,
    props: route => ({
      cityName: route.query.cityName,
      keyword: route.query.keyword,
      className: route.query.className,
    })
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

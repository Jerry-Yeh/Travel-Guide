import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import '@/assets/css/tailwind.css';

// Component
import FontAwesomeIcon from '@/plugins/fontawesome';
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const app = createApp(App);

app
  .use(router)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');

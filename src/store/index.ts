import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import Basic from './modules/basic.module';
import Tourism from './modules/tourism.module';

export interface RootState {
  defaultInfo: string;
}

export default createStore<RootState>({
  modules: {
    Basic,
    Tourism,
  },
  state: {
    defaultInfo: '暫無資訊'
  },
  getters: {},
  mutations,
  actions,
});

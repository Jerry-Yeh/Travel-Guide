import { ActionContext } from 'vuex';
import { RootState } from '@/store/index';
import { Parameters } from '@/api/api';
import { City } from '@/api/basic';
import BasicService from '@/services/basicService';

export interface State {
  cityList: City[];
}

const Basic = {
  namespaced: true,
  state: {
    cityList: [],
  },
  actions: {
    getCity: ({ commit }: ActionContext<State, RootState>, parameters?: Parameters): void => {
      BasicService.getCity(parameters).then(
        (data: City[]) => {
          commit('getCity', data);
        }
      );
    },
  },
  mutations: {
    getCity: (state: State, data: City[]) => {
      state.cityList = data;
    },
  },
  getters: {
    cityList(state: State) {
      return state.cityList;
    }
  }
};

export default Basic;
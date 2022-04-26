import { ActionContext } from 'vuex';
import { RootState } from '../index';
import { Parameters } from '@/apis/api';
import { ScenicSpot, Activity, Restaurant, Picture } from '@/apis/tourism';
import TourismService from "@/services/tourismService";

interface State {}

const Tourism = {
  namespaced: true,
  states: {},
  actions: {},
  mutations: {},
  getters: {},
};

export default Tourism;
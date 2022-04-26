import { AxiosResponse } from 'axios';
import Api, { Parameters } from './api';

export interface City {
  CityName: string;
  City: string;
}

export default class Basic {
  static getCity(paramters?: Parameters): Promise<AxiosResponse<City[]>> {
    return Api.v3Req('get', 'Basic/City', paramters);
  }
} 
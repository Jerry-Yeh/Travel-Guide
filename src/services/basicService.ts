import { AxiosResponse } from "axios";
import { Parameters } from '@/apis/api';
import BasicAPI, { City } from "@/apis/basic";

export default class TourismService {
  static getCity(data?: Parameters): Promise<City[]> {
    return BasicAPI.getCity(data).then(
      (response: AxiosResponse<City[]>) => {
        return response.data;
      }
    );
  }
}
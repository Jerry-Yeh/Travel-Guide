import { AxiosResponse } from "axios";
import { Parameters } from '@/apis/api';
import TourismAPI, { ScenicSpot, Restaurant, Activity } from "@/apis/tourism";

export default class TourismService {
  static getScenicSpot(data?: Parameters): Promise<ScenicSpot[]> {
    return TourismAPI.getScenicSpot(data).then(
      (response: AxiosResponse<ScenicSpot[]>) => response.data
    );
  }

  static getScenicSpotByCity(city: string, data?: Parameters): Promise<ScenicSpot[]> {
    return TourismAPI.getScenicSpotByCity(city, data).then(
      (response: AxiosResponse<ScenicSpot[]>) => response.data
    );
  }

  static getActivity(data?: Parameters): Promise<Activity[]> {
    return TourismAPI.getActivity(data).then(
      (response: AxiosResponse<Activity[]>) => response.data
    );
  }

  static getActivityByCity(city: string, data?: Parameters): Promise<Activity[]> {
    return TourismAPI.getActivityByCity(city, data).then(
      (response: AxiosResponse<Activity[]>) => response.data
    );
  }

  static getRestaurant(data?: Parameters): Promise<Restaurant[]> {
    return TourismAPI.getRestaurant(data).then(
      (response: AxiosResponse<Restaurant[]>) => response.data
    );
  }

  static getRestaurantByCity(city: string, data?: Parameters): Promise<Restaurant[]> {
    return TourismAPI.getRestaurantByCity(city, data).then(
      (response: AxiosResponse<Restaurant[]>) => response.data
    );
  }

}
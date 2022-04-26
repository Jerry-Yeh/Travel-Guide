import { AxiosResponse } from 'axios';
import Api, { Parameters } from './api';

export interface Position {
  PositionLon: number;
  PositionLat: number;
  GeoHash: string;
}

export interface Picture {
  PictureUrl1: string;
  PictureDescription1: string;
  PictureUrl2: string;
  PictureDescription2: string;
  PictureUrl3: string;
  PictureDescription3: string;
}

export interface Basic {
  Description?: string;
  Address: string;
  ZipCode?: string;
  Phone: string;
  WebsiteUrl?: string;
  Picture: Picture;
  Position: Position;
  MapUrl?: string;
  ParkingInfo?: string;
  City: string;
  SrcUpdateTime: string; // ISO8601 format: yyyy-MM-ddTHH:mm:sszzz
  UpdateTime: string;    // ISO8601 format: yyyy-MM-ddTHH:mm:sszzz
}

export interface ScenicSpot extends Basic {
  ScenicSpotID: string;
  ScenicSpotName: string;
  DescriptionDetail?: string;
  TravelInfo?: string;
  OpenTime: string;
  Level?: string;
  PackingInfo?: string;
  ParkingPosition?: Position;
  Class1?: string;
  Class2?: string;
  Class3?: string;
  TicketInfo?: string;
  Remarks?: string;
  Keyword?: string;
}

export interface Restaurant extends Basic {
  RestaurantID: string;
  RestaurantName: string;
  OpenTime: string;
  Class?: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface Activity extends Basic {
  ActivityID: string;
  ActivityName: string;
  Description?: string;
  Particpation?: string;
  Location?: string;
  Organizer: string;
  StartTime: string;     // ISO8601 format: yyyy-MM-ddTHH:mm:sszzz
  EndTime: string;       // ISO8601 format: yyyy-MM-ddTHH:mm:sszzz
  Cycle?: string;
  NoneCycle?: string;
  Class1?: string;
  Class2?: string;
  TravelInfo?: string;
  ParkingInfo?: string;
  Charge?: string;
  Remarks?: string;
}

export default class Tourism {
  static getScenicSpot(paramters?: Parameters): Promise<AxiosResponse<ScenicSpot[]>> {
    return Api.v2Req('get', 'ScenicSpot', paramters);
  }

  static getScenicSpotByCity(city: string, paramters?: Parameters): Promise<AxiosResponse<ScenicSpot[]>> {
    return Api.v2Req('get', `ScenicSpot/${city}`, paramters);
  }

  static getRestaurant(paramters?: Parameters): Promise<AxiosResponse<Restaurant[]>> {
    return Api.v2Req('get', 'Restaurant', paramters);
  }

  static getRestaurantByCity(city: string, paramters?: Parameters): Promise<AxiosResponse<Restaurant[]>> {
    return Api.v2Req('get', `Restaurant/${city}`, paramters);
  }

  static getActivity(paramters?: Parameters): Promise<AxiosResponse<Activity[]>> {
    return Api.v2Req('get', 'Activity', paramters);
  }

  static getActivityByCity(city: string, paramters?: Parameters): Promise<AxiosResponse<Activity[]>> {
    return Api.v2Req('get', `Activity/${city}`, paramters);
  }
}
import jsSHA from 'jssha';
import axios, { AxiosRequestConfig } from 'axios';

interface APIHeaders {
  Authorization: string;
  "X-Date": string;
}

export interface Parameters {
  $select?: string;
  $filter?: string;
  $orderBy?: string;
  $top?: number;
  $skip?: number;
  $spatialFilter?: string;
  health?: boolean;
  $format?: string;         // default: JSON
}

function getAPIHeaders(): APIHeaders {
  const AppID = import.meta.env.VITE_APP_PTX_ID;
  const AppKey = import.meta.env.VITE_APP_PTX_KEY;
  const GMTString = new Date().toUTCString();
  const ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  const HMAC = ShaObj.getHMAC("B64");
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return {
    Authorization: Authorization,
    "X-Date": GMTString,
  };
};

const v2Instance = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/',
  headers: { 'Content-Type': 'application/josn', ...getAPIHeaders() },
  timeout: 20000
});

v2Instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

v2Instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log('你要找的頁面不存在');
          break;
        case 500:
          console.log('程式發生問題');
          break;
        default:
          console.log(error.message);
          break;
      }
    }
    if (!window.navigator.onLine) {
      alert('網路出了點問題，請重新連線後重整網頁');
      return;
    }
    return Promise.reject(error);
  }
);

const v3Instance = axios.create({
  baseURL: 'https://gist.motc.gov.tw/gist_api/V3/Map/',
  headers: { 'Content-Type': 'application/josn', ...getAPIHeaders() },
  timeout: 20000
});

export default class Api {
  static v2Req(method: string, url: string, data: Parameters | null = null, config?: AxiosRequestConfig<null> | undefined) {
    switch (method) {
      case 'post':
        return v2Instance.post(url, data, config);
      case 'get':
        return v2Instance.get(url, { params: data });
      default:
        console.warn(`未知的 method: ${method}`);
        return Promise.reject();
    }
  }

  static v3Req(method: string, url: string, data: Parameters | null = null, config?: AxiosRequestConfig<null> | undefined) {
    switch (method) {
      case 'post':
        return v3Instance.post(url, data, config);
      case 'get':
        return v3Instance.get(url, { params: data });
      default:
        console.warn(`未知的 method: ${method}`);
        return Promise.reject();
    }
  }
}

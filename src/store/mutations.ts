import axios from "axios";
import jsSHA from "jssha";
import { RootState } from "./index";

interface APIHeaders {
  headers: {
    Authorization: string;
    "X-Date": string;
  };
}

function getAPIHeaders(): APIHeaders {
  const AppID = "8c62ce33fcdc4ef48048f66d78608de1";
  const AppKey = "Q8ImsvuvjN9dUpCWt9m6Gl4jb54";
  const GMTString = new Date().toUTCString();
  const ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  const HMAC = ShaObj.getHMAC("B64");
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return {
    headers: {
      Authorization: Authorization,
      "X-Date": GMTString,
    },
  };
}

export default {
  async getActivity(state: RootState, top?: number): Promise<any> {
    // let url =
    //   "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON";
    // url += "&$filter=Picture/PictureUrl1 ne null and Address ne null";
    // if (top) url += `&$top=${top}`;
    // axios
    //   .get(url, getAPIHeaders())
    //   .then((response: any) => {
    //     state.activity = response.data;
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });
  },
};

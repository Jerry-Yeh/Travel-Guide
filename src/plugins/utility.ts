import { } from 'vue';
import { Picture, ScenicSpot, Activity, Restaurant } from '@/apis/tourism';
import moment from 'moment';

export default function () {

  function scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function formatCity(address: string): string {
    return address.substring(0, 3);
  }

  function formatPicture(picture: Picture): string[] {
    const pictureUrlArr = [];
    for (const key of Object.keys(picture)) {
      if (key.includes('PictureUrl')) pictureUrlArr.push(picture[key as keyof Picture]);
    }
    return pictureUrlArr;
  }

  function formatClass(data: ScenicSpot | Activity | Restaurant): string[] {
    const classArr = [];
    for (const key of Object.keys(data)) {
      const value = data[key as keyof (ScenicSpot | Activity | Restaurant)];
      if (key.includes('Class') && typeof value === 'string') classArr.push(value);
    }
    return classArr;
  }

  function formatTime(time: string) {
    return moment(time).format('YYYY/MM/DD h:mm');
  }

  return {
    scrollToTop,
    formatCity,
    formatPicture,
    formatClass,
    formatTime,
  }
}
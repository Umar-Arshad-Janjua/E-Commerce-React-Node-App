import meatImage from './images/df.png';
import freshFruitsImage from './images/ff.png';
import vegetablesImage from './images/v.png';
import berriesImage from './images/vt.png';

const data = [
  {
    title: "Meat",
    price: "200$",
    pic: meatImage,
  },
  {
    title: "Fresh Fruits",
    price: "200$",
    pic: freshFruitsImage,
    quantityInCart: 0,
    inCart: false,
  },
  {
    title: "Vegetables",
    price: "200$",
    pic: vegetablesImage,
    quantityInCart: 0,
    inCart: false,
  },
  {
    title: "Berries",
    price: "200$",
    pic: berriesImage,
    quantityInCart: 0,
    inCart: false,
  },
];

export function getData() {
  return data;
}

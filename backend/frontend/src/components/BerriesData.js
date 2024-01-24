import strawberriesImage from './images/strawberries.png';
import grapesImage from './images/grapes.png';
import raspberryImage from './images/raspberry.png';

const data = [
  {
    title: "Strawberry",
    price: 40,
    pic: strawberriesImage,
    quantityInCart: 0,
    inCart: false,
  },
  {
    title: "Grapes",
    price: 70,
    pic: grapesImage,
    quantityInCart: 0,
    inCart: false,
  },
  {
    title: "Raspberry",
    price: 20,
    pic: raspberryImage,
    quantityInCart: 0,
    inCart: false,
  }
];

export function getBerriesData() {
  return data;
}

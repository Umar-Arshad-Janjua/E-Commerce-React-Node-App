import beefImage from './images/beef.png';
import chickenImage from './images/chicken.png';
import lambImage from './images/lamb.png';

const data = [
  {
    title: "Beef",
    price: 30,
    pic: beefImage,
    quantityInCart: 0,
    inCart: false,
  },
  {
    title: "Chicken",
    price: 40,
    pic: chickenImage,
    quantityInCart: 0,
    inCart: false,
  },
  {
    title: "Lamb",
    price: 80,
    pic: lambImage,
    quantityInCart: 0,
    inCart: false,
  }
];

export function getMeatData() {
  return data;
}

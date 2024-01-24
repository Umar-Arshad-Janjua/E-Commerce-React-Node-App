import peas from './images/peas.png';
import tomato from './images/tomato.png';
import cabbageImage from './images/cabbage.png';

const data = [
  {
    title: "Tomato",
    price: 20,
    pic: tomato,
  },
  {
    title: "Peas",
    price: 30,
    pic: peas,
    quantityInCart: 0,
    inCart: false,
  },
  {
    title: "Cabbage",
    price: 40,
    pic: cabbageImage,
    quantityInCart: 0,
    inCart: false,
  },
];

export function getVegetablesData() {
  return data;
}

import bananaImage from './images/banana.png';
import watermelonImage from './images/watermelon.png';
import mangoImage from './images/mango.jpg';

const data = [
  {
    title: "Banana",
    price: 200,
    pic: bananaImage,
  },
  {
    title: "Watermelon",
    price: 200,
    pic: watermelonImage,
  },
  {
    title: "Mango",
    price: 200,
    pic: mangoImage,
  }
];

export function getFruitsData() {
  return data;
}

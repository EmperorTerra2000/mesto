import {popupElementZoomImage} from './Contants.js';
import PopupWithImage from '../components/PopupWithImage.js';
//функция передается как параметр конструктору класса Card
//для того чтобы при нажатии на img карточки, выскочил попап
export function handleCardClick(name, link){
  const popupZoomImage = new PopupWithImage({description: name, src: link}, popupElementZoomImage);

  popupZoomImage.open();
  popupZoomImage.setEventListeners();
}
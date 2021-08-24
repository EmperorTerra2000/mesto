import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { popupZoomImage } from '../pages/index.js';

//функция передается как параметр конструктору класса Card
//для того чтобы при нажатии на img карточки, выскочил попап
export function handleCardClick(name, link){
  popupZoomImage.open(name, link);
  popupZoomImage.setEventListeners();
}
export function createCard(item, templateSelector, handleMethod){
  return new Card(item, templateSelector, handleMethod);
}
export function createSection(objectData, elementSelector){
  return new Section(objectData, elementSelector);
}
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { popupZoomImage } from '../pages/index.js';

//функция передается как параметр конструктору класса Card
//для того чтобы при нажатии на img карточки, выскочил попап
export function handleCardClick(name, link){
  popupZoomImage.open(name, link);
}
export function createCard(item, handleClickImg, handleOpenPopup, api, userId, templateSelector){
  return new Card(item,{
    handleCardClick: handleClickImg,
    handleOpenPopupDelete: handleOpenPopup,
    api: api,
    userId: userId,
  }, templateSelector);
}
export function createSection(objectData, elementSelector){
  return new Section(objectData, elementSelector);
}
import './index.css';//путь к стилям для вебпака

import initialCards from '../utils/initial-cards.js'; //массив данных изначальных карточек
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {popupElementProfile,listElement,popupElementAddMesto,
  popupProfileOpen,popupAddMestoOpen,popupName,popupDuty,profileName,profileDuty,
  formSettings,formSlctrEditProfile,formSlctrAddMesto} from '../utils/Contants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { handleCardClick } from '../utils/utils.js';

//валидация форм
const formValidatorProfile = new FormValidator(formSettings, formSlctrEditProfile);

formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(formSettings, formSlctrAddMesto);

formValidatorAddCard.enableValidation();

const profileUser = new UserInfo({name: profileName, duty: profileDuty});

//создание экземпляров на основе класса PopupWithForm
const popupFormAddMesto = new PopupWithForm({
  handleFormSubmit: (formData) => {
    //при создании экземпляра Section передаём ему объект с данными формы
    const cardList = new Section({items: formData, renderer: (item) => {
      const card = new Card(item, '#element-template', handleCardClick);
    
      const cardElement = card.generateCard();
    
      cardList.addItem(cardElement);
    }}, listElement);
    
    cardList.renderItems();
  }
}, popupElementAddMesto);

const popupFormProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    profileUser.setUserInfo(formData.name, formData.duty);
  }
}, popupElementProfile);

const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '#element-template', handleCardClick);

  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}}, listElement);

cardList.renderItems();

popupProfileOpen.addEventListener('click', () => {
  popupName.value = profileUser.getUserInfo().name;
  popupDuty.value = profileUser.getUserInfo().duty;
  
  formValidatorProfile.removeErrorText();
  popupFormProfile.open();
});
popupFormProfile.setEventListeners();

popupAddMestoOpen.addEventListener('click', () => {
  formValidatorAddCard.removeErrorText();
  popupFormAddMesto.open();
});
popupFormAddMesto.setEventListeners();
import './index.css';//путь к стилям для вебпака

import initialCards from '../utils/initial-cards.js'; //массив данных изначальных карточек
import FormValidator from '../components/FormValidator.js';
import {popupElementProfile,listElement,popupElementAddMesto,
  popupProfileOpen,popupAddMestoOpen,popupName,popupDuty,profileName,profileDuty,
  formSettings,formSlctrEditProfile,formSlctrAddMesto} from '../utils/Contants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { handleCardClick, createCard, createSection} from '../utils/utils.js';

/* Найденные DOM элементы не являются константами т.к. ищутся на странице во время выполнения скрипта.
Тем более в проекте могут быть другие страницы, помимо index.html, и на этих страницах таких элементов может не быть,
но они все равно будут искаться.Не нужно их размещать в файле constants.js, следует перенести в index.js. */
const popupElementZoomImage = document.querySelector('.popup_type_zoom-image');

//валидация форм
const formValidatorProfile = new FormValidator(formSettings, formSlctrEditProfile);

formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(formSettings, formSlctrAddMesto);

formValidatorAddCard.enableValidation();

//экземпляр класса, отвечающий за контент profile
const profileUser = new UserInfo({name: profileName, duty: profileDuty});
//открывает модальное окно при нажатии на img карточки
export const popupZoomImage = new PopupWithImage(popupElementZoomImage);
popupZoomImage.setEventListeners();
//экземпляр класса, отвечающий за добавление карточек в разметку
const cardList = createSection({items: initialCards, renderer: (item) => {
  const card = createCard(item, '#element-template', handleCardClick);

  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}}, listElement);

cardList.renderItems();
//создание экземпляров на основе класса PopupWithForm
const popupFormAddMesto = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const card = createCard(formData, '#element-template', handleCardClick);
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
}, popupElementAddMesto);

const popupFormProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    profileUser.setUserInfo(formData.name, formData.duty);
  }
}, popupElementProfile);

popupProfileOpen.addEventListener('click', () => {
  const userInfo = profileUser.getUserInfo();
  popupName.value = userInfo.name;
  popupDuty.value = userInfo.duty;
  
  formValidatorProfile.removeErrorText();
  popupFormProfile.open();
});
popupFormProfile.setEventListeners();

popupAddMestoOpen.addEventListener('click', () => {
  formValidatorAddCard.removeErrorText();
  popupFormAddMesto.open();
});
popupFormAddMesto.setEventListeners();
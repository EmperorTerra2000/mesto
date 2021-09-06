import './index.css';//путь к стилям для вебпака

import FormValidator from '../components/FormValidator.js';
import {popupElementProfile,listElement,popupElementAddMesto,
  popupProfileOpen,popupAddMestoOpen,popupName,popupDuty,profileName,profileDuty,
  formSettings,formSlctrEditProfile,formSlctrAddMesto, popupElementDeleteCard, popupElementChangeAvatar, 
  formSlctrChangeAvatar} from '../utils/Contants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import { handleCardClick, createCard, createSection } from '../utils/utils.js';
import Api from '../components/Api';

/* Найденные DOM элементы не являются константами т.к. ищутся на странице во время выполнения скрипта.
Тем более в проекте могут быть другие страницы, помимо index.html, и на этих страницах таких элементов может не быть,
но они все равно будут искаться.Не нужно их размещать в файле constants.js, следует перенести в index.js. */
const popupElementZoomImage = document.querySelector('.popup_type_zoom-image');
const blockAvatarElement = document.querySelector('.profile__block-avatar');
const avatarElement = blockAvatarElement.querySelector('.profile__avatar');

const popupFormAvatar = new PopupWithForm({
  handleFormSubmit: (formData) => {
    popupFormAvatar.renderLoading('Сохранение...');

    api.changeAvatar(formData)
      .then(data => {
        // console.log(data);
        avatarElement.src = data.avatar;
      })
      .finally(() => {
        popupFormAvatar.renderLoading('Сохранить');
      });
  }
}, popupElementChangeAvatar);

popupFormAvatar.setEventListeners();

//создаем экземпляр API, в котором присутствуют методы для получения и обновления данных с сервера
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    'authorization': '087d5552-bb78-427e-9889-e1e95b92b080',
  }
});

//валидация форм
const formValidatorProfile = new FormValidator(formSettings, formSlctrEditProfile);

formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(formSettings, formSlctrAddMesto);

formValidatorAddCard.enableValidation();

const formValidatorChangeAvatar = new FormValidator(formSettings, formSlctrChangeAvatar);

formValidatorChangeAvatar.enableValidation();

//экземпляр класса, отвечающий за контент profile
const profileUser = new UserInfo({name: profileName, duty: profileDuty});
//открывает модальное окно при нажатии на img карточки
export const popupZoomImage = new PopupWithImage(popupElementZoomImage);
popupZoomImage.setEventListeners();

//создание экземпляров на основе класса PopupWithForm
const popupFormAddMesto = new PopupWithForm({
  handleFormSubmit: (formData) => {
    popupFormAddMesto.renderLoading('Сохранение...');

    api.addCard(formData)
      .then(data => {
        const card = createCard(data, handleCardClick, handleOpenPopupDelete, api, userId, '#element-template');
        const cardElement = card.generateCard();
    
        listElement.prepend(cardElement);
      })
      .finally(() => popupFormAddMesto.renderLoading('Создать'));
  }
}, popupElementAddMesto);

//экземпляр попапа удаления карточки
const popupDeleteCard = new PopupWithDeleteCard({
  handleFormSubmit: (cardId, evt) => {
    popupDeleteCard.renderLoading('Удаление...');

    api.deleteCard(cardId)
      .then(data => {
        evt.target.closest('.element').remove();
        popupDeleteCard.close();
      })
      .finally(() => popupDeleteCard.renderLoading('Да'));
  }
}, popupElementDeleteCard);

popupDeleteCard.setEventListeners();

//метод вызывается при нажатии на trash элемент карточки, и открывает попап удаления
function handleOpenPopupDelete(cardId, evt){
  popupDeleteCard.open();
  popupDeleteCard.getCardInfo(cardId, evt)
}

const popupFormProfile = new PopupWithForm({
  handleFormSubmit: (formData) => {
    popupFormProfile.renderLoading('Сохранение...');

    api.updateInfoUser(formData.name, formData.duty)
      .then((data) => {
        profileUser.setUserInfo(data.name, data.about);
      })
      .finally(() => popupFormProfile.renderLoading('Сохранить'));
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

blockAvatarElement.addEventListener('click', () => {
  formValidatorChangeAvatar.removeErrorText();
  popupFormAvatar.open();
});

let userId;//хранение id юзера, необходим для того чтобы узнать поставил ли он лайк

api.getUserInfo()
  .then(data => {
    avatarElement.src = data.avatar;//вставка аватара из сервера при загрузке страницы
    profileUser.setUserInfo(data.name, data.about);//вставка профиля юзера из сервера при загрузке страницы
    userId = data._id;//сомнительный способ присваивания значения (асинхронность все дела...)
  });

api.getCardInfo()
  .then(data => {
    const cardList = createSection({items: data.reverse(), renderer: (item) => {
      const card = createCard(item, handleCardClick, handleOpenPopupDelete, api, userId, '#element-template');
    
      const cardElement = card.generateCard();
    
      cardList.addItem(cardElement);
    }}, listElement);
    
    cardList.renderItems();
  });
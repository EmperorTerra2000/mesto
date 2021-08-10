import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {popupElementProfile,popupZoomImage,listElement,popupElementAddMesto,formElementProfile,formElementAddMesto,
  popupProfileOpen,popupAddMestoOpen,popupName,popupDuty,popupPlace,popupLink,profileName,profileDuty} from './Contants.js';

//валидация форм
const formValidatorProfile = new FormValidator(
  {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_type_error',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  },
  '.form_type_editProfile'
);

formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(
  {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_type_error',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  },
  '.form_type_addMesto'
);

formValidatorAddCard.enableValidation();

//функция закрытия попапа
function closePopup(popup){
  popup.classList.remove('popup_active');
  removeEventListenerKey();
}

//открытие попапа
function openPopup(popup){
  popup.classList.add('popup_active');
  addEventListenerKey();
}

//добавление обработчика при открытии попапа
function addEventListenerKey(){
  document.addEventListener('keydown', closeKeyHandler);
}

//удаление обработчика при закрытии попапа
function removeEventListenerKey(){
  document.removeEventListener('keydown', closeKeyHandler);
}

//закрытие попапа при нажатии на escape
function closeKeyHandler(event){
  if(event.key === "Escape"){
    const popupList = Array.from(document.querySelectorAll('.popup'));

    popupList.forEach((popupElement) => {
      if(popupElement.classList.contains('popup_active')){
        closePopup(popupElement);
      }
    });
  }
}

//закрытие попапа при нажатии на оверлей
function closeOverlayPopup(event, popup){
  if(event.target !== event.currentTarget) return;
  closePopup(popup);
}

//фунцкия редактирования профиля после нажатия кнопки submit
function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDuty.textContent = popupDuty.value;
  closePopup(popupElementProfile);
}

function handleCardFormSubmit(evt){
  evt.preventDefault();
  //создадим экземпляр карточки
  const card = new Card({name: popupPlace.value, link: popupLink.value}, '#element-template', handleCardClick);
  //создаем карточку и возвращаем наружу
  const cardElement = card.generateCard();
  //добавляем в DOM
  listElement.prepend(cardElement);
  
  closePopup(popupElementAddMesto);

  formElementAddMesto.reset();

  //при повторном открытии формы добавления карточки,
  //валидация не работает для инпутов, а сами поля пустые.
  //Поэтому валидируем еще раз после закрытия попапа
  formValidatorAddCard.enableValidation();
}

//функция передается как параметр конструктору класса Card
//для того чтобы при нажатии на img карточки, выскочил попап
function handleCardClick(name, link){
  const popupZoomImageText = popupZoomImage.querySelector('.popup__text');

  popupZoomImageText.textContent = name;
  popupZoomImage.querySelector('.popup__image').src = link;
  popupZoomImage.querySelector('.popup__image').alt = name;

  openPopup(popupZoomImage);
}

initialCards.forEach((item) => {
  //создадим экземпляр карточки
  const card = new Card(item, '#element-template', handleCardClick);
  //создаем карточку и возвращаем наружу
  const cardElement = card.generateCard();

  //добавляем в DOM
  listElement.append(cardElement);
});

popupElementProfile.addEventListener('mousedown', (event) => closeOverlayPopup(event, popupElementProfile));
popupElementAddMesto.addEventListener('mousedown', (event) => closeOverlayPopup(event, popupElementAddMesto));
popupZoomImage.addEventListener('mousedown', (event) => closeOverlayPopup(event, popupZoomImage));
popupElementProfile.querySelector('.popup__close').addEventListener('click', () => closePopup(popupElementProfile));
popupElementAddMesto.querySelector('.popup__close').addEventListener('click', () => closePopup(popupElementAddMesto));
popupZoomImage.querySelector('.popup__close').addEventListener('click', () => closePopup(popupZoomImage));
popupProfileOpen.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupDuty.value = profileDuty.textContent;
  openPopup(popupElementProfile);
});
popupAddMestoOpen.addEventListener('click', () => {
  formElementAddMesto.reset();
  openPopup(popupElementAddMesto);
});
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
formElementAddMesto.addEventListener('submit', handleCardFormSubmit);
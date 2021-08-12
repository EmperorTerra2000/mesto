import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {popupElementProfile,popupZoomImage,listElement,popupElementAddMesto,formElementProfile,formElementAddMesto,
  popupProfileOpen,popupAddMestoOpen,popupName,popupDuty,popupPlace,popupLink,profileName,profileDuty,
  popupZoomImageText,popupZoomImageImg,popupCloseProfile,popupCloseAddMesto,popupCloseZoomImg} from './Contants.js';
const formSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}
const formSlctrEditProfile = '.form_type_editProfile';
const formSlctrAddMesto = '.form_type_addMesto';

//валидация форм
const formValidatorProfile = new FormValidator(formSettings, formSlctrEditProfile);

formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(formSettings, formSlctrAddMesto);

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
    const popupActive = document.querySelector('.popup_active');
    closePopup(popupActive);
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

function createCard(item, cardSelector, handleCardClick){
  return new Card(item, cardSelector, handleCardClick);
}

function handleCardFormSubmit(evt){
  evt.preventDefault();
  //создадим экземпляр карточки
  const card = createCard({name: popupPlace.value, link: popupLink.value}, '#element-template', handleCardClick);
  //создаем карточку и возвращаем наружу
  const cardElement = card.generateCard();
  //добавляем в DOM
  listElement.prepend(cardElement);
  
  closePopup(popupElementAddMesto);

  formElementAddMesto.reset();

  formValidatorAddCard.enableValidation();
}

//функция передается как параметр конструктору класса Card
//для того чтобы при нажатии на img карточки, выскочил попап
function handleCardClick(name, link){
  popupZoomImageText.textContent = name;
  popupZoomImageImg.src = link;
  popupZoomImageImg.alt = name;

  openPopup(popupZoomImage);
}

initialCards.forEach((item) => {
  //создадим экземпляр карточки
  const card = createCard(item, '#element-template', handleCardClick);
  //создаем карточку и возвращаем наружу
  const cardElement = card.generateCard();

  //добавляем в DOM
  listElement.append(cardElement);
});

popupElementProfile.addEventListener('mousedown', (event) => closeOverlayPopup(event, popupElementProfile));
popupElementAddMesto.addEventListener('mousedown', (event) => closeOverlayPopup(event, popupElementAddMesto));
popupZoomImage.addEventListener('mousedown', (event) => closeOverlayPopup(event, popupZoomImage));
popupCloseProfile.addEventListener('click', () => {
  closePopup(popupElementProfile);
});
popupCloseAddMesto.addEventListener('click', () => closePopup(popupElementAddMesto));
popupCloseZoomImg.addEventListener('click', () => closePopup(popupZoomImage));
popupProfileOpen.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupDuty.value = profileDuty.textContent;
  formValidatorProfile.removeErrorText();
  openPopup(popupElementProfile);
});
popupAddMestoOpen.addEventListener('click', () => {
  formElementAddMesto.reset();
  formValidatorAddCard.removeErrorText();
  openPopup(popupElementAddMesto);
});
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
formElementAddMesto.addEventListener('submit', handleCardFormSubmit);
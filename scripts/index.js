const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupElementProfile = document.querySelector('.popup_type_profile');
const popupZoomImage = document.querySelector('.popup_type_zoom-image');
const elementTemplateContent = document.querySelector('#element-template').content;
const listElement = document.querySelector('.elements');
const popupElementAddMesto = document.querySelector('.popup_type_addMesto');
const formElementProfile = popupElementProfile.querySelector('.popup__content');
const formElementAddMesto = popupElementAddMesto.querySelector('.popup__content');
const popupClose = document.querySelectorAll('.popup__close');
const popupProfileOpen = document.querySelector('.profile__edit-btn');
const popupAddMestoOpen = document.querySelector('.profile__add-btn');
const popupName = popupElementProfile.querySelector('.popup__input_value_name');
const popupDuty = popupElementProfile.querySelector('.popup__input_value_duty');
const popupPlace = popupElementAddMesto.querySelector('.popup__input_value_place');
const popupLink = popupElementAddMesto.querySelector('.popup__input_value_link');
const profileName = document.querySelector('.profile__name');
const profileDuty = document.querySelector('.profile__duty');


initialCards.forEach((item) => {
  renderItem(item.name, item.link);
});

//фунцкия, в котором собраны все обработчики событий, связанные с карточкой
function setEventListeners(itemElement, text){
  itemElement.querySelector('.element__trash').addEventListener('click', handleDelete);
  itemElement.querySelector('.element__like').addEventListener('click', likeActive);
  itemElement.querySelector('.element__image').addEventListener('click', (event) => {
    const popupZoomImageText = popupZoomImage.querySelector('.popup__text');
    popupZoomImageText.textContent = text;
    popupZoomImage.querySelector('.popup__image').src = event.target.src;
    popupZoomImage.classList.add('popup_active');
  });
}

//удаление карточки
function handleDelete(event){
  const itemElement = event.target.closest('.element');
  itemElement.remove();
}

//функция добавления лайка
function likeActive(event){
  event.target.classList.toggle('element__like_active');
}

//функия генерации карточек
function renderItem(text, srcImg){
  const itemElement = elementTemplateContent.cloneNode(true);
  const itemTextElement = itemElement.querySelector('.element__text');
  const itemImageElement = itemElement.querySelector('.element__image');
  itemTextElement.textContent = text;
  itemImageElement.src = srcImg;
  itemImageElement.alt = text;

  setEventListeners(itemElement, itemTextElement.textContent);
  
  listElement.prepend(itemElement);
}

//функция закрытия попапа при нажатии на крестик
function closePopup(evt){
  evt.target.closest('.popup').classList.remove('popup_active');
}

//функция открытия попапа Profile
function openPopupProfile(){
  popupName.value = profileName.textContent;
  popupDuty.value = profileDuty.textContent;
  popupElementProfile.classList.add('popup_active');
}

//функция открытия попапа addMesto
function openPopupAddMesto(){
  popupPlace.value = '';
  popupLink.value = '';
  popupElementAddMesto.classList.add('popup_active');
}

//фунцкия редактирования профиля после нажатия кнопки submit
function formSubmitProfile(evt){
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDuty.textContent = popupDuty.value;
  popupElementProfile.classList.remove('popup_active'); //закрытие данного попапа
}

function formSubmitAddMesto(evt){
  evt.preventDefault();
  renderItem(popupPlace.value, popupLink.value);
  popupElementAddMesto.classList.remove('popup_active'); //закрытие данного попапа
}

popupElementProfile.querySelector('.popup__close').addEventListener('click', closePopup);
popupElementAddMesto.querySelector('.popup__close').addEventListener('click', closePopup);
popupZoomImage.querySelector('.popup__close').addEventListener('click', closePopup);
popupProfileOpen.addEventListener('click', openPopupProfile);
popupAddMestoOpen.addEventListener('click', openPopupAddMesto);
formElementProfile.addEventListener('submit', formSubmitProfile);
formElementAddMesto.addEventListener('submit', formSubmitAddMesto);

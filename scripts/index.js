const popupElementProfile = document.querySelector('.popup_type_profile');
const popupZoomImage = document.querySelector('.popup_type_zoom-image');
const elementTemplateContent = document.querySelector('#element-template').content;
const listElement = document.querySelector('.elements');
const popupElementAddMesto = document.querySelector('.popup_type_add-place');
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
  renderCard(item);
});

//фунцкия, в котором собраны все обработчики событий, связанные с карточкой
function setEventListeners(itemElement, objImg){
  itemElement.querySelector('.element__trash').addEventListener('click', handleDelete);
  itemElement.querySelector('.element__like').addEventListener('click', likeActive);
  itemElement.querySelector('.element__image').addEventListener('click', () => {
    const popupZoomImageText = popupZoomImage.querySelector('.popup__text');
    popupZoomImageText.textContent = objImg.name;
    popupZoomImage.querySelector('.popup__image').src = objImg.link;
    popupZoomImage.querySelector('.popup__image').alt = objImg.name;
    openPopup(popupZoomImage);
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

//функция создания карточки
function createCard(objImg){
  const itemElement = elementTemplateContent.cloneNode(true);
  const itemTextElement = itemElement.querySelector('.element__text');
  const itemImageElement = itemElement.querySelector('.element__image');
  itemTextElement.textContent = objImg.name;
  itemImageElement.src = objImg.link;
  itemImageElement.alt = objImg.name;

  setEventListeners(itemElement, objImg);
  
  return itemElement;
}

//функция добавления карточки в контейнер
function renderCard(item){
  listElement.prepend(createCard(item));
}

//функция закрытия попапа при нажатии на крестик
function closePopup(popup){
  popup.classList.remove('popup_active');
}

//открытие попапа
function openPopup(popup){
  popup.classList.add('popup_active');
}

//фунцкия редактирования профиля после нажатия кнопки submit
function formSubmitProfile(evt){
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDuty.textContent = popupDuty.value;
  closePopup(popupElementProfile);
}

function formSubmitAddMesto(evt){
  evt.preventDefault();
  renderCard({
    name: popupPlace.value,
    link: popupLink.value
  });
  closePopup(popupElementAddMesto);
}

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
formElementProfile.addEventListener('submit', formSubmitProfile);
formElementAddMesto.addEventListener('submit', formSubmitAddMesto);
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

const popupElement = document.querySelectorAll('.popup');
const popupElementProfile = document.querySelector('.popup_type_profile');
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

function renderItem(text, srcImg){
  const itemElement = elementTemplateContent.cloneNode(true);
  const itemTextElement = itemElement.querySelector('.element__text');
  const itemImageElement = itemElement.querySelector('.element__image');
  itemTextElement.textContent = text;
  itemImageElement.src = srcImg;
  listElement.prepend(itemElement);
}

function closePopup(){
  popupElement.forEach((item) => {
    item.classList.remove('popup_active');
  });
}

function openPopup(event){
  if(event.target == popupProfileOpen){
    popupName.value = profileName.textContent;
    popupDuty.value = profileDuty.textContent;
    popupElementProfile.classList.add('popup_active');
  }
  if(event.target == popupAddMestoOpen){
    popupPlace.value = '';
    popupLink.value = '';
    popupElementAddMesto.classList.add('popup_active');
  }
}

function formSubmitProfile(evt){
  evt.preventDefault(); //отмена стандартной отправки формы
  profileName.textContent = popupName.value;
  profileDuty.textContent = popupDuty.value;
  closePopup();
}

function formSubmitAddMesto(evt){
  evt.preventDefault(); //отмена стандартной отправки формы
  renderItem(popupPlace.value, popupLink.value)
  closePopup();
}

popupClose[0].addEventListener('click', closePopup);
popupClose[1].addEventListener('click', closePopup);
popupProfileOpen.addEventListener('click', openPopup);
popupAddMestoOpen.addEventListener('click', openPopup);
formElementProfile.addEventListener('submit', formSubmitProfile);
formElementAddMesto.addEventListener('submit', formSubmitAddMesto);

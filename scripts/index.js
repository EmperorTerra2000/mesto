const popupElement = document.querySelector('.popup');
const popupClose = popupElement.querySelector('.popup__close');
const popupName = popupElement.querySelector('.popup__name');
const popupDuty = popupElement.querySelector('.popup__duty');
const popupSave = popupElement.querySelector('.popup__btn-save');
const popupOpen = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileDuty = document.querySelector('.profile__duty');

function closePopup(){
  popupElement.classList.remove('popup_active');
}

function openPopup(){
  popupElement.classList.add('popup_active');
}

function saveChangePopup(){
  profileName.textContent = popupName.value;
  profileDuty.textContent = popupDuty.value;
  closePopup();
}

function closePopupElement(event){
  if( event.target !== event.currentTarget) return;
  closePopup();
}

popupClose.addEventListener('click', closePopup);
popupOpen.addEventListener('click', openPopup);
popupSave.addEventListener('click', saveChangePopup);
popupElement.addEventListener('click', closePopupElement);
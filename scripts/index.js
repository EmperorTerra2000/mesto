const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__content');
const popupClose = popupElement.querySelector('.popup__close');
const popupOpen = document.querySelector('.profile__edit-btn');
const popupName = popupElement.querySelector('.popup__input_value_name');
const popupDuty = popupElement.querySelector('.popup__input_value_duty');
const profileName = document.querySelector('.profile__name');
const profileDuty = document.querySelector('.profile__duty');

function closePopup(){
  popupElement.classList.remove('popup_active');
}

function openPopup(){
  popupName.value = profileName.textContent;
  popupDuty.value = profileDuty.textContent;
  popupElement.classList.add('popup_active');
}

function formSubmitHandler(evt){
  evt.preventDefault(); //отмена стандартной отправки формы
  profileName.textContent = popupName.value;
  profileDuty.textContent = popupDuty.value;
  closePopup();
}

popupClose.addEventListener('click', closePopup);
popupOpen.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);

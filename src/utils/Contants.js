const popupElementProfile = document.querySelector('.popup_type_profile');
const listElement = document.querySelector('.elements');
const popupElementAddMesto = document.querySelector('.popup_type_add-place');
const popupProfileOpen = document.querySelector('.profile__edit-btn');
const popupAddMestoOpen = document.querySelector('.profile__add-btn');
const popupName = popupElementProfile.querySelector('.popup__input_value_name');
const popupDuty = popupElementProfile.querySelector('.popup__input_value_duty');
const profileName = document.querySelector('.profile__name');
const profileDuty = document.querySelector('.profile__duty');
const formSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}//объект со списком конфигураций для валидации полей форм
const formSlctrEditProfile = '.form_type_editProfile';
const formSlctrAddMesto = '.form_type_addMesto';

export {popupElementProfile,listElement,popupElementAddMesto,
  popupProfileOpen,popupAddMestoOpen,popupName,popupDuty,profileName,profileDuty,formSettings,
  formSlctrEditProfile, formSlctrAddMesto};
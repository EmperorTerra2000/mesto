const popupElementProfile = document.querySelector('.popup_type_profile');
const popupZoomImage = document.querySelector('.popup_type_zoom-image');
const listElement = document.querySelector('.elements');
const popupElementAddMesto = document.querySelector('.popup_type_add-place');
const formElementProfile = popupElementProfile.querySelector('.popup__content');
const formElementAddMesto = popupElementAddMesto.querySelector('.popup__content');
const popupProfileOpen = document.querySelector('.profile__edit-btn');
const popupAddMestoOpen = document.querySelector('.profile__add-btn');
const popupName = popupElementProfile.querySelector('.popup__input_value_name');
const popupDuty = popupElementProfile.querySelector('.popup__input_value_duty');
const popupPlace = popupElementAddMesto.querySelector('.popup__input_value_place');
const popupLink = popupElementAddMesto.querySelector('.popup__input_value_link');
const profileName = document.querySelector('.profile__name');
const profileDuty = document.querySelector('.profile__duty');

export {popupElementProfile,popupZoomImage,listElement,popupElementAddMesto,formElementProfile,formElementAddMesto,
  popupProfileOpen,popupAddMestoOpen,popupName,popupDuty,popupPlace,popupLink,profileName,profileDuty};
import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popup){
    super(popup);
    this._text = popup.querySelector('.popup__text');
    this._image = popup.querySelector('.popup__image');
  }

  open(description, src){
    this._text.textContent = description;
    this._image.src = src;
    this._image.alt = description;

    super.open();
  }
}
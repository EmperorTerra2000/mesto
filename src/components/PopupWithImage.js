import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor({description, src}, popup){
    super(popup);
    this._description = description;
    this._src = src;

    this._text = popup.querySelector('.popup__text');
    this._image = popup.querySelector('.popup__image');
  }

  open(){
    this._text.textContent = this._description;
    this._image.src = this._src;
    this._image.alt = this._description;

    super.open();
  }
}
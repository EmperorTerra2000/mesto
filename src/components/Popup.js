export default class Popup{
  constructor(popup){
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this); //использование ксенотехнологий, использование которых является ересью
  }

  open(){
    this._popup.classList.add('popup_active');
    this._addEventListenerKey();
  }

  close(){
    this._popup.classList.remove('popup_active');
    this._removeEventListenerKey();
  }

  //добавление обработчика на кнопку Esc при открытии попапа
  _addEventListenerKey(){
    document.addEventListener('keydown', this._handleEscClose);
  }

  //удаление обработчика на кнопку Esc при закрытии попапа
  _removeEventListenerKey(){
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //логика нажатия на Escape
  _handleEscClose(event){
    if(event.key === "Escape"){
      this.close();
    }
  }

  //метод закрытия попапа при нажатии на оверлей
  _closeOverlayPopup(event){
    if(event.target !== event.currentTarget) return;
    this.close();
  }

  setEventListeners(){
    const popupClose = this._popup.querySelector('.popup__close');

    //слушатель при нажатии на крестик
    popupClose.addEventListener('click', this.close.bind(this));

    //слушатель при нажатии на оверлей
    this._popup.addEventListener('mousedown', this._closeOverlayPopup.bind(this));
  }
}
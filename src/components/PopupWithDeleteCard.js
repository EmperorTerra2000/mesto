import Popup from './Popup.js';

export default class PopupWithDeleteCard extends Popup{
  constructor({handleFormSubmit}, popup){
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popup.querySelector('.form'); //селектор формы
    this._btnSubmit = this._element.querySelector('.popup__btn-save');
  }

  //метод получает извне id и элемент trash карточки
  getCardInfo(cardId, evt){
    this._cardId = cardId;
    this._evt = evt;
  }

  renderLoading(text){
    this._btnSubmit.innerHTML = text;
  }

  setEventListeners(){
    super.setEventListeners();

    this._element.addEventListener('submit', (event) => {
      event.preventDefault();

      //добавим вызов функции _handleFormSubmit
      //передадим ей объект - результат работы _getInputValues
      this._handleFormSubmit(this._cardId, this._evt);
    });
  }
}
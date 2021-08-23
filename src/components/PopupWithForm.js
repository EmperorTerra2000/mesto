import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor({handleFormSubmit}, popup){
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popup.querySelector('.form'); //селектор формы
  }

  _getInputValues(){
    //достаем все элементы полей
    this._inputList = this._element.querySelectorAll('.popup__input');

    //cоздаем пустой объект
    this._formValues = {};

    //добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    //возвращаем объект значений
    return this._formValues;
  }

  setEventListeners(){
    super.setEventListeners();

    this._element.addEventListener('submit', (event) => {
      event.preventDefault();

      //добавим вызов функции _handleFormSubmit
      //передадим ей объект - результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }

  close(){
    super.close();
    this._element.reset();
  }
}
export default class FormValidator {
  _formSettings
  _formSelector

  constructor(formSettings, formSelector){
    this._formSettings = formSettings;
    this._formSelector = formSelector;
  }

  enableValidation(){
    this._setEventListeners();
  }

  _setEventListeners(){
    const formElement = document.querySelector(this._formSelector);
    const inputList = Array.from(formElement.querySelectorAll(this._formSettings.inputSelector));
    const btnElement = formElement.querySelector(this._formSettings.submitButtonSelector);

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._toggleButtonState(inputList, btnElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, btnElement);
      });
    });
  }

  _checkInputValidity(formElement, inputElement){
    const isInputValid = inputElement.validity.valid;
    
    if(!isInputValid){
      const errorMessage = inputElement.validationMessage;
      this._showInputError(formElement, inputElement, errorMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formSettings.errorClass);
    inputElement.classList.add(this._formSettings.inputErrorClass);
  }
  
  _hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    errorElement.textContent = '';
    errorElement.classList.remove(this._formSettings.errorClass);
    inputElement.classList.remove(this._formSettings.inputErrorClass);
  }

  _toggleButtonState(inputList, btnElement){
    const hasNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  
    if(hasNotValidInput){
      btnElement.setAttribute('disabled', true);
      btnElement.classList.add(this._formSettings.inactiveButtonClass);
    } else {
      btnElement.removeAttribute('disabled');
      btnElement.classList.remove(this._formSettings.inactiveButtonClass);
    }
  }
}
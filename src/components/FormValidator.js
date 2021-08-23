export default class FormValidator {
  _formSettings
  _formSelector

  constructor(formSettings, formSelector){
    this._formSettings = formSettings;
    this._formSelector = formSelector;
  }

  enableValidation(){
    this.formElement = document.querySelector(this._formSelector);
    this.inputList = Array.from(this.formElement.querySelectorAll(this._formSettings.inputSelector));
    this.btnElement = this.formElement.querySelector(this._formSettings.submitButtonSelector);
    this._setEventListeners();
  }

  _setEventListeners(){
    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._toggleButtonState(this.inputList, this.btnElement);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this.formElement, inputElement);
        this._toggleButtonState(this.inputList, this.btnElement);
      });
    });
  }

  removeErrorText(){
    this._toggleButtonState(this.inputList, this.btnElement);
    this.inputList.forEach((inputElement) => {
      this._hideInputError(this.formElement, inputElement);
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
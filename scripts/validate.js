function toggleButtonState(inputList, btnElement, inactiveButtonClass){
  const hasNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

  if(hasNotValidInput){
    btnElement.setAttribute('disabled', true);
    btnElement.classList.add(inactiveButtonClass);
  } else {
    btnElement.removeAttribute('disabled');
    btnElement.classList.remove(inactiveButtonClass);
  }
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass){
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass){
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass){
  const isInputValid = inputElement.validity.valid;
  
  if(!isInputValid){
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass){
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const btnElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, btnElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, btnElement, inactiveButtonClass);
    });
  });
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});
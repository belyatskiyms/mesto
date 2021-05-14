const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_error',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}
function enableValidation(settings){   // Подскажите пожалуйста, для чего мы передаем объект настроек в функцию
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formItem)=>{
    setInputValidation(formItem, settings.inputSelector, settings.submitButtonSelector, settings.inactiveButtonClass, settings.inputErrorClass, settings.errorClass)
  })
}
function setInputValidation(formItem, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass){
    const inputList = Array.from(formItem.querySelectorAll(inputSelector));
    const buttonElement = formItem.querySelector(submitButtonSelector)
    checkButtonError(inputList, buttonElement, inactiveButtonClass)
    inputList.forEach((inputItem)=>{
      hideInputError(inputItem, inputErrorClass, errorClass)
      inputItem.addEventListener('input',()=>{
        checkButtonError(inputList, buttonElement, inactiveButtonClass)
        checkValidity(inputItem, inputErrorClass, errorClass)
      })
    })
}
function hasInvalidInput(inputList){
  return inputList.some((inputItem) => {
    return !(inputItem.validity.valid)
  })
}
function showInputError(input, message, inputErrorClass, errorClass){
    const errorMessage = document.querySelector(`.${input.id}-error`)
    input.classList.add(inputErrorClass)
    errorMessage.textContent = message
    errorMessage.classList.add(errorClass)
}
function hideInputError(input, inputErrorClass, errorClass){
    const errorMessage = document.querySelector(`.${input.id}-error`)
    input.classList.remove(inputErrorClass)
    errorMessage.textContent = ''
    errorMessage.classList.remove(errorClass)
}
function checkValidity(input, inputErrorClass, errorClass){
  if(!(input.validity.valid)){
    showInputError(input, input.validationMessage, inputErrorClass, errorClass)
  }else{
    hideInputError(input, inputErrorClass, errorClass)
  }
}
function showButtonError(button, inactiveButtonClass){
    button.classList.add(inactiveButtonClass)
    button.setAttribute('disabled', 'disabled');
}
function hideButtonError(button, inactiveButtonClass){
    button.classList.remove(inactiveButtonClass)
    button.removeAttribute('disabled');
}
function checkButtonError(inputList, button, inactiveButtonClass){
    if(hasInvalidInput(inputList)){
      showButtonError(button, inactiveButtonClass)
    }else{
      hideButtonError(button, inactiveButtonClass)
    }
}
function resetFormValidation(popup){
  const popupInputList = Array.from(popup.querySelectorAll(settings.inputSelector))
  popupInputList.forEach((element)=>{
    if (element.classList.contains(settings.inputErrorClass)){
        hideInputError(element, settings.inputErrorClass, settings.errorClass)
    }
  })
  const buttonError = popup.querySelector(settings.submitButtonSelector)
  checkButtonError(popupInputList, buttonError, settings.inactiveButtonClass)
}
enableValidation(settings);
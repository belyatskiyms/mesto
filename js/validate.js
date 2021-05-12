function enableValidation(settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_error',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'}){
    const formList = Array.from(document.querySelectorAll(settings.formSelector))
    formList.forEach((formItem)=>{
      setInputValidation(formItem, settings.inputSelector, settings.submitButtonSelector, settings.inactiveButtonClass, settings.inputErrorClass, settings.errorClass)
    })
  }
  function setInputValidation(formItem, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass){
      const inputList = Array.from(formItem.querySelectorAll(inputSelector));
      const buttonElement = formItem.querySelector(submitButtonSelector)
      showButtonError(inputList, buttonElement, inactiveButtonClass)
      inputList.forEach((inputItem)=>{
        hideInputError(inputItem, inputErrorClass, errorClass)
        inputItem.addEventListener('input',()=>{
          showButtonError(inputList, buttonElement, inactiveButtonClass)
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
  function showButtonError(inputList, button, inactiveButtonClass){
    if(hasInvalidInput(inputList)){
      button.classList.add(inactiveButtonClass)
      button.setAttribute('disabled', 'disabled');
    }else{
      button.classList.remove(inactiveButtonClass)
      button.removeAttribute('disabled');
    }
  }
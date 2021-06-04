export default class FormValidator{
  constructor(settings, popup){
    this._settings = settings
    this._popup = popup
  }
  enableValidation(){  
    const formList = Array.from(document.querySelectorAll(this._settings.formSelector))
    formList.forEach((formItem)=>{
      this._setInputValidation(formItem)
    })
  }
  _setInputValidation(formItem){
      const inputList = Array.from(formItem.querySelectorAll(this._settings.inputSelector));
      const buttonElement = formItem.querySelector(this._settings.submitButtonSelector)
      this._checkButtonError(inputList, buttonElement)
      inputList.forEach((inputItem)=>{
        this._hideInputError(inputItem)
        inputItem.addEventListener('input',()=>{
          this._checkButtonError(inputList, buttonElement)
          this._checkValidity(inputItem)
        })
      })
  }
  _hasInvalidInput(inputList){
    return inputList.some((inputItem) => {
      return !(inputItem.validity.valid)
    })
  }
  _showInputError(input){
      const errorMessage = document.querySelector(`.${input.id}-error`)
      input.classList.add(this._settings.inputErrorClass)
      errorMessage.textContent = input.validationMessage
      errorMessage.classList.add(this._settings.errorClass)
  }
  _hideInputError(input){
      const errorMessage = document.querySelector(`.${input.id}-error`)
      input.classList.remove(this._settings.inputErrorClass)
      errorMessage.textContent = ''
      errorMessage.classList.remove(this._settings.errorClass)
  }
  _checkValidity(input){
    if(!(input.validity.valid)){
      this._showInputError(input)
    }else{
      this._hideInputError(input)
    }
  }
  _showButtonError(button){
      button.classList.add(this._settings.inactiveButtonClass)
      button.setAttribute('disabled', 'disabled');
  }
  _hideButtonError(button){
      button.classList.remove(this._settings.inactiveButtonClass)
      button.removeAttribute('disabled');
  }
  _checkButtonError(inputList, button){
      if(this._hasInvalidInput(inputList)){
        this._showButtonError(button)
      }else{
        this._hideButtonError(button)
      }
  }
  resetFormValidation(){
    const popupInputList = Array.from(this._popup.querySelectorAll(this._settings.inputSelector))
    popupInputList.forEach((element)=>{
      if (element.classList.contains(this._settings.inputErrorClass)){
          this._hideInputError(element)
      }
    })
    const buttonError = this._popup.querySelector(this._settings.submitButtonSelector)
    this._checkButtonError(popupInputList, buttonError)
  }
}
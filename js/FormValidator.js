export default class FormValidator{
  constructor(settings, form){
    this._settings = settings
    this._form = form
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector))
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector)
  }
  setInputValidation(){
      this._checkButtonError()
      this._inputList.forEach((inputItem)=>{
        this._hideInputError(inputItem)
        inputItem.addEventListener('input',()=>{
          this._checkButtonError()
          this._checkValidity(inputItem)
        })
      })
  }
  _hasInvalidInput(){
    return this._inputList.some((inputItem) => {
      return !(inputItem.validity.valid)
    })
  }
  _showInputError(input){
      const errorMessage = this._form.querySelector(`.${input.id}-error`)
      input.classList.add(this._settings.inputErrorClass)
      errorMessage.textContent = input.validationMessage
      errorMessage.classList.add(this._settings.errorClass)
  }
  _hideInputError(input){
      const errorMessage = this._form.querySelector(`.${input.id}-error`)
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
  _showButtonError(){
      this._buttonElement.classList.add(this._settings.inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', 'disabled');
  }
  _hideButtonError(){
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled');
  }
  _checkButtonError(){
      if(this._hasInvalidInput()){
        this._showButtonError()
      }else{
        this._hideButtonError()
      }
  }
  resetFormValidation(){
    this._inputList.forEach((element)=>{
      if (element.classList.contains(this._settings.inputErrorClass)){
          this._hideInputError(element)
      }
    })
    this._checkButtonError()
  }
}
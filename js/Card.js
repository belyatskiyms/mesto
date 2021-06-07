import {openPopup, popupScanImage} from './script.js'

export default class Card{
    constructor(data, templateSelector){
      this._title = data.name
      this._img = data.link
      this._selector = templateSelector
    }
    createCard(){
      this._cardItem = document.querySelector(this._selector).content.querySelector('.cards__item').cloneNode(true);
      this._cardItemImage = this._cardItem.querySelector('.cards__image');
      this._cardItemImage.src = this._img
      this._cardItemImage.alt = this._title
      this._cardItem.querySelector('.cards__title').textContent = this._title
      this._setHandler()
      return this._cardItem
    }
    _setHandler(){
      this._cardItemImage.addEventListener('click', () => this._openPopupImage())
      this._cardItem.querySelector('.cards__like').addEventListener('click', (event) => this._setLike(event));
      this._cardItem.querySelector('.cards__delete-button').addEventListener('click', (event) => this._removeCard(event));
    }
    _setLike(event){
      event.target.classList.toggle('cards__like_active')
    }
    _removeCard(event){
      event.target.closest('.cards__item').remove()
    }
    _openPopupImage() {
      document.querySelector('.popup__card-image').src = this._img
      document.querySelector('.popup__card-image').alt = this._title
      document.querySelector('.popup__image-descr').textContent = this._title
      openPopup(popupScanImage);
    }
  
  }
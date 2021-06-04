import {openPopup, popupScanImage} from './script.js'

export default class Card{
    constructor(data, templateSelector, parentBlock){
      this.title = data.name
      this.img = data.link
      this.selector = templateSelector
      this.parent = parentBlock
    }
    _createCard(){
      this._cardItem = document.querySelector(this.selector).content.querySelector('.cards__item').cloneNode(true);
      this._cardItemImage = this._cardItem.querySelector('.cards__image');
      this._cardItemImage.src = this.img
      this._cardItemImage.alt = this.title
      this._cardItem.querySelector('.cards__title').textContent = this.title
      this._setHandler()
      return this._cardItem
    }
    addCard(){
      this.parent.prepend(this._createCard());
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
      document.querySelector('.popup__card-image').src = this.img
      document.querySelector('.popup__card-image').alt = this.title
      document.querySelector('.popup__image-descr').textContent = this.title
      openPopup(popupScanImage);
    }
  
  }
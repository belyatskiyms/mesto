import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {initialCards} from './initial-cards.js'


//Кнопки открывающие popup
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

//popup
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupScanImage = document.querySelector('.popup_scan-image');
//Формы popup
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const formAddCard = document.querySelector('.popup__form_add-card');

//input'ы popup
const inputName = document.querySelector('#name');
const inputVacation = document.querySelector('#vocation');
const inputTitle = document.querySelector('#title');
const inputSrcImage = document.querySelector('#srcImage');

//Поля
const profileName = document.querySelector('.profile__name');
const profileVacation = document.querySelector('.profile__vocation');
const cards = document.querySelector('.cards');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_error',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}

const formValidatorEditProfile = new FormValidator(settings, popupEditProfile)
const formValidatorAddCard = new FormValidator(settings, popupAddCard)
formValidatorEditProfile.enableValidation()
formValidatorAddCard.enableValidation()


//Функции
function openPopup(popup){                                         
  popup.classList.add('popup_opened');  
  window.addEventListener('keydown', checkKeyDownEscape);
}
function openPopupAddCard() {
  formAddCard.reset();
  formValidatorAddCard.resetFormValidation()
  openPopup(popupAddCard)
}

function closePopup(){  
    const popupOpened = document.querySelector('.popup_opened'); 
    if(popupOpened !== null){
      popupOpened.classList.remove('popup_opened');
      window.removeEventListener('keydown', checkKeyDownEscape);
    } 
}
function checkEventsClosePopup(event){ 
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__button')){
      closePopup()
    }
}
function checkKeyDownEscape(event){
    if(event.key === "Escape"){
      closePopup()
    }
}
function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileVacation.textContent = inputVacation.value;
}

//слушатели событий
buttonProfileEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputVacation.value = profileVacation.textContent
  formValidatorEditProfile.resetFormValidation()
  openPopup(popupEditProfile);
});
popupEditProfile.addEventListener('click', (event) => checkEventsClosePopup(event));
formEditProfile.addEventListener('submit', submitEditProfileForm); 
buttonAddCard.addEventListener('click', () => {
  openPopupAddCard()
}); 

popupAddCard.addEventListener('click', (event) => {
  checkEventsClosePopup(event)
}); 
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: inputTitle.value,
    link: inputSrcImage.value
  }
  const card = new Card(newCardData, '#card', cards)
  card.addCard()
  checkEventsClosePopup(evt)
});

popupScanImage.addEventListener('click', (event) => checkEventsClosePopup(event)); 


//циклы
initialCards.forEach(element => {const card = new Card(element, '#card', cards)
card.addCard()});


export {openPopup, popupScanImage}
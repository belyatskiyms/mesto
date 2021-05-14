//Кнопки открывающие popup
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

//Кнопки закрывающие popup
const closeBtnEditProfile = document.querySelector('.popup__close-button_edit-profile');
const closeBtnAddCard = document.querySelector('.popup__close-button_add-card');
const closeBtnScanImage = document.querySelector('.popup__close-button_scan-image');

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
const popupCardImage = document.querySelector('.popup__card-image')
const popupImageDescr = document.querySelector('.popup__image-descr')
const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#card').content;

//Функции
function openPopup(popup){                                         
  popup.classList.add('popup_opened');  
  window.addEventListener('keydown', checkKeyDownEscape);
}
function openPopupAddCard() {
  formAddCard.reset();
  resetFormValidation(popupAddCard)
  openPopup(popupAddCard)
}
function openPopupImage(img, title) {
  popupCardImage.src = img
  popupCardImage.alt = title
  popupImageDescr.textContent = title
  openPopup(popupScanImage);
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
function addCard(img, title){
    const cardItem = createCard(img, title);
    cards.prepend(cardItem);
}
function createCard(img, title){
    const cardItem = cardsTemplate.querySelector('.cards__item').cloneNode(true);
    const cardItemImage = cardItem.querySelector('.cards__image');
    cardItemImage.src = img
    cardItemImage.alt = title  //Заполняет атрибут alt изображения)
    cardItemImage.addEventListener('click', () => openPopupImage(img, title))
    cardItem.querySelector('.cards__title').textContent = title
    cardItem.querySelector('.cards__like').addEventListener('click', (e) => e.target.classList.toggle('cards__like_active'));
    cardItem.querySelector('.cards__delete-button').addEventListener('click', (e) => e.target.closest('.cards__item').remove());
    return cardItem
}

//слушатели событий
buttonProfileEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputVacation.value = profileVacation.textContent
  resetFormValidation(popupEditProfile)
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
  addCard(inputSrcImage.value, inputTitle.value);
  checkEventsClosePopup(evt)
  formAddCard.reset()
});
popupScanImage.addEventListener('click', (event) => checkEventsClosePopup(event)); 

//циклы
initialCards.forEach(element => addCard(element.link, element.name));





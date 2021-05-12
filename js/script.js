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
}
function openPopupImage(img, title) {
  popupCardImage.src = img
  popupCardImage.alt = title
  popupImageDescr.textContent = title
  openPopup(popupScanImage);
  popupScanImage.addEventListener('keydown', checkEventsClosePopup);
}
function closePopup(){
    const popuOpened = document.querySelector('.popup_opened');
    popuOpened.removeEventListener('keydown', checkEventsClosePopup);
    popuOpened.classList.remove('popup_opened');                                    
}
function checkEventsClosePopup(event){    
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button') || event.key === 'Escape'){
      closePopup()
      return true // Разрешение на reset
    }else if(event.target.classList.contains('popup__button')){
      closePopup()
      return false
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
  enableValidation();
  openPopup(popupEditProfile);
  popupEditProfile.addEventListener('keydown', checkEventsClosePopup);
});
popupEditProfile.addEventListener('click', (event) => checkEventsClosePopup(event));
formEditProfile.addEventListener('submit', submitEditProfileForm); 

buttonAddCard.addEventListener('click', () => {
  enableValidation()
  openPopup(popupAddCard)
  popupAddCard.addEventListener('keydown', checkEventsClosePopup);
}); 
popupAddCard.addEventListener('click', (event) => {
  if(checkEventsClosePopup(event)){
    formAddCard.reset()
  }
}); 
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(inputSrcImage.value, inputTitle.value);
  formAddCard.reset()
});
popupScanImage.addEventListener('click', (event) => checkEventsClosePopup(event)); 

//циклы
initialCards.forEach(element => addCard(element.link, element.name));






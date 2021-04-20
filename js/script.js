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

//слушатели событий
buttonProfileEdit.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputVacation.value = profileVacation.textContent;
    openPopup(popupEditProfile);
});
closeBtnEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
formEditProfile.addEventListener('submit', submitEditProfileForm); 

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));  
closeBtnAddCard.addEventListener('click', () => {
    closePopup(popupAddCard);
    resetFormAddCard();
}); 
formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCard(inputSrcImage.value, inputTitle.value);
    closePopup(popupAddCard);
    resetFormAddCard();
});

closeBtnScanImage.addEventListener('click', () => closePopup(popupScanImage)); 

//Функции
function openPopup(popup){                                         
        popup.classList.add('popup_opened');
}
function openPopupImage(img, title) {
  popupCardImage.src = img
  popupCardImage.alt = title
  popupImageDescr.textContent = title
  openPopup(popupScanImage);
}
function closePopup(popup){                                                              
        popup.classList.remove('popup_opened');
}
function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileVacation.textContent = inputVacation.value;
    closePopup(popupEditProfile);
}
function resetFormAddCard(){
  inputSrcImage.value = '';
  inputTitle.value = '';
}
function addCard(img, title){
    const cards = document.querySelector('.cards');
    const cardItem = createCard(img, title);
    cards.prepend(cardItem);
}
function createCard(img, title){
    const cardsTemplate = document.querySelector('#card').content;
    const cardItem = cardsTemplate.querySelector('.cards__item').cloneNode(true);
    cardItem.querySelector('.cards__image').src = img
    cardItem.querySelector('.cards__image').alt = title
    cardItem.querySelector('.cards__title').textContent = title
    cardItem.querySelector('.cards__image').addEventListener('click', () => openPopupImage(img, title))
    cardItem.querySelector('.cards__like').addEventListener('click', (e) => e.target.classList.toggle('cards__like_active'));
    cardItem.querySelector('.cards__delete-button').addEventListener('click', (e) => e.target.closest('.cards__item').remove());
    return cardItem
}
//циклы
for (let key in initialCards){
  addCard(initialCards[key].link, initialCards[key].name)
}

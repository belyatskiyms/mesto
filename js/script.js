let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileVocation = document.querySelector('.profile__vocation');
let popupForm = document.querySelector('.popup__form');
let inputName = document.querySelector('#name');
let inputVocation = document.querySelector('#vocation');

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileVocation.textContent = inputVocation.value;
    popupClose();
}
function popupOpen(){
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputVocation.value = profileVocation.textContent;
}
function popupClose(){
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);  //Открывает popup
popupCloseButton.addEventListener('click', popupClose); //Закрывает popup
popupForm.addEventListener('submit', formSubmitHandler); //Обрабатывает данные формы
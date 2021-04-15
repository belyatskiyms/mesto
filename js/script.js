let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileVocation = document.querySelector('.profile__vocation');
let popupButton = document.querySelector('.popup__form');
let inputName = document.querySelector('#name');
let inputVocation = document.querySelector('#vocation');

editButton.addEventListener('click', () => {
    popup.classList.add('popup_opened')
    inputName.value = profileName.innerText;
    inputVocation.value = profileVocation.innerText;     
});
popupCloseButton.addEventListener('click', () => popup.classList.remove('popup_opened') );
popupButton.addEventListener('submit', formSubmitHandler); 

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileVocation.textContent = inputVocation.value;
    popup.classList.remove('popup_opened');
}



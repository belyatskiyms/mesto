//Кнопки в профиле, открывающие popup
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
//popup'ы и кнопки закрытия
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
//Формы popup
const popupForm = document.querySelectorAll('.popup__form');
//input'ы popup'ов
const inputName = document.querySelector('#name');
const inputVocation = document.querySelector('#vocation');
const inputTitle = document.querySelector('#title');
const inputSrcImage = document.querySelector('#srcImage');

const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');

//слушатели событий попапа редактирования профиля
editButton.addEventListener('click', openPopup(0));  //Открывает popup
popupCloseButton[0].addEventListener('click', closePopup(0)); //Закрывает popup
popupForm[0].addEventListener('submit', FormSubmitHandler); //Обрабатывает данные формы
//слушатели событий попапа добавления места
addButton.addEventListener('click', openPopup(1));  //Открывает popup
popupCloseButton[1].addEventListener('click', closePopup(1)); //Закрывает popup
popupForm[1].addEventListener('submit', (evt) => {
    evt.preventDefault();
    createCardItem(inputSrcImage.value, inputTitle.value);
    closePopup(1)();
});                                                                    //Обрабатывает данные формы
//слушатели событий попапа демонстрации картинки
popupCloseButton[2].addEventListener('click', closePopup(2)); //Закрывает popup

//Функции открытия/закрытия popup
function openPopup(i){
    return function (){                                               //Вкладываем функцию, чтобы передать аргументы в Call back
        popup[i].classList.add('popup_opened');
        inputName.value = profileName.textContent;
        inputVocation.value = profileVocation.textContent;
    }
}
function closePopup(i){
    return function (){                                               //Вкладываем функцию, чтобы передать аргументы в Call back                   
        popup[i].classList.remove('popup_opened');
    }
}
//Открытие попапа изображения
const popupCardImage = document.querySelector('.popup__card-image')
const popupImageDescr = document.querySelector('.popup__image-descr')
function openPopupImage(img, title) {
    return function (){
        popupCardImage.src = img
        popupImageDescr.textContent = title
        openPopup(2)();
    }
};
//Обработчик формы popup'a о редактировании профиля
function FormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileVocation.textContent = inputVocation.value;
    closePopup(0)();
}

//-----------------------------------------------Работа с карточками------------------------------------------------------------------

const cardsTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
for (let key in initialCards){
    createCardItem(initialCards[key].link, initialCards[key].name)
}

function createCardItem(img, title){
    const cardItem = cardsTemplate.querySelector('.cards__item').cloneNode(true);
    cardItem.querySelector('.cards__image').src = img
    cardItem.querySelector('.cards__image').addEventListener('click', openPopupImage(img, title))
    cardItem.querySelector('.cards__title').textContent = title
    cardItem.querySelector('.cards__like').addEventListener('click', (e) => e.target.classList.toggle('cards__like_active'));
    cardItem.querySelector('.cards__delete-button').addEventListener('click', (e) => e.target.closest('.cards__item').remove());
    cards.prepend(cardItem);
}



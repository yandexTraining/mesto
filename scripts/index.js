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



// Определение переменных
let profilePopup = document.querySelector('#popup-edit-prof');
let profilePopupOpenBtn = document.querySelector('.profile__edit-btn');
let profilePopupCloseBtn = document.querySelector('#popup-edit-prof-btn-close');
let profilePopupInputName = document.getElementById('input-name-prof');
let profilePopupInputJob = document.getElementById('input-job-prof');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let cardPopup = document.querySelector('#popup-add-card');
let cardPopupOpenBtn = document.querySelector('.profile__add-btn');
let cardPopupCloseBtn = document.querySelector('#popup-add-card-btn-close');
let cardPopupInputName = document.getElementById('input-name-card');
let cardPopupInputPic = document.getElementById('input-pic-card');



// Стартовая загрузка карточек из массива
initialCards.forEach((card) => {
  funcNewCardCreation(card.name, card.link);
});



// Обработчики событий
profilePopupOpenBtn.addEventListener('click', funcProfilePopupOpen);
profilePopupCloseBtn.addEventListener('click', funcProfilePopupClose);
profilePopup.addEventListener('submit', funcProfilePopupSubmit);
cardPopupOpenBtn.addEventListener('click', funcCardPopupOpen);
cardPopupCloseBtn.addEventListener('click', funcCardPopupClose);
cardPopup.addEventListener('submit', funcCardPopupSubmit);



// Определение функций
function funcCardPopupOpen() {
  cardPopup.classList.add('popup_opened');
}

function funcCardPopupClose() {
  cardPopup.classList.remove('popup_opened');
}

function funcCardPopupSubmit(evt) {
  evt.preventDefault();
  funcNewCardCreation(cardPopupInputName.value, cardPopupInputPic.value); // передали функции значения первого и второго инпутов попапа
  funcCardPopupClose();
}

function funcNewCardCreation(cardTitle, cardPicLink) {
  const cardTmpl = document.getElementById('tmpl-card').content; // content - берет только внутренности темплэйта
  const cardList = document.querySelector('.elements'); // список в который будем добавлять новые карточки
  const newCard = cardTmpl.querySelector('.elements__card').cloneNode(true); // клонировали шаблон карточки в переменную
  newCard.querySelector('.elements__card-title').textContent = cardTitle; // заполнили название
  newCard.querySelector('.elements__card-img').src = cardPicLink; // записали линк
  cardList.prepend(newCard); // добавили новую карточку в начало списка
}

function funcProfilePopupOpen() {
  profilePopup.classList.add('popup_opened');
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputJob.value = profileJob.textContent;
}

function funcProfilePopupClose() {
  profilePopup.classList.remove('popup_opened');
}

function funcProfilePopupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileJob.textContent = profilePopupInputJob.value;
  funcProfilePopupClose();
}

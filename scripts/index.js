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
const profilePopup = document.querySelector('#popup-edit-prof');
const profilePopupOpenBtn = document.querySelector('.profile__edit-btn');
const profilePopupCloseBtn = document.querySelector('#popup-edit-prof-btn-close');
const profilePopupInputName = document.getElementById('input-name-prof');
const profilePopupInputJob = document.getElementById('input-job-prof');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardList = document.querySelector('.elements');
const cardPopup = document.querySelector('#popup-add-card');
const cardPopupOpenBtn = document.querySelector('.profile__add-btn');
const cardPopupCloseBtn = document.querySelector('#popup-add-card-btn-close');
const cardPopupInputName = document.getElementById('input-name-card');
const cardPopupInputPic = document.getElementById('input-pic-card');
const cardRemoveBtn = document.querySelector('.elements__trash');
const enlargeCardPopup = document.querySelector('#popup-card-enlarge');
const enlargeCardPopupCloseBtn = document.querySelector('#popup-card-enlarge-btn-close');
const enlargeCardPopupImg = document.querySelector('.popup__large-image');
const enlargeCardPopupCapture = document.querySelector('.popup__card-img-caption');


// Определение функций
function funcCardRemove(event) {
  event.target.closest('.elements__card').remove();
}

function funcCardLike(event) {
  event.target.classList.toggle('elements__card-tag_active');
}

function funcCardPopupOpen() {
  cardPopup.classList.add('popup_opened');
}

function funcCardPopupClose() {
  cardPopup.classList.remove('popup_opened');
}

function funcCardPopupSubmit(evt) {
  evt.preventDefault();
  const newCard = funcNewCardCreation(cardPopupInputName.value, cardPopupInputPic.value); // передали функции значения первого и второго инпутов попапа
  cardList.prepend(newCard); // добавили новую карточку в начало списка
  funcCardPopupClose();
}

function funcNewCardCreation(cardTitle, cardPicLink) {
  const cardTmpl = document.getElementById('tmpl-card').content; // content - берет только внутренности темплэйта
  const newCard = cardTmpl.querySelector('.elements__card').cloneNode(true); // клонировали шаблон карточки в переменную
  newCard.querySelector('.elements__card-title').textContent = cardTitle; // заполнили название
  newCard.querySelector('.elements__card-img').src = cardPicLink; // записали линк

  newCard.querySelector('.elements__trash').addEventListener('click', funcCardRemove);
  newCard.querySelector('.elements__card-tag').addEventListener('click', funcCardLike);
  newCard.querySelector('.elements__card-img').addEventListener('click', funcCardEnlarge);
  return newCard;
}

function funcAddListener(newCard) {
  newCard.querySelector('.elements__trash').addEventListener('click', funcCardRemove);
  newCard.querySelector('.elements__card-tag').addEventListener('click', funcCardLike);
  newCard.querySelector('.elements__card-img').addEventListener('click', funcCardEnlarge);
}

function funcCardEnlarge(event) {
  enlargeCardPopupImg.src = event.target.src;
  enlargeCardPopupCapture.textContent = event.target.parentNode.querySelector('.elements__card-title').textContent;
  enlargeCardPopup.classList.add('popup_opened');
}

function funcEnlargeCardPopupClose() {
  enlargeCardPopup.classList.remove('popup_opened');
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


// Стартовая загрузка карточек из массива
initialCards.forEach((card) => {
  const newCard = funcNewCardCreation(card.name, card.link);
  cardList.prepend(newCard);
});


// Обработчики событий
profilePopupOpenBtn.addEventListener('click', funcProfilePopupOpen);
profilePopupCloseBtn.addEventListener('click', funcProfilePopupClose);
profilePopup.addEventListener('submit', funcProfilePopupSubmit);
cardPopupOpenBtn.addEventListener('click', funcCardPopupOpen);
cardPopupCloseBtn.addEventListener('click', funcCardPopupClose);
cardPopup.addEventListener('submit', funcCardPopupSubmit);
enlargeCardPopupCloseBtn.addEventListener('click', funcEnlargeCardPopupClose);

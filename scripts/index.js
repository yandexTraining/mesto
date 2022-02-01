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
function funcOpenPopup(popup) {
  popup.classList.add('popup_opened');
}

function funcClosePopup(popup) {
  popup.classList.remove('popup_opened');
}

function funcProfilePopupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileJob.textContent = profilePopupInputJob.value;
  funcClosePopup(profilePopup);
}

function funcCardPopupSubmit(evt) {
  evt.preventDefault();
  const newCard = funcNewCardCreation(cardPopupInputName.value, cardPopupInputPic.value); // передали функции значения первого и второго инпутов попапа
  funcPrependObject(cardList, newCard); // добавили новую карточку в начало списка
  funcClosePopup(cardPopup);
}

function funcNewCardCreation(cardTitle, cardPicLink) {
  const cardTmpl = document.getElementById('tmpl-card').content; // content - берет только внутренности темплэйта
  const newCard = cardTmpl.querySelector('.elements__card').cloneNode(true); // клонировали шаблон карточки в переменную
  newCard.querySelector('.elements__card-title').textContent = cardTitle; // заполнили название
  newCard.querySelector('.elements__card-img').alt = cardTitle; // alt пусть будет такой же как название картинки
  newCard.querySelector('.elements__card-img').src = cardPicLink; // записали линк
  newCard.querySelector('.elements__trash').addEventListener('click', funcCardRemove);
  newCard.querySelector('.elements__card-tag').addEventListener('click', funcCardLike);
  newCard.querySelector('.elements__card-img').addEventListener('click', funcCardEnlarge);
  return newCard;
}

function funcCardRemove(event) {
  event.target.closest('.elements__card').remove();
}

function funcCardLike(event) {
  event.target.classList.toggle('elements__card-tag_active');
}

function funcCardEnlarge(event) {
  enlargeCardPopupCapture.textContent = event.target.parentNode.querySelector('.elements__card-title').textContent;
  enlargeCardPopupImg.alt = event.target.alt;
  enlargeCardPopupImg.src = event.target.src;
  funcOpenPopup(enlargeCardPopup);
}

function funcPrependObject(placeInHtml, object) {
  placeInHtml.prepend(object);
}
////////////////////////////////////////////////////////////


// Стартовая загрузка карточек из массива
initialCards.forEach((card) => {
  const newCard = funcNewCardCreation(card.name, card.link);
  funcPrependObject(cardList, newCard);
});
/////////////////////////////////////////////////////////////


// Обработчики событий
profilePopupOpenBtn.addEventListener('click', function () {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputJob.value = profileJob.textContent;
  funcOpenPopup(profilePopup);
}); // Попап редактирования профиля. Сначала заносим данные в поля инпутов и потом открывыем попап профиля.

cardPopupOpenBtn.addEventListener('click', function () {
  cardPopupInputName.value = '';
  cardPopupInputPic.value = '';
  funcOpenPopup(cardPopup);
}); // Попап добавления карточки. Сначала очищаем поля инпутов и потом открываем попап.


profilePopupCloseBtn.addEventListener('click', function () {
  funcClosePopup(profilePopup);
});

cardPopupCloseBtn.addEventListener('click', function () {
  funcClosePopup(cardPopup);
});

enlargeCardPopupCloseBtn.addEventListener('click', function () {
  funcClosePopup(enlargeCardPopup);
});

profilePopup.addEventListener('submit', funcProfilePopupSubmit);

cardPopup.addEventListener('submit', funcCardPopupSubmit);



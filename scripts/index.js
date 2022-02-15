// Стартовые картинки
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


// Описание переменных
const btnOpenProf = document.querySelector('.btn-open-prof-mark');
const btnCloseProf = document.querySelector('.btn-close-prof-mark');
const formProf = document.querySelector('.form-prof-mark');
const btnOpenCard = document.querySelector('.btn-open-card-mark');
const btnCloseCard = document.querySelector('.btn-close-card-mark');
const formCard = document.querySelector('.form-card-mark');
const popupProf = document.querySelector('.popup-prof-mark');
const popupCard = document.querySelector('.popup-card-mark');
const figCaption = document.querySelector('.popup__card-img-caption');
const imgLarge = document.querySelector('.popup__large-image');
const popupPic = document.querySelector('.popup-enlarge-mark');
const btnClosePic = document.querySelector('.btn-close-enlarge-mark');
const inpNameProf = document.querySelector('.input-name-prof-mark');
const inpJobProf = document.querySelector('.input-job-prof-mark');
const inpTitleCard = document.querySelector('.input-title-card-mark');
const inpLinkCard = document.querySelector('.input-link-card-mark');
const profName = document.querySelector('.prof-name-mark');
const profJob = document.querySelector('.prof-job-mark');
const cardTitle = document.querySelector('.card-title-mark');
const cardLink = document.querySelector('.card-link-mark');
const cardList = document.querySelector('.elements');


// Кнопка редактирования профиля
btnOpenProf.addEventListener('click', () => {
  inpNameProf.value = profName.textContent;
  inpJobProf.value = profJob.textContent;
  openPopup(popupProf);
});

// Кнопка закрытия попапа профиля
btnCloseProf.addEventListener('click', () => {
  formProf.reset();
  closePopup(popupProf);
});

// Кнопка сабмита формы профиля
formProf.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profName.textContent = inpNameProf.value;
  profJob.textContent = inpJobProf.value;
  formProf.reset();
  closePopup(popupProf);
});

// Кнопка добавления новой карточки
btnOpenCard.addEventListener('click', () => {
  inpTitleCard.value = '';
  inpLinkCard.value = '';
  openPopup(popupCard);
});

// Кнопка закрытия попапа добавления карточки
btnCloseCard.addEventListener('click', () => {
  formCard.reset();
  closePopup(popupCard);
});

// Кнопка сабмита формы карточки
formCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createNewCard(inpTitleCard.value, inpLinkCard.value);
  prependCard(newCard);
  closePopup(popupCard);
});

// Кнопка закрытия большой картинки
btnClosePic.addEventListener('click', () => {
  closePopup(popupPic);
});

// Функция создания новой карточки из шаблона
function createNewCard(title, link) {
  const cardTmpl = document.querySelector('.template-card').content;
  const newCard = cardTmpl.querySelector('.elements__card').cloneNode(true);
  newCard.querySelector('.elements__card-title').textContent = title;
  newCard.querySelector('.elements__card-img').alt = title;
  newCard.querySelector('.elements__card-img').src = link;
  newCard.querySelector('.elements__trash').addEventListener('click', deleteCard);
  newCard.querySelector('.elements__card-tag').addEventListener('click', likeCard);
  newCard.querySelector('.elements__card-img').addEventListener('click', enlargePic);
  return newCard;
}

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.elements__card').remove();
};

// Функция лайк
function likeCard(evt) {
  evt.target.classList.toggle('elements__card-tag_active');
};

// Функция открытия попапа картинки
function enlargePic(evt) {
  figCaption.textContent = evt.target.parentNode.querySelector('.elements__card-title').textContent;
  imgLarge.alt = evt.target.alt;
  imgLarge.src = evt.target.src;
  openPopup(popupPic);
};

// Функция добавления карточки в галерею
function prependCard(newCard) {
  cardList.prepend(newCard);
};

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByESC);
  popup.removeEventListener('click', closeByClick);
};

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByESC);
  popup.addEventListener('click', closeByClick);
};

// Функция закрытия попапа по ESC 
function closeByESC(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    const form = popup.querySelector('.popup__form');
    if (form) {
      form.reset();
    };
    closePopup(popup);
  };
};

// Функция закрытия попапа по оверлею
function closeByClick(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    const form = popup.querySelector('.popup__form');
    if (form) {
      form.reset();
    };
    closePopup(popup);
  };
};

// Стартовая загрузка карточек
initialCards.forEach((card) => {
  const newCard = createNewCard(card.name, card.link);
  prependCard(newCard);
});
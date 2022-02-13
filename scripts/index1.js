/////////////////////////////////////////////////////////////
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


/////////////////////////////////////////////////////////////
const popupProf = document.getElementById('popup-edit-prof');
const formProf = document.getElementById('profile-form');
const openProfBtn = document.getElementById('open-btn-prof');
const closeProfBtn = document.getElementById('popup-edit-prof-btn-close');
const submitProfBtn = document.getElementById('btn-submit-profile');
const inpNameProf = document.getElementById('input-name-prof');
const inpJobProf = document.getElementById('input-job-prof');
const profName = document.getElementById('prof-name');
const profJob = document.getElementById('prof-job');

const cardList = document.querySelector('.elements');
const popupCard = document.getElementById('popup-add-card');
const formCard = document.getElementById('card-form');
const openCardBtn = document.getElementById('open-btn-card');
const closeCardBtn = document.getElementById('popup-add-card-btn-close');
const submitCardBtn = document.getElementById('btn-submit-card');
const inpTitleCard = document.getElementById('input-name-card');
const inpLinkCard = document.getElementById('input-pic-card');

const popupPic = document.getElementById('popup-card-enlarge');
const formEnlarge = document.getElementById('enlarge-form');
const closePic = document.getElementById('popup-card-enlarge-btn-close');
const figCaption = document.querySelector('.popup__card-img-caption');
const enlargeImg = document.querySelector('.popup__large-image');


/////////////////////////////////////////////////////////////////////////
// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByESC);
  popup.addEventListener('click', closeByClick);
}

// Функция закрытия попапа по ESC
function closeByESC(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Функция закрытия попапа по клику на оверлее
function closeByClick() {
  const popup = document.querySelector('.popup_opened');
  closePopup(popup);
}

// Функция закрытия попапа по крестику
function closePopup(popup) {
  const form = popup.querySelector('.popup__form');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByClick);
  popup.removeEventListener('click', closeByClick);
  form.reset();
}

// Функция сабмита профиля
function submitProfile(evt) {
  evt.preventDefault();
  profName.textContent = inpNameProf.value;
  profJob.textContent = inpJobProf.value;
  closePopup(popupProf);
}

// Функция сабмита карточки
function submitCard(evt) {
  evt.preventDefault();
  const newCard = createNewCard(inpTitleCard.value, inpLinkCard.value);
  prependCard(newCard);
  closePopup(popupCard);
}

// Функция создания новой карточки из шаблона
function createNewCard(title, link) {
  const cardTmpl = document.getElementById('tmpl-card').content;
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
  enlargeImg.alt = evt.target.alt;
  enlargeImg.src = evt.target.src;
  openPopup(popupPic);
};

// Функция добавления карточки в галерею
function prependCard(newCard) {
  cardList.prepend(newCard);
};

// Функция показа большой картинки
function enlargePic(evt) {
  figCaption.textContent = evt.target.parentNode.querySelector('.elements__card-title').textContent;
  enlargeImg.alt = evt.target.alt;
  enlargeImg.src = evt.target.src;
  openPopup(popupPic);
};



//////////////////////////////////////////////////////////////////////////
// Кнопка открытия попапа редактирования профиля
openProfBtn.addEventListener('click', function () {
  inpNameProf.value = profName.textContent;
  inpJobProf.value = profJob.textContent;
  openPopup(popupProf);
});

// Кнопка закрытия попапа редактирования профиля
closeProfBtn.addEventListener('click', function () {
  closePopup(popupProf);
});

// Кнопка сабмит профиля
formProf.addEventListener('submit', submitProfile);

// Кнопка открытия попапа добавления карточки
openCardBtn.addEventListener('click', function () {
  inpTitleCard.value = '';
  inpLinkCard.value = '';
  openPopup(popupCard);
});

// Кнопка закрытия попапа добавления карточки
closeCardBtn.addEventListener('click', function () {
  closePopup(popupCard);
});

// Кнопка сабмита формы добавления карточки
formCard.addEventListener('submit', submitCard);

// Кнопка закрытия картинки
closePic.addEventListener('click', function (evt) {
  closePopup(popupPic);
});


///////////////////////////////////////////////////////////////////////
// Стартовая загрузка карточек
initialCards.forEach((card) => {
  const newCard = createNewCard(card.name, card.link);
  prependCard(newCard);
});


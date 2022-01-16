let btnOpenPopupEditProfile = document.querySelector('.profile__edit-btn');
let btnClosePopupEditProfile = document.querySelector('.popup-edit-prof__btn-close');
let btnSubmitPopupEditProfile = document.querySelector('.popup-edit-prof__btn-submit');
let formEditProfile = document.querySelector('.popup-edit-prof__form');

// Функция сохранения изменений
function funcSubmitEditProfile() {
  document.querySelector('.profile__name').textContent = document.querySelector('.popup-edit-prof__input-name').value;
  document.querySelector('.profile__job').textContent = document.querySelector('.popup-edit-prof__input-job').value;
  document.querySelector('.popup-edit-prof').classList.remove('popup-edit-prof_opened');  
}

// Функция открытия окна редактирования профиля
function funcOpenEditProfile() {
  document.querySelector('.popup-edit-prof').classList.add('popup-edit-prof_opened'); 
}

// Функция закрытия окна редактирования профиля
function funcCloseEditProfile() {
  document.querySelector('.popup-edit-prof').classList.remove('popup-edit-prof_opened'); 
}

// обработчики событий
btnClosePopupEditProfile.addEventListener('click', funcSubmitEditProfile);

btnSubmitPopupEditProfile.addEventListener('click', funcCloseEditProfile);

btnOpenPopupEditProfile.addEventListener('click', funcOpenEditProfile);

formEditProfile.addEventListener('keydown', function(key) {
  if (key.keyCode === 13) {
    funcSubmitEditProfile();
  } else if (key.keyCode === 27) {
    funcCloseEditProfile();
  }
});



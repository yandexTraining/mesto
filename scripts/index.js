let btnOpenPopupEditProfile = document.querySelector('.profile__edit-btn');
let btnClosePopupEditProfile = document.querySelector('.popup-edit-prof__btn-close');
let btnSubmitPopupEditProfile = document.querySelector('.popup-edit-prof__btn-submit');
let formEditProfile = document.querySelector('.popup-edit-prof__form');
let popupEditProfile = document.querySelector('.popup-edit-prof');
let inputNameEditProfile = document.querySelector('.popup-edit-prof__input-name');
let inputJobEditProfile = document.querySelector('.popup-edit-prof__input-job');

// Функция сохранения изменений
function funcSubmitEditProfile() {
  console.log('save');
  console.log(inputNameEditProfile.value);
  document.querySelector('.profile__name').textContent = inputNameEditProfile.value;
  document.querySelector('.profile__job').textContent = inputJobEditProfile.value;
  popupEditProfile.classList.remove('popup-edit-prof_opened');  
}

// Функция открытия окна редактирования профиля
function funcOpenEditProfile() {
  popupEditProfile.classList.add('popup-edit-prof_opened'); 
}

// Функция закрытия окна редактирования профиля
function funcCloseEditProfile() {
  popupEditProfile.classList.remove('popup-edit-prof_opened'); 
}

// обработчики событий
btnClosePopupEditProfile.addEventListener('click', funcCloseEditProfile);

btnSubmitPopupEditProfile.addEventListener('click', funcSubmitEditProfile);

btnOpenPopupEditProfile.addEventListener('click', funcOpenEditProfile);

popupEditProfile.addEventListener('keydown', function(key) {
  if (key.keyCode === 13) {
    funcSubmitEditProfile();
  } else if (key.keyCode === 27) {
    funcCloseEditProfile();
  }
});



let profilePopup = document.querySelector('.popup-edit-prof');
let profilePopupOpenBtn = document.querySelector('.profile__edit-btn');
let profilePopupCloseBtn = document.querySelector('.popup-edit-prof__btn-close');
let profilePopupInputName = document.getElementById('input-name');
let profilePopupInputJob = document.getElementById('input-job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');


profilePopupOpenBtn.addEventListener('click', funcProfilePopupOpen);
profilePopupCloseBtn.addEventListener('click', funcProfilePopupClose);
profilePopup.addEventListener('submit', funcProfilePopupSubmit);


function funcProfilePopupOpen() {
  profilePopup.classList.add('popup-edit-prof_opened');
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputJob.value = profileJob.textContent;
}

function funcProfilePopupClose() {
  profilePopup.classList.remove('popup-edit-prof_opened');
}

function funcProfilePopupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileJob.textContent = profilePopupInputJob.value;
  funcProfilePopupClose();
}



/*
let btnOpenPopupEditProfile = document.querySelector('.profile__edit-btn');
let btnClosePopupEditProfile = document.querySelector('.popup-edit-prof__btn-close');
let btnSubmitPopupEditProfile = document.querySelector('.popup-edit-prof__btn-submit');
let formEditProfile = document.querySelector('.popup-edit-prof__form');
let popupEditProfile = document.querySelector('.popup-edit-prof');
let inputNameEditProfile = document.getElementById('input-name');
let inputJobEditProfile = document.getElementById('input-job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');



btnOpenPopupEditProfile.addEventListener('click', funcOpenEditProfile);

btnClosePopupEditProfile.addEventListener('click', funcCloseEditProfile);

btnSubmitPopupEditProfile.addEventListener('click', funcSubmitEditProfile);


// Функция открытия окна редактирования профиля
function funcOpenEditProfile() {
  popupEditProfile.classList.add('popup-edit-prof_opened');
  inputNameEditProfile.setAttribute('value', profileName) 
  inputJobEditProfile.setAttribute('value', profileJob)  
}




// Функция сохранения изменений
function funcSubmitEditProfile() {
  console.log('save');
  console.log(inputNameEditProfile.value);
  document.querySelector('.profile__name').textContent = inputNameEditProfile.value;
  document.querySelector('.profile__job').textContent = inputJobEditProfile.value;
  popupEditProfile.classList.remove('popup-edit-prof_opened');  
}


// Функция закрытия окна редактирования профиля
function funcCloseEditProfile() {
  popupEditProfile.classList.remove('popup-edit-prof_opened'); 
}
*/
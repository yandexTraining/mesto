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

// Объект с идентификаторами 
const conf = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__input-error_submit_active',
  inputErrorClass: 'popup__input-error-field',
  errorClass: 'popup__input-error_text'
};


// Вызов функции поиска и установки слушателей для валидации
enableValidation(conf);


// Функция поиска и установки слушателей на формы
function enableValidation(conf) {
  const formList = Array.from(document.querySelectorAll(conf.formSelector)); // Нашли все формы на странице и положили их в массив 
  formList.forEach((formElement) => {
    // Ловим сабмиты и отменяем стандартное поведение  
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Ловим ресеты форм что бы удалять оставшиеся при закрытии попапа артефакты валидации
    formElement.addEventListener('reset', (evt) => {
      evt.preventDefault();
      resetForm(formElement, conf);
    });
    setEventListeners(formElement, conf); // Вызов функции установки слушателей на поля ввода внутри каждой из найденных форм
  });
}

// Функция добавления слушателей к инпутам форм 
function setEventListeners(formElement, conf) {
  const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector)); // Находим все инпуты в форме и складываем их в массив
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      evt.preventDefault();
      isValid(formElement, inputList, conf); // Каждому найденному инпуту добавим обработчик проверки валидности.
    });
  });
}

// Функция проверки состояний инпутов и форм
function isValid(formElement, inputList, conf) {
  if (formElement.checkValidity()) {  // если форма валидна, то:
    cancelBtnError(formElement, conf); // переводим кнопку в активное сотсояние
    inputList.forEach((inputElement) => {
      cancelInputError(formElement, inputElement, conf) // канселим ошибки на всех инпутах формы
    });
  } else { // если форма не валидна, то:
    handleBtnError(formElement, conf); // выключаем кнопку
    inputList.forEach((inputElement) => {
      if (inputElement.validity.valid) { // проверяем состояние каждого инпута формы
        cancelInputError(formElement, inputElement, conf); // на валидных инпутах канселим ошибки
      } else {
        handleInputError(formElement, inputElement, conf); // не валидные инпуты переводлим в ошибку
      }
    });
  };
}

// Функция переовода инпута в ошибку
function handleInputError(formElement, inputElement, conf) {
  inputElement.classList.add(conf.inputErrorClass);
  const span = formElement.querySelector(`.${inputElement.id}-error`); // Это нахождение спана, соответствующего инпуту
  span.textContent = inputElement.validationMessage; // добавление текста ошибки
}

// Функция сброса ошибки на инпуте
function cancelInputError(formElement, inputElement, conf) {
  inputElement.classList.remove(conf.inputErrorClass);
  const span = formElement.querySelector(`.${inputElement.id}-error`); // Это нахождение спана, соответствующего инпуту
  span.textContent = ''; // удаление текста ошибки
}

// Функция перевода кнопки в не активное состояние
function handleBtnError(formElement, conf) {
  formElement.querySelector(conf.submitButtonSelector).setAttribute('disabled', true); // Выключаем кнопку
  formElement.querySelector(conf.submitButtonSelector).classList.add(conf.inactiveButtonClass); // Красим кнопку в неактивный цвет
}

// Функция отмены ошибки на кнопке и возврат в активное состояние
function cancelBtnError(formElement, conf) {
  formElement.querySelector(conf.submitButtonSelector).removeAttribute('disabled'); // Делаем кнопку активной
  formElement.querySelector(conf.submitButtonSelector).classList.remove(conf.inactiveButtonClass); // Красим кнопку в активный цвет
}

// Функция обработки ресета формы. Используется что бы сбросить все артефакты валидации при закрытии попапа.
function resetForm(formElement, conf) {
  const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector)); // Находим все инпуты в форме и складываем их в массив
  if (inputList.length > 0) { // Если в форме найден хоть один инпут, то выполним очистку артефактов валидации
    inputList.forEach((inputElement) => {
      cancelInputError(formElement, inputElement, conf); // Сбрасываем все артефакты валидации по инпутам
    });
    handleBtnError(formElement, conf); // Делаем кнопку не активной, потому что сразу после следующего вызова формы, она будет чистой и сохранять всё равно нечего
  };
}

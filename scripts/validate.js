// Объект с идентификаторами 
const conf = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__input-error-submit',
  inputErrorClass: 'popup__input-error-field',
  errorClass: 'popup__input-error_text'
};


// Вызов функции поиска и установки слушателей для валидации
enableValidation(conf);


// Функция поиска и установки слушателей на формы
function enableValidation(conf) {
  const formList = Array.from(document.querySelectorAll(conf.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    formElement.addEventListener('reset', (evt) => {
      evt.preventDefault();
      resetForm(formElement, conf);
    });
    setEventListeners(formElement, conf); // Вызов функции установки слушателей на поля ввода внутри каждой из найденных форм
  });
};

// Функция добавления слушателей к инпутам форм 
function setEventListeners(formElement, conf) {
  const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector)); // Находим все инпуты в форме и складываем их в массив
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      evt.preventDefault();
      checkInputValidity(evt, formElement, conf); // Каждому найденному инпуту добавим обработчик проверки валидности.
      toggleBtnState(formElement, conf); // Проверка состояния формы и переключение состояний кнопки
    });
  });
};

// Функция проверки состояний инпутов
function checkInputValidity(evt, formElement, conf) {
  const inputElement = evt.target;
    if (inputElement.validity.valid) { // проверяем состояние каждого инпута формы
      cancelInputError(formElement, inputElement, conf); // сбрасываем состояние ошибки
    } else {
      handleInputError(formElement, inputElement, conf); // переводим в состояние ошибки
    };
};

// Функция проверки переключения состояний кнопки
function toggleBtnState(formElement, conf) {
  if (formElement.checkValidity()) {
    cancelBtnError(formElement, conf); // возвращаем кнопку в активное сотсояние
  } else {
    handleBtnError(formElement, conf); // блокируем кнопку
  };
};

// Функция переовода инпута в ошибку
function handleInputError(formElement, inputElement, conf) {
  inputElement.classList.add(conf.inputErrorClass);
  inputElement.nextElementSibling.textContent = inputElement.validationMessage;
};

// Функция сброса ошибки на инпуте
function cancelInputError(formElement, inputElement, conf) {
  inputElement.classList.remove(conf.inputErrorClass);
  inputElement.nextElementSibling.textContent = '';
};

// Функция перевода кнопки в не активное состояние
function handleBtnError(formElement, conf) {
  const button = formElement.querySelector(conf.submitButtonSelector);
  button.setAttribute('disabled', true);
  button.classList.add(conf.inactiveButtonClass);
};

// Функция отмены ошибки на кнопке и возврат в активное состояние
function cancelBtnError(formElement, conf) {
  const button = formElement.querySelector(conf.submitButtonSelector);
  button.removeAttribute('disabled');
  button.classList.remove(conf.inactiveButtonClass);
};

// Функция очистки артефактов валидации
function resetForm(form, conf) {
  handleBtnError(form, conf);
  const inputList = Array.from(form.querySelectorAll(conf.inputSelector));
  inputList.forEach((input) => {
    cancelInputError(form, input, conf);
  });
};
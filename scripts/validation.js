import { validationConfig as config } from "./dataobjects"
// export const validationConfig = {
//   forms: '.popup__form',
//   invalidationErrorSelector: '.popup__invalid_from_', 
//   submitButtonSelector: '.popup__form-save-button',
//   submitButtonDisabledClass: 'popup__form-save-button_disabled',
//   textInputSelector: '.popup__form-text-input',
//   textInputInvalidClass: 'popup__form-text-input_invalid',
//   visibleInvalidationErrorClass: 'popup__invalid_visible'
// }
class FormValidator {
  constructor (config, formElement) {
    this._formElement = formElement;
    this._formsSelector = config.forms;
    this._invalidationErrorSelector = config.invalidationErrorSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonDisabledClass = config.submitButtonDisabledClass;
    this._textInputSelector = config.textInputSelector;
    this._visibleInvalidationErrorClass = config.visibleInvalidationErrorClass;
    this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);

    
  }

  enableValidation() {
    this.setEventListeners(this._formElement, this._textInputSelector, this._submitButtonSelector, this._invalidationErrorSelector, this._visibleInvalidationErrorClass, this._textInputInvalidClass, this._submitButtonDisabledClass)
  }

  _setEventListeners(formElement, textInputSelector, buttonElement, invalidationErrorSelector, visibleInvalidationErrorClass, textInputInvalidClass, submitButtonDisabledClass) {
    this._inputList = Array.from(formElement.querySelectorAll(textInputSelector));
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._setValidityBasedClass()
      })

    })
  }
}

console.log(config.forms)



function enableValidation(config) {
  const formsArray = Array.from(document.querySelectorAll(config.forms))
  setEventListeners(formsArray, config) }

function setEventListeners(formsArray, config) {
  formsArray.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(config.textInputSelector))
    const button = form.querySelector(config.submitButtonSelector)
    inputList.forEach((input) => {
      console.log(input)
      input.addEventListener('input', () => {
      setValidityBasedClass(input, config.invalidationErrorSelector, config.visibleInvalidationErrorClass, config.textInputInvalidClass);
      manageSubmitButton(inputList, button, config.submitButtonDisabledClass)
    })
    })
  })
}


function setValidityBasedClass(input, invalidationErrorSelector, visibleInvalidationErrorClass, textInputInvalidClass) {
  console.log(`${invalidationErrorSelector}${input.name}`)
  if (checkValidity(input)) {
    hideInvalidationMessage(input, textInputInvalidClass, visibleInvalidationErrorClass, invalidationErrorSelector)
  }
  else {
    showInvalidationMessage(input, textInputInvalidClass, visibleInvalidationErrorClass, invalidationErrorSelector)
  }
}


function showInvalidationMessage(input, textInputInvalidClass, visibleInvalidationErrorClass, invalidationErrorSelector) {
  const invalidationError = document.querySelector(`${invalidationErrorSelector}${input.name}`)
  console.log(invalidationError)
  input.classList.add(textInputInvalidClass)
  invalidationError.classList.add(visibleInvalidationErrorClass)
  invalidationError.textContent = input.validationMessage
}


function hideInvalidationMessage(input, textInputInvalidClass, visibleInvalidationErrorClass, invalidationErrorSelector) {
  const invalidationError = document.querySelector(`${invalidationErrorSelector}${input.name}`)
  input.classList.remove(textInputInvalidClass)
  invalidationError.classList.remove(visibleInvalidationErrorClass)
  invalidationError.textContent = ''
}

function manageSubmitButton(inputList, button, submitButtonDisabledClass ) {
  if (isValid(inputList)) {
    button.classList.remove(submitButtonDisabledClass)
    button.disabled = false
  }
  else {
    button.classList.add(submitButtonDisabledClass)
    button.disabled = true
  }

}

function isValid(inputList) {
  if (inputList.every((input) => input.validity.valid)) {
    console.log('+')
    return true
  }
  else {
    console.log('-')
    return false
    
  }
}




function checkValidity(input) {
  if (input.validity.valid) {
    console.log('valid')
    return true
  }
  else {
    console.log('not valid')
    return false
  }
}

enableValidation(config);

// testInput.addEventListener('input', (e) => setValidityBasedClass(e, config.invalidationErrorSelector, config.visibleInvalidationErrorClass, config.textInputInvalidClass))
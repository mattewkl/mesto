const config = {
  forms: Array.from(document.querySelectorAll('.popup__form')),
  invalidationErrorSelector: '.popup__invalid_from_', 
  submitButtonSelector: '.popup__form-save-button',
  submitButtonDisabledClass: 'popup__form-save-button_disabled',
  textInputSelector: '.popup__form-text-input',
  textInputInvalidClass: 'popup__form-text-input_invalid',
  visibleInvalidationErrorClass: 'popup__invalid_visible'
}

console.log(config.forms)

const testInput = document.querySelector('.popup__form-text-input_purpouse_profile-name')



function setEventListeners(config) {
  config.forms.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(config.textInputSelector))
    inputList.forEach((input) => {
      console.log(input)
      input.addEventListener('input', () => {
      setValidityBasedClass(input, config.invalidationErrorSelector, config.visibleInvalidationErrorClass, config.textInputInvalidClass);
      manageSubmitButton(inputList, form, config.submitButtonSelector, config.submitButtonDisabledClass)
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

function manageSubmitButton(inputList, form, submitButtonSelector, submitButtonDisabledClass ) {
  const button = form.querySelector(submitButtonSelector)
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
    return true
  }
  else {
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

setEventListeners(config);

// testInput.addEventListener('input', (e) => setValidityBasedClass(e, config.invalidationErrorSelector, config.visibleInvalidationErrorClass, config.textInputInvalidClass))
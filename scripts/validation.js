
export class FormValidator {
  constructor (config, formElement) {
    this._formElement = formElement;
    this._formsSelector = config.forms;
    this._invalidationErrorSelector = config.invalidationErrorSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonDisabledClass = config.submitButtonDisabledClass;
    this._textInputSelector = config.textInputSelector;
    this._visibleInvalidationErrorClass = config.visibleInvalidationErrorClass;
    this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(config.textInputSelector));

    
  }

  enableValidation() {
    this._setEventListeners()
  }



  prototypePublicResetMethod() {
    this._inputList.forEach((input => {
      this._input = input;
      this._hideInvalidationMessage();
    }))
    this._manageSubmitButton()
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._input = input;
        this._setValidityBasedClass();
        this._manageSubmitButton();
      })

    })
  }

  _setValidityBasedClass() {
    if (this._checkValidity()) {
      this._hideInvalidationMessage()
    }
    else {
      this._showInvalidationMessage()
    }
    
  }
  
  

  _manageSubmitButton() {
    if (this._isValid()) {
      this._buttonElement.classList.remove(this._submitButtonDisabledClass)
      this._buttonElement.disabled = false
    }
    else {
      this._buttonElement.classList.add(this._submitButtonDisabledClass)
      this._buttonElement.disabled = true
    }
  
  }

  _hideInvalidationMessage() {
    console.log(this._input)
    const invalidationError = document.querySelector(`${this._invalidationErrorSelector}${this._input.name}`)
    this._input.classList.remove(this._textInputInvalidClass)
    invalidationError.classList.remove(this._visibleInvalidationErrorClass)
    invalidationError.textContent = ''
  }

  _showInvalidationMessage() {
    const invalidationError = document.querySelector(`${this._invalidationErrorSelector}${this._input.name}`)
    console.log(invalidationError)
    this._input.classList.add(this._textInputInvalidClass)
    invalidationError.classList.add(this._visibleInvalidationErrorClass)
    invalidationError.textContent = this._input.validationMessage
  }

  _checkValidity() {
    if (this._input.validity.valid) {
      console.log('valid')
      return true
    }
    else {
      console.log('not valid')
      return false
    }
  }

  _isValid() {
    if (this._inputList.every((input) => input.validity.valid)) {
      console.log('+')
      return true
    }
    else {
      console.log('-')
      return false
      
    }
  }
}

// console.log(config.forms)



// function enableValidation(config) {
//   const formsArray = Array.from(document.querySelectorAll(config.forms))
//   setEventListeners(formsArray, config) }

// function setEventListeners(formsArray, config) {
//   formsArray.forEach((form) => {
//     const inputList = Array.from(form.querySelectorAll(config.textInputSelector))
//     const button = form.querySelector(config.submitButtonSelector)
//     inputList.forEach((input) => {
//       console.log(input)
//       input.addEventListener('input', () => {
//       setValidityBasedClass(input, config.invalidationErrorSelector, config.visibleInvalidationErrorClass, config.textInputInvalidClass);
//       manageSubmitButton(inputList, button, config.submitButtonDisabledClass)
//     })
//     })
//   })
// }


// function setValidityBasedClass(input, invalidationErrorSelector, visibleInvalidationErrorClass, textInputInvalidClass) {
//   console.log(`${invalidationErrorSelector}${input.name}`)
//   if (checkValidity(input)) {
//     hideInvalidationMessage(input, textInputInvalidClass, visibleInvalidationErrorClass, invalidationErrorSelector)
//   }
//   else {
//     showInvalidationMessage(input, textInputInvalidClass, visibleInvalidationErrorClass, invalidationErrorSelector)
//   }
// }


// function showInvalidationMessage(input, textInputInvalidClass, visibleInvalidationErrorClass, invalidationErrorSelector) {
//   const invalidationError = document.querySelector(`${invalidationErrorSelector}${input.name}`)
//   console.log(invalidationError)
//   input.classList.add(textInputInvalidClass)
//   invalidationError.classList.add(visibleInvalidationErrorClass)
//   invalidationError.textContent = input.validationMessage
// }


// function hideInvalidationMessage(input, textInputInvalidClass, visibleInvalidationErrorClass, invalidationErrorSelector) {
//   const invalidationError = document.querySelector(`${invalidationErrorSelector}${input.name}`)
//   input.classList.remove(textInputInvalidClass)
//   invalidationError.classList.remove(visibleInvalidationErrorClass)
//   invalidationError.textContent = ''
// }

// function manageSubmitButton(inputList, button, submitButtonDisabledClass ) {
//   if (isValid(inputList)) {
//     button.classList.remove(submitButtonDisabledClass)
//     button.disabled = false
//   }
//   else {
//     button.classList.add(submitButtonDisabledClass)
//     button.disabled = true
//   }

// }

// function isValid(inputList) {
//   if (inputList.every((input) => input.validity.valid)) {
//     console.log('+')
//     return true
//   }
//   else {
//     console.log('-')
//     return false
    
//   }
// }




// function checkValidity(input) {
//   if (input.validity.valid) {
//     console.log('valid')
//     return true
//   }
//   else {
//     console.log('not valid')
//     return false
//   }
// }

// enableValidation(config);

// // testInput.addEventListener('input', (e) => setValidityBasedClass(e, config.invalidationErrorSelector, config.visibleInvalidationErrorClass, config.textInputInvalidClass))
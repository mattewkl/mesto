
export class FormValidator {
  constructor (config, formElement) {
    this._formElement = formElement;
    console.log(this._formElement)
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



  resetValidationErrors() {
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
    const invalidationError = this._formElement.querySelector(`${this._invalidationErrorSelector}${this._input.name}`)
    this._input.classList.remove(this._textInputInvalidClass)
    invalidationError.classList.remove(this._visibleInvalidationErrorClass)
    invalidationError.textContent = ''
  }

  _showInvalidationMessage() {
    const invalidationError = this._formElement.querySelector(`${this._invalidationErrorSelector}${this._input.name}`)
    this._input.classList.add(this._textInputInvalidClass)
    invalidationError.classList.add(this._visibleInvalidationErrorClass)
    invalidationError.textContent = this._input.validationMessage
  }

  _checkValidity() {
    if (this._input.validity.valid) {
      return true
    }
    else {
      return false
    }
  }

  _isValid() {
    if (this._inputList.every((input) => input.validity.valid)) {
      return true
    }
    else {
      return false
      
    }
  }
}

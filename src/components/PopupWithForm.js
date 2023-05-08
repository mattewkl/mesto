import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmitMethod) {
    super(popupSelector);
    this._handleFormSubmitMethod = handleFormSubmitMethod;
    this._form = this._popup.querySelector('.popup__form')
    this._inputs = this._form.querySelectorAll('.popup__form-text-input')

  } 

  _getInputValues() {
    this._inputValues = {}
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value
    })
    return this._inputValues
  }

  setInputValues(object) {
    this._inputs.forEach((input) => {
      input.value = object[input.name]
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit',(evt) => { 
      evt.preventDefault()
      this._handleFormSubmitMethod(this._getInputValues())})
    
  }

  close() {
    super.close();
    this._form.reset();
    
  }
}
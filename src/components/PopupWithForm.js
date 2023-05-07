import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmitMethod) {
    super(popupSelector);
    this._handleFormSubmitMethod = handleFormSubmitMethod;
    this._form = this._popup.querySelector('.popup__form')
    this._inputs = this._form.querySelectorAll('.popup__form-text-input')
    this._firstInput = this._inputs[0];
    this._secondInput = this._inputs[1];
  } 

  getInputValues() {
    this._inputValues = {
      firstValue: this._firstInput.value,
      secondValue: this._secondInput.value,
    }
    console.log(this._inputValues)
    return this._inputValues;
  
  }

  setInputValues({firstValue, secondValue}) {
    this._firstInput.value = firstValue.trim();
    this._secondInput.value = secondValue.trim();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmitMethod)
    
  }

  close() {
    super.close();
    this._form.reset();
    
  }
}
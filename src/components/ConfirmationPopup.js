import { Popup } from "./Popup.js";

export class ConfirmationPopup extends Popup {
  constructor(popupSelector, submitMethod) {
    super(popupSelector);
    this._submitMethod = submitMethod;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitMethod(this._id);
    })
  }

  open = (element, id) => {
    super.open();
    this._element = element;
    this._id = id;
  }

  close() {
    super.close();
    this._element = null;
  }

  getElement = () => {
    return this._element;
  }
}
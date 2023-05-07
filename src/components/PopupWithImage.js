import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.popup__figure-popup-image')
    this._imageCaption = this._popup.querySelector('.popup__figure-popup-caption').textContent
  }

  open = (obj) => {
    this._popupImage.src = obj.link;
    this._imageCaption = obj.name;
    this._popupImage.alt = obj.name;
    super.open()

  }
}
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button')
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }
  
  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _closePopupByOverlayClick = (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close()
      }
  }

  _handleCloseByClick = () => {
    this.close()
  }

  setEventListeners () {
    this._closeButton.addEventListener('click', this._handleCloseByClick)
    this._popup.addEventListener('mousedown', this._closePopupByOverlayClick)

  }
}
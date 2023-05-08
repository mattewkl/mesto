export class Card {
  constructor({firstValue, secondValue}, templateSelector, openFigurePopup) {
    this._templateSelector = templateSelector;
    this._name = firstValue;
    this._link = secondValue;
    this._data = {name: this._name, link: this._link};
    this._openFigurePopup = openFigurePopup;
  }

  _getTemplate() {
    const cardDOMClone = document.querySelector(this._templateSelector).content.querySelector('.grid-cards__item').cloneNode(true);
    return cardDOMClone
  }

  _createDOMCardMarkup() {
    this._element = this._getTemplate()
    this._cardDOMCloneImage = this._element.querySelector('.grid-cards__item-image');
    this._cardDOMCloneImage.src = this._link;
    this._cardDOMCloneImage.alt = this._name;
    this._element.querySelector('.grid-cards__caption').textContent = this._name;
    this._deleteCardButton = this._element.querySelector('.grid-cards__delete-btn')
    this._likeButton = this._element.querySelector('.grid-cards__like-button')
    this._setEventListeners();
    return this._element;
  }

  _deleteClosestOnClick = () => {
    this._element.remove()
  }

  _toggleLike() {
    this._likeButton.classList.toggle('grid-cards__like-button_active')
  }

  _setEventListeners() {
    console.log(this._data)
    this._cardDOMCloneImage.addEventListener('click', () => {this._openFigurePopup(this._data)});
    this._deleteCardButton.addEventListener('click', this._deleteClosestOnClick)
    this._likeButton.addEventListener('click',() => {this._toggleLike()})
  }

  createCardDOMElement() {
    return this._createDOMCardMarkup();
  }

}


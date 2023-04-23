export class Card {
  constructor(data, templateSelector, openFigurePopup) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
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

  _deleteClosestOnClick(event, selector) {
    event.target.closest(selector).remove()
  }

  _toggleLike() {
    this._likeButton.classList.toggle('grid-cards__like-button_active')
  }

  _setEventListeners() {
    this._cardDOMCloneImage.addEventListener('click', () => {this._openFigurePopup(this._name, this._link)});
    this._deleteCardButton.addEventListener('click', (event) => {this._deleteClosestOnClick(event,'.grid-cards__item')})
    this._likeButton.addEventListener('click',() => {this._toggleLike()})
  }

  createCardDOMElement() {
    return this._createDOMCardMarkup();
  }

}


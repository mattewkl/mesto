import { figurePopup, figurePopupCaption, figurePopupImage, gridCards } from "./index.js";
export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardDOMClone = document.querySelector(this._templateSelector).content.querySelector('.grid-cards__item').cloneNode(true);
    return cardDOMClone
  }

  _prototypeMarkupMetod() {
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

  _openFigurePopup() {
    figurePopup.classList.add('popup_opened')
    figurePopupImage.alt = this._name;
    figurePopupImage.src = this._link;
    figurePopupCaption.textContent = this._name;
  }

  _deleteClosestOnClick(event, selector) {
    event.target.closest(selector).remove()
  }

  _toggleLike() {
    this._likeButton.classList.toggle('grid-cards__like-button_active')
  }

  _setEventListeners() {
    this._cardDOMCloneImage.addEventListener('click', () => {this._openFigurePopup()});
    this._deleteCardButton.addEventListener('click', (event) => {this._deleteClosestOnClick(event,'.grid-cards__item')})
    this._likeButton.addEventListener('click',() => {this._toggleLike()})
  }

  createCardDOMElement() {
    return this._prototypeMarkupMetod();
  }

}


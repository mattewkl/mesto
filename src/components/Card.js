export class Card {
  constructor({firstValue, secondValue, ownerId, watcherId, likes, cardId}, templateSelector, openFigurePopup, openConfirmationPopup, handleLike) {
    this._templateSelector = templateSelector;
    this._likes = likes;
    this._likesCount = this._likes.length
    this._cardId = cardId;
    this._name = firstValue;
    this._link = secondValue;
    this._ownerId = ownerId;
    this._wathcerId = watcherId;
    this._handleLike = handleLike;
    this._data = {name: this._name, link: this._link};
    this._openFigurePopup = openFigurePopup;
    this._openConfirmationPopup = openConfirmationPopup;
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
    this._counter = this._element.querySelector('.grid-cards__like-counter')
    this._enableLikeColor();
    this.updateCounter(this._likesCount);
    this._setEventListeners();
    this._enableCorrectVisibilityForDeleteBtn();
    return this._element;
  }

  _enableLikeColor() {
    this._likes.forEach(element => {
      if (element._id === this._wathcerId) {
        this._likeButton.classList.add('grid-cards__like-button_active')
      }    
    });
  }

  updateCounter(count) {
    this._counter.textContent = count;
  }

  deleteSelf() {
    this._element.remove()
  }

  _handleDeleteButtonClick = () => {
    this._openConfirmationPopup(this, this._cardId)
  }

  _toggleLike() {
    this._handleLike(this._cardId, this._likeButton)
    this._likeButton.classList.toggle('grid-cards__like-button_active')
  }

  _setEventListeners() {
    this._cardDOMCloneImage.addEventListener('click', () => {this._openFigurePopup(this._data)});
    this._deleteCardButton.addEventListener('click', () => {this._handleDeleteButtonClick();})
    this._likeButton.addEventListener('click',() => {
      this._toggleLike()
    })
  }

  createCardDOMElement() {
    return this._createDOMCardMarkup();
  }

  _enableCorrectVisibilityForDeleteBtn() {
    if (this._ownerId === this._wathcerId) {
      this._deleteCardButton.style.visibility = 'visible';
    }
    else {
      this._deleteCardButton.style.visibility = 'hidden'
    }
  }


}


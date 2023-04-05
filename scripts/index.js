// editpopup vars
const nameObj = document.querySelector('.profile__name');
const descriptonObj = document.querySelector('.profile__description');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button')
const popupOpenEditProfile = document.querySelector('.popup_purpouse_edit-profile')
const buttonCloseEditPopup = popupOpenEditProfile.querySelector('.popup__close-button')
const formNameObj = document.querySelector('.popup__form-text-input_purpouse_profile-name')
const formDescriptionObj = document.querySelector('.popup__form-text-input_purpouse_profile-description')
const formEditObj = document.querySelector('.popup__form_purpouse_edit-profile')
const submitButtonFromProfileForm = formEditObj.querySelector('.popup__form-save-button')
const arrOfFormEditTextInput = [formNameObj, formDescriptionObj]

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameObj.textContent = formNameObj.value;
  descriptonObj.textContent = formDescriptionObj.value;
  closePopup(popupOpenEditProfile);
}

function openEditPopup() {
  openPopupOverlay(popupOpenEditProfile);
  const nameText = nameObj.textContent;
  const descriptonText = descriptonObj.textContent;
  formNameObj.value = nameText.trim();
  formDescriptionObj.value = descriptonText.trim();
  manageSubmitButton(arrOfFormEditTextInput, submitButtonFromProfileForm, config.submitButtonDisabledClass)
  console.log(formNameObj.name)
  console.log(formDescriptionObj.name)
  arrOfFormEditTextInput.forEach((input) =>  setValidityBasedClass(input, config.invalidationErrorSelector, config.visibleInvalidationErrorClass, config.textInputInvalidClass))
}


// figurePopup vars
const figurePopup = document.querySelector('.popup_purpouse_figure')
const closeFigurePopupButton = figurePopup.querySelector('.popup__close-button')
const figurePopupImage = figurePopup.querySelector('.popup__figure-popup-image')
const figurePopupCaption = figurePopup.querySelector('.popup__figure-popup-caption')

function openFigurePopup(name, link) {
  openPopupOverlay(figurePopup);
  figurePopupImage.src = link
  figurePopupImage.alt = name
  figurePopupCaption.textContent = name
}      


//closebyEcs vars
const formsArray = Array.from(document.querySelectorAll('.popup'))
console.log(Array.isArray(figurePopup.classList),)


function closePopupByOverlayClick (e) {
  if (e.target === e.currentTarget) {
    closePopup(e.target)
  }
};


function closePopupByEsc(evt) {
  
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}


function openPopupOverlay(popupObj)  {
  window.addEventListener('keydown',closePopupByEsc)
  popupObj.classList.add('popup_opened');
  
}    

function closePopup(popupObj) {
  popupObj.classList.remove('popup_opened')
  window.removeEventListener('keydown',closePopupByEsc)  
}





// addcard vars
const formPlaceNameObj = document.querySelector('.popup__form-text-input_purpouse_place-name')
const formPlaceLinkObj = document.querySelector('.popup__form-text-input_purpouse_place-link')
const arrOfAddCardTextInput = [formPlaceNameObj, formPlaceLinkObj]
const popupAddCard = document.querySelector('.popup_purpouse_add-card')
const closeAddPopupButton = popupAddCard.querySelector('.popup__close-button')
const formAddCard = document.querySelector('.popup__form_purpouse_add-card')
const cardTemplate = document.querySelector('#card-template').content;
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button')
const gridCards = document.querySelector('.grid-cards')
const submitButtonFromAddCard = formAddCard.querySelector('.popup__form-save-button')


function toggleLike (object) {
  object.classList.toggle('grid-cards__like-button_active')
}    


function deleteClosestOnClick (event, elementSelector) {
  event.target.closest(elementSelector).remove()
}    

function createCard(object) {
  const firstCard = cardTemplate.querySelector('.grid-cards__item').cloneNode(true);
  const cardImage = firstCard.querySelector('.grid-cards__item-image');
  cardImage.src = object.link;
  cardImage.alt = object.name;
  firstCard.querySelector('.grid-cards__caption').textContent = object.name;
  const deleteCardButton = firstCard.querySelector('.grid-cards__delete-btn')
  const likeButton = firstCard.querySelector('.grid-cards__like-button')
  cardImage.addEventListener('click',() => openFigurePopup(object.name, object.link)); 
  likeButton.addEventListener('click',() => toggleLike(likeButton));
  deleteCardButton.addEventListener('click', event => deleteClosestOnClick(event, '.grid-cards__item') )

  return firstCard
}    

initialCards.forEach(element => prependElementInContainer(gridCards, createCard(element)));


function prependElementInContainer(container, element) {
  container.prepend(element)
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const dataObject = {
    name : formPlaceNameObj.value,
    link : formPlaceLinkObj.value
  }
  prependElementInContainer(gridCards, (createCard(dataObject)));
  closePopup(popupAddCard);
}      

function openAddPopup() {
  arrOfAddCardTextInput.forEach((input) => hideInvalidationMessage(input, config.textInputInvalidClass, config.visibleInvalidationErrorClass, config.invalidationErrorSelector))
  formPlaceLinkObj.value = '';
  formPlaceNameObj.value = '';
  manageSubmitButton(arrOfAddCardTextInput, submitButtonFromAddCard, config.submitButtonDisabledClass)
  openPopupOverlay(popupAddCard);
}    

// closeEventListeners


buttonOpenEditProfile.addEventListener('click', openEditPopup)
buttonOpenAddCardPopup.addEventListener('click', openAddPopup)
buttonCloseEditPopup.addEventListener('click', () => closePopup(popupOpenEditProfile))
closeAddPopupButton.addEventListener('click', () => closePopup(popupAddCard))
closeFigurePopupButton.addEventListener('click', () => closePopup(figurePopup))
popupOpenEditProfile.addEventListener('click', (e) => closePopupByOverlayClick(e) )
popupAddCard.addEventListener('click', (e) => closePopupByOverlayClick(e))
figurePopup.addEventListener('click', (e) => closePopupByOverlayClick(e))
formEditObj.addEventListener('submit', handleEditFormSubmit)
formAddCard.addEventListener('submit', handleAddCardFormSubmit)


// поправь клик на маусдаун а не на масуап при закрытии попапа при клике на оверлей
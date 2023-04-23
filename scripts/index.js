import { initialCards } from "./dataObjects.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig as config } from "./dataObjects.js"




// editpopup vars
const nameObj = document.querySelector('.profile__name');
const descriptonObj = document.querySelector('.profile__description');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button')
const popupOpenEditProfile = document.querySelector('.popup_purpouse_edit-profile')
const buttonCloseEditPopup = popupOpenEditProfile.querySelector('.popup__close-button')
const formNameObj = document.querySelector('.popup__form-text-input_purpouse_profile-name')
const formDescriptionObj = document.querySelector('.popup__form-text-input_purpouse_profile-description')
const formEditObj = document.querySelector('.popup__form_purpouse_edit-profile')
const editPopupValidationObject = new FormValidator(config, formEditObj);
editPopupValidationObject.enableValidation();



function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameObj.textContent = formNameObj.value;
  descriptonObj.textContent = formDescriptionObj.value;
  closePopup(popupOpenEditProfile);
}

function openEditPopup() {
  openPopup(popupOpenEditProfile);
  const nameText = nameObj.textContent;
  const descriptonText = descriptonObj.textContent;
  formNameObj.value = nameText.trim();
  formDescriptionObj.value = descriptonText.trim();
  editPopupValidationObject.prototypePublicResetMethod();
}


// figurePopup vars
export const figurePopup = document.querySelector('.popup_purpouse_figure')
const closeFigurePopupButton = figurePopup.querySelector('.popup__close-button')
export const figurePopupImage = figurePopup.querySelector('.popup__figure-popup-image')
export const figurePopupCaption = figurePopup.querySelector('.popup__figure-popup-caption')

function openFigurePopup(name, link) {
  figurePopupImage.src = link;
  figurePopupImage.alt = name;
  figurePopupCaption.textContent = name
  openPopup(figurePopup);
}      


function createCard(item) {
  const card = new Card(item, '#card-template', openFigurePopup)
  return card.createCardDOMElement();
}

//closebyEcs vars


function closePopupByOverlayClick (e) {
  if (e.target === e.currentTarget) {
    closePopup(e.target)
  }
};


function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}


function openPopup(popupObj)  {
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
const formAddCard = document.querySelector('.popup__form_purpouse_add-card')
const popupAddCard = document.querySelector('.popup_purpouse_add-card')
const closeAddPopupButton = popupAddCard.querySelector('.popup__close-button')
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button')
export const gridCards = document.querySelector('.grid-cards')

const addPopupValidationObject = new FormValidator(config, formAddCard)
addPopupValidationObject.enableValidation();

initialCards.forEach(element => {
  prependElementInContainer(gridCards, createCard(element))});



function prependElementInContainer(container, element) {
  container.prepend(element)
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const dataObject = {
    name : formPlaceNameObj.value,
    link : formPlaceLinkObj.value
  }
  prependElementInContainer(gridCards, createCard(dataObject));
  closePopup(popupAddCard);
}      

function openAddPopup() {
  formPlaceLinkObj.value = '';
  formPlaceNameObj.value = '';
  addPopupValidationObject.resetValidationErrors();
  openPopup(popupAddCard);
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
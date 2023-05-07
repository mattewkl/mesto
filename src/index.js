import './pages/index.css'

import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { validationConfig as config } from "./scripts/dataobjects.js"
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { initialCards, userDescriptionSelector, usernameSelector, popupEditProfileSelector } from "./scripts/dataobjects.js";


const userInfoObject = new UserInfo(usernameSelector, userDescriptionSelector)

const addPopup = new PopupWithForm('.popup_purpouse_add-card', (event) => {
  event.preventDefault();
  const dataObject = addPopup.getInputValues(); 
  gridSection.addItem(createCard({firstValue: dataObject.firstValue, secondValue: dataObject.secondValue}));
  addPopup.close(); 
})

addPopup.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (event) => {
  event.preventDefault()
  const dataObject = popupEditProfile.getInputValues();
  userInfoObject.setUserInfo({name: dataObject.firstValue, description: dataObject.secondValue})
  popupEditProfile.close();

})
popupEditProfile.setEventListeners();
const imagePopup = new PopupWithImage('.popup_purpouse_figure');
imagePopup.setEventListeners()

const gridSection = new Section({items: initialCards, renderer: (element) => {
  const card = new Card({firstValue: element.name, secondValue: element.link}, '#card-template', imagePopup.open)
  return card.createCardDOMElement();

}}, '.grid-cards')
gridSection.renderInitialItems();

// editpopup vars
const buttonOpenEditProfile = document.querySelector('.profile__edit-button')
const formEditObj = document.querySelector('.popup__form_purpouse_edit-profile')
const editPopupValidationObject = new FormValidator(config, formEditObj);
editPopupValidationObject.enableValidation();


function openEditPopup() {
  popupEditProfile.open();
  const dataObject = userInfoObject.getUserInfo();
  console.log(dataObject)
  popupEditProfile.setInputValues({firstValue: dataObject.name, secondValue: dataObject.description})
  editPopupValidationObject.resetValidationErrors();
}


// figurePopup vars
export const figurePopup = document.querySelector('.popup_purpouse_figure')
export const figurePopupImage = figurePopup.querySelector('.popup__figure-popup-image')
export const figurePopupCaption = figurePopup.querySelector('.popup__figure-popup-caption')


function createCard({firstValue, secondValue}) {
  const card = new Card({firstValue: firstValue, secondValue: secondValue}, '#card-template', imagePopup.open)
  return card.createCardDOMElement();
}

// addcard vars
const formAddCard = document.querySelector('.popup__form_purpouse_add-card')
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button')
export const gridCards = document.querySelector('.grid-cards')

const addPopupValidationObject = new FormValidator(config, formAddCard)
addPopupValidationObject.enableValidation();




function openAddPopup() {
  addPopupValidationObject.resetValidationErrors();
  addPopup.open();
}    

// closeEventListeners


buttonOpenEditProfile.addEventListener('click', openEditPopup)
buttonOpenAddCardPopup.addEventListener('click', openAddPopup)



// поправь клик на маусдаун а не на масуап при закрытии попапа при клике на оверлей
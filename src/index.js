import './pages/index.css'

import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { validationConfig as config } from "./scripts/dataobjects.js"
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { ConfirmationPopup } from './components/ConfirmationPopup.js';
import { 
  initialCards,
  userDescriptionSelector,
  usernameSelector,
  popupEditProfileSelector,
  buttonOpenEditProfile,
  formEditObj,
  formAddCard,
  buttonOpenAddCardPopup,
  popupUpdateAvatarSelector,
  profileAvatar,
  popupUpdateAvatarForm,
  deleteConfirmationPopupSelector
  }
   from "./scripts/dataobjects.js";


const deleteConfirmationPopup = new ConfirmationPopup(deleteConfirmationPopupSelector, () => {
  deleteConfirmationPopup.getElement().remove();
})
deleteConfirmationPopup.setEventListeners();
const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, (object) => {
  userInfoObject.updateAvatar(object.link);
  popupUpdateAvatar.close();
})
popupUpdateAvatar.setEventListeners();
// popupUpdateAvatar.setEventListeners();

const userInfoObject = new UserInfo(usernameSelector, userDescriptionSelector, '.profile__avatar')

const addPopup = new PopupWithForm('.popup_purpouse_add-card', (object) => {
  gridSection.addItem(createCard({firstValue: object['place-name'], secondValue: object.link}))
  addPopup.close()
}) 

addPopup.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (object) => {
  userInfoObject.setUserInfo({name: object.name, description: object.description})
  popupEditProfile.close();

})
popupEditProfile.setEventListeners();
const imagePopup = new PopupWithImage('.popup_purpouse_figure');
imagePopup.setEventListeners()

const gridSection = new Section({items: initialCards, renderer: (element) => {
  return createCard({firstValue: element.name, secondValue: element.link})
}}, '.grid-cards')
gridSection.renderInitialItems();

// editpopup vars

const editPopupValidationObject = new FormValidator(config, formEditObj);
editPopupValidationObject.enableValidation();


function openEditPopup() {
  popupEditProfile.open();
  const dataObject = userInfoObject.getUserInfo();
  popupEditProfile.setInputValues(dataObject)
  editPopupValidationObject.resetValidationErrors();
}




function createCard({firstValue, secondValue}) {
  const card = new Card({firstValue: firstValue, secondValue: secondValue}, '#card-template', imagePopup.open, deleteConfirmationPopup.open)
  return card.createCardDOMElement();
}

// addcard vars


const addPopupValidationObject = new FormValidator(config, formAddCard)
addPopupValidationObject.enableValidation();

const popupUpdateAvatarValidationObject = new FormValidator(config, popupUpdateAvatarForm)
popupUpdateAvatarValidationObject.enableValidation();

function openAvatarPopup() {
  popupUpdateAvatar.open();
  popupUpdateAvatarValidationObject.resetValidationErrors();
}

function openAddPopup() {
  addPopupValidationObject.resetValidationErrors();
  addPopup.open();
}    


// closeEventListeners


buttonOpenEditProfile.addEventListener('click', openEditPopup)
buttonOpenAddCardPopup.addEventListener('click', openAddPopup)
profileAvatar.addEventListener('click', openAvatarPopup)



// поправь клик на маусдаун а не на масуап при закрытии попапа при клике на оверлей
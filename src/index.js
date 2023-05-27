import './pages/index.css'

import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { validationConfig as config } from "./scripts/dataobjects.js"
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { ConfirmationPopup } from './components/ConfirmationPopup.js';
import { Api } from './components/Api.js';
import { 
  userDescriptionSelector,
  usernameSelector,
  popupEditProfileSelector,
  buttonOpenEditProfile,
  formEditObj,
  formAddCard,
  buttonOpenAddCardPopup,
  popupUpdateAvatarSelector,
  popupUpdateAvatarForm,
  deleteConfirmationPopupSelector,
  editAvatarForm,
  profileAvatarBtn
  }
   from "./scripts/dataobjects.js";


const deleteConfirmationPopup = new ConfirmationPopup(deleteConfirmationPopupSelector, (id) => {
  api.deleteCard(id)
  .then(deleteConfirmationPopup.getElement().deleteSelf())
  .catch((err) => console.error(err))
  .finally()
  
})
deleteConfirmationPopup.setEventListeners();
const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, (object) => {
  console.log(object.link)
  api.setUserAvatar({link: object.link})
  .then((res) => {
    userInfoObject.updateAvatar(res.avatar)
    popupUpdateAvatar.close()
  })
  .catch((err) => concole.error(err))
  .finally(popupUpdateAvatar.setOriginalBtnText)
  
  popupUpdateAvatar.close();
})
popupUpdateAvatar.setEventListeners();

const userInfoObject = new UserInfo(usernameSelector, userDescriptionSelector, '.profile__avatar')

const addPopup = new PopupWithForm('.popup_purpouse_add-card', (object) => {
  api.addCardData({name: object['place-name'], link: object.link})
  .then((res) => {
    gridSection.addItem(createCard({firstValue: res.name, secondValue: res.link, ownerId: res.owner._id, watcherId: userInfoObject.getUserId(), likes: res.likes, cardId: res._id}))
    addPopup.close()
})
  .catch((err) => console.error(err))
  .finally(addPopup.setOriginalBtnText)
}) 

addPopup.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (object) => {
  api.setUserInfo({name:object.name, about: object.description})
  .then((res) => {
    userInfoObject.setUserInfo({name:res.name, description: res.about})
    popupEditProfile.close();
  })
  .catch(err => console.error(err))
  .finally(popupEditProfile.setOriginalBtnText)

})
popupEditProfile.setEventListeners();
const imagePopup = new PopupWithImage('.popup_purpouse_figure');
imagePopup.setEventListeners()


//изменить класс чтобы массив отрисовывался от внешнего элемента, а то вызывать создание экземпляра в асинхроне эт такое себе DONE
const gridSection = new Section((element) => {
  return createCard({firstValue: element.name, secondValue: element.link, ownerId: element.owner._id, watcherId: element._watcherId, likes: element.likes, cardId: element._id})
}, '.grid-cards')

// editpopup vars

const editPopupValidationObject = new FormValidator(config, formEditObj);
editPopupValidationObject.enableValidation();


function openEditPopup() {
  popupEditProfile.open();
  const dataObject = userInfoObject.getUserInfo();
  popupEditProfile.setInputValues(dataObject)
  editPopupValidationObject.resetValidationErrors();
}




function createCard({firstValue, secondValue, ownerId, watcherId, likes, cardId}) {
  const card = new Card({firstValue: firstValue, secondValue: secondValue, ownerId: ownerId, watcherId: watcherId, likes:likes, cardId: cardId}, '#card-template', imagePopup.open, deleteConfirmationPopup.open, (cardId, likebtn) => {
    if (likebtn.classList.contains('grid-cards__like-button_active')) {
      api.deleteLike(cardId)
      .then((res) => {card.updateCounter(res.likes.length)})
      .catch((err) => console.error(err))
      .finally()
    }
    else {
      api.putLike(cardId)
      .then((res) => {
        card.updateCounter(res.likes.length)})
      .catch((err) => console.error(err))
      .finally()
    }
  })
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

const editAvatarValidationObject = new FormValidator(config, editAvatarForm)
editAvatarValidationObject.enableValidation();


// closeEventListeners



buttonOpenEditProfile.addEventListener('click', openEditPopup)
buttonOpenAddCardPopup.addEventListener('click', openAddPopup)
profileAvatarBtn.addEventListener('click', openAvatarPopup)


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '288cde96-6ae7-492c-9b6e-fac63786831a',
    'Content-Type': 'application/json'
  }})



Promise.all([api.getUserData(), api.getCardsData()])
.then(([userData, cardsData]) => {
  console.log(cardsData)
  userInfoObject.setUserInfo({name: userData.name, description: userData.about})
  userInfoObject.updateAvatar(userData.avatar)
  userInfoObject.setUserId(userData._id)
  cardsData.forEach((element) => (element._watcherId = userInfoObject.getUserId()))
  gridSection.renderItems(cardsData)
  console.log(userInfoObject.getUserId())
})


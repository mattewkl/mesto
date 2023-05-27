export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },  
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },  
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },  
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },  
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },  
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }  
];   

export const validationConfig = {
  forms: '.popup__form',
  invalidationErrorSelector: '.popup__invalid_from_', 
  submitButtonSelector: '.popup__form-save-button',
  submitButtonDisabledClass: 'popup__form-save-button_disabled',
  textInputSelector: '.popup__form-text-input',
  textInputInvalidClass: 'popup__form-text-input_invalid',
  visibleInvalidationErrorClass: 'popup__invalid_visible'
}

const usernameSelector = '.profile__name'
const userDescriptionSelector = '.profile__description'
const popupEditProfileSelector = '.popup_purpouse_edit-profile'
const buttonOpenEditProfile = document.querySelector('.profile__edit-button')
const formEditObj = document.querySelector('.popup__form_purpouse_edit-profile')
const formAddCard = document.querySelector('.popup__form_purpouse_add-card')
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button')
const popupUpdateAvatarSelector = '.popup_purpouse_edit-avatar'
const popupUpdateAvatarForm = document.querySelector('.popup__form_purpouse_edit-avatar')
const profileAvatarBtn = document.querySelector('.profile__avatar-btn')
const deleteConfirmationPopupSelector = '.popup_purpouse_delete-card'
const editAvatarForm = document.querySelector('.popup__form_purpouse_edit-avatar')
export {
  userDescriptionSelector,
  popupEditProfileSelector,
  usernameSelector,
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
let nameObj = document.querySelector('.profile__name');
let descriptonObj = document.querySelector('.profile__description');
let editButtonObj = document.querySelector('.profile__edit-button')
let popupObj = document.querySelector('.popup')


const closeEditPopupButton = document.querySelector('.popup__close-button_purpouse_close-edit-profile')
const closeAddPopupButton = document.querySelector('.popup__close-button_purpouse_close-add-card')


let formNameObj = document.querySelector('.form__text-input_purpouse_profile-name')
let formDescriptionObj = document.querySelector('.form__text-input_purpouse_profile-description')

let formPlaceNameObj = document.querySelector('.form__text-input_purpouse_place-name')
let formPlaceLinkObj = document.querySelector('.form__text-input_purpouse_place-link')


let editFormObj = document.querySelector('.form_purpouse_edit-profile')
let addCardFormObj = document.querySelector('.form_purpouse_add-card')
let cardTemplate = document.querySelector('#card-template').content;
const addButton = document.querySelector('.profile__add-button')
const gridCards = document.querySelector('.grid-cards')
const editPopup = document.querySelector('.popup__container_purpouse_edit-profile')
const addCardPopup = document.querySelector('.popup__container_purpouse_add-card')
const initialCards = [
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



function addCard(link, name) {
  const firstCard = cardTemplate.querySelector('.grid-cards__item').cloneNode(true);
  firstCard.querySelector('.grid-cards__item-image').src = link;
  firstCard.querySelector('.grid-cards__item-image').alt = name;
  firstCard.querySelector('.grid-cards__caption').textContent = name;
  gridCards.prepend(firstCard);
  const deleteCardButton = firstCard.querySelector('.grid-cards__delete-btn')
  deleteCardButton.addEventListener('click', function(event) {
    event.target.parentNode.remove()
  })
  


}


initialCards.forEach(element => addCard(element.link, element.name));


function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(formPlaceLinkObj.value, formPlaceNameObj.value)
  closePopup();
}

function openPopupOverlay()  {
  popupObj.classList.add('popup_opened');
}

function openAddPopup() {
  openPopupOverlay();
  addCardPopup.classList.add('popup__container_opened');
  
}


function openEditPopup() {
  openPopupOverlay();
  editPopup.classList.add('popup__container_opened')
  let nameText = nameObj.textContent;
  let descriptonText = descriptonObj.textContent;
  formNameObj.value = nameText.trim();
  formDescriptionObj.value = descriptonText.trim();

}



function closePopup() {
  popupObj.classList.remove('popup_opened');
  editPopup.classList.remove('popup__container_opened');
  addCardPopup.classList.remove('popup__container_opened');
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameObj.textContent = formNameObj.value;
  descriptonObj.textContent = formDescriptionObj.value;
  closePopup();
}

editButtonObj.addEventListener('click', openEditPopup)
addButton.addEventListener('click', openAddPopup)
closeEditPopupButton.addEventListener('click', closePopup)
closeAddPopupButton.addEventListener('click', closePopup)
editFormObj.addEventListener('submit', handleEditFormSubmit)
addCardFormObj.addEventListener('submit', handleAddCardFormSubmit)
// deleteCardButton.addEventListener('click', function(event) {
//   event.target.parentNode.remove()
// })

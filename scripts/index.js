

// editpopup vars
let nameObj = document.querySelector('.profile__name');
let descriptonObj = document.querySelector('.profile__description');
let editButtonObj = document.querySelector('.profile__edit-button')
const editPopupObj = document.querySelector('.popup_purpouse_edit-profile')
const closeEditPopupButton = editPopupObj.querySelector('.popup__close-button')
const formNameObj = document.querySelector('.form__text-input_purpouse_profile-name')
const formDescriptionObj = document.querySelector('.form__text-input_purpouse_profile-description')
const editFormObj = document.querySelector('.form_purpouse_edit-profile')

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameObj.textContent = formNameObj.value;
  descriptonObj.textContent = formDescriptionObj.value;
  closePopup(editPopupObj);
}

function openEditPopup() {
  openPopupOverlay(editPopupObj);
  let nameText = nameObj.textContent;
  let descriptonText = descriptonObj.textContent;
  console.log(nameText, descriptonText)
  formNameObj.value = nameText.trim();
  formDescriptionObj.value = descriptonText.trim();
}


// addcard vars
let formPlaceNameObj = document.querySelector('.form__text-input_purpouse_place-name')
let formPlaceLinkObj = document.querySelector('.form__text-input_purpouse_place-link')
const addCardPopup = document.querySelector('.popup_purpouse_add-card')
const closeAddPopupButton = addCardPopup.querySelector('.popup__close-button')
const addCardFormObj = document.querySelector('.form_purpouse_add-card')
let cardTemplate = document.querySelector('#card-template').content;
const addButton = document.querySelector('.profile__add-button')
const gridCards = document.querySelector('.grid-cards')
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

function toggleLike (object) {
  object.classList.toggle('grid-cards__like-button_active')
}    


function deleteParentOnClick (event) {
  event.target.parentNode.remove()
}    

function addCard(link, name) {
  const firstCard = cardTemplate.querySelector('.grid-cards__item').cloneNode(true);
  const cardImage = firstCard.querySelector('.grid-cards__item-image')
  cardImage.src = link;
  cardImage.alt = name;
  firstCard.querySelector('.grid-cards__caption').textContent = name;
  gridCards.prepend(firstCard);
  const deleteCardButton = firstCard.querySelector('.grid-cards__delete-btn')
  const likeButton = firstCard.querySelector('.grid-cards__like-button')
  cardImage.addEventListener('click',() => openFigurePopup(firstCard)); 
  likeButton.addEventListener('click',() => toggleLike(likeButton));
  deleteCardButton.addEventListener('click', event => deleteParentOnClick(event) )
}    

initialCards.forEach(element => addCard(element.link, element.name));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(formPlaceLinkObj.value, formPlaceNameObj.value)
  closePopup(addCardPopup);
}      

function openAddPopup() {
  openPopupOverlay(addCardPopup);
}    


// figurePopup vars
const figurePopup = document.querySelector('.popup_purpouse_figure')
const closeFigurePopupButton = figurePopup.querySelector('.popup__close-button')

function openFigurePopup(card) {
  openPopupOverlay(figurePopup);
  const cardImage = card.querySelector('.grid-cards__item-image')
  figurePopup.classList.add('figure-popup_opened')
  figurePopup.querySelector('.popup__figure-popup-image').src = cardImage.src
  figurePopup.querySelector('.popup__figure-popup-image').alt = cardImage.alt
  figurePopup.querySelector('.popup__figure-popup-caption').textContent = cardImage.alt
}      

function openPopupOverlay(popupObj)  {
  popupObj.classList.add('popup_opened');
}    

function closePopup(popupObj) {
  popupObj.classList.remove('popup_opened')  
}


editButtonObj.addEventListener('click', openEditPopup)
addButton.addEventListener('click', openAddPopup)
closeEditPopupButton.addEventListener('click', () => closePopup(editPopupObj))
closeAddPopupButton.addEventListener('click', () => closePopup(addCardPopup))
closeFigurePopupButton.addEventListener('click', () => closePopup(figurePopup))
editFormObj.addEventListener('submit', handleEditFormSubmit)
addCardFormObj.addEventListener('submit', handleAddCardFormSubmit)

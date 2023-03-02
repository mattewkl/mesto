let nameObj = document.querySelector('.profile__name');
let descriptonObj = document.querySelector('.profile__description');
let editButtonObj = document.querySelector('.profile__edit-button')
let popupObj = document.querySelector('.popup')
let closeButtonObj = document.querySelector('.popup__close-button')
let formNameObj = document.querySelector('#name')
let formDescriptionObj = document.querySelector('#description')
let editFormObj = document.querySelector('.form')

function openPopup()  {
  popupObj.classList.add('popup_opened');
  let nameText = nameObj.textContent;
  let descriptonText = descriptonObj.textContent;
  formNameObj.value = nameText.trim();
  formDescriptionObj.value = descriptonText.trim();
}

function closePopup() {
  popupObj.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  
  evt.preventDefault();
  nameObj.textContent = formNameObj.value;
  descriptonObj.textContent = formDescriptionObj.value;
  closePopup();
}

editButtonObj.addEventListener('click', openPopup)
closeButtonObj.addEventListener('click', closePopup)
editFormObj.addEventListener('submit', handleFormSubmit)

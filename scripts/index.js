let nameObj = document.querySelector('.profile__name');
let descriptonObj = document.querySelector('.profile__description');
let editButtonObj = document.querySelector('.profile__edit-button')
let popupObj = document.querySelector('.popup')
let closeButtonObj = document.querySelector('.popup__close-button')
let formNameObj = document.querySelector('#name')
let formDescriptionObj = document.querySelector('#description')
let editFormObj = document.querySelector('.form')
let cardTemplate = document.querySelector('#card-template').content;
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

function addCard(link, name) {
  const firstCard = cardTemplate.querySelector('.grid-cards__item').cloneNode(true);
  firstCard.querySelector('.grid-cards__item-image').src = link;
  firstCard.querySelector('.grid-cards__item-image').alt = name;
  firstCard.querySelector('.grid-cards__caption').textContent = name;
  gridCards.prepend(firstCard);

}


initialCards.forEach(element => addCard(element.link, element.name));


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

console.log('Z'.toLocaleUpperCase())
console.log('z'.toUpperCase() === 'Z')
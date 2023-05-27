export class Api {
  constructor(optionsObject) {
    this._token = optionsObject.headers.authorization;
    this._baseUrl = optionsObject.baseUrl;
    this._headers = optionsObject.headers;
  }


  _checkValidResponce(res) {
    if (res.ok) {
      return res.json()
    }
    else {
      return Promise.reject;
    }
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: 
      {authorization : this._token}
    }).then(this._checkValidResponce)
  }
  
  getCardsData() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: 
      {authorization : this._token}}).then(this._checkValidResponce)
  }

  setUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkValidResponce) 
  }
  setUserAvatar({link}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._checkValidResponce) 
  }

  addCardData({name, link}) {
    return fetch(`${this._baseUrl}/cards `, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkValidResponce) 
  }
  
  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkValidResponce)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkValidResponce)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkValidResponce)
  }

}
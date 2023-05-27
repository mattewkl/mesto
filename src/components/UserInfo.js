export class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector)
    this._description = document.querySelector(descriptionSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    this._userInfoObj = {
      name: this._name.textContent.trim(),
      description: this._description.textContent.trim()
    }
    return this._userInfoObj;
  }

  setUserInfo({name, description}) {
    this._name.textContent = name.trim();
    this._description.textContent = description.trim();
  }

  updateAvatar(link) {
    this._avatar.src = link;
  }

  setUserId(id) {
    this._id = id;
  }

  getUserId() {
    return this._id 
  }
}
export class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector)
    this._description = document.querySelector(descriptionSelector)
  }

  getUserInfo() {
    this._userInfoObj = {
      name: this._name.textContent,
      description: this._description.textContent
    }
    return this._userInfoObj;
  }

  setUserInfo({name, description}) {
    this._name.textContent = name.trim();
    this._description.textContent = description.trim();
  }
}
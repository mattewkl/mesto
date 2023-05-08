export class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderInitialItems() {
    this._items.forEach(element => {
      this.addItem(this._renderer(element))
    });

  }

  addItem(DOMElement) {
    this._container.prepend(DOMElement)
  }
}
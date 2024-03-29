export class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach(element => {
      this._renderer(element)
    });

  }

  addItem(DOMElement) {
    this._container.append(DOMElement)
  }
}
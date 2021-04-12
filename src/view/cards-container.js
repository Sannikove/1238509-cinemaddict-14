import {createElement} from '../utils.js';

const createCardsContainerTemplate = () => {
  return '<div class="films-list__container"></div>';
};

export default class CardsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCardsContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

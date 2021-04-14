import AbstractView from './abstract.js';

const createCardsContainerTemplate = () => {
  return '<div class="films-list__container"></div>';
};

export default class CardsContainer extends AbstractView {
  getTemplate() {
    return createCardsContainerTemplate();
  }
}

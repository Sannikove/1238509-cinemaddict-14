import {createElement} from '../utils.js';

const createStatisticsTemplate = (filters) => {
  const allFilmsCount = filters[0].count;
  return `<p>${allFilmsCount} movies inside</p>`;
};

export default class FooterStatistic {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createStatisticsTemplate(this._filters);
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

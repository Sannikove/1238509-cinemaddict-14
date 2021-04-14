import AbstractView from './abstract.js';

const createStatisticsTemplate = (filters) => {
  const allFilmsCount = filters[0].count;
  return `<p>${allFilmsCount} movies inside</p>`;
};

export default class FooterStatistic extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createStatisticsTemplate(this._filters);
  }
}

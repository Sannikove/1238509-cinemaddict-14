import {createElement} from '../utils.js';

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  if (name != 'all') {
    const nameWithCapitalLetter = name[0].toUpperCase() + name.slice(1);
    return (
      `<a href="#${name}" class="main-navigation__item">${nameWithCapitalLetter} <span class="main-navigation__item-count">${count}</span></a>`
    );
  }
};

const createNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Navigation {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
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
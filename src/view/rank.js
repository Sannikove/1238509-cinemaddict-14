import {createElement} from '../utils.js';

const getRank = (count) => {
  if (count === 0) {
    return '';
  } else if (count >= 1 && count <= 10) {
    return 'Novice';
  } else if (count >= 11 && count <= 20) {
    return 'Fan';
  }
  return 'Movie Buff';
};

const createRankTemplate = (filters) => {
  const watchedFilms = filters[2].count;

  const rank = getRank(watchedFilms);

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Rank {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createRankTemplate(this._filters);
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

import dayjs from 'dayjs';
import {convertHours} from '../utils/time.js';
import AbstractView from './abstract.js';

const createFilmCardTemplate = (card) => {
  const {
    poster,
    title,
    rating,
    releaseDate,
    duration,
    genre,
    description,
    comments,
    userFilmInteractions,
  } = card;

  const runtime = convertHours(duration);

  const release = dayjs(releaseDate).format('YYYY');

  const interactions = Object.values(userFilmInteractions);

  const getClassName = (value) => {
    switch (value) {
      case true:
        return 'film-card__controls-item--active';
      case false:
        return '';
    }
  };

  const watchlistClassName = getClassName(interactions[0]);
  const watchedClassName = getClassName(interactions[1]);
  const favoriteClassName = getClassName(interactions[2]);

  const commentCount = comments.length;

  const genreCount = genre[0];

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${release}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genreCount}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentCount} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(card) {
    super();
    this._card = card;


    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favorireClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setOpenPopupClickHandler(callback) {
    this._callback.openPopupClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openPopupClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openPopupClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  _watchListClickHandler(evt){
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedClickHandler(evt){
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favorireClickHandler(evt){
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.openPopupClick();
  }
}

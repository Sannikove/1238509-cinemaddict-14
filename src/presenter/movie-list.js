import SortView from '../view/sort.js';
import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import CardsContainerView from '../view/cards-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import CardPresenter from './card.js';
import {render, RenderPosition, remove} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedCardCount = FILM_COUNT_PER_STEP;
    this._cardPresenter = {};

    this._sortComponent = new SortView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._cardsContainerComponent = new CardsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(filmCards, commentsArray) {
    this._filmCards = filmCards.slice();
    this._commentsArray = commentsArray.slice();

    render(this._movieListContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._cardsContainerComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCard(card) {
    const cardPresenter = new CardPresenter(this._cardsContainerComponent);
    cardPresenter.init(card, this._commentsArray);
    this._cardPresenter[card.id] = cardPresenter;
  }

  _renderCards(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => this._renderCard(filmCard));
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedCardCount, this._renderedCardCount + FILM_COUNT_PER_STEP);
    this._renderedCardCount += FILM_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._filmCards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearCardList() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};
    this._renderedCardCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderCardsList() {
    this._renderCards(0, Math.min(this._filmCards.length, FILM_COUNT_PER_STEP));

    if (this._filmCards.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }
  _renderMovieList() {
    this._renderSort();
    this._renderCardsList();
  }
}

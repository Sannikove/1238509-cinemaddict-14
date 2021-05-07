import SortView from '../view/sort.js';
import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import CardsContainerView from '../view/cards-container.js';
import NoCardsView from '../view/no-cards.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import CardPresenter from './card.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {UpdateType, UserAction} from '../const.js';

const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, cardsModel, commentsModel) {
    this._cardsModel = cardsModel;
    this._commentsModel = commentsModel;
    this._movieListContainer = movieListContainer;
    this._renderedCardCount = FILM_COUNT_PER_STEP;
    this._cardPresenter = {};
    this._showMoreButtonComponent = null;

    this._sortComponent = new SortView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._cardsContainerComponent = new CardsContainerView();
    this._noCardsComponent = new NoCardsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._cardsModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);

  }

  init() {
    render(this._movieListContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._cardsContainerComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _getCards() {
    //тут будет сортировка
    return this._cardsModel.getCards();
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.closeOtherPopup());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this._cardsModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._cardPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedCardCount: true}); // когда будет сделана сортировка добавить параметр {resetSortType: true}
        this._renderMovieList();
        break;
    }
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCard(card, comments) {
    const cardPresenter = new CardPresenter(this._cardsContainerComponent, this._handleViewAction, this._handleModeChange);
    cardPresenter.init(card, comments);
    this._cardPresenter[card.id] = cardPresenter;
  }

  _renderCards(cards, comments) {
    cards.forEach((card) => this._renderCard(card, comments));
  }

  _renderNoCards() {
    render(this._filmsContainerComponent, this._noCardsComponent, RenderPosition.AFTERBEGIN);
  }

  _handleShowMoreButtonClick() {
    const cardCount = this._getCards().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + FILM_COUNT_PER_STEP);
    const cards = this._getCards().slice(this._renderedCardCount, newRenderedCardCount);
    const comments = this._getComments().slice();

    this._renderCards(cards, comments);
    this._renderedCardCount = newRenderedCardCount;

    if (this._renderedCardCount >= cardCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearMovieList({resetRenderedCardCount = false} = {}) {
    const cardCount = this._getCards().length;

    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};

    remove(this._sortComponent);
    remove(this._showMoreButtonComponent);
    remove(this._noCardsComponent);

    if (resetRenderedCardCount) {
      this._renderedCardCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedCardCount = Math.min(cardCount, this._renderedCardCount);
    }
  }

  _renderMovieList() {
    const cards = this._getCards();
    const cardCount = cards.length;

    if (cardCount === 0) {
      this._renderNoCards();
      return;
    }

    this._renderSort();

    this._renderCards(cards.slice(0, Math.min(cardCount, this._renderedCardCount)));

    if (cardCount > this._renderedCardCount) {
      this._renderShowMoreButton();
    }
  }
}

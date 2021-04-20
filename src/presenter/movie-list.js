import SortView from '../view/sort.js';
import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import CardsContainerView from '../view/cards-container.js';
import FilmCardView from '../view/film-card.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import PopupView from '../view/popup.js';
import CommentView from '../view/comment.js';
import {render, RenderPosition, remove} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedCardCount = FILM_COUNT_PER_STEP;

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

  _renderComments(card, popup) {
    const container = popup.querySelector('.film-details__comments-list');
    for (let i = 0; i < card.comments.length; i++) {
      for (let j = 0; j < this._commentsArray.length; j++) {
        if (card.comments[i] == this._commentsArray[j].id) {
          render(container, new CommentView(this._commentsArray[j]), RenderPosition.BEFOREEND);
        }
      }
    }
  }

  _renderPopup(CardComponent, card) {
    const PopupComponent = new PopupView(card);
    this._renderComments(card, PopupComponent.getElement());

    const openPopup = () => {
      document.body.appendChild(PopupComponent.getElement());
      document.body.classList.add('hide-overflow');
    };
    const closePopup = () => {
      document.body.removeChild(PopupComponent.getElement());
      document.body.classList.remove('hide-overflow');
    };

    CardComponent.setOpenPopupClickHandler(() => openPopup());
    PopupComponent.setCloseBtnClickHandler(() => closePopup());
  }

  _renderCard(card) {
    const FilmCardComponent = new FilmCardView(card);
    render(this._cardsContainerComponent, FilmCardComponent, RenderPosition.BEFOREEND);
    this._renderPopup(FilmCardComponent, card);
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

import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import CommentView from '../view/comment.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

export default class Card {
  constructor(cardsContainer) {
    this._cardsContainer = cardsContainer;

    this._filmCardComponent = null;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
  }

  init(card, commentsArray) {
    this._card = card;
    this._commentsArray = commentsArray;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(card);
    this._popupComponent = new PopupView(card);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._popupComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);

    if (prevFilmCardComponent === null) {
      this._renderCard();
      return;
    }

    if (this._cardsContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _openPopup() {
    document.body.appendChild(this._popupComponent.getElement());
    document.body.classList.add('hide-overflow');
  }

  _closePopup() {
    document.body.removeChild(this._popupComponent.getElement());
    document.body.classList.remove('hide-overflow');
  }

  _handleOpenPopupClick() {
    this._openPopup();
  }

  _handleCloseBtnClick() {
    this._closePopup();
  }

  _renderComments() {
    const container = this._popupComponent.getElement().querySelector('.film-details__comments-list');
    for (let i = 0; i < this._card.comments.length; i++) {
      for (let j = 0; j < this._commentsArray.length; j++) {
        if (this._card.comments[i] == this._commentsArray[j].id) {
          render(container, new CommentView(this._commentsArray[j]), RenderPosition.BEFOREEND);
        }
      }
    }
  }

  _renderCard(){
    render(this._cardsContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    this._renderComments();
  }
}

import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
};

export default class Card {
  constructor(cardsContainer, changeData, changeMode, commentsArray) {
    this._cardsContainer = cardsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsArray = commentsArray.getComments();

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.CLOSE;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);

  }

  init(card) {
    this._card = card;


    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(card);
    this._popupComponent = new PopupView(card, this._commentsArray);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._popupComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);

    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popupComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popupComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevFilmCardComponent === null) {
      this._renderCard();
      return;
    }

    if (this._cardsContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (document.contains(prevPopupComponent.getElement())) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  closeOtherPopup() {
    if (this._mode !== Mode.CLOSE) {
      this._closePopup();
    }
  }

  _openPopup() {
    document.body.appendChild(this._popupComponent.getElement());
    document.body.classList.add('hide-overflow');
    this._changeMode();
    this._mode = Mode.OPEN;
  }

  _closePopup() {
    document.body.removeChild(this._popupComponent.getElement());
    document.body.classList.remove('hide-overflow');
    this._mode = Mode.CLOSE;
  }

  _handleOpenPopupClick() {
    this._openPopup();
  }

  _handleCloseBtnClick() {
    this._closePopup();
  }


  _handleWatchListClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          userFilmInteractions:
            Object.assign(
              {},
              this._card.userFilmInteractions,
              {
                isWatchlist: !this._card.userFilmInteractions.isWatchlist,
              },
            ),
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          userFilmInteractions:
            Object.assign(
              {},
              this._card.userFilmInteractions,
              {
                isWatched: !this._card.userFilmInteractions.isWatched,
              },
            ),
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          userFilmInteractions:
            Object.assign(
              {},
              this._card.userFilmInteractions,
              {
                isFavorite: !this._card.userFilmInteractions.isFavorite,
              },
            ),
        },
      ),
    );
  }

  _handleFormSubmit(commentsArray) {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      commentsArray,
    );
  }

  _renderCard(){
    render(this._cardsContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
  }
}

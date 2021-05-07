import dayjs from 'dayjs';
import nanoid from 'nanoid';
import {convertHours} from '../utils/time.js';
import {EMOJIES} from '../const.js';
import SmartView from './smart.js';


const createCommentsListTemplate = (comments, commentsArray) => {
  let commentList = '';
  for (let i = 0; i < comments.length; i++) {
    for (let j = 0; j < commentsArray.length; j++) {
      if (comments[i] == commentsArray[j].id) {
        const {
          nickName,
          commentDate,
          comment,
          emotion,
        } = commentsArray[j];
        const commentDay = dayjs(commentDate).format('YYYY/MM/D H:m');
        commentList = commentList + `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
              <span class="film-details__comment-author">${nickName}</span>
              <span class="film-details__comment-day">${commentDay}</span>
              <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
      }
    }
  }
  return commentList;
};


const getChecked = (value) => {
  switch (value) {
    case true:
      return 'checked';
    case false:
      return '';
  }
};

const createUserEmojiTemplate = (emoji) => {
  return emoji ? `<img
    src="./images/emoji/${emoji}.png"
    width="55"
    height="55"
    alt="emoji-${emoji}"></img>` :
    '';
};

const createCommentEditEmojiesTemplate = (currentEmoji) => {
  return EMOJIES.map((emoji) => `<input
  class="film-details__emoji-item visually-hidden"
  name="comment-emoji"
  type="radio"
  id="emoji-${emoji}"
  value="${emoji}"
  ${currentEmoji === emoji ? 'checked' : ''}
  >
  <label
  class="film-details__emoji-label"
  for="emoji-${emoji}">
  <img
  src="./images/emoji/${emoji}.png"
  width="30"
  height="30"
  alt="emoji">
  </label>`).join('');
};

const createPopupTemplate = (data) => {
  const {
    poster,
    age,
    title,
    originalTitle,
    director,
    writers,
    actors,
    rating,
    releaseDate,
    country,
    duration,
    genre,
    description,
    comments,
    userFilmInteractions,
    commentsList,
  } = data;

  const {comment, emotion} = data.newComment;

  const release = dayjs(releaseDate).format('D MMMM YYYY');

  const runtime = convertHours(duration);

  let genreCount = '';
  genre.length > 1 ?
    genreCount = 'Genres' :
    genreCount = 'Genre';

  let genresList = '';
  for (let i = 0; i < genre.length; i++) {
    genresList = genresList + `<span class="film-details__genre">${genre[i]}</span>`;
  }

  const writersList = writers.join(', ');
  const actorsList = actors.join(', ');

  const interactions = Object.values(userFilmInteractions);

  const watchlistChecked = getChecked(interactions[0]);
  const watchedChecked = getChecked(interactions[1]);
  const favoriteChecked = getChecked(interactions[2]);

  const commentsCount = comments.length;
  const commentsArray = createCommentsListTemplate(comments, commentsList);

  const userEmoji = createUserEmojiTemplate(emotion);
  const emojiesTemplate = createCommentEditEmojiesTemplate(emotion);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">${age}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writersList}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actorsList}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${release}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreCount}</td>
                <td class="film-details__cell">${genresList}</td>
              </tr>
            </table>
            <p class="film-details__film-description">${description}</p>
          </div>
        </div>
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistChecked}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedChecked}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteChecked}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
          <ul class="film-details__comments-list">${commentsArray}</ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${userEmoji}</div>
            <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ''}</textarea>
            </label>
            <div class="film-details__emoji-list">
              ${emojiesTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends SmartView {
  constructor(card, commentsArray) {
    super();

    this._data = Popup.parseCardToData(card, commentsArray);

    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favorireClickHandler.bind(this);

    this._formToggleHandler = this._formToggleHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._isCtrlEnterEvent = this._isCtrlEnterEvent.bind(this);


    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__inner')
      .addEventListener('click', this._formToggleHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
    document.addEventListener('keydown', this._isCtrlEnterEvent);
  }

  _isCtrlEnterEvent(evt){
    if(evt.ctrlKey && evt.keyCode == 13) {
      this.getElement()
        .querySelector('.film-details__inner').submit();
    }
  }

  _formToggleHandler(evt) {
    switch (evt.target.value) {
      case 'smile':
        this.updateData({newComment:
          Object.assign({},
            this._data.newComment,
            {
              emotion: 'smile',
            },
          ),
        });
        break;
      case 'sleeping':
        this.updateData({
          emoji: 'sleeping',
        });
        break;
      case 'puke':
        this.updateData({
          emoji: 'puke',
        });
        break;
      case 'angry':
        this.updateData({
          emoji: 'angry',
        });
        break;
    }
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({newComment:
      Object.assign({},
        this._data.newComment,
        {
          comment: evt.target.value,
        },
      ),
    }, true);
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closeBtnClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeBtnClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('input[name=watchlist]').addEventListener('change', this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('input[name=watched]').addEventListener('change', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('input[name=favorite]').addEventListener('change', this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.film-details__inner').addEventListener('submit', this._formSubmitHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favorireClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _closeBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeBtnClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Popup.parseDataToCard(this._data));
  }

  static parseCardToData(card, commentsArray) {
    return Object.assign({},
      card, {
        newComment: {
          comment: null,
          commentDate: new Date,
          emotion: null,
          id: nanoid(),
          nickName: 'You',
        },
        commentsList: commentsArray,
      });
  }

  static parseDataToComments(data) {
    data = Object.assign({}, data);

    const commentsArray = data.commentsList.push(data.newComment);


    delete data.newComment;
    delete data.commentsList;

    return commentsArray;

  }

}

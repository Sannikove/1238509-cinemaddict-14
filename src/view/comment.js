import dayjs from 'dayjs';
import {createElement} from '../utils.js';

const createCommentTemplate = (commentElement) => {
  const {nickName, commentDate, comment, emotion} = commentElement;
  const commentDay = dayjs(commentDate).format('YYYY/MM/D H:m');
  return `<li class="film-details__comment">
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
};

export default class Comment {
  constructor(comment) {
    this._element = null;
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
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

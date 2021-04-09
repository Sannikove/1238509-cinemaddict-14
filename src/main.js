import {createRankTemplate} from './view/rank.js';
import {createSiteMenuTemplate} from './view/menu.js';
import {createFilmsContainerTemplate} from './view/films-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';
import {createPopupTemplate} from './view/popup.js';
import {generateFilmCard} from './mock/film.js';
import {createCommentTemplate} from './view/comment.js';
import {createStatisticsTemplate} from './view/footer-statistics.js';
import {generateFilter} from './mock/filter.js';
import {generateComment} from './mock/comment-mock.js';

const COMMENT_COUNT = 20;
const FILM_COUNT = 25;
const FILM_COUNT_PER_STEP = 5;

const commentsArray = new Array(COMMENT_COUNT).fill().map(generateComment);
const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(cards);


const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createRankTemplate(filters));
render(siteMainElement, createSiteMenuTemplate(filters));
render(siteMainElement, createFilmsContainerTemplate());

const filmsElement = document.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');

const filmCardContainerElement = filmsListElement.querySelector('.films-list__container');
for (let i = 0; i < Math.min(cards.length, FILM_COUNT_PER_STEP); i++) {
  render(filmCardContainerElement, createFilmCardTemplate(cards[i]));
}

if (cards.length > FILM_COUNT_PER_STEP) {
  let renderedCardCount = FILM_COUNT_PER_STEP;
  render(filmsListElement, createLoadMoreButtonTemplate());
  const showMoreButton = filmsListElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + FILM_COUNT_PER_STEP)
      .forEach((card) => render(filmCardContainerElement, createFilmCardTemplate(card)));

    renderedCardCount += FILM_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainerElement = siteFooterElement.querySelector('.footer__statistics');
render(footerStatisticsContainerElement, createStatisticsTemplate(filters));
render(siteFooterElement, createPopupTemplate(cards[0]), 'afterend');

const commentsContainer = document.querySelector('.film-details__comments-list');
for (let i = 0; i < cards[0].comments.length; i++) {
  for (let j  = 0; j < commentsArray.length; j++) {
    if (cards[0].comments[i] == commentsArray[j].id) {
      render(commentsContainer, createCommentTemplate(commentsArray[j]));
    }
  }
}

export {commentsArray};

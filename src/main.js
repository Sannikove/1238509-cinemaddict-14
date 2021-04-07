import {createRankTemplate} from './view/rank.js';
import {createSiteMenuTemplate} from './view/menu.js';
import {createFilmsContainerTemplate} from './view/films-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';
import {createPopupTemplate} from './view/popup.js';
import {generateFilmCard} from './mock/film-card.js';
import {createCommentTemplate} from './view/comment.js';
import {createStatisticsTemplate} from './view/footer-statistics.js';

const FILM_COUNT = 20;

const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createRankTemplate(cards));
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const filmsElement = document.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');

const filmCardContainerElement = filmsListElement.querySelector('.films-list__container');
for (let i = 0; i < 5; i++) {
  render(filmCardContainerElement, createFilmCardTemplate(cards[i]));
}
render(filmsListElement, createLoadMoreButtonTemplate());

const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainerElement = siteFooterElement.querySelector('.footer__statistics');
render (footerStatisticsContainerElement, createStatisticsTemplate(cards));
render(siteFooterElement, createPopupTemplate(cards[1]), 'afterend');

const commentsContainer = document.querySelector('.film-details__comments-list');
for (let i = 0; i < cards[1].comments.length; i++) {
  render(commentsContainer, createCommentTemplate(cards[1].comments[i]));
}


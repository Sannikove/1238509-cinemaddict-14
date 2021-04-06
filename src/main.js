import {createRankTemplate} from './view/rank.js';
import {createSiteMenuTemplate} from './view/menu.js';
import {createFilmsContainerTemplate} from './view/films-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';
import {createPopupTemplate} from './view/popup.js';
import {generateFilmCard} from './mock/film-card.js';
import {createCommentTemplate} from './view/comment.js';

const FILM_COUNT = 5;

const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createRankTemplate());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const filmsElement = document.querySelector('.films');
const filmsListElement = filmsElement.querySelectorAll('.films-list');

const filmCardContainerElement = filmsListElement[0].querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT; i++) {
  render(filmCardContainerElement, createFilmCardTemplate(cards[i]));
}
render(filmsListElement[0], createLoadMoreButtonTemplate());

const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, createPopupTemplate(cards[1]), 'afterend');
const commentsContainer = document.querySelector('.film-details__comments-list');
render(commentsContainer, createCommentTemplate());

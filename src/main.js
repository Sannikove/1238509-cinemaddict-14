import RankView from './view/rank.js';
import NavigationView from './view/navigation.js';
import FooterStatisticView from './view/footer-statistics.js';
import {generateFilmCard} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {generateComment} from './mock/comment-mock.js';
import MovieListPresenter from './presenter/movie-list.js';
import {render, RenderPosition} from './utils/render.js';

const COMMENT_COUNT = 20;
const FILM_COUNT = 25;

const commentsArray = new Array(COMMENT_COUNT).fill().map(generateComment);
const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(cards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, new RankView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationView(filters), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement);
movieListPresenter.init(cards, commentsArray);

const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainerElement = siteFooterElement.querySelector('.footer__statistics');
render(footerStatisticsContainerElement, new FooterStatisticView(filters), RenderPosition.BEFOREEND);

export {commentsArray};

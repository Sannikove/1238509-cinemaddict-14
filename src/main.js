import RankView from './view/rank.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import FilmsContainerView from './view/films-container.js';
import FilmsListView from './view/films-list.js';
import CardsContainerView from './view/cards-container.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButton from './view/show-more-button.js';
import PopupView from './view/popup.js';
import {generateFilmCard} from './mock/film.js';
import CommentView from './view/comment.js';
import FooterStatisticView from './view/footer-statistics.js';
import {generateFilter} from './mock/filter.js';
import {generateComment} from './mock/comment-mock.js';
import {render, RenderPosition, remove} from './utils/render.js';

const COMMENT_COUNT = 20;
const FILM_COUNT = 25;
const FILM_COUNT_PER_STEP = 5;

const commentsArray = new Array(COMMENT_COUNT).fill().map(generateComment);
const cards = new Array(FILM_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(cards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, new RankView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const FilmsContainerComponent = new FilmsContainerView();
render(siteMainElement, FilmsContainerComponent, RenderPosition.BEFOREEND);

const FilmsListComponent = new FilmsListView();
render(FilmsContainerComponent, FilmsListComponent, RenderPosition.BEFOREEND);

const CardsContainerComponent = new CardsContainerView();
render(FilmsListComponent, CardsContainerComponent, RenderPosition.BEFOREEND);

const renderComments = (card, popup) => {
  const container = popup.querySelector('.film-details__comments-list');
  for (let i = 0; i < card.comments.length; i++) {
    for (let j = 0; j < commentsArray.length; j++) {
      if (card.comments[i] == commentsArray[j].id) {
        render(container, new CommentView(commentsArray[j]), RenderPosition.BEFOREEND);
      }
    }
  }
};

const renderPopup = (CardComponent, card) => {
  const PopupComponent = new PopupView(card);
  renderComments(card, PopupComponent.getElement());

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
};

for (let i = 0; i < Math.min(cards.length, FILM_COUNT_PER_STEP); i++) {
  const FilmCardComponent = new FilmCardView(cards[i]);
  render(CardsContainerComponent, FilmCardComponent, RenderPosition.BEFOREEND);
  renderPopup(FilmCardComponent, cards[i]);
}

if (cards.length > FILM_COUNT_PER_STEP) {
  let renderedCardCount = FILM_COUNT_PER_STEP;
  const ShowMoreButtonComponent = new ShowMoreButton();
  render(FilmsListComponent, ShowMoreButtonComponent, RenderPosition.BEFOREEND);


  ShowMoreButtonComponent.setClickHandler(() => {
    cards
      .slice(renderedCardCount, renderedCardCount + FILM_COUNT_PER_STEP)
      .forEach((card) => {
        const FilmCardComponent = new FilmCardView(card);
        render(CardsContainerComponent, FilmCardComponent, RenderPosition.BEFOREEND);
        renderPopup(FilmCardComponent, card);
      });

    renderedCardCount += FILM_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      remove(ShowMoreButtonComponent);
    }
  });
}

const siteFooterElement = document.querySelector('.footer');
const footerStatisticsContainerElement = siteFooterElement.querySelector('.footer__statistics');
render(footerStatisticsContainerElement, new FooterStatisticView(filters), RenderPosition.BEFOREEND);

export {commentsArray};

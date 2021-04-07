import dayjs from 'dayjs';

export const createFilmCardTemplate = (card) => {
  const {
    poster,
    title,
    rating,
    releaseDate,
    duration,
    genre,
    description,
    comments,
    userFilmInteractions,
  } = card;

  const runtime = duration >= 60 ?
    Math.floor(duration / 60) + 'h' + duration % 60 + 'm' :
    duration + 'm';

  const release = dayjs(releaseDate).format('YYYY');
  const interactions = Object.values(userFilmInteractions);

  const getClassName = (value) => {
    switch (value) {
      case true:
        return 'film-card__controls-item--active';
      case false:
        return '';
    }
  };

  const watchlistClassName = getClassName(interactions[0]);
  const watchedClassName = getClassName(interactions[1]);
  const favoriteClassName = getClassName(interactions[2]);

  const commentCount = comments.length;

  const genreCount = genre[0];

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${release}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genreCount}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentCount} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

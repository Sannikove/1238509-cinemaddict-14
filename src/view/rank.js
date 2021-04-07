export const createRankTemplate = (cards) => {
  let watchedFilms = 0;
  for (const card of cards) {
    if (card.userFilmInteractions.isWatched) {
      watchedFilms++;
    }
  }

  const getRank = (count) => {
    if (count === 0) {
      return '';
    } else if (count >= 1 && count <= 10) {
      return 'Novice';
    } else if (count >= 11 && count <= 20) {
      return 'Fan';
    } else {
      return 'Movie Buff';
    }
  };

  const rank = getRank(watchedFilms);

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

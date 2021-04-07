export const createRankTemplate = (filters) => {
  const watchedFilms = filters[2].count;

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

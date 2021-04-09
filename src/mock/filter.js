const cardToFilterMap = {
  all: (cards) => cards.length,
  watchlist: (cards) => cards
    .filter((card) => card.userFilmInteractions.isWatchlist).length,
  history: (cards) => cards
    .filter((card) => card.userFilmInteractions.isWatched).length,
  favorites: (cards) => cards
    .filter((card) => card.userFilmInteractions.isFavorite).length,
};

export const generateFilter = (cards) => {
  return Object.entries(cardToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(cards),
    };
  });
};

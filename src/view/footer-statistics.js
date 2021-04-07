export const createStatisticsTemplate = (cards) => {
  const allFilmsCount = cards.length;
  return `<p>${allFilmsCount} movies inside
          </p>`;
};

export const createStatisticsTemplate = (filters) => {
  const allFilmsCount = filters[0].count;
  return `<p>${allFilmsCount} movies inside</p>`;
};

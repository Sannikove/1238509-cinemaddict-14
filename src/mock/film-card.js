import dayjs from 'dayjs';
import {POSTERS, FILMS, NAMES, DESCRIPTIONS, GENRES, COUNTRYS} from '../const.js';
import {getRandomInteger, getRandomArrayElement, generateRandomArray} from '../utils.js';
import {generateComment} from './comment-mock.js';

const generatePoster = () => {
  const poster = getRandomArrayElement(POSTERS);
  return './images/posters/' + poster;
};

const generateRating = () => {
  return getRandomInteger(0, 9) + '.' + getRandomInteger(0, 9);
};

export const generateDescription = () => {
  const randomArrayCount = getRandomInteger(1, 5);
  return new Array(randomArrayCount).fill().map(() =>
    getRandomArrayElement(DESCRIPTIONS)).join(' ');
};

export const generateDate = () => {
  const yearsGap = getRandomInteger(-1, -90);
  const daysGap = getRandomInteger (0, 365);

  return dayjs().add(yearsGap, 'y').add(daysGap, 'd').toDate();
};

export const generateFilmCard = () => {
  return {
    poster: generatePoster(),
    age: getRandomInteger(0, 18),
    title: getRandomArrayElement(FILMS),
    originalTitle: getRandomArrayElement(FILMS),
    director: getRandomArrayElement(NAMES),
    writers: generateRandomArray(NAMES),
    actors: generateRandomArray(NAMES),
    rating: generateRating(),
    releaseDate: generateDate(),
    country :getRandomArrayElement(COUNTRYS),
    duration: getRandomInteger(1, 180),
    genre: generateRandomArray(GENRES),
    description: generateDescription(),
    comments: new Array(getRandomInteger(0, 5)).fill().map(generateComment),
    userFilmInteractions: {
      isWatchlist: Boolean(getRandomInteger(0, 1)),
      isWatched: Boolean(getRandomInteger(0, 1)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};

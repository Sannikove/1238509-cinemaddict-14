import dayjs from 'dayjs';
import {POSTERS, FILMS, NAMES, DESCRIPTIONS, GENRES, COUNTRIES} from '../const.js';
import {getRandomInteger, getRandomArrayElement, generateRandomArray} from '../utils.js';
import {commentsArray} from '../main.js';

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

const generateIdArray = () => {
  const arr = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    arr.push(commentsArray[i].id);
  }
  return arr;
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
    country :getRandomArrayElement(COUNTRIES),
    duration: getRandomInteger(1, 180),
    genre: generateRandomArray(GENRES),
    description: generateDescription(),
    comments: generateIdArray(),
    userFilmInteractions: {
      isWatchlist: Boolean(getRandomInteger(0, 1)),
      isWatched: Boolean(getRandomInteger(0, 1)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};

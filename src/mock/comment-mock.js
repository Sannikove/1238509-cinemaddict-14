import {getRandomArrayElement} from '../utils';
import {NAMES, EMOTIONS} from '../const.js';
import {generateDate, generateDescription} from './film-card';

export const generateComment = () => {
  return {
    nickName: getRandomArrayElement(NAMES),
    commentDate: generateDate(),
    comment: generateDescription(),
    emotion: getRandomArrayElement(EMOTIONS),
  };
};

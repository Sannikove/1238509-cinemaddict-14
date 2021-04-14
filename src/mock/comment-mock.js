import nanoid from 'nanoid';
import {getRandomArrayElement} from '../utils/common.js';
import {NAMES, EMOJIES} from '../const.js';
import {generateDate, generateDescription} from './film';

export const generateComment = () => {
  return {
    nickName: getRandomArrayElement(NAMES),
    commentDate: generateDate(),
    comment: generateDescription(),
    emotion: getRandomArrayElement(EMOJIES),
    id: nanoid(),
  };
};

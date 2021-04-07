const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const generateRandomArray = (arr) => {
  const randomArrayCount = getRandomInteger(1, 3);
  return new Array(randomArrayCount).fill().map(() =>
    getRandomArrayElement(arr));
};

const convertHours = (minutes) => {
  if(minutes >= 60) {
    return Math.floor(minutes / 60) + 'h' + minutes % 60 + 'm';
  } else {
    return minutes + 'm';
  }
};

export {getRandomInteger, getRandomArrayElement, generateRandomArray, convertHours};

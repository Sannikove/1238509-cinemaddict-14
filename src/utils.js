const MINUTES_IN_HOUR = 60;

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

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
  if (minutes >= MINUTES_IN_HOUR) {
    return Math.floor(minutes / MINUTES_IN_HOUR) + 'h' + minutes % MINUTES_IN_HOUR + 'm';
  }
  return minutes + 'm';
};

export {getRandomInteger, getRandomArrayElement, generateRandomArray, convertHours};

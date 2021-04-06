import dayjs from 'dayjs';

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const FILMS = [
  'Крестный отец',
  'Ирония судьбы, или с легким паром',
  'Во все тяжкие',
  'Терминатор 2: Судный день',
  'Приключения Шурика',
  'Смертельное задание',
  'Назад в будущее',
  'Подпольная империя',
  'Карточный домик',
  'Иван Васильевич меняет профессию',
  'Карты, деньги, два ствола',
  'Властелин колец: Братство кольца',
  'Властелин колец: Возвращение Короля',
  'Темный рыцарь',
  'Мерлин',
];

const NAMES = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const GENRE = [
  'Sci-fi',
  'Horror',
  'Documentary',
  'Animation',
  'Action',
  'Drama',
  'Comedy',
  'Adventure',
];

const COUNTRY = [
  'USA',
  'Russia',
  'France',
];

const EMOTION = ['smile', 'sleeping', 'puke', 'angry'];

const generatePoster = () => {
  const poster = getRandomArrayElement(POSTERS);
  return './images/posters/' + poster;
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

const generateRating = () => {
  return getRandomInteger(0, 9) + '.' + getRandomInteger(0, 9);
};


const generateDescription = () => {
  const randomArrayCount = getRandomInteger(1, 5);
  return new Array(randomArrayCount).fill().map(() =>
    getRandomArrayElement(DESCRIPTIONS)).join(' ');
};

const generateDate = () => {
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
    country :getRandomArrayElement(COUNTRY),
    duration: getRandomInteger(1, 180),
    genre: generateRandomArray(GENRE),
    description: generateDescription(),
    comments: new Array(getRandomInteger(1, 5)).fill().map(generateComment),
    userFilmInteractions: {
      isWatchlist: Boolean(getRandomInteger(0, 1)),
      isWatched: Boolean(getRandomInteger(0, 1)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};

export const generateComment = () => {
  return {
    id: getRandomInteger(1, 10),
    nickName: getRandomArrayElement(NAMES),
    commentDate: generateDate(),
    comment: generateDescription(),
    emotion: getRandomArrayElement(EMOTION),
  };
};

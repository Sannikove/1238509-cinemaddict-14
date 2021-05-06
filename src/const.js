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

const GENRES = [
  'Sci-fi',
  'Horror',
  'Documentary',
  'Animation',
  'Action',
  'Drama',
  'Comedy',
  'Adventure',
];

const COUNTRIES = [
  'USA',
  'Russia',
  'France',
];

const EMOJIES = ['smile', 'sleeping', 'puke', 'angry'];

const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {POSTERS, FILMS, NAMES, DESCRIPTIONS, GENRES, COUNTRIES, EMOJIES, UpdateType, UserAction};

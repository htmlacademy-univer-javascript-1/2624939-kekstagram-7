
import { getRandomInteger, getRandomArrayElement } from './util.js';

const DESCRIPTIONS = [
  'Красивый закат',
  'Отдых на природе',
  'Мой любимый кот',
  'Прогулка по городу',
  'Встреча с друзьями',
  'Летние приключения',
  'Вкусный завтрак',
  'Путешествие к морю',
  'Прекрасный день',
  'Незабываемые моменты'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Анна',
  'Иван',
  'Мария',
  'Алексей',
  'Екатерина',
  'Дмитрий',
  'Ольга'
];

const getRandomMessage = () => {
  const firstMessage = getRandomArrayElement(MESSAGES);

  if (getRandomInteger(1, 2) === 1) {
    return firstMessage;
  }

  const secondMessage = getRandomArrayElement(MESSAGES);
  return `${firstMessage} ${secondMessage}`;
};

let commentId = 0;

const createComment = () => ({
  id: ++commentId,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  return Array.from({ length: commentsCount }, createComment);
};

const createPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createComments()
});

const getPhotos = () =>
  Array.from({ length: 25 }, (_, index) => createPhoto(index));

export { getPhotos };

import { openBigPicture } from './big-picture.js';

const renderPictures = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, description, likes, comments } = photo;
    const pictureElement = pictureTemplate.cloneNode(true);

    const pictureImage = pictureElement.querySelector('.picture__img');

    pictureImage.src = url;
    pictureImage.alt = description;

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesFragment);
};

export { renderPictures };

import { getPhotos } from './data.js';
import { renderPictures } from './pictures.js';
import './upload-form.js';

const photos = getPhotos();

renderPictures(photos);

export { photos };

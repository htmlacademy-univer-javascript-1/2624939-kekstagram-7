const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const caption = bigPicture.querySelector('.social__caption');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsShownCount = bigPicture.querySelector('.comments-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let renderedCommentsCount = 0;

const renderNextComments = () => {
  const nextComments = currentComments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_PER_PORTION);
  const commentsFragment = document.createDocumentFragment();

  nextComments.forEach(({ avatar, name, message }) => {
    const commentElement = commentTemplate.cloneNode(true);
    const avatarImage = commentElement.querySelector('.social__picture');

    avatarImage.src = avatar;
    avatarImage.alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    commentsFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentsFragment);
  renderedCommentsCount += nextComments.length;
  commentsShownCount.textContent = renderedCommentsCount;
  commentsLoader.classList.toggle('hidden', renderedCommentsCount >= currentComments.length);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  caption.textContent = description;
  currentComments = comments;
  renderedCommentsCount = 0;
  commentsContainer.replaceChildren();
  renderNextComments();

  commentCount.classList.remove('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', renderNextComments);

export { openBigPicture };

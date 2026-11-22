const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_PATTERN = /^#[\p{L}\p{Nd}]{1,19}$/u;

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const overlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-error'
}, false);

const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

pristine.addValidator(
  hashtagsInput,
  (value) => getHashtags(value).every((tag) => HASHTAG_PATTERN.test(tag)),
  'Хэш-тег должен начинаться с # и содержать от 1 до 19 букв или цифр после решётки',
  3,
  true
);

pristine.addValidator(
  hashtagsInput,
  (value) => getHashtags(value).length <= MAX_HASHTAG_COUNT,
  'Можно указать не больше пяти хэш-тегов',
  2,
  true
);

pristine.addValidator(
  hashtagsInput,
  (value) => {
    const hashtags = getHashtags(value).map((tag) => tag.toLowerCase());
    return new Set(hashtags).size === hashtags.length;
  },
  'Хэш-теги не должны повторяться',
  1,
  true
);

pristine.addValidator(
  descriptionInput,
  (value) => value.length <= MAX_DESCRIPTION_LENGTH,
  'Комментарий не должен быть длиннее 140 символов'
);

const closeUploadForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  pristine.reset();
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && evt.target !== hashtagsInput && evt.target !== descriptionInput) {
    evt.preventDefault();
    closeUploadForm();
  }
}

fileInput.addEventListener('change', () => {
  if (fileInput.files.length) {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }
});

cancelButton.addEventListener('click', closeUploadForm);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

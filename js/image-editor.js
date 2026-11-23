const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const EFFECTS = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

const uploadForm = document.querySelector('.img-upload__form');
const preview = uploadForm.querySelector('.img-upload__preview img');
const scaleInput = uploadForm.querySelector('.scale__control--value');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const effectsList = uploadForm.querySelector('.effects__list');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelInput = effectLevel.querySelector('.effect-level__value');
const sliderElement = effectLevel.querySelector('.effect-level__slider');

let currentEffect;

const setScale = (value) => {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
  scaleInput.value = `${scale}%`;
  preview.style.transform = `scale(${scale / MAX_SCALE})`;
};

const getSliderOptions = ({ min, max, step }) => ({
  range: { min, max },
  start: max,
  step
});

noUiSlider.create(sliderElement, {
  ...getSliderOptions(EFFECTS.chrome),
  connect: 'lower'
});

const slider = sliderElement.noUiSlider;

slider.on('update', (values, handle) => {
  if (currentEffect) {
    const value = Number(values[handle]);
    effectLevelInput.value = value;
    preview.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
  }
});

const setEffect = (effect) => {
  currentEffect = EFFECTS[effect];
  if (!currentEffect) {
    effectLevel.classList.add('hidden');
    effectLevelInput.value = '';
    preview.style.removeProperty('filter');
    return;
  }

  effectLevel.classList.remove('hidden');
  slider.updateOptions(getSliderOptions(currentEffect));
};

const resetImageEditor = () => {
  setScale(MAX_SCALE);
  setEffect('none');
};

scaleSmaller.addEventListener('click', () => {
  setScale(parseInt(scaleInput.value, 10) - SCALE_STEP);
});

scaleBigger.addEventListener('click', () => {
  setScale(parseInt(scaleInput.value, 10) + SCALE_STEP);
});

effectsList.addEventListener('change', (evt) => {
  setEffect(evt.target.value);
});

export { resetImageEditor };

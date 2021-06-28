const agreeNickname = document.querySelector('.agree__checkbox');
const blockNickname = document.querySelector('.input__block');
const maleBtn = document.querySelector('.input__gender--male');
const femaleBtn = document.querySelector('.input__gender--female');
const gender = document.querySelector('.input__gender--value');

agreeNickname.addEventListener('change', () => {
  if (agreeNickname.checked) {
    blockNickname.classList.add('hidden');
  } else {
    blockNickname.classList.remove('hidden');
  }
});

femaleBtn.addEventListener('click', () => {
  gender.value = 'female';
  maleBtn.classList.remove('selected');
  femaleBtn.classList.add('selected');
});

maleBtn.addEventListener('click', () => {
  gender.value = 'male';
  femaleBtn.classList.remove('selected');
  maleBtn.classList.add('selected');
});

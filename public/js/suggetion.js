const mailSelect = document.querySelector('.mail-select');
const mailAddress = document.querySelector('#mailAddress');

mailSelect.addEventListener('change', (event) => {
  mailAddress.value = event.target.value;
})
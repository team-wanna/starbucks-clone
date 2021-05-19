const remember = document.querySelector("#remember");
const id = document.querySelector("#id");
const loginForm = document.querySelector(".login-form-container__content");

loginForm.addEventListener("submit", () => {
  if (remember.checked) {
    remId = id.value;
    localStorage.setItem("remId", remId);
  }
});

const getId = () => {
  const remId = localStorage.getItem("remId");
  if (remId) {
    id.value = remId;
  }
};

getId();

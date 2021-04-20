const remember = document.querySelector("#remember");
const id = document.querySelector("#id");
const loginForm = document.querySelector(".login-form-container__content");

loginForm.addEventListener("submit", () => {
  // 로그인 성공한다면 조건 추가하기
  if (remember.checked) {
    remId = id.value;
    localStorage.setItem("remId", remId);
  }
});

function getId() {
  const remId = localStorage.getItem("remId");
  if (remId) {
    id.value = remId;
  }
}

getId();

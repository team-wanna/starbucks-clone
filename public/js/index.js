const containerTop = document.querySelector(".container__top");
const topImages = containerTop.querySelectorAll("img");
const topBtn = containerTop.querySelector("button");
let offset = 0;
setTimeout(() => {
  topImages[0].classList.add("active");
}, 500);
for (let ix = 1; ix < topImages.length; ix += 2) {
  offset += 1;
  setTimeout(() => {
    topImages[ix].classList.add("active");
    topImages[ix + 1].classList.add("active");
  }, 500 * offset + 500);
}
offset += 1;
setTimeout(() => {
  topBtn.classList.add("active");
}, 500 * offset + 500);

const containerBean = document.querySelector(".container__bean");
const containerFav = document.querySelector(".container__fav");
const containerReserve = document.querySelector(".container__reserve");
const containerStore = document.querySelector(".container__store");

window.addEventListener("scroll", () => {
  const remainedBeanPos = containerBean.getBoundingClientRect().top;
  const remainedFavPos = containerFav.getBoundingClientRect().top;
  const remainedReservePos = containerReserve.getBoundingClientRect().top;
  const remainedStorePos = containerStore.getBoundingClientRect().top;

  if (window.innerHeight > remainedBeanPos) {
    const beanImg = containerBean.querySelector(
      ".container__bean__wrapper__img"
    );
    const beanContent = containerBean.querySelector(
      ".container__bean__content"
    );

    beanImg.classList.add("active");
    beanContent.classList.add("active");
  }
  if (window.innerHeight > remainedFavPos) {
    const favLeft = containerFav.querySelector(".container__fav__left");

    favLeft.classList.add("active");
  }
  if (window.innerHeight > remainedReservePos) {
    const reserveRight = containerReserve.querySelector(
      ".container__reserve__right"
    );

    reserveRight.classList.add("active");
  }
  if (window.innerHeight > remainedStorePos) {
    const storeRight = containerStore.querySelector(".container__store__right");

    storeRight.classList.add("active");
  }
});

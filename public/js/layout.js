const headerNavs = document.querySelectorAll(".header__gnb_nav__item");
const headerToggles = document.querySelectorAll(".header__toggle__container");

for (let headerNav of headerNavs) {
  let headerToggle = headerToggles[Array.from(headerNavs).indexOf(headerNav)];
  headerNav.addEventListener("mouseenter", () => {
    headerToggle.classList.add("active");
  });
  headerToggle.addEventListener("mouseenter", () => {
    headerToggle.classList.add("active");
    headerNav.classList.add("nav-active");
  });
  headerNav.addEventListener("mouseleave", () => {
    headerToggle.classList.remove("active");
  });
  headerToggle.addEventListener("mouseleave", () => {
    headerToggle.classList.remove("active");
    headerNav.classList.remove("nav-active");
  });
}

const navTitles = document.querySelectorAll('.content > nav > ul > li');

navTitles.forEach((navTitle) => {
  navTitle.addEventListener('click', () => {
    const arrowIcon = navTitle.querySelector('.icon--arrow-down');
    const navContent = navTitle.querySelector('ul');

    arrowIcon.classList.toggle('icon--arrow-up');
    navContent.classList.toggle('active');
    navContent.style.maxHeight = navContent.classList.contains('active') ? `${navContent.scrollHeight}px` : 0;
  });
});
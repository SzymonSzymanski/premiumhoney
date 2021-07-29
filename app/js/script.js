'use strict';
//// FILTER LOGIC
const filters = document.querySelectorAll('.filter-box__option');

filters.forEach((filter) => {
  filter.addEventListener('click', function () {
    let selectedFilter = filter.getAttribute('data-filter');

    let itemsToShow = document.querySelectorAll(
      `.products__container [data-filter='${selectedFilter}']`
    );
    let itemsToHide = document.querySelectorAll(
      `.products__product:not([data-filter='${selectedFilter}']), 
      .filter-box__option:not([data-filter='${selectedFilter}'])`
    );

    itemsToHide.forEach((el) => {
      el.classList.remove('active');
    });

    itemsToShow.forEach((el) => {
      el.classList.add('active');
    });
  });
});

//// SCROLL SHOW MORE
const btn = document.querySelector('.header__cta');

btn.addEventListener('click', () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: '#mission', offsetY: -450 },
  });
});

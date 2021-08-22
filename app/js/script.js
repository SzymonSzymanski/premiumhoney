'use strict';

gsap.registerPlugin(ScrollTrigger);
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

//// ADD BACKGROUND TO FILTERS MENU
const filterBox = document.querySelector('.filter-box');
const filterBoxTitle = document.querySelector('.filter-box__title');
const productsContainer = document.querySelector('.products__container');
const contactContainer = document.querySelector('.contact');

gsap.fromTo(
  filterBox,
  {},
  {
    scrollTrigger: {
      trigger: productsContainer,
      endTrigger: contactContainer,
      start: 'top 98',
      end: 'center top',
      toggleClass: { targets: filterBox, className: 'sticky-bg' },
    },
  }
);

filterBoxTitle.addEventListener('click', () => {
  filterBox.classList.toggle('filters');
});

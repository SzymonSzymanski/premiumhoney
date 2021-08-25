'use strict';

gsap.registerPlugin(ScrollTrigger);

//// SET ATTR OF FIRST LETTER DOM ELEMENT
// stworzyc array firstletterow, pobrac zawartosc ustawic do kazdego attr taki jak zawartosc
const firstLetters = document.querySelectorAll('.first-letter');

firstLetters.forEach((firstLetter) =>
  firstLetter.setAttribute('first-letter', firstLetter.innerHTML)
);

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
  ScrollTrigger.matchMedia({
    '(min-width: 250px) and (max-width: 600px)': function () {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: '#mission', offsetY: -150 },
      });
    },
    '(min-width: 600px) and (max-width: 900px)': function () {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: '#mission', offsetY: -100 },
      });
    },
    '(min-width: 900px) and (max-width: 1200px)': function () {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: '#mission', offsetY: -200 },
      });
    },
    '(min-width: 1200px) and (max-width: 1856px)': function () {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: '#mission', offsetY: -350 },
      });
    },
    '(min-width: 1856px)': function () {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: '#mission', offsetY: -450 },
      });
    },
  });
});

//// ADD BACKGROUND TO FILTERS MENU
const filterBox = document.querySelector('.filter-box');
const filterBoxTitle = document.querySelector('.filter-box__title');
const productsContainer = document.querySelector('.products__container');
const contactContainer = document.querySelector('.contact');

ScrollTrigger.matchMedia({
  '(max-width: 1855px)': function () {
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
  },
});

//// SHOW FILTER OPTIONS IN MOBILE VERSION
filterBoxTitle.addEventListener('click', () => {
  filterBox.classList.toggle('filters');
});

//// SOFT SCROLL ANIMATIONS OF HEADER DECORATIONS

const headerDecorationsContainer = document.querySelector(
  '.header__decorations'
);
const headerDecorationsArrOfElements = [...headerDecorationsContainer.children];

headerDecorationsArrOfElements.forEach((headerDecoration) => {
  ScrollTrigger.matchMedia({
    '(min-width: 400px)': function () {
      gsap.to(headerDecoration, {
        y: -650,

        scrollTrigger: {
          trigger: headerDecoration,
          start: 'top top',
          end: '400 0',
          scrub: 1,
        },
      });
    },

    '(max-width: 399px)': function () {
      gsap.to(headerDecoration, {
        y: -650,

        scrollTrigger: {
          trigger: headerDecoration,
          start: 'top 30%',
          end: '400 0',
          scrub: 1,
        },
      });
    },
  });
});

//// SOFT SCROLL ANIMATIONS OF JARS DECORATIONS

const jarsContainer = document.querySelector('.jars');
const jarsArrOfElements = [...jarsContainer.children];

jarsArrOfElements.forEach((jarsDecoration) => {
  ScrollTrigger.matchMedia({
    '(min-width: 400px)': function () {
      gsap.to(jarsDecoration, {
        y: -650,

        scrollTrigger: {
          trigger: jarsDecoration,
          start: 'top 15%',
          end: '400 0',
          scrub: 1,
        },
      });
    },

    '(max-width: 399px)': function () {
      gsap.to(jarsDecoration, {
        y: -650,

        scrollTrigger: {
          trigger: jarsDecoration,
          start: 'top 30%',
          end: '400 0',
          scrub: 1,
        },
      });
    },
  });
});

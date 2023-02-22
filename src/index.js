import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'right-top',
  opacity: 0.8,
  timeout: 3000,
  clickToClose: true,
  fontSize: '16px',
});
// Варіант повідомлень Notiflix:
// Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Please choose a date in the future');
// Notiflix.Notify.failure(`Oops, there is no country with that name`);
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

// Імпорт бібліотеки SimpleLightbox і його стилів:
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallerySL = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
  // disableScroll: false,
});

const THROTTLE_DELAY = 500;
// Роблю власний throttle, бо lodash дико глючить:
const throttledScrollListener = throttle(scrollListener, THROTTLE_DELAY);
// Підключаю lodash.debounce
// const throttle = require('lodash.throttle'); // перший варіант підключення
// const _ = require('lodash'); // другий варіант підключення - всю бібліотеку разом

// Імпорт бібліотеки axios (два варіанти)
import axios from 'axios'; // працює і так
// const axios = require('axios'); // другий варіант підключення

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onLoadMore);
refs.loadMore.style.visibility = 'hidden';

let page; // Сторінка запиту. Має бути без значення за замовчуванням!!!
let request = ''; // Запит для перевірки чи він змінюється, щоби оновлювати лічильник сторінки
let remainsItems = 0; // залишок незавантажених карток

// ^ Функція самбіту форми:
async function onSubmit(e) {
  // Реалізація infinity scroll (автоскролу)
  // Слухаю скрол через 300мс
  window.addEventListener('scroll', throttledScrollListener); // Роблю затримку прослуховування скролу (1c)

  e.preventDefault(); // відміняє дію форми за замовчуванням
  refs.loadMore.style.visibility = 'hidden';
  page = 1; // скидаю лічильник

  // Якщо запит змінився:
  if (request !== e.target.elements.searchQuery.value) {
    clearDOM();
    request = e.target.elements.searchQuery.value;
  }

  // Обробляю запит і випадок помилки запиту:
  const data = await requestToPixabayBase(request, page).catch(error => {
    onError(error);
  });

  page += 1;

  // Якщо данні є (не undefined):
  if (data) {
    // Додаю розмітку, роблю кнопку LOAD MORE видимою і активною
    refs.gallery.innerHTML = markupCards(data);
    refs.loadMore.style.visibility = 'inherit';
    refs.loadMore.disabled = false;

    // Якщо картки закінчились
    if (remainsItems <= 0) {
      // Вивожу повідомлення про це, роблю кнопку LOAD MORE неактивною і знімаю слухача scroll:
      itemsIsFinished();
    }
    // Оновлюю галерею SimpleLightbox (потребує при маніпуляціях з DOM)
    gallerySL.refresh();
  }
}

// ^ Функція кнопки LoadMore та автоскролу
async function onLoadMore() {
  // Дивлюсь що зараз введено у формі:
  const form = document.querySelector('body .search-form');

  // Якщо запит змінився роблю те саме, що і при submit:
  if (request !== form.elements.searchQuery.value) {
    clearDOM();
    request = form.elements.searchQuery.value;
    page = 1; // скидаю лічильник
    refs.loadMore.style.visibility = 'hidden'; // ховаю кнопку LOAD MORE
  }

  // Якщо запит той самий, то обробляю його і випадок його помилки:
  const data = await requestToPixabayBase(request, page).catch(error => {
    onError(error);
  });

  // Якщо данні є (не undefined):
  if (data) {
    // Додаю розмітку:
    refs.gallery.insertAdjacentHTML('beforeend', markupCards(data));
    refs.loadMore.style.visibility = 'inherit';
    gallerySL.refresh();

    // Якщо картки закінчились:
    if (remainsItems <= 0) {
      itemsIsFinished();
      // refs.loadMore.disabled = true;
      // Notiflix.Notify.info(
      //   "We're sorry, but you've reached the end of search results."
      // );
      // window.removeEventListener('scroll', scrollListener);
      // console.log('window.removeEventListener');
    } else {
      // Плавний скролл лише якщо це НЕ новий запит, тобто сторінка НЕ перша
      if (page > 1) {
        // "плавний" скрол - прокручує на +2 картки по вертикалі
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
        // cardHeight - висота картки у пікселях

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }
  }

  page += 1;

  // Робить галерею по кліку на картках:
}

// ^ Функція обробки запиту:
async function requestToPixabayBase(q, page) {
  // спочатку роблю кнопку з іншим написом
  refs.loadMore.disabled = true;
  refs.loadMore.textContent = 'LOADING';

  const MY_KEY = '33366610-411111b526c4f712cf2f691e8'; // мій унікальний ключ
  const END_POINT = 'https://pixabay.com/api/';
  const per_page = 40; // кількість карток на сторінці
  // Параметри запиту:
  const searchParams = new URLSearchParams({
    key: MY_KEY,
    image_type: 'photo', // тип світлини
    orientation: 'horizontal', // орієнтація світлини
    safesearch: true, // фільтр за віком
  });
  const URL = `${END_POINT}?${searchParams}&page=${page}&per_page=${per_page}&q=${q}`;

  // Якщо запит пустий:
  if (!q) {
    clearDOM();
    throw new Error('Введіть хоч щось');
  }

  // return await axios.get(URL).then(res => res.data.hits);
  const response = await axios.get(URL);

  // Якщо в запиті нічого не знайдено (масив результату запиту === 0)
  if (response.data.hits.length === 0) {
    clearDOM();
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  // Віднімаю кількість завантаженого від загальної кількості карток:
  remainsItems = response.data.totalHits - page * per_page;
  const totalItems = response.data.totalHits;
  if (totalItems !== 0 && page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalItems} images.`);
  }

  // Повертаю кнопці LOAD MORE нормальний стан
  refs.loadMore.disabled = false;
  refs.loadMore.textContent = 'LOAD MORE';

  return response.data.hits; // повертає масив об'єктів запиту
}

// * Функція розмітки карток через map()
function markupCards(gallery) {
  return gallery
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
  <div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
    
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${downloads}
      </p>
    </div>
  </div>`;
      }
    )
    .join('');
  // * Функція розмітки карток через reduce замість map:
  // return arr.reduce(
  //   (
  //     previousValue,
  //     { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
  //   ) => {
  //     return (
  //       previousValue +
  //       `
  // <div class="photo-card">
  //   <a class="gallery__item" href="${largeImageURL}">
  //     <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
  //   </a>
  //   <div class="info">
  //     <p class="info-item">
  //       <b>Likes</b> ${likes}
  //     </p>
  //     <p class="info-item">
  //       <b>Views</b> ${views}
  //     </p>
  //     <p class="info-item">
  //       <b>Comments</b> ${comments}
  //     </p>
  //     <p class="info-item">
  //       <b>Downloads</b> ${downloads}
  //     </p>
  //   </div>
  // </div>`
  //     );
  //   },
  //   ''
  // );
}

// ~ Функція очищення розмітки
function clearDOM() {
  document.querySelector('.gallery').innerHTML = '';
}

// ~ Функція відпрацювання помилок
function onError(error) {
  refs.loadMore.style.visibility = 'hidden';
  Notiflix.Notify.failure(error.message);
}

// ~ Функція для infinity scroll:
function scrollListener(e) {
  // console.log('e', e);
  // document.documentElement.clientWidth;
  // document.documentElement.scrollHeight;
  // document.documentElement.clientTop;
  // Деструктуризація трьох рядків вище:
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight + 1 >= scrollHeight) {
    // +1 тому що браузер іноді дає розмір менше.
    // console.log('I am at bottom');
    if (remainsItems > 0) onLoadMore();
  }
}
// ~ Частина коду, що двічі повторюєтся - вивід повідомлення і знаття слухача
function itemsIsFinished() {
  refs.loadMore.disabled = true;
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
  window.removeEventListener('scroll', throttledScrollListener);
  // console.log('window.removeEventListener');
}

// ~ Власний throttle для слухача window-scroll (lodash дико глючить)
function throttle(callback, timeout) {
  let timer = null;
  return function perform(...args) {
    if (timer) return;
    timer = setTimeout(() => {
      callback(...args);
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

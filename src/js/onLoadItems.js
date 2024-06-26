import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'right-top',
  opacity: 0.8,
  timeout: 3000,
  clickToClose: true,
  fontSize: '16px',
});

import {
  setPage,
  getPage,
  setRequest,
  getRequest,
  getRemainsItems,
  gallerySL,
} from './variables';
import refs from './refs';
import fetchToPixabayBase from './fetchToPixabayBase';
import clearDOM from './clearDOM';
import markupCards from './markupCards';
import onError from './onError';
import throttledScrollListener from './throttledScrollListener';
import smoothScroll from './smoothScroll';

// ^ Функція кнопки LoadMore та автоскролу
export default async function onLoadItems() {
  // Дивлюсь що зараз введено у формі:
  const form = document.getElementById('search-form');
  const currentRequest = form.elements.searchQuery.value;

  // Якщо запит змінився:
  if (getRequest() !== currentRequest) {
    refs.loadMore.style.visibility = 'hidden'; // ховаю кнопку LOAD MORE
    clearDOM();

    setPage(1); // скидаю лічильник
    setRequest(currentRequest);
  }

  // Обробляю запит і випадок помилки запиту:
  const data = await fetchToPixabayBase(getRequest(), getPage()).catch(
    error => {
      onError(error);
    }
  );

  // Якщо данні є (не undefined):
  if (data) {
    // Додаю розмітку, роблю кнопку LOAD MORE видимою і активною
    refs.gallery.insertAdjacentHTML('beforeend', markupCards(data));
    refs.loadMore.style.visibility = 'inherit';
    refs.loadMore.disabled = false;
    // Оновлюю галерею SimpleLightbox (потребує при маніпуляціях з DOM)
    gallerySL.refresh();

    // * Реалізація infinity scroll (автоскролу)
    // Слухаю скрол через 300мс
    window.addEventListener('scroll', throttledScrollListener); // Роблю затримку прослуховування скролу (1c)

    // Якщо картки закінчились:
    if (getRemainsItems() <= 0) {
      // Вивожу повідомлення про це, роблю кнопку LOAD MORE неактивною і знімаю слухача scroll:
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMore.disabled = true;
      window.removeEventListener('scroll', throttledScrollListener);
    } else {
      // Плавний скролл лише якщо це НЕ новий запит, тобто сторінка НЕ перша
      if (getPage() > 1) {
        smoothScroll();
      }
    }
  }

  setPage(getPage() + 1);
}

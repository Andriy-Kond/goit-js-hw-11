import {
  setPage,
  getPage,
  getRemainsItems,
  getRequest,
  setRequest,
  gallerySL,
} from './variables';
import refs from './refs';
import throttledScrollListener from './throttledScrollListener';
import clearDOM from './clearDOM';
import requestToPixabayBase from './requestToPixabayBase';
import onError from './onError';
import markupCards from './markupCards';
import itemsIsFinished from './itemsIsFinished';

// ^ Функція самбіту форми:
export default async function onSubmit(e) {
  // * Реалізація infinity scroll (автоскролу)
  // Слухаю скрол через 300мс
  window.addEventListener('scroll', throttledScrollListener); // Роблю затримку прослуховування скролу (1c)

  e.preventDefault(); // відміняє дію форми за замовчуванням
  refs.loadMore.style.visibility = 'hidden';
  setPage(1); // скидаю лічильник

  // Якщо запит змінився:

  if (getRequest() !== e.target.elements.searchQuery.value) {
    clearDOM();
    setRequest(e.target.elements.searchQuery.value);
  }

  // Обробляю запит і випадок помилки запиту:
  const data = await requestToPixabayBase(getRequest(), getPage()).catch(
    error => {
      onError(error);
    }
  );

  setPage(getPage() + 1);

  // Якщо данні є (не undefined):
  if (data) {
    // Додаю розмітку, роблю кнопку LOAD MORE видимою і активною
    refs.gallery.innerHTML = markupCards(data);
    refs.loadMore.style.visibility = 'inherit';
    refs.loadMore.disabled = false;

    // Якщо картки закінчились
    if (getRemainsItems() <= 0) {
      // Вивожу повідомлення про це, роблю кнопку LOAD MORE неактивною і знімаю слухача scroll:
      itemsIsFinished();
    }
    // Оновлюю галерею SimpleLightbox (потребує при маніпуляціях з DOM)
    gallerySL.refresh();
  }
}

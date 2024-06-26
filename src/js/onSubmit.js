import markupCards from './markupCards';
import { page, request, remainsItems } from './variables';
import requestToPixabayBase from './requestToPixabayBase';
import clearDOM from './clearDOM';
import onError from './onError';
import itemsIsFinished from './itemsIsFinished';
import throttledScrollListener from './throttledScrollListener';

// ^ Функція самбіту форми:
export default async function onSubmit(e) {
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

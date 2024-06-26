import refs from './refs';
import requestToPixabayBase from './requestToPixabayBase';
import clearDOM from './clearDOM';
import markupCards from './markupCards';
import onError from './onError';
import itemsIsFinished from './itemsIsFinished';
import { page, request, remainsItems, gallerySL } from './variables';

// ^ Функція кнопки LoadMore та автоскролу
export default async function onLoadMore() {
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
}

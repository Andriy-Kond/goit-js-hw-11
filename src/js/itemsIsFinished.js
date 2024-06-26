import throttledScrollListener from './throttledScrollListener';
import refs from './refs';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'right-top',
  opacity: 0.8,
  timeout: 3000,
  clickToClose: true,
  fontSize: '16px',
});

// ~ Частина коду, що двічі повторюєтся - вивід повідомлення і знаття слухача
export default function itemsIsFinished() {
  refs.loadMore.disabled = true;
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
  window.removeEventListener('scroll', throttledScrollListener);
  // console.log('window.removeEventListener');
}

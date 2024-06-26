import refs from './refs';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'right-top',
  opacity: 0.8,
  timeout: 3000,
  clickToClose: true,
  fontSize: '16px',
});

// ~ Функція обробки помилок
export default function onError(error) {
  refs.loadMore.style.visibility = 'hidden';
  Notiflix.Notify.failure(error.message);
}

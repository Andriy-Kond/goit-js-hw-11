// Додати до інпуту автофокус через JS якщо DOM малюється вже після його додавання:
// window.onload = () => document.querySelector('.input-submit').focus();

// import Notiflix from 'notiflix';
// Notiflix.Notify.init({
//   position: 'right-top',
//   opacity: 0.8,
//   timeout: 3000,
//   clickToClose: true,
//   fontSize: '16px',
// });
// Варіант повідомлень Notiflix:
// Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Please choose a date in the future');
// Notiflix.Notify.failure(`Oops, there is no country with that name`);
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

import refs from './js/refs';
import onLoadMore from './js/onLoadMore';
import onSubmit from './js/onSubmit';

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onLoadMore);
refs.loadMore.style.visibility = 'hidden';

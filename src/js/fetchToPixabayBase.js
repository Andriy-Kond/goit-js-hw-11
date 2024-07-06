// Імпорт бібліотеки axios (два варіанти)
import axios from 'axios'; // працює і так
// const axios = require('axios'); // другий варіант підключення

import refs from './refs';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'right-top',
  opacity: 0.8,
  timeout: 3000,
  clickToClose: true,
  fontSize: '16px',
});

import refs from './refs';
// import { setRemainsItems } from './variables';
import clearDOM from './clearDOM';
import { variables } from './variables';

// ^ Функція обробки запиту:
export default async function fetchToPixabayBase(request, page) {
  // спочатку роблю кнопку з іншим написом
  refs.loadMore.disabled = true;
  refs.loadMore.textContent = 'LOADING';

  const MY_KEY = '33366610-411111b526c4f712cf2f691e8'; // мій унікальний ключ
  const END_POINT = 'https://pixabay.com/api/';
  const per_page = 10; // кількість карток на сторінці
  // Параметри запиту:
  const searchParams = new URLSearchParams({
    key: MY_KEY,
    image_type: 'photo', // тип світлини
    orientation: 'horizontal', // орієнтація світлини
    safesearch: true, // фільтр за віком
  });
  const URL = `${END_POINT}?${searchParams}&page=${page}&per_page=${per_page}&q=${request}`;

  // Якщо запит пустий:
  if (!request) {
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
  const totalItems = response.data.totalHits;
  // setRemainsItems(totalItems - page * per_page);
  variables.remainsItems = totalItems - page * per_page;

  if (totalItems !== 0 && page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalItems} images.`);
  }

  // Повертаю кнопці LOAD MORE нормальний стан
  refs.loadMore.disabled = false;
  refs.loadMore.textContent = 'LOAD MORE';

  return response.data.hits; // повертає масив об'єктів запиту
}

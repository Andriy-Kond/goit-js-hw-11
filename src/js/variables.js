// Імпорт бібліотеки SimpleLightbox і його стилів:
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallerySL = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
  // disableScroll: false,
});

let page; // Сторінка запиту. Має бути без значення за замовчуванням!!!
let request = ''; // Запит для перевірки чи він змінюється, щоби оновлювати лічильник сторінки
let remainsItems = 0; // залишок незавантажених карток

const THROTTLE_DELAY = 500;

function getPage() {
  return page;
}
function setPage(arg) {
  page = arg;
}

function getRequest() {
  return request;
}
function setRequest(arg) {
  request = arg;
}

function getRemainsItems() {
  return remainsItems;
}
function setRemainsItems(arg) {
  remainsItems = arg;
}

export {
  getPage,
  setPage,
  getRequest,
  setRequest,
  getRemainsItems,
  setRemainsItems,
  THROTTLE_DELAY,
  gallerySL,
};

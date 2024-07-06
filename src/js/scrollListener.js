import { variables } from './variables';
import onLoadItems from './onLoadItems';

// ~ Функція для infinity scroll:
export default function scrollListener(e) {
  // document.documentElement.clientWidth;
  // document.documentElement.scrollHeight;
  // document.documentElement.clientTop;

  // Деструктуризація трьох рядків вище:
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight + 1 >= scrollHeight) {
    // +1 тому що браузер іноді дає розмір менше.
    // console.log('I am at bottom');

    if (variables.remainsItems > 0) onLoadItems();
  }
}

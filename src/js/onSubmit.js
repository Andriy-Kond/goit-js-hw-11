import { setPage } from './variables';
import refs from './refs';

import throttledScrollListener from './throttledScrollListener';
import onLoadItems from './onLoadItems';
import clearDOM from './clearDOM';

// ^ Функція самбіту форми:
export default async function onSubmit(e) {
  e.preventDefault(); // відміняє дію форми за замовчуванням

  window.removeEventListener('scroll', throttledScrollListener);

  refs.submitBtn.disabled = true;
  setPage(1);
  clearDOM();
  refs.loadMore.style.visibility = 'hidden';

  await onLoadItems();
  refs.submitBtn.disabled = false;
}

import { Variables } from './variables';

import refs from './refs';

import throttledScrollListener from './throttledScrollListener';
import onLoadItems from './onLoadItems';
import clearDOM from './clearDOM';

const variables = new Variables();
// ^ Функція самбіту форми:
export default async function onSubmit(e) {
  e.preventDefault(); // відміняє дію форми за замовчуванням

  window.removeEventListener('scroll', throttledScrollListener);

  refs.submitBtn.disabled = true;
  variables.page = 1;
  clearDOM();
  refs.loadMore.style.visibility = 'hidden';

  await onLoadItems();
  refs.submitBtn.disabled = false;
}

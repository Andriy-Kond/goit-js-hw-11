import throttledScrollListener from './throttledScrollListener';
import onLoadItems from './onLoadItems';

// ^ Функція самбіту форми:
export default async function onSubmit(e) {
  // * Реалізація infinity scroll (автоскролу)
  // Слухаю скрол через 300мс
  window.addEventListener('scroll', throttledScrollListener); // Роблю затримку прослуховування скролу (1c)

  e.preventDefault(); // відміняє дію форми за замовчуванням

  await onLoadItems();
}

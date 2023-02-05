// const END_POINT = 'https://pixabay.com/api/';

// const searchParams = new URLSearchParams({
//   MY_KEY: '33366610-411111b526c4f712cf2f691e8',
//   image_type: 'photo', // тип світлини
//   orientation: 'horizontal', // орієнтація світлини
//   safesearch: true, // фільтр за віком
// });

// async function fetchCountries(q) {
//   const res = await fetch(`${END_POINT}?${searchParams}&${q}`);
//   return await res.json();
// }

// export default { fetchCountries };

// const queryRequest = {
//   webformatURL: 'http://', // посилання на маленьку світлину
//   largeImageURL: 'http://', // посилання на велику світлину
//   tags: '', // рядок з описом зображення (для атрибуту alt)
//   likes: 0, // кількість вподобайок
//   views: 0, // кількість переглядів
//   comments: 0, // кількість коментарів
//   downloads: 0, // кількість завантажень
// };

// // * Список параметрів рядка запиту, які обов'язково необхідно вказати:
// const queryOptions = {
//   key: '33366610-411111b526c4f712cf2f691e8', // мій унікальний ключ доступу до API.
//   q: '', // термін для пошуку. Те, що буде вводити користувач.
//   image_type: 'photo', // тип світлини
//   orientation: 'horizontal', // орієнтація світлини
//   safesearch: true, // фільтр за віком
// };

// // * У відповіді буде масив зображень, що задовольнили критерії параметрів запиту. Кожне зображення описується об'єктом, з якого тобі цікаві тільки наступні властивості:
// const queryRequest = {
//   webformatURL: 'http://', // посилання на маленьку світлину
//   largeImageURL: 'http://', // посилання на велику світлину
//   tags: '', // рядок з описом зображення (для атрибуту alt)
//   likes: 0, // кількість вподобайок
//   views: 0, // кількість переглядів
//   comments: 0, // кількість коментарів
//   downloads: 0, // кількість завантажень
// };

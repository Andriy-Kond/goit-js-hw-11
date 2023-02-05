// // * Markup SimpleLightbox
// // <div class="gallery">
// //     <a href="images/image1.jpg"><img src="images/thumbs/thumb1.jpg" alt="" title=""/></a>
// //     <a href="images/image2.jpg"><img src="images/thumbs/thumb2.jpg" alt="" title="Beautiful Image"/></a>
// // </div>
// // Бібліотека містить метод refresh(), який обов'язково потрібно викликати щоразу після додавання нової групи карток зображень.
// // Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.
// // import { galleryItems } from './gallery-items.js';

// // Функція створення розмітки галереї:
// function createGalleryMarkup(gallery) {
//   return gallery
//     .map(({ preview, description, original }) => {
//       return `
//       <li>
//         <a class="gallery__item" href="${original}">
//           <img class="gallery__image" src="${preview}" alt="${description}" />
//         </a>
//       </li>
//     `;
//     })
//     .join('');
// }

// // Селектор галереї
// const mainGallery = document.querySelector('.gallery');

// const cardMarkup = createGalleryMarkup(galleryItems);
// mainGallery.insertAdjacentHTML('beforeend', cardMarkup);

// new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// export { createGalleryMarkup };

// // Імпорт функції галереї (два варіанти, перший ніби має імпортувати код повністю)
// // import "./lightbox.js"
// import { createGalleryMarkup } from './lightbox';

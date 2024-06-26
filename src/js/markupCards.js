// * Функція розмітки карток через map()
export default function markupCards(gallery) {
  return gallery
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
  <div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
    
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${downloads}
      </p>
    </div>
  </div>`;
      }
    )
    .join('');

  // * Функція розмітки карток через reduce замість map:
  // ---- // ----
  // return gallery.reduce(
  //   (
  //     previousValue,
  //     { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
  //   ) => {
  //     return (
  //       previousValue +
  //       `
  // <div class="photo-card">
  //   <a class="gallery__item" href="${largeImageURL}">
  //     <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
  //   </a>
  //   <div class="info">
  //     <p class="info-item">
  //       <b>Likes</b> ${likes}
  //     </p>
  //     <p class="info-item">
  //       <b>Views</b> ${views}
  //     </p>
  //     <p class="info-item">
  //       <b>Comments</b> ${comments}
  //     </p>
  //     <p class="info-item">
  //       <b>Downloads</b> ${downloads}
  //     </p>
  //   </div>
  // </div>`
  //     );
  //   },
  //   ''
  // );
}

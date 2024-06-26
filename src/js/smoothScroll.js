export default function smoothScroll() {
  // "плавний" скрол - прокручує на +2 картки по вертикалі
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  // cardHeight - висота картки у пікселях

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

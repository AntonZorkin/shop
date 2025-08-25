// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';

// let lightbox;
// export const openModal = () => {
//   if (!lightbox) {
//     lightbox = new SimpleLightbox('.products li', {
//       captionsData: 'alt',
//       captionPosition: 'bottom',
//       captionDelay: 250,
//     });
//   } else {
//     lightbox.refresh();
//   }
// };

export function openModal() {
  refs.modalRoot.classList.add('modal--is-open');
  document.addEventListener('keydown', onEscKeyDown);
}

export const closeModal = () => {
  refs.modalRoot.classList.remove('modal--is-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(e) {
  if (
    refs.modalRoot.classList.contains('modal--is-open') &&
    e.key === 'Escape'
  ) {
    closeModal();
  }
}

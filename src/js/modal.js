import { refs } from './refs';

export function openModal() {
  refs.modalRoot.classList.add('modal--is-open');
  document.addEventListener('keydown', onEscKeyDown);
  refs.modalRoot.addEventListener('click', onOutOfModalClick);
}

export const closeModal = () => {
  refs.modalRoot.classList.remove('modal--is-open');
  document.removeEventListener('keydown', onEscKeyDown);
  refs.modalRoot.removeEventListener('click', onOutOfModalClick);
  delete refs.modalRoot.dataset.id;
};

export const onEscKeyDown = e => {
  if (
    refs.modalRoot.classList.contains('modal--is-open') &&
    e.key === 'Escape'
  ) {
    closeModal();
  }
};

export const onOutOfModalClick = e => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
};

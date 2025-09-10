import { refs } from './refs';
import { checkLS } from './helpers';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

refs.modalElem.addEventListener('click', e => {
  const buyBtn = e.target.closest('.js-buy-btn');
  if (!buyBtn) return;

  onBuyBtnClick();
});

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

export const onBuyBtnClick = () => {
  const productId = refs.modalRoot.dataset.id;
  if (!productId) return;
  let cart = checkLS('cart');
  if (cart.includes(productId)) {
    const index = cart.indexOf(productId);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', String(cart.length));
  }

  let wish = checkLS('wishlist');
  if (wish.includes(productId)) {
    const index = wish.indexOf(productId);
    wish.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wish));
    localStorage.setItem('wishlistCount', String(wish.length));
  }
  iziToast.success({
    message: 'Product added to your order.',
    timeout: 3000,
    position: 'topCenter',
  });
  closeModal();
};

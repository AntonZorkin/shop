//Логіка сторінки Wishlist
import iziToast from 'izitoast';
import { checkLS, addToCartById, removeFromWishlistById } from './js/helpers';
import { refs } from './js/refs';
import { onWish } from './js/handlers';
import { onProductsClick, onRemoveFromWishClick } from './js/handlers.js';
import { closeModal, onBuyBtnClick } from './js/modal.js';

onWish();
const updateBadges = () => {
  refs.cartNumElem.textContent = checkLS('cart').length;
  refs.wishNumElem.textContent = checkLS('wishlist').length;
};
updateBadges();

refs.productsElem.addEventListener('click', onProductsClick);
refs.modalCloseElem.addEventListener('click', closeModal);

refs.modalRoot.addEventListener('click', e => {
  const wishBtn = e.target.closest('.js-wish-btn');
  const cartBtn = e.target.closest('.js-cart-btn');
  const buyBtn = e.target.closest('.js-buy-btn');
  if (wishBtn) {
    onRemoveFromWishClick({ currentTarget: wishBtn });
    closeModal();
    onWish();
    updateBadges();

    return;
  } else if (cartBtn) {
    //при натисканні додати в кошик видалити з вішліста
    const id =
      e.target.closest('[data-id]')?.dataset.id || refs.modalRoot.dataset.id;
    if (!id) return;
    addToCartById(id);
    removeFromWishlistById(id);
    const wishBtnInModal = refs.modalRoot.querySelector('.js-wish-btn');
    if (wishBtnInModal) {
      wishBtnInModal.textContent = 'Add to wishlist';
      wishBtnInModal.classList.remove('btn--in-wishlist');
    }
    updateBadges();
    onWish();
    return;
  } else if (buyBtn) {
    onBuyBtnClick();
    onWish();
    const savedWish = checkLS('wishlist');
    refs.wishNumElem.textContent = savedWish.length;
  } else return;
});

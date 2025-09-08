//Логіка сторінки Wishlist
import { checkLS } from './js/helpers';
import { refs } from './js/refs';
import { onWish, onCartBtnClick } from './js/handlers';
import { onProductsClick, onRemoveFromWishClick } from './js/handlers.js';
import { closeModal } from './js/modal.js';

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
    const wishBtn = refs.modalRoot.querySelector('.js-wish-btn');
    onCartBtnClick({ currentTarget: cartBtn });
    onRemoveFromWishClick({ currentTarget: wishBtn });
    updateBadges();
    onWish();
  } else return; //!додати кнопку купівлі
});

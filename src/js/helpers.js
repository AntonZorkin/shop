import { refs } from './refs';
import { totalPages } from './products-api';
import { currentPage } from './handlers';
import iziToast from 'izitoast';

export let categoryName = 'All';
export const activeFirstBtn = () => {
  const firstBtn = document.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
    categoryName = firstBtn.textContent;
  }
};

export const activeBtn = e => {
  const targetBtn = e.target.closest('.categories__btn');
  if (!targetBtn) return;

  const previousActiveBtn = document.querySelector('.categories__btn--active');
  if (previousActiveBtn) {
    previousActiveBtn.classList.remove('categories__btn--active');
  }
  targetBtn.classList.add('categories__btn--active');
  categoryName = targetBtn.textContent;
  return;
};

export const activateLoadMore = () => {
  if (totalPages > currentPage) {
    refs.loadMoreElem.classList.remove('is-hidden');
  } else {
    refs.loadMoreElem.classList.add('is-hidden');
    iziToast.info({
      message: 'No more products available.',
      timeout: 3000,
      position: 'topCenter',
      color: 'yellow',
    });
  }
};

export const checkLS = key => {
  let value = localStorage.getItem(key);
  if (value === null || value === '') {
    localStorage.setItem(key, '[]');
    return [];
  } else {
    try {
      value = JSON.parse(localStorage.getItem(key));
      if (Array.isArray(value)) {
        return value;
      } else {
        return [];
      }
    } catch (error) {
      localStorage.setItem(key, '[]');
      return [];
    }
  }
};

export const addToCartById = id => {
  const cart = checkLS('cart');
  if (!cart.includes(String(id))) {
    cart.push(String(id));
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeFromWishlistById = id => {
  const wishlist = checkLS('wishlist');
  const updated = wishlist.filter(itemId => String(itemId) !== String(id));
  localStorage.setItem('wishlist', JSON.stringify(updated));
};

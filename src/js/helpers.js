//helpers
import { refs } from './refs';
import { totalPages } from './products-api';
import { currentPage } from './handlers';

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
  }
};

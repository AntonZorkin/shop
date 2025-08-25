//Логіка сторінки Home
import {
  init,
  onProductsClick,
  onLoadMoreClick,
  onCategoreClick,
  onFormSubmit,
} from './js/handlers';
import { closeModal } from './js/modal';

import { refs } from './js/refs';

init();
refs.categoriesElem.addEventListener('click', onCategoreClick);
refs.loadMoreElem.addEventListener('click', onLoadMoreClick);
refs.productsElem.addEventListener('click', onProductsClick);
refs.modalCloseElem.addEventListener('click', closeModal);
refs.formElem.addEventListener('submit', onFormSubmit);

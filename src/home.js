//Логіка сторінки Home
import {
  init,
  onProductsClick,
  onLoadMoreClick,
  onCategoreClick,
  onFormSubmit,
  onThemeBtn,
} from './js/handlers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';
import 'izitoast/dist/css/iziToast.min.css';

init();
refs.categoriesElem.addEventListener('click', onCategoreClick);
refs.loadMoreElem.addEventListener('click', onLoadMoreClick);
refs.productsElem.addEventListener('click', onProductsClick);
refs.modalCloseElem.addEventListener('click', closeModal);
refs.formElem.addEventListener('submit', onFormSubmit);
refs.themeElem.addEventListener('click', onThemeBtn);

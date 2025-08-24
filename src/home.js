//Логіка сторінки Home
import { init, onProductsClick } from './js/handlers';
import { refs } from './js/refs';

init();
refs.productsElem.addEventListener('click', onProductsClick);

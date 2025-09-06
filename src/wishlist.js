//Логіка сторінки Wishlist
import { checkLS } from './js/helpers';
import { refs } from './js/refs';
import { onWish } from './js/handlers';

onWish();
const savedCart = checkLS('cart');
refs.cartNumElem.textContent = savedCart.length;
const savedWish = checkLS('wishlist');
refs.wishNumElem.textContent = savedWish.length;

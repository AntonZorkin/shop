//Логіка сторінки Cart
import { checkLS } from './js/helpers.js';
import { refs } from './js/refs.js';
import { getProductById } from './js/products-api.js';
import {
  onCart,
  onProductsClick,
  onRemoveFromCartClick,
} from './js/handlers.js';
import { closeModal, onBuyBtnClick } from './js/modal.js';

onCart();
const savedCart = checkLS('cart');
refs.cartNumElem.textContent = savedCart.length;
document.querySelector('.js-cart-number').textContent = savedCart.length;
const savedWish = checkLS('wishlist');
refs.wishNumElem.textContent = savedWish.length;

const collectPrices = async savedCart => {
  let prices = [];
  for (let i = 0; i < savedCart.length; i++) {
    const data = await getProductById(savedCart[i]);
    prices.push(data.price);
  }
  return prices;
};

let totalPrice;
const initCartBage = async () => {
  const prices = await collectPrices(checkLS('cart'));
  totalPrice = prices.reduce((sum, e) => {
    return sum + e;
  }, 0);
  document.querySelector('.js-cart-price').textContent = `$${totalPrice.toFixed(
    2
  )}`;
};
initCartBage();
refs.productsElem.addEventListener('click', onProductsClick);
refs.modalCloseElem.addEventListener('click', closeModal);

refs.modalRoot.addEventListener('click', e => {
  const cartBtn = e.target.closest('.js-cart-btn');
  if (cartBtn === null) return;
  onRemoveFromCartClick({ currentTarget: cartBtn });
  closeModal();
  onCart();
  initCartBage();
  const savedCart = checkLS('cart');
  refs.cartNumElem.textContent = savedCart.length;
  document.querySelector('.js-cart-number').textContent = savedCart.length;
});

refs.modalRoot.addEventListener('click', e => {
  const buytBtn = e.target.closest('.js-buy-btn');
  if (buytBtn === null) return;
  onBuyBtnClick();
  onCart();
  initCartBage();
  const savedCart = checkLS('cart');
  refs.cartNumElem.textContent = savedCart.length;
  document.querySelector('.js-cart-number').textContent = savedCart.length;
});

//Логіка сторінки Cart
import { checkLS } from './js/helpers.js';
import { refs } from './js/refs.js';
import { getProductById } from './js/products-api.js';
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
const initCartPage = async () => {
  const prices = await collectPrices(savedCart);
  totalPrice = prices.reduce((sum, e) => {
    return sum + e;
  }, 0);
  console.log(totalPrice);
  document.querySelector('.js-cart-price').textContent = `$${totalPrice}`;
};
initCartPage();

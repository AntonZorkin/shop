import {
  createCategories,
  createProducts,
  createModal,
} from './render-function';
import {
  getCategories,
  getProductsByCategory,
  getProducts,
  getProductById,
  getProductByName,
} from './products-api';
import { activeFirstBtn, activeBtn, categoryName, checkLS } from './helpers';
import { openModal } from './modal';
import { refs } from './refs';

export let currentPage = 1;
export const init = async () => {
  //* перевірка localStorage на наявність у кошику та у wishlist товарів===========
  let savedCart = localStorage.getItem('cart');
  if (savedCart === null || savedCart === '') {
    localStorage.setItem('cart', '[]');
    localStorage.setItem('cartCount', '0');
    refs.cartNumElem.textContent = 0;
  } else {
    localStorage.setItem(
      'cartCount',
      JSON.parse(localStorage.getItem('cart')).length
    );
    refs.cartNumElem.textContent = localStorage.getItem('cartCount');
  }

  let savedWish = localStorage.getItem('wishlist');
  if (savedWish === null || savedWish === '') {
    localStorage.setItem('wishlist', '[]');
    localStorage.setItem('wishlistCount', '0');
    refs.wishNumElem.textContent = 0;
  } else {
    localStorage.setItem(
      'wishlistCount',
      JSON.parse(localStorage.getItem('wishlist')).length
    );
    refs.wishNumElem.textContent = localStorage.getItem('wishlistCount');
  }

  //*===========================================

  let savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    localStorage.setItem('theme', 'light');
    savedTheme = 'light';
  }
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
  }

  const data = await getCategories();
  const categoriesMarkup = createCategories(['All', ...data]);
  refs.categoriesElem.innerHTML = categoriesMarkup;
  activeFirstBtn();
  const products = await getProducts();
  const productsMarkup = createProducts(products);
  refs.productsElem.innerHTML = productsMarkup;
};

export const onCategoreClick = async e => {
  activeBtn(e);
  currentPage = 1;
  try {
    const products =
      categoryName === 'All'
        ? await getProducts()
        : await getProductsByCategory();

    refs.productsElem.innerHTML = createProducts(products);
  } catch (error) {
    throw error;
  }
};

export const onLoadMoreClick = async e => {
  currentPage += 1;
  try {
    let products;
    if (categoryName && categoryName !== 'All') {
      products = await getProductsByCategory();
    } else {
      products = await getProducts();
    }
    const productsMarkup = createProducts(products);
    refs.productsElem.insertAdjacentHTML('beforeend', productsMarkup);
  } catch (error) {
    throw error;
  }
};

let currentProductId;
export const onProductsClick = async e => {
  const li = e.target.closest('.products__item');
  if (!li) return;
  try {
    const productId = Number(li.dataset.id);
    const data = await getProductById(productId);
    refs.modalElem.innerHTML = createModal(data);
    refs.modalRoot.dataset.id = String(data.id);
    openModal();
    const cartBtnElem = refs.modalRoot.querySelector('.js-cart-btn');

    currentProductId = String(data.id);

    let storageProductId = checkLS('cart');

    if (storageProductId.includes(currentProductId)) {
      cartBtnElem.textContent = 'Remove from cart';
      cartBtnElem.classList.add('in-cart');
      cartBtnElem.addEventListener('click', onRemoveFromCartClick);
    } else {
      cartBtnElem.textContent = 'Add to cart';
      cartBtnElem.addEventListener('click', onCartBtnClick);
    }

    //*======================================================
    const wishBtnElem = refs.modalRoot.querySelector('.js-wish-btn');

    let storageWishProductId = checkLS('wishlist');

    if (storageWishProductId.includes(currentProductId)) {
      wishBtnElem.textContent = 'Remove from Wishlist';
      wishBtnElem.classList.add('in-wish');
      wishBtnElem.addEventListener('click', onRemoveFromWishClick);
    } else {
      wishBtnElem.textContent = 'Add to Wishlist';
      wishBtnElem.addEventListener('click', onWishBtnClick);
    }
  } catch (error) {
    throw error;
  }
};

export const onCartBtnClick = e => {
  const targetBtn = e.currentTarget;
  let storageProductId = checkLS('cart');
  if (!storageProductId.includes(currentProductId)) {
    storageProductId.push(currentProductId);
    targetBtn.textContent = 'Remove from cart';
    targetBtn.classList.add('in-cart');
    targetBtn.removeEventListener('click', onCartBtnClick);
    targetBtn.addEventListener('click', onRemoveFromCartClick);
  }
  localStorage.setItem('cart', JSON.stringify(storageProductId));
  refs.cartNumElem.textContent = storageProductId.length;
  localStorage.setItem('cartCount', String(storageProductId.length));
};

//*======================================================
export const onWishBtnClick = e => {
  const targetBtn = e.currentTarget;
  let storageWishProductId = checkLS('wishlist');
  if (!storageWishProductId.includes(currentProductId)) {
    storageWishProductId.push(currentProductId);
    targetBtn.textContent = 'Remove from Wishlist';
    targetBtn.classList.add('in-wishlist');
    targetBtn.removeEventListener('click', onWishBtnClick);
    targetBtn.addEventListener('click', onRemoveFromWishClick);
  }
  refs.wishNumElem.textContent = storageWishProductId.length;
  localStorage.setItem('wishlist', JSON.stringify(storageWishProductId));
  localStorage.setItem('wishlistCount', String(storageWishProductId.length));
};
//*======================================================

export const onRemoveFromCartClick = e => {
  const targetBtn = e.currentTarget;
  let storageProductId = checkLS('cart');
  if (storageProductId.includes(currentProductId)) {
    const idIndex = storageProductId.indexOf(currentProductId);
    storageProductId.splice(idIndex, 1);
    targetBtn.textContent = 'Add to cart';
    targetBtn.classList.remove('in-cart');
    targetBtn.removeEventListener('click', onRemoveFromCartClick);
    targetBtn.addEventListener('click', onCartBtnClick);
  }
  localStorage.setItem('cart', JSON.stringify(storageProductId));
  refs.cartNumElem.textContent = storageProductId.length;
  localStorage.setItem('cartCount', String(storageProductId.length));
};
//*======================================================
export const onRemoveFromWishClick = e => {
  const targetBtn = e.currentTarget;
  let storageWishProductId = checkLS('wishlist');
  if (storageWishProductId.includes(currentProductId)) {
    const idIndex = storageWishProductId.indexOf(currentProductId);
    storageWishProductId.splice(idIndex, 1);
    targetBtn.textContent = 'Add to Wishlist';
    targetBtn.classList.remove('in-wishlist');
    targetBtn.removeEventListener('click', onRemoveFromWishClick);
    targetBtn.addEventListener('click', onWishBtnClick);
  }
  localStorage.setItem('wishlist', JSON.stringify(storageWishProductId));
  refs.wishNumElem.textContent = storageWishProductId.length;
  localStorage.setItem('wishlistCount', String(storageWishProductId.length));
};
//*======================================================

export let productName;
export const onFormSubmit = async e => {
  e.preventDefault();
  productName = refs.inputElem.value.trim();
  const products = await getProductByName(productName);
  if (products.length === 0) {
    //!!!!!!!!!!!!!!!!!!!!!!!! додати ізітост
  }
  const productsByNameMarkup = createProducts(products);
  refs.productsElem.innerHTML = productsByNameMarkup;
};

export const onThemeBtn = e => {
  const savedTheme = localStorage.getItem('theme');

  if (!savedTheme) {
    localStorage.setItem('theme', 'light');
  }
  if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
};

export const onCart = async () => {
  let savedCart = checkLS('cart');
  if (!Array.isArray(savedCart)) savedCart = [];
  if (savedCart.length === 0) {
    //!додати повідомлення «Cart is empty»
    return;
  }
  savedCart = savedCart.map(id => Number(id)).filter(n => Number.isFinite(n));
  let cartProducts = [];
  for (let i = 0; i < savedCart.length; i++) {
    cartProducts.push(getProductById(savedCart[i]));
  }
  cartProducts = await Promise.allSettled(cartProducts);
  const existingProducts = [];
  for (let i = 0; i < cartProducts.length; i++) {
    const res = cartProducts[i];
    if (res.status === 'fulfilled') {
      existingProducts.push(res.value);
    } else {
      //! вивести повідомлення 'Failed to load product НАЗВА';
    }
  }
  if (existingProducts.length === 0) {
    //!додати повідомлення «Cart is empty»
    return;
  }
  const cartMarkup = createProducts(existingProducts);
  refs.cartProducts.innerHTML = cartMarkup;
};

export const onWish = async () => {
  let savedWish = checkLS('wishlist');
  if (!Array.isArray(savedWish)) savedWish = [];
  if (savedWish.length === 0) {
    //!додати повідомлення «Wishlist is empty»
    return;
  }
  //???========================================
  savedWish = savedWish.map(id => Number(id)).filter(n => Number.isFinite(n));
  let wishProducts = [];
  for (let i = 0; i < savedWish.length; i++) {
    wishProducts.push(getProductById(savedWish[i]));
  }
  wishProducts = await Promise.allSettled(wishProducts);
  const existingProducts = [];
  for (let i = 0; i < wishProducts.length; i++) {
    const res = wishProducts[i];
    if (res.status === 'fulfilled') {
      existingProducts.push(res.value);
    } else {
      //! вивести повідомлення 'Failed to load product НАЗВА';
    }
  }
  if (existingProducts.length === 0) {
    //!додати повідомлення «Wishlist is empty»
    return;
  }
  const cartMarkup = createProducts(existingProducts);
  refs.wishProducts.innerHTML = cartMarkup;
};

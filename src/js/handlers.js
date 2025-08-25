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
import { activeFirstBtn, activeBtn, categoryName } from './helpers';
import { openModal } from './modal';
import { refs } from './refs';

export let currentPage = 1;

export const init = async () => {
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

export const onProductsClick = async e => {
  const li = e.target.closest('.products__item');
  if (!li) return;
  try {
    const productId = Number(li.dataset.id);
    const data = await getProductById(productId);
    refs.modalElem.innerHTML = createModal(data);
    openModal();
  } catch (error) {
    throw error;
  }
};

export let productName;
export const onFormSubmit = async e => {
  e.preventDefault();
  productName = refs.inputElem.value.trim();
  const products = await getProductByName(productName);
  if (products.length === 0) {
    /////////////////////////////// додати ізітост
  }
  const productsByNameMarkup = createProducts(products);
  refs.productsElem.innerHTML = productsByNameMarkup;
};

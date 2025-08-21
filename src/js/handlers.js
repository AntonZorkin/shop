import { createCategories, createProducts } from './render-function';
import {
  getCategories,
  getProductsByCategory,
  getProducts,
} from './products-api';
import { activeFirstBtn, activeBtn, categoryName } from './helpers';
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

refs.categoriesElem.addEventListener('click', async e => {
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
});

refs.loadMoreElem.addEventListener('click', async e => {
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
});

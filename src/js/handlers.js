import { createCategories, createProducts } from './render-function';
import { getCategories, getProducts } from './products-api';
import { activeBtn } from './helpers';

export const init = async () => {
  const data = await getCategories();
  createCategories(['All', ...data]);
  activeBtn();
  const products = await getProducts();
  createProducts(products);
};

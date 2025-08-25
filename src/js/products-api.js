import axios from 'axios';
import { BASE_URL, ENDPOINT, LIMIT } from './constants';
import { categoryName, activateLoadMore } from './helpers';
import { refs } from './refs';
import { currentPage, productName } from './handlers';

axios.defaults.baseURL = BASE_URL;

export async function getCategories() {
  try {
    const response = await axios.get(`${ENDPOINT.CATEGORIES}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

export let totalPages;

export async function getProductsByCategory() {
  let params = new URLSearchParams({
    limit: LIMIT,
    skip: (currentPage - 1) * LIMIT,
  });
  try {
    const response = await axios.get(`${ENDPOINT.CATEGORY}${categoryName}`, {
      params,
    });
    const data = response.data;
    totalPages = Math.ceil(data.total / LIMIT);
    activateLoadMore();
    return data.products;
  } catch (error) {
    throw error;
  }
}

export async function getProducts() {
  let params = new URLSearchParams({
    limit: LIMIT,
    skip: (currentPage - 1) * LIMIT,
  });
  try {
    const response = await axios.get(`${ENDPOINT.PRODUCTS}`, { params });
    const data = response.data;
    totalPages = Math.ceil(data.total / LIMIT);
    activateLoadMore();
    return data.products;
  } catch (error) {
    throw error;
  }
}

export const getProductById = async productId => {
  try {
    const response = await axios.get(`${ENDPOINT.ID}${productId}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductByName = async productName => {
  let params = new URLSearchParams({
    limit: LIMIT,
    skip: (currentPage - 1) * LIMIT,
  });
  try {
    const response = await axios.get(`${ENDPOINT.NAME}${productName}`, {
      params,
    });
    const data = response.data;
    return data.products;
  } catch (error) {
    throw error;
  }
};

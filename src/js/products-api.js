import axios from 'axios';
import { BASE_URL, ENDPOINT } from './constants';

axios.defaults.baseURL = BASE_URL;

export async function getCategories() {
  try {
    const response = await axios.get(`${ENDPOINT.CATEGORY}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

const currentPage = 1;
export async function getProducts() {
  const params = new URLSearchParams({
    limit: 12,
    skip: (currentPage - 1) * 12,
  });

  try {
    const response = await axios.get(`${ENDPOINT.PRODUCTS}`, { params });
    const data = response.data.products;
    return data;
  } catch (error) {
    throw error;
  }
}

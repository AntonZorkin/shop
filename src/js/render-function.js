import { refs } from './refs';

export const createCategories = data => {
  const markup = data
    .map(item => {
      return `<li class="categories__item">
   <button class="categories__btn" type="button">${item}</button>
 </li>`;
    })
    .join('');
  refs.categoriesElem.innerHTML = markup;
};

export const createProducts = data => {
  const markup = data
    .map(item => {
      return `
    <li class="products__item" data-id="${item.id}">
    <img class="products__image" src="${item.thumbnail}" alt="${item.description}"/>
    <p class="products__title">${item.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${item.brand}</span></p>
    <p class="products__category">Category: ${item.category}</p>
    <p class="products__price">Price: ${item.price}$</p>
 </li>`;
    })
    .join('');
  refs.productsElem.insertAdjacentHTML('beforeend', markup);
};

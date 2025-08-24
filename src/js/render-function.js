import { refs } from './refs';

export const createCategories = data =>
  data
    .map(
      item => `<li class="categories__item">
   <button class="categories__btn" type="button">${item}</button>
 </li>`
    )
    .join('');

export const createProducts = data =>
  data
    .map(
      item => `
  <li class="products__item" data-id="${item.id}">
    <img class="products__image" src="${item.thumbnail}" alt="${item.description}"/>
    <p class="products__title">${item.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${item.brand}</span></p>
    <p class="products__category">Category: ${item.category}</p>
    <p class="products__price">Price: ${item.price}$</p>
  </li>`
    )
    .join('');

export const createModal = data =>
  `<img class="modal-product__img" src="${
    data.images?.[0] ?? data.thumbnail
  }" alt="${data.title || 'Product image'}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${data.title}</p>
        <ul class="modal-product__tags">${data.tags}</ul>
        <p class="modal-product__description">${data.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${
          data.shippingInformation
        }</p>
        <p class="modal-product__return-policy">Return Policy: ${
          data.returnPolicy
        }</p>
        <p class="modal-product__price">Price: ${data.price}$</p>
             
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;

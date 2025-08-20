import"./assets/styles-JE8YjOlG.js";import{a as s}from"./assets/vendor-N5iQpiFS.js";const c={categoriesElem:document.querySelector(".categories"),productsElem:document.querySelector(".products"),loadMoreElem:document.querySelector(".load-more-btn"),searchBtnElem:document.querySelector(".search-form"),wishElem:document.querySelector(".js-wish-btn"),cartElem:document.querySelector(".js-cart-btn")},a=t=>{const r=t.map(e=>`<li class="categories__item">
   <button class="categories__btn" type="button">${e}</button>
 </li>`).join("");c.categoriesElem.innerHTML=r},n=t=>{const r=t.map(e=>`
    <li class="products__item" data-id="${e.id}">
    <img class="products__image" src="${e.thumbnail}" alt="${e.description}"/>
    <p class="products__title">${e.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${e.brand}</span></p>
    <p class="products__category">Category: ${e.category}</p>
    <p class="products__price">Price: ${e.price}$</p>
 </li>`).join("");c.productsElem.insertAdjacentHTML("beforeend",r)},d="https://dummyjson.com/",o={CATEGORY:"products/category-list",PRODUCTS:"products?"};s.defaults.baseURL=d;async function i(){try{return(await s.get(`${o.CATEGORY}`)).data}catch(t){throw t}}const u=1;async function l(){const t=new URLSearchParams({limit:12,skip:(u-1)*12});try{return(await s.get(`${o.PRODUCTS}`,{params:t})).data.products}catch(r){throw r}}const p=()=>{const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")},m=async()=>{const t=await i();a(["All",...t]),p();const r=await l();n(r)};m();
//# sourceMappingURL=index.js.map

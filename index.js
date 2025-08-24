import"./assets/styles-JE8YjOlG.js";import{a}from"./assets/vendor-N5iQpiFS.js";const c={categoriesElem:document.querySelector(".categories"),productsElem:document.querySelector(".products"),categoryElem:document.querySelector(".categories__item"),loadMoreElem:document.querySelector(".load-more-btn"),searchBtnElem:document.querySelector(".search-form"),wishElem:document.querySelector(".js-wish-btn"),cartElem:document.querySelector(".js-cart-btn"),modalElem:document.querySelector(".modal-product"),modalRoot:document.querySelector(".modal")},g=e=>e.map(t=>`<li class="categories__item">
   <button class="categories__btn" type="button">${t}</button>
 </li>`).join(""),d=e=>e.map(t=>`
  <li class="products__item" data-id="${t.id}">
    <img class="products__image" src="${t.thumbnail}" alt="${t.description}"/>
    <p class="products__title">${t.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${t.brand}</span></p>
    <p class="products__category">Category: ${t.category}</p>
    <p class="products__price">Price: ${t.price}$</p>
  </li>`).join(""),y=e=>{var t;return`<img class="modal-product__img" src="${((t=e.images)==null?void 0:t[0])??e.thumbnail}" alt="${e.title||"Product image"}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${e.title}</p>
        <ul class="modal-product__tags">${e.tags}</ul>
        <p class="modal-product__description">${e.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${e.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${e.returnPolicy}</p>
        <p class="modal-product__price">Price: ${e.price}$</p>
             
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`},E="https://dummyjson.com/",i={CATEGORIES:"products/category-list",PRODUCTS:"products?",CATEGORY:"products/category/",ID:"products/"},r=12;let s="All";const h=()=>{const e=document.querySelector(".categories__btn");e&&(e.classList.add("categories__btn--active"),s=e.textContent)},b=e=>{const t=e.target.closest(".categories__btn");if(!t)return;const o=document.querySelector(".categories__btn--active");o&&o.classList.remove("categories__btn--active"),t.classList.add("categories__btn--active"),s=t.textContent},m=()=>{u>n?c.loadMoreElem.classList.remove("is-hidden"):c.loadMoreElem.classList.add("is-hidden")};a.defaults.baseURL=E;async function $(){try{return(await a.get(`${i.CATEGORIES}`)).data}catch(e){throw e}}let u;async function _(){let e=new URLSearchParams({limit:r,skip:(n-1)*r});try{const o=(await a.get(`${i.CATEGORY}${s}`,{params:e})).data;return u=Math.ceil(o.total/r),m(),o.products}catch(t){throw t}}async function p(){let e=new URLSearchParams({limit:r,skip:(n-1)*r});try{const o=(await a.get(`${i.PRODUCTS}`,{params:e})).data;return u=Math.ceil(o.total/r),m(),o.products}catch(t){throw t}}const w=async e=>{try{return(await a.get(`${i.ID}${e}`)).data}catch(t){throw t}};let n=1;const L=async()=>{const e=await $(),t=g(["All",...e]);c.categoriesElem.innerHTML=t,h();const o=await p(),l=d(o);c.productsElem.innerHTML=l};c.categoriesElem.addEventListener("click",async e=>{b(e),n=1;try{const t=s==="All"?await p():await _();c.productsElem.innerHTML=d(t)}catch(t){throw t}});c.loadMoreElem.addEventListener("click",async e=>{n+=1;try{let t;s&&s!=="All"?t=await _():t=await p();const o=d(t);c.productsElem.insertAdjacentHTML("beforeend",o)}catch(t){throw t}});const S=async e=>{const t=e.target.closest(".products__item");if(!t)return;const o=Number(t.dataset.id),l=await w(o);c.modalElem.innerHTML=y(l),c.modalRoot.classList.add("modal--is-open")};L();c.productsElem.addEventListener("click",S);
//# sourceMappingURL=index.js.map

export const checkLS = key => {
  let value = localStorage.getItem(key);
  if (value === null || value === '') {
    localStorage.setItem(key, '[]');
    return [];
  } else {
    try {
      value = JSON.parse(localStorage.getItem(key));
      if (Array.isArray(value)) {
        return value;
      } else {
        return [];
      }
    } catch (error) {
      localStorage.setItem(key, '[]');
      return [];
    }
  }
};

export const addToCartById = id => {
  const cart = checkLS('cart');
  if (!cart.includes(String(id))) {
    cart.push(String(id));
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeFromWishlistById = id => {
  const wishlist = checkLS('wishlist');
  const updated = wishlist.filter(itemId => String(itemId) !== String(id));
  localStorage.setItem('wishlist', JSON.stringify(updated));
};

export const setTheme = () => {
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
};

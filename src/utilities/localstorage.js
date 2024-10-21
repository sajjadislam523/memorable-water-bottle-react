
const getStoredCart = () => {
    const storedCartString = localStorage.getItem('cart')
    if (storedCartString) {
        return JSON.parse(storedCartString);
    }
    return [];
}

// Save to local-storage
const saveCartToLS = cart => {
    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
}

// Add to local storage
const addToLS = id => {
    const cart = getStoredCart();
    cart.push(id);
    saveCartToLS(cart);
}


const removeFromLS = id => {
    const cart = getStoredCart();

    // Removing every same id
    const remaining = cart.filter(idx => idx !== id)
    saveCartToLS(remaining);
}


export { addToLS, getStoredCart, removeFromLS }
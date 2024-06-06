export let cart = [];

  getCartLocalStorage();
export function getCartLocalStorage(){
  if (!localStorage.getItem('cart')){
    cart = [];
  } else{
    cart = JSON.parse(localStorage.getItem('cart'))
  }
}

export function addToCart(productId, selectQuantity, matchingProduct){
  cart.forEach((cartItem)=>{
    if (productId === cartItem.id){
      matchingProduct = cartItem;
    }
  });
  if (matchingProduct){
    matchingProduct.quantity+=Number(selectQuantity);
  }else{
  cart.push({
    id: productId,
    quantity: Number(selectQuantity)
  })
}
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem)=>{
    if (cartItem.id !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}

export function setCartLocalStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}


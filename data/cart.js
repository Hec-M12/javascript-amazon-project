export let cart = [];

getCartLocalStorage();
export function getCartLocalStorage(){
  if (!localStorage.getItem('cart')){
    cart = [
    {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionId: '2'
    }
    ];
  } else{
    cart = JSON.parse(localStorage.getItem('cart'))
  }
}

export function addToCart(productId, selectQuantity, matchingProduct){
  selectQuantity = Number(selectQuantity);
  cart.forEach((cartItem)=>{
    if (productId === cartItem.id){
      matchingProduct = cartItem;
    }
  });
  if (matchingProduct){
    matchingProduct.quantity+= selectQuantity;
  }else{
  cart.push({
    id: productId,
    quantity: selectQuantity,
    deliveryOptionId: '1'
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

export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    (cartQuantity) += Number(cartItem.quantity);
  });
  return cartQuantity;
}

export function updateDeliveryOption(id, deliveryOptionId){
  let matchingProduct;
  cart.forEach((cartItem)=>{
    if (cartItem.id === id){
      matchingProduct = cartItem;
    }
  });

  matchingProduct.deliveryOptionId = deliveryOptionId;
  setCartLocalStorage();
}

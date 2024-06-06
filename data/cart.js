export let cart = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 3
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
  }];

export function addToCart(productId, selectQuantity, matchingProduct){
  cart.forEach((cartItem)=>{
    if (productId === cartItem.productId){
      matchingProduct = cartItem;
    }
  });
  if (matchingProduct){
    matchingProduct.quantity+=Number(selectQuantity);
  }else{
  cart.push({
    productId: productId,
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


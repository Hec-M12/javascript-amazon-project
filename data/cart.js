export const cart = [];

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


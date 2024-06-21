export let cart = [];

getCartLocalStorage();
export function getCartLocalStorage(){
  if (!localStorage.getItem('cart')){
    cart = [
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

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=>{
    console.log(xhr.response)
    });

    fun();
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
  }

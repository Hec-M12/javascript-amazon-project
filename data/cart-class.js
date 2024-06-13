class Cart{
  cartItems;
  #localStorageKey;
  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#getCartLocalStorage();
  }
  #getCartLocalStorage(){
    if (!localStorage.getItem(this.#localStorageKey)){
      this.cartItems = [
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
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
    }
  }

  setCartLocalStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems))
  }

  addToCart(productId, selectQuantity, matchingProduct){
    selectQuantity = Number(selectQuantity);
    this.cartItems.forEach((cartItem)=>{
      if (productId === cartItem.id){
        matchingProduct = cartItem;
      }
    });
    if (matchingProduct){
      matchingProduct.quantity += selectQuantity;
    }else{
    this.cartItems.push({
      id: productId,
      quantity: selectQuantity,
      deliveryOptionId: '1'
    })
  }
  this.setCartLocalStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem)=>{
      if (cartItem.id !== productId){
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
    this.setCartLocalStorage();
  }

  updateDeliveryOption(id, deliveryOptionId){
    let matchingProduct;
    this.cartItems.forEach((cartItem)=>{
      if (cartItem.id === id){
        matchingProduct = cartItem;
      }
    });
  
    matchingProduct.deliveryOptionId = deliveryOptionId;
    this.setCartLocalStorage();
  }

  calculateCartQuantity(){
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem)=>{
      (cartQuantity) += Number(cartItem.quantity);
    });
    return cartQuantity;
  }
}



const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');





cart.getCartLocalStorage();
businessCart.getCartLocalStorage();

console.log(cart);
console.log(businessCart);








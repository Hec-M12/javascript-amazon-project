function Cart(localStorageKey){
  const cart = {
    cartItems: [],
  
    getCartLocalStorage(){
      if (!localStorage.getItem(localStorageKey)){
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
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey))
      }
    }, 
  
    addToCart(productId, selectQuantity, matchingProduct){
      selectQuantity = Number(selectQuantity);
      this.cartItems.forEach((cartItem)=>{
        if (productId === cartItem.id){
          matchingProduct = cartItem;
        }
      });
      if (matchingProduct){
        matchingProduct.quantity+= selectQuantity;
      }else{
      this.cartItems.push({
        id: productId,
        quantity: selectQuantity,
        deliveryOptionId: '1'
      })
    }
    this.setCartLocalStorage();
    },
  
    setCartLocalStorage(){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems))
    },
  
    removeFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.id !== productId){
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
      this.setCartLocalStorage();
    },
  
    calculateCartQuantity(){
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem)=>{
        (cartQuantity) += Number(cartItem.quantity);
      });
      return cartQuantity;
    },
  
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
  }
  return cart
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.getCartLocalStorage();

businessCart.getCartLocalStorage();

console.log(cart);
console.log(businessCart);








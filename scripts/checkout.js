import { cart, removeFromCart, setCartLocalStorage, getCartLocalStorage, calculateCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";



getCartLocalStorage();
updateCheckoutQuantity();


function updateCheckoutQuantity(){
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-checkout-quantity').innerHTML = `${cartQuantity} items`;
}

let checkoutItemsHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.id;
  let matchingProduct;

  products.forEach((product)=>{
    if (productId === product.id){
      matchingProduct = product;
    }
  })

  checkoutItemsHTML += `
  <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src=${matchingProduct.image}>

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
        </span>
        <span data-product-id=${matchingProduct.id} class="update-quantity-link link-primary js-update-button js-update-button-${matchingProduct.id}">
          Update
        </span>
        <input data-product-id=${matchingProduct.id} type="number" class="update-quantity-input js-update-input-${matchingProduct.id}" min="1" value="${cartItem.quantity}">
        <span data-product-id='${matchingProduct.id}' class="delete-quantity-link link-primary js-delete-button">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;})

document.querySelector('.js-order-summary').innerHTML = checkoutItemsHTML;

document.querySelectorAll('.js-delete-button').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    removeFromCart(productId);
    const containerToRemove = document.querySelector(`.js-cart-item-container-${productId}`)
    containerToRemove.remove();
    setCartLocalStorage();
    updateCheckoutQuantity();
  })
})

document.querySelectorAll('.js-update-button').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    const quantity = document.querySelector(`.js-update-input-${productId}`).value;
    console.log(quantity)
    if (Number.isInteger(quantity) || quantity > 0){
      cart.forEach((cartItem)=>{
        if (cartItem.id === productId){
          cartItem.quantity = quantity;
          setCartLocalStorage();
          updateCheckoutQuantity();
          document.querySelector(`.js-quantity-${productId}`).innerHTML = quantity;
        }
      })
    }
  })
})

document.querySelectorAll('.update-quantity-input').forEach((button)=>{
  button.addEventListener('keydown', (event)=>{
    console.log(event.key)
    if (event.key === 'Enter'){
      const productId = button.dataset.productId;
      const quantity = document.querySelector(`.js-update-input-${productId}`).value;
      console.log(quantity)
      if (Number.isInteger(quantity) || quantity > 0){
        cart.forEach((cartItem)=>{
          if (cartItem.id === productId){
            cartItem.quantity = quantity;
            setCartLocalStorage();
            updateCheckoutQuantity();
            document.querySelector(`.js-quantity-${productId}`).innerHTML = quantity;
          }
        })
      }
    }
  })
})


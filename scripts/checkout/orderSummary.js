import {cart, removeFromCart, setCartLocalStorage, getCartLocalStorage, calculateCartQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentsummary } from "./paymentSummary.js";


export function renderOrderSummary(){
  
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

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if (deliveryOptionId === option.id){
        deliveryOption = option;
      }
    })
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM D');


    checkoutItemsHTML += `
    <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${deliveryDate}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${matchingProduct.image}>

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${matchingProduct.getPriceCentsAsDollars()}
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
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  </div>
  `;})



  function deliveryOptionsHTML(matchingProduct, cartItem){
    let deliveryOptionsHTML = '';
    deliveryOptions.forEach((option)=>{
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, 'day').format('dddd, MMMM D');
      const priceString = (option.priceCents === 0) ? 'FREE': `$${formatCurrency(option.priceCents)} - `;
      const isChecked = (option.id === cartItem.deliveryOptionId) ? 'checked' : '';
      deliveryOptionsHTML += `<div class="delivery-option js-delivery-option"
        data-id="${matchingProduct.id}"
        data-delivery-option-id="${option.id}">
        <input type="radio"
          ${isChecked}
          data-id=${option.id}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
    });
    return deliveryOptionsHTML;
  }

  document.querySelector('.js-order-summary').innerHTML = checkoutItemsHTML;

  document.querySelectorAll('.js-delete-button').forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      removeFromCart(productId);
      const containerToRemove = document.querySelector(`.js-cart-item-container-${productId}`)
      containerToRemove.remove();
      setCartLocalStorage();
      updateCheckoutQuantity();
      renderPaymentsummary();
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
    renderPaymentsummary();})
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
        renderPaymentsummary();}
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach((option)=>{
    option.addEventListener('click', ()=>{
      const id = option.dataset.id;
      const deliveryOptionId = option.dataset.deliveryOptionId;
      updateDeliveryOption(id, deliveryOptionId);
      renderOrderSummary();
      renderPaymentsummary();
    })
  })
}

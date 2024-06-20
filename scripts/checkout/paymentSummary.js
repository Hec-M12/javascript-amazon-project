import { cart, calculateCartQuantity  } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import {addOrder} from '../../data/orders.js'

export function renderPaymentsummary(){
  let totalProductCents = 0;
  let shippingCostCents = 0;
  cart.forEach((cartItem)=>{
    let productId = cartItem.id;
    let matchingProduct;

    products.forEach((product)=>{
      if (productId === product.id){
        matchingProduct = product;
      }
    })
    totalProductCents += matchingProduct.priceCents * cartItem.quantity;

    deliveryOptions.forEach((option)=>{
      if (cartItem.deliveryOptionId === option.id){
        shippingCostCents += option.priceCents;
      }
    })
  })

  const totalBeforeTaxCents = totalProductCents + shippingCostCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  let cartQuantity = calculateCartQuantity();

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(totalProductCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingCostCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      // Assuming cart is an array of items
      const updatedCart = cart.map(item => ({
        ...item,
        productId: item.id,
        // Remove the original id property
        id: undefined
      }));
  
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: updatedCart
        })
      });
  
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const order = await response.json();
      console.log(order);
      addOrder(order);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

  window.location.href = 'orders.html';
  });
  
}
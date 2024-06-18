import { renderOrderSummary } from "../../scripts/checkout/orderSummary";
import { getCartLocalStorage } from "../../data/cart";
import { loadProducts } from "../../data/products";

describe('test suite: renderOrderSummary', () => {
  it('displays the cart', ()=>{
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>`
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 1,
        deliveryOptionId: "1"
      },{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1"
      }]);
    })
    getCartLocalStorage();
    renderOrderSummary();
  })
})
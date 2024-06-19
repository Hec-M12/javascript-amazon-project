import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentsummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import "../data/backend-practice.js";

async function loadPage(){
  try{
    await loadProductsFetch();

    await new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      })
    });
  }
  catch(error){
    console.log('unexpected error. try again later', error);
  }
  console.log('load page')


  renderOrderSummary();
  renderPaymentsummary();

}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
]).then((values)=>{
  renderOrderSummary();
  renderPaymentsummary();
})


/*new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');
  });
  
}).then((value)=>{
  console.log(value)
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    })
  })

}).then(()=>{
  renderOrderSummary();
  renderPaymentsummary();
})
*/

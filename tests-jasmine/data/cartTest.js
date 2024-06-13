import {addToCart, cart, getCartLocalStorage} from '../../data/cart.js';

describe('test suite: add to cart', ()=>{
  it('adds a new product to the cart', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    })
    getCartLocalStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1, null);
    expect(cart.length).toBe(1);
  });
})
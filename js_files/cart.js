// let cart = [];

// function addToCart(name, price) {
//     let item = cart.find(p => p.name === name);
//     if (item) {
//         item.quantity++;
//     } else {
//         cart.push({ name, price, quantity: 1 });
//     }
//     updateCart();
// }

// function updateCart() {
//     let cartList = document.getElementById("cart-items");
//     cartList.innerHTML = "";
//     let cartCount = 0;

//     cart.forEach(item => {
//         cartCount += item.quantity;
//         cartList.innerHTML += `<li>${item.name} - $${item.price} x ${item.quantity}</li>`;
//     });

//     document.getElementById("cart-count").innerText = cartCount;
// }

// function toggleCart() {
//     document.getElementById("cart").classList.toggle("open");
// }

// function checkout() {
//     fetch("checkout.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(cart)
//     }).then(response => response.text()).then(data => {
//         alert(data);
//         cart = [];
//         updateCart();
//     });
// }

import { supabase } from '../database/supabase.js';
import { updateCartCount } from '../js_files/cart_count.js';

document.addEventListener('DOMContentLoaded', async () => {
    // show cart items 
    const cartListContainer = document.querySelector('#cart-list');
  
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      cartListContainer.innerHTML = "<p>Please log in to view your cart.</p>";
      return;
    }
  
    const userId = userData.user.id;
  
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        products (
          product_name,
          product_price,
          category
        )
      `)
      .eq('user_id', userId);
  
    if (error) {
      console.error('Error fetching cart items:', error.message);
      cartListContainer.innerHTML = "<p>Failed to load cart items.</p>";
      return;
    }
  
    if (!cartItems || cartItems.length === 0) {
      cartListContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    cartListContainer.innerHTML = cartItems.map(item => `
      <div class="cart-item">
        <h3>${item.products.product_name}</h3>
        <p>Category: ${item.products.category}</p>
        <p>Price: $${item.products.product_price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button class="remove-from-cart" data-id="${item.id}">🗑 Remove</button>
      </div>
    `).join('');
    
    const total = cartItems.reduce((sum, item) =>
        sum + (item.quantity * item.products.product_price), 0
);

document.querySelector('#cart-total').textContent = `Total: $${total}`;
updateCartCount();

// remove cart item 
document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', async () => {
        updateCartCount();
      const cartItemId = button.dataset.id;
  
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);
  
      if (error) {
        alert("❌ Failed to remove item: " + error.message);
      } else {
        alert("✅ Item removed from cart.");
        button.closest('.cart-item').remove(); // Remove from DOM
      }
    });
  });
  
//  proceed to checkout 
  document.getElementById('checkout-btn').addEventListener('click', async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      alert("You must be logged in.");
      return;
    }
  
    const userId = userData.user.id;
  
    // Fetch cart items with product price info
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        products (
          product_price
        )
      `)
      .eq('user_id', userId);
  
    if (cartError || !cartItems || cartItems.length === 0) {
      alert("Your cart is empty or couldn't be fetched.");
      return;
    }
  
    // Calculate total price
    let grandTotal = 0;
  
    const purchaseEntries = cartItems.map(item => {
      const totalPrice = item.quantity * item.products.product_price;
      grandTotal += totalPrice;
  
      return {
        user_id: userId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: totalPrice,
      };
    });
  
    // Insert into purchases table
    const { error: insertError } = await supabase
      .from('orders')
      .insert(purchaseEntries);
  
    if (insertError) {
      alert("❌ Failed to checkout: " + insertError.message);
      return;
    }
  
    // Clear the cart
    await supabase.from('cart_items').delete().eq('user_id', userId);
  
    // Update UI
    document.getElementById('checkout-msg').textContent = `🎉 Purchase successful! Total: $${grandTotal.toFixed(2)}`;
    document.getElementById('cart-list').innerHTML = "<p>Your cart is now empty.</p>";
    document.getElementById('cart-total').textContent = "Total: $0";
    updateCartCount();
  });
  
    });
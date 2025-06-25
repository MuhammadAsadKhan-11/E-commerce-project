// let cart = [];

// function buyItem(name, price, category) {
//     let item = cart.find(p => p.name === name);
//     if (item) {
//         item.quantity++;
//     } else {
//         cart.push({ name, price, category, quantity: 1 });
//     }
//     updateCart();
//     document.getElementById("cart-menu").classList.add("open");
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

// function proceedToPayment() {
//     document.getElementById("payment-modal").classList.add("open");
// }

// function makePayment() {
//     fetch("checkout.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(cart)
//     }).then(response => response.text()).then(data => {
//         alert(data);
//         cart = [];
//         updateCart();
//         document.getElementById("payment-modal").classList.remove("open");
//     });
// }
// // for mobile dropdown menu
// function toggleMenu() {
//     const navLinks = document.querySelector('.nav-links');
//     navLinks.classList.toggle('active');
// }
// function buyItem(name, price, category) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Add item to cart
//     cart.push({ name, price, category });

//     // Save updated cart to localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));

//     // Redirect to the cart page
//     window.location.href = "cart.html";
// }



import { supabase } from '../database/supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const categories = ['watches', 'bags', 'shoes', 'jewelry'];
  const container = document.querySelector('#collections'); // or '#collections' if using ID


  categories.forEach(async (category) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);

    if (error) {
      console.error('Error fetching products:', error.message);
      return;
    }

    const categoryHTML = `
      <div class="collection slide-in">
        <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <br><br>
        <div class="items">
          ${data.map(product => `
            <div class="item">
              <img src="${product.image}" alt="${product.product_name}">
              <h3>${product.product_name}</h3>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
              <p>$${product.product_price}</p>
              <button class="add-to-cart" data-product-id="${product.id}" data-quantity="1">Buy</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML += categoryHTML;

    // Attach add-to-cart listeners after rendering
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', async () => {
        const productId = button.dataset.productId;
        const quantity = parseInt(button.dataset.quantity) || 1;

        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData.user) {
          alert("⚠️ You must be logged in to add items to cart.");
          return;
        }

        const userId = userData.user.id;

        const { error: insertError } = await supabase
          .from('cart_items')
          .insert([
            {
              user_id: userId,
              product_id: productId,
              quantity: quantity
            }
          ]);

        if (insertError) {
          alert("❌ Failed to add to cart: " + insertError.message);
        } else {
          alert("✅ Product added to cart!");
        }
      });
    });
  });
});

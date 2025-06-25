// const users = [
//     {
//       name: "Isabella Moretti",
//       email: "isabella@luxemail.com",
//       loginTime: "2025-04-21 09:45",
//       purchases: ["Gucci Handbag", "Dior Sunglasses"]
//     },
//     {
//       name: "Ethan Chen",
//       email: "ethan.chen@vipshopper.com",
//       loginTime: "2025-04-21 10:12",
//       purchases: ["Rolex Watch"]
//     },
//     {
//       name: "Sophia Laurent",
//       email: "sophia.laurent@elite.com",
//       loginTime: "2025-04-21 11:03",
//       purchases: ["Chanel Perfume", "Louis Vuitton Belt"]
//     },
//     {
//       name: "Liam Kapoor",
//       email: "liam@designerlife.com",
//       loginTime: "2025-04-21 11:40",
//       purchases: ["Prada Shoes", "Armani Suit"]
//     }
//   ];
  
//   function populateTable() {
//     const tableBody = document.querySelector("#userTable tbody");
  
//     users.forEach(user => {
//       const row = document.createElement("tr");
  
//       row.innerHTML = `
//         <td>${user.name}</td>
//         <td>${user.email}</td>
//         <td>${user.loginTime}</td>
//         <td>${user.purchases.join(", ")}</td>
//       `;
  
//       tableBody.appendChild(row);
//     });
//   }
  
//   window.onload = populateTable;

// import { supabase } from '../database/supabase.js';

// document.addEventListener('DOMContentLoaded', async () => {
//   const userTable = document.getElementById('user-data');

//   // Fetch all users from your custom `users` table
//   const { data: users, error: userError } = await supabase
//     .from('users')
//     .select('*');

//   if (userError) {
//     console.error("❌ Failed to load users:", userError.message);
//     userTable.innerHTML = `<tr><td colspan="3">Error loading users</td></tr>`;
//     return;
//   }

//   // Clear table before appending
//   userTable.innerHTML = '';

//   for (const user of users) {
//     // Fetch purchases for each user by user.id
//     const { data: purchases, error: orderError } = await supabase
//       .from('orders') // or your order table name
//       .select('product_name, quantity')
//       .eq('user_id', user.id); // match with user's ID

//     const purchaseList = purchases?.map(p => `${p.product_name} (x${p.quantity})`).join(', ') || '—';
//     const loginDate = user.last_login
//       ? new Date(user.last_login).toLocaleString()
//       : '—';

//     userTable.innerHTML += `
//       <tr>
//         <td>${user.email}</td>
//         <td>${loginDate}</td>
//         <td>${purchaseList}</td>
//       </tr>
//     `;
//   }
// });

// import { supabase } from '../database/supabase.js';

// document.addEventListener('DOMContentLoaded', async () => {
//   const userTable = document.getElementById('user-data');

//   // Step 1: Fetch all users
//   const { data: users, error: userError } = await supabase
//     .from('users')
//     .select('id, email');

//   if (userError) {
//     console.error("❌ Failed to fetch users:", userError.message);
//     return;
//   }

//   // Step 2: Loop through users and fetch their purchases
//   for (const user of users) {
//     const { data: purchases, error: purchaseError } = await supabase
//       .from('orders')
//       .select('product_name, quantity')
//       .eq('user_id', user.id);

//     const purchaseList = purchases?.length
//       ? purchases.map(p => `${p.product_name} (x${p.quantity})`).join(', ')
//       : '—';

//     // Step 3: Append to the table
//     userTable.innerHTML += `
//       <tr>
//         <td>${user.email}</td>
//         <td>${purchaseList}</td>
//       </tr>
//     `;
//   }
// });

import { supabase } from '../database/supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const userTable = document.getElementById('user-data');

  // Step 1: Query orders with joined user and product info
  const { data: orders, error } = await supabase
  .from('orders')
  .select(`
    *,
    users:user_id(*),
    products( product_name )
  `);

  if (error) {
    console.error('❌ Failed to fetch orders:', error.message);
    return;
  }

  // Step 2: Group by user
  const userMap = {};

  for (const order of orders) {
    const userId = order.user_id;
    const email = order.users?.email ;
    const name = order.users?.full_name;
    const productName = order.products?.product_name || 'Unnamed product';
    const quantity = order.quantity;
    const price = order.price;

    console.log(order.users?.email, order.users?.full_name);

    if (!userMap[userId]) {
      userMap[userId] = {
        name,
        email,
        purchases: [],
      };
    }

    userMap[userId].purchases.push(`${productName} ${price}`);
  }

  // Step 3: Render to table
  for (const user of Object.values(userMap)) {
    const purchaseList = user.purchases.join(',  ');
    userTable.innerHTML += `
      <tr>
      <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${purchaseList}</td>
      </tr>
    `;
  }
});




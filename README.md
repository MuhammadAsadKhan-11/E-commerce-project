# E-commerce-project
🎯 Project Overview
 developed a responsive e-commerce website as part of my  Web Engineering course in the 5th semester. The purpose of this project was to simulate a real-world online shopping experience, incorporating both frontend and backend functionality, with a focus on dynamic behavior, database interaction, and user authentication.

🛠️ Technology Stack
project uses the classic LAMP stack and frontend tools:

HTML – For structuring web pages.

CSS – For styling and making the design responsive across devices.

JavaScript – For client-side interactivity (e.g., cart updates, form validations).

PHP – For backend logic (user login, admin panel, product management).

MySQL – For storing user data, products, and orders in a relational database.

✅ Note: All files are stored in the master branch — not the main branch. Be sure to switch to master when reviewing the code on GitHub.

💡 Key Features
1. Product Categories
Products are grouped into relevant categories (e.g., electronics, clothing, accessories).

Helps users browse and filter items easily.

Categories are dynamically rendered from the database.

2. Shopping Cart
Users can add/remove items from the cart.

Cart updates without page reload (thanks to JavaScript/AJAX).

Total cost is calculated automatically.

Items are stored temporarily or persistently based on login status.

3. User Authentication
Login & Registration system for users.

Validations on the frontend and backend.

Users must be logged in to checkout or place orders.

Passwords likely hashed for security (if implemented).

4. Admin Panel
Admin login separates regular users from admin access.

Admins can:

Add new products with name, price, category, image, and description.

Delete or update existing products.

Admin interface is secure and hidden from regular users.

5. Smooth Checkout Process
Upon checkout:

User confirms address and payment option.

Cart data is stored in the orders table in the database.

Confirmation message is shown after successful order placement.

🌐 Modern UI & Responsiveness
Clean, modern layout using CSS and media queries.

Fully responsive: works well on mobile, tablet, and desktop.

May include animations or transitions to enhance UX.

🗃️ Code Structure
Assuming your code is organized well:

/assets – CSS, images, and JavaScript files.

/admin – Admin panel pages.

/includes – Reusable components like header, footer, database config.

/products – Product-related scripts and views.

index.php – Home page.

login.php, register.php, cart.php, checkout.php – Main pages.

db.php – Database connection file.

🗂️ Important: If someone is checking your GitHub, they should switch to the master branch as your work is stored there (not the main).

📦 Extra Features You Can Highlight (If Present)
Product image upload via admin panel.

Session management using PHP.

Cart persistence using PHP sessions or database.

Responsive navbar and product grid.

Basic form validations (e.g., empty fields, invalid inputs).

Error handling and user feedback (e.g., login errors, successful product addition).


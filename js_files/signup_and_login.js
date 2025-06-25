import { supabase } from '../database/supabase.js';

// document.addEventListener("DOMContentLoaded", function() {
//     const validMembershipCodes = ["LUX123", "VIP456", "PREM789"]; // Example valid codes

    // Signup Form Handling
    // document.getElementById("signup-form")?.addEventListener("submit", function(event) {
    //     event.preventDefault();

    //     let name = document.getElementById("name").value;
    //     let email = document.getElementById("email").value;
    //     // let membershipCode = document.getElementById("membership-code").value;
    //     let password = document.getElementById("password").value;
    //     let errorMsg = document.getElementById("error-msg");

    //     // if (!validMembershipCodes.includes(membershipCode)) {
    //     //     errorMsg.textContent = "Invalid Membership Code!";
    //     //     return;
    //     // }

    //     localStorage.setItem(email, JSON.stringify({ name, email,  password }));
    //     alert("Signup successful! You can now log in.");
    //     window.location.href = "login.html";
    // });


    // document.addEventListener('DOMContentLoaded', () => {
    //   console.log("✅ DOM is ready");
    
    //   const form = document.getElementById('signup_form');
    //   if (!form) {
    //     alert("⚠️ signup_form not found");
    //     return;
    //   }
    
    //   form.addEventListener('submit', async (e) => {
    //     e.preventDefault();
    
    //     const full_name = form.full_name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    
    //     const { data: authData, error } = await supabase.auth.signUp({
    //       email,
    //       password
    //     });
    
    //     if (error) {
    //       alert("❌ Error signing up: " + error.message);
    //       return;
    //     }
    
    //     // Insert into public.users table
    //     const { error: insertError } = await supabase
    //       .from('users')
    //       .insert([{ id: authData?.user?.id, full_name, email }]);
    
    //     if (insertError) {
    //       alert("⚠️ Sign up successful, but failed to save extra user info.");
    //     } else {
    //       alert("✅ Sign up successful! Redirecting to login...");
    //     }
    
    //     window.location.href = "/html_files/login.html";
    //   });
    // });
    document.addEventListener('DOMContentLoaded', () => {
      console.log("✅ DOM is ready");
    
      const form = document.getElementById('signup_form');
      if (!form) {
        alert("⚠️ signup_form not found");
        return;
      }
    
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const full_name = form.full_name.value;
        const email = form.email.value;
        const password = form.password.value;
    
        // Sign up the user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
    
        if (error) {
          alert("❌ Error signing up: " + error.message);
          return;
        }
    
        const userId = data.user?.id;
    
        // Only proceed if user ID is available
        if (!userId) {
          alert("⚠️ Sign up succeeded but user ID missing.");
          return;
        }
    
        // Insert user data into public.users table
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ id: userId, full_name, email }]);
    
        if (insertError) {
          alert("⚠️ Sign up succeeded, but failed to save profile info.");
        } else {
          alert("✅ Sign up successful! Redirecting to login...");
        }
    
        // Redirect to login
        window.location.href = "/html_files/login.html";
      });
    });
    

    // Login Form Handling
//     document.getElementById("login-form")?.addEventListener("submit", function(event) {
//         event.preventDefault();

//         let loginName = document.getElementById("login-name").value;
//         let loginEmail = document.getElementById("login-email").value;
//         // let loginMembershipCode = document.getElementById("login-membership-code").value;
//         let loginPassword = document.getElementById("login-password").value;
//         let loginErrorMsg = document.getElementById("login-error-msg");

//         let user = localStorage.getItem(loginEmail);
//         if (!user) {
//             loginErrorMsg.textContent = "Account not found!";
//             return;
//         }

//         let userData = JSON.parse(user);
//         if (userData.name !== loginName || userData.email !== loginEmail  || userData.password !== loginPassword) {
//             loginErrorMsg.textContent = "Invalid credentials!";
//             return;
//         }

//         alert("Login successful! Welcome, " + userData.name);
//         window.location.href = "dashboard.html"; // Redirect to member dashboard
//     });
// });
// document.addEventListener('DOMContentLoaded', () => {
//   console.log("✅ DOM is ready for login");

//   const form = document.getElementById('login_form');
//   if (!form) {
//     alert("⚠️ login_form not found");
//     return;
//   }

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = form.email.value;
//     const password = form.password.value;

//     // Sign in using Supabase
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       alert("❌ Login failed: " + error.message);
//       return;
//     }

//     alert("✅ Login successful!");

//     // OPTIONAL: Insert into public.users table if not already present
//     const userId = data.user.id;

//     // Check if user already exists in public.users
//     const { data: userExists, error: selectError } = await supabase
//       .from('users')
//       .select('id')
//       .eq('id', userId)
//       .single();

//     if (!userExists) {
//       const full_name = "No Name"; // You can fetch real name if available or skip

//       const { error: insertError } = await supabase
//         .from('users')
//         .insert([{ id: userId, email, full_name }]);

//       if (insertError) {
//         console.warn("⚠️ Logged in, but failed to insert into public.users:", insertError.message);
//       }
//     }

//     // Redirect to homepage or dashboard
//     window.location.href = "/html_files/home.html"; // change to your actual homepage path
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    } else {
        console.error("Hamburger menu or nav-links not found.");
    }
});


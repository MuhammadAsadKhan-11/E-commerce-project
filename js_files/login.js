import { supabase } from '../database/supabase.js';
document.addEventListener('DOMContentLoaded', () => {
      console.log("✅ DOM is ready for login");
    
      const form = document.getElementById('login_form');
      if (!form) {
        alert("⚠️ login_form not found");
        return;
      }
    
//       form.addEventListener('submit', async (e) => {
//         e.preventDefault();
    
//         const email = form.email.value;
//         const password = form.password.value;
    
//         // Sign in using Supabase
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
    
//         if (error) {
//           alert("❌ Login failed: " + error.message);
//           return;
//         }
    
//         alert("✅ Login successful!");
    
//         // OPTIONAL: Insert into public.users table if not already present
//         const userId = data.user.id;
    
//         // Check if user already exists in public.users
//         const { data: userExists, error: selectError } = await supabase
//           .from('users')
//           .select('id')
//           .eq('id', userId)
//           .single();
    
//         if (!userExists) {
//           const full_name = "No Name"; // You can fetch real name if available or skip
    
//           const { error: insertError } = await supabase
//             .from('users')
//             .insert([{ id: userId, email, full_name }]);
    
//           if (insertError) {
//             console.warn("⚠️ Logged in, but failed to insert into public.users:", insertError.message);
//           }
//         }
    
//         // Redirect to homepage or dashboard
//         window.location.href = "/html_files/home.html"; // change to your actual homepage path
//       });

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();
  
//   const email = form.email.value;
//   const password = form.password.value;
  
//   // Sign in using Supabase
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
  
//   if (error) {
//     alert("❌ Login failed: " + error.message);
//     return;
//   }
  
//   alert("✅ Login successful!");
  
//   const userId = data.user.id;
  
//   // 🔍 Fetch user role from public.users
//   const { data: userData, error: roleError } = await supabase
//   .from('users')
//   .select('role')
//   .eq('id', userId)
//   .single();
  
//   if (roleError || !userData) {
//     alert("⚠️ Login succeeded, but could not fetch user role.");
//     return;
//   }
  
//   const role = userData.role;
  
//   // 🚀 Redirect based on role
//   if (role === 'admin') {
//     window.location.href = "/html_files/admin.html";
//   } else {
//     window.location.href = "/html_files/home.html";
//   }
// });
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = form.email.value;
  const password = form.password.value;
  
  // Sign in using Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    alert("❌ Login failed: " + error.message);
    return;
  }
  
  alert("✅ Login successful!");
  
  const userId = data.user.id;
  
  // 🔍 Fetch user role from public.users
  const { data: userData, error: roleError } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();
  
  if (roleError || !userData) {
    alert("⚠️ Login succeeded, but could not fetch user role.");
    return;
  }

  // 🕒 Update last_login field
  const { error: updateError } = await supabase
  .from('users')
  .update({ last_login: new Date().toISOString() })
  .eq('id', userId);

if (updateError) {
  console.warn("⚠️ Failed to update last login:", updateError.message);
}
  
  const role = userData.role;
  
  // 🚀 Redirect based on role
  if (role === 'admin') {
    window.location.href = "/html_files/admin.html";
  } else {
    window.location.href = "/html_files/home.html";
  }
});

});

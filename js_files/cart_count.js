
import { supabase } from '../database/supabase.js';

export async function updateCartCount() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    document.getElementById('cart-count').textContent = 0;
    return;
  }

  const userId = userData.user.id;

  const { data, error } = await supabase
    .from('cart_items')
    .select('quantity')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching cart count:', error.message);
    return;
  }

  const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalQuantity;
}

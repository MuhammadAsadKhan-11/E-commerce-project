// /database/supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://dsmfihvapjunpmzpiaba.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbWZpaHZhcGp1bnBtenBpYWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzUzMTUsImV4cCI6MjA2MDY1MTMxNX0.BzjaPUlp3kBbGSEOeffWBYV8sK4KiYFub49VOHyPBrA";
export const supabase = createClient(supabaseUrl, supabaseKey);

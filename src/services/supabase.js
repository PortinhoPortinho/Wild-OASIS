import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ivyuhnkixzkjovpxctfc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eXVobmtpeHpram92cHhjdGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0ODg0MTcsImV4cCI6MjEwMjA2NDQxN30.RdX4wnBZaVVN8nLyjuaUEHXg4H-UQLkKFQBrn8VMaxQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

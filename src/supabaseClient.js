import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pxiidvhymzcmmwrztblh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aWlkdmh5bXpjbW13cnp0YmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MjE4OTYsImV4cCI6MjA4MTM5Nzg5Nn0.RGJ9EYjeK28K5glGarYzrA3OgAniV9rODHtLerwwKdA";

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export default supabase;

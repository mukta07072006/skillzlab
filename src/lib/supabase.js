import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cgkunxvvctaeonmfvwji.supabase.co" // Get from Supabase → Settings → API
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNna3VueHZ2Y3RhZW9ubWZ2d2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NjI1NDAsImV4cCI6MjA2OTQzODU0MH0.zUX6NUT1NoJDriwZL-396gj7424oZnaApgtlUElXZo8" // Get from same place

export const supabase = createClient(supabaseUrl, supabaseKey)